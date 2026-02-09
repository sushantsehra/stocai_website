"use client";

import React, { useState } from "react";

const PreviewWaitlistSection = () => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default India

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

  // Handle navigation to signin/login
  const handleRequestAccess = () => {
    if (phone.trim()) {
      const fullPhone = `${countryCode}${phone}`;
      
      // Store mobile number in localStorage
      localStorage.setItem('userMobile', fullPhone);
      localStorage.setItem('userCountryCode', countryCode);
      localStorage.setItem('userPhone', phone);
      
      // Redirect to signin/login page
      window.location.href = "https://os.bettercorporatelife.com/signUp?redirect=%2F";
    }
  };

  return (
    <section id="waitlist" className="bg-gradient-to-b from-[#0F182C] to-[#0B63F0] text-white py-12 lg:py-15 px-4 text-center mt-6">
      <div className="inline-flex items-center justify-center
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
          {/* main sparkle */}
          <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />

          {/* top-right small sparkle — moved farther */}
          <g transform="translate(2,-2)">
            <path d="M18 5 V8 M16.5 6.5 H19.5" />
          </g>

          {/* bottom-left small sparkle — moved farther */}
          <g transform="translate(-2,2)">
            <path d="M6 16 V18 M5 17 H7" />
          </g>
        </svg>
      </div>
      <div className="max-w-full mx-auto">
        {/* Title */}
        <h2 className="text-[20px] sm:text-4xl md:text-[48px] text-white font-jakarta font-bold mb-3.5 lg:mb-4.5">
          Ready to change your career trajectory?
        </h2>

        {/* Description */}
        <div className="flex items-center justify-center">
          <p className="lg:text-[20px] mb-6 md:mb-12 lg:mb-14 text-sm sm:text-base font-medium leading-4.5 md:leading-6 text-white/60 font-jakarta lg:max-w-3xl text-center">
            After years of doing this privately and helping hundreds become promotable, we&apos;re scaling to our first paid launch.
          </p>
        </div>

        {/* Description */}
        <p className="lg:text-[22px] mb-5 md:mb-6 text-sm sm:text-base leading-4.5 font-jakarta font-medium">
          Benefit from our early-bird offer, only available for a short time, for this special launch.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row justify-center items-center">
          {/* Mobile Number Input & Button */}
          <div className="flex flex-row px-2 md:px-4 items-center justify-center min-w-sm md:min-w-lg lg:min-w-3xl lg:max-w-3xl bg-[#F5F5F5] rounded-[20px] h-auto md:h-[90px] shadow-lg overflow-hidden mb-0 md:mb-2 py-2 md:py-0 gap-2">
            {/* Country Code Dropdown */}
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="rounded-[10px] bg-white px-2 md:px-3 py-2 md:py-3 text-gray-900 font-medium font-jakarta text-sm md:text-base lg:text-[18px] focus:outline-none focus:ring-2 focus:ring-gray-500 transition cursor-pointer"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>

            {/* Phone Number Input */}
            <input
              id="waitlist-mobile"
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              className="flex-1 px-3 md:px-4 py-2 md:py-3 text-black font-medium outline-none text-sm sm:text-base lg:text-[20px] bg-transparent"
              pattern="[0-9]{7,15}"
              title="Enter 7-15 digits"
              required
            />

            {/* Desktop Request Access Button */}
            <button
              onClick={handleRequestAccess}
              className="hidden sm:block bg-gradient-to-r from-[#024BAB] to-[#3C83F6] hover:bg-blue-700 rounded-[10px] md:rounded-[12px] text-white text-base lg:text-[20px] lg:min-h-[72px] font-bold cursor-pointer px-4 md:px-6 py-2 md:py-3 mr-2 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Request Access
            </button>
          </div>

          {/* Mobile Request Access Button */}
          <button
            onClick={handleRequestAccess}
            className="block sm:hidden w-[60%] ml-4 bg-gradient-to-r from-[#ADADAD] to-[#FFFFFF] hover:bg-blue-700 rounded-[9.36px] md:rounded-[12px] text-[18.71px] text-black lg:text-[20px] min-h-[49.900848388671875px] cursor-pointer font-bold font-jakarta p-3.5 md:py-3 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          >
            Request Access
          </button>
        </div>
      </div>
    </section>
  );
};

export default PreviewWaitlistSection;