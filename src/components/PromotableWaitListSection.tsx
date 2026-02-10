"use client";

import React, { useState } from "react";

// ✅ Define prop types
type PromotableWaitListSectionProps = {
  onRequestAccess?: (data: {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    fullPhone: string;
    source: string;
  }) => void;
};

const PromotableWaitListSection: React.FC<PromotableWaitListSectionProps> = ({
  onRequestAccess,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

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

  const handleRequestAccess = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const fullPhone = `${countryCode}${phone}`;

    if (onRequestAccess) {
      onRequestAccess({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        countryCode,
        fullPhone,
        source: "waitlist_section",
      });
    }
  };

  return (
    <section
      id="waitlist"
      className="bg-gradient-to-b from-[#0F182C] to-[#0B63F0] text-white py-12 lg:py-15 px-4 text-center mt-6"
    >
      <div
        className="inline-flex items-center justify-center
        w-12 h-12 md:w-[64px] md:h-[64px]
        bg-[#3B6FF5]
        rounded-[12px] md:rounded-[20px]
        mb-6 lg:mb-12"
      >
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

      <div className="max-w-full mx-auto">
        <h2 className="text-[20px] sm:text-4xl md:text-[48px] text-white font-jakarta font-bold mb-3.5 lg:mb-4.5">
          Ready to change your career trajectory?
        </h2>

        <div className="flex items-center justify-center">
          <p className="lg:text-[20px] mb-6 md:mb-12 lg:mb-14 text-sm sm:text-base font-medium leading-4.5 md:leading-6 text-white/60 font-jakarta lg:max-w-3xl text-center">
            After years of doing this privately and helping hundreds become
            promotable, we&apos;re scaling to our first paid launch.
          </p>
        </div>

        <p className="lg:text-[22px] mb-5 md:mb-6 text-sm sm:text-base leading-4.5 font-jakarta font-medium">
          Benefit from our early-bird offer, only available for a short time,
          for this special launch.
        </p>

        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center max-w-6xl mx-auto">
          {/* Input Fields Container */}
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto bg-[#F5F5F5] rounded-[20px] shadow-lg px-3 md:px-4 py-3 md:py-4 gap-2 md:gap-3">
            {/* Name Input */}
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full sm:w-[140px] md:w-[160px] lg:w-[180px] px-3 py-2.5 md:py-3 rounded-md text-black text-sm md:text-base outline-none bg-white"
              required
            />

            {/* Email Input */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-[160px] md:w-[180px] lg:w-[200px] px-3 py-2.5 md:py-3 rounded-md text-black text-sm md:text-base outline-none bg-white"
              required
            />

            {/* Country Code Dropdown */}
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="px-2 py-2.5 md:py-3 rounded-md bg-white text-black text-sm md:text-base outline-none"
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
              className="w-full sm:w-[140px] md:w-[160px] lg:w-[180px] px-3 py-2.5 md:py-3 text-black text-sm md:text-base outline-none bg-white rounded-md"
              required
            />

            {/* Desktop Request Access Button */}
            <button
              onClick={handleRequestAccess}
              className="hidden sm:block bg-gradient-to-r from-[#024BAB] to-[#3C83F6] hover:bg-blue-700 rounded-[10px] md:rounded-[12px] text-white text-sm md:text-base lg:text-[18px] min-h-[44px] lg:min-h-[48px] font-bold cursor-pointer px-4 md:px-6 py-2 md:py-3 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Request Access
            </button>
          </div>

          {/* Mobile Request Access Button */}
          <button
            onClick={handleRequestAccess}
            className="block sm:hidden w-[60%] bg-gradient-to-r from-[#ADADAD] to-[#FFFFFF] hover:bg-blue-700 rounded-[9.36px] text-[18.71px] text-black min-h-[49.9px] cursor-pointer font-bold font-jakarta p-3.5 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Request Access
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromotableWaitListSection;