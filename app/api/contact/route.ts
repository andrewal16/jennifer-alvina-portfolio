import { NextResponse } from "next/server";
import { insertContactSubmission } from "@/lib/neon";
import { sendContactInquiryEmail } from "@/lib/resend";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type {
  ContactSubmissionInput,
  ContactSubmissionRequest,
} from "@/lib/types";

function validate(payload: ContactSubmissionInput) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!payload.fullName || payload.fullName.trim().length < 2)
    return "Full name is required.";
  if (!payload.email || !emailRegex.test(payload.email))
    return "Valid email is required.";
  if (!payload.projectType || payload.projectType.trim().length < 2)
    return "Project type is required.";
  if (!payload.message || payload.message.trim().length < 10)
    return "Message must be at least 10 characters.";
  if (payload.phone && payload.phone.length > 40) return "Phone is too long.";

  return null;
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as ContactSubmissionRequest;
    const turnstileToken = payload.turnstileToken?.trim();
    const validationError = validate(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Please complete the spam protection check." },
        { status: 400 },
      );
    }

    const remoteIpHeader =
      req.headers.get("cf-connecting-ip") ??
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip");
    const remoteIp = remoteIpHeader?.split(",")[0]?.trim();

    const turnstileResult = await verifyTurnstileToken(
      turnstileToken,
      remoteIp,
    );

    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: "Spam protection verification failed. Please try again." },
        { status: 400 },
      );
    }

    const submission: ContactSubmissionInput = {
      fullName: payload.fullName.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone?.trim(),
      projectType: payload.projectType.trim(),
      message: payload.message.trim(),
    };

    await Promise.all([
      insertContactSubmission(submission),
      sendContactInquiryEmail(submission),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact submission failed:", error);

    return NextResponse.json(
      { error: "Unable to submit form at this time." },
      { status: 500 },
    );
  }
}
