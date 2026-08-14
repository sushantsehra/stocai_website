"use client";

import React, { useState, useEffect, useRef } from "react";
import posthog from "posthog-js";
import { trackCtaClick } from "@/lib/analytics/events";

// ✅ Define prop types
type PromotableStickyCTAProps = {
  defaultExpanded?: boolean;
  anchorId?: string;
  useIsoCountryLabels?: boolean;
  variant?: "default" | "promotion";
  onRequestAccess?: (data: {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    fullPhone: string;
    source: string;
  }) => Promise<void>; // ✅ Changed to async
};

const PromotableStickyCTA: React.FC<PromotableStickyCTAProps> = ({
  onRequestAccess,
  defaultExpanded = false,
  anchorId,
  useIsoCountryLabels = false,
  variant = "default",
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ NEW

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const source = "promotable_sticky_cta";

  const trackGetEarlyAccess = () => {
    posthog.capture("get_early_access_clicked", {
      source,
    });
  };

  // Popular country codes
  const countryCodes = [
    { code: "+91", country: "India", iso: "IN", flag: "🇮🇳" },
    { code: "+1", country: "USA", iso: "US", flag: "🇺🇸" },
    { code: "+44", country: "UK", iso: "GB", flag: "🇬🇧" },
    { code: "+971", country: "UAE", iso: "AE", flag: "🇦🇪" },
    { code: "+65", country: "Singapore", iso: "SG", flag: "🇸🇬" },
    { code: "+86", country: "China", iso: "CN", flag: "🇨🇳" },
    { code: "+81", country: "Japan", iso: "JP", flag: "🇯🇵" },
    { code: "+82", country: "South Korea", iso: "KR", flag: "🇰🇷" },
    { code: "+61", country: "Australia", iso: "AU", flag: "🇦🇺" },
    { code: "+49", country: "Germany", iso: "DE", flag: "🇩🇪" },
    { code: "+33", country: "France", iso: "FR", flag: "🇫🇷" },
    { code: "+39", country: "Italy", iso: "IT", flag: "🇮🇹" },
    { code: "+34", country: "Spain", iso: "ES", flag: "🇪🇸" },
    { code: "+7", country: "Russia", iso: "RU", flag: "🇷🇺" },
    { code: "+55", country: "Brazil", iso: "BR", flag: "🇧🇷" },
    { code: "+52", country: "Mexico", iso: "MX", flag: "🇲🇽" },
    { code: "+27", country: "South Africa", iso: "ZA", flag: "🇿🇦" },
    { code: "+62", country: "Indonesia", iso: "ID", flag: "🇮🇩" },
    { code: "+60", country: "Malaysia", iso: "MY", flag: "🇲🇾" },
    { code: "+66", country: "Thailand", iso: "TH", flag: "🇹🇭" },
  ];

  // Listen for modal events
  useEffect(() => {
    const handleModalOpen = () => {
      setIsModalOpen(true);
    };
    const handleModalClose = () => {
      setIsModalOpen(false);
    };

    window.addEventListener("waitlist-modal-opened", handleModalOpen);
    window.addEventListener("waitlist-modal-closed", handleModalClose);

    return () => {
      window.removeEventListener("waitlist-modal-opened", handleModalOpen);
      window.removeEventListener("waitlist-modal-closed", handleModalClose);
    };
  }, []);

  useEffect(() => {
    if (!anchorId) return;

    const openAccessForm = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>(`a[href="#${anchorId}"]`);
      if (!link) return;

      event.preventDefault();
      trackCtaClick({
        location: link.dataset.ctaLocation || "page",
        label: link.textContent || "Get Access",
        source,
      });
      trackGetEarlyAccess();
      setIsExpanded(true);
      window.setTimeout(() => nameInputRef.current?.focus(), 0);
    };

    document.addEventListener("click", openAccessForm);
    return () => document.removeEventListener("click", openAccessForm);
  }, [anchorId]);

  // Check DOM for modal presence (backup)
  useEffect(() => {
    const checkModalPresence = () => {
      const modalElement = document.querySelector("[data-waitlist-modal]");
      setIsModalOpen(!!modalElement);
    };

    checkModalPresence();

    const observer = new MutationObserver(() => {
      checkModalPresence();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Handle Request Access - now async
  const handleRequestAccess = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in all fields");
      return;
    }
    const fullPhone = `${countryCode}${phone}`;

    if (onRequestAccess) {
      setIsLoading(true); // ✅ Show loading
      try {
        await onRequestAccess({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          countryCode: countryCode,
          fullPhone: fullPhone,
          source,
        });
      } finally {
        setIsLoading(false); // ✅ Hide loading
      }
    }
  };

  // Hide sticky CTA when modal is open
  if (isModalOpen) {
    return null;
  }

  return (
    <div id={anchorId} className={`fixed -bottom-1 left-0 w-full z-[9999] text-white ${variant === "promotion" ? "bg-[#061A34] border-t border-[#31506F] py-2.5" : "bg-[#1B294B] py-3"}`}>
      <div className="max-w-7xl mx-auto px-4">
        {!isExpanded ? (
          <div className="flex items-center justify-center py-1.5">
            <button
              onClick={() => {
                trackCtaClick({ location: "sticky", label: "Get Access", source });
                trackGetEarlyAccess();
                setIsExpanded(true);
              }}
              className={`bg-[#0B64F4] hover:bg-[#2678FA] text-white text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 font-jakarta cursor-pointer font-bold transition-transform duration-200 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0 shrink-0 ${variant === "promotion" ? "rounded-[9px]" : "rounded-[12px]"}`}
            >
              Get Access
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row justify-center items-center py-2">
            <div className={`flex flex-col sm:flex-row items-center w-full sm:w-auto px-3 py-2.5 gap-2 md:gap-3 ${variant === "promotion" ? "bg-[#EAF3FF] rounded-[12px] shadow-[0_8px_28px_rgba(0,0,0,.18)]" : "bg-[#F5F5F5] rounded-[20px] shadow-lg"}`}>
              {/* Name Input */}
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:w-[140px] md:w-[160px] lg:w-[180px] px-3 py-2 rounded-[8px] text-[#061A34] text-sm outline-none bg-white border border-[#D8E4F1] focus:border-[#0B64F4]"
                required
                disabled={isLoading}
              />

              {/* Email Input */}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-[160px] md:w-[180px] lg:w-[200px] px-3 py-2 rounded-[8px] text-[#061A34] text-sm outline-none bg-white border border-[#D8E4F1] focus:border-[#0B64F4]"
                required
                disabled={isLoading}
              />

              {/* Country Code Dropdown */}
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-2 py-2 rounded-[8px] bg-white text-[#061A34] text-sm outline-none border border-[#D8E4F1] focus:border-[#0B64F4]"
                disabled={isLoading}
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {useIsoCountryLabels ? c.iso : c.flag} {c.code}
                  </option>
                ))}
              </select>

              {/* Phone Number Input */}
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full sm:w-[140px] md:w-[160px] lg:w-[180px] px-3 py-2 text-[#061A34] text-sm outline-none bg-white rounded-[8px] border border-[#D8E4F1] focus:border-[#0B64F4]"
                required
                disabled={isLoading}
              />

              {/* Desktop Request Access Button */}
              <button
                onClick={handleRequestAccess}
                disabled={isLoading}
                className={`hidden sm:block bg-[#0B64F4] hover:bg-[#2678FA] text-white text-sm min-h-[40px] font-bold cursor-pointer px-4 md:px-5 py-2 transition-transform duration-200 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${variant === "promotion" ? "rounded-[9px]" : "rounded-[12px]"}`}
              >
                {isLoading ? "Saving..." : "Get Access"}
              </button>
            </div>

            {/* Mobile Request Access Button */}
            <button
              onClick={handleRequestAccess}
              disabled={isLoading}
              className={`block sm:hidden min-h-[48px] cursor-pointer font-bold font-jakarta px-6 py-3 text-base transition-transform duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${variant === "promotion" ? "w-fit bg-[#0B64F4] hover:bg-[#2678FA] rounded-[9px] text-white" : "w-[60%] bg-gradient-to-r from-[#ADADAD] to-[#FFFFFF] rounded-[9.36px] text-black"}`}
            >
              {isLoading ? "Saving..." : "Get Access"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotableStickyCTA;
