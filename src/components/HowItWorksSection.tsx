"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Button from "./Button";
import img1 from "@/assets/hitws1.png";
import img2 from "@/assets/hitws2.png";
import img3 from "@/assets/hitws3.png";
import img4 from "@/assets/hitws4.png";

const HowItWorksSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 650;
      scrollContainerRef.current.scrollLeft +=
        direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <section id="how-stocai-works" className="mx-auto container px-4 sm:px-6 lg:px-8">
      <div className="mt-16 w-full max-md:mt-10">
        {/* Heading & Navigation Buttons */}
        <div className="flex  justify-between items-center flex-wrap">
          <div className="w-full mt-[8rem] lg:mt-[8rem] lg:w-3/4">
            <h2 className="md:text-[50px] text-[28px] font-bold text-[#54B0AF] font-quattrocento max-md:text-4xl">
              How Stocai Works
            </h2>
            <p className="mt-2.5 md:text-2xl text-lg text-black">
              Turning Introspection into Actionable Clarity
            </p>
          </div>
          <div className="flex items-center lg:mt-20 gap-3 mt-5 max-md:mt-3">
            <button
              className="flex items-center justify-center px-5 py-1 sm:px-6 sm:py-2 md:px-7 md:py-2 bg-[#1D1D1D] text-white text-lg md:text-2xl rounded-full"
              aria-label="Previous slide"
              onClick={() => handleScroll("left")}
            >
              ←
            </button>
            <button
              className="flex items-center justify-center px-5 py-1 sm:px-6 sm:py-2 md:px-7 md:py-2 bg-[#1D1D1D] text-white text-lg md:text-2xl rounded-full"
              aria-label="Next slide"
              onClick={() => handleScroll("right")}
            >
              →
            </button>
          </div>
        </div>

        {/* Scrollable Cards Section */}
        <div
          className="flex gap-6 sm:gap-10 overflow-x-auto scroll-smooth scrollbar-hide mt-5 md:mt-10 pt-10 pb-4"
          ref={scrollContainerRef}
        >
          {[
            {
              id: 1,
              title: "Ask the Right Questions",
              description:
                "Because the best answers come from the one who knows you best—you.",
              img: img1,
            },
            {
              id: 2,
              title: "See What's Beneath the Surface",
              description: "Because digging deeper brings out smarter answers.",
              img: img2,
            },
            {
              id: 3,
              title: "Gain Clarity & Insights",
              description:
                "Deep introspection leads to actionable clarity in life.",
              img: img3,
            },
            {
              id: 4,
              title: "Transform Your Thinking",
              description: "Self-awareness fosters meaningful growth.",
              img: img4,
            },
          ].map((step) => (
            <article
              key={step.id}
              className="relative flex flex-col sm:flex-row items-center p-6 bg-white rounded-3xl shadow-lg min-w-[90%] md:min-w-[550px] lg:min-w-[820px] min-h-[300px] w-full sm:w-[750px]"
            >
              {/* Step Number */}
              <div className="absolute top-[-20px] left-4 bg-[#54B0AF] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                {step.id}
              </div>

              {/* Image */}
              <div className="w-[140px] sm:w-[180px] mx-auto">
                <Image
                  src={step.img}
                  alt={step.title}
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <div className="mt-4 sm:ml-6 sm:mt-0 flex-1 text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold">{step.title}</h3>
                <p className="mt-4 text-lg pr-0 md:pr-20">{step.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex flex-col mt-8 md:mt-12 ">
          <Button
            variant="primary"
            className="self-center sm:self-start py-2"
            onClick={() => window.location.href = "https://clarity.mystocai.com"}
          >
            Start Introspecting
          </Button>
          <hr className="mt-16 h-px border border-neutral-400 max-md:mt-10" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
