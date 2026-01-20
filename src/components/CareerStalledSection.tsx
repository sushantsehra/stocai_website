"use client";

import Image from "next/image";
import React from "react";

const CareerStalledSection: React.FC = () => {
  return (
    <section className="bg-white py-20 px-4 text-center relative overflow-hidden">
      {/* Background watermark text - user will replace with image */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-[15%] left-[5%] text-6xl font-bold text-gray-400">
          Bell Curve
        </div>
        <div className="absolute top-[40%] right-[10%] text-5xl font-bold text-gray-400">
          360 Degree<br />Feedback
        </div>
        <div className="absolute bottom-[20%] right-[5%] text-6xl font-bold text-gray-400">
          MBO
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2">
          <span className="text-[#0B64F4]">You show up. You deliver.</span>
        </h2>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black mb-3">
          People trust you to get things done.
        </h3>
        <p className="text-gray-500 mb-16 text-base sm:text-lg">
          So why does it feel like your career has... stalled?
        </p>

        {/* Shredder Visual Section */}
        <div className="relative max-w-3xl mx-auto mb-16">
          {/* Text box coming out of shredder */}
          <div className="absolute top-0 right-[15%] sm:right-[20%] bg-white shadow-xl border border-gray-200 p-4 sm:p-6 rounded-lg text-left text-xs sm:text-sm text-gray-700 max-w-[200px] sm:max-w-[250px] z-20 transform rotate-3">
            <p className="mb-2 font-medium">You hear things like:</p>
            <p className="mb-1.5 italic">"You need to think more like a leader."</p>
            <p className="mb-1.5 italic">"You should be more visible."</p>
            <p className="italic">"You're doing everything right — just keep going."</p>
          </div>

          {/* Shredder Image - placeholder */}
          <div className="relative mx-auto w-full max-w-[500px] h-[350px] sm:h-[400px] flex items-center justify-center">
            {/* Replace this div with actual shredder image */}
            <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
              {/* Shredder top opening */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gray-700 rounded-t-2xl"></div>
              
              {/* Shredder blades visualization */}
              <div className="absolute top-16 left-0 right-0 h-20 flex items-center justify-center gap-1 bg-gray-800">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-1 h-16 bg-gray-600"></div>
                ))}
              </div>

              {/* Shredded paper */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-white/20 flex items-end justify-center p-4">
                <div className="text-xs text-white/70">
                  Replace with: /images/shredder.png
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Text */}
        <div className="max-w-2xl mx-auto text-center space-y-5 text-base sm:text-lg text-gray-700">
          <p className="font-medium">
            Your manager says you're "doing great."<br />
            Then someone else gets the promotion.
          </p>
          
          <p className="font-medium">
            You're dependable, <span className="text-[#0B64F4] font-semibold">but invisible</span>.<br />
            Valued, <span className="text-[#0B64F4] font-semibold">but not chosen</span>.
          </p>
          
          <div className="pt-4 space-y-2">
            <p className="font-bold text-black text-lg sm:text-xl">
              But no one tells you what to actually do differently.
            </p>
            <p className="font-bold text-black text-lg sm:text-xl">
              And you wonder...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerStalledSection;