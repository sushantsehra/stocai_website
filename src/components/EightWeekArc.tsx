"use client";

import React from "react";

const modules = [
  { id: 1, title: "Fundamentals of Being Promotable" },
  { id: 2, title: "Claim What You Value" },
  { id: 3, title: "Gaining Visibility and Influence" },
  { id: 4, title: "Navigate With Confidence" },
  { id: 5, title: "Leverage - Impact Without Burnout" },
  { id: 6, title: "Personal Brand-Building Advocates" },
  { id: 7, title: "Psychology Of Promotion" },
  { id: 8, title: "My Action Plan" },
];

const EightWeekArc = () => {
  return (
    <section className="bg-white py-2 md:py-10 px-4">
      <div className="max-w-[1100px] mx-auto">

        {/* Heading */}
        <h2 className="text-center font-quattrocento font-bold 
                       text-[18px] md:text-[32px] lg:text-[40px] 
                       text-black mb-0 md:mb-2">
          The 8-week Arc
        </h2>

        {/* Subtitle */}
        <p className="text-center font-inter font-medium 
                      text-[14px] md:text-[20px] lg:text-[24px] 
                      text-black mb-4 md:mb-8">
          (With actionable outcomes every week)
        </p>

        {/* Grid*/}
        <div className="grid grid-cols-2 gap-4 md:gap-6">

          {modules.map((module) => (
            <div
              key={module.id}
              className="
                relative
                bg-[#4D4D4D]
                rounded-[11px]
                px-4 py-6 md:px-6 md:py-8
                text-white
                min-h-[100px] md:min-h-[150px]
                flex flex-col justify-center
                shadow-[0_10px_25px_rgba(0,0,0,0.08)]
              "
            >
              {/* Module Label */}
              <p className="
                text-[12px] md:text-[16px]
                opacity-100 font-normal font-inter
                mb-2 md:mb-2
              ">
                Module {module.id}
              </p>

              {/* Title */}
              <h3 className="
                font-quattrocento font-bold
                text-[12px] md:text-[22px] lg:text-[26px]
                leading-4 md:leading-snug
              ">
                {module.title}
              </h3>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default EightWeekArc;