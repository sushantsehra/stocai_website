"use client";

import React from "react";

const StickyCTA = () => {
  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed -bottom-1 left-0 w-full z-[9999] bg-[#1B294B] text-white">
      <div className="max-w-7xl mx-auto py-4 flex items-center justify-center gap-3">
        {/* CTA Button */}
        <button
          onClick={scrollToWaitlist}
          className="bg-[#0B64F4] hover:bg-blue-700 text-white text-sm sm:text-base px-4 sm:px-6 py-2 rounded-[12px] font-jakarta cursor-pointer font-bold transition-all shrink-0"
        >
          Get Early Access
        </button>
      </div>
    </div>
  );
};

export default StickyCTA;