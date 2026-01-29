# Analytics Event Map

Purpose: Keep a single source of truth for analytics events across PostHog and GTM.

## Conventions
- Event names: lower_snake_case
- Properties: lower_snake_case
- Avoid PII in event properties unless required and consented.
- PostHog is the product analytics source of truth.
- GTM consumes dataLayer events for marketing tags only.

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
Event name: section_viewed
- Trigger: a tracked section becomes visible in the viewport (first time per page load)
- Properties:
  - section_id
  - section_label
  - section_order
  - view_index (order the user saw sections in a session)
  - path
  - url
- PostHog: yes
- GTM dataLayer: no

### Waitlist modal opened
Event name: waitlist_modal_opened
- Trigger: click on any waitlist CTA
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
- Trigger: submit button clicked
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
- Suggested marketing conversion: Meta/LinkedIn/Google

### Waitlist submit failed
Event name: waitlist_submit_failed
- Trigger: waitlist API error
- Properties:
  - source
  - error
- PostHog: yes
- GTM dataLayer: yes (event name = waitlist_submit_failed)

### Payment redirected
Event name: payment_redirected
- Trigger: redirect to payment short URL
- Properties:
  - source
  - amount
- PostHog: yes
- GTM dataLayer: yes (event name = payment_redirected)
- Suggested marketing conversion: optional (secondary)

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
- waitlist_submitted -> primary conversion tag (Meta + LinkedIn + Google Ads)
- payment_redirected -> secondary conversion tag (optional)
- auth_success -> optional (signup success)

## GTM Setup Checklist
- Create a GTM container and add the snippet (already in `src/app/layout.tsx`).
- Create tags:
  - Meta Pixel base tag
  - LinkedIn Insight tag
  - (Optional) Google Ads / GA4 tags
- Create triggers:
  - Custom Event: waitlist_submitted (primary conversion)
  - Custom Event: payment_redirected (secondary conversion)
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
- Steps: waitlist_modal_opened -> waitlist_submit_attempt -> waitlist_submitted -> payment_redirected
- Breakdown: utm_source, utm_campaign
