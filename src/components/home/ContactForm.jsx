"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function ContactForm({ email }) {
  const formRef = useRef(null);
  const submittingRef = useRef(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const firstInvalidField = Object.keys(errors)[0];
    if (firstInvalidField) {
      formRef.current?.elements.namedItem(firstInvalidField)?.focus();
    }
  }, [errors]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submittingRef.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    submittingRef.current = true;
    setPending(true);
    setErrors({});
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();

      if (!response.ok || result.ok !== true) {
        setErrors(result.errors || {});
        setStatus({
          type: "error",
          message: result.message || "Your message couldn’t be sent. Please try again.",
        });
        return;
      }

      form.reset();
      setStatus({
        type: "success",
        message: result.message || "Your message has been sent. Thank you for getting in touch.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "I couldn’t send your message right now. Please try again or email me directly.",
      });
    } finally {
      submittingRef.current = false;
      setPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      className="contact-form"
      method="post"
      action="/api/contact"
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-heading"
      aria-busy={pending}
    >
      <h3 id="contact-form-heading" className="form-heading">Tell me about it.</h3>
      <p className="form-intro">A project, a role, or an idea. All fields are required.</p>
      <noscript>
        <style>{".contact-form fieldset { display: none; }"}</style>
        <p className="form-status">Please enable JavaScript to use this form, or <a href={`mailto:${email}`}>email me directly</a>.</p>
      </noscript>

      <fieldset disabled={pending}>
        <legend className="sr-only">Your contact details and message</legend>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="contact-name">Your name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              required
              minLength={2}
              maxLength={100}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            {errors.name && <p id="contact-name-error" className="form-error">{errors.name}</p>}
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Email address</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              maxLength={254}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
            {errors.email && <p id="contact-email-error" className="form-error">{errors.email}</p>}
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="contact-subject">What’s it about?</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="A project, an opportunity, a conversation…"
            required
            minLength={3}
            maxLength={150}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          />
          {errors.subject && <p id="contact-subject-error" className="form-error">{errors.subject}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="contact-message">Your message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder="Tell me what you have in mind…"
            required
            minLength={20}
            maxLength={5000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
          {errors.message && <p id="contact-message-error" className="form-error">{errors.message}</p>}
        </div>
        <div className="form-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="form-footer">
          <button className="button button-primary" type="submit" disabled={pending}>
            {pending ? "Sending…" : "Send message"}
            <FiArrowUpRight aria-hidden="true" />
          </button>
          <p>Your message goes directly to my inbox.</p>
        </div>
      </fieldset>

      {status && (
        <div
          className={`form-status form-status-${status.type}`}
          role={status.type === "error" ? "alert" : "status"}
        >
          <p>{status.message}</p>
          {status.type === "error" && <a href={`mailto:${email}`}>Email me directly <FiArrowUpRight aria-hidden="true" /></a>}
        </div>
      )}
    </form>
  );
}
