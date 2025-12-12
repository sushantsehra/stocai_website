"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import AccountabilityPartner from "../assets/AccountabilityPartner.png";
import CareerMyths from "../assets/CareerMyths.png";
import CourseCard from "../assets/CourseCard.png";
import ReflectionRoom from "../assets/ReflectionRoom.png";
import Modal from "../assets/Modal.png";
import ReflicationModal from "../assets/ReflicationModal.png";

type Slide = {
  id: number;
  src: StaticImageData;
  alt?: string;
};

const SLIDES: Slide[] = [
  { id: 1, src: AccountabilityPartner, alt: "Accountability Partner" },
  { id: 2, src: CareerMyths, alt: "Career Myths" },
  { id: 3, src: CourseCard, alt: "Course Card" },
  { id: 4, src: ReflectionRoom, alt: "Reflection Room" },
  { id: 5, src: Modal, alt: "Modal" },
  { id: 6, src: ReflicationModal, alt: "Reflication Modal" },
];

const ArrowLeft = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" className={className} aria-hidden>
    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" className={className} aria-hidden>
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CourseCarousel: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const length = SLIDES.length;
  const containerRef = useRef<HTMLDivElement | null>(null);

  // touch handling
  const touchStartX = useRef<number | null>(null);
  const touchDelta = useRef<number>(0);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + length) % length);
  }, [length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % length);
  }, [length]);

  // keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  // swipe handlers
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchDelta.current = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartX.current == null) return;
      touchDelta.current = e.touches[0].clientX - touchStartX.current;
    };

    const onTouchEnd = () => {
      if (touchDelta.current > 40) prev();
      else if (touchDelta.current < -40) next();
      touchStartX.current = null;
      touchDelta.current = 0;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [prev, next]);

  return (
    <>
      <section className="w-full bg-[#F0F0F0] rounded-t-[11px]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          {/* header */}
          <div className="p-2 mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-gotham font-normal text-[#1D1D1D]">
              What you get with <span className="text-[#014BAA] font-bold">Better Corporate Life</span>
            </h2>
            <p className="mt-2 text-base md:text-[19px] text-[#1D1D1D] font-gotham font-normal">A complete system built for real, lasting change built through <span className="text-[#014BAA] font-bold">100+ years cumulative coaching experience</span></p>
          </div>

          {/* main grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Carousel */}
            <div className="md:col-span-7 lg:col-span-7">
              <div className="relative">
               <div className="">
                 {/* Frame */}
                <div
                  ref={containerRef}
                  className="relative overflow-hidden rounded-2xl  bg-[#FFFFFF] shadow-2xl"
                  aria-roledescription="carousel"
                  aria-label="Course preview carousel"
                >
                  {/* Slides row */}
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      width: `${length * 100}%`,
                      transform: `translateX(-${(index * 100) / length}%)`,
                    }}
                  >
                    {SLIDES.map((s, i) => (
                      <div
                        key={s.id}
                        className="w-full flex-shrink-0 flex items-center justify-center p-4 md:p-6"
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`Slide ${i + 1} of ${length}`}
                        aria-hidden={i !== index}
                        style={{ width: `${100 / length}%` }}
                      >
                        <div className="w-full rounded-2xl  p-4 md:p-6 relative">
                          {/* layered stacked frames */}
                          <div className="absolute top-2.5 left-0.5 w-full h-full md:w-[610px] md:h-[345px] rounded-2xl bg-[#F0F0F0] border border-[#F0F0F0] shadow-md -z-10 scale-95"></div>
                          {/* <div className="absolute top-3 -left-7.5 w-full h-full md:w-[610px] md:h-[350px] rounded-2xl bg-red-500 border border-[#F0F0F0] shadow-md -z-20 scale-90"></div> */}
                          <div className="absolute top-9 -left-9.5 w-full h-full md:w-[610px] md:h-[355px] rounded-2xl bg-[#F0F0F0] border border-[#F0F0F0] shadow-md -z-20 scale-90"></div>
                          <div className="absolute top-6.5 -left-7.5 w-full h-full md:w-[620px] md:h-[355px] rounded-2xl bg-[#F0F0F0] border border-[#F0F0F0] shadow-md -z-20 scale-90"></div>
                          <div className="absolute top-3.5 -left-5.5 w-full h-full md:w-[635px] md:h-[360px] rounded-2xl bg-[#F0F0F0] border border-[#F0F0F0] shadow-md -z-20 scale-90"></div>


                          <div className="relative md:-top-4 w-full rounded-xl overflow-hidden shadow-xl border border-[#F0F0F0] aspect-video">
                            <Image
                              src={s.src}
                              alt={s.alt || `Slide ${s.id}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Left / Right Buttons */}
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
                  >
                    <ArrowLeft className="text-gray-700" />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
                  >
                    <ArrowRight className="text-gray-700" />
                  </button>

                  {/* Dots */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex items-center gap-2">
                    {SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        aria-label={`Go to slide ${idx + 1}`}
                        aria-current={idx === index ? "true" : "false"}
                        onClick={() => setIndex(idx)}
                        className={`w-3 h-3 rounded-full focus:outline-none transition-colors ${
                          idx === index ? "bg-indigo-600" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
               </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="md:col-span-5 lg:col-span-5">
              <h3 className="text-2xl sm:text-3xl md:text-[28px] font-gotham font-bold text-[#014BAA]">
                Lessons that teach what actually <span className="text-[#1556B8]">drives promotions</span>
              </h3>

              <ul className="mt-6 space-y-4 text-[#1D1D1D] font-gotham font-normal text-sm md:text-[16px]">
                <li className="flex gap-3">
                  <span className="mt-1 text-[#1D1D1D]">•</span>
                  <span>Short, practical modules that cut noise and show what actually moves careers.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-[#1D1D1D]">•</span>
                  <span>Frameworks derived from marketing, behavioral science, coaching discipline, and management.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-[#1D1D1D]">•</span>
                  <span>Clear explanations you can apply same day at work — no fluff.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-[#1D1D1D]">•</span>
                  <span>Helps you understand promotability and its levers without endless theory.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* bottom banner */}
      <div className="">
        <div className="bg-[#194EA6] text-white rounded-b-[12px] py-6 px-8 text-center shadow-inner">
          <p className="text-lg md:text-xl">Completed the program but not seeing results? 100% money back. No questions asked.</p>
        </div>

        {/* center CTA button under banner */}
        <div className="mt-10 flex justify-center">
          <button className="bg-[#014BAA] text-white text-[16px] font-gotham font-normal px-5 py-3 rounded-[12px] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 inline-flex items-center gap-3">
            Reserve Your Spot
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" className="ml-2" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseCarousel;