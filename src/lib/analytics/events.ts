import posthog from "posthog-js";

export const pushToDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const target = window as unknown as Window & { dataLayer?: unknown[] };
  target.dataLayer ||= [];
  target.dataLayer.push(payload);
};

export const trackCtaClick = (input: { location: string; label: string; source?: string }) => {
  const payload = {
    cta_location: input.location,
    cta_label: input.label.trim(),
    source: input.source,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  };
  posthog.capture("cta_clicked", payload);
  pushToDataLayer({ event: "cta_clicked", ...payload });
};

export const trackLead = (input: { leadId: string; source: string }) => {
  const payload = { lead_id: input.leadId, source: input.source };
  posthog.capture("Lead", payload);
  pushToDataLayer({ event: "Lead", ...payload });
};

export const trackInitiateCheckout = (input: {
  checkoutId: string;
  paymentLinkId?: string;
  value?: number;
  currency?: string;
  source: string;
}) => {
  const payload = {
    checkout_id: input.checkoutId,
    payment_link_id: input.paymentLinkId,
    value: typeof input.value === "number" ? input.value / 100 : undefined,
    currency: input.currency || "INR",
    source: input.source,
  };
  posthog.capture("InitiateCheckout", payload);
  pushToDataLayer({ event: "InitiateCheckout", ...payload });
};
