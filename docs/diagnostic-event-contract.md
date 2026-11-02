# Diagnostic event coverage — v1

Status: approved scope from Amit's “okay. proceed”; implementation base `a72907e`.

Marketing needs to distinguish each displayed diagnostic screen, its answer/CTA
clicks, and progression to the next screen. This change emits website events to
the existing PostHog adapter and GTM data layer. GA4/Meta account configuration,
container publication, reporting, backend schemas, payments and copy are excluded.

Acceptance criteria:

- D1: Every displayed screen emits `promotion_flow_step_viewed` with a stable
  `screen_id`, `step_number`, `flow_version`, and flow session ID. Main screens:
  prime_suspect (1), truth (2), solving (3), insight (4), offer (5), checkout (6).
  Legacy honest_choice (3) and consequence (4) remain distinguishable. Invalid
  URLs describe the screen actually displayed, not the requested screen.
- D2: Every diagnostic answer and forward CTA emits
  `promotion_flow_step_clicked` synchronously with current screen, CTA ID/label,
  selected option where relevant, and destination. Include Start again and the
  checkout pricing, programme payment and callback payment buttons. Global
  home/account navigation and provider-owned Razorpay controls are excluded.
- D3: Ordinary rerenders do not repeat screen views. A remount, refresh or
  back-navigation visit records another view; raw views/clicks are not unique
  visitor counts. Start/completion remain once per flow session per browser tab.
  Anonymous direct visits get a non-contact analytics session ID that survives
  navigation/refresh when sessionStorage is available; they do not gain backend
  write credentials. Start again revisits the existing session, rather than
  inventing a new backend attempt.
- D4: Preserve existing event names, lifecycle completion policy, Meta aliases,
  backend step enums/progress writes and conversion/payment behaviour. Completion
  continues to mean proceeding from the offer to checkout, including direct
  checkout recovery; it does not mean purchase.
- D5: Emit identical diagnostic properties to both adapters. Never attach saved
  name, email, phone or flow update tokens. Exclude query strings/fragments from
  journey `page_url` properties. Adapter failure must not block navigation.
- D6: Document the event/screen map, count semantics and future GTM wiring.

Delta risk: Medium, bounded analytics behaviour. Ambient risk: High in checkout;
payment/authentication/persistence logic must remain untouched. Bounded-material
independent review; component/data-layer evidence, not live GA4/Meta delivery.

Existing oversized checkout container: allow callback CTA tracking and an injected
pricing-click callback next to its existing tracking. Shared analytics logic belongs in the analytics module;
broader checkout decomposition is deferred until material checkout behaviour changes.

## Verification at handoff (2026-11-02)

- `npm.cmd test`: exit 0; 14 files, 114 tests passed (35.24s).
  Initial sandbox startup was blocked by `spawn EPERM`; approved outside-sandbox run used.
- `node_modules/.bin/tsc.cmd --noEmit --incremental false`: exit 0.
- Focused ESLint on shared analytics/context, tracking hook, flow/screens and checkout
  presentation: exit 0. `git diff --check`: exit 0.
- Component journeys exercise all 25 barrier/approach combinations, five barrier
  choices, legacy paths, invalid insight/consequence fallback, checkout actions,
  lifecycle remount/revisit/StrictMode and anonymous navigation. Adapters are real
  app functions; PostHog transport, Next image and network/provider responses are
  test doubles. Assertions inspect both captured properties and real dataLayer arrays.
- Independent bounded review: no remaining P0/P1/P2 findings; independent focused
  event-adapter/checkout run passed 19 tests. Pricing activation was corrected from
  asynchronous disclosure observation to synchronous summary activation; regression
  failed first, then passed for rapid reveal/hide and programmatic disclosure.
- No live GA4/Meta delivery, GTM publication, real payments, backend database or
  browser back/refresh was exercised. The latter semantics use component remount
  tests and inspection of Next's existing keyed route. No local servers started.

The implementation targets the website `dev` branch. No backend/admin repo changes
or live analytics account changes are part of this implementation.
