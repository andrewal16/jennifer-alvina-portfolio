const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;

type TurnstileVerificationResult = {
  success: boolean;
  hostname?: string;
  action?: string;
  cdata?: string;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string | null,
): Promise<TurnstileVerificationResult> {
  if (!turnstileSecretKey) {
    throw new Error("TURNSTILE_SECRET_KEY is not configured.");
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: turnstileSecretKey,
        response: token,
        remoteip: remoteIp ?? undefined,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Turnstile verification request failed.");
  }

  return (await response.json()) as TurnstileVerificationResult;
}
