"use client";

import { useCallback, useState } from "react";
import env from "@/utils/env";
import {
  trackCallbackCheckoutDismissed,
  trackCallbackCheckoutOpened,
  trackCallbackPaymentConfirmationPending,
  trackCallbackPaymentFailed,
  trackCallbackPaymentStarted,
  trackCallbackPaymentSucceeded,
  trackCtaClick,
} from "@/lib/analytics/events";
import { openRazorpayCheckout, RazorpayCheckoutError } from "@/lib/razorpayCheckout";

type CallbackOrderResponse = Record<string, unknown> & {
  state?: string;
  key_id?: string;
  order_id?: string;
  checkout_attempt_id?: string;
  amount?: number;
  currency?: string;
  message?: string;
};

type CallbackStatus = "idle" | "loading" | "success" | "error";

type Options = {
  referenceId?: string;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  source: string;
};

export default function useCallbackPayment(options: Options) {
  const [status, setStatus] = useState<CallbackStatus>("idle");
  const [message, setMessage] = useState("");

  const reset = useCallback(() => {
    setStatus("idle");
    setMessage("");
  }, []);

  const startPayment = useCallback(async () => {
    trackCtaClick({ location: "checkout_callback", label: "Book a diagnostic call", source: options.source });
    setStatus("loading");
    setMessage("");
    let order: CallbackOrderResponse | null = null;
    let failureStage: "validation" | "order_creation" | "checkout" | "verification" = "validation";
    try {
      if (!options.referenceId || !options.name.trim() || !options.email.trim() || !options.phone.trim()) {
        throw new Error("Missing contact details. Please submit the request access form first.");
      }
      failureStage = "order_creation";
      const response = await fetch(`${env.apiUrl}/payments/razorpay/callback/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          reference_id: options.referenceId,
          name: options.name,
          email: options.email,
          phone: `${options.countryCode}${options.phone}`,
        }),
      });
      order = await response.json().catch(() => ({})) as CallbackOrderResponse;
      if (!response.ok) throw new Error(typeof order.detail === "string" ? order.detail : "Unable to start callback payment.");
      if (order.state === "callback_requested") {
        if (typeof order.order_id === "string") {
          trackCallbackPaymentSucceeded({
            checkoutId: typeof order.checkout_attempt_id === "string" ? order.checkout_attempt_id : undefined,
            orderId: order.order_id,
            value: typeof order.amount === "number" ? order.amount : undefined,
            currency: typeof order.currency === "string" ? order.currency : undefined,
            source: options.source,
          });
        }
        setStatus("success");
        setMessage(String(order.message || "Your callback is confirmed. Expect our call within 24 hours."));
        return;
      }
      if (!order.order_id || !order.key_id || typeof order.amount !== "number" || !order.currency) {
        throw new Error("Payment order was not returned.");
      }
      const callbackEvent = {
        checkoutId: typeof order.checkout_attempt_id === "string" ? order.checkout_attempt_id : undefined,
        orderId: order.order_id,
        value: order.amount,
        currency: order.currency,
        source: options.source,
      };
      const checkoutOrder = {
        key_id: order.key_id,
        order_id: order.order_id,
        amount: order.amount,
        currency: order.currency,
        description: typeof order.description === "string" ? order.description : undefined,
        name: typeof order.name === "string" ? order.name : undefined,
        email: typeof order.email === "string" ? order.email : undefined,
        contact: typeof order.contact === "string" ? order.contact : undefined,
        checkout_attempt_id: typeof order.checkout_attempt_id === "string" ? order.checkout_attempt_id : undefined,
        checkout_recovery_token: typeof order.checkout_recovery_token === "string" ? order.checkout_recovery_token : undefined,
      };
      trackCallbackPaymentStarted(callbackEvent);
      trackCallbackCheckoutOpened(callbackEvent);
      failureStage = "checkout";
      const verification = await openRazorpayCheckout(checkoutOrder, env.apiUrl);
      failureStage = "verification";
      if (verification.state !== "callback_requested") {
        throw new RazorpayCheckoutError("verification_failed", "Payment verification failed.");
      }
      setStatus("success");
      setMessage(String(verification.message || "Payment confirmed. Expect a callback within the next 24 hours."));
      trackCallbackPaymentSucceeded({
        ...callbackEvent,
        paymentId: typeof verification.razorpay_payment_id === "string" ? verification.razorpay_payment_id : undefined,
      });
    } catch (error) {
      const callbackEvent = {
        checkoutId: typeof order?.checkout_attempt_id === "string" ? order.checkout_attempt_id : undefined,
        orderId: typeof order?.order_id === "string" ? order.order_id : undefined,
        value: typeof order?.amount === "number" ? order.amount : undefined,
        currency: typeof order?.currency === "string" ? order.currency : undefined,
        source: options.source,
      };
      if (error instanceof RazorpayCheckoutError && error.code === "dismissed") {
        trackCallbackCheckoutDismissed(callbackEvent);
      } else if (error instanceof RazorpayCheckoutError && error.code === "confirmation_pending") {
        trackCallbackPaymentConfirmationPending(callbackEvent);
      } else {
        const reportedStage = error instanceof RazorpayCheckoutError ? "verification" : failureStage;
        trackCallbackPaymentFailed({
          ...callbackEvent,
          errorCode: error instanceof RazorpayCheckoutError ? error.code : `${failureStage}_failed`,
          failureStage: reportedStage,
        });
      }
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to request a callback.");
    }
  }, [options.countryCode, options.email, options.name, options.phone, options.referenceId, options.source]);

  return { status, message, reset, startPayment };
}
