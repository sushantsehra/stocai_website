import { describe, expect, it } from "vitest";
import { barriers } from "./flowData";
import { approaches, getPromotionInsight } from "./insightData";

describe("promotion insights", () => {
  it("provides a distinct complete insight for every selectable barrier and answer", () => {
    const titles = new Set<string>();
    for (const barrier of barriers) {
      for (const approach of approaches) {
        const insight = getPromotionInsight(barrier.id, approach.id);
        expect(insight).toBeDefined();
        expect(insight?.selected).toBeTruthy();
        expect(insight?.body).toBeTruthy();
        expect(insight?.gap).toHaveLength(2);
        expect(insight?.gap.every((line) => line.length > 0)).toBe(true);
        titles.add(insight!.title);
      }
    }
    expect(titles.size).toBe(25);
  });

  it.each([
    ["office-politics", "good-work", "You also need influence around it."],
    ["biased-manager", "self-improvement", "You need visible evidence of readiness around it."],
    ["invisible-work", "surroundings", "You also need to change how your value reaches them."],
    ["zero-network", "leaving", "You need relationships that create opportunities around you."],
    ["executive-presence", "waiting", "You need to start changing how you show up in the moments you already have."],
  ])("matches %s + %s to the supplied gap", (barrier, choice, gap) => {
    expect(getPromotionInsight(barrier, choice)?.gap[1]).toBe(gap);
  });

  it.each([
    ["office-politics", undefined],
    ["office-politics", "unknown"],
    ["office-politics", "change"],
    ["office-politics", "constructor"],
    ["unknown", "good-work"],
    ["__proto__", "good-work"],
  ])("rejects invalid or legacy insight links: %s + %s", (barrier, choice) => {
    expect(getPromotionInsight(barrier, choice)).toBeUndefined();
  });
});
