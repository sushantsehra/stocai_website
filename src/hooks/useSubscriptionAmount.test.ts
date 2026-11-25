// @vitest-environment jsdom
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { usePaymentSettings } from "./useSubscriptionAmount";

vi.mock("@/utils/env", () => ({ default: { apiUrl: "http://localhost:8000" } }));

afterEach(() => vi.unstubAllGlobals());

describe("payment settings", () => {
  it("loads subscription, callback, and personal coaching amounts from the public payment settings endpoint", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ subscription_amount: 499900, callback_amount: 49900, personal_coaching_amount: 2199900, currency: "INR" }),
    }));

    const { result } = renderHook(() => usePaymentSettings());

    await waitFor(() => expect(result.current).toEqual({
      subscriptionAmount: 499900,
      callbackAmount: 49900,
      personalCoachingAmount: 2199900,
      currency: "INR",
    }));
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/payments/razorpay/settings",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it("does not invent prices when the settings response is invalid", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ subscription_amount: 0, callback_amount: "invalid" }),
    }));

    const { result } = renderHook(() => usePaymentSettings());

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(result.current).toEqual({ subscriptionAmount: null, callbackAmount: null, personalCoachingAmount: null, currency: "INR" });
  });
});
