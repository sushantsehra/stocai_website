"use client";

import React, { useEffect, useState } from "react";
import HeroWaitlist from "@/components/HeroWaitlist";
import env from "@/utils/env";

const WaitlistModalHost: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState("");

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
      if (emailValue) {
        try {
          await fetch(`${env.apiUrl}/waitlist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: emailValue,
              source: "hero",
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

  return <HeroWaitlist isOpen={isOpen} onClose={() => setIsOpen(false)} initialEmail={prefillEmail} />;
};

export default WaitlistModalHost;
