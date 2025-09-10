"use client"

import React from 'react';
import Image from 'next/image';
import pic1 from "@/assets/pic1.png";
import pic2 from "@/assets/pic2.png";
import pic3 from "@/assets/pic3.png";
import posthog from 'posthog-js';

const GetYourAnswers = () => {
  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-[#54B0AF] font-gotham font-medium">Get your Answers in 3 Easy Steps</span>
          </h1>
          <p className="text-[#323232] font-gotham font-medium text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Guided self-coaching that turns mental spirals into clear next steps.
          </p>
          <p className="text-[#323232] font-gotham font-medium text-base sm:text-lg">
            Free during beta.
          </p>
        </div>

        {/* Three Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 mb-16">
          
          {/* Step 1: Choose your problem */}
          <div className="text-center bg-[#F2F2F2] rounded-2xl px-1 pt-1 pb-8">
            {/* Step 1 Image Placeholder */}
            <div className="relative w-full h-64 sm:h-72 lg:h-72 bg-white rounded-2xl mb-6 overflow-hidden border border-gray-200">
              <div className="absolute inset-0 flex items-center justify-center bg-white">
              <Image src={pic1} alt="pic1" fill />
              </div>
            </div>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-gotham font-bold mb-4">
              <span className="text-[#54B0AF]">Choose your problem</span>
            </h3>
            <p className="text-[#323232] font-gotham font-medium text-sm sm:text-base leading-relaxed px-3">
              Work stress, relationships, habits, or big life decisions.
            </p>
          </div>

          {/* Step 2: Answer a few questions */}
          <div className="text-center bg-[#F2F2F2] rounded-2xl px-1 pt-1 pb-8">
            {/* Step 2 Image Placeholder */}
            <div className="relative w-full h-64 sm:h-72 lg:h-72 bg-white rounded-2xl mb-6 overflow-hidden border border-gray-200">
              <div className="absolute inset-0 flex items-center justify-center bg-white">
               <Image src={pic3} alt="pic3" fill />
              </div>
            </div>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-gotham font-bold font-bold mb-4">
              <span className="text-[#54B0AF] font-gotham font-bold">Answer a few questions</span>
            </h3>
            <p className="text-[#323232] font-gotham font-medium text-sm sm:text-base leading-relaxed px-3">
              Thoughtful questions and prompts help you cut through mental noise.
            </p>
          </div>

          {/* Step 3: Get your next steps */}
          <div className="text-center bg-[#F2F2F2] rounded-2xl px-1 pt-1 pb-8">
            {/* Step 3 Image Placeholder */}
            <div className="relative w-full h-64 sm:h-72 lg:h-72 bg-white rounded-2xl mb-6 overflow-hidden border border-gray-200">
              <div className="absolute inset-0 flex items-center justify-center bg-white">
<Image src={pic2} alt="pic2" fill />
              </div>
            </div>
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-gotham font-bold mb-4">
              <span className="text-[#54B0AF]">Get your next steps</span>
            </h3>
            <p className="text-[#323232] font-gotham font-medium text-sm sm:text-base leading-relaxed px-3">
              Walk away with clarity, list of action items, and peace of mind.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button  onClick={() => {
            posthog.capture("get_your_answer_section", {
              button: "start_free_session",
              location: "about_page",
            });

            setTimeout(() => {
              window.location.href = "https://clarity.mystocai.com";
            }, 300);
          }}

           className="bg-[#54B0AF] font-gotham font-bold hover:bg-teal-600 text-white px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            Start Free Session
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default GetYourAnswers;