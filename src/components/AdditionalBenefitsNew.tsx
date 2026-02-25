"use client";

import React from "react";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";

import applicationIcon from "../assets/application.png";
import bookIcon from "../assets/book.png";
import connectionIcon from "../assets/communities.png";
import achieveIcon from "../assets/roadmap.png";
import aiIcon from "../assets/chatbot.png";

const AdditionalBenefitsNew = () => {
  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const benefits = [
    {
      icon: applicationIcon,
      title: "12 month access to apps for:",
      items: [
        "Delegation (LNO framework)",
        "Stakeholder Management",
        "Personal Branding",
      ],
      originalPrice: "₹18,000",
      currentPrice: "₹0",
    },
    {
      icon: bookIcon,
      title: "How to handle office politics ",
      highlight: "Ebook",
      originalPrice: "₹750",
      currentPrice: "₹0",
    },
    {
      icon: aiIcon,
      title: "12 month access to agent to ",
      highlight: "practice promotion pitch",
      originalPrice: "₹1,000",
      currentPrice: "₹0",
    },
    {
      icon: achieveIcon,
      title: "12 month access to ",
      highlight: "personalized action plan",
      extra: " and training",
      originalPrice: "₹3,000",
      currentPrice: "₹0",
    },
    {
      icon: connectionIcon,
      title: "Community access to ",
      highlight: "mentorship events",
      extra: " by senior",
      originalPrice: "₹6,000",
      currentPrice: "₹0",
    },
  ];

  return (
    <section className="bg-white py-8 md:py-12 px-4 container mx-auto max-w-7xl">

      {/* Title */}
      <h2 className="text-center text-[#0F1729] font-quattrocento font-bold 
                     text-[18px] sm:text-[28px] md:text-[40px] 
                     mb-4 md:mb-8">
        What additional you are getting
      </h2>

      {/* Container */}
      <div className="bg-[#E6F1FF] rounded-t-[12px] overflow-hidden">

        {benefits.map((item, index) => (
          <div
            key={index}
            className="flex gap-1 sm:gap-5 
                       px-4 sm:px-8 md:px-12 
                       py-4 sm:py-8 md:py-10
                       border-b border-[#0B64F433]"
          >

            {/* Icon */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 mt-0">
              <Image
                src={item.icon}
                alt="icon"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>

            {/* Content */}
            <div className="flex-1">

              <h3 className="font-inter font-semibold 
                             text-[12px] sm:text-[18px] md:text-[22px]
                             leading-snug">
                {item.title}
                {item.highlight && (
                  <span className="text-[#014BAA] font-inter font-bold text-[12px] sm:text-[18px] md:text-[22px]">
                    {item.highlight}
                  </span>
                )}
                {item.extra && (
                  <span>{item.extra}</span>
                )}
              </h3>

              {item.items && (
                <ul className="mt-1 md:mt-3 space-y-0.5 md:space-y-1">
                  {item.items.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-[10px] font-jakarta font-normal sm:text-[15px] md:text-[18px]
                                 text-black flex"
                    >
                      <span className="mr-2">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Pricing */}
            <div className="text-right flex flex-col items-end justify-center min-w-[60px]">

              <span className="text-[12px] sm:text-[14px] md:text-[18px]
                               text-black/30 font-inter font-medium line-through">
                {item.originalPrice}
              </span>

              <span className="text-[#014BAA] font-jakarta
                               text-[20px] sm:text-[28px] md:text-[34px]
                               font-extrabold">
                {item.currentPrice}
              </span>

            </div>

          </div>
        ))}

        {/* CTA */}
        <div className="bg-black rounded-b-[28px] py-6 flex justify-center">
          <button
            onClick={scrollToWaitlist}
            className="border border-white text-white 
                       px-12 py-2 md:py-3 rounded-full 
                       font-semibold font-jakarta text-[10px] sm:text-[16px]
                       hover:scale-[1.03] transition"
          >
            REQUEST ACCESS
          </button>
        </div>

      </div>
    </section>
  );
};

export default AdditionalBenefitsNew;