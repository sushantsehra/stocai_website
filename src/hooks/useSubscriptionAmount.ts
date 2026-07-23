"use client";

import { useEffect, useState } from "react";
import env from "@/utils/env";

export const formatSubscriptionAmount = (amountInPaise: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amountInPaise / 100);

const useSubscriptionAmount = (enabled = true) => {
  const [subscriptionAmount, setSubscriptionAmount] = useState<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    fetch(`${env.apiUrl}/payments/razorpay/settings`, { signal: controller.signal })
      .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        const amount = Number(data?.subscription_amount);
        setSubscriptionAmount(ok && Number.isFinite(amount) && amount > 0 ? amount : null);
      })
      .catch((reason) => {
        if (reason?.name !== "AbortError") setSubscriptionAmount(null);
      });

    return () => controller.abort();
  }, [enabled]);

  return subscriptionAmount;
};

export default useSubscriptionAmount;
