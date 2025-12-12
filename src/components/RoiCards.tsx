"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
// import backgroundROI from "../assets/backgroundROI.png";

type RoiCardsProps = {
  price?: string;
  originalPrice?: string;
  priceNote?: string;
  leftBadge?: string;
  rightCopy?: string;
  rightBadge?: string;
  headline?: React.ReactNode;
  subcopy?: string;
  leftImage?: StaticImageData | string;
  rightImage?: StaticImageData | string;
};

const CornerBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center justify-center px-3 py-1  rounded-[4px] max-w-[100px] bg-white font-gotham text-[10px] font-medium text-[#014BAA] shadow-sm border border-white whitespace-nowrap">
    {children}
  </span>
);

const RoiCards: React.FC<RoiCardsProps> = ({
  price = "₹13,850",
  originalPrice = "₹25,000",
  priceNote = "to become promotion-ready",
  leftBadge = "Promotional Offer",
  rightCopy = (
    <>
    <p className="font-gotham font-normal text-[18px] text-white leading-6">
    The subsequent compounding impact of the level-up over next{" "}  <span className="font-bold">
        12–24 months
    </span>
    </p>
    </>
  ),
  rightBadge = (
    <>
    <span>
        Immeasurable <br/> Benefits
    </span>
    </>
  ),
  headline = (
    <>
      <span className="text-[#014BAA] font-bold font-gotham text-[42px]">Your ROI.</span>{" "}
      <span className="text-[#161616] font-gotham text-[42px] font-medium">In plain numbers.</span>
    </>
  ),
  subcopy = 'Skip the ₹60k–₹3L "leadership workshops" that don\'t change behavior. This is an operating system, not a lecture.',
  leftImage,
  rightImage,
}) => {
  return (
    <section className="w-full py-12 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* radial glow behind center card */}
          {/* <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div
              style={{
                width: "900px",
                height: "520px",
                filter: "blur(80px)",
                background:
                  "radial-gradient(closest-side, rgba(20, 103, 236, 0.18), rgba(17, 98, 229, 0.06) 40%, rgba(36, 140, 226, 0))",
                transform: "translateY(-10px)",
              }}
              className="hidden lg:block rounded-full"
            />
          </div> */}
          {/* radial glow — centered, responsive, tuned colors/opacity */}
            <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
                className="hidden lg:block rounded-full"
                style={{
                width: "70vw",           /* scales with viewport */
                maxWidth: "900px",       /* don't grow beyond design */
                height: "44vw",
                maxHeight: "520px",

                /* soft heavy blur and slight upward shift (matches mock) */
                filter: "blur(72px)",
                transform: "translateY(-16px)",
                willChange: "transform, filter",

                background:
                    "radial-gradient(closest-side, rgba(79, 133, 233, 1) 0%, rgba(81, 135, 236, 1) 22%, rgba(67, 121, 222, 1) 40%, rgba(255,255,255,1) 75%)",

                boxShadow: "0 18px 40px rgba(9,30,66,0.06)",
                }}
            />
            </div>

          {/* stacking canvas */}
          <div className="relative z-0 min-h-[360px] lg:min-h-[420px]">
            {/* Left blue card - absolutely positioned behind center */}
            <div className="hidden lg:block absolute left-6 top-8 w-[320px]">
              <div className="relative overflow-visible">
                <div className="bg-[#174BAA] text-white rounded-2xl shadow-lg px-8 py-8 w-full min-h-[220px]">
                  {/* top-left original price */}
                  <div className="text-[28px] font-gotham font-normal line-through">{originalPrice}</div>

                  <div className="mt-1">
                    <div className="text-[49.1px] font-normal font-gotham leading-tight tracking-tight">{
                      price
                    }</div>
                    <div className="mt-1 text-[18px] font-gotham font-normal max-w-[200px]">{priceNote}</div>
                  </div>

                  {leftImage ? (
                    <div className="mt-4">
                      <Image src={leftImage} alt="" width={96} height={48} className="object-contain" />
                    </div>
                  ) : null}
                </div>

                {/* absolute badge - top-right corner of the left card */}
                <div className="absolute top-4 right-3">
                  <CornerBadge>{leftBadge}</CornerBadge>
                </div>
              </div>
            </div>

            {/* Right blue card - absolutely positioned behind center */}
            <div className="hidden lg:block absolute right-6 top-64 w-[344px]">
              <div className="relative overflow-visible">
                <div className="bg-[#014BAA] text-white rounded-2xl shadow-lg px-6 py-8 w-full min-h-[220px] ">
                  <div className="mt-20 text-sm sm:text-base leading-relaxed max-w-[280px] text-left mx-auto">
                    {rightCopy}
                  </div>

                  {rightImage ? (
                    <div className="mt-4">
                      <Image src={rightImage} alt="" width={96} height={48} className="object-contain" />
                    </div>
                  ) : null}
                </div>

                {/* absolute badge - top-left corner inside this right card */}
                <div className="absolute top-3 right-3">
                  <CornerBadge>{rightBadge}</CornerBadge>
                </div>
              </div>
            </div>

            {/* MOBILE / SMALL: stack cards vertically in order: left -> center -> right */}
            <div className="lg:hidden flex flex-col gap-6 items-center">
              {/* small left card for mobile */}
              <div className="bg-[#174BAA] text-white rounded-2xl shadow-lg px-6 py-6 w-[90%]">
                <div className="flex justify-between items-start">
                  <div className="text-sm opacity-90 line-through">{originalPrice}</div>
                  <div className="ml-2">
                    <CornerBadge>{leftBadge}</CornerBadge>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-4xl font-extrabold">{price}</div>
                  <div className="mt-2 text-sm opacity-90">{priceNote}</div>
                </div>
              </div>
            </div>

            {/* Center white card - topmost and centered */}
            <div className="relative z-40 mx-auto mt-0 lg:mt-0 max-w-[690px] w-full md:top-28">
              <div className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(9,30,66,0.08)] px-6 sm:px-10 py-6 sm:py-8 md:py-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                  {headline}
                </h3>
                <p className="mt-4 text-sm sm:text-[21px] text-[#000000] font-gotham font-normal max-w-3xl">
                  {subcopy}
                </p>
              </div>
            </div>

            {/* Desktop-only small spacer block to ensure center overlaps and sidecards peek */}
            <div className="hidden lg:block">
              {/* This invisible block ensures the container height accommodates absolute side cards */}
              <div className="h-[1px] mt-10" />
            </div>

            {/* Desktop fallback: small right/left cards for mobile are above/below; we already rendered left mobile card above */}
            <div className="lg:hidden flex flex-col gap-6 items-center mt-4">
              <div className="bg-[#174BAA] text-white rounded-2xl shadow-lg px-6 py-6 w-[90%]">
                <div className="flex justify-end">
                  <CornerBadge>{rightBadge}</CornerBadge>
                </div>
                <div className="mt-2 text-sm leading-relaxed">{rightCopy}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RoiCards;