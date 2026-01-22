"use client";

import Image from "next/image";
import React from "react";
import aspero from "../assets/aspero.png"
import waveBg from "../assets/waveBg.jpg";

const CareerStalledSection: React.FC = () => {
  return (
    <section className="bg-white py-10 lg:pt-20 lg:pb-6 text-center relative overflow-hidden">
      {/* Background watermark text */}
      <div className="absolute inset-0 opacity-100 pointer-events-none">
        <div className="absolute top-[35%] left-[6.5%] text-4xl sm:text-5xl md:text-6xl lg:text-[48px] font-bold text-[#F1F1F1]">
          Bell Curve
        </div>
        <div className="absolute top-[41%] right-[51%] text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-[#F1F1F1]">
          360 Degree<br />Feedback
        </div>
        <div className="absolute bottom-[55%] right-[5%] text-4xl sm:text-5xl md:text-6xl lg:text-[48px] font-bold text-[#F1F1F1]">
          MBO
        </div>
      </div>

      <div className="max-w-full relative z-10">
        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
          <span className="text-[#0B64F4] text-[36px] md:text-[40px] lg:text-[48px] font-jakarta font-bold">You show up. You deliver.</span>
        </h2>
        <h3 className="text-[36px] md:text-[40px] lg:text-[48px] font-bold text-[#0F1729] font-jakarta mb-1">
          People trust you to get things done.
        </h3>
        <p className="text-[#6B7280] mb-16 text-base sm:text-lg lg:text-[26px] font-jakarta font-semibold">
          So why does it feel like your career has... stalled?
        </p>

        {/* Shredder Visual Section */}
        <div className="relative max-w-full mx-auto px-4 sm:px-8 lg:px-0">
          {/* Wave Background */}
          {/* <div className="absolute top-[35%] left-0 right-0 overflow-hidden rounded-2xl  scale-[1]">
            <Image 
              src={waveBg} 
              alt="Wave Background" 
              className="w-full h-full object-cover opacity-100"
              priority
            />
          </div> */}

          {/* Wave Background - Full Width */}
          <div className="absolute top-[40%] left-1/2 -translate-x-[50%] w-[100vw] overflow-hidden scale-[1.1]">
            <Image 
              src={waveBg} 
              alt="Wave Background" 
              className="w-[100vw] h-full object-contain opacity-100"
              priority
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-4 py-12 lg:py-2 max-h-[800px]">
            {/* Text Content */}
            <div className="flex flex-col space-y-4 lg:w-[40%] text-left lg:translate-y-[40%]  lg:translate-x-[15%]">
              <p className="font-semibold text-xl sm:text-2xl md:text-[24px] font-jakarta text-[#6B7280]">
                Your manager says you&apos;re &quot;doing great.&quot;<br />
                Then someone else gets the promotion.
              </p>
              
              <p className="font-normal font-jakarta text-xl sm:text-2xl lg:text-[30px] text-[#6B7280] md:mt-[4%]">
                You&apos;re dependable, <span className="text-[#0B64F4] font-semibold font-jakarta">but invisible</span>.<br />
                Valued, <span className="text-[#0B64F4] font-semibold font-jakarta">but not chosen</span>.
              </p>
            </div>

            {/* Image */}
            <div className="lg:w-[60%] flex justify-center lg:justify-end lg:translate-x-[5%]">
              <div className="relative w-full max-w-[700px] lg:max-w-[900px] relative">
              <p className="absolute top-[18%] left-[30%] rotate-4 text-[#6B7280] text-lg md:text-[24px] font-jakarta font-medium">You hear things like:</p>

                {/* <Image
                  src={aspero}
                  alt="Shredder Visual"
                  width={800}
                  height={700}
                  className="object-contain w-full h-[800px]"
                  priority
                /> */}
                <Image
                  src={aspero}
                  alt="Shredder Visual"
                  width={1000}
                  height={1050}
                  className="object-contain w-full h-[1100px]"
                  priority
                />
              </div>
            </div>
          </div>

        {/* Description Text */}
        <div className="absolute bottom-[-1.5%] left-[20%] max-w-5xl mx-auto text-center text-base sm:text-lg lg:text-[24px] font-semibold text-[#6B7280]">
          <div className="pt-4 lg:pt-1">
            <p className="font-bold text-[#0F1729] text-lg sm:text-xl font-jakarta lg:text-[32px]">
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