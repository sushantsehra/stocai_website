// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PromotionJourneyHomeLink from "./PromotionJourneyHomeLink";

vi.mock("next/image", () => ({ default: () => null }));

afterEach(cleanup);

describe("promotion journey home link", () => {
  it("returns every promotion journey screen to the promotion story", () => {
    render(<PromotionJourneyHomeLink className="brand" />);

    expect(screen.getByRole("link", { name: "Better Corporate Life home" }).getAttribute("href")).toBe("/promotion-story");
  });
});
