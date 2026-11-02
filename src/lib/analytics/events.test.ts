// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import posthog from "posthog-js";
import { trackCtaClick, trackInitiateCheckout, trackPromotionFlowCheckoutAction, trackPromotionFlowStepClicked, trackPromotionJourneyEvent, trackPurchase, trackRazorpayCheckoutOpened } from "./events";

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
  it("emits Meta diagnostic aliases for the promotion-flow lifecycle", () => {
    trackPromotionJourneyEvent("promotion_flow_started", { current_step: "truth" });
    trackPromotionJourneyEvent("promotion_flow_completed", { current_step: "offer" });

    expect(layer().filter((item) => item.event === "diagnostic_start")).toEqual([
      expect.objectContaining({
        journey: "promotion_architect",
        promotion_flow_session_id: "flow-1",
        current_step: "truth",
      }),
    ]);
    expect(layer().filter((item) => item.event === "diagnostic_complete")).toEqual([
      expect.objectContaining({
        journey: "promotion_architect",
        promotion_flow_session_id: "flow-1",
        current_step: "offer",
      }),
    ]);
    expect(vi.mocked(posthog.capture).mock.calls.map(([event]) => event)).toEqual([
      "promotion_flow_started",
      "promotion_flow_completed",
    ]);
  });

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
    expect(layer().map((item) => item.event)).toEqual(["promotion_flow_completed", "diagnostic_complete"]);
  });

  it("preserves events from other pages without attaching an unrelated flow session", () => {
    window.history.replaceState({}, "", "/promotable");
    trackInitiateCheckout({ checkoutId: "legacy", value: 699900, source: "legacy" });
    expect(layer()[0]).toMatchObject({ event: "InitiateCheckout", value: 6999, source: "legacy" });
    expect(layer()[0]).not.toHaveProperty("promotion_flow_session_id");
  });

  it("sends the selected answer and destination to both sinks without contact data or query secrets", () => {
    window.history.replaceState({}, "", "/promotion-flow?barrier=invisible-work&stage=principle&email=private@example.test&token=secret-token#private-fragment");
    trackPromotionFlowStepClicked({ screenId: "solving", nextScreenId: "insight", ctaId: "select_approach", ctaLabel: "Good work", barrierId: "invisible-work", choiceId: "good-work", optionId: "good-work", optionLabel: "Good work" });
    expect(layer()[0]).toMatchObject({ event: "promotion_flow_step_clicked", screen_id: "solving", step_number: 3, current_step: "principle", next_screen_id: "insight", next_step_number: 4, flow_version: "promotion-flow-v1", promotion_flow_session_id: "flow-1", option_id: "good-work", choice_id: "good-work", page_url: "http://localhost:3000/promotion-flow" });
    const { event, ...properties } = layer()[0];
    expect(posthog.capture).toHaveBeenCalledWith(event, properties);
    expect(JSON.stringify(layer())).not.toMatch(/private@example|secret-token|private-fragment/);
    trackPromotionFlowStepClicked({ screenId: "truth", nextScreenId: "solving", ctaId: "continue_to_solving", ctaLabel: "Continue", barrierId: "invisible-work" });
    expect(layer()[1]).toMatchObject({ choice_id: "", option_id: "", option_label: "" });
  });

  it.each([
    ["checkout_page", "get_access", "programme_payment"],
    ["checkout_callback", "request_callback", "callback_payment"],
  ])("tracks the %s checkout action alongside its existing CTA event", (location, ctaId, destination) => {
    window.history.replaceState({}, "", "/promotion-flow?barrier=invisible-work&stage=checkout&choice=good-work");
    trackCtaClick({ location, label: "Checkout action" });
    expect(layer().map((event) => event.event)).toEqual(["cta_clicked", "promotion_flow_step_clicked"]);
    expect(layer()[1]).toMatchObject({ screen_id: "checkout", step_number: 6, cta_id: ctaId, next_screen_id: destination, choice_id: "good-work" });
  });

  it("does not attach checkout step clicks to other pages or non-checkout flow screens", () => {
    trackCtaClick({ location: "checkout_page", label: "Get access" });
    expect(layer().map((event) => event.event)).toEqual(["cta_clicked"]);
    window.history.replaceState({}, "", "/promotable");
    trackCtaClick({ location: "checkout_callback", label: "Speak with us first" });
    expect(layer().map((event) => event.event)).toEqual(["cta_clicked", "cta_clicked"]);
  });

  it("separates pricing clicks from disclosure observations", () => {
    window.history.replaceState({}, "", "/promotion-flow?barrier=invisible-work&stage=checkout&choice=good-work");
    trackPromotionFlowCheckoutAction("reveal_pricing", "Show me what it costs");
    trackCtaClick({ location: "checkout_pricing", label: "Show me what it costs" });
    trackPromotionFlowCheckoutAction("hide_pricing", "Show me what it costs");
    expect(layer().map((item) => item.event)).toEqual(["promotion_flow_step_clicked", "cta_clicked", "promotion_flow_step_clicked"]);
    expect(layer()[0]).toMatchObject({ screen_id: "checkout", step_number: 6, cta_id: "reveal_pricing", next_screen_id: "checkout" });
    expect(layer()[2]).toMatchObject({ cta_id: "hide_pricing", next_screen_id: "checkout" });
  });

  it("still correlates clicks when browser storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("storage blocked"); });
    const input = { screenId: "truth", nextScreenId: "solving", ctaId: "continue", ctaLabel: "Continue" } as const;
    expect(() => trackPromotionFlowStepClicked(input)).not.toThrow();
    trackPromotionFlowStepClicked(input);
    expect(layer()[0].promotion_flow_session_id).toEqual(expect.any(String));
    expect(layer()[1].promotion_flow_session_id).toBe(layer()[0].promotion_flow_session_id);
  });

  it("does not prevent the action when either analytics adapter fails", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.mocked(posthog.capture).mockImplementation(() => { throw new Error("posthog offline"); });
    const input = { screenId: "truth", nextScreenId: "solving", ctaId: "continue", ctaLabel: "Continue" } as const;
    expect(() => trackPromotionFlowStepClicked(input)).not.toThrow();
    expect(layer()[0].event).toBe("promotion_flow_step_clicked");
    vi.spyOn(layer(), "push").mockImplementation(() => { throw new Error("gtm unavailable"); });
    expect(() => trackPromotionFlowStepClicked(input)).not.toThrow();
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
