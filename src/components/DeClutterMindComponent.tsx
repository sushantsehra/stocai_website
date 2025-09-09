"use client"

import React from 'react';
import Image from 'next/image';
import at_ease from "@/assets/at_ease.png";
import fomo from "@/assets/fomo.png";
import posthog from 'posthog-js';

const DeClutterMindComponent = () => {
  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#54B0AF] font-gotham font-bold mb-4">
            <span className="text-[#54B0AF]">De-clutter your Mind. Win Everyday!.</span>{' '}
          </h1>
          <p className="text-[#323232] font-gotham text-lg sm:text-xl max-w-2xl mx-auto">
            Start an empowering journey with Stocai and make life simpler
          </p>
        </div>

        {/* Main Content - Before and After */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          
          {/* Left Side - Cluttered Mind */}
          <div className="relative">
            <div className="relative w-full h-96 sm:h-[650px] bg-gray-200 rounded-2xl overflow-hidden">
              {/* Image Placeholder */}
             <Image src={fomo} alt="fomo" fill />
            </div>
          </div>

          {/* Right Side - Clear Mind */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-[305px] sm:w-full h-96 sm:h-[650px] bg-gray-200 rounded-2xl overflow-hidden">
              {/* Image Placeholder */}
              <Image src={at_ease} alt="at_ease" fill />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#54B0AF] font-gotham font-medium mb-8">
            Think clear. Feel better. Take control.
          </h2>
          
          {/* CTA Button */}
          <button
           onClick={() => {
  posthog.capture("declutter_mind_section", {
    button: "start_free_session",
    location: "about_page",
  });

  setTimeout(() => {
    window.location.href = "https://clarity.mystocai.com";
  }, 300);
}}

           className="bg-[#54B0AF] font-bold font-gotham hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
            Start Free Session
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default DeClutterMindComponent;