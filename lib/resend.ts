import type { ContactSubmissionInput } from "@/lib/types";

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL;
const contactInboxEmail =
  process.env.CONTACT_TO_EMAIL ?? "jenniferatelier@gmail.com";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatOptionalLine(label: string, value?: string) {
  return value?.trim() ? `${label}: ${value.trim()}` : null;
}

export async function sendContactInquiryEmail(payload: ContactSubmissionInput) {
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!resendFromEmail) {
    throw new Error("RESEND_FROM_EMAIL is not configured.");
  }

  const fullName = payload.fullName.trim();
  const email = payload.email.trim().toLowerCase();
  const phone = payload.phone?.trim();
  const projectType = payload.projectType.trim();
  const message = payload.message.trim();

  const text = [
    "New interior design inquiry",
    "",
    `Name: ${fullName}`,
    `Email: ${email}`,
    formatOptionalLine("Phone", phone),
    `Project Type: ${projectType}`,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="background:#f6f3ef;padding:32px;font-family:Arial,sans-serif;color:#1f1b17;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e7e0d6;padding:32px;">
        <p style="margin:0;color:#78716c;font-size:11px;letter-spacing:0.24em;text-transform:uppercase;">New Inquiry</p>
        <h1 style="margin:16px 0 12px;font-family:Georgia,serif;font-size:32px;line-height:1.2;color:#1c1917;">Interior Design Contact Submission</h1>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#57534e;">A new inquiry was submitted from the Jennifer Atelier portfolio website.</p>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tbody>
            <tr><td style="padding:12px 0;border-top:1px solid #e7e0d6;color:#78716c;font-size:12px;text-transform:uppercase;letter-spacing:0.16em;">Name</td><td style="padding:12px 0;border-top:1px solid #e7e0d6;font-size:15px;color:#1c1917;">${escapeHtml(fullName)}</td></tr>
            <tr><td style="padding:12px 0;border-top:1px solid #e7e0d6;color:#78716c;font-size:12px;text-transform:uppercase;letter-spacing:0.16em;">Email</td><td style="padding:12px 0;border-top:1px solid #e7e0d6;font-size:15px;color:#1c1917;">${escapeHtml(email)}</td></tr>
            ${
              phone
                ? `<tr><td style="padding:12px 0;border-top:1px solid #e7e0d6;color:#78716c;font-size:12px;text-transform:uppercase;letter-spacing:0.16em;">Phone</td><td style="padding:12px 0;border-top:1px solid #e7e0d6;font-size:15px;color:#1c1917;">${escapeHtml(phone)}</td></tr>`
                : ""
            }
            <tr><td style="padding:12px 0;border-top:1px solid #e7e0d6;border-bottom:1px solid #e7e0d6;color:#78716c;font-size:12px;text-transform:uppercase;letter-spacing:0.16em;">Project Type</td><td style="padding:12px 0;border-top:1px solid #e7e0d6;border-bottom:1px solid #e7e0d6;font-size:15px;color:#1c1917;">${escapeHtml(projectType)}</td></tr>
          </tbody>
        </table>

        <div style="padding:24px;background:#faf8f5;border:1px solid #ede7df;">
          <p style="margin:0 0 12px;color:#78716c;font-size:12px;text-transform:uppercase;letter-spacing:0.16em;">Project Brief</p>
          <p style="margin:0;font-size:15px;line-height:1.9;color:#292524;white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
      </div>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFromEmail,
      to: [contactInboxEmail],
      subject: `New inquiry from ${fullName}`,
      reply_to: email,
      html,
      text,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Resend email delivery failed.");
  }

  return (await response.json()) as { id: string };
}
