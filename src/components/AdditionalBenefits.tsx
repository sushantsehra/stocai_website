
"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import applicationIcon from "../assets/application.png";
import bookIcon from "../assets/book.png";
import connectionIcon from "../assets/communities.png";
import achieveIcon from "../assets/roadmap.png";
import aiIcon from "../assets/chatbot.png";


interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  highlightedText?: string;
  additionalText?: string;
  items?: string[];
  originalPrice: string;
  currentPrice: string;
}

const AdditionalBenefits = () => {
  useEffect(() => {
    console.log("✅ AdditionalBenefits component mounted");
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error("❌ Element with id='waitlist-section' not found");
    }
  };

  const benefits: BenefitItem[] = [
    {
    //   icon: <Grid3x3 className="w-6 h-6 sm:w-7 sm:h-7" />,
      icon: <Image src={applicationIcon} alt="Application Icon" width={32} height={32} style={{ objectFit: "contain" }} />,
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
    //   icon: <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />,
      icon: <Image src={bookIcon} alt="Book Icon" width={32} height={32} style={{ objectFit: "contain" }} />,
      title: "How to handle office politics - ",
      highlightedText: "Ebook",
      originalPrice: "₹750",
      currentPrice: "₹0",
    },
    {
    //   icon: <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />,
      icon: <Image src={aiIcon} alt="AI Icon" width={32} height={32} style={{ objectFit: "contain" }} />,
      title: "12 month access to agent to ",
      highlightedText: "practice promotion pitch",
      originalPrice: "₹1,000",
      currentPrice: "₹0",
    },
    {
    //   icon: <Target className="w-6 h-6 sm:w-7 sm:h-7" />,
      icon: <Image src={achieveIcon} alt="Achieve Icon" width={32} height={32} style={{ objectFit: "contain" }} />,
      title: "12 month access to ",
      highlightedText: "personalized action plan",
      additionalText: " and training",
      originalPrice: "₹3,000",
      currentPrice: "₹0",
    },
    {
    //   icon: <Users className="w-6 h-6 sm:w-7 sm:h-7" />,
      icon: <Image src={connectionIcon} alt="Connection Icon" width={32} height={32} style={{ objectFit: "contain" }} />,
      title: "Community access to ",
      highlightedText: "mentorship events",
      additionalText: " by senior",
      originalPrice: "₹6,000",
      currentPrice: "₹0",
    },
  ];

  return (
    <section
      id="additional-benefits"
      className="py-12 sm:py-16 lg:py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Icon */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div   style={{
    boxShadow: "0px 0px 40px rgba(11, 100, 244, 0.3)",
  }} className="w-16 h-16 sm:w-[64px] sm:h-[64px] rounded-[16px] bg-[#0B64F4] rounded-2xl flex items-center justify-center shadow-[0_0_40px_0_rgba(11,100,244,0.3)] ">
            <span className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
                {/* + */}
                <FiPlus className="text-white text-[48px]" />
                </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-[48px] font-jakarta font-bold text-black text-center mb-8 sm:mb-12 px-4">
          What additional you are getting
        </h2>

        {/* Benefits Container */}
        {/* rgb(245, 249, 255) (11, 100, 244, 0.04) */}
      <div style={{ backgroundColor: "rgb(245, 249, 255)", borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px", overflow: "hidden" }} className="">
        <div className="space-y-0">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={{ backgroundColor: "rgb(245, 249, 255)", borderBottom: "1px solid rgba(11, 100, 244, 0.2)", padding: "2.5rem", }}
              className="p-6 sm:p-7 lg:p-12 flex items-start gap-4 sm:gap-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Icon */}
              <div className="flex-shrink-0 text-black mt-1">{benefit.icon}</div>

              {/* Content */}
              <div className="flex-1 min-w-0 text-left">
                <h3 className="text-base sm:text-lg md:text-[20px] lg:text-[24px] font-jakarta font-semibold text-black leading-relaxed">
                  {benefit.title}
                  {benefit.highlightedText && (
                    <span className="text-[#0B64F4] font-bold">
                      {benefit.highlightedText}
                    </span>
                  )}
                  {benefit.additionalText && (
                    <span className="text-black font-medium">
                      {benefit.additionalText}
                    </span>
                  )}
                </h3>

                {/* Bullet Points */}
                {benefit.items && (
                  <ul className="space-y-1 mt-3 ml-0">
                    {benefit.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm sm:text-base md:text-[16px] lg:text-[20px] text-[#000000] font-jakarta font-normal flex items-start"
                      >
                        <span className="mr-2 text-black">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Pricing */}
              <div className="flex-shrink-0 text-right ml-4 flex gap-4 md:gap-8">
                <div style={{ color: "rgba(0, 0, 0, 0.3)" }} className=" text-sm sm:text-base md:text-[16px] lg:text-[18px] font-jakarta font-medium line-through mb-1 flex justify-center items-center">
                  {benefit.originalPrice}
                </div>
                <div className="text-[#0B64F4] text-2xl sm:text-3xl md:text-[32px] lg::text-[38px] font-extrabold font-jakarta">
                  {benefit.currentPrice}
                </div>
              </div>
            </div>
          ))}
        </div>
       </div>

        {/* CTA Button */}
        <div   style={{
            borderBottomLeftRadius: "30px",
            borderBottomRightRadius: "30px",
            padding: "1.9rem",
        }}
        className="bg-black rounded-b-[30px] flex justify-center items-center">
        <button
            onClick={scrollToWaitlist}
            className="px-12 sm:px-16 lg:px-20 py-2 h-[56px] sm:h-[60px]  border border-white rounded-full text-white font-bold font-jakarta text-base sm:text-lg lg:text-[18px] tracking-wide transition-all duration-200 ease-in-out transform hover:scale-[1.03] active:scale-95"
        >
            REQUEST ACCESS
        </button>
        </div>

      </div>
    </section>
  );
};

export default AdditionalBenefits;
