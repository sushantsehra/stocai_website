"use client";

// import Image from "next/image";
import React from "react";
// import wl1 from "../assets/wl1.png";
// import wl2 from "../assets/wl2.png";
// import wl3 from "../assets/wl3.png";
// import wl4 from "../assets/wl4.png"; 
// import wl5 from "../assets/wl5.png";      
// import { SlEnergy } from "react-icons/sl";
// import bluetickcheckbox from "../assets/bluetickcheckbox.png";
import { IoCheckbox } from "react-icons/io5";

const WaitlistSection = () => {
  // const avatars = [
  //   wl1,
  //   wl2,
  //   wl3,
  //   wl4,
  //   wl5,
  // ];

  return (
    <section className="bg-gradient-to-b from-[#0F182C] to-[#0B63F0] text-white py-20 px-4 text-center mt-6">
              <div className="inline-flex items-center justify-center
            w-14 h-14 md:w-[64px] md:h-[64px]
            bg-[#3B6FF5]
            rounded-[20px]
            mb-6 lg:mb-8"
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
        <h2 className="text-3xl sm:text-4xl md:text-[48px] text-white font-jakarta font-bold mb-2 lg:mb-4">Ready to change your career trajectory?</h2>

        {/* Subtitle */}
        {/* <p className="flex items-center justify-center text-[#0B64F4] font-bold mb-4 text-sm sm:text-base lg:text-[20px]">
         <span className="text-gray-400 flex items-center">
            <SlEnergy
                size={16}
                stroke="currentColor"
                fill="currentColor"
                className="text-gray-400"
            />
        <span className="ml-2 text-[#0B64F4]">Available in Early July</span>
        </span>
        </p> */}

        {/* Description */}
        <div className="flex items-center justify-center">
        <p className="lg:text-[20px] mb-10 text-sm sm:text-base font-medium leading-6 text-white/60 font-jakarta lg:max-w-3xl text-center">
         After years of doing this privately and helping hundreds become promotable, we’re scaling to our first paid launch.
        </p>
        </div>


        {/* Description */}
        <p className="lg:text-[22px] mb-6 text-sm sm:text-base font-jakarta font-medium">
          Benefit from our early-bird offer, only available for a short time, for this special launch.
        </p>

        <div className="flex justify-center">
        {/* Email Input & Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center min-w-xs md:min-w-lg lg:min-w-3xl bg-[#F5F5F5] rounded-[8px] h-[80px] shadow-lg overflow-hidden mb-2">
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full sm:w-[65%] px-4 py-3 text-[#C8C8C8] font-medium outline-none text-sm sm:text-base lg:text-[20px]"
          />
          <button className="w-full sm:w-[30%] bg-gradient-to-r from-[#024BAB] to-[#3C83F6] hover:bg-blue-700 rounded-[12px] text-white lg:text-[20px] font-semibold py-1 md:py-3 transition-all">
            Request Access
          </button>
        </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-start absolute left-[17%] lg:left-[25%] gap-4 lg:gap-20">
          {/* Avatars + Waitlist Count */}
          {/* <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {avatars.map((src, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`User ${index + 1}`}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm sm:text-base lg:text-[20px] font-medium">
              Join 8,500+ others on the waitlist
            </p>
        
          </div> */}

          <div className="flex items-center justify-center w-full lg:translate-x-[90%]">
            <p className="text-sm sm:text-base lg:text-[20px] font-medium">
              <IoCheckbox className="inline-block w-5 h-5 text-[#87beff] mr-2 mb-1" />
              Opt in to receive updates
            </p>
          </div>
       
          {/* Checkbox */}
          {/* <label className="flex items-center text-sm sm:text-base lg:text-[16px] cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 mr-2 accent-[#0B64F4] rounded focus:ring-2 focus:ring-blue-400"
            />
            Subscribe to our newsletter
          </label> */}
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
