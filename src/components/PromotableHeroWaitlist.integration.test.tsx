// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import posthog from "posthog-js";
import PromotableHeroWaitlist from "./PromotableHeroWaitlist";
import CheckoutScreen from "@/app/promotion-flow/CheckoutScreen";
import { openRazorpayCheckout, RazorpayCheckoutError } from "@/lib/razorpayCheckout";

vi.mock("posthog-js", () => ({ default: { capture: vi.fn() } }));
vi.mock("@/utils/env", () => ({ default: { apiUrl: "http://localhost:8000" } }));
vi.mock("@/hooks/useSubscriptionAmount", () => ({
  default: () => 499900,
  usePaymentSettings: () => ({ subscriptionAmount: 499900, callbackAmount: 49900, currency: "INR" }),
  formatSubscriptionAmount: (amount: number) => `₹${amount / 100}`,
}));
vi.mock("@/lib/razorpayCheckout", () => {
  class MockRazorpayCheckoutError extends Error {
    code: "dismissed" | "confirmation_pending" | "verification_failed";
    constructor(code: MockRazorpayCheckoutError["code"], message: string) {
      super(message);
      this.code = code;
    }
  }
  return {
    openRazorpayCheckout: vi.fn().mockResolvedValue({ state: "callback_requested", razorpay_payment_id: "test-payment", message: "Payment confirmed. Expect a callback within the next 24 hours." }),
    RazorpayCheckoutError: MockRazorpayCheckoutError,
  };
});
const dataLayer: Record<string, unknown>[] = [];

