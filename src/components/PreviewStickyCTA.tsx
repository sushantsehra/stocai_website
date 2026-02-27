"use client";

import React, { useState, useEffect } from "react";
import posthog from "posthog-js";

const PreviewStickyCTA = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default India
  const source = "preview_sticky_cta";

  const pushToDataLayer = (payload: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    const dataLayerWindow = window as unknown as Window & { dataLayer?: unknown[] };
    if (!dataLayerWindow.dataLayer) {
      dataLayerWindow.dataLayer = [];
    }
    dataLayerWindow.dataLayer.push(payload);
  };

  const trackSubmitAttempt = () => {
    posthog.capture("waitlist_submit_attempt", {
      source,
      path: window.location.pathname,
    });
    pushToDataLayer({
      event: "waitlist_submit_attempt",
      source,
    });
  };

  const trackGetEarlyAccess = () => {
    posthog.capture("get_early_access_clicked", {
      source,
      path: window.location.pathname,
    });
    pushToDataLayer({
      event: "get_early_access_clicked",
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

  // Method 1: Listen for modal events
  useEffect(() => {
    const handleModalOpen = () => {
      console.log("Modal opened event received");
      setIsModalOpen(true);
    };
    const handleModalClose = () => {
      console.log("Modal closed event received");
      setIsModalOpen(false);
    };

    window.addEventListener('waitlist-modal-opened', handleModalOpen);
    window.addEventListener('waitlist-modal-closed', handleModalClose);

    return () => {
      window.removeEventListener('waitlist-modal-opened', handleModalOpen);
      window.removeEventListener('waitlist-modal-closed', handleModalClose);
    };
  }, []);

  // Method 2: Check DOM for modal presence (backup method)
  useEffect(() => {
    const checkModalPresence = () => {
      const modalElement = document.querySelector('[data-waitlist-modal]');
      setIsModalOpen(!!modalElement);
    };

    // Check initially
    checkModalPresence();

    // Check periodically
    const observer = new MutationObserver(() => {
      checkModalPresence();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // Handle navigation to signin/login
  const handleRequestAccess = () => {
    if (phone.trim()) {
      trackSubmitAttempt();
      const fullPhone = `${countryCode}${phone}`;
      
      // Store mobile number in localStorage
      localStorage.setItem('userMobile', fullPhone);
      localStorage.setItem('userCountryCode', countryCode);
      localStorage.setItem('userPhone', phone);
      
      // Small delay gives analytics transport time to flush before hard navigation.
      window.setTimeout(() => {
        window.location.href = "https://os.bettercorporatelife.com/signUp?redirect=%2F";
      }, 250);
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
          <div className="flex items-center justify-center">
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
          <div className="flex flex-col gap-3 sm:flex-row justify-center items-center">
            <div className="flex flex-row px-2 md:px-0 items-center justify-center w-full sm:w-auto md:min-w-lg lg:min-w-3xl lg:max-w-3xl bg-[#F5F5F5] rounded-[20px] h-auto md:h-[60px] shadow-lg overflow-hidden py-2 md:py-0">
              {/* Country Code Dropdown */}
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="rounded-[10px] bg-white px-2 py-2 text-gray-900 font-medium font-jakarta text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-gray-500 transition cursor-pointer ml-2"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>

              {/* Phone Number Input */}
              <input
                id="sticky-mobile-number"
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                className="flex-1 px-3 py-2 text-black font-medium outline-none text-sm sm:text-base lg:text-[18px] bg-transparent"
                pattern="[0-9]{7,15}"
                title="Enter 7-15 digits"
                required
                autoFocus
              />

              {/* Desktop Request Access Button */}
              <button
                onClick={handleRequestAccess}
                className="hidden sm:block bg-gradient-to-r from-[#024BAB] to-[#3C83F6] hover:bg-blue-700 rounded-[10px] md:rounded-[12px] text-white text-sm lg:text-[18px] min-h-[48px] font-bold cursor-pointer px-4 py-2 mr-2 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                Request Access
              </button>
            </div>
            
            {/* Mobile Request Access Button */}
            <button
              onClick={handleRequestAccess}
              className="block sm:hidden w-[60%] bg-gradient-to-r from-[#ADADAD] to-[#FFFFFF] hover:bg-blue-700 rounded-[9.36px] md:rounded-[12px] text-[18.71px] text-black lg:text-[20px] min-h-[49.900848388671875px] cursor-pointer font-bold font-jakarta p-3.5 md:py-3 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Request Access
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewStickyCTA;
