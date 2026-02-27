"use client";

import React, { useState, useEffect } from "react";

type StickyCTAProps = {
  onRequestAccess?: (data: {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    fullPhone: string;
    source: string;
  }) => Promise<void>;
};

const StickyCTA: React.FC<StickyCTAProps> = ({ onRequestAccess }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  const countryCodes = [
    { code: "+91", flag: "🇮🇳" },
    { code: "+1", flag: "🇺🇸" },
    { code: "+44", flag: "🇬🇧" },
    { code: "+971", flag: "🇦🇪" },
    { code: "+65", flag: "🇸🇬" },
    { code: "+86", flag: "🇨🇳" },
    { code: "+81", flag: "🇯🇵" },
    { code: "+82", flag: "🇰🇷" },
    { code: "+61", flag: "🇦🇺" },
    { code: "+49", flag: "🇩🇪" },
    { code: "+33", flag: "🇫🇷" },
    { code: "+39", flag: "🇮🇹" },
    { code: "+34", flag: "🇪🇸" },
    { code: "+7", flag: "🇷🇺" },
    { code: "+55", flag: "🇧🇷" },
    { code: "+52", flag: "🇲🇽" },
    { code: "+27", flag: "🇿🇦" },
    { code: "+62", flag: "🇮🇩" },
    { code: "+60", flag: "🇲🇾" },
    { code: "+66", flag: "🇹🇭" },
  ];

  // Listen for modal open/close events — hide the bar when modal is open
  useEffect(() => {
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);
    window.addEventListener("waitlist-modal-opened", handleModalOpen);
    window.addEventListener("waitlist-modal-closed", handleModalClose);
    return () => {
      window.removeEventListener("waitlist-modal-opened", handleModalOpen);
      window.removeEventListener("waitlist-modal-closed", handleModalClose);
    };
  }, []);

  // DOM backup check for modal presence
  useEffect(() => {
    const check = () => setIsModalOpen(!!document.querySelector("[data-waitlist-modal]"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const handleRequestAccess = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (!onRequestAccess) return;

    setIsLoading(true);
    try {
      await onRequestAccess({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        countryCode,
        fullPhone: `${countryCode}${phone.trim()}`,
        source: "sticky_cta",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Hide entire bar when modal is open
  if (isModalOpen) return null;

  return (
    <div className="fixed -bottom-1 left-0 w-full z-[9999] bg-[#1B294B] text-white py-3">
      <div className="max-w-7xl mx-auto px-4">
        {!isExpanded ? (
          /* ── Collapsed: single CTA button ── */
          <div className="flex items-center justify-center py-1.5">
            <button
              onClick={() => {
                setIsExpanded(true);
              }}
              className="bg-[#0B64F4] hover:bg-blue-700 text-white text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-[12px] font-jakarta cursor-pointer font-bold transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Get Early Access
            </button>
          </div>
        ) : (
          /* ── Expanded: inline form ── */
          <div className="flex flex-col gap-3 sm:flex-row justify-center items-center py-2">
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto bg-[#F5F5F5] rounded-[20px] shadow-lg px-3 py-2.5 gap-2 md:gap-3">
              {/* Name */}
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-full sm:w-[140px] md:w-[160px] lg:w-[180px] px-3 py-2 rounded-md text-black text-sm outline-none bg-white disabled:opacity-50"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full sm:w-[160px] md:w-[180px] lg:w-[200px] px-3 py-2 rounded-md text-black text-sm outline-none bg-white disabled:opacity-50"
              />

              {/* Country Code */}
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={isLoading}
                className="px-2 py-2 rounded-md bg-white text-black text-sm outline-none disabled:opacity-50"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>

              {/* Phone */}
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                disabled={isLoading}
                className="w-full sm:w-[140px] md:w-[160px] lg:w-[180px] px-3 py-2 text-black text-sm outline-none bg-white rounded-md disabled:opacity-50"
              />

              {/* Desktop Button */}
              <button
                onClick={handleRequestAccess}
                disabled={isLoading}
                className="hidden sm:block bg-gradient-to-r from-[#024BAB] to-[#3C83F6] hover:bg-blue-700 rounded-[10px] md:rounded-[12px] text-white text-sm min-h-[40px] font-bold cursor-pointer px-4 md:px-5 py-2 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Request Access"}
              </button>
            </div>

            {/* Mobile Button */}
            <button
              onClick={handleRequestAccess}
              disabled={isLoading}
              className="block sm:hidden w-[60%] bg-gradient-to-r from-[#ADADAD] to-[#FFFFFF] rounded-[9.36px] text-[18.71px] text-black min-h-[49.9px] cursor-pointer font-bold font-jakarta p-3.5 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Request Access"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyCTA;
