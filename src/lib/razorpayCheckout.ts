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
};

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
          resolve(data);
        } catch (error) { reject(error); }
      },
      modal: { ondismiss: () => reject(new Error("Checkout was closed before payment.")) },
      retry: { enabled: true },
    }).open();
  });
}
