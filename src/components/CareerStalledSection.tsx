"use client";

import Image from "next/image";
import React from "react";
import aspero from "../assets/aspero.png"
import waveBg from "../assets/waveBg.jpg";

const CareerStalledSection: React.FC = () => {
  return (
    <section className="bg-white py-20 px-4 text-center relative overflow-hidden">
      {/* Background watermark text */}
      <div className="absolute inset-0 opacity-100 pointer-events-none">
        <div className="absolute top-[32%] left-[5%] text-4xl sm:text-5xl md:text-6xl lg:text-[48px] font-bold text-[#F1F1F1]">
          Bell Curve
        </div>
        <div className="absolute top-[35%] right-[50%] text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-[#F1F1F1]">
          360 Degree<br />Feedback
        </div>
        <div className="absolute bottom-[60%] right-[5%] text-4xl sm:text-5xl md:text-6xl lg:text-[48px] font-bold text-[#F1F1F1]">
          MBO
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
          <span className="text-[#0B64F4] text-[36px] md:text-[40px] lg:text-[48px] font-bold">You show up. You deliver.</span>
        </h2>
        <h3 className="text-[36px] md:text-[40px] lg:text-[48px] font-bold text-[#0F1729] mb-1">
          People trust you to get things done.
        </h3>
        <p className="text-[#6B7280] mb-16 text-base sm:text-lg lg:text-[26px] font-semibold">
          So why does it feel like your career has... stalled?
        </p>

        {/* Shredder Visual Section */}
        <div className="relative max-w-full mx-auto px-4 sm:px-8 lg:px-0">
          {/* Wave Background */}
          <div className="absolute inset-0 top-[25%] -mx-4 sm:-mx-8 lg:mx-0 overflow-hidden rounded-2xl">
            <Image 
              src={waveBg} 
              alt="Wave Background" 
              className="w-full h-full object-cover opacity-90"
              priority
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-2 py-12 lg:py-2 max-h-[800px]">
            {/* Text Content */}
            <div className="flex flex-col space-y-6 lg:w-[40%] text-left">
              <p className="font-semibold text-xl sm:text-2xl text-[#6B7280]">
                Your manager says you're "doing great."<br />
                Then someone else gets the promotion.
              </p>
              
              <p className="font-normal text-xl sm:text-2xl lg:text-[30px] text-[#6B7280]">
                You're dependable, <span className="text-[#0B64F4] font-semibold">but invisible</span>.<br />
                Valued, <span className="text-[#0B64F4] font-semibold">but not chosen</span>.
              </p>
            </div>

            {/* Image */}
            <div className="lg:w-[60%] flex justify-center lg:justify-end ">
              <div className="relative w-full max-w-[700px] lg:max-w-[900px] relative">
              <p className="absolute top-[16%] left-[30%] rotate-4 text-[#6B7280] text-lg md:text-[22px] font-medium">You hear things like:</p>

                <Image
                  src={aspero}
                  alt="Shredder Visual"
                  width={800}
                  height={700}
                  className="object-contain w-full h-[800px]"
                  priority
                />
              </div>
            </div>
          </div>

        {/* Description Text */}
        <div className="absolute bottom-[3.5%] left-[15%] max-w-5xl mx-auto text-center text-base sm:text-lg lg:text-[24px] font-semibold text-[#6B7280]">
          <div className="pt-4">
            <p className="font-bold text-[#0F1729] text-lg sm:text-xl lg:text-[32px]">
              But no one tells you what to actually do differently.
            </p>
            <p className="font-bold text-[#0F1729] text-lg sm:text-xl lg:text-[32px]">
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