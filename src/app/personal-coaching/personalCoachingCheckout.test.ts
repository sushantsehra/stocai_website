import { describe, expect, it } from "vitest";
import { buildPersonalCoachingCompletionUrl } from "./personalCoachingCheckout";

describe("personal coaching checkout completion", () => {
  it("carries the activation token to the configured signup destination", () => {
    expect(buildPersonalCoachingCompletionUrl(
      "https://platform.example/signUp",
      { activation_token: "activate-123" },
      "https://www.example",
    )).toBe("https://platform.example/signUp#payment_activation=activate-123");
  });

  it("sends an already-active customer to login", () => {
    expect(buildPersonalCoachingCompletionUrl(
      "/signUp",
      { account_already_active: true },
      "https://www.example",
    )).toBe("https://www.example/signUp?auth=login");
  });

  it("refuses to invent a successful destination without an activation result", () => {
    expect(() => buildPersonalCoachingCompletionUrl(
      "/signUp",
      {},
      "https://www.example",
    )).toThrow(/activation could not be started/i);
  });
});