beforeEach(() => {
  dataLayer.length = 0;
  Object.assign(window, { dataLayer });
  vi.mocked(posthog.capture).mockClear();
  vi.mocked(openRazorpayCheckout).mockClear();
  sessionStorage.setItem("stoDiagnosticContext", JSON.stringify({ promotionFlowSessionId: "test-flow", promotionFlowToken: "private-token", name: "Test", email: "test@example.test", phone: "9000000000", countryCode: "+91", referenceId: "test-reference", source: "promotion_story_sticky_cta" }));
  window.history.replaceState({}, "", "/promotion-flow?barrier=invisible-work&stage=offer&choice=good-work");
  vi.stubGlobal("fetch", vi.fn(async (url) => ({ ok: true, json: async () => String(url).endsWith("/consultations/slots")
    ? { enabled: false }
    : String(url).endsWith("/payments/razorpay/callback/order")
      ? { order_id: "callback-order", key_id: "test-key", checkout_attempt_id: "callback-attempt", amount: 49900, currency: "INR" }
      : { order_id: "test-order", key_id: "test-key", checkout_attempt_id: "test-attempt", amount: 499900, currency: "INR" } })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("checkout event and payment wiring", () => {
  it.each([["promotion-architect", "modal"], ["default", "modal"], ["promotion-architect", "page"]] as const)("preserves payment events and payloads for %s / %s checkout", async (variant, presentation) => {
    const close = vi.fn();
    if (presentation === "page") window.history.replaceState({}, "", "/promotion-flow?barrier=invisible-work&stage=checkout&choice=good-work");
    render(presentation === "page" ? <CheckoutScreen /> : <PromotableHeroWaitlist isOpen onClose={close} initialName="Test" initialEmail="test@example.test" initialPhone="9000000000" initialReferenceId="test-reference" checkoutVariant={variant} source="promotion_story_sticky_cta" />);
    if (presentation === "page") {
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(screen.queryByRole("button", { name: "Close waitlist" })).toBeNull();
      expect(document.body.style.overflow).not.toBe("hidden");
      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Build the case for your next promotion.");
      expect(screen.queryByRole("link", { name: "Your promotion direction" })).toBeNull();
      fireEvent.keyDown(document, { key: "Escape" });
      expect(close).not.toHaveBeenCalled();
      expect(dataLayer.find((item) => item.event === "checkout_page_viewed")).toBeDefined();
      expect(dataLayer.find((item) => item.event === "checkout_modal_opened")).toMatchObject({ modal_kind: "promotion_checkout_page" });
    }
    if (variant === "promotion-architect") {
      fireEvent.click(screen.getByText("Invest ₹4,999 in my next promotion"));
      await waitFor(() => expect(dataLayer.some((item) => item.event === "checkout_pricing_viewed")).toBe(true));
      expect(dataLayer.find((item) => item.event === "cta_clicked")).toMatchObject({
        cta_location: "checkout_pricing",
        cta_label: "Invest in my next promotion",
        source: "promotion_story_sticky_cta",
      });
      expect(dataLayer.find((item) => item.event === "checkout_pricing_viewed")).toMatchObject({
        source: "promotion_story_sticky_cta",
        value: 4999,
        currency: "INR",
      });
      expect(posthog.capture).toHaveBeenCalledWith("cta_clicked", expect.objectContaining({
        cta_location: "checkout_pricing",
        cta_label: "Invest in my next promotion",
      }));
      expect(openRazorpayCheckout).not.toHaveBeenCalled();
    }
    fireEvent.click(screen.getByRole("button", { name: variant === "promotion-architect" ? /Get access/ : /Proceed to Secure Checkout/ }));
    if (presentation === "page") {
      expect(dataLayer.filter((item) => item.event === "promotion_flow_step_clicked").map((item) => item.cta_id)).toEqual(["reveal_pricing", "get_access"]);
      expect(dataLayer.find((item) => item.event === "promotion_flow_step_clicked" && item.cta_id === "get_access")).toMatchObject({ screen_id: "checkout", step_number: 6, next_screen_id: "programme_payment", promotion_flow_session_id: "test-flow" });
    }
    await waitFor(() => expect(dataLayer.some((item) => item.event === "Purchase")).toBe(true));
    for (const event of ["checkout_modal_opened", "InitiateCheckout", "razorpay_checkout_opened", "Purchase"]) {
      const payload = dataLayer.find((item) => item.event === event)!;
      expect(payload).toBeDefined();
      expect(posthog.capture).toHaveBeenCalledWith(event, expect.objectContaining({ promotion_flow_session_id: "test-flow", barrier_id: "invisible-work", choice_id: "good-work" }));
      if (event !== "checkout_modal_opened") expect(payload).toMatchObject({ value: 4999, currency: "INR" });
    }
    expect(JSON.stringify(dataLayer)).not.toContain("private-token");
    const orderRequest = vi.mocked(fetch).mock.calls.find(([url]) => String(url).endsWith("/payments/razorpay/order"));
    expect(JSON.parse(orderRequest![1]!.body as string)).toMatchObject({ reference_id: "test-reference", phone: "+919000000000" });
    expect(openRazorpayCheckout).toHaveBeenCalledTimes(1);
    (dataLayer.find((item) => item.event === "Purchase")!.eventCallback as () => void)();
  });

  it("does not report checkout or purchase when order creation fails", async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false, json: async () => ({ error: "Payment service unavailable" }) } as Response);
    render(<PromotableHeroWaitlist isOpen onClose={() => {}} initialName="Test" initialEmail="test@example.test" initialPhone="9000000000" initialReferenceId="test-reference" checkoutVariant="promotion-architect" />);
    const details = screen.getByText("Invest ₹4,999 in my next promotion").closest("details")!;
    details.open = true;
    fireEvent.click(screen.getByRole("button", { name: /Get access/ }));
    await screen.findByText("Payment service unavailable");
    expect(dataLayer.some((item) => ["InitiateCheckout", "Purchase"].includes(String(item.event)))).toBe(false);
    expect(openRazorpayCheckout).not.toHaveBeenCalled();
  });

  it("records pricing activations synchronously, even when rapid toggles coalesce", () => {
    window.history.replaceState({}, "", "/promotion-flow?barrier=invisible-work&stage=checkout&choice=good-work");
    render(<CheckoutScreen />);
    const summary = screen.getByText("Invest ₹4,999 in my next promotion");
    fireEvent.click(summary);
    expect(dataLayer.filter((item) => item.event === "promotion_flow_step_clicked").map((item) => item.cta_id)).toEqual(["reveal_pricing"]);
    fireEvent.click(summary);
    expect(dataLayer.filter((item) => item.event === "promotion_flow_step_clicked").map((item) => item.cta_id)).toEqual(["reveal_pricing", "hide_pricing"]);
  });

  it("does not report a diagnostic click for programmatic pricing disclosure", async () => {
    window.history.replaceState({}, "", "/promotion-flow?barrier=invisible-work&stage=checkout&choice=good-work");
    render(<CheckoutScreen />);
    const details = screen.getByText("Invest ₹4,999 in my next promotion").closest("details")!;
    details.open = true;
    await waitFor(() => expect(dataLayer.some((item) => item.event === "checkout_pricing_viewed")).toBe(true));
    expect(dataLayer.filter((item) => item.event === "promotion_flow_step_clicked")).toEqual([]);
  });

  it("tracks the configured callback payment in PostHog and GA4 without firing the subscription Purchase event", async () => {
    window.history.replaceState({}, "", "/promotion-flow?barrier=invisible-work&stage=checkout&choice=good-work");
    render(<PromotableHeroWaitlist isOpen onClose={() => {}} initialName="Test" initialEmail="test@example.test" initialPhone="9000000000" initialReferenceId="test-reference" checkoutVariant="promotion-architect" source="promotion_flow" />);

    expect(screen.queryByRole("link", { name: /Book a diagnostic call/ })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Book a diagnostic call — ₹499/ }));

    await screen.findByText("Payment confirmed. Expect a callback within the next 24 hours.");
    const callbackRequest = vi.mocked(fetch).mock.calls.find(([url]) => String(url).endsWith("/payments/razorpay/callback/order"));
    expect(JSON.parse(callbackRequest![1]!.body as string)).toMatchObject({ reference_id: "test-reference", phone: "+919000000000" });
    expect(dataLayer.find((item) => item.event === "callback_payment_started")).toMatchObject({ source: "promotion_flow", value: 499, order_id: "callback-order", event_id: "callback_payment_started:callback-order" });
    expect(dataLayer.find((item) => item.event === "callback_payment_succeeded")).toMatchObject({ source: "promotion_flow", value: 499, transaction_id: "callback-order", event_id: "callback_payment_succeeded:callback-order" });
    expect(dataLayer.find((item) => item.event === "callback_payment_succeeded")?.ecommerce).toMatchObject({ transaction_id: "callback-order", value: 499, currency: "INR" });
    expect(posthog.capture).toHaveBeenCalledWith("callback_payment_succeeded", expect.objectContaining({ value: 499, $insert_id: "callback_payment_succeeded:callback-order" }));
    expect(dataLayer.some((item) => item.event === "Purchase")).toBe(false);
    expect(openRazorpayCheckout).toHaveBeenCalledTimes(1);
  });

  it("tracks callback checkout dismissal without reporting a successful payment", async () => {
    vi.mocked(openRazorpayCheckout).mockRejectedValueOnce(new RazorpayCheckoutError("dismissed", "Checkout was closed."));
    render(<PromotableHeroWaitlist isOpen onClose={() => {}} initialName="Test" initialEmail="test@example.test" initialPhone="9000000000" initialReferenceId="test-reference" checkoutVariant="promotion-architect" source="promotion_flow" />);

    fireEvent.click(screen.getByRole("button", { name: /Book a diagnostic call — ₹499/ }));

    await screen.findByText("Checkout was closed.");
    expect(dataLayer.find((item) => item.event === "callback_checkout_dismissed")).toMatchObject({ order_id: "callback-order", error_code: "dismissed", failure_stage: "checkout" });
    expect(dataLayer.some((item) => item.event === "callback_payment_succeeded")).toBe(false);
  });

  it("keeps uncertain callback confirmation separate from failure and purchase", async () => {
    vi.mocked(openRazorpayCheckout).mockRejectedValueOnce(new RazorpayCheckoutError("confirmation_pending", "Your payment is still being confirmed."));
    render(<PromotableHeroWaitlist isOpen onClose={() => {}} initialName="Test" initialEmail="test@example.test" initialPhone="9000000000" initialReferenceId="test-reference" checkoutVariant="promotion-architect" source="promotion_flow" />);

    fireEvent.click(screen.getByRole("button", { name: /Book a diagnostic call — ₹499/ }));

    await screen.findByText("Your payment is still being confirmed.");
    expect(dataLayer.find((item) => item.event === "callback_payment_confirmation_pending")).toMatchObject({ order_id: "callback-order", failure_stage: "verification" });
    expect(dataLayer.some((item) => ["callback_payment_failed", "callback_payment_succeeded"].includes(String(item.event)))).toBe(false);
  });
});
