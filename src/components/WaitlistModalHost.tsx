"use client";

import React, { useEffect, useState } from "react";
import HeroWaitlist from "@/components/HeroWaitlist";
import env from "@/utils/env";
import posthog from "posthog-js";
import { getAttributionForApi } from "@/lib/analytics/attribution";

const pushToDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const dataLayerWindow = window as unknown as Window & { dataLayer?: unknown[] };
  if (!dataLayerWindow.dataLayer) {
    dataLayerWindow.dataLayer = [];
  }
  dataLayerWindow.dataLayer.push(payload);
};

const WaitlistModalHost: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState("");
  const [source, setSource] = useState("waitlist");

  useEffect(() => {
    const handleClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-waitlist-modal]")) return;
      const trigger = target?.closest('[data-waitlist-cta], a[href="#waitlist"]');
      if (!trigger) return;

      event.preventDefault();
      event.stopPropagation();
      if ("stopImmediatePropagation" in event) {
        event.stopImmediatePropagation();
      }

      const emailInputId = trigger.getAttribute("data-waitlist-email-input");
      const triggerSource = trigger.getAttribute("data-waitlist-source") || "waitlist";
      let emailValue = "";
      if (emailInputId) {
        const input = document.getElementById(emailInputId) as HTMLInputElement | null;
        emailValue = input?.value.trim() ?? "";
        if (input && !input.checkValidity()) {
          input.focus();
          input.reportValidity?.();
          return;
        }
      }

      setPrefillEmail(emailValue);
      setSource(triggerSource);
      posthog.capture("waitlist_modal_opened", {
        source: triggerSource,
        has_prefill_email: Boolean(emailValue),
      });
      pushToDataLayer({
        event: "waitlist_modal_opened",
        source: triggerSource,
        has_prefill_email: Boolean(emailValue),
      });
      if (emailValue) {
        try {
          await fetch(`${env.apiUrl}/waitlist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: emailValue,
              source: triggerSource,
              attribution: getAttributionForApi(),
            }),
          });
        } catch {
          // Ignore errors here; user can still complete full form in modal.
        }
      }
      setIsOpen(true);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  const handleClose = (reason?: "x_button" | "escape") => {
    if (reason) {
      posthog.capture("waitlist_modal_closed", {
        source,
        close_reason: reason,
        has_prefill_email: Boolean(prefillEmail),
      });
      pushToDataLayer({
        event: "waitlist_modal_closed",
        source,
        close_reason: reason,
        has_prefill_email: Boolean(prefillEmail),
      });
    }
    setIsOpen(false);
  };

  return (
    <HeroWaitlist
      isOpen={isOpen}
      onClose={handleClose}
      initialEmail={prefillEmail}
      source={source}
    />
  );
};

export default WaitlistModalHost;
