"use client";

import React from "react";
import Image from "next/image";
import EleenaR from "@/assets/EleenaR.jpg";
import MHussain from "@/assets/MHussain.jpg";
import VenkatramanA from "@/assets/VenkatramanA.jpg";
import quote from "@/assets/quote.png";

const CARDS = [
  {
    name: "Eleena R.",
    role: "Tech Lead",
    text: "Promoted to Senior Manager after 3 years of being overlooked.",
    image: EleenaR,
  },
  {
    name: "M. Hussain",
    role: "Marketing Manager",
    text: "Finally broke from Mid into Senior level with 40% salary increase.",
    image: MHussain,
  },
  {
    name: "Venkatraman A.",
    role: "Product Manager",
    text: "Gained the confidence to negotiate and bag my target role.",
    image: VenkatramanA,
  },
];

const StarIcon = () => (
  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2811L9 12.4377L3.70993 16.2811L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z" fill="#FFDD00" />
  </svg>
);

const SuccessStories = () => {
  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="w-full bg-white">

      {/* ===== MOBILE VIEW (md:hidden) ===== */}
      <div className="md:hidden p-1 bg-[#4D4D4D]">
        <div className="py-4 px-1">
          {/* Heading */}
          <div className="text-center text-[#F8F3F0]">
            <h2 className="text-[#F8F3F0] text-[20px] font-bold font-quattrocento mb-1">
              Success Stories
            </h2>
            <p className="font-medium font-jakarta text-[9px] text-[#F8F3F0]">
              <span className="bg-[#014BAA] px-[6px] py-[3px] rounded-[6px] mr-[8px] font-semibold">
                87%
              </span>
              of our beta graduates get promoted within 12 months
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-[5px] mt-[20px]">
            {CARDS.map((card, index) => (
              <div key={index} className="bg-[#2C2C2C] rounded-[10px] overflow-hidden flex flex-col border border-[#4D4D4D]">
                <div className="relative h-[100px]">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover"
                    sizes="33vw"
                    priority={index === 0}
                  />
                  <div className="absolute top-[6px] right-[6px] bg-[#014BAA] text-white px-[4px] py-[2px] rounded-[6px] text-[4px] z-10 font-medium font-inter">
                    Promoted
                  </div>
                </div>
                <div className="p-2 bg-[#181818] flex-grow">
                  <p className="text-[#F8F3F0] font-medium font-inter text-[5px] mt-2 mb-[10px] leading-[1.5]">
                    {card.text}
                  </p>
                  <h3 className="text-[#F8F3F0] font-medium font-inter text-[10px] mb-1">
                    {card.name}
                  </h3>
                  <p className="text-[#8B8B8B] font-medium font-inter text-[6px]">
                    {card.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="text-center mt-5">
            <button
              onClick={scrollToWaitlist}
              className="font-medium font-inter p-2 text-[8px] rounded-md bg-[#014BAA] text-white hover:bg-[#013A7A] transition-colors duration-200"
            >
              Request Access →
            </button>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP VIEW (hidden md:block) ===== */}
      <div className="hidden md:block py-20 bg-white">
        <div
          className="mx-auto bg-[#4D4D4D] rounded-[11px] flex flex-col items-center justify-center relative overflow-hidden py-[80px] px-[60px] max-w-[1800px]"
        >
          {/* Header Section */}
          <div className="flex flex-col items-center mt-[-40px]">
            <h2 className="font-inter font-medium text-[42px] leading-[100%] text-[#F8F3F0] text-center mb-6">
              Success Stories
            </h2>

            <div
              className="flex justify-between items-center mb-6"
              style={{ width: '105.62px', height: '16.5px' }}
            >
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>

            <p className="font-inter font-medium text-[19px] leading-[100%] text-[#F8F3F0] flex items-center">
              <span className="bg-[#014BAA] px-2 py-1 rounded-[6px] mr-3 font-semibold text-[19px]">
                87%
              </span>
              of our beta graduates get promoted within 12 months
            </p>
          </div>

          {/* Cards Grid */}
          <div className="flex justify-center gap-[40px] mt-16 px-10 w-full">
            {CARDS.map((card, index) => (
              <div
                key={index}
                className="bg-[#2C2C2C] rounded-[10px] overflow-hidden flex flex-col border border-[#4D4D4D]"
                style={{ width: '360.9px', height: '447.9px' }}
              >
                <div
                  className="relative border-b border-[#4D4D4D]"
                  style={{ width: '361px', height: '211px' }}
                >
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover rounded-t-[10px]"
                    sizes="361px"
                  />
                  <div className="absolute top-4 right-4 bg-[#014BAA] text-white px-3 py-1 rounded-[6px] text-xs z-10 font-medium font-inter">
                    Promoted
                  </div>
                </div>
                <div className="p-8 bg-[#181818] flex-grow flex flex-col justify-start">
                  <Image
                    src={quote}
                    alt="quote"
                    width={21}
                    height={18}
                    className="mb-4"
                    style={{ width: '21.27px', height: '18.1px' }}
                  />
                  <p className="text-[#F8F3F0] font-medium font-inter text-[21px] leading-[1.2] mb-2 md:mb-4">
                    {card.text}
                  </p>
                  <h3 className="text-[#F8F3F0] font-medium font-inter text-[21px] mb-0 md:mb-1">
                    {card.name}
                  </h3>
                  <p className="text-[#8B8B8B] font-inter font-medium text-[13px] leading-[100%]">
                    {card.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="mt-12 mb-[-20px]">
            <button
              onClick={scrollToWaitlist}
              className="bg-[#014BAA] text-white px-10 py-4 text-[18px] rounded-md font-medium font-inter hover:bg-[#013A7A] transition-colors duration-200"
            >
              Request Access →
            </button>
          </div>
        </div>
      </div>

    </section >
  );
};

export default SuccessStories;