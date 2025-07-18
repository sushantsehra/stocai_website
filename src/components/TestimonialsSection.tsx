"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Button from "./Button";
import img1 from "@/assets/Ellipse 1267 (1).png";
import img2 from "@/assets/Ellipse 1267 (2).png";
import img3 from "@/assets/Ellipse 1267.png";

interface TestimonialCardProps {
  title: string;
  content: string;
  position: string;
  imageSrc: {
    src: string;
    height: number;
    width: number;
  };
}

const TestimonialCard = ({ title, content, position, imageSrc }: TestimonialCardProps) => (
  <article
    className="flex flex-col p-6 bg-white rounded-lg shadow-md flex-shrink-0 w-[calc(100vw-40px)] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] max-w-[600px]"
  >
    <div className="w-full">
      <h3 className="text-lg md:text-2xl font-bold leading-2 md:leading-8 text-[#6EB4AE]">
        {title}
      </h3>
      <p className="mt-4 text-sm md:text-base leading-2 md:leading-6 text-neutral-600">
        {content}
      </p>
    </div>
    <div className="flex gap-4 items-center self-start mt-6 text-base font-medium text-black">
      <Image
        src={imageSrc}
        alt={`${position} profile`}
        width={46}
        height={46}
        className="object-contain shrink-0 self-stretch my-auto rounded-full aspect-square"
      />
      <div className="self-stretch my-auto">{position}</div>
    </div>
  </article>
);

const TestimonialsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current && scrollContainerRef.current.firstElementChild) {
      const cardWidth = (scrollContainerRef.current.firstElementChild as HTMLElement).offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: -(cardWidth + 10), // Card width + gap
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && scrollContainerRef.current.firstElementChild) {
      const cardWidth = (scrollContainerRef.current.firstElementChild as HTMLElement).offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: cardWidth + 10,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="testimonials"
      className="mt-8 md:mt-24 lg:mt-24 w-full px-5 md:px-[5%] lg:px-[10%] overflow-x-hidden"
    >
      <div className="flex flex-wrap gap-3 md:gap-5 justify-between items-end w-full max-w-[1280px] mx-auto">
        <div className="max-w-[830px] mt-[8rem] md:mt-[8rem] lg:mt-[8rem]">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-none text-black font-quattrocento">
            Stories of Change, Powered by Stocai
          </h2>
          <p className="mt-1 text-xl md:text-2xl leading-10 text-neutral-700 font-Gotham">
            Real Stories, Real Impact
          </p>
        </div>
        <div className="flex gap-3 mt-2 md:gap-5 items-center justify-end translate-x-52 md:translate-x-[520px] lg:translate-x-0">
          <button
            type="button"
            className="flex justify-center items-center md:px-6 md:py-3 px-4 py-1.5 bg-stone-900 rounded-full"
            aria-label="Previous testimonial"
            onClick={scrollLeft}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <title>Previous arrow</title>
              <path
                d="M15 19L8 12L15 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="flex justify-center items-center md:px-6 md:py-3 px-4 py-1.5 bg-stone-900 rounded-full"
            aria-label="Next testimonial"
            onClick={scrollRight}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <title>Next arrow</title>
              <path
                d="M9 5L16 12L9 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full max-w-[1280px] mx-auto overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-10 mt-6 lg:mt-12 md:mt-8 overflow-x-auto pb-4 w-full scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <TestimonialCard
            title="I Transformed My Procrastination by Understanding Its Root Cause"
            content="&quot;I always thought I was just lazy or undisciplined, but Stocai helped me realize that my procrastination wasn't about time management - it was about fear of failure. Once I understood that, everything changed. Instead of avoiding tasks, I started breaking them down, addressing my fears, and making real progress. It's transformed not just how I work, but how I think.&quot;"
            position="Marketing Manager"
            imageSrc={img1}
          />

          <TestimonialCard
            title="I Finally Learned How to Have Difficult Conversations"
            content='"I used to avoid difficult conversations at all costs - both at work or in my personal life. Stocai helped me dig deeper and understand that my avoidance came from a fear of disappointing others…I learned to reframe these conversations as opportunities for growth rather than conflicts. Now, I communicate with more clarity and my relationships have improved tremendously."'
            position="Analyst"
            imageSrc={img2}
          />

          <TestimonialCard
            title="I Stopped Letting Self-Doubt Hold Me Back"
            content="&quot;I often second-guessed myself and hesitated to take action, thinking I wasn't 'ready' yet. Stocai helped me realize that this constant doubt was holding me back more than any real obstacle. It guided me to shift my mindset from waiting for confidence to taking small, consistent steps. Now, I don't wait for the perfect moment; I create it.&quot;"
            position="Team Lead"
            imageSrc={img3}
          />
        </div>
      </div>

      <div className="flex justify-center mt-4 lg:mt-4 md:mt-3">
        <Button variant="primary" onClick={() => window.location.href = "https://clarity.mystocai.com"}>
          See The Impact For Yourself
        </Button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
