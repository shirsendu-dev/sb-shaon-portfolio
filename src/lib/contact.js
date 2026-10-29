import { createHash } from "node:crypto";
import { site } from "../data/site.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const headerControlCharacters = /[\u0000-\u001f\u007f]/;

export function validateContact(values) {
  const data = {};
  const errors = {};

  for (const field of ["name", "email", "subject", "message"]) {
    data[field] = typeof values[field] === "string" ? values[field].trim() : "";
  }
  data.message = data.message.replace(/\r\n?/g, "\n");

  if (data.name.length < 2 || data.name.length > 100 || headerControlCharacters.test(data.name)) {
    errors.name = "Enter your name using 2–100 characters.";
  }
  if (data.email.length > 254 || !emailPattern.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (data.subject.length < 3 || data.subject.length > 150 || headerControlCharacters.test(data.subject)) {
    errors.subject = "Enter a subject using 3–150 characters.";
  }
  if (data.message.length < 20 || data.message.length > 5000 || data.message.includes("\0")) {
    errors.message = "Write a message using 20–5,000 characters.";
  }

  return { data, errors, valid: Object.keys(errors).length === 0 };
}

export async function deliverContact({ data, apiKey, from, to, fetcher = fetch }) {
  const email = {
    from,
    to: [to],
    reply_to: data.email,
    subject: `Portfolio enquiry: ${data.subject}`,
    text: [
      `New message from the ${site.name} portfolio`,
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Subject: ${data.subject}`,
      "",
      data.message,
    ].join("\n"),
  };

  // Retrying an identical message must not send a second email.
  const messageHash = createHash("sha256").update(JSON.stringify(email)).digest("hex");

  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `portfolio-contact/${messageHash}`,
      },
      body: JSON.stringify(email),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const configurationError = response.status === 401 || response.status === 403;
      // Log status only. Provider messages can contain account email addresses.
      console.error("Contact email delivery was rejected by Resend.", { status: response.status });
      return configurationError ? { ok: false, configurationError: true } : { ok: false };
    }

    const result = await response.json();
    return { ok: typeof result.id === "string" && result.id.length > 0 };
  } catch {
    // Do not expose provider responses, credentials, or visitor messages.
    return { ok: false };
  }
}
