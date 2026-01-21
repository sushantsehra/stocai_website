"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaRegCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import programOverview from "../assets/programOverview.png";

// Type Definition
interface Slide {
  title: string;
  points: string[];
}

const LearningExperience = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      title: "Concept-Led Videos",
      points: [
        "Understand why hard work stopped converting into growth",
        "Decode unspoken workplace dynamics",
        "Spot patterns you've been missing for years",
      ],
    },
    {
      title: "Practical Exercises",
      points: [
        "Apply frameworks to real scenarios",
        "Build your personal strategy",
        "Track measurable progress",
      ],
    },
  ];

  const handlePrev = () =>
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));

  const handleNext = () =>
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));

  return (
    <section className="py-12 bg-white">
      <div className="max-w-full mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold text-black mb-2">
            Built from real{" "}
            <span className="text-[#0B64F4]">career experiences</span>,{" "}
            <br className="hidden sm:block" />
            not theory
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-[20px] text-[#6B7280] font-normal text-slate-600">
            What you&apos;ll learn and do
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Video Mockup */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-2 lg:p-4 shadow-xl order-1">
            <Image src={programOverview} alt="Program Overview" className="w-full h-auto rounded-lg" />
          </div>

          {/* Right: Text Content */}
          <div className="order-2">
            <h3 className="text-xl sm:text-2xl lg:text-[24px] font-semibold text-[#0B64F4] mb-4">
              {slides[currentSlide].title}
            </h3>

            <ul className="space-y-3 sm:space-y-4 mb-6 md:mb-8">
              {slides[currentSlide].points.map((point, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <FaRegCircleCheck className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0 mt-1" />
                  <span className="text-sm sm:text-base md:text-lg lg:text-[18px] text-[#000000] font-normal">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {/* Navigation Buttons */}
            <div className="flex gap-3 sm:gap-4 absolute bottom-[-15%] right-[50%]">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningExperience;