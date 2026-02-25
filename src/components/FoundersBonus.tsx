"use client";

import React from "react";

const bonusItems = [
  {
    title: "LinkedIn Profile Optimization",
    description:
      "Complete makeover with professional copywriting",
  },
  {
    title: "Thought Leadership Strategy",
    description:
      "90-day content plan to establish your expertise",
  },
  {
    title: "Executive Presence Audit",
    description:
      "Video analysis and feedback on your communication style",
  },
  {
    title: "Personal Brand Blueprint",
    description:
      "Custom strategy document for your industry and role",
  },
];

const FoundersBonus = () => {
  return (
    <section className="w-full bg-[#FFFFFF] py-10 md:py-16 px-4 md:px-12">
      <div className="max-w-[1200px] mx-auto">

        {/* Heading */}
        <div className="mb-5 md:mb-14">
          <h2 className="font-quattrocento font-normal
                         text-[18px] sm:text-[26px] md:text-[42px] lg:text-[50px] 
                         leading-tight text-[#1D1D1D]">
            Exclusive{" "}
            <span className="text-[#014BAA] font-bold">
              Founder&apos;s Bonus:
            </span>
            <br />
            Personal Branding Accelerator
          </h2>

          <p className="mt-0.5 md:mt-4 
                        text-[13px] sm:text-[15px] md:text-[20px] 
                        text-[#1D1D1D] font-quattrocento font-normal">
            Only available to our{" "}
            <span className="text-[#014BAA]">
              first 50
            </span>{" "}
            members
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">

          {/* Left Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-1.5 sm:gap-4 md:gap-6">

            {bonusItems.map((item, index) => (
              <div
                key={index}
                className="
                  bg-[#E6F1FF]
                  rounded-[8px]
                  p-2 sm:p-5 md:p-10
                "
              >
                <h3 className="
                  font-quattrocento font-bold
                  text-[9.5px] sm:text-[14px] md:text-[24px]
                  text-[#1D1D1D]
                  mb-1 sm:mb-2 md:mb-3
                  leading-3 md:leading-snug
                ">
                  {item.title}
                </h3>

                <p className="
                  font-inter font-normal
                  text-[8px] sm:text-[13px] md:text-[18px]
                  text-[#1D1D1D]
                  leading-snug md:leading-relaxed mt-2.5 md:mt-2
                ">
                  {item.description}
                </p>
              </div>
            ))}

          </div>

          {/* Pricing Card */}
          <div className="
              bg-[#0F0F10]
              rounded-[20px] md:rounded-[28px]
              p-6 sm:p-8 md:p-12
              flex flex-col justify-center items-center text-center
              min-h-[200px] mx-2 sm:min-h-[320px] md:min-h-[520px]
            ">

            <h4 className="
              font-quattrocento font-bold
              text-[16px] sm:text-[20px] md:text-[36px]
              text-[#0054C0]
              mb-0 md:mb-4
            ">
              Value
            </h4>

            <p className="
              text-[18px] sm:text-[28px] md:text-[60px]
              font-bold font-inter
              text-[#F8F3F0]
              mb-5 md:mb-10
            ">
              ₹25,000
            </p>

            <h4 className="
              font-quattrocento font-bold
              text-[16px] sm:text-[20px] md:text-[36px]
              text-[#0054C0]
              mb-0 md:mb-4
            ">
              Your Price
            </h4>

            <p className="
              text-[18px] sm:text-[28px] md:text-[60px]
              font-bold font-inter
              text-[#F8F3F0]
              leading-tight
            ">
              Included <br /> FREE
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FoundersBonus;