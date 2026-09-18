// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { retryFlowProgress, saveFlowProgress } from "./promotionFlowProgress";
const capture = vi.hoisted(() => vi.fn());
vi.mock("./analytics/events", () => ({ trackPromotionJourneyEvent: capture }));
const snapshot = { currentStep: "consequence" as const, answers: { barrier_id: "zero-network", choice_id: "waiting" } };
const newSession = () => ({ id: crypto.randomUUID(), token: "never-log-this", source: "promotion_flow" });

beforeEach(() => { sessionStorage.clear(); capture.mockClear(); vi.stubGlobal("fetch", vi.fn()); });
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("progress persistence", () => {
  it("retries a transient failure and retains the token only in the auth header", async () => {
    vi.useFakeTimers();
    const session = newSession();
    vi.mocked(fetch).mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce({ ok: true } as Response);
    const pending = saveFlowProgress("http://localhost", session, snapshot);
    await vi.advanceTimersByTimeAsync(300);
    await pending;
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(vi.mocked(fetch).mock.calls[1][1]?.headers).toMatchObject({ "X-Promotion-Flow-Token": session.token });
    expect(sessionStorage.getItem(`promotionFlowProgress:${session.id}`)).not.toContain(session.token);
  });

  it("keeps failed writes recoverable and reports a sanitized failure", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const session = newSession();
    vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 422 } as Response).mockResolvedValueOnce({ ok: true } as Response);
    await saveFlowProgress("http://localhost", session, snapshot);
    expect(capture).toHaveBeenCalledWith("promotion_flow_save_failed", expect.objectContaining({ reason: "http_422" }));
    expect(JSON.stringify(capture.mock.calls)).not.toContain(session.token);
    await retryFlowProgress("http://localhost", session);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(JSON.parse(sessionStorage.getItem(`promotionFlowProgress:${session.id}`)!).pending).toBeUndefined();
  });

  it("preserves completion on revisit and clears stale answers for a new branch", async () => {
    const session = newSession();
    vi.mocked(fetch).mockResolvedValue({ ok: true } as Response);
    await saveFlowProgress("http://localhost", session, snapshot, "completed");
    await saveFlowProgress("http://localhost", session, { currentStep: "truth", answers: { barrier_id: "biased-manager", choice_id: "", choice_label: "" } });
    const payload = JSON.parse(vi.mocked(fetch).mock.calls[1][1]!.body as string);
    expect(payload).toMatchObject({ status: "completed", current_step: "truth", answers_json: { barrier_id: "biased-manager", choice_id: "" } });
  });
});
