"use client";

import React from "react";
import Image from "next/image";
import privacy from "@/assets/shield.png";

const OutcomeContract = () => {

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-white py-7 md:pt-6 md:pb-20 px-8 md:px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Top Heading */}
        <h2 className="text-[18px] md:text-4xl font-quattrocento font-bold text-black">
          That’s not all.
        </h2>

        <p className="mt-1 md:mt-6 text-[10px] md:text-lg font-normal font-inter text-black leading-4 md:leading-relaxed">
          You’re guided by an AI-powered reflection coach throughout.
          <br className="" />
          A private thinking partner, free of judgement
        </p>
      </div>

      {/* Black Card */}
      <div className="max-w-4xl mx-auto mt-8 md:mt-6">
        <div className="bg-[#000000] text-white rounded-[11px] px-8 md:px-20 py-6 md:pt-8 md:pb-12 shadow-xl">

          {/* Icon Placeholder */}
          <div className="flex justify-center mb-1 md:mb-8">
            <Image src={privacy} alt="Privacy Icon" width={32} height={32} />
          </div>

          {/* Title */}
          <h3 className="text-[18px] md:text-3xl font-quattrocento font-normal text-center font-medium">
            <span className="font-inter font-medium">Your</span> Outcome Contract
          </h3>

          <p className="text-white  font-inter font-normal text-center text-[9px] md:text-lg mt-1 md:mt-2">
            We&apos;re invested in your success. And here&apos;s our commitment.
          </p>

          {/* Columns */}
          <div className="flex flex-row md:justify-center gap-10 md:gap-24 mt-4 md:mt-10 text-left">

            {/* Left */}
            <div className="md:w-[220px]">
              <h4 className="text-[12px] md:text-xl font-medium font-inter mb-1 md:mb-6">
                We provide
              </h4>

              <ul className="space-y-0.5 md:space-y-4 text-[#FFFFFF] font-inter font-normal text-[10px] md:text-[16px]">
                <li>• The Complete Strategy</li>
                <li>• Playbooks</li>
                <li>• Resources & Templates</li>
                <li>• Weekly reviews</li>
                <li>• ICF Certified Coach</li>
              </ul>
            </div>

            {/* Right */}
            <div className="md:w-[250px]">
              <h4 className="text-[12px] md:text-xl font-medium font-inter mb-1 md:mb-6">
                You Commit to
              </h4>

              <ul className="space-y-0.5 md:space-y-4 text-[#FFFFFF] font-inter font-normal text-[10px] md:text-[16px]">
                <li>• Complete all modules</li>
                <li>• Create and Execute the Plan</li>
                <li>• Check-in weekly</li>
                <li>• Apply your learnings</li>
              </ul>
            </div>

          </div>

          {/* Refund Section */}
          <div className="text-center mt-5 md:mt-12 max-w-3xl md:max-w-4xl mx-auto">
            <p className="text-[#FFFFFF] text-[10px] font-normal font-inter md:text-lg leading-4 md:leading-relaxed">
              If you complete your commitments and don&apos;t see clear movement, email us for a full refund.
            </p>

            <p className="mt-0.5 md:mt-3 text-[#FFFFFF] text-[10px] font-bold font-inter md:text-lg">
              No questions asked.
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-4 md:mt-6">
            <button onClick={scrollToWaitlist} className="bg-white text-[#014BAA] px-6 md:px-10 py-2 md:py-3 rounded-full text-[12px] md:text-lg font-gotham font-semibold hover:scale-105 transition duration-300">
              Become more promotable
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OutcomeContract;