"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import harshImg from '../assets/harshMehtaCI.png';
import harshImage from '../assets/harshMehtaFI.png';
import type { StaticImageData } from "next/image";
import { BsArrowRight } from "react-icons/bs";

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
  profile,
  large = false,
}: IDCardProps & { large?: boolean }) {
  const isCurrent = variant === "current";

  return (
    <div
      className={`relative bg-white rounded-[20px] border-2 border-[#E5E5E5] shadow-2xl overflow-hidden ${
        large ? "w-[420px]" : "w-[240px] md:w-[420px]"
      }`}
    >
      {/* Header */}
      <div
        className={`relative ${
          large ? "pt-8 px-6 min-h-[130px]" : "pt-3 sm:pt-6 px-4 min-h-[75px] sm:min-h-[100px]"
        } ${isCurrent ? "bg-black" : "bg-[#0B64F4]"}`}
      >
        <h4
          className={`font-semibold font-montserrat uppercase tracking-widest text-center text-white ${
            large ? "text-[13px]" : "text-[8px] sm:text-[11px]"
          }`}
        >
          {isCurrent ? "Current State" : "Future You"}
        </h4>
      </div>

      {/* Avatar overlapping header */}
      <div
        className={`relative flex justify-center ${large ? "mt-[-60px]" : "mt-[-30px] md:mt-[-44px]"}`}
      >
        <div
          className={`rounded-full border-[3px] border-[#E8E8E8] bg-[#F1F1F1] flex items-center justify-center shadow-xl ${
            large ? "w-[115px] h-[115px]" : "w-[61.5px] h-[61.5px] sm:w-24 sm:h-24"
          }`}
        >
          {profile ? (
            <Image
              src={profile}
              alt={name}
              className={`rounded-full object-cover ${
                large ? "w-[100px] h-[100px]" : "w-[52px] h-[52px] sm:w-[86px] sm:h-[86px]"
              }`}
            />
          ) : (
            <div
              className={`rounded-full flex items-center justify-center font-bold ${
                large ? "w-[96px] h-[96px] text-2xl" : "w-10 h-10 sm:w-[86px] sm:h-[86px] text-xl"
              } ${isCurrent ? "bg-gray-900 text-white" : "bg-blue-600 text-white"}`}
            >
              {avatarInitials}
            </div>
          )}
        </div>
      </div>

      <div className={`bg-white ${large ? "px-7 py-5" : "px-5 py-1 sm:py-4"}`}>

        {/* Name + Role */}
        <div className={`flex flex-col items-center ${large ? "mb-4" : "mb-1 sm:mb-3"}`}>
          <h5 className={`text-[#1C1C1C] font-semibold font-jakarta ${large ? "text-xl" : "text-[12px] sm:text-base"}`}>
            {name}
          </h5>
          <p className={`text-[#1C1C1C] font-normal font-jakarta uppercase tracking-wide ${large ? "text-[13px] mt-1" : "text-[8px] sm:text-[11px] mt-0.5 sm:mt-1"}`}>
            {role}
          </p>
        </div>

        {/* Stats */}
        <div className={`border-y-[0.5px] border-[#E3E3E3] ${large ? "space-y-2 py-4 mb-5" : "space-y-0 md:space-y-1.5 mb-4 py-2 md:py-3"}`}>
          {[
            { label: "Status", value: status },
            { label: "Visibility Score", value: visibilityScore },
            { label: "Influence Rating", value: influenceRating },
            { label: "Access Level", value: accessLevel },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className={`text-[#7A7777] font-semibold font-jakarta uppercase tracking-wide ${large ? "text-[12px] w-[160px]" : "text-[8px] sm:text-[10px] w-[75px] md:w-[110px]"}`}>
                {item.label}
              </span>
              <span className="text-[#B3B3B3] text-[10px] font-extrabold w-[8px] text-center ml-2 md:mr-6">:</span>
              <span className={`text-black font-semibold font-jakarta flex-1 ml-2 ${large ? "text-[12px]" : "text-[8px] sm:text-[10px]"}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Known For */}
        <div className={`text-left ${large ? "mb-5 pb-2" : "mb-0 md:mb-4 pb-2"}`}>
          <p className={`uppercase tracking-wide font-bold font-montserrat ${large ? "text-[12px] mb-2" : "text-[8px] sm:text-[10px] mb-0 md:mb-2"} ${isCurrent ? "text-black" : "text-[#0B64F4]"}`}>
            Known For
          </p>
          <ul className={`text-[#323232] font-jakarta font-normal ${large ? "text-sm space-y-1.5" : "text-[7px] md:text-xs md:space-y-1"}`}>
            {knownFor.map((item) => (
              <li key={item} className="flex items-start">
                <div className={`mr-2 bg-black rounded-full shrink-0 ${large ? "w-1.5 h-1.5 mt-[5px]" : "w-0.5 h-0.5 sm:w-1 sm:h-1 mt-[5px]"}`}></div>
                <span className="mt-0.5">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Promotability Quotient */}
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="flex justify-center items-center mb-2">
            <span className={`font-montserrat uppercase tracking-wide font-bold ${large ? "text-[13px]" : "text-[10px] sm:text-[10px]"} ${isCurrent ? "text-black" : "text-[#0B64F4]"}`}>
              Promotability Quotient{" "}
              <span className={`ml-1 font-montserrat ${large ? "text-[13px]" : "text-[10px] sm:text-[10px]"}`}>
                {promotabilityQuotient}%
              </span>
            </span>
          </div>
          <div className={`w-full bg-[#AFB0B0] rounded-full overflow-hidden ${large ? "h-3" : "h-1 md:h-2.5"}`}>
            <div
              className={`h-full rounded-full ${isCurrent ? "bg-black" : "bg-[#0B64F4]"}`}
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

    const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Auto-switch tabs every 2 seconds on all screen sizes
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
      <section className="max-w-7xl md:mx-auto px-5 pt-6 md:pt-14 pb-2 md:pb-6 text-center">
        <p className="sm:text-base text-[16px] font-quattrocento md:text-5xl text-[#000000] font-normal leading-snug">
          You&apos;re Not Stuck Because You&apos;re Bad At Your Job.
        </p>
        <h1 className="text-[24px] sm:text-3xl md:text-5xl font-bold font-inter leading-tight text-black mb-0.5 md:mb-3 mt-3 mx-4 md:mx-auto">
          You&apos;re Stuck Because Nobody Taught
          You{" "}
          <span className="text-[#014BAA]">How Promotions Actually Work.</span>
        </h1>
        <p className="mt-3.5 md:mt-8 mx-8 text-[16px] sm:text-base md:text-3xl text-[#464646] font-inter font-medium leading-5 md:leading-10 max-w-sm md:max-w-4xl md:mx-auto">
          A focused{" "}
          <strong className="text-[#014BAA]">8-week program</strong> for professionals with{" "}
          <strong className="text-[#014BAA]">8+ years</strong> of experience who deliver great
          work but still get passed over when leadership roles open up. Learn the systems
          behind visibility, influence, and executive decision making so the right people
          start seeing your impact.
        </p>
        <a
          // href="#apply"
          onClick={scrollToWaitlist}
          className="inline-flex items-center gap-2 mt-6 md:mt-12 px-7 md:px-7 py-3 md:py-3.5 rounded-[8px] bg-[#014BAA] text-white text-[18px] sm:text-base
            hover:bg-blue-700 font-inter font-medium active:scale-95 transition-all duration-200 shadow-lg shadow-blue-200"
        >
          Apply for Program
          <span className="text-lg leading-none">
            {/* → */}
            <BsArrowRight />
            </span>
        </a>
      </section>

      {/* ── Current / Future State ── */}
      <section className="max-w-7xl  px-5 md:px-1 pb-7 md:mt-8">

        {/* Mobile: Single card alternating */}
        <div className="md:hidden">
          {activeTab === "current" ? (
            <div>
              <div>
              <h2
        className={`font-bold text-black font-inter text-[18px] md:hidden font-bold leading-snug mb-1 text-center md:mt-6`}>
        Right now your work speaks for itself.
      </h2>
      <p className={`font-inter font-normal md:hidden text-[14px] text-center mb-5 md:mb-6`}>
        Unfortunately promotions don&apos;t work that way.
      </p>
              </div>
            <div className="flex flex-col sm:flex-row gap-8 md:gap-2 items-center sm:items-start">
              <IDCard {...currentCard} />
              <CurrentStateText />
            </div>
            </div>
          ) : (
            <div>
                  <div>
              <h2
        className={`font-bold text-black font-inter text-[18px] md:hidden font-bold leading-snug mb-1 text-center md:mt-6`}>
        Tomorrow your brand speaks for you
      </h2>
      <p className={`font-inter font-normal md:hidden text-[14px] text-center mb-5 md:mb-6`}>
        Your work gets noticed. You get remembered.
      </p>
              </div>
            <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              <IDCard {...futureCard} />
              <FutureStateText />
            </div>
            </div>
          )}
        </div>

        {/* Desktop: Single large card alternating with text side-by-side */}
        <div className="hidden md:flex md:flex-row gap-2 translate-x-[5%] xl:translate-x-[30%] items-center justify-center">

          {/* Card — switches every 2s with fade transition */}
          <div className="relative" style={{ minWidth: 480 }}>
            <div
              key={activeTab + "-card"}
              className="transition-opacity duration-500 animate-fadeIn"
            >
              {activeTab === "current" ? (
                <IDCard {...currentCard} large />
              ) : (
                <IDCard {...futureCard} large />
              )}
            </div>
          </div>

          {/* Text — switches with card */}
          <div
            key={activeTab + "-text"}
            className="transition-opacity duration-500 animate-fadeIn"
          >
            {activeTab === "current" ? <CurrentStateText large /> : <FutureStateText large />}
          </div>

        </div>
      </section>
    </main>
  );
}

function CurrentStateText({ large = false }: { large?: boolean }) {
  return (
    <div className={large ? "w-[690px] px-1" : "w-full md:w-[400px] px-1"}>
      <h2
        className={`font-extrabold text-black font-inter font-bold leading-snug mb-4 md:mt-6 hidden md:block ${
          large ? "text-4xl mb-5" : "text-[18px] sm:text-2xl leading-4 md:leading-8 mb-4"
        }`}
      >
        Right now your work speaks for itself.
      </h2>
      <p className={`font-inter font-normal mb-3 md:mb-6 hidden md:block ${large ? "text-2xl mb-5" : "text-sm text-[14px] md:text-lg leading-2.5 md:leading-5"}`}>
        Unfortunately promotions don&apos;t work that way.
      </p>

      <div className="flex flex-row gap-8 md:gap-6">
        <div className="md:min-w-[250px]">
          <h3 className={`font-bold text-[#014BAA] font-inter md:max-w-full ${large ? "text-[26px]" : "text-[16px] md:text-xl"}`}>
            Current State
          </h3>
          <p className={`font-bold font-inter text-black mb-1 ${large ? "text-2xl" : "text-[14px] sm:text-sm md:text-xl"}`}>
            You are known as:
          </p>
        </div>
        <div>
          <ul className={`font-inter font-normal text-[#000000] mb-3.5 ${large ? "space-y-2 text-lg" : "space-y-0 sm:space-y-1 text-[10px] sm:text-sm md:text-base"}`}>
            {/* {["The person who gets things done", "The person people rely on quietly", "The expert who fixes problems"].map((item) => (
              <li key={item} className="flex items-start gap-1 sm:gap-2">
                <span className="mt-0.5 text-[#000000] font-inter font-normal">•</span>
                {item}
              </li>
            ))} */}
            {[
              { plain: "The person who ", bold: "gets things done", suffix: "" },
              { plain: "The person ", bold: "people rely on", suffix: " quietly" },
              { plain: "The expert ", bold: "who fixes problems", suffix: "" },
            ].map((item) => (
              <li key={item.bold} className="flex items-start gap-1 sm:gap-2">
                <span className="mt-0.5 text-[#000000] font-inter font-normal">•</span>
                <span>
                  {item.plain}
                  <span className="text-[#014BAA] font-bold">{item.bold}</span>
                  {item.suffix}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className={`text-[#000000] font-inter font-normal mb-1 ${large ? "text-xl mb-4" : "text-[12px] sm:text-sm md:text-base md:mb-10"}`}>
        But inside leadership discussions you are rarely mentioned.
      </p>
      <p className={`text-black font-inter font-semibold mb-1 ${large ? "text-2xl text-center mt-4" : "text-[15px] sm:text-sm md:text-lg text-center"}`}>
        Why?
      </p>
      <p className={`text-[#014BAA] font-inter font-bold text-center ${large ? "text-xl mt-4" : "text-[15px] sm:text-sm md:text-base leading-4.5"}`}>
        Because decision makers promote influence and visibility, not just execution.
      </p>
    </div>
  );
}

function FutureStateText({ large = false }: { large?: boolean }) {
  return (
    <div className={large ? "w-[690px] px-1" : "w-full md:w-[400px] px-1"}>

            <h2
        className={`font-extrabold text-black font-inter font-bold leading-snug mb-4 md:mt-6 hidden md:block ${
          large ? "text-4xl mb-5" : "text-[18px] sm:text-2xl leading-4 md:leading-8 mb-4"
        }`}
      >
        Tomorrow your brand speaks for you
      </h2>
      <p className={`font-inter font-normal mb-3 md:mb-6 hidden md:block ${large ? "text-2xl mb-5" : "text-sm text-[14px] md:text-lg leading-2.5 md:leading-5"}`}>
        Your work gets noticed. You get remembered.
      </p>
      
      <div className="flex flex-row gap-3 md:gap-6">
        <div className="md:mt-[1%] max-w-[220px] md:max-w-full md:min-w-[250px]">
          <h3 className={`font-bold text-[#014BAA] font-inter mb-1 ${large ? "text-[26px]" : "text-[16px] md:text-xl"}`}>
            Future State
          </h3>
          <p className={`font-bold font-inter text-black mb-1 ${large ? "text-2xl" : "text-[14px] leading-4 sm:text-sm md:text-xl"}`}>
            You will be known as:
          </p>
        </div>
        <div>
          <ul className={`text-[#000000] mt-[1%] font-inter font-normal mb-4 md:mb-3.5 ${large ? "space-y-2 text-lg" : "space-y-0 sm:space-y-1 text-[10px] sm:text-sm md:text-base"}`}>
            {/* {[
              "Drives outcomes across teams",
              "Shapes decisions before meetings happen",
              "Communicates impact clearly to leadership",
              "Gets pulled into strategic conversations",
            ].map((item) => (
              <li key={item} className="flex items-start gap-1 sm:gap-2">
                <span className="mt-0.5 text-[#000000] font-inter font-normal">•</span>
                {item}
              </li>
            ))} */}

            {[
            {
              text: "Drives outcomes across teams",
              highlight: "Drives outcomes",
            },
            {
              text: "Shapes decisions before meetings happen",
              highlight: "Shapes decisions",
            },
            {
              text: "Communicates impact clearly to leadership",
              highlight: "leadership",
            },
          ].map((item, index) => {
            const parts = item.text.split(item.highlight);

            return (
              <li key={index} className="flex items-start gap-1 sm:gap-2">
                {/* bullet same */}
                <span className="mt-0.5 text-[#014BAA] font-inter font-bold">•</span>

                {/* text same */}
                <span className="text-[#000000] font-inter text-[10px] sm:text-sm md:text-base leading-relaxed">
                  {parts[0]}
                  <span className="text-[#014BAA] font-semibold">
                    {item.highlight}
                  </span>
                  {parts[1]}
                </span>
              </li>
            );
          })}

          </ul>
        </div>
      </div>

      {/* <p className={`text-black font-inter font-normal mb-3 ${large ? "text-xl mb-6 mt-6" : "text-[12px] sm:text-sm md:text-base"}`}>
        But inside leadership discussions you are rarely mentioned.
      </p> */}
      <p className={`text-[#000000] font-inter font-medium mb-[-3px] ${large ? "text-xl" : "text-[12px] sm:text-sm md:text-base"}`}>
        That shift changes everything.
      </p>

            <p className={`text-black font-inter font-semibold mt-1 mb-1 ${large ? "text-2xl text-center mt-4" : "text-[15px] sm:text-sm md:text-lg text-center"}`}>
        Why?
      </p>
            <p className={`text-[#014BAA] font-inter font-bold text-center ${large ? "text-xl mt-4" : "text-[15px] sm:text-sm md:text-base leading-4.5"}`}>
        Because decision makers promote influence and visibility, not just execution.
      </p>
    </div>
  );
}