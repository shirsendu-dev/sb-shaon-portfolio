import test, { afterEach, beforeEach, describe } from "node:test";
import assert from "node:assert/strict";
import { deliverContact, validateContact } from "../src/lib/contact.js";
import { POST } from "../src/app/api/contact/route.js";
import { site } from "../src/data/site.js";

const validMessage = {
  name: "Alex Morgan",
  email: "alex@example.com",
  subject: "A website project",
  message: "I would like to discuss a new website for our business.",
};

const deliveryConfig = {
  apiKey: "test-key-never-sent",
  from: "Portfolio <contact@example.com>",
  to: "owner@example.com",
};

test("validation accepts Unicode names and normalizes surrounding whitespace and line endings", () => {
  const result = validateContact({
    name: "  শিরসেন্দু বিশ্বাস  ",
    email: " alex@example.com ",
    subject: "  A website project  ",
    message: "  First line of a project enquiry.\r\nSecond line.\rThird line.  ",
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
  assert.equal(result.data.name, "শিরসেন্দু বিশ্বাস");
  assert.equal(result.data.email, "alex@example.com");
  assert.equal(result.data.subject, "A website project");
  assert.equal(result.data.message, "First line of a project enquiry.\nSecond line.\nThird line.");
});

test("missing fields produce field-specific errors", () => {
  const result = validateContact({});

  assert.equal(result.valid, false);
  assert.deepEqual(Object.keys(result.errors).sort(), ["email", "message", "name", "subject"]);
});

test("non-string fields are rejected without coercing objects or numbers into messages", () => {
  for (const field of ["name", "email", "subject", "message"]) {
    for (const value of [null, 1234, {}, []]) {
      const result = validateContact({ ...validMessage, [field]: value });
      assert.equal(result.valid, false, `${field} must reject ${JSON.stringify(value)}`);
      assert.ok(result.errors[field]);
      assert.equal(result.data[field], "");
    }
  }
});

test("required text lengths are enforced at their boundaries", () => {
  const minimum = validateContact({
    ...validMessage,
    name: "Al",
    subject: "Web",
    message: "a".repeat(20),
  });
  assert.equal(minimum.valid, true);

  const maximum = validateContact({
    ...validMessage,
    name: "a".repeat(100),
    subject: "a".repeat(150),
    message: "a".repeat(5000),
  });
  assert.equal(maximum.valid, true);

  const invalidLengths = [
    ["name", "a"],
    ["name", "a".repeat(101)],
    ["subject", "ab"],
    ["subject", "a".repeat(151)],
    ["message", "a".repeat(19)],
    ["message", "a".repeat(5001)],
  ];
  for (const [field, value] of invalidLengths) {
    assert.ok(validateContact({ ...validMessage, [field]: value }).errors[field]);
  }
});

test("invalid and oversized email addresses are rejected", () => {
  for (const email of ["", "not-an-email", "alex@", "@example.com", "alex@example", "alex @example.com", `${"a".repeat(247)}@test.io`]) {
    const result = validateContact({ ...validMessage, email });
    assert.equal(result.valid, false, `Expected invalid email: ${email}`);
    assert.ok(result.errors.email);
  }
});

test("header injection and null bytes are rejected while message newlines remain valid", () => {
  const attacks = [
    ["name", "Alex\r\nBcc: someone@example.com"],
    ["subject", "Project\nBcc: someone@example.com"],
    ["email", "alex@example.com\r\nBcc: someone@example.com"],
    ["name", "Alex\0Morgan"],
    ["message", "This message contains a null byte: \0 and more text."],
  ];
  for (const [field, value] of attacks) {
    assert.ok(validateContact({ ...validMessage, [field]: value }).errors[field]);
  }
  assert.equal(validateContact({ ...validMessage, message: "A normal project message.\nWith another line." }).valid, true);
});

test("delivery uses the configured sender and recipient with the visitor as reply-to", async () => {
  let recorded;
  const result = await deliverContact({
    ...deliveryConfig,
    data: { ...validMessage, to: "untrusted@example.com", from: "untrusted@example.com" },
    fetcher: async (url, options) => {
      recorded = { url, options, body: JSON.parse(options.body) };
      return Response.json({ id: "accepted-email-id" });
    },
  });

  assert.deepEqual(result, { ok: true });
  assert.equal(recorded.url, "https://api.resend.com/emails");
  assert.equal(recorded.options.method, "POST");
  assert.equal(recorded.options.headers.Authorization, "Bearer test-key-never-sent");
  assert.equal(recorded.options.headers["Content-Type"], "application/json");
  assert.equal(recorded.body.from, deliveryConfig.from);
  assert.deepEqual(recorded.body.to, [deliveryConfig.to]);
  assert.equal(recorded.body.reply_to, validMessage.email);
  assert.equal(recorded.body.subject, "Portfolio enquiry: A website project");
  assert.equal(site.name, "Shirsendu Biswas Shaon");
  assert.ok(recorded.body.text.startsWith(`New message from the ${site.name} portfolio\n`));
  assert.ok(recorded.body.text.includes(validMessage.message));
  assert.ok(recorded.options.signal instanceof AbortSignal);
});

test("visitor markup is sent only as plain text, not as an HTML email", async () => {
  const message = "Please review <script>alert('test')</script> and <a href='https://example.com'>this project</a>.";
  let payload;
  const result = await deliverContact({
    ...deliveryConfig,
    data: { ...validMessage, message },
    fetcher: async (_url, options) => {
      payload = JSON.parse(options.body);
      return Response.json({ id: "accepted-email-id" });
    },
  });
  assert.deepEqual(result, { ok: true });
  assert.equal(Object.hasOwn(payload, "html"), false);
  assert.ok(payload.text.endsWith(message));
});

test("an accepted HTTP response without an email ID is not reported as success", async () => {
  for (const responseBody of [{}, { id: "" }, { id: null }, { id: 123 }, null]) {
    const result = await deliverContact({
      ...deliveryConfig,
      data: validMessage,
      fetcher: async () => Response.json(responseBody),
    });
    assert.deepEqual(result, { ok: false });
  }
});

test("provider errors, invalid JSON, and network failures never report success or leak details", async (context) => {
  context.mock.method(console, "error", () => {});
  const fetchers = [
    async () => Response.json({ id: "ignored-id", message: "private provider detail" }, { status: 401 }),
    async () => Response.json({ message: "quota exceeded" }, { status: 429 }),
    async () => new Response("not JSON", { status: 200 }),
    async () => { throw new Error("sensitive network error"); },
  ];
  for (const fetcher of fetchers) {
    const result = await deliverContact({ ...deliveryConfig, data: validMessage, fetcher });
    assert.equal(result.ok, false);
    assert.equal(Object.hasOwn(result, "message"), false);
    assert.doesNotMatch(JSON.stringify(result), /private|quota|sensitive/);
  }
});

test("retries use the same idempotency key but different message content uses a different key", async () => {
  const keys = [];
  const fetcher = async (_url, options) => {
    keys.push(options.headers["Idempotency-Key"]);
    return Response.json({ id: "accepted-email-id" });
  };

  await deliverContact({ ...deliveryConfig, data: validMessage, fetcher });
  await deliverContact({ ...deliveryConfig, data: { ...validMessage }, fetcher });
  await deliverContact({ ...deliveryConfig, data: { ...validMessage, message: `${validMessage.message} A separate enquiry.` }, fetcher });

  assert.equal(keys[0], keys[1]);
  assert.notEqual(keys[0], keys[2]);
  assert.match(keys[0], /^portfolio-contact\/[a-f0-9]{64}$/);
  assert.ok(keys[0].length <= 256);
});

let requestNumber = 0;

function contactRequest(values = validMessage, options = {}) {
  const headers = new Headers({
    origin: "http://localhost",
    "content-type": "application/json",
    "x-forwarded-for": `198.51.100.${++requestNumber}`,
  });
  for (const [name, value] of Object.entries(options.headers || {})) {
    if (value === null) headers.delete(name);
    else headers.set(name, value);
  }
  const body = options.body === undefined ? JSON.stringify(values) : options.body;
  return new Request(options.url || "http://localhost/api/contact", {
    method: "POST",
    headers,
    body,
    ...(body instanceof ReadableStream ? { duplex: "half" } : {}),
  });
}

describe("POST /api/contact", { concurrency: false }, () => {
  let originalEnvironment;
  let providerFetch;

  beforeEach((context) => {
    context.mock.method(console, "error", () => {});
    originalEnvironment = {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    };
    process.env.RESEND_API_KEY = deliveryConfig.apiKey;
    process.env.CONTACT_FROM_EMAIL = deliveryConfig.from;
    providerFetch = context.mock.method(globalThis, "fetch", async () => {
      throw new Error("No real network requests are allowed during contact tests.");
    });
  });

  afterEach((context) => {
    context.mock.restoreAll();
    for (const [key, value] of Object.entries(originalEnvironment)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  test("rejects missing and foreign origins before attempting email delivery", async () => {
    for (const origin of [null, "https://other.example.com"]) {
      const response = await POST(contactRequest(validMessage, { headers: { origin } }));
      assert.equal(response.status, 403);
      assert.equal((await response.json()).ok, false);
    }
    assert.equal(providerFetch.mock.callCount(), 0);
  });

  test("accepts the public Host for loopback aliases and LAN access when the request URL is internal", async () => {
    providerFetch.mock.mockImplementation(async () => Response.json({ id: "accepted-email-id" }));

    for (const host of ["127.0.0.1:3000", "192.0.2.10:3000"]) {
      const response = await POST(contactRequest(validMessage, {
        url: "http://localhost:3000/api/contact",
        headers: { host, origin: `http://${host}` },
      }));
      assert.equal(response.status, 200, `Public host should be accepted: ${host}`);
      assert.equal((await response.json()).ok, true);
    }
    assert.equal(providerFetch.mock.callCount(), 2);
  });

  test("accepts the public HTTPS origin supplied by trusted reverse-proxy headers", async () => {
    providerFetch.mock.mockImplementation(async () => Response.json({ id: "accepted-email-id" }));

    const response = await POST(contactRequest(validMessage, {
      url: "http://localhost:3000/api/contact",
      headers: {
        host: "localhost:3000",
        origin: "https://portfolio.example.com",
        "x-forwarded-host": "portfolio.example.com",
        "x-forwarded-proto": "https",
      },
    }));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
    assert.equal(providerFetch.mock.callCount(), 1);
  });

  test("rejects a foreign origin even when public proxy headers are present", async () => {
    const response = await POST(contactRequest(validMessage, {
      url: "http://localhost:3000/api/contact",
      headers: {
        host: "localhost:3000",
        origin: "https://other.example.com",
        "x-forwarded-host": "portfolio.example.com",
        "x-forwarded-proto": "https",
      },
    }));
    assert.equal(response.status, 403);
    assert.equal((await response.json()).ok, false);
    assert.equal(providerFetch.mock.callCount(), 0);
  });

  test("rejects malformed or opaque Origin values without attempting delivery", async () => {
    for (const origin of ["not a URL", "://", "null", "https://[invalid"]) {
      const response = await POST(contactRequest(validMessage, { headers: { origin } }));
      assert.equal(response.status, 403, `Malformed origin should be rejected: ${origin}`);
      assert.equal((await response.json()).ok, false);
    }
    assert.equal(providerFetch.mock.callCount(), 0);
  });

  test("requires the JSON content type", async () => {
    for (const contentType of [null, "text/plain", "application/jsonp"]) {
      const response = await POST(contactRequest(validMessage, {
        headers: { "content-type": contentType },
      }));
      assert.equal(response.status, 415, `Unexpected content type accepted: ${contentType}`);
      assert.equal((await response.json()).ok, false);
    }
    assert.equal(providerFetch.mock.callCount(), 0);
  });

  test("rejects malformed JSON", async () => {
    const response = await POST(contactRequest(undefined, { body: "{invalid JSON" }));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).ok, false);
    assert.equal(providerFetch.mock.callCount(), 0);
  });

  test("rejects non-object JSON payloads", async () => {
    for (const values of [null, [], 42, "message"]) {
      const response = await POST(contactRequest(values));
      assert.equal(response.status, 400);
      assert.equal((await response.json()).ok, false);
    }
    assert.equal(providerFetch.mock.callCount(), 0);
  });

  test("rejects a filled honeypot without reporting a fake success", async () => {
    const response = await POST(contactRequest({ ...validMessage, website: "spam.example" }));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).ok, false);
    assert.equal(providerFetch.mock.callCount(), 0);
  });

  test("rejects a declared oversized body before email delivery", async () => {
    const response = await POST(contactRequest(validMessage, {
      headers: { "content-length": "40001" },
    }));
    assert.equal(response.status, 413);
    assert.equal((await response.json()).ok, false);
    assert.equal(providerFetch.mock.callCount(), 0);
  });

  test("bounds streamed bodies without Content-Length and cancels the oversized stream", async () => {
    let cancelled = false;
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(40001));
      },
      cancel() {
        cancelled = true;
      },
    });
    const request = contactRequest(undefined, { body });
    assert.equal(request.headers.has("content-length"), false);
    const response = await POST(request);
    assert.equal(response.status, 413);
    assert.equal((await response.json()).ok, false);
    assert.equal(cancelled, true);
    assert.equal(providerFetch.mock.callCount(), 0);
  });

  test("returns field-level validation errors and never calls the provider for invalid input", async () => {
    const response = await POST(contactRequest({}));
    assert.equal(response.status, 400);
    assert.equal(response.headers.get("cache-control"), "no-store");
    const result = await response.json();
    assert.equal(result.ok, false);
    assert.deepEqual(Object.keys(result.errors).sort(), ["email", "message", "name", "subject"]);
    assert.equal(providerFetch.mock.callCount(), 0);
  });

  test("missing delivery configuration returns 503 instead of claiming success", async () => {
    for (const missingKeys of [["RESEND_API_KEY"], ["CONTACT_FROM_EMAIL"], ["RESEND_API_KEY", "CONTACT_FROM_EMAIL"]]) {
      process.env.RESEND_API_KEY = deliveryConfig.apiKey;
      process.env.CONTACT_FROM_EMAIL = deliveryConfig.from;
      for (const key of missingKeys) delete process.env[key];
      const response = await POST(contactRequest());
      assert.equal(response.status, 503);
      assert.equal((await response.json()).ok, false);
    }
    assert.equal(providerFetch.mock.callCount(), 0);
  });

  test("sends only to the configured portfolio inbox and succeeds after provider acceptance", async () => {
    let email;
    providerFetch.mock.mockImplementation(async (_url, options) => {
      email = JSON.parse(options.body);
      return Response.json({ id: "accepted-email-id" });
    });
    const response = await POST(contactRequest({
      ...validMessage,
      to: "untrusted@example.com",
      website: "",
    }));

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal((await response.json()).ok, true);
    assert.deepEqual(email.to, ["shirsendu.js.dev@gmail.com"]);
    assert.equal(email.from, deliveryConfig.from);
    assert.equal(email.reply_to, validMessage.email);
    assert.equal(providerFetch.mock.callCount(), 1);
  });

  test("an HTTP success without a provider email ID returns 502", async () => {
    providerFetch.mock.mockImplementation(async () => Response.json({}));
    const response = await POST(contactRequest());
    assert.equal(response.status, 502);
    assert.equal((await response.json()).ok, false);
  });

  for (const status of [401, 403]) {
    test(`provider ${status} returns a safe temporary-unavailable response`, async () => {
      providerFetch.mock.mockImplementation(async () => Response.json({
        message: "private provider account details",
        name: "private_configuration_error",
      }, { status }));

      const response = await POST(contactRequest());
      assert.equal(response.status, 503);
      const result = await response.json();
      assert.equal(result.ok, false);
      assert.match(result.message, /temporarily unavailable/);
      assert.deepEqual(Object.keys(result).sort(), ["message", "ok"]);
      assert.doesNotMatch(JSON.stringify(result), /private|configurationError/);
      assert.equal(providerFetch.mock.callCount(), 1);
    });
  }

  test("provider HTTP and network failures return a safe 502 error", async () => {
    const failures = [
      async () => Response.json({ message: "private provider details" }, { status: 500 }),
      async () => { throw new Error("private network details"); },
    ];
    for (const failure of failures) {
      providerFetch.mock.mockImplementation(failure);
      const response = await POST(contactRequest());
      assert.equal(response.status, 502);
      const result = await response.json();
      assert.equal(result.ok, false);
      assert.equal(JSON.stringify(result).includes("private"), false);
    }
  });

  test("limits a single address to five attempts and provides a retry interval", async () => {
    providerFetch.mock.mockImplementation(async () => Response.json({ id: "accepted-email-id" }));
    const headers = { "x-forwarded-for": "203.0.113.99" };
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await POST(contactRequest(validMessage, { headers }));
      assert.equal(response.status, 200);
    }
    const blocked = await POST(contactRequest(validMessage, { headers }));
    assert.equal(blocked.status, 429);
    assert.equal(blocked.headers.get("retry-after"), "600");
    assert.equal((await blocked.json()).ok, false);
    assert.equal(providerFetch.mock.callCount(), 5);
  });
});
