"use client";

import React, { useState, useEffect } from "react";
import posthog from "posthog-js";

// ✅ Define prop types
type PromotableStickyCTAProps = {
  onRequestAccess?: (data: {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    fullPhone: string;
    source: string;
  }) => Promise<void>; // ✅ Changed to async
};

const PromotableStickyCTA: React.FC<PromotableStickyCTAProps> = ({ onRequestAccess }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ NEW

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const source = "promotable_sticky_cta";

  const pushToDataLayer = (payload: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    const dataLayerWindow = window as unknown as Window & { dataLayer?: unknown[] };
    if (!dataLayerWindow.dataLayer) {
      dataLayerWindow.dataLayer = [];
    }
    dataLayerWindow.dataLayer.push(payload);
  };

  const trackGetEarlyAccess = () => {
    posthog.capture("get_early_access_clicked", {
      source,
    });
  };

  const trackRequestAccess = () => {
    posthog.capture("waitlist_modal_opened", {
      source,
    });
    pushToDataLayer({
      event: "waitlist_modal_opened",
      source,
    });
  };

  // Popular country codes
  const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "USA", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+82", country: "South Korea", flag: "🇰🇷" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+39", country: "Italy", flag: "🇮🇹" },
    { code: "+34", country: "Spain", flag: "🇪🇸" },
    { code: "+7", country: "Russia", flag: "🇷🇺" },
    { code: "+55", country: "Brazil", flag: "🇧🇷" },
    { code: "+52", country: "Mexico", flag: "🇲🇽" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+62", country: "Indonesia", flag: "🇮🇩" },
    { code: "+60", country: "Malaysia", flag: "🇲🇾" },
    { code: "+66", country: "Thailand", flag: "🇹🇭" },
  ];

  // Listen for modal events
  useEffect(() => {
    const handleModalOpen = () => {
      console.log("Modal opened event received");
      setIsModalOpen(true);
    };
    const handleModalClose = () => {
      console.log("Modal closed event received");
      setIsModalOpen(false);
    };

    window.addEventListener("waitlist-modal-opened", handleModalOpen);
    window.addEventListener("waitlist-modal-closed", handleModalClose);

    return () => {
      window.removeEventListener("waitlist-modal-opened", handleModalOpen);
      window.removeEventListener("waitlist-modal-closed", handleModalClose);
    };
  }, []);

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
    trackRequestAccess();

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
          source: "sticky_cta",
        });
      } finally {
        setIsLoading(false); // ✅ Hide loading
      }
    }
  };

  // Hide sticky CTA when modal is open
  if (isModalOpen) {
    console.log("Hiding sticky CTA because modal is open");
    return null;
  }

  return (
    <div className="fixed -bottom-1 left-0 w-full z-[9999] bg-[#1B294B] text-white py-3">
      <div className="max-w-7xl mx-auto px-4">
        {!isExpanded ? (
          <div className="flex items-center justify-center py-1.5">
            <button
              onClick={() => {
                trackGetEarlyAccess();
                setIsExpanded(true);
              }}
              className="bg-[#0B64F4] hover:bg-blue-700 text-white text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-[12px] font-jakarta cursor-pointer font-bold transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 shrink-0"
            >
              Get Early Access
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row justify-center items-center py-2">
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto bg-[#F5F5F5] rounded-[20px] shadow-lg px-3 py-2.5 gap-2 md:gap-3">
              {/* Name Input */}
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:w-[140px] md:w-[160px] lg:w-[180px] px-3 py-2 rounded-md text-black text-sm outline-none bg-white"
                required
                disabled={isLoading}
              />

              {/* Email Input */}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-[160px] md:w-[180px] lg:w-[200px] px-3 py-2 rounded-md text-black text-sm outline-none bg-white"
                required
                disabled={isLoading}
              />

              {/* Country Code Dropdown */}
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-2 py-2 rounded-md bg-white text-black text-sm outline-none"
                disabled={isLoading}
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>

              {/* Phone Number Input */}
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full sm:w-[140px] md:w-[160px] lg:w-[180px] px-3 py-2 text-black text-sm outline-none bg-white rounded-md"
                required
                disabled={isLoading}
              />

              {/* Desktop Request Access Button */}
              <button
                onClick={handleRequestAccess}
                disabled={isLoading}
                className="hidden sm:block bg-gradient-to-r from-[#024BAB] to-[#3C83F6] hover:bg-blue-700 rounded-[10px] md:rounded-[12px] text-white text-sm min-h-[40px] font-bold cursor-pointer px-4 md:px-5 py-2 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Request Access"}
              </button>
            </div>

            {/* Mobile Request Access Button */}
            <button
              onClick={handleRequestAccess}
              disabled={isLoading}
              className="block sm:hidden w-[60%] bg-gradient-to-r from-[#ADADAD] to-[#FFFFFF] hover:bg-blue-700 rounded-[9.36px] text-[18.71px] text-black min-h-[49.9px] cursor-pointer font-bold font-jakarta p-3.5 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Request Access"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotableStickyCTA;
