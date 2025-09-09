"use client"

import React from 'react';
import svg_linestroke from "@/assets/svg_linestroke.png";
import Image from "next/image";
import posthog from 'posthog-js';

const CommonSituationsSection = () => {
  // First row data (moving left to right)
  const firstRowSituations = [
    "Moving cities",
    "Relationship changes", 
    "Becoming a parent",
    "Starting college",
    "Work: Quit or stay?",
    "Manage Finances"
  ];

  // Second row data (moving right to left)
  const secondRowSituations = [
    "Job promotion",
    "Job vs Startup",
    "Feeling burnout",
    "Build healthy habits",
    "Procrastination",
    "Anxious",
    "Overwhelmed",
    "Lose Weight"
  ];

  // Duplicate arrays for seamless loop
  const firstRowExtended = [...firstRowSituations, ...firstRowSituations, ...firstRowSituations];
  const secondRowExtended = [...secondRowSituations, ...secondRowSituations, ...secondRowSituations];

  return (
    <section className="w-full bg-gray-50 py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Heading */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-gotham text-[#54B0AF] mb-4">
            Common situations{" "} 
              <span className="relative inline-block">
              <span className="text-[#54B0AF] font-gotham font-bold">we help{" "}</span>
              <Image src={svg_linestroke} alt="linestroke" width={200} height={250} className="top-7 absolute" />
            </span>
            {" "}with
          </h2>
          <p className="text-lg md:text-xl text-[#323232] font-gotham font-medium max-w-4xl mx-auto leading-relaxed">
            Except for medical cases, Stoai helps with everyone who trusts the Power of Coaching
          </p>
        </div>

        {/* Animated Pills Container */}
        <div className="space-y-6 mb-12">
          
          {/* First Row - Moving Left to Right */}
          <div className="relative">
            <div className="flex overflow-hidden">
              <div className="flex animate-scroll-left space-x-4">
                {firstRowExtended.map((situation, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 px-6 py-3 bg-white border-2 border-[#54B0AF] text-[#54B0AF] rounded-full text-sm md:text-base font-medium whitespace-nowrap hover:bg-[#54B0AF] hover:text-white transition-colors duration-300 cursor-pointer font-gotham font-bold"
                  >
                    {situation}
                   
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Row - Moving Right to Left */}
          <div className="relative">
            <div className="flex overflow-hidden">
              <div className="flex animate-scroll-right space-x-4">
                {secondRowExtended.map((situation, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 px-6 py-3 bg-white border-2 border-[#54B0AF] text-[#54B0AF] rounded-full text-sm md:text-base font-medium whitespace-nowrap hover:bg-[#54B0AF] hover:text-white transition-colors duration-300 cursor-pointer font-gotham font-bold"
                  >
                    {situation}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
           onClick={() => {
  posthog.capture("common_situation_section", {
    button: "start_free_session",
    location: "about_page",
  });

  setTimeout(() => {
    window.location.href = "https://clarity.mystocai.com";
  }, 300);
}}

          className="bg-[#54B0AF] hover:bg-[#4a9e9d] text-white font-bold font-gotham px-8 py-4 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
            Start Free Session
          </button>
        </div>

      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 25s linear infinite;
        }

        /* Pause animation on hover */
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default CommonSituationsSection;