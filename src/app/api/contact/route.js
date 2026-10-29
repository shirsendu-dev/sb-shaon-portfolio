import { site } from "../../../data/site.js";
import { deliverContact, validateContact } from "../../../lib/contact.js";

const maxBodyBytes = 40000;
const windowMs = 10 * 60 * 1000;
const attempts = new Map();

function reply(body, status, headers = {}) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const requestUrl = new URL(request.url);
    // Next.js can use an internal hostname in request.url behind a proxy.
    const host = request.headers.get("x-forwarded-host")?.split(",")[0].trim()
      || request.headers.get("host") || requestUrl.host;
    const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim()
      || requestUrl.protocol.slice(0, -1);
    const publicOrigin = new URL(`${protocol}://${host}`).origin;
    return new URL(origin).origin === publicOrigin;
  } catch {
    return false;
  }
}

export async function POST(request) {
  if (!isSameOrigin(request)) {
    return reply({ ok: false, message: "Please send your message from this website." }, 403);
  }
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return reply({ ok: false, message: "Please submit the contact form." }, 415);
  }
  if (Number(request.headers.get("content-length")) > maxBodyBytes) {
    return reply({ ok: false, message: "Your message is too long. Please shorten it and try again." }, 413);
  }

  let values;
  try {
    // Bound streamed requests too, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing body");
    const chunks = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBodyBytes) {
        await reader.cancel();
        return reply({ ok: false, message: "Your message is too long. Please shorten it and try again." }, 413);
      }
      chunks.push(value);
    }
    values = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply({ ok: false, message: "We couldn’t read your message. Please try again." }, 400);
  }

  if (!values || typeof values !== "object" || Array.isArray(values)) {
    return reply({ ok: false, message: "Please complete the contact form." }, 400);
  }
  if (values.website !== undefined && values.website !== "") {
    return reply({ ok: false, message: "Unable to send this message. Please email me directly." }, 400);
  }

  const { data, errors, valid } = validateContact(values);
  if (!valid) {
    return reply({ ok: false, message: "Please check the highlighted fields.", errors }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return reply({ ok: false, message: "The contact form is temporarily unavailable. Please use the email link to reach me." }, 503);
  }

  // A small, per-server limit. Hosting-level rules should cover multiple instances.
  const now = Date.now();
  for (const [key, entry] of attempts) {
    if (entry.resetAt <= now) attempts.delete(key);
  }
  const address = request.headers.get("x-forwarded-for")?.split(",")[0].trim()
    || request.headers.get("x-real-ip") || "local";
  const attempt = attempts.get(address) || { count: 0, resetAt: now + windowMs };
  if (attempt.count >= 5 || (attempts.size >= 2000 && !attempts.has(address))) {
    return reply({ ok: false, message: "Too many attempts. Please wait a few minutes or email me directly." }, 429, { "Retry-After": "600" });
  }
  attempt.count += 1;
  attempts.set(address, attempt);

  const result = await deliverContact({ data, apiKey, from, to: site.contact.EMAIL });
  if (result.configurationError) {
    return reply({ ok: false, message: "The contact form is temporarily unavailable. Please use the email link to reach me." }, 503);
  }
  if (!result.ok) {
    return reply({ ok: false, message: "Your message couldn’t be sent just now. Please try again or use the email link." }, 502);
  }

  return reply({ ok: true, message: "Thank you — your message is on its way. I’ll be in touch." }, 200);
}
