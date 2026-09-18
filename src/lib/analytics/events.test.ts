// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import posthog from "posthog-js";
import { trackCtaClick, trackInitiateCheckout, trackPromotionJourneyEvent, trackPurchase, trackRazorpayCheckoutOpened } from "./events";

vi.mock("posthog-js", () => ({ default: { capture: vi.fn() } }));
const layer = () => (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer;

beforeEach(() => {
  vi.mocked(posthog.capture).mockReset();
  Object.assign(window, { dataLayer: [] });
  sessionStorage.clear();
  sessionStorage.setItem("stoDiagnosticContext", JSON.stringify({ promotionFlowSessionId: "flow-1", promotionFlowToken: "secret-token", email: "private@example.test" }));
  window.history.replaceState({}, "", "/promotion-flow?barrier=invisible-work&stage=offer&choice=good-work");
});
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });

describe("GTM / PostHog parity", () => {
  it("sends each funnel event to both sinks with safe correlation and identical properties", () => {
    trackPromotionJourneyEvent("promotion_flow_step_viewed", { current_step: "consequence" });
    trackCtaClick({ location: "checkout_pricing", label: "Show me what it costs", source: "promotion_story_sticky_cta" });
    trackInitiateCheckout({ checkoutId: "attempt", orderId: "order", value: 180000, source: "promotion_story_sticky_cta" });
    trackRazorpayCheckoutOpened({ checkoutId: "attempt", orderId: "order", value: 180000, source: "promotion_story_sticky_cta" });
    for (const [event, properties] of vi.mocked(posthog.capture).mock.calls) {
      expect(layer()).toContainEqual({ event, ...properties });
      expect(properties).toMatchObject({ promotion_flow_session_id: "flow-1", barrier_id: "invisible-work", choice_id: "good-work" });
    }
    expect(layer().find((item) => item.event === "InitiateCheckout")).toMatchObject({ value: 1800, currency: "INR", event_id: "initiate_checkout:order" });
    expect(JSON.stringify(layer())).not.toMatch(/secret-token|private@example/);
  });

  it("keeps GTM working when PostHog fails, without interrupting the user journey", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.mocked(posthog.capture).mockImplementation(() => { throw new Error("unavailable"); });
    expect(() => trackPromotionJourneyEvent("promotion_flow_completed")).not.toThrow();
    expect(layer()).toHaveLength(1);
  });

  it("preserves events from other pages without attaching an unrelated flow session", () => {
    window.history.replaceState({}, "", "/promotable");
    trackInitiateCheckout({ checkoutId: "legacy", value: 699900, source: "legacy" });
    expect(layer()[0]).toMatchObject({ event: "InitiateCheckout", value: 6999, source: "legacy" });
    expect(layer()[0]).not.toHaveProperty("promotion_flow_session_id");
  });

  it("allows purchase redirection after GTM callback or timeout, and keeps the order event ID", async () => {
    vi.useFakeTimers();
    const done = vi.fn();
    const pending = trackPurchase({ orderId: "order-1", value: 180000, source: "promotion_flow" }).then(done);
    expect(layer()[0]).toMatchObject({ event: "Purchase", event_id: "purchase:order-1", value: 1800 });
    (layer()[0].eventCallback as () => void)();
    await pending;
    expect(done).toHaveBeenCalledTimes(1);
    const fallback = trackPurchase({ orderId: "order-2", source: "promotion_flow" });
    await vi.advanceTimersByTimeAsync(1200);
    await expect(fallback).resolves.toBeUndefined();
  });
});
