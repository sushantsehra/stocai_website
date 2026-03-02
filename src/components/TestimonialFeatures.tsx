"use client";

import React from "react";
import Image from "next/image";
import ApoorvaMalhotra from "../assets/ApoorvaMalhotra.png";
import learning from "../assets/learning.png";
import helpingHand from "../assets/helpingHand.png";
import qualityCertificate from "../assets/qualityCertificate.png";
import realtor from "../assets/realtor.png";


// const FEATURES = [
//   {
//     title: "Scientific Training System",
//     description:
//       "Research-backed frameworks that decode leadership competencies and decision-maker psychology.",
//   },
//   {
//     title: "Clarity & Confidence Coaching",
//     description:
//       "Customized 1:1 sessions to identify your unique promotion path and eliminate self-doubt.",
//   },
//   {
//     title: "Executive Accountability Partner",
//     description:
//       "Thoughtful check-ins to help you reflect, recalibrate, and move forward, without pressure.",
//   },
//   {
//     title: "ICF-Certified Coach Sessions",
//     description:
//       "Support from coaches who’ve sat in promotion rooms and understand how decisions are actually made.",
//   },
// ];

const FEATURES = [
  {
    title: "Scientific Training System",
    description:
      "Research-backed frameworks that decode leadership competencies and decision-maker psychology.",
    icon: learning,
  },
  {
    title: "Clarity & Confidence Coaching",
    description:
      "Customized 1:1 sessions to identify your unique promotion path and eliminate self-doubt.",
    icon: helpingHand,
  },
  {
    title: "Executive Accountability Partner",
    description:
      "Thoughtful check-ins to help you reflect, recalibrate, and move forward, without pressure.",
    icon: realtor,
  },
  {
    title: "ICF-Certified Coach Sessions",
    description:
      "Support from coaches who’ve sat in promotion rooms and understand how decisions are actually made.",
    icon: qualityCertificate,
  },
];

