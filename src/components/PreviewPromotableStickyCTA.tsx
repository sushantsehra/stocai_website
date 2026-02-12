"use client";

import React, { useState, useEffect } from "react";
import posthog from "posthog-js";
import env from "@/utils/env";
import { getAttributionForApi } from "@/lib/analytics/attribution";

const PreviewPromotableStickyCTA = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default India
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const source = "preview_promotable_sticky_cta";

  const trackGetEarlyAccess = () => {
    posthog.capture("get_early_access_clicked", {
      source,
    });
  };

  const trackRequestAccess = () => {
    posthog.capture("request_access_clicked", {
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

  /* ---------- Modal Detection ---------- */
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

  // Method 2: Check DOM for modal presence (backup method)
  useEffect(() => {
    const checkModalPresence = () => {
      const modalElement = document.querySelector("[data-waitlist-modal]");
      setIsModalOpen(!!modalElement);
    };

    // Check initially
    checkModalPresence();

    const observer = new MutationObserver(checkModalPresence);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  /* ---------- CTA ACTION ---------- */
  const isFormValid =
    name.trim() !== "" && email.trim() !== "" && phone.trim() !== "";

  const handleRequestAccess = async () => {
    trackRequestAccess();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const fullPhone = `${countryCode}${phone}`;

    localStorage.setItem("userName", trimmedName);
    localStorage.setItem("userEmail", trimmedEmail);
    localStorage.setItem("userMobile", fullPhone);
    localStorage.setItem("userCountryCode", countryCode);
    localStorage.setItem("userPhone", phone);

    try {
      const response = await fetch(`${env.apiUrl}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          phone: fullPhone,
          source: "preview_sticky_cta",
          attribution: getAttributionForApi(),
        }),
      });

      const waitlistData = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(waitlistData?.error || "Unable to join the waitlist.");
      }

      const redirectPath = `/?name=${encodeURIComponent(trimmedName)}&email=${encodeURIComponent(trimmedEmail)}`;
      const signupUrl = new URL("/signUp", env.publicUrl);
      signupUrl.searchParams.set("auth", "preview");
      signupUrl.searchParams.set("redirect", redirectPath);
      window.location.href = signupUrl.toString();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  if (isModalOpen) return null;

  return (
    <div className="fixed -bottom-1 left-0 w-full z-[9999] bg-[#1B294B] text-white py-3">
      <div className="max-w-7xl mx-auto px-4">
        {!isExpanded ? (
          <div className="flex justify-center py-1.5">
            <button
              onClick={() => {
                trackGetEarlyAccess();
                setIsExpanded(true);
              }}
              className="bg-[#0B64F4] hover:bg-blue-700 px-8 py-3 rounded-[12px] font-bold transition-transform hover:scale-105 active:scale-95"
            >
              Get Early Access
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 md:gap-10 justify-center items-center max-w-7xl py-2">
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto bg-[#F5F5F5] rounded-[20px] shadow-lg px-3 py-2.5 gap-2 md:gap-5">

              {/* Name */}
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:w-[160px] md:w-[250px] px-3 py-2 rounded-md text-black text-sm bg-gray-200"
                required
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-[200px] md:w-[250px] px-3 py-2 rounded-md text-black text-sm bg-gray-200"
                required
              />

              {/* Country Code */}
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-2 py-2 rounded-md bg-white text-black text-sm bg-gray-200"
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
                onChange={(e) =>
                  setPhone(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="w-full sm:w-[160px] md:w-[250px] px-3 py-2 text-black text-sm bg-gray-200 rounded-md"
                required
              />

            {/* Desktop Request Access Button */}
            <button
              onClick={handleRequestAccess}
              disabled={!isFormValid || isSubmitting}
              className="hidden sm:block bg-gradient-to-r from-[#024BAB] to-[#3C83F6] text-white px-5 py-2 rounded-[12px] font-bold transition-transform hover:scale-105 active:scale-95 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Request Access"}
            </button>
          </div>

          {/* Mobile Request Access Button */}
          <button
            onClick={handleRequestAccess}
            disabled={!isFormValid || isSubmitting}
            className="block sm:hidden w-[60%] bg-gradient-to-r from-[#ADADAD] to-[#FFFFFF] text-black rounded-[10px] font-bold p-3 transition-transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Request Access"}
          </button>
          {error ? (
            <p className="text-sm text-red-200" role="status" aria-live="polite">
              {error}
            </p>
          ) : null}
        </div>
      )}
      </div>
    </div>
  );
};

export default PreviewPromotableStickyCTA;
