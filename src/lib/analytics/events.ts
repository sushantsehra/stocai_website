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
  const payload = {
    lead_id: input.leadId,
    source: input.source,
    event_id: `lead:${input.leadId}`,
  };
  posthog.capture("Lead", payload);
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
    order_id: input.orderId,
    value: typeof input.value === "number" ? input.value / 100 : undefined,
    currency: input.currency || "INR",
    source: input.source,
    event_id: `initiate_checkout:${input.orderId || input.checkoutId}`,
  };
  posthog.capture("InitiateCheckout", payload);
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
    order_id: input.orderId,
    value: typeof input.value === "number" ? input.value / 100 : undefined,
    currency: input.currency || "INR",
    source: input.source,
    discount_code: input.discountCode,
    event_id: `razorpay_checkout_opened:${input.orderId}`,
  };
  posthog.capture("razorpay_checkout_opened", payload);
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
    payment_id: input.paymentId,
    value: typeof input.value === "number" ? input.value / 100 : undefined,
    currency: input.currency || "INR",
    source: input.source,
    event_id: `purchase:${input.orderId}`,
  };
  posthog.capture("Purchase", payload);
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
