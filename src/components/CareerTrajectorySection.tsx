"use client";

import React from "react";
import Image from "next/image";
import currentImg from "../assets/harshImg.jpg";
import futureImg from "../assets/harshImage.png";

export default function CareerTrajectorySection() {
  return (
    <section className="bg-white w-full">

      {/* Top Blue Banner */}
      <div className="bg-[#014BAA] text-white text-center py-2 px-4 mt-4">
        <h2 className="font-quattrocento font-bold text-[18px] md:text-[32px] lg:text-[42px]">
          Ready to change your career trajectory?
        </h2>
      </div>

      {/* Content */}
      <div className="px-5 py-6 max-w-[1100px] mx-auto">

        {/* Sub Text */}
        <div className="text-center mb-5 md:mb-10">
          <p className="font-semibold text-black font-inter text-[10px] md:text-[18px]">
            Join professionals who already have!
          </p>
          <p className="text-black font-inter text-[10px] md:text-[16px] mt-1 max-w-xs px-8 text-center ml-[7%] md:ml-0 leading-3 md:leading-relaxed">
            From Fortune 500 companies to fast-growing startups –
            real people, real promotions
          </p>
        </div>

        {/* Heading */}
        <h3 className="text-center font-quattrocento font-bold text-[18px] md:text-[36px] text-[#1D1D1D] mb-3 md:mb-12">
          We Aim to{" "}
          <span className="text-[#1554A5]">Change You</span>
        </h3>

        {/* Cards Container */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:justify-center">

          {/* CURRENT CARD */}
          <div className="relative bg-white rounded-[24px] shadow-2xl border border-gray-200 w-full max-w-[320px] overflow-hidden">

            <div className="bg-black text-white text-center py-4 uppercase text-xs tracking-widest font-semibold">
              Current State
            </div>

            <div className="flex justify-center -mt-10">
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <Image src={currentImg} alt="Current" width={96} height={96} className="object-cover w-full h-full" />
              </div>
            </div>

            <div className="px-6 py-6 text-center">
              <h4 className="font-bold text-lg">Anisha Date</h4>
              <p className="text-sm text-gray-600 mb-4">Senior Product Manager</p>

              <div className="border-y py-4 text-sm space-y-2 text-left">
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="font-semibold">Invisible Contributor</span>
                </div>
                <div className="flex justify-between">
                  <span>Visibility Score</span>
                  <span className="font-semibold">34/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Influence Rating</span>
                  <span className="font-semibold">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span>Access Level</span>
                  <span className="font-semibold">Restricted</span>
                </div>
              </div>

              <div className="mt-4 text-left">
                <p className="text-xs font-bold uppercase mb-2">Known For</p>
                <ul className="text-sm space-y-1">
                  <li>• Task Management</li>
                  <li>• Fixing Problems Quietly</li>
                  <li>• Subject Matter Expertise</li>
                  <li>• Tactical Execution</li>
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase text-center mb-2">
                  Promotability Quotient 34%
                </p>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-black rounded-full w-[34%]" />
                </div>
              </div>
            </div>
          </div>

          {/* FUTURE CARD */}
          <div className="relative bg-white rounded-[24px] shadow-2xl border border-gray-200 w-full max-w-[340px] overflow-hidden">

            <div className="bg-[#1554A5] text-white text-center py-4 uppercase text-xs tracking-widest font-semibold">
              Future You
            </div>

            <div className="flex justify-center -mt-10">
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <Image src={futureImg} alt="Future" width={96} height={96} className="object-cover w-full h-full" />
              </div>
            </div>

            <div className="px-6 py-6 text-center">
              <h4 className="font-bold text-lg">Anisha Date</h4>
              <p className="text-sm text-gray-600 mb-4">Senior Product Manager</p>

              <div className="border-y py-4 text-sm space-y-2 text-left">
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="font-semibold">Business Driver</span>
                </div>
                <div className="flex justify-between">
                  <span>Visibility Score</span>
                  <span className="font-semibold">92/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Influence Rating</span>
                  <span className="font-semibold">Strategic</span>
                </div>
                <div className="flex justify-between">
                  <span>Access Level</span>
                  <span className="font-semibold">Unrestricted</span>
                </div>
              </div>

              <div className="mt-4 text-left">
                <p className="text-xs font-bold uppercase text-[#1554A5] mb-2">
                  Known For
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Stakeholder Management</li>
                  <li>• Executive Communication</li>
                  <li>• Cross-functional Leadership</li>
                  <li>• Big-picture Thinking</li>
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase text-[#1554A5] text-center mb-2">
                  Promotability Quotient 94%
                </p>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-[#1554A5] rounded-full w-[94%]" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}