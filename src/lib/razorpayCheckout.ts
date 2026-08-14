declare global {
  interface Window { Razorpay?: new (options: Record<string, unknown>) => { open: () => void }; }
}

const loadCheckout = () => new Promise<void>((resolve, reject) => {
  if (window.Razorpay) return resolve();
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  script.dataset.razorpayCheckout = "true";
  script.onload = () => resolve();
  script.onerror = () => reject(new Error("Unable to load secure checkout."));
  document.body.appendChild(script);
});

type RazorpayOrder = {
  key_id: string; order_id: string; amount: number; currency: string;
  description?: string; name?: string; email?: string; contact?: string;
  checkout_attempt_id?: string; checkout_recovery_token?: string;
};

export class RazorpayCheckoutError extends Error {
  code: "dismissed" | "confirmation_pending" | "verification_failed";

  constructor(code: RazorpayCheckoutError["code"], message: string) {
    super(message);
    this.name = "RazorpayCheckoutError";
    this.code = code;
  }
}

const delay = (milliseconds: number) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export async function recoverRazorpayCheckout(
  order: RazorpayOrder,
  apiBaseUrl: string,
  attempts = 6,
) {
  if (!order.checkout_attempt_id || !order.checkout_recovery_token) {
    throw new RazorpayCheckoutError(
      "verification_failed",
      "Payment verification could not be completed.",
    );
  }
  for (let index = 0; index < attempts; index += 1) {
    if (index > 0) await delay(2000);
    const response = await fetch(`${apiBaseUrl}/payments/razorpay/checkout/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        checkout_attempt_id: order.checkout_attempt_id,
        recovery_token: order.checkout_recovery_token,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new RazorpayCheckoutError(
        "verification_failed",
        data?.detail || "Payment status could not be checked.",
      );
    }
    if (["activation_required", "already_active"].includes(data?.state)) return data;
    if (["payment_failed", "expired", "cancelled"].includes(data?.state)) {
      throw new RazorpayCheckoutError(
        "verification_failed",
        data?.state === "payment_failed"
          ? "Payment wasn't completed. You can try again safely."
          : "This checkout is no longer active. Please try again.",
      );
    }
  }
  throw new RazorpayCheckoutError(
    "confirmation_pending",
    "Your payment is still being confirmed. Please do not pay again.",
  );
}

export async function openRazorpayCheckout(order: RazorpayOrder, apiBaseUrl: string) {
  await loadCheckout();
  return new Promise<Record<string, unknown>>((resolve, reject) => {
    if (!window.Razorpay) return reject(new Error("Secure checkout is unavailable."));
    new window.Razorpay({
      key: order.key_id, order_id: order.order_id, amount: order.amount, currency: order.currency,
      name: "Bettercorporatelife", description: order.description,
      prefill: { name: order.name || "", email: order.email || "", contact: order.contact || "" },
      handler: async (result: Record<string, string>) => {
        try {
          const response = await fetch(`${apiBaseUrl}/payments/razorpay/order/verify`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_id: result.razorpay_order_id, payment_id: result.razorpay_payment_id, signature: result.razorpay_signature }),
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(data?.detail || "Payment verification failed.");
          resolve({
            ...data,
            razorpay_order_id: result.razorpay_order_id,
            razorpay_payment_id: result.razorpay_payment_id,
          });
        } catch {
          try {
            resolve(await recoverRazorpayCheckout(order, apiBaseUrl));
          } catch (error) {
            reject(error);
          }
        }
      },
      modal: {
        ondismiss: () => reject(
          new RazorpayCheckoutError(
            "dismissed",
            "Checkout was closed. You can continue whenever you're ready.",
          ),
        ),
      },
      retry: { enabled: true },
    }).open();
  });
}
