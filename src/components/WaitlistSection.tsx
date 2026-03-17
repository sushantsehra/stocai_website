"use client";

import React, { useState } from "react";

type WaitlistSectionProps = {
  onRequestAccess?: (data: {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    fullPhone: string;
    source: string;
  }) => Promise<void>;
};

const WaitlistSection: React.FC<WaitlistSectionProps> = ({ onRequestAccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isLoading, setIsLoading] = useState(false);

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
        source: "waitlist_section",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="bg-gradient-to-b from-[#0F182C] to-[#0B63F0] text-white py-8 lg:py-15 px-4 text-center mt-6"
    >
      {/* Icon */}
      {/* <div className="inline-flex items-center justify-center w-12 h-12 md:w-[64px] md:h-[64px] bg-[#3B6FF5] rounded-[12px] md:rounded-[20px] mb-6 lg:mb-12">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
          <g transform="translate(2,-2)"><path d="M18 5 V8 M16.5 6.5 H19.5" /></g>
          <g transform="translate(-2,2)"><path d="M6 16 V18 M5 17 H7" /></g>
        </svg>
      </div> */}

      <div className="max-w-full">

          <h3 className="text-[12px] sm:text-[30px] text-white font-quattrocento font-bold mb-3 lg:mb-4.5">
          If you keep doing great work silently, nothing changes.
          <br />
          If you learn how promotions actually work, everything changes.
        </h3>


        <h2 className="text-[18px] sm:text-4xl md:text-[48px] text-white font-quattrocento font-bold mb-3.5 lg:mb-4.5">
          Ready to change your career trajectory?
        </h2>

        <div className="flex items-center justify-center">
          <p className="lg:text-[20px] mb-1  md:mb-12 lg:mb-14 text-[10px] sm:text-base font-inter font-medium leading-3.5 md:leading-6 text-white/60 lg:max-w-3xl text-center">
            After years of doing this privately and helping hundreds become promotable,
            we&apos;re scaling to our first paid launch.
          </p>
        </div>

        <p className="lg:text-[22px] mb-5 md:mb-6 text-[8px] sm:text-base leading-4.5 font-jakarta font-medium">
          Benefit from our early-bird offer, only available for a short time, for this special launch.
        </p>

        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center max-w-6xl mx-auto">
          {/* Input row */}
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto bg-[#F5F5F5] rounded-[20px] shadow-lg px-3 md:px-4 py-3 md:py-4 gap-2 md:gap-3">

            {/* Name */}
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="w-full sm:w-[140px] md:w-[160px] lg:w-[180px] px-3 py-2.5 md:py-3 rounded-md text-black text-sm md:text-base outline-none bg-white disabled:opacity-50"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full sm:w-[160px] md:w-[180px] lg:w-[200px] px-3 py-2.5 md:py-3 rounded-md text-black text-sm md:text-base outline-none bg-white disabled:opacity-50"
            />

            <div className="flex gap-2 w-full">
            {/* Country code */}
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              disabled={isLoading}
              className="px-2 py-2.5 md:py-3 rounded-md bg-white text-black text-sm md:text-base outline-none disabled:opacity-50"
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
              className="w-full sm:w-[140px] md:w-[160px] lg:w-[180px] px-3 py-2.5 md:py-3 text-black text-sm md:text-base outline-none bg-white rounded-md disabled:opacity-50"
            />
            </div>

            {/* Desktop button */}
            <button
              onClick={handleRequestAccess}
              disabled={isLoading}
              className="hidden sm:block bg-gradient-to-r from-[#024BAB] to-[#3C83F6] hover:bg-blue-700 rounded-[10px] md:rounded-[12px] text-white text-sm md:text-base lg:text-[18px] min-h-[44px] lg:min-h-[48px] font-bold cursor-pointer px-4 md:px-6 py-2 md:py-3 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Request Access"}
            </button>
          </div>

          {/* Mobile button */}
          <button
            onClick={handleRequestAccess}
            disabled={isLoading}
            className="block sm:hidden w-[40%] sm:w-[60%] bg-gradient-to-r from-[#ADADAD] to-[#FFFFFF] rounded-[9.36px] text-[10px] sm:text-[18.71px] text-black min-h-[40px] sm:min-h-[49.9px] cursor-pointer font-bold font-jakarta p-1 sm:p-3.5 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Request Access"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;