// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import posthog from "posthog-js";
import PromotableHeroWaitlist from "./PromotableHeroWaitlist";
import CheckoutScreen from "@/app/promotion-flow/CheckoutScreen";
import { openRazorpayCheckout } from "@/lib/razorpayCheckout";

vi.mock("posthog-js", () => ({ default: { capture: vi.fn() } }));
vi.mock("@/utils/env", () => ({ default: { apiUrl: "http://localhost:8000" } }));
vi.mock("@/hooks/useSubscriptionAmount", () => ({ default: () => 180000, formatSubscriptionAmount: () => "₹1,800" }));
vi.mock("@/lib/razorpayCheckout", () => ({ openRazorpayCheckout: vi.fn().mockResolvedValue({ razorpay_payment_id: "test-payment" }) }));
const dataLayer: Record<string, unknown>[] = [];

beforeEach(() => {
  dataLayer.length = 0;
  Object.assign(window, { dataLayer });
  vi.mocked(posthog.capture).mockClear();
  vi.mocked(openRazorpayCheckout).mockClear();
  sessionStorage.setItem("stoDiagnosticContext", JSON.stringify({ promotionFlowSessionId: "test-flow", promotionFlowToken: "private-token", name: "Test", email: "test@example.test", phone: "9000000000", countryCode: "+91", referenceId: "test-reference", source: "promotion_story_sticky_cta" }));
  window.history.replaceState({}, "", "/promotion-flow?barrier=invisible-work&stage=offer&choice=good-work");
  vi.stubGlobal("fetch", vi.fn(async (url) => ({ ok: true, json: async () => String(url).endsWith("/consultations/slots") ? { enabled: false } : { order_id: "test-order", key_id: "test-key", checkout_attempt_id: "test-attempt", amount: 180000, currency: "INR" } })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("checkout event and payment wiring", () => {
  it.each([["promotion-architect", "modal"], ["default", "modal"], ["promotion-architect", "page"]] as const)("preserves payment events and payloads for %s / %s checkout", async (variant, presentation) => {
    const close = vi.fn();
    render(presentation === "page" ? <CheckoutScreen /> : <PromotableHeroWaitlist isOpen onClose={close} initialName="Test" initialEmail="test@example.test" initialPhone="9000000000" initialReferenceId="test-reference" checkoutVariant={variant} source="promotion_story_sticky_cta" />);
    if (presentation === "page") {
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(screen.queryByRole("button", { name: "Close waitlist" })).toBeNull();
      expect(document.body.style.overflow).not.toBe("hidden");
      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Promotion Architect");
      expect(screen.queryByRole("link", { name: "Your promotion direction" })).toBeNull();
      fireEvent.keyDown(document, { key: "Escape" });
      expect(close).not.toHaveBeenCalled();
      expect(dataLayer.find((item) => item.event === "checkout_page_viewed")).toBeDefined();
      expect(dataLayer.find((item) => item.event === "checkout_modal_opened")).toMatchObject({ modal_kind: "promotion_checkout_page" });
    }
    if (variant === "promotion-architect") {
      const details = screen.getByText("Show me what it costs").closest("details")!;
      details.open = true;
      fireEvent(details, new Event("toggle"));
      await waitFor(() => expect(dataLayer.some((item) => item.event === "checkout_pricing_viewed")).toBe(true));
      expect(dataLayer.find((item) => item.event === "cta_clicked")).toMatchObject({
        cta_location: "checkout_pricing",
        cta_label: "Show me what it costs",
        source: "promotion_story_sticky_cta",
      });
      expect(dataLayer.find((item) => item.event === "checkout_pricing_viewed")).toMatchObject({
        source: "promotion_story_sticky_cta",
        value: 1800,
        currency: "INR",
      });
      expect(posthog.capture).toHaveBeenCalledWith("cta_clicked", expect.objectContaining({
        cta_location: "checkout_pricing",
        cta_label: "Show me what it costs",
      }));
      expect(openRazorpayCheckout).not.toHaveBeenCalled();
    }
    fireEvent.click(screen.getByRole("button", { name: variant === "promotion-architect" ? /Get access/ : /Proceed to Secure Checkout/ }));
    await waitFor(() => expect(dataLayer.some((item) => item.event === "Purchase")).toBe(true));
    for (const event of ["checkout_modal_opened", "InitiateCheckout", "razorpay_checkout_opened", "Purchase"]) {
      const payload = dataLayer.find((item) => item.event === event)!;
      expect(payload).toBeDefined();
      expect(posthog.capture).toHaveBeenCalledWith(event, expect.objectContaining({ promotion_flow_session_id: "test-flow", barrier_id: "invisible-work", choice_id: "good-work" }));
      if (event !== "checkout_modal_opened") expect(payload).toMatchObject({ value: 1800, currency: "INR" });
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
    const details = screen.getByText("Show me what it costs").closest("details")!;
    details.open = true;
    fireEvent.click(screen.getByRole("button", { name: /Get access/ }));
    await screen.findByText("Payment service unavailable");
    expect(dataLayer.some((item) => ["InitiateCheckout", "Purchase"].includes(String(item.event)))).toBe(false);
    expect(openRazorpayCheckout).not.toHaveBeenCalled();
  });
});
