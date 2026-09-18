import posthog from "posthog-js";
import { readStoDiagnosticContext } from "../diagnosticContext";

const capturePostHog = (event: string, payload: Record<string, unknown>) => {
  try { posthog.capture(event, payload); }
  catch { console.warn("PostHog event could not be queued", { event }); }
};

const flowContext = () => {
  if (typeof window === "undefined" || window.location.pathname !== "/promotion-flow") return {};
  const context = readStoDiagnosticContext();
  const params = new URLSearchParams(window.location.search);
  return {
    promotion_flow_session_id: context.promotionFlowSessionId,
    barrier_id: params.get("barrier") || undefined,
    choice_id: params.get("choice") || undefined,
  };
};

export const pushToDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const target = window as unknown as Window & { dataLayer?: unknown[] };
  try {
    target.dataLayer ||= [];
    target.dataLayer.push(payload);
  } catch { console.warn("GTM event could not be queued", { event: payload.event }); }
};

export const trackCtaClick = (input: { location: string; label: string; source?: string }) => {
  const payload = {
    cta_location: input.location,
    cta_label: input.label.trim(),
    source: input.source,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
    ...flowContext(),
  };
  capturePostHog("cta_clicked", payload);
  pushToDataLayer({ event: "cta_clicked", ...payload });
};

const pageContext = () => ({
  page_path: typeof window !== "undefined" ? window.location.pathname : "",
  page_url: typeof window !== "undefined" ? window.location.href : "",
});

const promotionJourneyPayload = (properties: Record<string, unknown> = {}) => ({
  journey: "promotion_architect",
  journey_version: "v1",
  ...flowContext(),
  ...pageContext(),
  ...properties,
});

export const trackPromotionJourneyEvent = (
  event: string,
  properties: Record<string, unknown> = {},
) => {
  const payload = promotionJourneyPayload(properties);
  capturePostHog(event, payload);
  pushToDataLayer({ event, ...payload });
};

export const trackCheckoutModalOpened = (input: {
  source: string;
  modalKind?: string;
  hasPrefillEmail?: boolean;
  hasReferenceId?: boolean;
  ctaLocation?: string;
}) => {
  trackPromotionJourneyEvent("checkout_modal_opened", {
    source: input.source,
    modal_kind: input.modalKind || "promotion_checkout",
    has_prefill_email: Boolean(input.hasPrefillEmail),
    has_reference_id: Boolean(input.hasReferenceId),
    cta_location: input.ctaLocation,
  });
};

export const trackLead = (input: { leadId: string; source: string }) => {
  const payload = {
    lead_id: input.leadId,
    source: input.source,
    event_id: `lead:${input.leadId}`,
  };
  capturePostHog("Lead", payload);
  pushToDataLayer({ event: "Lead", ...payload });
};

export const trackInitiateCheckout = (input: {
  checkoutId: string;
  orderId?: string;
  value?: number;
  currency?: string;
  source: string;
}) => {
  const payload = {
    checkout_id: input.checkoutId,
    ...flowContext(),
    order_id: input.orderId,
    value: typeof input.value === "number" ? input.value / 100 : undefined,
    currency: input.currency || "INR",
    source: input.source,
    event_id: `initiate_checkout:${input.orderId || input.checkoutId}`,
  };
  capturePostHog("InitiateCheckout", payload);
  pushToDataLayer({ event: "InitiateCheckout", ...payload });
};

export const trackRazorpayCheckoutOpened = (input: {
  checkoutId: string;
  orderId: string;
  value?: number;
  currency?: string;
  source: string;
  discountCode?: string;
}) => {
  const payload = {
    checkout_id: input.checkoutId,
    ...flowContext(),
    order_id: input.orderId,
    value: typeof input.value === "number" ? input.value / 100 : undefined,
    currency: input.currency || "INR",
    source: input.source,
    discount_code: input.discountCode,
    event_id: `razorpay_checkout_opened:${input.orderId}`,
  };
  capturePostHog("razorpay_checkout_opened", payload);
  pushToDataLayer({ event: "razorpay_checkout_opened", ...payload });
};

export const trackPurchase = (input: {
  orderId: string;
  paymentId?: string;
  value?: number;
  currency?: string;
  source: string;
}) => {
  const payload = {
    order_id: input.orderId,
    ...flowContext(),
    payment_id: input.paymentId,
    value: typeof input.value === "number" ? input.value / 100 : undefined,
    currency: input.currency || "INR",
    source: input.source,
    event_id: `purchase:${input.orderId}`,
  };
  capturePostHog("Purchase", payload);
  if (typeof window === "undefined") return Promise.resolve();

  return new Promise<void>((resolve) => {
    let completed = false;
    const finish = () => {
      if (completed) return;
      completed = true;
      window.clearTimeout(fallback);
      resolve();
    };
    const fallback = window.setTimeout(finish, 1200);
    pushToDataLayer({
      event: "Purchase",
      ...payload,
      eventCallback: finish,
      eventTimeout: 1000,
    });
  });
};
