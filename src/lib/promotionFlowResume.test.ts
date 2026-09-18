import { describe, expect, it } from "vitest";
import { buildPromotionFlowResumeUrl } from "./promotionFlowResume";

describe("returning promotion visitors", () => {
  it.each([
    ["prime_suspect", "good-work", "/promotion-flow"],
    ["truth", undefined, "/promotion-flow?barrier=office-politics"],
    ["principle", undefined, "/promotion-flow?barrier=office-politics&stage=principle"],
    ["consequence", "good-work", "/promotion-flow?barrier=office-politics&stage=insight&choice=good-work"],
    ["offer", "waiting", "/promotion-flow?barrier=office-politics&stage=offer&choice=waiting"],
    ["consequence", "change", "/promotion-flow?barrier=office-politics&stage=consequence&choice=change"],
    ["consequence", "bad", "/promotion-flow?barrier=office-politics&stage=principle"],
  ])("resumes %s / %s without skipping ahead or losing the answer", (step, choice, expected) => {
    expect(buildPromotionFlowResumeUrl("/promotion-flow", { updated: true, promotion_flow_current_step: step, promotion_flow_answers: { barrier_id: "office-politics", choice_id: choice } }, "https://example.test")).toBe(expected);
  });
  it("does not change fresh visitors, invalid barriers or other redirect destinations", () => {
    expect(buildPromotionFlowResumeUrl("/promotion-flow", { updated: false }, "https://example.test")).toBe("/promotion-flow");
    expect(buildPromotionFlowResumeUrl("/promotion-flow", { updated: true, promotion_flow_answers: { barrier_id: "invalid" } }, "https://example.test")).toBe("/promotion-flow");
    expect(buildPromotionFlowResumeUrl("/other", { updated: true, promotion_flow_answers: { barrier_id: "office-politics" } }, "https://example.test")).toBe("/other");
  });
});
