"use client";

import { useState } from "react";
import { inquiryNeeds, inquiryBudgets, inquiryTimelines } from "@/data/inquiry";
import { validateInquiry } from "@/lib/validation";

const initial = {
  name: "",
  email: "",
  need: "",
  budget: "",
  timeline: "",
  message: "",
  company: "", // honeypot
};

// Order of the fields on the form. Errors show one at a time, in this order.
const ORDER = ["name", "email", "need", "budget", "timeline", "message"];

const fieldClass =
  "w-full rounded-xl border border-hair bg-surface px-4 py-3 text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

function FieldError({ id, text }) {
  if (!text) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-danger">
      {text}
    </p>
  );
}

export default function InquiryForm() {
  const [values, setValues] = useState(initial);
  const [errorKey, setErrorKey] = useState(null); // field whose error is showing (set when Send is clicked)
  const [serverErrors, setServerErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  // Errors show ONLY after the visitor clicks "Send message", one at a time
  // (the first missing field). While typing, nothing pops up. The shown error
  // disappears once that field is fixed.
  const clientErrors = validateInquiry(values);
  const errors = { ...serverErrors };
  if (errorKey && clientErrors[errorKey]) errors[errorKey] = clientErrors[errorKey];

  function update(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (serverErrors[key]) {
      setServerErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Errors only show when the visitor tries to send. Not complete yet:
    // show the first missing field only and jump to it.
    const firstInvalid = ORDER.find((k) => clientErrors[k]);
    setErrorKey(firstInvalid || null);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    if (Object.keys(clientErrors).length > 0) return; // honeypot

    setStatus("submitting");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        if (data.errors) setServerErrors(data.errors);
        else
          setServerErrors({ message: data.error || "Something went wrong. Try again." });
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setServerErrors({ message: "Network error. Please try again." });
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div id="inquiry-form" className="text-foreground">
        <div className="max-w-xl rounded-2xl border border-signal/30 bg-surface p-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Thanks, we got your message.
          </h2>
          <p className="mt-3 text-muted">
            We will reply within one business day with a few questions or a
            time to talk.
          </p>
          <button
            type="button"
            onClick={() => {
              setValues(initial);
              setErrorKey(null);
              setServerErrors({});
              setStatus("idle");
            }}
            className="mt-6 text-sm font-medium text-signal hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="inquiry-form" className="text-foreground">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight">Tell us about your project</h2>
        <p className="mt-3 text-muted">
          Share a few details and we will come back with a plan and a quote.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 max-w-2xl space-y-6" noValidate>
        {/* Honeypot: hidden from humans, visible to bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className={fieldClass}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            <FieldError id="name-error" text={errors.name} />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={fieldClass}
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            <FieldError id="email-error" text={errors.email} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="need" className="mb-2 block text-sm font-medium">
              What you need
            </label>
            <select
              id="need"
              name="need"
              className={fieldClass}
              value={values.need}
              onChange={(e) => update("need", e.target.value)}
              aria-invalid={Boolean(errors.need)}
              aria-describedby={errors.need ? "need-error" : undefined}
            >
              <option value="">Choose one</option>
              {inquiryNeeds.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <FieldError id="need-error" text={errors.need} />
          </div>

          <div>
            <label htmlFor="budget" className="mb-2 block text-sm font-medium">
              Budget range
            </label>
            <select
              id="budget"
              name="budget"
              className={fieldClass}
              value={values.budget}
              onChange={(e) => update("budget", e.target.value)}
              aria-invalid={Boolean(errors.budget)}
              aria-describedby={errors.budget ? "budget-error" : undefined}
            >
              <option value="">Choose one</option>
              {inquiryBudgets.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <FieldError id="budget-error" text={errors.budget} />
          </div>
        </div>

        <div>
          <label htmlFor="timeline" className="mb-2 block text-sm font-medium">
            Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            className={fieldClass}
            value={values.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            aria-invalid={Boolean(errors.timeline)}
            aria-describedby={errors.timeline ? "timeline-error" : undefined}
          >
            <option value="">Choose one</option>
            {inquiryTimelines.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <FieldError id="timeline-error" text={errors.timeline} />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={fieldClass}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          <FieldError id="message-error" text={errors.message} />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-signal px-6 py-3 font-semibold text-signal-ink transition active:scale-[0.98] disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}
