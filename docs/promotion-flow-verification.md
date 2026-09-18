# Promotion flow tracking and persistence verification

Scope: the current five-barrier, five-answer flow and its shared checkout. No production writes, charges, GTM container changes, or PostHog project changes were made.

## Contract and repairs

- Screen views, completion, checkout open/close, pricing disclosure, and payment events reach both the PostHog SDK and GTM data layer. Existing event names, currency units, and order-based event IDs remain unchanged.
- First flow events include the saved session ID. `promotion_flow_started` and `promotion_flow_completed` are emitted once per backend session in the same browser tab, across screen remounts and refreshes. Screen views still record actual revisits.
- Backend step names stay compatible with the existing API: `prime_suspect`, `truth`, `principle`, `honest_choice`, `consequence`, `offer`. New Screen 03 uses `consequence`, not the rejected `insight` value. Its URL remains `stage=insight`.
- All 25 combinations save barrier and choice IDs/labels. Changing the barrier/starting again clears stale answer fields explicitly because the backend merges partial answer objects.
- Internal navigation uses Next links with keyed screen instances. Pending saves remain serialized across normal client navigation. Identical renders do not create extra PATCHes; completion follows outstanding progress writes.
- Transient save failures get one bounded retry. Pending payloads remain in session storage for a later mount or online event. Persistent failures emit `promotion_flow_save_failed` with a sanitized reason; tokens are never stored in that progress record or sent to analytics.
- Returning visitors resume the backend's saved screen and answer. Both new and legacy answer URLs are supported; legacy consequence links retain the choice through the offer.
- `checkout_pricing_viewed` records the new disclosure. Checkout/purchase events on `/promotion-flow` include session/barrier/choice correlation. Other routes do not inherit this context. Backdrop dismissals are tracked as well as Escape/close-button dismissals.
- The payment order endpoint, authentication token/header contracts, checkout verification, account activation, amounts, and existing event IDs are unchanged.

Completion means clicking the Screen 04 access CTA, as before. It is not a purchase; `Purchase` remains conditional on successful payment verification. Anonymous visits without waitlist-issued session credentials can emit analytics but cannot save an authenticated backend session.

### Checkout page update

The promotion flow now navigates to `stage=checkout`, retaining barrier and choice query parameters. This renders a full-width scrollable page with a full-height left panel and no modal overlay, body scroll lock, Escape dismissal, or modal-open DOM events. Contact/session data is loaded from the existing diagnostic context before checkout mounts. Other callers continue to use the default popup presentation.

The backend still receives the supported terminal `offer` step; entering/reloading checkout ensures completion without introducing a rejected backend enum. `checkout_page_viewed` records the actual page view; the existing `checkout_modal_opened` funnel event is also emitted with `modal_kind=promotion_checkout_page` for GTM/PostHog compatibility. Payment events and pricing disclosure events are unchanged. Component integration covers the page through stored-contact hydration, pricing expansion, order creation and mocked verified payment, alongside both existing popup variants.

## Evidence

- Four new lifecycle tests reproduced failures before repairs: missing first-event session ID, repeated start events, repeated PATCH on unchanged renders, and concurrent completion/progress saves.
- React/jsdom tests exercise all 25 current journeys, legacy links, invalid links, both checkout variants, pricing expansion, order failure, payment-event values, and saved answer payloads. Payment provider/network calls are mocked; these are component integration tests, not live payment tests.
- Unit tests check retry recovery, pending payload retention, completion preservation, resume mapping, GTM/PostHog parity, failure isolation, and token/contact-data exclusion.
- Actual backend FastAPI routes and SQLAlchemy controllers were exercised using an isolated in-memory SQLite database (JSONB compiled as JSON). All 25 exact frontend combinations persisted; `insight` returned 422; invalid token returned 404; missing token returned 422; partial-answer merge, completion timestamps, sequential downgrade protection, and seeded resume sessions passed. Existing backend focused suite: 4 passed. Backend files were not changed.
- Added testing-library/react and jsdom as development dependencies only. Existing runtime dependency versions were not changed.
- Full frontend suite: 85 tests passed. A final additional legacy-start-screen resume regression was then added; all 8 focused resume tests passed (86 distinct passing tests across those runs). TypeScript, focused ESLint, whitespace checks, and the production Next.js build passed before that final bounded resume correction; focused tests and lint were rerun afterward. The pre-existing readonly `NODE_ENV` test errors were corrected using Vitest's environment-stubbing API.

Commands:

```powershell
node node_modules/vitest/vitest.mjs run --pool=threads --configLoader=native
node node_modules/typescript/bin/tsc --noEmit --incremental false
# Focused ESLint on changed TS/TSX files, plus git diff --check.
$env:NEXT_DIST_DIR='.next-verify'
node node_modules/next/dist/bin/next build
```

## Boundaries not proven by these checks

No connected browser or live GTM/PostHog administration session was available. SDK/data-layer emission is verified, not receipt by production analytics destinations, GTM trigger configuration, consent/ad-block behavior, or deployed artifact parity. PostHog is intentionally disabled by the development environment configuration.

SQLite checks prove the actual API/controller persistence path in isolation, not production PostgreSQL concurrency. The backend currently performs read/merge/write without a revision check or row lock. The client queue prevents normal same-tab overlap, but cannot guarantee cross-tab ordering or cancel a server transaction after a fetch timeout. Production-wide concurrency guarantees would require an authoritative backend ordering contract.

Browser visual/interaction verification and production analytics receipt should be checked in staging with a disposable lead before release; never infer them from these mocked frontend tests.
