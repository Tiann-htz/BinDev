"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";

const serviceOptions = [
  ...services.map((service) => service.title),
  "Not sure yet",
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = "That email does not look right.";
  }
  if (!values.service) errors.service = "Please pick one.";
  if (values.message.trim().length < 10) {
    errors.message = "Please tell us a little more (at least 10 characters).";
  }
  return errors;
}

const fieldClass =
  "mt-2 block w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40 aria-[invalid=true]:border-red-400";

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-white/85">
        {label}
        {optional && <span className="ml-1 text-white/50">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export default function InquiryForm() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | success

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Clear the error for this field as soon as the person starts fixing it
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // UI only for now. Step 1.12 will send `values` to /api/inquiry
    // (save to the database + email alert to the team).
    setStatus("success");
  }

  function handleReset() {
    setValues(emptyForm);
    setErrors({});
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path d="m5 12 5 5 9-10" />
          </svg>
        </span>
        <h2 className="mt-5 text-2xl font-semibold">Thank you!</h2>
        <p className="mt-3 text-white/75">
          We got your message and will get back to you soon.
        </p>
        <Button variant="light" className="mt-6" onClick={handleReset}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
    >
      <Field id="name" label="Your name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={fieldClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClass}
          />
        </Field>

        <Field id="phone" label="Phone" optional>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field id="service" label="What do you need?" error={errors.service}>
        <select
          id="service"
          name="service"
          value={values.service}
          onChange={handleChange}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "service-error" : undefined}
          className={fieldClass}
        >
          <option value="" disabled>
            Choose one
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option} className="text-navy">
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label="Tell us about your project" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={fieldClass}
        />
      </Field>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send message
      </Button>
    </form>
  );
}
