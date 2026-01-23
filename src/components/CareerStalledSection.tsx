"use client";

import Image from "next/image";
import React from "react";
import aspero from "../assets/aspero.png";
import waveBg from "../assets/waveBg.jpg";

const CareerStalledSection: React.FC = () => {
  return (
    <section className="bg-white py-10 lg:pt-32 lg:pb-40 text-center relative overflow-hidden">
      {/* ✅ Full-width wave background behind everything */}
      <div className="absolute inset-0 w-full h-[750px] z-0 mt-[42%]">
        <Image
          src={waveBg}
          alt="Wave Background"
          fill
          className="object-cover opacity-100"
          priority
        />
      </div>

      {/* Background watermark text */}
      <div className="absolute inset-0 opacity-100 pointer-events-none z-10">
        <div className="absolute top-[44%] left-[30.5%] md:top-[35%] md:left-[6.5%] text-4xl sm:text-5xl md:text-6xl lg:text-[48px] font-jakarta font-bold text-gray-300">
          Bell Curve
        </div>
        <div className="absolute top-[50%] right-[55%] md:top-[41%] md:right-[51%] text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-jakarta font-bold text-gray-300">
          360 Degree
          <br />
          Feedback
        </div>
        <div className="absolute bottom-[40%] right-[5%] md:bottom-[55%] md:right-[5%] text-4xl sm:text-5xl md:text-6xl lg:text-[48px] font-jakarta font-bold text-gray-300">
          KPI
        </div>
      </div>

      <div className="max-w-full relative z-20">
        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
          <span className="text-[#0B64F4] text-[32px] md:text-[40px] lg:text-[48px] font-jakarta font-bold">
            You show up. You deliver.
          </span>
        </h2>
        <h3 className="text-[32px] md:text-[40px] lg:text-[48px] leading-10 font-bold text-[#0F1729] font-jakarta mb-1 mt-1.5">
          People trust you to get things done.
        </h3>
        <p className="text-[#6B7280] leading-5 mb-10 mt-8 text-base sm:text-lg lg:text-[26px] font-jakarta font-semibold">
          So why does it feel like your career has... stalled?
        </p>

        {/* Shredder Visual Section */}
        <div className="relative max-w-full mx-auto px-4 sm:px-8 lg:px-0">
          {/* Content Container */}
          <div className="relative z-20 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-4 py-12 lg:py-2 max-h-[800px]">
            {/* Text Content */}
            <div className="flex flex-col space-y-4 lg:w-[40%] text-left lg:translate-y-[40%] lg:translate-x-[15%]">
              <p className="font-semibold leading-7 text-xl sm:text-2xl md:text-[24px] font-jakarta text-[#6B7280]">
                Your manager says you&apos;re &quot;doing great.&quot;
                <br />
                Then someone else gets the promotion.
              </p>

              <p className="font-normal leading-7 font-jakarta text-xl sm:text-2xl lg:text-[30px] text-[#6B7280] md:mt-[4%]">
                You&apos;re dependable,{" "}
                <span className="text-[#0B64F4] font-semibold font-jakarta">
                  but invisible
                </span>
                .<br />
                Valued,{" "}
                <span className="text-[#0B64F4] font-semibold font-jakarta">
                  but not chosen
                </span>
                .
              </p>
            </div>

            {/* Image */}
            <div className="lg:w-[60%] flex justify-center lg:justify-end lg:translate-x-[5%]">
              <div className="relative w-full max-w-[700px] lg:max-w-[900px]">
                <p className="absolute top-[29%] md:top-[18%] left-[26%] md:left-[30%] rotate-4 text-[#6B7280] text-sm md:text-[24px] font-jakarta font-medium">
                  You hear things like:
                </p>
                <Image
                  src={aspero}
                  alt="Shredder Visual"
                  width={1000}
                  height={1050}
                  className="object-contain w-full h-[800px]  md:h-[1100px]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Description Text */}
          <div className="md:absolute  md:bottom-[-8.5%] md:left-[23.5%] max-w-5xl mx-auto text-center text-base sm:text-lg lg:text-[24px] font-semibold text-[#6B7280] z-20">
            <div className="pt-4 lg:pt-1">
              <p className="font-bold text-[#0F1729] leading-7 text-lg sm:text-xl font-jakarta lg:text-[32px]">
                But no one tells you what to actually do differently.
              </p>
              <p className="font-bold text-[#0F1729] text-lg sm:text-xl font-jakarta lg:text-[32px]">
                And you wonder...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerStalledSection;