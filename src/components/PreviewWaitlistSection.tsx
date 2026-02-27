"use client";

import React, { useState } from "react";
import posthog from "posthog-js";
import env from "@/utils/env";
import { getAttributionForApi } from "@/lib/analytics/attribution";

const PreviewWaitlistSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const source = "preview_waitlist_section";

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

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "";

  const handleRequestAccess = async () => {
    if (!isFormValid || isSubmitting) return;
    trackSubmitAttempt();

    setIsSubmitting(true);
    setError("");

    const fullPhone = `${countryCode}${phone}`;

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userMobile", fullPhone);
    localStorage.setItem("userCountryCode", countryCode);
    localStorage.setItem("userPhone", phone);

    try {
      const response = await fetch(`${env.apiUrl}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: fullPhone,
          source,
          attribution: getAttributionForApi(),
        }),
      });

      const waitlistData = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(waitlistData?.error || "Unable to join the waitlist.");
      }
      posthog.capture("waitlist_submitted", {
        source,
        payment_started: false,
      });
      pushToDataLayer({
        event: "waitlist_submitted",
        source,
        payment_started: false,
      });

      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const redirectPath = `/?name=${encodeURIComponent(trimmedName)}&email=${encodeURIComponent(trimmedEmail)}`;
      const signupUrl = new URL("/signUp", env.publicUrl);
      signupUrl.searchParams.set("auth", "preview");
      signupUrl.searchParams.set("redirect", redirectPath);
      // Small delay gives analytics transport time to flush before hard navigation.
      window.setTimeout(() => {
        window.location.href = signupUrl.toString();
      }, 250);
    } catch (err) {
      posthog.capture("waitlist_submit_failed", {
        source,
        error: err instanceof Error ? err.message : "unknown_error",
      });
      pushToDataLayer({
        event: "waitlist_submit_failed",
        source,
        error: err instanceof Error ? err.message : "unknown_error",
      });
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="bg-gradient-to-b from-[#0F182C] to-[#0B63F0] text-white py-12 px-4 text-center mt-6"
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-12 h-12 md:w-[64px] md:h-[64px] bg-[#3B6FF5] rounded-[12px] md:rounded-[20px] mb-6 lg:mb-12">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
          <g transform="translate(2,-2)">
            <path d="M18 5 V8 M16.5 6.5 H19.5" />
          </g>
          <g transform="translate(-2,2)">
            <path d="M6 16 V18 M5 17 H7" />
          </g>
        </svg>
      </div>

      <h2 className="text-[20px] sm:text-4xl md:text-[48px] font-bold mb-3.5">
        Ready to change your career trajectory?
      </h2>

      <p className="lg:text-[20px] mb-6 text-sm sm:text-base text-white/60 font-medium lg:max-w-3xl mx-auto">
        After years of doing this privately and helping hundreds become promotable,
        we&apos;re scaling to our first paid launch.
      </p>

      <p className="lg:text-[22px] mb-8 text-sm sm:text-base font-medium">
        Benefit from our early-bird offer, only available for a short time, for this special launch.
      </p>

      {/* Inputs */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl bg-[#F5F5F5] rounded-[24px] px-4 py-4 gap-3 shadow-lg">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full md:w-[22%] px-4 py-3 rounded-[14px] bg-gray-200 text-gray-800 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-[28%] px-4 py-3 rounded-[14px] bg-gray-200 text-gray-800 outline-none"
          />

          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full md:w-[14%] px-4 py-3 rounded-[14px] bg-white text-gray-800 outline-none cursor-pointer"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.code}
              </option>
            ))}
          </select>

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/[^0-9]/g, ""))
            }
            className="w-full md:w-[26%] px-4 py-3 rounded-[14px] bg-gray-200 text-gray-800 outline-none"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleRequestAccess}
          disabled={!isFormValid || isSubmitting}
          className={`
            px-12 py-4 rounded-[18px] text-lg font-bold shadow-lg transition-all
            ${
              isFormValid && !isSubmitting
                ? "bg-gradient-to-r from-[#024BAB] to-[#3C83F6] text-white hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }
          `}
        >
          {isSubmitting ? "Submitting..." : "Request Access"}
        </button>
        {error ? (
          <p className="text-sm text-red-200" role="status" aria-live="polite">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default PreviewWaitlistSection;
