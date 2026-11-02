import { afterEach, describe, expect, test, vi } from "vitest";

import {
  recoverRazorpayCheckout,
} from "./razorpayCheckout";


afterEach(() => {
  vi.unstubAllGlobals();
});


describe("Razorpay checkout recovery", () => {
  test("recovers activation after webhook-first payment completion", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        state: "activation_required",
        activation_token: "activation-token",
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await recoverRazorpayCheckout(
      {
        key_id: "rzp_test_key",
        order_id: "order_123",
        amount: 699900,
        currency: "INR",
        checkout_attempt_id: "attempt-123",
        checkout_recovery_token: "recovery-token",
      },
      "http://localhost:8000",
      1,
    );

    expect(result.activation_token).toBe("activation-token");
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8000/payments/razorpay/checkout/status",
      expect.objectContaining({ method: "POST" }),
    );
  });

  test("recovers a paid callback after the verification response is lost", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        state: "callback_requested",
        callback_requested: true,
        message: "Payment confirmed. Expect a callback within 24 hours.",
      }),
    }));

    const result = await recoverRazorpayCheckout(
      {
        key_id: "rzp_test_key",
        order_id: "order_callback",
        amount: 5100,
        currency: "INR",
        checkout_attempt_id: "callback-attempt",
        checkout_recovery_token: "callback-recovery-token",
      },
      "http://localhost:8000",
      1,
    );

    expect(result).toMatchObject({
      state: "callback_requested",
      callback_requested: true,
    });
  });

  test("does not turn a declined payment into a success state", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ state: "payment_failed", can_retry: true }),
    }));

    await expect(
      recoverRazorpayCheckout(
        {
          key_id: "rzp_test_key",
          order_id: "order_123",
          amount: 699900,
          currency: "INR",
          checkout_attempt_id: "attempt-123",
          checkout_recovery_token: "recovery-token",
        },
        "http://localhost:8000",
        1,
      ),
    ).rejects.toMatchObject({
      code: "verification_failed",
    });
  });
});