const TestimonialFeatures: React.FC = () => {
  return (
    <section className="w-full bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto py-5 md:py-20 flex flex-col md:flex-row gap-4 md:gap-0 items-end">

        {/* LEFT — Testimonial Card */}
        <div className="w-full md:w-[40%] flex-shrink-0">

          {/* MOBILE VERSION */}
          <div className="relative bg-[#1A4EAB] md:rounded-2xl overflow-hidden md:hidden h-[400px] flex">
            {/* Left text section */}
            <div style={{
              width: "50%",
            }} className="absolute left-0 top-0 bottom-0 w-[50%] z-10 p-5 ml-3 flex flex-col justify-center">
              <p className="text-white text-[12px] font-inter font-normal leading-4">
                I knew that I was capable. I just didn’t know what I needed to do to level up.
              </p>
              <p className="text-white text-[12px] font-inter font-normal leading-4 mt-5">
                With every passing module, I saw where I was going wrong. I changed my beliefs and behaviour – and the action items brought me close to my promotion.
              </p>

              <div className="mt-10">
                <p
                  className="text-[#F8F3F0] font-medium font-inter text-[16px]">
                  – Apoorva Malhotra
                </p>
                <p className="text-white/50 font-medium font-inter text-[13px] mt-0.5 ml-[5%]">
                  HR Business Partner
                </p>
              </div>
            </div>

            {/* Right image */}
            <div className="absolute right-0 top-0 h-full w-[85%]">
              <Image
                src={ApoorvaMalhotra}
                alt="Apoorva Malhotra"
                // fill
                width={350}
                height={600}
                sizes="60vw"
                className="object-cover object-top translate-x-20"
                priority
              />
            </div>
          </div>

          {/* DESKTOP VERSION */}
          <div className="hidden md:flex flex-col bg-[#014BAA] rounded-[11px] overflow-hidden w-[445px] h-[696px]">
            {/* Text Content */}
            <div style={{
              borderRadius: "11px",
            }} className="relative flex flex-col justify-start pt-16 px-7 pb-5 rounded-[11px]">
              {/* Decorative quote */}
              <div
                className="absolute top-4 left-3 text-white font-serif select-none pointer-events-none text-[80px] leading-tight rounded-[11px]"
              >
                &ldquo;
              </div>

              <p className="text-white text-[17px] leading-6 relative z-10">
                I knew that I was capable. I just didn’t know what I needed to do to level up.
              </p>
              <p className="text-white text-[17px] leading-6 mt-4 relative z-10">
                With every passing module, I saw where I was going wrong. I changed my beliefs and behaviour – and the action items brought me close to my promotion.
              </p>

              <div className="mt-8 relative z-10">
                <p className="text-[#F8F3F0] font-semibold text-[17px]">
                  – Apoorva Malhotra
                </p>
                <p className="text-white/70 text-[12px] mt-0.5">
                  HR Business Partner
                </p>
              </div>
            </div>

            <div
              className="relative flex-1 w-full min-h-[300px] flex justify-end items-end"
            >
              <Image
                src={ApoorvaMalhotra}
                alt="Apoorva Malhotra"
                height={600}
                width={400}
                sizes="30vw"
                className="object-cover object-top translate-x-12 translate-y-4 relative z-20"
                priority
              />
            </div>
          </div>
        </div>

        {/* RIGHT — Heading + Features */}
        <div className="hidden sm:block w-full md:flex-1 flex flex-col justify-start">
          {/* Heading */}
          <div>
            <p className="font-inter font-medium text-[21.8px] md:text-[25px] leading-normal tracking-normal text-[#1D1D1D] p-2">
              If your colleagues moved up while you moved work, don&apos;t worry.
            </p>
            <h2 className="text-[#1D1D1D] font-quattrocento font-bold text-start leading-tight mt-0 text-[clamp(42px,4vw,56px)]">
              That. Ends. Here.
            </h2>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-6 mt-4">
            {FEATURES.map((feature) => (
              // <div
              //   key={feature.title}
              //   className="bg-[#EEE5DF] min-h-[271px] rounded-2xl p-6 sm:p-7 hover:bg-[#e9dfd3] transition-colors duration-200"
              // >
              //   <h3 className="text-[#014BAA] font-normal font-quattrocento text-[24.85px] leading-8 mb-2 mt-16">
              //     {feature.title}
              //   </h3>
              //   <p className="text-[#1D1D1D] font-normal font-jakarta text-[17px] leading-6">
              //     {feature.description}
              //   </p>
              // </div>
              <div
                key={feature.title}
                className="relative bg-[#EEE5DF] min-h-[271px] rounded-2xl p-6 sm:p-7 hover:bg-[#e9dfd3] transition-colors duration-200"
              >
                {/* ICON TOP RIGHT */}
                <div className="absolute top-5 right-5">
                  <Image
                    src={feature.icon}
                    alt="icon"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-[#014BAA] font-quattrocento text-[24.85px] leading-8 mb-2 mt-10">
                  {feature.title}
                </h3>

                <p className="text-[#1D1D1D] font-jakarta text-[17px] leading-6">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Text */}
          {/* <div className="text-center md:text-left text-[#1D1D1D] text-[13px] sm:text-[14px] mt-10">
            <p>
              25+ years of experience | 100+ teams led | ICF-certified coaching | 2 months of hands-on support
            </p>
          </div> */}
        </div>

        {/* Mobile version — Heading + Features */}
        <div className="block sm:hidden w-full md:flex-1 flex flex-col justify-start">
          {/* Heading */}
          <div>
            <p
              style={{
                fontSize: "11px",
                color: "#1D1D1D",
              }}
              className="text-[#1D1D1D] text-center font-medium font-inter text-[14px] sm:text-[14px] p-2">
              If your colleagues moved up while you moved work, don&apos;t worry.
            </p>
            <h2
              style={{
                color: "#1D1D1D",
                // fontSize: "24px",
              }}
              className="text-[#1D1D1D] font-quattrocento font-bold text-center leading-tight mt-0 text-[18px] sm:text-[24px]">
              That. Ends. Here.
            </h2>
          </div>

          {/* Feature Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "14px",
              marginTop: "8px",
            }}
            className="grid grid-cols-2  gap-2 mt-10 p-2 px-6">
            {FEATURES.map((feature) => (
              // <div
              //   key={feature.title}
              //   style={{
              //     backgroundColor: "#E6F1FF",
              //     borderRadius: "5px",
              //   }}
              //   className="bg-[#E6F1FF] flex flex-col gap-1 max-w-[200px] md:max-w-auto rounded-[5px] p-4 sm:p-7 hover:bg-[#e9dfd3] transition-colors duration-200"
              // >
              //   <div>
              //     <h3
              //       className="text-[#014BAA] font-bold font-quattrocento text-[12px] font-semibold leading-4 mb-1">
              //       {feature.title}
              //     </h3>
              //   </div>
              //   <div>
              //     <p className="text-[#1D1D1D] text-[8px] font-normal font-inter leading-3">
              //       {feature.description}
              //     </p>
              //   </div>

              // </div>
              <div
                key={feature.title}
                className="relative bg-[#E6F1FF] rounded-[8px] p-4 flex flex-col gap-2"
              >
                {/* ICON TOP RIGHT */}
                <div className="absolute top-3 right-3">
                  <Image
                    src={feature.icon}
                    alt="icon"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-[#014BAA] font-quattrocento text-[12px] font-semibold leading-4 pr-6">
                  {feature.title}
                </h3>

                <p className="text-[#1D1D1D] text-[9px] font-inter leading-3 pr-6">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Text */}
          <div className="text-center md:text-left text-[#1D1D1D] font-medium font-inter px-4 sm:text-[14px] mt-2">
            <p
              style={{
                fontSize: "11px"
              }}>
              25+ years of experience | 100+ teams led | ICF-certified coaching | 2 months of hands-on support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialFeatures;