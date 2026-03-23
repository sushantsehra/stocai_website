"use client";

import React from "react";

const WhoIsThisFor = () => {
  return (
    <section className="bg-white pt-0 pb-5 md:pt-2 md:pb-12 px-2 md:px-5 md:mt-6">
      <div className="max-w-[1200px] mx-auto">

        {/* Heading */}
        <h2 className="text-center font-quattrocento font-bold 
                       text-[20px] md:text-[36px] lg:text-[48px] 
                       text-[#1D1D1D] mb-3 md:mb-10">
          <span className="text-[#014BAA]">Who</span> Is This For
        </h2>

        {/* Grid - Always 2 Columns */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:gap-5 mb-4 md:mb-10">

          {/* Card 1 */}
          <div className="bg-white rounded-[6px] 
                          px-5 py-4 md:px-10 md:py-12
                          text-center 
                          text-[14px] md:text-[20px] lg:text-[24px]
                          leading-4 md:leading-snug
                          font-inter
                          shadow-[0_15px_35px_rgba(0,0,0,0.06)]" style={{
                            fontWeight: 300,
                          }}>
            Have <span className="text-[#014BAA] font-inter font-bold">8+ </span> <span className="font-semibold font-inter">years of experience</span>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[6px] 
                          px-7 py-4 md:px-10 md:py-12
                          text-center 
                          text-[14px] md:text-[20px] lg:text-[24px]
                          leading-4 md:leading-snug
                          font-inter
                          shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
            Deliver{" "}
            <span className="text-[#014BAA] font-inter font-bold">
              strong{" "}
            </span>
            <span className="font-semibold">results</span>
          </div>

          {/* Card 4 */}
          {/* <div className="bg-white rounded-[6px] 
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
          </div> */}
        </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[6px] 
                          px-2 py-5 md:px-10 md:py-12
                          text-center 
                          text-[14px] md:text-[20px] lg:text-[24px]
                          leading-5 md:leading-snug
                          font-inter
                          shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex gap-4">

                            <div className="w-1/2 px-4 mt-2 md:mt-8">
            {/* You are tired of vague feedback like{" "} */}
            Keep hearing  {" "}
            <span className="text-[#000000] font-inter font-semibold">
              vague feedback
            </span>{" "}
            {/* or{" "} */}
            <span className="text-[#000000] font-inter font-normal">
              {/* “think bigger” */}
              like:
            </span>
          </div>

            <div className="flex flex-col w-1/2 text-start gap-1">
              <div className="text-[#014BAA] text-[12px] md:text-xl font-inter font-bold">
                “be more visible”
              </div>
            <div className="text-[#014BAA] text-[12px] md:text-xl font-inter font-bold">
              “think bigger”
            </div>{" "}
            <div className="text-[#014BAA] text-[12px] md:text-xl font-inter font-bold">
           “show more leadership”
            </div>
          </div>

          </div>

        {/* Bottom Section */}
        <div className="text-center max-w-[900px] mx-auto">
          {/* <h3 className="font-inter font-extrabold 
                         text-[10px] md:text-[28px] lg:text-[32px] 
                         mb-1 md:mb-3">
            But...
          </h3> */}
{/* 
          <p className="font-inter font-light px-6 
                        text-[10px] md:text-[20px] lg:text-[24px] 
                        leading-relaxed text-black mt-4 md:mt-12">
            You know you are capable of more.
            <br />
            You just need the playbook.
          </p> */}
        </div>

      </div>
    </section>
  );
};

export default WhoIsThisFor;