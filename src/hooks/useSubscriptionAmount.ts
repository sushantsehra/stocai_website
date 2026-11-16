"use client";

import { useEffect, useState } from "react";
import env from "@/utils/env";

export const formatSubscriptionAmount = (amountInPaise: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amountInPaise / 100);

export type PaymentSettings = {
  subscriptionAmount: number | null;
  callbackAmount: number | null;
  currency: string;
};

const emptySettings: PaymentSettings = {
  subscriptionAmount: null,
  callbackAmount: null,
  currency: "INR",
};

const positiveAmount = (value: unknown) => {
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0 ? amount : null;
};

export const usePaymentSettings = (enabled = true) => {
  const [settings, setSettings] = useState<PaymentSettings>(emptySettings);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    fetch(`${env.apiUrl}/payments/razorpay/settings`, { signal: controller.signal })
      .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        setSettings(ok ? {
          subscriptionAmount: positiveAmount(data?.subscription_amount),
          callbackAmount: positiveAmount(data?.callback_amount),
          currency: typeof data?.currency === "string" && data.currency ? data.currency : "INR",
        } : emptySettings);
      })
      .catch((reason) => {
        if (reason?.name !== "AbortError") setSettings(emptySettings);
      });

    return () => controller.abort();
  }, [enabled]);

  return settings;
};

const useSubscriptionAmount = (enabled = true) => {
  const { subscriptionAmount } = usePaymentSettings(enabled);
  return subscriptionAmount;
};

export default useSubscriptionAmount;
