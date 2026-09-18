// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PromotionFlow from "./PromotionFlow";
import { barriers } from "./flowData";
import { approaches } from "./insightData";

vi.mock("next/image", () => ({ default: () => null }));
vi.mock("../promotion-story/PromotionStoryAccessFlow", () => ({ default: () => null }));
vi.mock("../promotion-story/PromotionStoryUserNav", () => ({ default: () => null }));
vi.mock("@/utils/env", () => ({ default: { apiUrl: "http://localhost:8000" } }));
const capture = vi.hoisted(() => vi.fn());
vi.mock("@/lib/analytics/events", () => ({ trackPromotionJourneyEvent: capture, trackCtaClick: vi.fn() }));
vi.mock("./CheckoutScreen", () => ({ default: () => <div data-testid="checkout-page">Checkout</div> }));
// jsdom cannot navigate documents; screen transitions are rendered explicitly below.
const preventDocumentNavigation = (event: MouseEvent) => event.preventDefault();

beforeEach(() => {
  document.addEventListener("click", preventDocumentNavigation);
  sessionStorage.clear();
  sessionStorage.setItem("stoDiagnosticContext", JSON.stringify({ promotionFlowSessionId: crypto.randomUUID(), promotionFlowToken: "test-token" }));
  capture.mockClear();
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});
afterEach(() => { document.removeEventListener("click", preventDocumentNavigation); cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("all promotion journeys", () => {
  it.each(barriers.flatMap((barrier) => approaches.map((approach) => ({ barrier, approach }))))("saves $barrier.id / $approach.id through completion", async ({ barrier, approach }) => {
    const view = render(<PromotionFlow key="truth" initialBarrierId={barrier.id} />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("link", { name: /Show me what I’m missing/ }).getAttribute("href")).toContain("stage=principle");
    view.rerender(<PromotionFlow key="choices" initialBarrierId={barrier.id} initialStage="principle" />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    expect(screen.getByRole("link", { name: new RegExp(approach.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) }).getAttribute("href")).toContain(`stage=insight&choice=${approach.id}`);
    view.rerender(<PromotionFlow key="insight" initialBarrierId={barrier.id} initialStage="insight" initialChoice={approach.id} />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));
    view.rerender(<PromotionFlow key="offer" initialBarrierId={barrier.id} initialStage="offer" initialChoice={approach.id} />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(4));
    expect(screen.getByRole("link", { name: /Get access to Promotion Architect/ }).getAttribute("href")).toBe(`/promotion-flow?barrier=${barrier.id}&stage=checkout&choice=${approach.id}`);
    fireEvent.click(screen.getByRole("link", { name: /Get access to Promotion Architect/ }));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(5));
    const writes = vi.mocked(fetch).mock.calls.map(([, options]) => JSON.parse(options!.body as string));
    expect(writes.map((item) => item.current_step)).toEqual(["truth", "principle", "consequence", "offer", "offer"]);
    expect(writes[4]).toMatchObject({ status: "completed", answers_json: { barrier_id: barrier.id, choice_id: approach.id, choice_label: approach.title } });
    expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_started")).toHaveLength(1);
    expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_completed")).toHaveLength(1);
  });

  it("clears an earlier choice when returning to the barrier screen", async () => {
    render(<PromotionFlow initialBarrierId="zero-network" initialChoice="waiting" />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string).answers_json.choice_id).toBe("");
  });

  it.each(["change", "hope", "manager"])("retains the legacy %s answer when continuing to the offer", async (choice) => {
    render(<PromotionFlow initialBarrierId="office-politics" initialStage="consequence" initialChoice={choice} />);
    expect(screen.getByRole("link", { name: /Show me how/ }).getAttribute("href")).toBe(`/promotion-flow?barrier=office-politics&stage=offer&choice=${choice}`);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  it("handles invalid legacy consequence links as the actual displayed choice screen", async () => {
    render(<PromotionFlow initialBarrierId="office-politics" initialStage="consequence" initialChoice="constructor" />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string).current_step).toBe("honest_choice");
  });

  it("restores checkout from its URL and saves completion with the existing backend step", async () => {
    render(<PromotionFlow initialBarrierId="office-politics" initialStage="checkout" initialChoice="good-work" />);
    expect(screen.getByTestId("checkout-page")).toBeDefined();
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const writes = vi.mocked(fetch).mock.calls.map(([, options]) => JSON.parse(options!.body as string));
    expect(writes.every((item) => item.current_step === "offer")).toBe(true);
    expect(writes.at(-1)).toMatchObject({ status: "completed", answers_json: { barrier_id: "office-politics", choice_id: "good-work" } });
    expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_completed")).toHaveLength(1);
  });
});
