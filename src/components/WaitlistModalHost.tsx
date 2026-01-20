"use client";

import React, { useEffect, useState } from "react";
import HeroWaitlist from "@/components/HeroWaitlist";

const WaitlistModalHost: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-waitlist-modal]")) return;
      const trigger = target?.closest('[data-waitlist-cta], a[href="#waitlist"]');
      if (!trigger) return;

      event.preventDefault();
      event.stopPropagation();
      if ("stopImmediatePropagation" in event) {
        event.stopImmediatePropagation();
      }
      setIsOpen(true);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return <HeroWaitlist isOpen={isOpen} onClose={() => setIsOpen(false)} />;
};

export default WaitlistModalHost;
