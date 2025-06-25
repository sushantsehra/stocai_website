"use client";

import React from "react";
import Image from "next/image";
import backglow from "@/assets/backglow.png"; // Background glow image
import image from "@/assets/talkingPeople.png"; // Side image

interface BenefitCardProps {
  title: string;
  description: string;
}

const BenefitCard = ({ title, description }: BenefitCardProps) => (
  <article className="grow shrink py-3 px-5 md:p-6  bg-white rounded-lg border border-solid shadow-md border-[color:var(--Primary-Teal,#54B0AF)] w-full">
    <h3 className="flex-1 shrink gap-4 max-w-full text-2xl font-semibold leading-8 basis-0 w-[243px] font-Gotham">
      {title}
    </h3>
    <p className="mt-1 md:mt-4 text-lg leading-7 font-Gotham">{description}</p>
  </article>
);

const BenefitsSection = () => {
  return (
    <section id="benefits" className="relative flex flex-col w-full min-h-[211px] max-md:max-w-full">
      {/* Title Section */}
      <div className="self-center mt-0 md:mt-8 max-w-full text-center w-[560px]">
        <h2 className="text-5xl font-bold text-black xs:leading-[50px] leading-[40px] md:leading-[62px] max-md:max-w-full max-md:text-4xl  font-quattrocento">
          Any time. Any place. <br />
          Any number of times.
        </h2>
        <p className="text-2xl leading-10 font-[325] text-neutral-700 max-md:max-w-full font-Gotham">
          Stocai is your accessible partner.
        </p>
      </div>

      {/* Content Section */}
      <div className="relative flex flex-col xs:px-4 p-0 items-center justify-center mt-16 w-full max-md:mt-10 max-md:max-w-full overflow-hidden">
        {/* Background Glow - Positioned Absolutely */}
        <Image
          src={backglow}
          alt="Background Decorative Element"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[2] w-full max-w-[900px] h-auto opacity-50 z-[-1]"
          width={900}
          height={900}
        />

        <div className="flex flex-wrap gap-10 items-start text-black max-w-[1200px] w-full mx-auto">
          {/* Left Side - Image */}
          <Image
            src={image}
            alt="Stocai benefits"
            className="object-contain aspect-square min-w-60 w-[443px] md:translate-x-[150px] lg:translate-x-0 max-md:max-w-full"
            width={443}
            height={443}
          />

          {/* Right Side - Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:mx-4 lg:mt-4 lg:mx-0 gap-4 md:gap-9 min-w-60 w-[716px] max-md:max-w-full relative px-4 md:px-0">
            <BenefitCard
              title="ICF-Backed Approach"
              description="Grounded in coaching principles for effective growth"
            />
            <BenefitCard
              title="Unlimited Conversations"
              description="Reflect as much as needed"
            />
            <BenefitCard
              title="Data Privacy & Security"
              description="Your reflections stay private and confidential"
            />
            <BenefitCard
              title="Customizable Reflections"
              description="Tailored to individual needs and preferences"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
