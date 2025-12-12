"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import ThoughtLeadershipStrategy from "../assets/ThoughtLeadershipStrategy.png";
import PersonalBrandBlueprint from "../assets/PersonalBrandBlueprint.png";
import LinkedinIcon from "../assets/LinkedinIcon.png";
import ExecutivePresenceAudit from "../assets/ExecutivePresenceAudit.png";

type Feature = {
  id: string | number;
  title: string;
  desc: string;
};

const DEFAULT_FEATURES: Feature[] = [
  {
    id: 1,
    title: "LinkedIn Profile Optimization",
    desc: "Complete makeover with professional copywriting",
  },
  {
    id: 2,
    title: "Thought Leadership Strategy",
    desc: "90-day content plan to establish your expertise",
  },
  {
    id: 3,
    title: "Executive Presence Audit",
    desc: "Video analysis and feedback on your communication style",
  },
  {
    id: 4,
    title: "Personal Brand Blueprint",
    desc: "Custom strategy document for your industry and role",
  },
];

const ICON_MAP: Record<number | string, StaticImageData | null> = {
  1: LinkedinIcon,
  2: ThoughtLeadershipStrategy,
  3: ExecutivePresenceAudit,
  4: PersonalBrandBlueprint,
};

const FeatureRow: React.FC<{ feature: Feature }> = ({ feature }) => {
  const Icon = ICON_MAP[feature.id] ?? null;

  return (
    <div className="bg-white rounded-xl shadow-xl border border-transparent hover:border-black/5 transition p-4 md:p-1.5 flex items-start gap-4">
      {/* Icon area (uses asset if available, otherwise keeps a small SVG fallback) */}
      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center overflow-hidden">
        {Icon ? (
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-32 md:h-36">
            <Image src={Icon} alt={`${feature.title} icon`} fill style={{ objectFit: "contain" }} />
          </div>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 7h18" stroke="#174BAA" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M8 12h8" stroke="#174BAA" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M10 17h4" stroke="#174BAA" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </div>

      <div className="min-w-0">
        <h4 className="text-sm sm:text-base lg:text-[21.85px] font-gotham font-bold text-[#1D1D1D] truncate">
          {feature.title}
        </h4>
        <p className="mt-1 text-xs sm:text-[14px] md:text-[15px] font-gotham font-normal text-[#1D1D1D] leading-snug">
          {feature.desc}
        </p>
      </div>
    </div>
  );
};

type FounderBonusProps = {
  features?: Feature[];
  valueLabel?: string;
  valueAmount?: string;
  priceLabel?: string;
  priceText?: string;
  ctaLabel?: string;
//   onRegister?: () => void;
};

const FounderBonus: React.FC<FounderBonusProps> = ({
  features = DEFAULT_FEATURES,
  valueLabel = "Value",
  valueAmount = "₹25,000",
  priceLabel = "Your Price",
  priceText = "Included FREE",
  ctaLabel = "Register for bonus",
//   onRegister,
}) => {
  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="mb-6 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-gotham font-bold text-[#014BAA]">
            Exclusive Founder&apos;s Bonus:
          </h2>
          <h3 className="mt-2 text-3xl sm:text-4xl lg:text-[42px] font-gotham font-normal text-[#1D1D1D]">
            Personal Branding Accelerator
          </h3>
          <p className="mt-3 text-sm sm:text-[19px] text-[#1D1D1D] font-gotham font-normal leading-relaxed">
            Only available to our <span className="font-bold font-gotham text-[#014BAA]">first 50 members</span>
          </p>
        </div>

        {/* Main grid: features (left) + value card (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: features list (spans 7 on large screens) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Each feature row with consistent spacing and shadows */}
            {features.map((f) => (
              <FeatureRow key={f.id} feature={f} />
            ))}
          </div>

          {/* Right: big blue card (spans 5 on large screens) */}
          <div className="lg:col-span-5">
            <div className="bg-[#174BAA] text-white rounded-2xl shadow-xl p-6 sm:p-8 h-full flex flex-col justify-center">
              <div className="text-center">
                <div className="text-sm sm:text-[20px] md:text-[28px] font-gotham font-normal">{valueLabel}</div>
                <div className="text-3xl sm:text-4xl md:text-[40px] lg:text-[44px] font-gotham text-[#F8F3F0] font-bold tracking-tight">
                  {valueAmount}
                </div>

                <div className="mt-8 sm:mt-12 text-sm sm:text-[20px] md:text-[28px] font-gotham font-normal text-[#F8F3F0]">
                  {priceLabel}
                </div>
                <div className="mt-1 text-xl sm:text-2xl md:text-[36px] lg:text-[40px] font-gotham font-bold">
                  {priceText}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA centered */}
        <div className="mt-10 flex justify-center rounded-[12px]">
          <button
            // onClick={onRegister}
            className="inline-flex items-center gap-3 bg-[#014BAA] text-white text-[17px] font-gotham font-normal px-6 sm:px-8 py-3 rounded-[12px] shadow-md hover:shadow-lg transition"
          >
            <span className="font-medium">{ctaLabel}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FounderBonus;