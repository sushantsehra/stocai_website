"use client";

import React, { useEffect, useState } from "react";
import env from "@/utils/env";
import certificate from "../assets/certificate.png"
import Image from "next/image";
import { IoIosArrowDroprightCircle } from "react-icons/io";
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

type HeroWaitlistProps = {
  bgImage?: string;
  isOpen: boolean;
  onClose: (reason?: "x_button" | "escape") => void;
  initialEmail?: string;
  source?: string;
  onSubmit?: (data: {
    name: string;
    phone: string;
    email: string;
  }) => void;
};

const HeroWaitlist: React.FC<HeroWaitlistProps> = ({
  isOpen,
  onClose,
  initialEmail,
  source = "waitlist_modal",
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default India
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose("escape");
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) return;
    setStatus("idle");
    setMessage("");
  }, [isOpen]);

  // useEffect(() => {
  //   if (!isOpen) return;
  //   setEmail(initialEmail ?? "");
  // }, [isOpen, initialEmail]);

  useEffect(() => {
    if (initialEmail) setEmail(initialEmail);
  }, [initialEmail]);

  // Add this useEffect after the other useEffects, around line 75
  useEffect(() => {
    // Dispatch custom event when modal opens/closes
    if (isOpen) {
      window.dispatchEvent(new CustomEvent('waitlist-modal-opened'));
    } else {
      window.dispatchEvent(new CustomEvent('waitlist-modal-closed'));
    }
  }, [isOpen]);

  const createPaymentLink = async (payload: {
    name?: string;
    email?: string;
    phone: string;
    reference_id?: string;
    amount: number;
  }) => {
    const response = await fetch(`${env.apiUrl}/payments/razorpay/link`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: payload.name || name,
        email: payload.email || email,
        phone: payload.phone,
        reference_id: payload.reference_id || `waitlist_${Date.now()}`,
        amount: payload.amount,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data?.error || "Unable to start payment.");
    }

    const shortUrl = data?.short_url || data?.shortUrl;
    if (!shortUrl) {
      throw new Error("Payment link was not returned.");
    }

    return shortUrl as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const fullPhone = `${countryCode}${phone}`;
    try {
      const response = await fetch(`${env.apiUrl}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: fullPhone,
          email,
          source,
          attribution: getAttributionForApi(),
        }),
      });

      const waitlistData = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(waitlistData?.error || "Unable to join the waitlist.");
      }

      onSubmit?.({
        name,
        phone: fullPhone,
        email,
      });

      const shouldStartPayment = true;
      posthog.capture("waitlist_submitted", {
        source,
        payment_started: shouldStartPayment,
      });
      pushToDataLayer({
        event: "waitlist_submitted",
        source,
        payment_started: shouldStartPayment,
      });

      if (shouldStartPayment) {
        const shortUrl = await createPaymentLink({
          name,
          email,
          phone: fullPhone,
          reference_id: waitlistData?.reference_id,
          amount: 399900,
        });
        posthog.capture("payment_redirected", {
          source,
          amount: 399900,
        });
        pushToDataLayer({
          event: "payment_redirected",
          source,
          amount: 399900,
        });
        window.location.href = shortUrl;
        return;
      }

      setStatus("success");
      setMessage("");
      setName("");
      setPhone("");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
      posthog.capture("waitlist_submit_failed", {
        source,
        error: error instanceof Error ? error.message : "unknown_error",
      });
      pushToDataLayer({
        event: "waitlist_submit_failed",
        source,
        error: error instanceof Error ? error.message : "unknown_error",
      });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm"
        onClick={handleBackdropClick}
        aria-label="Close waitlist"
      />

      <div
        role="dialog"
        aria-modal="true"
        data-waitlist-modal
        className="relative z-10 w-full border border-white max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl shadow-4xl pointer-events-auto bg-[#F5F5F5]"
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose("x_button");
          }}
          className="absolute right-6 top-6 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pointer-events-auto"
          aria-label="Close waitlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 6l-12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          <div className="px-0 py-0">
            {/* Header Icon & Title */}
            <div className="text-center mb-10 px-8 pt-8 md:mb-6 md:pt-5">
              <div className="relative inline-flex items-center justify-center w-16 h-16 bg-[#2F5BFF] rounded-2xl mb-6 md:mb-4 z-10">
                <Image
                  src={certificate}
                  width={34}
                  height={34}
                  alt="certificate"
                  className="relative z-20 object-contain"
                />
              </div>

              <h2 className="text-3xl lg:text-[40px] font-jakarta font-bold text-[#0B64F4]">
                Be More Promotable
              </h2>
            </div>

            {/* Promise & Commitment Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 md:mb-6 px-8">
              {/* Our Promise Card */}
              <div className="bg-[#EFEFEF] rounded-[20px] p-6 shadow-sm">
                <h3 className="text-2xl lg:text-[28px] font-jakarta font-bold text-[#0E2E64] mb-4">Our promise:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <IoIosArrowDroprightCircle className="text-[#A8A8A8] w-6 h-6" />
                    <p className="text-[14px] font-jakarta text-[#424242] font-medium">
                      Become <span className="text-[#0B64F4] font-jakarta font-bold italic">more promotable</span>, or your money back
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <IoIosArrowDroprightCircle className="text-[#A8A8A8] w-6 h-6" />
                    <p className="text-[14px] font-medium font-jakarta text-[#424242]">
                      Accountability partner <span className="text-[#0B64F4] font-jakarta font-bold italic">will stay in touch</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <IoIosArrowDroprightCircle className="text-[#A8A8A8] w-6 h-6" />
                    <p className="text-[14px] font-medium font-jakarta text-[#424242]">
                      Access to the program and all modules including the plan{" "}
                      <span className="text-[#0B64F4] font-jakarta font-bold italic">for 6 months</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Your Commitment Card */}
              <div className="bg-[#EFEFEF] rounded-[20px] p-6 shadow-sm">
                <h3 className="text-2xl lg:text-[28px] font-jakarta font-bold text-[#0E2E64] mb-4">Your commitment:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <IoIosArrowDroprightCircle className="text-[#A8A8A8] w-6 h-6" />
                    <p className="text-[14px] font-jakarta text-[#424242] font-medium">
                      You will access the program only on <span className="text-[#0B64F4] font-jakarta font-bold italic">Laptop/PC</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <IoIosArrowDroprightCircle className="text-[#A8A8A8] w-6 h-6" />
                    <p className="text-[14px] font-jakarta text-[#424242] font-medium">
                      <span className="text-[#0B64F4] font-jakarta font-bold italic">Stay in touch&nbsp;</span> with accountability partner
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <IoIosArrowDroprightCircle className="text-[#A8A8A8] w-6 h-6" />
                    <p className="text-[14px] font-jakarta text-[#424242] font-medium">
                      Complete the program and all exercises{" "}
                      <span className="text-[#0B64F4] font-jakarta font-bold italic">in under 2 months</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            {/* <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 md:mb-4 px-8">
              <div className="flex flex-row justify-between gap-4">
                <div className="flex text-center justify-center items-center">
                  <p className="text-lg md:text-lg 2xl:text-[20px] text-[#737373] font-jakarta font-bold">Program price</p>
                </div>
                <div className="bg-[#737373] text-white px-8 py-3 rounded-[10px]">
                  <span className="text-3xl font-bold line-through">₹19,999/-</span>
                </div>
              </div>
              <div className="flex flex-row justify-between gap-4 lg:translate-x-[-70px] 2xl:translate-x-[-55px]">
                <div className="flex text-center justify-center items-center">
                  <p className="text-lg md:text-lg 2xl:text-[20px] text-[#000000CC] font-jakarta font-bold">Early bird offer for you</p>
                </div>
                <div className="bg-black text-white px-8 py-3 rounded-[10px]">
                  <span className="text-3xl font-bold">₹3,999/-</span>
                </div>
              </div>
            </div> */}
        {/* Pricing Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 mb-8 md:mb-4 px-4 md:px-8">

            <div className="flex flex-row justify-between gap-3 md:gap-4 w-full md:w-auto">
              
              <div className="flex items-center">
                <p className="text-sm md:text-lg 2xl:text-[20px] text-[#737373] font-jakarta font-bold">
                  Program price
                </p>
              </div>

              <div className="bg-[#737373] text-white px-4 md:px-8 py-2 md:py-3 rounded-[10px]">
                <span className="text-xl md:text-3xl font-bold line-through">
                  ₹19,999/-
                </span>
              </div>

            </div>

            <div className="flex flex-row justify-between gap-3 md:gap-4 w-full md:w-auto lg:translate-x-[-70px] 2xl:translate-x-[-55px]">
              
              <div className="flex items-center">
                <p className="text-sm md:text-lg 2xl:text-[20px] text-[#000000CC] font-jakarta font-bold">
                  Early bird offer for you
                </p>
              </div>

              <div className="bg-black text-white px-4 md:px-8 py-2 md:py-3 rounded-[10px]">
                <span className="text-xl md:text-3xl font-bold">
                  ₹3,999/-
                </span>
              </div>

            </div>

          </div>

            {/* Form Section */}
            <div className="bg-black rounded-b-[15px] py-10 md:py-7 max-w-full shadow-[0_0_60px_rgba(0,0,0,0.5)]">
              <h3 className="text-center text-white text-lg md:text-xl 2xl:text-[21px] font-bold font-jakarta mb-8">
                Sign up only if you&apos;re willing to put in the work.{" "}
                <span className="italic font-bold font-jakarta">We guarantee it&apos;ll be worth it!</span>
              </h3>

              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 rounded-[10px] h-[48px] bg-white px-6 py-4 text-gray-900 placeholder:text-[#C1C1C1] font-medium font-jakarta text-[16px] focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                    required
                  />
                  
                  {/* Phone Number with Country Code Dropdown */}
                  <div className="flex-1 flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="rounded-[10px] h-[48px] bg-white px-3 text-gray-900 font-medium font-jakarta text-[16px] focus:outline-none focus:ring-2 focus:ring-gray-500 transition cursor-pointer"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      className="flex-1 rounded-[10px] h-[48px] max-w-[195px] md:max-w-full bg-white px-6 py-4 text-gray-900 placeholder:text-[#C1C1C1] font-medium font-jakarta text-[16px] focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                      pattern="[0-9]{7,15}"
                      title="Enter 7-15 digits"
                      required
                    />
                  </div>
                </div>

                {/* <div className="mb-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-[10px] h-[48px] bg-white px-6 py-4 text-gray-900 placeholder:text-[#C1C1C1] font-medium font-jakarta text-[16px] focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                    required
                  />
                </div> */}

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-[#0C57D1] to-[#3C83F6] text-white px-12 py-4 rounded-[10px] text-lg lg:text-[20px] font-bold font-jakarta shadow-[0_0_25px_rgba(11,100,244,0.6)] hover:from-[#0952cc] hover:to-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Processing..." : "I'll Invest in My Career"}
                  </button>
                </div>

                {message && (
                  <p
                    className="mt-4 text-center text-sm text-red-300"
                    role="status"
                    aria-live="polite"
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWaitlist;
