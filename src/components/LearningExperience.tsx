"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaRegCircleCheck } from "react-icons/fa6";
import Image, { StaticImageData } from "next/image";
import tileBgImg from "../assets/tileBgImg.png";
import tile1 from "../assets/tile1.png";
import tile2 from "../assets/tile2.png";
import tile3 from "../assets/tile3.png";
import tile4 from "../assets/tile4.png";
import tile5 from "../assets/tile5.png";
import tile7 from "../assets/tile7.png";
import modal from "../assets/Modal.png";

// Type Definition
interface Slide {
  title: string;
  points: string[];
  image: StaticImageData;
}

const LearningExperience = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

    const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const slides: Slide[] = [
    {
      title: "Concept-Led Videos",
      points: [
        "Understand growth levers and blockers",
        "Decode unspoken workplace dynamics",
        "Spot patterns you've been missing for years",
      ],
      image: tile1,
    },
    {
      title: "Actionable frameworks",
      points: [
        "Apply science-backed frameworks to real career situations",
        "Navigate matrix organizations with a fresh approach",
        "Learn mental models and their real-world applications",
      ],
      image: tile2,
    },
    {
      title: "Mindset & psychological shifts",
      points: [
        "Turn strengths into an advantage",
        "Shift from effort to leverage",
        "Build confidence under pressure",
      ],
      image: tile3,
    },
    {
      title: "Practical exercises & activities",
      points: [
        "Apply insights to live work situations",
        "Pressure-test your thinking safely",
        "Lock learning into behaviour",
      ],
      image: tile4,
    },
    {
      title: "AI career coach",
      points: [
        "Practice difficult conversations in a private, judgment-free space",
        "Reflect with guided prompts",
        // "Grow faster with AI-powered insights",
        "Identify blind spots early"
      ],
      image: tile5,
    },
    // {
    //   title: "Human coach support (Optional)",
    //   points: [
    //     "Work through blockers in real time with 1-on-1 calls",
    //     "Leave each call with a clear next move",
    //     "Get clarity when the stakes feel high",
    //   ],
    //   image: ReflicationModal,
    // },
    {
      title: "Accountability partner",
      points: [
        "Checks in personally, every week",
        "Tracks your progress, not just completion",
        "Helps you keep learning tied to real outcomes",
      ],
      image: tile7,
    },
  ];

  const handlePrev = () =>
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));

  const handleNext = () =>
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="hidden sm:block text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-jakarta font-bold text-black mb-2">
            Built from real{" "}
            <span className="text-[#0B64F4] font-jakarta ">career experiences</span>,{" "}
            <br className="" />
            not theory
          </h2>
            <h2 className="sm:hidden block text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-7 font-jakarta font-bold text-black mb-2">
            Built from real{" "}
            <span className="text-[#0B64F4] font-jakarta ">career experiences</span>,{" "} not theory
          </h2>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Left: Dynamic Image with Background Peek */}
          <div className="w-[100%] md:w-[60%] lg:w-[741px] relative">
            {/* Main Container */}
            <div className="relative z-10 bg-[#A8A8A8] rounded-[20px] px-2 py-3 sm:p-4 shadow-xl overflow-hidden">
              
              {/* FIXED IMAGE FRAME */}
              <div className="relative w-full h-[280px] sm:h-[420px] overflow-hidden rounded-xl">

                {/* Background Blur Image */}
                <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 z-0 w-[80%] h-[390px] rounded-[16px] overflow-hidden ">
                  <Image
                    src={tileBgImg}
                    alt="Background preview"
                    fill
                    className="object-cover scale-110 h-[300px] rounded-[16px] blur-[1px] opacity-60"
                    priority
                  />
                </div>

                {/* Foreground Slide Image */}
                <div className="relative z-10 w-full sm:w-[97%] h-full flex items-center justify-center  rounded-[24px] overflow-hidden">
                  <Image
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    fill
                    className="object-contain sm:object-cover rounded-[24px]"
                    priority
                  />
                </div>

              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-2 sm:mt-6">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 w-2 rounded-sm ${
                      index === currentSlide ? "bg-[#0B64F4]" : "bg-black"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-4 justify-center mt-3 sm:mt-4">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 md:w-[27px] md:h-[27px] rounded-full bg-gray-300 hover:bg-[#F0F0F0] flex items-center justify-center"
                >
                  <ChevronLeft className="text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 md:w-[27px] md:h-[27px] rounded-full bg-gray-300 hover:bg-[#F0F0F0] flex items-center justify-center"
                >
                  <ChevronRight className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="relative md:w-[40%]">
            <h3
              key={slides[currentSlide].title}
              className="text-xl sm:text-2xl lg:text-[24px] font-semibold font-jakarta text-[#0B64F4] mb-3 sm:mb-4 transition-all duration-300"
            >
              {slides[currentSlide].title}
            </h3>

            <ul className="space-y-2.5 sm:space-y-4 mb-10">
              {slides[currentSlide].points.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 transition-all duration-300"
                >
                  <FaRegCircleCheck className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-1" />
                  <span className="text-base md:text-[18px] text-[#000000] font-jakarta font-normal leading-snug">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center items-center mt-0.5 sm:mt-8 md:mt-16 lg:translate-x-[-2%]">
          <button
          onClick={scrollToWaitlist}
            className="
              w-[206px] md:w-[215px] py-8 h-[54px]
              rounded-[12px]
              bg-[radial-gradient(ellipse_at_top,_#FFFFFF_0%,_#ADADAD_220%)]
              shadow-[0_5px_20px_rgba(0,0,0,0.3)]
              text-black cursor-pointer
              flex items-center justify-center
              transition-all duration-300
              hover:scale-[1.02]
              active:scale-[0.98] text-lg md:text-[20px] font-bold font-jakarta 
            "
          >
            Get Early Access
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearningExperience;