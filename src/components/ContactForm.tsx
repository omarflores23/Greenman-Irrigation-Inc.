"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { services } from "@/data/services";
import {
  contactSchema,
  contactFieldErrors,
  normalizeContactService,
  type ContactFieldErrors,
  type ContactInput,
} from "@/lib/contact";

type ContactFormProps = {
  defaultService?: string;
  defaultProperty?: "residential" | "commercial";
  compact?: boolean;
  publicMode?: boolean;
};

export function ContactForm({
  defaultService = "",
  defaultProperty = "residential",
  compact = false,
  publicMode = false,
}: ContactFormProps) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const availableServices = services.filter(
    (service) => !publicMode || service.approval === "approved",
  );
  const choices = [
    ...availableServices.map((service) => ({
      value: service.slug,
      title: service.title,
      label:
        service.approval === "approved"
          ? service.title
          : `${service.title} inquiry`,
    })),
    ...(!publicMode
      ? [
          { value: "landscaping", label: "Landscaping inquiry" },
          { value: "maintenance-plan", label: "Seasonal care inquiry" },
        ]
      : []),
    {
      value: "general-inquiry",
      label: "General inquiry / help choosing a service",
    },
  ];
  const initialService = normalizeContactService(defaultService, choices);

  function errorProps(name: keyof ContactInput) {
    return {
      "aria-invalid": Boolean(errors[name]) || undefined,
      "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    };
  }

  function errorMessage(name: keyof ContactInput) {
    return errors[name] ? (
      <span className="field-error" id={`${id}-${name}-error`}>
        {errors[name]}
      </span>
    ) : null;
  }

  function focusFirstError(fieldErrors: ContactFieldErrors) {
    const first = Object.keys(fieldErrors)[0];
    const control = first ? formRef.current?.elements.namedItem(first) : null;
    if (control instanceof HTMLElement) control.focus();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = (name: string) => String(formData.get(name) ?? "");
    const data: ContactInput = {
      fullName: value("fullName"),
      phone: value("phone"),
      email: value("email"),
      address: value("address"),
      propertyType: value("propertyType") as ContactInput["propertyType"],
      propertyDetails: value("propertyDetails"),
      service: value("service"),
      description: value("description"),
      preferredContact: value(
        "preferredContact",
      ) as ContactInput["preferredContact"],
      preferredDate: value("preferredDate"),
      consent: formData.get("consent") === "on",
      website: value("website"),
    };
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors = contactFieldErrors(result.error);
      setErrors(fieldErrors);
      setStatus("error");
      setMessage(
        "Please check the highlighted fields before sending your request.",
      );
      focusFirstError(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    setMessage("Sending your request…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
        signal: AbortSignal.timeout(20_000),
      });
      const body = (await response.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
        fieldErrors?: ContactFieldErrors;
      };
      if (!response.ok || body.success !== true) {
        setStatus("error");
        setMessage(
          body.error ||
            "Your request could not be sent. Please try again or contact GreenMan directly.",
        );
        if (body.fieldErrors) {
          setErrors(body.fieldErrors);
          focusFirstError(body.fieldErrors);
        }
        return;
      }
      setStatus("success");
      setMessage(
        body.message ||
          "The email service accepted your request for delivery. GreenMan will contact you to discuss availability.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        "We could not confirm that your request was sent. Please check your connection, try again, or contact GreenMan directly.",
      );
    }
  }

  return (
    <form
      ref={formRef}
      method="post"
      action="/api/contact"
      onSubmit={submit}
      noValidate
      className={compact ? "contact-form contact-form-compact" : "contact-form"}
      aria-label="Request GreenMan service"
      aria-busy={status === "loading"}
    >
      <noscript>
        <p className="notice">
          Enable JavaScript to send this form, or use an approved contact option
          shown on this page.
        </p>
      </noscript>
      <p className="form-intro">
        Tell us about your property and what you need. GreenMan will confirm
        service availability and scheduling when it responds. Fields marked *
        are required.
      </p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={`${id}-fullName`}>Full name *</label>
          <input
            id={`${id}-fullName`}
            name="fullName"
            autoComplete="name"
            required
            maxLength={120}
            {...errorProps("fullName")}
          />
          {errorMessage("fullName")}
        </div>
        <div className="field">
          <label htmlFor={`${id}-phone`}>Phone number *</label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={40}
            placeholder="(978) 555-0123"
            {...errorProps("phone")}
          />
          {errorMessage("phone")}
        </div>
        <div className="field">
          <label htmlFor={`${id}-email`}>Email address *</label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={254}
            {...errorProps("email")}
          />
          {errorMessage("email")}
        </div>
        <div className="field">
          <label htmlFor={`${id}-address`}>Service address or ZIP code *</label>
          <input
            id={`${id}-address`}
            name="address"
            autoComplete="street-address"
            required
            maxLength={250}
            placeholder="Street address or ZIP code"
            {...errorProps("address")}
          />
          {errorMessage("address")}
        </div>
        <div className="field">
          <label htmlFor={`${id}-propertyType`}>Property type *</label>
          <select
            id={`${id}-propertyType`}
            name="propertyType"
            required
            defaultValue={defaultProperty}
            {...errorProps("propertyType")}
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
          {errorMessage("propertyType")}
        </div>
        <div className="field">
          <label htmlFor={`${id}-service`}>What can we help with? *</label>
          <select
            id={`${id}-service`}
            name="service"
            required
            defaultValue={initialService}
            {...errorProps("service")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {choices.map((choice) => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
          {errorMessage("service")}
        </div>
        <div className="field full-width">
          <label htmlFor={`${id}-propertyDetails`}>
            Property details <span>(optional)</span>
          </label>
          <input
            id={`${id}-propertyDetails`}
            name="propertyDetails"
            maxLength={150}
            placeholder="For example, a home, condominium community, or office property"
            {...errorProps("propertyDetails")}
          />
          {errorMessage("propertyDetails")}
        </div>
        <div className="field full-width">
          <label htmlFor={`${id}-description`}>
            Tell us about your issue or project *
          </label>
          <textarea
            id={`${id}-description`}
            name="description"
            required
            minLength={10}
            maxLength={2000}
            rows={compact ? 4 : 5}
            placeholder="Describe what you’re noticing or planning, and any useful details about your system."
            {...errorProps("description")}
          />
          {errorMessage("description")}
          <span className="field-help">
            Have photos? Mention them here so GreenMan can arrange a secure way
            to share them.
          </span>
        </div>
        <div className="field">
          <label htmlFor={`${id}-preferredContact`}>
            Preferred contact method *
          </label>
          <select
            id={`${id}-preferredContact`}
            name="preferredContact"
            required
            defaultValue="phone"
            {...errorProps("preferredContact")}
          >
            <option value="phone">Phone</option>
            <option value="email">Email</option>
          </select>
          {errorMessage("preferredContact")}
        </div>
        <div className="field">
          <label htmlFor={`${id}-preferredDate`}>
            Preferred date <span>(optional)</span>
          </label>
          <input
            id={`${id}-preferredDate`}
            name="preferredDate"
            type="date"
            {...errorProps("preferredDate")}
            aria-describedby={`${id}-date-help${errors.preferredDate ? ` ${id}-preferredDate-error` : ""}`}
          />
          {errorMessage("preferredDate")}
          <span className="field-help" id={`${id}-date-help`}>
            A preference only. GreenMan will confirm availability.
          </span>
        </div>
        <div className="field full-width">
          <p className="privacy-notice" id={`${id}-privacy`}>
            Your details are used to respond to this service inquiry and sent
            securely to GreenMan through its email provider. Please don’t
            include passwords, financial information, or sensitive documents.{" "}
            <Link href="/privacy">Read our privacy policy.</Link>
          </p>
          <label className="checkbox-label" htmlFor={`${id}-consent`}>
            <input
              id={`${id}-consent`}
              type="checkbox"
              name="consent"
              required
              {...errorProps("consent")}
              aria-describedby={`${id}-privacy${errors.consent ? ` ${id}-consent-error` : ""}`}
            />
            <span>
              I agree that GreenMan may contact me about this request using the
              details I provide. *
            </span>
          </label>
          {errorMessage("consent")}
        </div>
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
      <button
        className="button button-primary"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send service request"}
      </button>
      <div
        className={`form-status ${status === "error" ? "notice notice-error" : status === "success" ? "notice notice-success" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </div>
    </form>
  );
}

export default ContactForm;
