"use client";

import Image from "next/image";
import React from "react";
import wl1 from "../assets/wl1.png";
import wl2 from "../assets/wl2.png";
import wl3 from "../assets/wl3.png";
import wl4 from "../assets/wl4.png"; 
import wl5 from "../assets/wl5.png";      
import { SlEnergy } from "react-icons/sl";

const WaitlistSection = () => {
  const avatars = [
    wl1,
    wl2,
    wl3,
    wl4,
    wl5,
  ];

  return (
    <section className="bg-gradient-to-b from-[#0F182C] to-[#0B63F0] text-white py-20 px-4 text-center">
      <div className="max-w-full mx-auto">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-[48px] text-white font-bold mb-2">Get early access</h2>

        {/* Subtitle */}
        <p className="flex items-center justify-center text-[#0B64F4] font-bold mb-4 text-sm sm:text-base lg:text-[20px]">
         {/* <span className="text-gray-400"><SlEnergy stroke="fill" fill="#54B0AF" className="text-gray-400" /> </span> <span className="ml-2">Available in Early July</span> */}
         <span className="text-gray-400 flex items-center">
            <SlEnergy
                size={16}
                stroke="currentColor"
                fill="currentColor"
                className="text-gray-400"
            />
        <span className="ml-2 text-[#0B64F4]">Available in Early July</span>
        </span>
        </p>

        {/* Description */}
        <p className="lg:text-[20px] mb-10 text-sm sm:text-base font-medium">
          Be amongst the first to experience wait and launch a viral waitlist.
          Sign up to be notified when we launch!
        </p>

        <div className="flex justify-center">
        {/* Email Input & Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:min-w-3xl bg-[#F5F5F5] rounded-[8px] h-[80px] shadow-lg overflow-hidden mb-6">
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full sm:w-[65%] px-4 py-3 text-[#C8C8C8] font-medium outline-none text-sm sm:text-base lg:text-[20px]"
          />
          <button className="w-full sm:w-[30%] bg-gradient-to-r from-[#024BAB] to-[#3C83F6] hover:bg-blue-700 rounded-[12px] text-white lg:text-[20px] font-semibold py-3 transition-all">
            Join Waitlist
          </button>
        </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-start absolute left-[25%] gap-4 lg:gap-20">
          {/* Avatars + Waitlist Count */}
          <div className="flex items-center gap-3">
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