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
vi.mock("posthog-js", () => ({ default: { capture } }));
vi.mock("./CheckoutScreen", () => ({ default: () => <div data-testid="checkout-page">Checkout</div> }));
// jsdom cannot navigate documents; screen transitions are rendered explicitly below.
const preventDocumentNavigation = (event: MouseEvent) => event.preventDefault();

beforeEach(() => {
  document.addEventListener("click", preventDocumentNavigation);
  sessionStorage.clear();
  sessionStorage.setItem("stoDiagnosticContext", JSON.stringify({ promotionFlowSessionId: crypto.randomUUID(), promotionFlowToken: "test-token" }));
  capture.mockClear();
  Object.assign(window, { dataLayer: [] });
  window.history.replaceState({}, "", "/promotion-flow");
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});
afterEach(() => { document.removeEventListener("click", preventDocumentNavigation); cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("all promotion journeys", () => {
  it.each(barriers.flatMap((barrier) => approaches.map((approach) => ({ barrier, approach }))))("saves $barrier.id / $approach.id through completion", async ({ barrier, approach }) => {
    const view = render(<PromotionFlow key="truth" initialBarrierId={barrier.id} />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole("link", { name: /Show me what I’m missing/ }));
    expect(capture).toHaveBeenCalledWith("promotion_flow_step_clicked", expect.objectContaining({ screen_id: "truth", step_number: 2, next_screen_id: "solving", barrier_id: barrier.id }));
    expect(screen.getByRole("link", { name: /Show me what I’m missing/ }).getAttribute("href")).toContain("stage=principle");
    view.rerender(<PromotionFlow key="choices" initialBarrierId={barrier.id} initialStage="principle" />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    expect(screen.getByRole("link", { name: new RegExp(approach.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) }).getAttribute("href")).toContain(`stage=insight&choice=${approach.id}`);
    fireEvent.click(screen.getByRole("link", { name: new RegExp(approach.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) }));
    expect(capture).toHaveBeenCalledWith("promotion_flow_step_clicked", expect.objectContaining({ screen_id: "solving", step_number: 3, next_screen_id: "insight", option_id: approach.id, choice_id: approach.id, barrier_id: barrier.id }));
    view.rerender(<PromotionFlow key="insight" initialBarrierId={barrier.id} initialStage="insight" initialChoice={approach.id} />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));
    fireEvent.click(screen.getByRole("link", { name: /Show me what I need to do/ }));
    expect(capture).toHaveBeenCalledWith("promotion_flow_step_clicked", expect.objectContaining({ screen_id: "insight", step_number: 4, next_screen_id: "offer", choice_id: approach.id }));
    view.rerender(<PromotionFlow key="offer" initialBarrierId={barrier.id} initialStage="offer" initialChoice={approach.id} />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(4));
    expect(screen.getByRole("link", { name: /Get access to Promotion Architect/ }).getAttribute("href")).toBe(`/promotion-flow?barrier=${barrier.id}&stage=checkout&choice=${approach.id}`);
    fireEvent.click(screen.getByRole("link", { name: /Get access to Promotion Architect/ }));
    expect(capture).toHaveBeenCalledWith("promotion_flow_step_clicked", expect.objectContaining({ screen_id: "offer", step_number: 5, next_screen_id: "checkout", choice_id: approach.id }));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(5));
    const writes = vi.mocked(fetch).mock.calls.map(([, options]) => JSON.parse(options!.body as string));
    expect(writes.map((item) => item.current_step)).toEqual(["truth", "principle", "consequence", "offer", "offer"]);
    expect(writes[4]).toMatchObject({ status: "completed", answers_json: { barrier_id: barrier.id, choice_id: approach.id, choice_label: approach.title } });
    expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_started")).toHaveLength(1);
    expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_completed")).toHaveLength(1);
    expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_step_viewed").map(([, properties]) => [properties.screen_id, properties.step_number])).toEqual([["truth", 2], ["solving", 3], ["insight", 4], ["offer", 5]]);
    const layer = (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer;
    for (const [event, properties] of capture.mock.calls) {
      expect(layer).toContainEqual({ event, ...properties });
    }
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
    expect(capture).toHaveBeenCalledWith("promotion_flow_step_viewed", expect.objectContaining({ screen_id: "consequence", step_number: 4 }));
    fireEvent.click(screen.getByRole("link", { name: /Show me how/ }));
    expect(capture).toHaveBeenCalledWith("promotion_flow_step_clicked", expect.objectContaining({ screen_id: "consequence", next_screen_id: "offer", choice_id: choice }));
  });

  it.each(["change", "hope", "manager"])("tracks legacy choice %s on the application screen", async (choice) => {
    render(<PromotionFlow initialBarrierId="office-politics" initialStage="application" />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const link = screen.getAllByRole("link").find((item) => item.getAttribute("href")?.endsWith(`stage=consequence&choice=${choice}`))!;
    fireEvent.click(link);
    expect(capture).toHaveBeenCalledWith("promotion_flow_step_clicked", expect.objectContaining({ screen_id: "honest_choice", step_number: 3, next_screen_id: "consequence", choice_id: choice, option_id: choice }));
  });

  it("handles invalid legacy consequence links as the actual displayed choice screen", async () => {
    render(<PromotionFlow initialBarrierId="office-politics" initialStage="consequence" initialChoice="constructor" />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string).current_step).toBe("honest_choice");
    expect(capture).toHaveBeenCalledWith("promotion_flow_step_viewed", expect.objectContaining({ screen_id: "honest_choice", step_number: 3 }));
  });

  it("restores checkout from its URL and saves completion with the existing backend step", async () => {
    render(<PromotionFlow initialBarrierId="office-politics" initialStage="checkout" initialChoice="good-work" />);
    expect(screen.getByTestId("checkout-page")).toBeDefined();
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const writes = vi.mocked(fetch).mock.calls.map(([, options]) => JSON.parse(options!.body as string));
    expect(writes.every((item) => item.current_step === "offer")).toBe(true);
    expect(writes.at(-1)).toMatchObject({ status: "completed", answers_json: { barrier_id: "office-politics", choice_id: "good-work" } });
    expect(capture.mock.calls.filter(([event]) => event === "promotion_flow_completed")).toHaveLength(1);
    expect(capture).toHaveBeenCalledWith("promotion_flow_step_viewed", expect.objectContaining({ screen_id: "checkout", step_number: 6, current_step: "offer" }));
  });

  it.each(barriers)("tracks the selected $id barrier before navigation", async (barrier) => {
    render(<PromotionFlow />);
    await waitFor(() => expect(capture).toHaveBeenCalledWith("promotion_flow_step_viewed", expect.objectContaining({ screen_id: "prime_suspect", step_number: 1 })));
    fireEvent.click(screen.getByRole("link", { name: `Choose ${barrier.id === "biased-manager" ? "My manager" : barrier.id === "zero-network" ? "My network" : barrier.id === "invisible-work" ? "Invisible work" : barrier.id === "executive-presence" ? "Executive presence" : "Office politics"}` }));
    expect(capture).toHaveBeenCalledWith("promotion_flow_step_clicked", expect.objectContaining({ screen_id: "prime_suspect", next_screen_id: "truth", option_id: barrier.id, barrier_id: barrier.id, choice_id: "" }));
  });

  it("tracks Start again and records the revisited first screen", async () => {
    render(<PromotionFlow initialBarrierId="zero-network" initialStage="offer" initialChoice="good-work" />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    fireEvent.click(screen.getByRole("button", { name: "Start again" }));
    expect(capture).toHaveBeenCalledWith("promotion_flow_step_clicked", expect.objectContaining({ screen_id: "offer", cta_id: "start_again", next_screen_id: "prime_suspect" }));
    await waitFor(() => expect(capture).toHaveBeenCalledWith("promotion_flow_step_viewed", expect.objectContaining({ screen_id: "prime_suspect", barrier_id: "", choice_id: "" })));
  });

  it("reports invalid insight links as solving, not insight", async () => {
    render(<PromotionFlow initialBarrierId="office-politics" initialStage="insight" initialChoice="not-an-option" />);
    await waitFor(() => expect(capture).toHaveBeenCalledWith("promotion_flow_step_viewed", expect.objectContaining({ screen_id: "solving", step_number: 3, choice_id: "" })));
  });
});
