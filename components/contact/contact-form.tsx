"use client";

import Script from "next/script";
import { FormEvent, useEffect, useRef, useState } from "react";

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
        },
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

  return <p className="text-sm text-red-700">{message}</p>;
}

function inputClassName(hasError: boolean) {
  return [
    "w-full border bg-white/80 px-4 py-3 text-sm text-stone-900 outline-none transition",
    "placeholder:text-stone-400 focus:bg-white",
    hasError
      ? "border-red-300 focus:border-red-500"
      : "border-stone-300 focus:border-stone-900",
  ].join(" ");
}

export function ContactForm() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const turnstileEnabled = Boolean(turnstileSiteKey);
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
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
            "Spam protection could not be loaded. Refresh the page and try again.",
          );
        },
      },
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

    if (serverError) {
      setServerError("");
    }

    if (status === "success") {
      setStatus("idle");
    }
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
            "Unable to send your inquiry right now. Please try again.",
        );
        if (turnstileEnabled) {
          resetTurnstile();
        }
        return;
      }

      setStatus("success");
      setForm(initialState);
      setErrors({});
      if (turnstileEnabled) {
        resetTurnstile();
      }
    } catch {
      setStatus("error");
      setServerError(
        "Network error. Please check your connection and try again.",
      );
      if (turnstileEnabled) {
        resetTurnstile();
      }
    }
  }

  return (
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
            className="text-xs uppercase tracking-[0.18em] text-stone-500"
          >
            Full Name
          </label>
          <input
            id="fullName"
            className={inputClassName(!!errors.fullName)}
            placeholder="Your full name"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
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
            className="text-xs uppercase tracking-[0.18em] text-stone-500"
          >
            Email
          </label>
          <input
            id="email"
            className={inputClassName(!!errors.email)}
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
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
            className="text-xs uppercase tracking-[0.18em] text-stone-500"
          >
            Phone
          </label>
          <input
            id="phone"
            className={inputClassName(!!errors.phone)}
            placeholder="+62..."
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
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
            className="text-xs uppercase tracking-[0.18em] text-stone-500"
          >
            Project Type
          </label>
          <select
            id="projectType"
            className={inputClassName(!!errors.projectType)}
            value={form.projectType}
            onChange={(event) => updateField("projectType", event.target.value)}
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
          className="text-xs uppercase tracking-[0.18em] text-stone-500"
        >
          Project Brief
        </label>
        <textarea
          id="message"
          className={`${inputClassName(!!errors.message)} min-h-40 resize-y`}
          placeholder="Tell us about your project goals, timeline, location, and any inspirations you have in mind."
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
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
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
            Spam Protection
          </p>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            Please verify before submitting so inquiries can be delivered
            safely.
          </p>
        </div>

        {turnstileEnabled ? (
          <div className="overflow-hidden border border-stone-200 bg-white/80 p-4">
            <div ref={turnstileContainerRef} />
          </div>
        ) : (
          <div className="border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Turnstile is not configured yet. Add{" "}
            <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> to enable spam
            protection.
          </div>
        )}

        {turnstileError ? (
          <p className="text-sm text-red-700">{turnstileError}</p>
        ) : turnstileEnabled && turnstileToken ? (
          <p className="text-sm text-emerald-700">
            Verification complete. Your inquiry is ready to send.
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 border-t border-stone-200 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          {status === "success" && (
            <p className="text-sm text-emerald-700">
              Thank you. Your inquiry has been received and will be reviewed
              shortly.
            </p>
          )}

          {!!serverError && (
            <p className="text-sm text-red-700">{serverError}</p>
          )}

          {status === "idle" && isDirty && (
            <p className="text-xs text-stone-500">
              Your details are ready to be submitted.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || (turnstileEnabled && !turnstileToken)}
          className="inline-flex w-fit items-center justify-center border border-stone-900 px-6 py-3 text-xs uppercase tracking-[0.18em] text-stone-950 transition hover:bg-stone-900 hover:text-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
        </button>
      </div>
    </form>
  );
}
