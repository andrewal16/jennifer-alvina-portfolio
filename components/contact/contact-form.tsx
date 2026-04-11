"use client";

import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  projectType: "Residential",
  message: "",
};

function validateForm(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (form.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (!emailRegex.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (form.phone.trim().length > 40) {
    errors.phone = "Phone number is too long.";
  }
  if (form.projectType.trim().length < 2) {
    errors.projectType = "Please select a project type.";
  }
  if (form.message.trim().length < 10) {
    errors.message = "Please share at least a few details about your project.";
  }

  return errors;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-[var(--error)]">{message}</p>;
}

function inputClassName(hasError: boolean) {
  return [
    "w-full rounded-lg border bg-[var(--bg-card)] px-4 py-3 text-sm text-brand-darkest outline-none",
    "placeholder:text-brand-secondary",
    hasError
      ? "border-[var(--error)]"
      : "border-brand-secondary focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/35",
  ].join(" ");
}


function SuccessModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(2, 6, 23, 0.55)" }}
      onClick={handleBackdropClick}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{ backdropFilter: "blur(6px)" }}
      />
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[var(--bg-card)] shadow-2xl"
        style={{
          animation: "fade-in-up 0.45s cubic-bezier(0.16,1,0.3,1) both",
          border: "1px solid rgba(197,160,89,0.18)",
        }}
      >
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, var(--color-accent), var(--color-accent-light), var(--color-accent))",
          }}
        />
        <div className="p-8">
          <div
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-full"
            style={{
              background: "rgba(197,160,89,0.10)",
              border: "1px solid rgba(197,160,89,0.22)",
            }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="var(--color-accent)"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p
            className="mb-2 text-xs font-medium uppercase tracking-[0.22em]"
            style={{ color: "var(--color-accent)" }}
          >
            Inquiry Received
          </p>
          <h2
            className="mb-3 font-heading text-3xl font-light leading-tight"
            style={{ color: "var(--text-heading)" }}
          >
            Thank you for reaching out.
          </h2>
          <div
            className="mb-4 h-px w-12"
            style={{ background: "var(--color-accent)" }}
          />
          <p
            className="mb-8 text-sm leading-7"
            style={{ color: "var(--text-body)" }}
          >
            Your project brief has been received and is now under review. We
            will be in touch with you shortly to discuss the next steps.
          </p>
          <button
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-all hover:-translate-y-0.5 hover:bg-brand-accent/8"
            style={{
              border: "1px solid rgba(197,160,89,0.35)",
              color: "var(--color-darkest)",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export function ContactForm() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const turnstileEnabled = Boolean(turnstileSiteKey);
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const [serverError, setServerError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const [isTurnstileScriptReady, setIsTurnstileScriptReady] = useState(false);

  const isSubmitting = status === "submitting";

  const isDirty =
    form.fullName !== initialState.fullName ||
    form.email !== initialState.email ||
    form.phone !== initialState.phone ||
    form.projectType !== initialState.projectType ||
    form.message !== initialState.message;

  useEffect(() => {
    if (
      !turnstileEnabled ||
      !isTurnstileScriptReady ||
      !turnstileContainerRef.current ||
      !window.turnstile ||
      turnstileWidgetIdRef.current
    ) {
      return;
    }

    turnstileWidgetIdRef.current = window.turnstile.render(
      turnstileContainerRef.current,
      {
        sitekey: turnstileSiteKey!,
        theme: "light",
        callback: (token) => {
          setTurnstileToken(token);
          setTurnstileError("");
          setServerError("");
        },
        "expired-callback": () => {
          setTurnstileToken("");
          setTurnstileError("Verification expired. Please complete it again.");
        },
        "error-callback": () => {
          setTurnstileToken("");
          setTurnstileError(
            "Spam protection could not be loaded. Refresh the page and try again."
          );
        },
      }
    );

    return () => {
      if (window.turnstile && turnstileWidgetIdRef.current) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [isTurnstileScriptReady, turnstileEnabled, turnstileSiteKey]);

  function resetTurnstile() {
    setTurnstileToken("");
    if (window.turnstile && turnstileWidgetIdRef.current) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
    if (serverError) setServerError("");
    if (status === "success") setStatus("idle");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    setServerError("");
    setTurnstileError("");

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    if (turnstileEnabled && !turnstileToken) {
      setStatus("error");
      setTurnstileError("Please complete the spam protection check.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          projectType: form.projectType.trim(),
          message: form.message.trim(),
          turnstileToken,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setServerError(
          data.error ||
            "Unable to send your inquiry right now. Please try again."
        );
        if (turnstileEnabled) resetTurnstile();
        return;
      }

      // ✅ Sukses — tampilkan modal
      setStatus("success");
      setForm(initialState);
      setErrors({});
      if (turnstileEnabled) resetTurnstile();
    } catch {
      setStatus("error");
      setServerError(
        "Network error. Please check your connection and try again."
      );
      if (turnstileEnabled) resetTurnstile();
    }
  }

  return (
    <>
      {/* ── Success Modal ── */}
      {status === "success" && (
        <SuccessModal onClose={() => setStatus("idle")} />
      )}

      <form onSubmit={onSubmit} className="grid gap-6">
        {turnstileEnabled ? (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onLoad={() => setIsTurnstileScriptReady(true)}
          />
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="text-xs font-medium uppercase tracking-[0.18em] text-brand-darkest"
            >
              Full Name
            </label>
            <input
              id="fullName"
              className={inputClassName(!!errors.fullName)}
              placeholder="Your full name"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              required
            />
            <div id="fullName-error">
              <FieldError message={errors.fullName} />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-[0.18em] text-brand-darkest"
            >
              Email
            </label>
            <input
              id="email"
              className={inputClassName(!!errors.email)}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            <div id="email-error">
              <FieldError message={errors.email} />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-xs font-medium uppercase tracking-[0.18em] text-brand-darkest"
            >
              Phone
            </label>
            <input
              id="phone"
              className={inputClassName(!!errors.phone)}
              placeholder="+62..."
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            <div id="phone-error">
              <FieldError message={errors.phone} />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="projectType"
              className="text-xs font-medium uppercase tracking-[0.18em] text-brand-darkest"
            >
              Project Type
            </label>
            <select
              id="projectType"
              className={inputClassName(!!errors.projectType)}
              value={form.projectType}
              onChange={(e) => updateField("projectType", e.target.value)}
              aria-invalid={!!errors.projectType}
              aria-describedby={
                errors.projectType ? "projectType-error" : undefined
              }
            >
              <option>Residential</option>
              <option>Hospitality</option>
              <option>Commercial</option>
              <option>Retail</option>
              <option>Other</option>
            </select>
            <div id="projectType-error">
              <FieldError message={errors.projectType} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-xs font-medium uppercase tracking-[0.18em] text-brand-darkest"
          >
            Project Brief
          </label>
          <textarea
            id="message"
            className={`${inputClassName(!!errors.message)} min-h-40 resize-y`}
            placeholder="Tell us about your project goals, timeline, location, and any inspirations you have in mind."
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            required
          />
          <div id="message-error">
            <FieldError message={errors.message} />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-darkest">
              Spam Protection
            </p>
            <p className="mt-2 text-sm leading-7 text-brand-darkest">
              Please verify before submitting so inquiries can be delivered
              safely.
            </p>
          </div>

          {turnstileEnabled ? (
            <div className="overflow-hidden rounded-lg border border-brand-secondary bg-brand-primary-light p-4">
              <div ref={turnstileContainerRef} />
            </div>
          ) : (
            <div className="rounded-lg border border-[var(--warning)]/30 bg-[var(--warning-bg)] px-4 py-3 text-sm text-[var(--warning)]">
              Turnstile is not configured yet. Add{" "}
              <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> to enable spam
              protection.
            </div>
          )}

          {turnstileError ? (
            <p className="text-sm text-[var(--error)]">{turnstileError}</p>
          ) : turnstileEnabled && turnstileToken ? (
            <p className="text-sm text-[var(--success)]">
              Verification complete. Your inquiry is ready to send.
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 border-t border-brand-secondary pt-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            {!!serverError && (
              <p className="text-sm text-[var(--error)]">{serverError}</p>
            )}
            {status === "idle" && isDirty && (
              <p className="text-xs text-brand-dark">
                Your details are ready to be submitted.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || (turnstileEnabled && !turnstileToken)}
            className="inline-flex w-fit items-center justify-center rounded-full border border-brand-darkest/16 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-darkest transition-all hover:-translate-y-0.5 hover:border-brand-accent hover:bg-brand-accent/8 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Submit Inquiry"}
          </button>
        </div>
      </form>
    </>
  );
}
