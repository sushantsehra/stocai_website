"use client";

import React from "react";
import blueTick from "../assets/blueTick.png";
import Image from "next/image";

const OutcomeContract: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-24">
      {/* Soft radial blue background like the design */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-40 top-1/3 h-72 w-72 rounded-full opacity-95 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, #3163d6 0%, rgba(49,99,214,0) 99%)",
          }}
        />
        <div
          className="absolute -right-40 bottom-0 md:bottom-40 h-80 w-80 rounded-full opacity-95 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, #3163d6 0%, rgba(49,99,214,0) 99%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[26px] sm:text-[32px] lg:text-[42px] font-gotham font-normal leading-tight text-[#000000]">
            Your{" "}
            <span className="font-bold text-[#014BAA]">Outcome Contract</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-[24px] font-gotham font-normal text-[#111827]">
            We&apos;re invested in your success.{" "}
            <span className="font-bold">
              Not happy? Get 100% money back.
            </span>
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:gap-0 md:grid-cols-2">
          {/* Left card – We provide */}
          <div className="rounded-2xl bg-white px-6 py-6 sm:px-8 sm:py-8 shadow-xl max-w-[351px]">
            <div className="mb-2 flex flex-col items-left gap-3">
              <Image
                src={blueTick}
                alt="Blue Tick Icon"
                className="h-8 w-8 md:h-12 md:w-12"
              />
              <h3 className="text-[18px] sm:text-[20px] md:text-[24px] font-gotham font-normal text-[#014BAA]">
                We provide
              </h3>
            </div>

            <ul className="ml-4 list-disc space-y-0 text-sm sm:text-base md:text-[17px] font-gotham text-[#000000]">
              <li>The Complete OS</li>
              <li>Playbooks</li>
              <li>Resources &amp; Templates</li>
              <li>Weekly reviews</li>
              <li>ICF Certified Coach</li>
            </ul>
          </div>

          {/* Right card – You commit to */}
          <div className="rounded-2xl bg-white px-6 py-6 sm:px-8 sm:py-8 shadow-xl max-w-[351px]">
            <div className="mb-2 flex flex-col items-left gap-3">
              <Image
                src={blueTick}
                alt="Blue Tick Icon"
                className="h-8 w-8 md:h-12 md:w-12"
              />
              <h3 className="text-[18px] sm:text-[20px] md:text-[24px] font-gotham font-normal text-[#014BAA]">
                You commit to
              </h3>
            </div>

            <ul className="ml-4 list-disc space-y-0 text-sm sm:text-base md:text-[17px] font-gotham text-[#000000]">
              <li>Complete all modules</li>
              <li>Create and Execute the Plan</li>
              <li>Check-in weekly</li>
              <li>Apply your learnings</li>
            </ul>
          </div>
        </div>

        {/* Refund copy */}
        <div className="mt-8 text-center">
          <p className="text-xs sm:text-sm md:text-[17px] font-gotham font-normal text-[#161616]">
            If you complete your commitments and don&apos;t see clear movement,
            email us for a full refund.{" "}
          </p>
            <p className="text-xs sm:text-sm md:text-[17px] font-gotham font-bold text-center text-[#161616]">
          No questions asked.
          </p>
        </div>

        {/* CTA button */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-[12px] bg-[#014BAA] px-6 py-3 text-sm sm:text-base md:text-[17px] font-gotham font-normal text-white shadow-md transition hover:bg-[#0f3fa0] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1454C4]/70 focus-visible:ring-offset-2"
          >
            Join the priority list
            <span className="inline-flex h-5 w-5 items-center justify-center">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
              >
                <path
                  d="M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default OutcomeContract;