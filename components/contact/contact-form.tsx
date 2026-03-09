"use client";

import { FormEvent, useState } from "react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  projectType: "Residential",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setStatus("error");
      setError(data.error || "Something went wrong.");
      return;
    }

    setStatus("success");
    setForm(initialState);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input className="border border-stone-300 px-4 py-3" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
      <input className="border border-stone-300 px-4 py-3" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input className="border border-stone-300 px-4 py-3" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <select className="border border-stone-300 px-4 py-3" value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })}>
        <option>Residential</option>
        <option>Hospitality</option>
        <option>Commercial</option>
        <option>Other</option>
      </select>
      <textarea className="min-h-36 border border-stone-300 px-4 py-3" placeholder="Tell us about your project" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />

      <button disabled={status === "submitting"} className="w-fit border border-stone-900 px-6 py-3 text-xs uppercase tracking-[0.18em] disabled:opacity-60">
        {status === "submitting" ? "Sending..." : "Submit"}
      </button>

      {status === "success" ? <p className="text-sm text-emerald-700">Thank you. We received your inquiry.</p> : null}
      {status === "error" ? <p className="text-sm text-red-700">{error}</p> : null}
    </form>
  );
}
