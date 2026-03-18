"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import harshImg from '../assets/harshMehtaCI.png';
import harshImage from '../assets/harshMehtaFI.png';
import type { StaticImageData } from "next/image";

interface IDCardProps {
  variant: "current" | "future";
  name: string;
  role: string;
  status: string;
  visibilityScore: string;
  influenceRating: string;
  accessLevel: string;
  knownFor: string[];
  promotabilityQuotient: number;
  avatarInitials: string;
  // profile?: any;
  profile?: StaticImageData | string;
}

function IDCard({
  variant,
  name,
  role,
  status,
  visibilityScore,
  influenceRating,
  accessLevel,
  knownFor,
  promotabilityQuotient,
  avatarInitials,
  profile
}: IDCardProps) {
  const isCurrent = variant === "current";

  return (
    <div className="relative w-[300px] md:w-[420px] bg-white rounded-[20px] border-2 border-[#E5E5E5] shadow-2xl overflow-hidden">

      {/* Header */}
      <div
        className={`pt-3 sm:pt-6 px-4 relative min-h-[60px] sm:min-h-[100px] ${
          isCurrent ? "bg-black" : "bg-[#0B64F4]"
        }`}
      >
        <h4 className="text-[5px] sm:text-[11px] font-semibold font-montserrat uppercase tracking-widest text-center text-white">
          {isCurrent ? "Current State" : "Future You"}
        </h4>
      </div>

      {/* Avatar overlapping header */}
      <div className="relative flex justify-center mt-[-30px] md:mt-[-44px]" 
      // style={{ marginTop: "-30px" }}
      >
        <div className="w-12 h-12 sm:w-24 sm:h-24 rounded-full border-[3px] border-[#E8E8E8] bg-[#F1F1F1] flex items-center justify-center shadow-xl">

          {profile ? (
            <Image
              src={profile}
              alt={name}
              className="w-10 h-10 sm:w-[86px] sm:h-[86px] rounded-full object-cover"
            />
          ) : (
            <div
              className={`w-10 h-10 sm:w-[86px] sm:h-[86px] rounded-full flex items-center justify-center text-xl font-bold ${
                isCurrent ? "bg-gray-900 text-white" : "bg-blue-600 text-white"
              }`}
            >
              {avatarInitials}
            </div>
          )}

        </div>
      </div>

      <div className="bg-white px-5 py-1 sm:py-4">

        {/* Name + Role */}
        <div className="flex flex-col items-center mb-1 sm:mb-3">
          <h5 className="text-[8px] sm:text-base text-[#1C1C1C] font-semibold font-jakarta">{name}</h5>

          <p className="text-[5.5px] sm:text-[11px] text-[#1C1C1C] mt-0.5 sm:mt-1 font-normal font-jakarta uppercase tracking-wide">
            {role}
          </p>
        </div>

        {/* Stats */}
        <div className="space-y-0 md:space-y-1.5 mb-4 border-y-[0.5px] md:py-3 border-[#E3E3E3]">

          {[
            { label: "Status", value: status },
            { label: "Visibility Score", value: visibilityScore },
            { label: "Influence Rating", value: influenceRating },
            { label: "Access Level", value: accessLevel },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">

              <span className="text-[#7A7777] font-semibold font-jakarta text-[4px] sm:text-[10px] uppercase tracking-wide w-[40px] md:w-[110px]">
                {item.label}
              </span>

              <span className="text-[#B3B3B3] text-[10px] font-extrabold w-[8px] text-center ml-2">
                :
              </span>

              <span className="text-black font-semibold font-jakarta text-[4px] sm:text-[10px] flex-1 ml-2">
                {item.value}
              </span>

            </div>
          ))}

        </div>

        {/* Known For */}
        <div className="text-left mb-0 md:mb-4 pb-2">

          <p
            className={`text-[4px] sm:text-[10px] mb-0 md:mb-2 uppercase tracking-wide font-bold font-montserrat ${
              isCurrent ? "text-black" : "text-[#0B64F4]"
            }`}
          >
            Known For
          </p>

          <ul className="text-[4px] md:text-xs text-[#323232] font-jakarta font-normal md:space-y-1">

            {knownFor.map((item) => (
              <li key={item} className="flex items-start">

                <div className="mr-2 h-0.5 sm:h-1 bg-black w-0.5 sm:w-1 rounded-full mt-[5px] shrink-0"></div>

                <span className="mt-0.5">{item}</span>

              </li>
            ))}

          </ul>

        </div>

        {/* Promotability Quotient */}
        <div className="border-t border-gray-200 pt-3 pb-1">

          <div className="flex justify-center items-center mb-2">

            <span
              className={`text-[5px] sm:text-[10px] font-montserrat uppercase tracking-wide font-bold ${
                isCurrent ? "text-black" : "text-[#0B64F4]"
              }`}
            >
              Promotability Quotient{" "}
              <span className="ml-1 text-sm text-[5px] sm:text-[10px] font-montserrat">
                {promotabilityQuotient}%
              </span>
            </span>

          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 md:h-2.5 bg-[#AFB0B0] rounded-full overflow-hidden">

            <div
              className={`h-full rounded-full  ${
                isCurrent ? "bg-black" : "bg-[#0B64F4]"
              }`}
              style={{ width: `${promotabilityQuotient}%` }}
            />

          </div>

        </div>

      </div>
    </div>
  );
}

