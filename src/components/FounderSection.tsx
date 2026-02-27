"use client";

import React from "react";

export default function FounderSection() {
  return (
    <section className="w-full bg-[#FFFFFF] py-8 sm:py-12 md:py-16 px-4">
      
      {/* Heading */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-[18px] sm:text-3xl md:text-4xl lg:text-5xl font-quattrocento font-normal text-[#1D1D1D]">
          Hear from our{" "}
          <span className="text-[#014BAA] font-quattrocento font-bold">Founder</span>
        </h2>
      </div>

      {/* Video Container */}
      <div className="max-w-6xl mx-auto mt-2 sm:mt-8 md:mt-10">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1D1D1D] shadow-lg">

          {/* 16:9 Aspect Ratio */}
          <div className="aspect-video flex items-center justify-center">

            {/* Replace this div with actual video */}
            <p className="text-white text-[18px] font-quattrocento font-normal sm:text-xl md:text-2xl lg:text-3xl font-serif text-center px-4">
              Space for podcast video
            </p>

            {/*
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="Founder Podcast"
              allowFullScreen
            />
            */}
          </div>

        </div>
      </div>

    </section>
  );
}