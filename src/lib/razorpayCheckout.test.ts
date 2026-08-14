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
