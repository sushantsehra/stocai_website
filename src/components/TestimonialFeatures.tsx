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
      "Support from coaches who’ve sat in promotion rooms and understand how decisions are actually made.",
  },
];

const TestimonialFeatures: React.FC = () => {
  return (
    <section className="w-full bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto  py-10 md:py-20 flex flex-col md:flex-row gap-10 lg:gap-14 items-stretch">

        {/* LEFT — Testimonial Card */}
        <div className="w-full md:w-[40%] flex-shrink-0 bg-[#014BAA]">

          {/* MOBILE VERSION */}
          <div className="relative bg-[#1A4EAB] rounded-2xl overflow-hidden md:hidden h-[420px] flex">
            {/* Left text section */}
            <div style={{
                width: "50%",
            }} className="absolute left-0 top-0 bottom-0 w-[50%] z-10 p-5 flex flex-col justify-center">
              <p className="text-white text-[12px] font-jakarta font-normal leading-4">
                I knew that I was capable. I just didn’t know what I needed to do to level up.
              </p>
              <p className="text-white text-[12px] font-jakarta font-normal leading-4 mt-3">
                With every passing module, I saw where I was going wrong. I changed my beliefs and behaviour – and the action items brought me close to my promotion.
              </p>

              <div className="mt-6">
                <p className="text-[#F8F3F0] font-medium font-jakarta text-[16px]">
                  – Apoorva Malhotra
                </p>
                <p className="text-white/50 font-medium font-jakarta text-[13px] mt-0.5 ml-[5%]">
                  HR Business Partner
                </p>
              </div>
            </div>

            {/* Right image */}
            <div className="absolute right-0 top-0 h-full w-[50%]">
              <Image
                src={ApoorvaMalhotra}
                alt="Apoorva Malhotra"
                // fill
                width={350}
                height={400}
                sizes="40vw"
                className="object-cover object-top translate-x-20"
                priority
              />
            </div>
          </div>

          {/* DESKTOP VERSION */}
          <div style={{
            backgroundColor: "#014BAA",
            borderRadius: "11px",
          }} className="hidden md:flex flex-col bg-[#014BAA] rounded-[11px] overflow-hidden h-full">
            {/* Text Content */}
            <div style={{
                borderRadius: "11px",
            }} className="relative flex flex-col justify-start pt-16 px-7 pb-5 rounded-[11px]">
              {/* Decorative quote */}
              <div
                className="absolute top-4 left-3 text-white font-serif select-none pointer-events-none"
                style={{ fontSize: "80px", lineHeight: 1, borderRadius: "11px" }}
              >
                &ldquo;
              </div>

              <p style={{
                fontSize: "17px",
              }} 
              className="text-white text-[15px] leading-6 relative z-10">
                I knew that I was capable. I just didn’t know what I needed to do to level up.
              </p>
              <p style={{
                fontSize: "17px",
              }} 
               className="text-white text-[15px] leading-6 mt-4 relative z-10">
                With every passing module, I saw where I was going wrong. I changed my beliefs and behaviour – and the action items brought me close to my promotion.
              </p>

              <div className="mt-8 relative z-10">
                <p 
                style={{
                    fontSize: "17px",
                }} 
                className="text-[#F8F3F0] font-semibold text-[14px]">
                  – Apoorva Malhotra
                </p>
                <p className="text-white/70 text-[12px] mt-0.5">
                  HR Business Partner
                </p>
              </div>
            </div>

            {/* Image bottom */}
            <div
            className="relative flex-1 w-full min-h-[300px] flex justify-end items-end overflow-hidden"
            style={{ borderBottomRightRadius: "16px", }}
            >
            <Image
                src={ApoorvaMalhotra}
                alt="Apoorva Malhotra"
                height={520}
                width={380}
                sizes="30vw"
                className="object-cover object-top"
                priority
                style={{
                transform: "translateX(40px)",
                maxWidth: "unset",
                }}
            />
            </div>
          </div>
        </div>

        {/* RIGHT — Heading + Features */}
        <div className="hidden sm:block w-full md:flex-1 flex flex-col justify-start">
          {/* Heading */}
          <div>
            <p
            style={{
                fontSize: "21.8px",
            }} className="text-[#1D1D1D] font-medium font-jakarta p-2">
              If your colleagues moved up while you moved work, don&apos;t worry.
            </p>
            <h2
              className="text-[#1D1D1D] font-jakarta font-bold text-start leading-tight mt-2"
              style={{ fontSize: "clamp(42px, 4vw, 56px)", fontWeight: 600 }}
            >
              That. Ends. Here.
            </h2>
          </div>

          {/* Feature Cards */}
          <div           
           style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "24px",
                marginTop: "20px",
            }}
            className="grid grid-cols-2  gap-6 mt-10">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                style={{
                    backgroundColor: "#EEE5DF",
                    minHeight: "271px",
                }}
                className="bg-[#E6F1FF] rounded-2xl p-6 sm:p-7 hover:bg-[#e9dfd3] transition-colors duration-200"
              >
                <h3
                style={{
                    fontSize: "24.85px",
                }}
                className="text-[#014BAA] font-normal font-quattrocento leading-8 mb-2 mt-16">
                  {feature.title}
                </h3>
                <p style={{
                    fontSize: "17px"
                }} className="text-[#1D1D1D] font-normal font-jakarta leading-6">
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
                fontSize: "13px"
            }}
            className="text-[#1D1D1D] text-center font-medium font-jakarta sm:text-[12px] p-2">
              If your colleagues moved up while you moved work, don&apos;t worry.
            </p>
            <h2
              className="text-[#1D1D1D] font-jakarta font-medium text-center leading-tight mt-2"
              style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 600 }}
            >
              That. Ends. Here.
            </h2>
          </div>

          {/* Feature Cards */}
          <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "24px",
                marginTop: "20px",
            }}
            className="grid grid-cols-2  gap-6 mt-10 p-2 px-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                style={{
                    backgroundColor: "#E6F1FF",
                }}
                className="bg-[#E6F1FF] max-w-[200px] md:max-w-auto rounded-2xl p-6 sm:p-7 hover:bg-[#e9dfd3] transition-colors duration-200"
              >
                <h3
                 className="text-[#014BAA] font-bold font-quattrocento text-[12px] font-semibold leading-5 mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#1D1D1D] text-[10px] font-normal font-quattrocento leading-4">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Text */}
          <div className="text-center md:text-left text-[#1D1D1D] font-semibold font-jakarta px-6 sm:text-[14px] mt-4">
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