export default function BePromotableFirstFold() {
  const [activeTab, setActiveTab] = useState<"current" | "future">("current");

  // Auto-switch tabs every 2 seconds on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === "current" ? "future" : "current"));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentCard: IDCardProps = {
    variant: "current",
    profile: harshImg,
    name: "Harsh Agarwal",
    role: "Software Developer",
    status: "Invisible Contributor",
    visibilityScore: "34/100",
    influenceRating: "Operational",
    accessLevel: "Restricted",
    knownFor: ["Task Management", "Fixing Problems Quietly", "Subject Matter Expertise", "Tactical Execution"],
    promotabilityQuotient: 37,
    avatarInitials: "HA",
  };

  const futureCard: IDCardProps = {
    variant: "future",
    profile: harshImage,
    name: "Harsh Agarwal",
    role: "Senior Product Manager",
    status: "Business Driver",
    visibilityScore: "92/100",
    influenceRating: "Strategic",
    accessLevel: "Unrestricted",
    knownFor: ["Stakeholder Management", "Executive Communication", "Cross-functional Leadership", "Big-picture Thinking"],
    promotabilityQuotient: 94,
    avatarInitials: "HA",
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-5 pt-6 md:pt-14 pb-10 text-center">
        <p className="sm:text-base text-[14px] font-quattrocento md:text-5xl text-[#000000] font-normal leading-snug">
          You&apos;re Not Stuck Because You&apos;re Bad At Your Job.
        </p>
        <h1 className="text-[16px] sm:text-3xl md:text-5xl font-bold font-inter leading-tight text-black mb-1 md:mb-3">
          You&apos;re Stuck Because Nobody Taught 
          <br />
          You{" "}
          <span className="text-[#014BAA]">How Promotions Actually Work.</span>
        </h1>
        <p className="mt-5 md:mt-8 text-[12px] sm:text-base md:text-3xl text-[#464646] font-inter font-medium leading-4.5 md:leading-10 max-w-xl md:max-w-4xl mx-auto">
          A focused{" "}
          <strong className="text-[#014BAA]">8-week program</strong> for professionals with{" "}
          <strong className="text-[#014BAA]">8+ years</strong> of experience who deliver great
          work but still get passed over when leadership roles open up. Learn the systems
          behind visibility, influence, and executive decision making so the right people
          start seeing your impact.
        </p>
        <a
          href="#apply"
          className="inline-flex items-center gap-2 mt-6 md:mt-12 px-3 md:px-7 py-2.5 md:py-3.5 rounded-[8px] bg-[#014BAA] text-white font-semibold text-[12px] sm:text-base
            hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-200"
        >
          Apply for Program
          <span className="text-lg leading-none">→</span>
        </a>
      </section>

      {/* ── Current / Future State ── */}
      <section className="max-w-7xl mx-auto px-5 pb-16 md:mt-8">

        {/* Mobile: Tabs */}
        <div className="flex md:hidden justify-center gap-3 mb-4 sm:mb-6">
          {(["current", "future"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 max-w-[160px] py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-sm font-semibold border transition-all
                ${activeTab === tab
                  ? tab === "current"
                    ? "bg-black text-white border-black"
                    : "bg-[#014BAA] text-white border-[#014BAA]"
                  : "bg-white text-black border-black hover:border-black"
                }`}
            >
              {tab === "current" ? "Current State" : "Future State"}
            </button>
          ))}
        </div>

        {/* Mobile: Single card */}
        <div className="md:hidden">
          {activeTab === "current" ? (
            <div className="flex flex-row sm:flex-row gap-1 items-center sm:items-start">
              <IDCard {...currentCard} />
              <CurrentStateText />
            </div>
          ) : (
            <div className="flex flex-row sm:flex-row gap-1 items-center sm:items-start">
              <IDCard {...futureCard} />
              <FutureStateText />
            </div>
          )}
        </div>

        {/* Desktop: Both side by side */}
        <div className="hidden md:grid md:grid-cols-2 gap-10 w-full">
          {/* Current */}
          <div className="flex flex-row gap-6">
            <IDCard {...currentCard} />
            <CurrentStateText />
          </div>
          {/* Future */}
          <div className="flex flex-row gap-6">
            <IDCard {...futureCard} />
            <FutureStateText />
          </div>
        </div>
      </section>
    </main>
  );
}

function CurrentStateText() {
  return (
    <div className="w-full md:w-[400px] px-1">
      <h2 className="text-[14px] sm:text-2xl font-extrabold text-black font-inter font-bold leading-4 md:leading-8 mb-2 md:mb-4 md:mt-6">
        Right now your work speaks for itself.
      </h2>
      <p className="text-sm text-[8px] md:text-lg font-inter font-normal leading-2.5 md:leading-5 mb-3 md:mb-6">Unfortunately promotions don&apos;t work that way.</p>

      <h3 className="text-[12px] md:text-xl font-bold text-[#014BAA] font-inter">Current State</h3>
      <p className="text-[10px] sm:text-sm md:text-xl font-bold font-inter text-black mb-1">You are known as:</p>
      <ul className="space-y-0 sm:space-y-1 text-[8px] sm:text-sm  md:text-base text-[#000000] mb-2 md:mb-4">
        {["The person who gets things done", "The person people rely on quietly", "The expert who fixes problems"].map((item) => (
          <li key={item} className="flex items-start gap-1 sm:gap-2">
            <span className="mt-0.5 text-[#000000] font-inter font-normal">•</span>
            {item}
          </li>
        ))}
      </ul>
      <p className="text-[8px] sm:text-sm  md:text-base text-[#000000] font-inter font-normal mb-3 md:mb-6">
        But inside leadership discussions you are rarely mentioned.
      </p>
      <p className="text-[8px] sm:text-sm  md:text-lg text-black font-inter font-semibold mb-1">Why?</p>
      <p className="text-[8px] sm:text-sm  md:text-base text-black font-inter font-normal">
        Because decision makers promote influence and visibility, not just execution.
      </p>
    </div>
  );
}

function FutureStateText() {
  return (
    <div className="w-full md:w-[400px] px-1">
      <h3 className="text-[12px] md:text-xl font-bold font-inter text-[#014BAA] mb-3 md:mt-5">Future State</h3>
      <p className="text-[10px] sm:text-sm md:text-xl  font-bold font-inter text-black mb-2">You become known as someone who:</p>
      <ul className="md:space-y-1 text-[8px] sm:text-sm md:text-base text-black font-inter font-normal mb-5">
        {[
          "Drives outcomes across teams",
          "Shapes decisions before meetings happen",
          "Communicates impact clearly to leadership",
          "Gets pulled into strategic conversations",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-0.5 text-black">•</span>
            {item}
          </li>
        ))}
      </ul>
      <p className="text-[8px] sm:text-sm md:text-base text-black font-inter font-normal mb-3">
        But inside leadership discussions you are rarely mentioned.
      </p>
      <p className="text-[8px] sm:text-sm md:text-base text-black font-inter font-normal">That shift changes everything.</p>
    </div>
  );
}