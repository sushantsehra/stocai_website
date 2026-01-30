"use client";

import React from "react";
import { IoCheckbox } from "react-icons/io5";

const WaitlistSection = () => {

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
        <h2 className="text-[20px] sm:text-4xl md:text-[48px] text-white font-jakarta font-bold mb-3.5 lg:mb-4.5">Ready to change your career trajectory?</h2>

        {/* Description */}
        <div className="flex items-center justify-center">
        <p className="lg:text-[20px] mb-6 md:mb-12 lg:mb-14 text-sm sm:text-base font-medium leading-4.5 md:leading-6 text-white/60 font-jakarta lg:max-w-3xl text-center">
         After years of doing this privately and helping hundreds become promotable, we’re scaling to our first paid launch.
        </p>
        </div>


        {/* Description */}
        <p className="lg:text-[22px] mb-5 md:mb-6 text-sm sm:text-base leading-4.5 font-jakarta font-medium">
          Benefit from our early-bird offer, only available for a short time, for this special launch.
        </p>

        <div className="flex justify-center">
        {/* Email Input & Button */}
        <div className="flex lex-row px-4 md:px-0 items-center justify-center min-w-sm md:min-w-lg lg:min-w-3xl bg-[#F5F5F5] rounded-[20px] h-[43.49372482299805px] md:h-[90px] shadow-lg overflow-hidden mb-0 md:mb-2">
          <input
            id="waitlist-email"
            type="email"
            placeholder="Enter email address"
            className="w-full sm:w-[65%] px-4 py-3 text-[#C8C8C8] font-medium outline-none text-sm sm:text-base lg:text-[20px]"
            required
          />
          <button
            data-waitlist-cta
            data-waitlist-email-input="waitlist-email"
            data-waitlist-source="waitlist_section"
            className="w-full ml-4 sm:ml-0 sm:w-[30%] bg-gradient-to-r from-[#024BAB] to-[#3C83F6] hover:bg-blue-700 rounded-[10px] md:rounded-[12px] text-white lg:text-[20px] lg:min-h-[72px] font-semibold py-1 md:py-3 transition-all"
          >
            Request Access
          </button>
        </div>
        </div>

        {/* Bottom Row */}
        {/* <div className="flex flex-col sm:flex-row items-center justify-start absolute left-[17%] lg:left-[25%] gap-4 lg:gap-20"> */}
          <div className="flex items-center justify-center mt-3 md:mt-4">
          {/* <div className="flex items-center justify-center w-full lg:translate-x-[90%] 2xl:translate-x-[130%]"> */}
          <div className="flex items-center justify-center">
            <p className="text-sm sm:text-base lg:text-[20px] font-medium">
              <IoCheckbox className="inline-block w-5 h-5 lg:w-6.5 lg:h-6.5 text-[#87beff] mr-2 mb-1" />
              Opt in to receive updates
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
