"use client";

import React from "react";
import Image from "next/image";
import ApoorvaMalhotra from "../assets/ApoorvaMalhotra.png";

const FEATURES = [
  {
    title: "Scientific Training System",
    description:
      "Research-backed frameworks that decode leadership competencies and decision-maker psychology.",
  },
  {
    title: "Clarity & Confidence Coaching",
    description:
      "Customized 1:1 sessions to identify your unique promotion path and eliminate self-doubt.",
  },
  {
    title: "Executive Accountability Partner",
    description:
      "Thoughtful check-ins to help you reflect, recalibrate, and move forward, without pressure.",
  },
  {
    title: "ICF-Certified Coach Sessions",
    description:
      "Support from coaches who've sat in promotion rooms and understand how decisions are actually made.",
  },
];

const TestimonialFeatures: React.FC = () => {
  return (
    <section className="w-full bg-[#F5F1EC] py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch">

          {/* ───────── LEFT: Testimonial Card ───────── */}
          <div className="w-full md:w-[38%] flex-shrink-0">

            {/* MOBILE */}
            <div className="relative bg-[#1A4EAB] rounded-2xl overflow-hidden md:hidden" style={{ minHeight: "320px" }}>
              
              <div className="relative z-10 pt-8 pl-5 pr-4 pb-8 w-[58%]">
                <p className="text-white text-[13px] leading-relaxed">
                  I knew that I was capable. I just didn&apos;t know what I needed to do to level up.
                </p>
                <p className="text-white text-[13px] leading-relaxed mt-3">
                  With every passing module, I saw where I was going wrong. I changed my beliefs and behaviour - and the action items brought me close to my promotion.
                </p>

                <div className="mt-8">
                  <p className="text-white font-semibold text-[13px]">
                    -Apoorva Malhotra
                  </p>
                  <p className="text-white/70 text-[11px] mt-0.5">
                    HR Business Partner
                  </p>
                </div>
              </div>

              <div className="absolute top-0 right-0 h-full w-[52%]">
                <Image
                  src={ApoorvaMalhotra}
                  alt="Apoorva Malhotra"
                  fill
                  className="object-cover object-top"
                  sizes="52vw"
                />
              </div>
            </div>

            {/* DESKTOP */}
            <div className="relative bg-[#1A4EAB] rounded-2xl overflow-hidden hidden md:flex flex-col h-full">

              {/* Decorative quote */}
              <div
                className="absolute top-4 left-5 text-white/20 font-serif select-none pointer-events-none"
                style={{ fontSize: "80px", lineHeight: 1 }}
              >
                &ldquo;
              </div>

              {/* Text */}
              <div className="relative z-10 pt-14 px-6 pb-4">
                <p className="text-white text-[14px] leading-relaxed">
                  I knew that I was capable. I just didn&apos;t know what I needed to do to level up.
                </p>
                <p className="text-white text-[14px] leading-relaxed mt-4">
                  With every passing module, I saw where I was going wrong. I changed my beliefs and behaviour - and the action items brought me close to my promotion.
                </p>

                <div className="mt-6 mb-2">
                  <p className="text-white font-semibold text-[14px]">
                    -Apoorva Malhotra
                  </p>
                  <p className="text-white/70 text-[12px] mt-0.5">
                    HR Business Partner
                  </p>
                </div>
              </div>

              {/* Image bottom fill */}
              <div className="relative flex-1 w-full" style={{ minHeight: "260px" }}>
                <Image
                  src={ApoorvaMalhotra}
                  alt="Apoorva Malhotra"
                  fill
                  className="object-cover object-top"
                  sizes="38vw"
                />
              </div>
            </div>
          </div>

          {/* ───────── RIGHT: Heading + Features ───────── */}
          <div className="w-full md:flex-1 flex flex-col justify-start">

            {/* Heading */}
            <div>
              <p className="text-[#1D1D1D] text-[16px]">
                If your colleagues moved up while you moved work, don&apos;t worry.
              </p>

              <h2
                className="text-[#1D1D1D] leading-tight mt-2 font-serif"
                style={{ fontSize: "clamp(34px, 4vw, 56px)", fontWeight: 600 }}
              >
                That. Ends. Here.
              </h2>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl p-7 flex flex-col gap-3 bg-[#EDE7DF]"
                >
                  <h3 className="text-[#1A4EAB] font-semibold text-[16px] leading-snug">
                    {feature.title}
                  </h3>

                  <p className="text-[#1D1D1D] text-[14px] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialFeatures;