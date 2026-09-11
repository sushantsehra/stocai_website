# Analytics Event Map

Purpose: Keep a single source of truth for analytics events across PostHog and GTM.

## Conventions
- Event names: lower_snake_case
- Properties: lower_snake_case
- Avoid PII in event properties unless required and consented.
- PostHog is the product analytics source of truth.
- GTM consumes dataLayer events for marketing tags only.
- Preserve existing GTM-triggered conversion event names unless GTM is migrated first.

## Current GTM v10 conversion contract
- Container: GTM-5VLRJZ4H
- Meta Lead tag fires on dataLayer event: waitlist_submitted
- Meta InitiateCheckout tag fires on dataLayer event: razorpay_checkout_opened
- Meta Purchase tag fires on dataLayer event: Purchase
- Lead and InitiateCheckout dataLayer events may be emitted by the app, but GTM v10 does not currently trigger Meta tags from those event names.
- payment_redirected exists as a GTM trigger in v10, but no tag is attached.

## Attribution Properties (auto-attached in app)
- utm_source
- utm_medium
- utm_campaign
- utm_term
- utm_content
- utm_id
- utm_source_platform
- utm_creative_format
- utm_marketing_tactic
- gclid
- fbclid
- msclkid
- ttclid
- twclid
- li_fat_id
- initial_landing_url
- initial_referrer
- last_landing_url
- last_referrer
- last_touch_at

## Events

### Pageview
Event name: $pageview (PostHog only)
- Trigger: Route change (SPA) and initial load
- Properties:
  - path
  - search
  - url
  - (Attribution properties attached globally)

### Section viewed
Event name: section_viewed_{section_id}
- Trigger: a tracked section becomes visible in the viewport (first time per page load)
- Properties:
  - section_id
  - section_label
  - section
  - section_name
  - section_order
  - view_index (order the user saw sections in a session)
  - path
  - url
- PostHog: yes
- GTM dataLayer: no

### Waitlist modal opened
Event name: waitlist_modal_opened
- Trigger: a waitlist modal is actually opened
- Properties:
  - source (e.g. waitlist_section, waitlist_modal)
  - has_prefill_email (boolean)
- PostHog: yes
- GTM dataLayer: yes (event name = waitlist_modal_opened)

### Waitlist modal closed
Event name: waitlist_modal_closed
- Trigger: modal closed via close button or Escape key
- Properties:
  - source
  - close_reason (x_button | escape)
  - has_prefill_email (boolean)
- PostHog: yes
- GTM dataLayer: yes (event name = waitlist_modal_closed)

### Waitlist submit attempt
Event name: waitlist_submit_attempt
- Trigger: user clicks the final submit/request-access action
- Properties:
  - source
- PostHog: yes
- GTM dataLayer: yes (event name = waitlist_submit_attempt)

### Waitlist submitted
Event name: waitlist_submitted
- Trigger: waitlist API success
- Properties:
  - source
  - payment_started (boolean)
- PostHog: yes
- GTM dataLayer: yes (event name = waitlist_submitted)
- Current GTM v10 marketing conversion: Meta Lead
- Compatibility note: keep this event firing for the promotion-story lead step until GTM is deliberately migrated.

### Waitlist submit failed
Event name: waitlist_submit_failed
- Trigger: waitlist API error
- Properties:
  - source
  - error
- PostHog: yes
- GTM dataLayer: yes (event name = waitlist_submit_failed)

### Payment redirected
Event name: razorpay_checkout_opened
- Trigger: embedded Razorpay checkout is opened for a successfully created order
- Properties:
  - source
  - amount
- PostHog: yes
- GTM dataLayer: yes (event name = razorpay_checkout_opened)
- Suggested marketing conversion: optional (secondary)

### Lead
Event name: Lead
- Trigger: new lead/waitlist record is created
- Properties:
  - lead_id
  - source
  - event_id
- PostHog: yes
- GTM dataLayer: yes
- Current GTM v10 marketing conversion: none
- Migration note: this is the cleaner future canonical Meta Lead event, but GTM v10 currently uses waitlist_submitted.

### Initiate checkout
Event name: InitiateCheckout
- Trigger: payment order/checkout attempt is created
- Properties:
  - checkout_id
  - order_id
  - value
  - currency
  - source
  - event_id
- PostHog: yes
- GTM dataLayer: yes
- Current GTM v10 marketing conversion: none
- Migration note: this is the cleaner future canonical Meta InitiateCheckout event, but GTM v10 currently uses razorpay_checkout_opened.

### Purchase
Event name: Purchase
- Trigger: payment is verified
- Properties:
  - order_id
  - payment_id
  - value
  - currency
  - source
  - event_id
- PostHog: yes
- GTM dataLayer: yes
- Current GTM v10 marketing conversion: Meta Purchase

### Auth success
Event name: auth_success
- Trigger: login or signup success
- Properties:
  - method (signin | signup)
  - user_id
  - email_domain
- PostHog: yes (also identify)
- GTM dataLayer: yes (event name = auth_success)

### Auth error
Event name: auth_error
- Trigger: login or signup error
- Properties:
  - method
  - error
- PostHog: yes
- GTM dataLayer: yes (event name = auth_error)

## GTM Triggers (recommended)
- waitlist_submitted -> current primary Meta Lead conversion tag
- razorpay_checkout_opened -> current Meta InitiateCheckout conversion tag
- InitiateCheckout -> emitted by app; not wired to Meta in GTM v10
- Purchase -> Meta standard conversion, only after server verification
- auth_success -> optional (signup success)

## GTM Setup Checklist
- Create a GTM container and add the snippet (already in `src/app/layout.tsx`).
- Create tags:
  - Meta Pixel base tag
  - LinkedIn Insight tag
  - (Optional) Google Ads / GA4 tags
- Create triggers:
  - Custom Event: waitlist_submitted (current primary lead conversion)
  - Custom Event: razorpay_checkout_opened (current checkout conversion)
  - Standard Event: InitiateCheckout (future migration target)
  - Standard Event: Purchase
  - Custom Event: auth_success (optional)
- Verify in GTM Preview:
  - dataLayer events are firing on the correct user actions.
  - Tags fire only once per action.
- Publish the GTM container.

## PostHog Dashboards (suggested)
1) Website Acquisition
- Trends: $pageview
- Breakdown: utm_source, utm_campaign, first_referrer, path

2) Waitlist Funnel
- Steps: waitlist_modal_opened -> waitlist_submit_attempt -> waitlist_submitted -> InitiateCheckout -> razorpay_checkout_opened -> Purchase
- Breakdown: utm_source, utm_campaign

3) Promotion Architect Funnel
- Scope: /promotion-story and /promotion-flow
- Steps: promotion_story_cta_clicked -> promotion_story_access_submit_attempt -> waitlist_submitted -> promotion_flow_started -> promotion_flow_step_viewed(current_step = offer) -> promotion_flow_completed -> checkout_modal_opened -> razorpay_checkout_opened -> Purchase
- Breakdown: source, cta_location, barrier_id, choice_id, utm_source, utm_campaign
- Notes:
  - waitlist_submitted remains in this funnel because GTM v10 uses it for Meta Lead.
  - checkout_modal_opened is a semantic product event; waitlist_modal_opened is still emitted for compatibility where the modal actually opens.
  - Use Purchase as the only paid conversion event.

## Promotion Journey Events

### Promotion story CTA clicked
Event name: promotion_story_cta_clicked
- Trigger: user clicks a promotion-story CTA that expands the request-access form
- Properties:
  - journey = promotion_architect
  - journey_version
  - source
  - cta_location
  - cta_label
  - page_path
  - page_url
- PostHog: yes
- GTM dataLayer: yes (diagnostic only in GTM v10)

### Promotion story access submit attempt
Event name: promotion_story_access_submit_attempt
- Trigger: user submits the promotion-story request-access form
- Properties:
  - journey
  - journey_version
  - source
  - entry_page
  - redirect_after_request_access
- PostHog: yes
- GTM dataLayer: yes (diagnostic only in GTM v10)

### Promotion story access submitted
Event name: promotion_story_access_submitted
- Trigger: waitlist API success from promotion-story request access
- Properties:
  - journey
  - journey_version
  - source
  - waitlist_reference_id
  - promotion_flow_session_id
  - payment_started = false
  - updated
- PostHog: yes
- GTM dataLayer: yes (diagnostic only in GTM v10)

### Promotion flow started
Event name: promotion_flow_started
- Trigger: promotion-flow route/view starts
- Properties:
  - journey
  - journey_version
  - source
  - current_step
  - promotion_flow_session_id
  - barrier_id
  - barrier_label
  - choice_id
  - choice_label
- PostHog: yes
- GTM dataLayer: yes (diagnostic only in GTM v10)

### Promotion flow step viewed
Event name: promotion_flow_step_viewed
- Trigger: a promotion-flow step is viewed
- Properties:
  - journey
  - journey_version
  - source
  - current_step
  - promotion_flow_session_id
  - barrier_id
  - barrier_label
  - choice_id
  - choice_label
- PostHog: yes
- GTM dataLayer: yes (diagnostic only in GTM v10)

### Promotion flow completed
Event name: promotion_flow_completed
- Trigger: user clicks the final promotion-flow access CTA
- Properties:
  - journey
  - journey_version
  - source
  - current_step
  - promotion_flow_session_id
  - barrier_id
  - barrier_label
  - choice_id
  - choice_label
- PostHog: yes
- GTM dataLayer: yes (diagnostic only in GTM v10)

### Checkout modal opened
Event name: checkout_modal_opened
- Trigger: promotion checkout modal is actually opened
- Properties:
  - journey
  - journey_version
  - source
  - modal_kind
  - has_prefill_email
  - has_reference_id
  - cta_location
- PostHog: yes
- GTM dataLayer: yes (diagnostic only in GTM v10)

### Checkout modal closed
Event name: checkout_modal_closed
- Trigger: promotion checkout modal is closed by close button or Escape key
- Properties:
  - journey
  - journey_version
  - source
  - close_reason
  - has_prefill_email
  - has_reference_id
- PostHog: yes
- GTM dataLayer: yes (diagnostic only in GTM v10)

## Compatibility Events
- waitlist_modal_opened: still emitted when a waitlist/promotion checkout modal actually opens. Do not use as the first step of the new promotion-story funnel.
- waitlist_modal_closed: still emitted for explicit modal close actions where implemented.
- waitlist_submitted: still the current GTM v10 Meta Lead trigger.
- razorpay_checkout_opened: still the current GTM v10 Meta InitiateCheckout trigger.
- Purchase: still the current GTM v10 Meta Purchase trigger.
- payment_redirected: dormant/inactive GTM trigger with no attached tag in v10; do not use for active Meta optimization.
