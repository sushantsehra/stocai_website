export const PERSONAL_COACHING_OFFER_CODE = "personal_coaching";

type VerificationResult = {
  activation_token?: unknown;
  account_already_active?: unknown;
};

export function buildPersonalCoachingCompletionUrl(
  completionUrl: string,
  verification: VerificationResult,
  origin: string,
) {
  const destination = new URL(completionUrl, origin);
  if (verification.activation_token) {
    destination.hash = new URLSearchParams({
      payment_activation: String(verification.activation_token),
    }).toString();
  } else if (verification.account_already_active) {
    destination.searchParams.set("auth", "login");
  } else {
    throw new Error(
      "Payment succeeded, but account activation could not be started. Please contact support.",
    );
  }
  return destination.toString();
}
