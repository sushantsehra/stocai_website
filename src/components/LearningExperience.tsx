"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaRegCircleCheck } from "react-icons/fa6";
// import Image from "next/image";
import Image, { StaticImageData } from "next/image";
import programOverview from "../assets/programOverview.png";
import AccountabilityPartner from "../assets/AccountabilityPartner.png";
// import CareerMyths from "../assets/CareerMyths.png";
import CourseCard from "../assets/CourseCard.png";
// import ReflectionRoom from "../assets/ReflectionRoom.png";
// import Modal from "../assets/Modal.png";
import ReflicationModal from "../assets/ReflicationModal.png";
import futureIdCard from "../assets/futureIdCard.png";
import lnoFramework from "../assets/lnoFramework.png";
import videocontainer from "../assets/videocontainer.png";

// Type Definition
interface Slide {
  title: string;
  points: string[];
  // image: any;
  image: StaticImageData;
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
      image: futureIdCard,
    },
    {
      title: "Actionable frameworks",
      points: [
        "Apply science-backed frameworks to real career situations",
        "Navigate matrix organizations with a fresh approach",
        "Learn mental models and their real-world applications",
      ],
      image: lnoFramework,
    },
    {
      title: "Mindset & psychological shifts",
      points: [
        "Turn strengths into an advantage",
        "Shift from effort to leverage",
        "Build confidence under pressure",
      ],
      image: videocontainer,
    },
    {
      title: "Practical exercises & activities",
      points: [
        "Apply insights to live work situations",
        "Pressure-test your thinking safely",
        "Lock learning into behaviour",
      ],
      image: CourseCard,
    },
    {
      title: "AI career coach",
      points: [
        "Practice difficult conversations in a private, judgment-free space",
        "Reflect with guided prompts and identify blind spots early",
        "Grow faster with AI-powered insights",
      ],
      image: programOverview,
    },
    {
      title: "Human coach support (Optional)",
      points: [
        "Work through blockers in real time with 1-on-1 calls",
        "Leave each call with a clear next move",
        "Get clarity when the stakes feel high",
      ],
      image: ReflicationModal,
    },
    {
      title: "Accountability partner",
      points: [
        "Checks in personally, every week",
        "Tracks your progress, not just completion",
        "Helps you keep learning tied to real outcomes",
      ],
      image: AccountabilityPartner,
    },
  ];

  const handlePrev = () =>
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));

  const handleNext = () =>
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold text-black mb-2">
            Built from real{" "}
            <span className="text-[#0B64F4]">career experiences</span>,{" "}
            <br className="hidden sm:block" />
            not theory
          </h2>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Left: Dynamic Image */}
          <div className="md:w-2/3 bg-[#F0F0F0] rounded-2xl p-3 lg:pt-5 pb-24 lg:px-5 shadow-xl relative overflow-hidden transition-all duration-500 ease-in-out">
            <div>
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                key={currentSlide}
                height={500}
                width={800}
                className="w-full h-auto rounded-lg transition-all duration-500 shadow-2xl max-h-[500px] ease-in-out"
              />
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-2 absolute bottom-12 left-0 right-0">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-sm ${
                    index === currentSlide ? "bg-[#0B64F4]" : "bg-black"
                  } transition-all duration-300`}
                ></span>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 absolute bottom-2 left-[45%] md:left-[45%]">
              <button
                onClick={handlePrev}
                className="w-7 h-7 rounded-full bg-gray-400 hover:bg-gray-500 flex items-center justify-center transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-bold text-white" />
              </button>
              <button
                onClick={handleNext}
                className="w-7 h-7 rounded-full bg-gray-400 hover:bg-gray-500 flex items-center justify-center transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-bold text-white" />
              </button>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="relative md:w-1/3">
            <h3
              key={slides[currentSlide].title}
              className="text-xl sm:text-2xl lg:text-[24px] font-semibold text-[#0B64F4] mb-4 transition-all duration-300"
            >
              {slides[currentSlide].title}
            </h3>

            <ul className="space-y-4 mb-10">
              {slides[currentSlide].points.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 transition-all duration-300"
                >
                  <FaRegCircleCheck className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg text-[#000000] font-normal leading-snug">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningExperience;