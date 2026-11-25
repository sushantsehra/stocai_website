# Personal coaching checkout contract

The `/personal-coaching` frontend sends `offer_code: "personal_coaching"` to
`POST /payments/razorpay/order` after creating or updating the lead through the existing
`POST /waitlist` flow.

The admin Payment Settings screen owns this offer's price through
`personal_coaching_amount` (`Personal Coaching Amount Paise` in backend storage). The initial
migration seeds `1999900` paise (₹19,999), but neither the landing page nor order creation keeps
that value in code. Missing or invalid configuration disables the page CTA and makes order
creation fail closed.

The payment service configuration also supplies the currency and platform signup
`completion_url`.

Order creation and verification remain authoritative. The frontend refuses to open Razorpay
if the returned amount or currency differs from the current admin configuration. After verified
payment it uses the existing activation-token/account-active response and redirects to the
returned `completion_url`.

Welcome-email delivery reuses the existing verified-payment onboarding workflow and must be
idempotent: provider retries, checkout recovery, or repeated verification must not send duplicate
welcome emails or grant duplicate access.
