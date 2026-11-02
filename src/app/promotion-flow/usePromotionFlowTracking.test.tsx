// @vitest-environment jsdom
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { usePromotionFlowTracking } from "./usePromotionFlowTracking";
import React, { StrictMode } from "react";

const capture = vi.hoisted(() => vi.fn());
vi.mock("@/lib/analytics/events", () => ({ trackPromotionJourneyEvent: capture }));
vi.mock("@/utils/env", () => ({ default: { apiUrl: "http://localhost:8000" } }));

beforeEach(() => {
  sessionStorage.clear();
  sessionStorage.setItem("stoDiagnosticContext", JSON.stringify({ promotionFlowSessionId: crypto.randomUUID(), promotionFlowToken: "test-token", source: "promotion_story_sticky_cta" }));
  capture.mockClear();
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("promotion flow tracking lifecycle", () => {
  it("attaches the backend session to the first start and view events", async () => {
    renderHook(() => usePromotionFlowTracking({ screenId: "truth", currentStep: "truth", answers: { barrier_id: "office-politics" } }));
    await waitFor(() => expect(capture).toHaveBeenCalledWith("promotion_flow_started", expect.objectContaining({ promotion_flow_session_id: expect.any(String) })));
    expect(capture).toHaveBeenCalledWith("promotion_flow_step_viewed", expect.objectContaining({ promotion_flow_session_id: expect.any(String) }));
  });

  it("does not restart the funnel on the next screen mount", async () => {
    const first = renderHook(() => usePromotionFlowTracking({ screenId: "truth", currentStep: "truth", answers: { barrier_id: "office-politics" } }));
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    first.unmount();
    renderHook(() => usePromotionFlowTracking({ screenId: "solving", currentStep: "principle", answers: { barrier_id: "office-politics" } }));
    await waitFor(() => expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_step_viewed")).toHaveLength(2));
    expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_started")).toHaveLength(1);
  });

  it("does not PATCH again on an unrelated render with identical answers", async () => {
    const hook = renderHook(() => usePromotionFlowTracking({ screenId: "truth", currentStep: "truth", answers: { barrier_id: "office-politics" } }));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    hook.rerender();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("serializes completion after an outstanding progress save", async () => {
    let finish!: (response: { ok: boolean }) => void;
    vi.mocked(fetch).mockImplementationOnce(() => new Promise((resolve) => { finish = resolve as typeof finish; }));
    const hook = renderHook(() => usePromotionFlowTracking({ screenId: "offer", currentStep: "offer", answers: { barrier_id: "office-politics", choice_id: "good-work" } }));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    act(() => { void hook.result.current.completeFlow(); });
    expect(fetch).toHaveBeenCalledTimes(1);
    await act(async () => { finish({ ok: true }); });
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    expect(JSON.parse(vi.mocked(fetch).mock.calls[1][1]!.body as string).status).toBe("completed");
  });

  it("counts a return visit but not an identical rerender, including StrictMode effect replay", async () => {
    const hook = renderHook(({ screenId, currentStep }) => usePromotionFlowTracking({ screenId, currentStep, answers: {} }), {
      initialProps: { screenId: "offer" as "offer" | "prime_suspect", currentStep: "offer" as "offer" | "prime_suspect" },
      wrapper: ({ children }) => <StrictMode>{children}</StrictMode>,
    });
    await waitFor(() => expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_step_viewed")).toHaveLength(1));
    hook.rerender({ screenId: "offer", currentStep: "offer" });
    expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_step_viewed")).toHaveLength(1);
    hook.rerender({ screenId: "prime_suspect", currentStep: "prime_suspect" });
    hook.rerender({ screenId: "offer", currentStep: "offer" });
    expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_step_viewed")).toHaveLength(3);
  });

  it("correlates anonymous navigation and refresh without issuing backend progress writes", async () => {
    sessionStorage.clear();
    const first = renderHook(() => usePromotionFlowTracking({ screenId: "prime_suspect", currentStep: "prime_suspect", answers: {} }));
    await waitFor(() => expect(capture).toHaveBeenCalledWith("promotion_flow_step_viewed", expect.objectContaining({ promotion_flow_session_id: expect.any(String) })));
    const firstId = capture.mock.calls.find(([event]) => event === "promotion_flow_step_viewed")![1].promotion_flow_session_id;
    first.unmount();
    renderHook(() => usePromotionFlowTracking({ screenId: "truth", currentStep: "truth", answers: { barrier_id: "zero-network" } }));
    await waitFor(() => expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_step_viewed")).toHaveLength(2));
    expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_step_viewed").map(([, properties]) => properties.promotion_flow_session_id)).toEqual([firstId, firstId]);
    expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_started")).toHaveLength(1);
    expect(fetch).not.toHaveBeenCalled();
  });
});
