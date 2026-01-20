"use client";

import React from "react";

const PromotionBanner = () => {
  return (
    <div className="w-full bg-[#0B1E47] text-white text-sm sm:text-base py-2 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee">
        <span className="mx-6 lg:mx-12">
          🎯 Limited Seats Available • Early Bird: ₹24,999 (Save ₹10,000) • Cohort
          Starts January 2024
        </span>
        <span className="mx-6 lg:mx-12">
          🎯 Limited Seats Available • Early Bird: ₹24,999 (Save ₹10,000) • Cohort
          Starts January 2024
        </span>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 18s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default PromotionBanner;