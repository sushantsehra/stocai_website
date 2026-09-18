import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { barriers } from "./flowData";
import { approaches } from "./insightData";
import InsightScreen from "./InsightScreen";
import SolvingScreen from "./SolvingScreen";

describe("choice to insight navigation", () => {
  it.each(barriers)("keeps the selected barrier through all five answers for $id", (barrier) => {
    const choices = renderToStaticMarkup(<SolvingScreen barrierId={barrier.id} barrierLabel={barrier.label} />);
    for (const approach of approaches) {
      expect(choices).toContain(`barrier=${barrier.id}&amp;stage=insight&amp;choice=${approach.id}`);
      const insight = renderToStaticMarkup(<InsightScreen barrierId={barrier.id} barrierLabel={barrier.label} choiceId={approach.id} />);
      expect(insight).toContain("The gap");
      expect(insight).toContain("Show me what I need to do");
      expect(insight).toContain(`barrier=${barrier.id}&amp;stage=offer&amp;choice=${approach.id}`);
    }
  });

  it("returns malformed insight links to the choice screen", () => {
    const html = renderToStaticMarkup(<InsightScreen barrierId="office-politics" barrierLabel="Office Politics" choiceId="invalid" />);
    expect(html).toContain("So how have you been trying to solve it?");
    expect(html).not.toContain("stage=offer");
  });
});
