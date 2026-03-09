import { NextResponse } from "next/server";
import { insertContactSubmission } from "@/lib/neon";
import type { ContactSubmissionInput } from "@/lib/types";

function validate(payload: ContactSubmissionInput) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!payload.fullName || payload.fullName.trim().length < 2) return "Full name is required.";
  if (!payload.email || !emailRegex.test(payload.email)) return "Valid email is required.";
  if (!payload.projectType || payload.projectType.trim().length < 2) return "Project type is required.";
  if (!payload.message || payload.message.trim().length < 10) return "Message must be at least 10 characters.";
  if (payload.phone && payload.phone.length > 40) return "Phone is too long.";

  return null;
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as ContactSubmissionInput;
    const validationError = validate(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    await insertContactSubmission({
      fullName: payload.fullName.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone?.trim(),
      projectType: payload.projectType.trim(),
      message: payload.message.trim(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to submit form at this time." }, { status: 500 });
  }
}
