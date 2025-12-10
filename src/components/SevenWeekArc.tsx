"use client";
import React from "react";

const WEEK_ITEMS = [
  {
    id: 1,
    title: "Fundamentals of being promotable →",
    outcome: "Rewire non-promotable habits",
  },
  {
    id: 2,
    title: "Internal alignment for next level →",
    outcome: "Claim what you value",
  },
  {
    id: 3,
    title: "Gaining Visibility and Influence →",
    outcome: "Navigate with confidence in corporate structure",
  },
  {
    id: 4,
    title: "Executive Presence and Communication →",
    outcome: "Signal leadership readiness",
  },
  {
    id: 5,
    title: "Your Personal Brand →",
    outcome: "Build Advocates",
  },
  {
    id: 6,
    title: "Building Leverage →",
    outcome: "Multiply the impact without compromising work-life balance",
  },
  {
    id: 7,
    title: "Your Pitch and Promotion Blueprint →",
    outcome: "Personalized plan and unrefusable pitch",
  },
];

const SevenWeekArc = () => {
  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2 className="text-[#014BAA] font-gotham font-bold text-3xl lg:text-[42px]">
          The 7-week arc.
        </h2>

        <p className="text-[#1D1D1D] font-gotham font-normal text-xl sm:text-2xl lg:text-[42px]">
          Actionable outcomes every week
        </p>

        {/* List */}
        <div className="mt-10 divide-y divide-gray-200">
          {WEEK_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-6"
            >
              {/* Left text */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-[#1D1D1D]">
                <span className="text-base sm:text-lg lg:text-[17px] font-gotham">
                  {item.title}
                </span>
                <span className="text-base sm:text-lg lg:text-[17px] font-gotham font-bold text-[#1D1D1D]">
                  {item.outcome}
                </span>
              </div>

              {/* + Icon */}
              <button className="text-[#014BAA] hover:opacity-80 transition">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#014BAA"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SevenWeekArc;