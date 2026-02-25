"use client";

import React from "react";

const WhoIsThisFor = () => {
  return (
    <section className="bg-white py-5 md:py-12 px-5">
      <div className="max-w-[1200px] mx-auto">

        {/* Heading */}
        <h2 className="text-center font-quattrocento font-bold 
                       text-[18px] md:text-[36px] lg:text-[48px] 
                       text-[#1D1D1D] mb-3 md:mb-10">
          <span className="text-[#014BAA]">Who</span> Is This For
        </h2>

        {/* Grid - Always 2 Columns */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:gap-10 mb-6 md:mb-20">

          {/* Card 1 */}
          <div className="bg-white rounded-[6px] 
                          px-5 py-4 md:px-10 md:py-12
                          text-center 
                          text-[10px] md:text-[20px] lg:text-[24px]
                          leading-4 md:leading-snug
                          font-inter
                          shadow-[0_15px_35px_rgba(0,0,0,0.06)]" style={{
                            fontWeight: 300,
                          }}>
            You have <span className="text-[#014BAA] font-inter font-bold">10+ years</span> of experience and
            strong performance reviews, but stagnant growth
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[6px] 
                          px-5 py-4 md:px-10 md:py-12
                          text-center 
                          text-[10px] md:text-[20px] lg:text-[24px]
                          leading-4 md:leading-snug
                          font-inter
                          shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
            You are trusted to deliver, but{" "}
            <span className="text-[#014BAA] font-inter font-bold">
              not chosen to lead
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[6px] 
                          px-5 py-8 md:px-10 md:py-12
                          text-center 
                          text-[10px] md:text-[20px] lg:text-[24px]
                          leading-4 md:leading-snug
                          font-inter
                          shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
            You are tired of vague feedback like{" "}
            <span className="text-[#014BAA] font-inter font-bold">
              “be more visible”
            </span>{" "}
            or{" "}
            <span className="text-[#014BAA] font-inter font-bold">
              “think bigger”
            </span>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-[6px] 
                          px-5 py-8 md:px-10 md:py-12
                          text-center 
                          text-[10px] md:text-[20px] lg:text-[24px]
                          leading-4 md:leading-snug
                          font-inter
                          shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
            You don’t want another generic leadership course, you want{" "}
            <span className="text-[#014BAA] font-semibold">
              career leverage
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center max-w-[900px] mx-auto">
          <h3 className="font-inter font-extrabold 
                         text-[10px] md:text-[28px] lg:text-[32px] 
                         mb-1 md:mb-3">
            But...
          </h3>

          <p className="font-inter font-light px-6 
                        text-[10px] md:text-[20px] lg:text-[22px] 
                        leading-relaxed text-black">
            If you’re looking for quick hacks and you believe promotions are
            purely political and out of your control, then this may not be the
            strategy for you.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhoIsThisFor;