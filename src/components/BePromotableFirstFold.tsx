"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import bgColor from '../assets/bgCircle.png';
import harshImg from '../assets/harshImg.jpg';
import harshImage from '../assets/harshImage.png';

export default function BePromotableFirstFold() {
  const [activeTab, setActiveTab] = useState('current');

  // Auto-switch tabs every 3 seconds on small devices
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === 'current' ? 'future' : 'current'));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const profile = {
    name: "Harsh Agarwal",
    currentState: {
      image: harshImg,
      status: "Invisible Contributor",
      title: "SOFTWARE ENGINEER",
      visibilityScore: "34/100",
      influenceRating: "Operational",
      accessLevel: "Restricted",
      knownFor: [
        "Task Management",
        "Fixing Problems Quietly",
        "Subject Matter Expertise",
        "Tactical Execution"
      ],
      promotabilityQuotient: "34%"
    },
    futureState: {
      image: harshImage,
      status: "Business Driver",
      title: "SENIOR PRODUCT MANAGER",
      visibilityScore: "92/100",
      influenceRating: "Strategic",
      accessLevel: "Unrestricted",
      knownFor: [
        "Stakeholder Management",
        "Executive Communication",
        "Cross-functional Leadership",
        "Big-picture Thinking"
      ],
      promotabilityQuotient: "94%"
    }
  };

  return (
    <>
    {/* ================= DESKTOP VERSION ================= */}
    <div className="hidden lg:block bg-white py-12 px-4 relative overflow-hidden">
      
      <div className="container mx-auto relative z-10">
        {/* Main Flex Container: Text Left, Cards Right */}
        <div className="flex items-center gap-12 xl:gap-16">
          
          {/* LEFT SIDE: Text Content */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-5xl xl:text-6xl font-jakarta font-bold text-[#0B64F4] mb-4">
              #BePromotable.
            </h2>
            <h3 className="text-3xl xl:text-4xl font-jakarta font-bold text-black mb-4">
              Stop being the hard worker who gets overlooked.
            </h3>
            <p className="text-black font-normal font-jakarta text-base xl:text-lg mb-8 leading-relaxed">
              A promotion strategy system for experienced professionals who feel
              stuck despite doing everything &apos;right&apos;.
            </p>
            
            {/* Get Early Access Button */}
            <button onClick={scrollToWaitlist} className="bg-[#0B64F4] hover:bg-[#0952d4] text-white font-jakarta font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              Get Early Access
            </button>
          </div>

          {/* RIGHT SIDE: Cards Container */}
          <div className="flex-1 relative flex justify-center items-center gap-8 min-h-[700px]">
            
            {/* Background Glow - Fixed positioning */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[50%] pointer-events-none">
              <div className="relative w-[850px] h-[800px]">
                <Image
                  src={bgColor}
                  alt="Background Glow"
                  fill
                  className="object-contain rotate-[5deg] opacity-50"
                  style={{ transform: 'rotate(135deg)' }}
                />
              </div>
            </div>

            {/* Current State Card */}
            <div
              className="relative bg-white rounded-[20px] border-2 border-[#D9D9D9] w-[280px] xl:w-[320px] shadow-2xl overflow-hidden z-10"
              style={{
                transform: "rotate(-9deg) perspective(1000px) rotateY(0deg)",
              }}
            >
              <div className="bg-black pt-5 px-4 relative min-h-[120px]">
                <h4 className="text-xs font-montserrat uppercase text-white mb-5 tracking-widest font-semibold text-center">
                  Current State
                </h4>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 top-[45px]">
                <div className="w-28 h-28 xl:w-32 xl:h-32 rounded-full border-[2.5px] border-[#E8E8E8] bg-[#F1F1F1] flex items-center justify-center shadow-xl">
                  <div className="relative w-full h-full rounded-full flex items-center justify-center scale-[0.95]">
                    <div className="relative w-[100px] h-[100px] xl:w-[115px] xl:h-[115px] rounded-full overflow-hidden">
                      <Image
                        src={profile.currentState.image}
                        alt="Current State"
                        fill
                        className="object-cover rounded-full scale-[1.05]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white px-4 py-5 mt-10 xl:mt-12">
                <div className="flex flex-col items-center mb-3">
                  <h5 className="text-base xl:text-lg font-medium font-gotham text-[#1C1C1C]">{profile.name}</h5>
                  <p className="text-xs xl:text-sm font-normal font-gotham text-[#1C1C1C] mt-1">{profile.currentState.title}</p>
                </div>

                <div className="text-sm space-y-1.5 mb-5 border-y py-3 border-[#E3E3E3]">
                  {[
                    { label: "Status", value: profile.currentState.status },
                    { label: "Visibility Score", value: profile.currentState.visibilityScore },
                    { label: "Influence Rating", value: profile.currentState.influenceRating },
                    { label: "Access Level", value: profile.currentState.accessLevel },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-[#7A7777] font-semibold text-[10px] uppercase tracking-wide font-jakarta w-[110px]">
                        {item.label}
                      </span>
                      <span className="text-[#B3B3B3] text-[10px] font-extrabold w-[8px] text-center ml-3">
                        :
                      </span>
                      <span className="text-black font-semibold text-[10px] font-jakarta flex-1 ml-3">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-left mb-4">
                  <p className="font-montserrat text-[10px] text-black mb-2 uppercase tracking-wide font-bold">
                    Known For
                  </p>
                  <ul className="text-xs font-normal text-[#323232] space-y-1">
                    {profile.currentState.knownFor.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 h-1 bg-[#000000] w-1 rounded-full mt-[3%]"></div>
                        <span className="font-jakarta">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-4 pb-2">
                  <div className="flex justify-center items-center mb-2 text-start">
                    <span className="text-[10px] uppercase font-montserrat tracking-wide font-bold text-black">
                      Promotability Quotient{" "}
                      <span className="font-bold ml-1 text-black text-sm font-montserrat">
                        {profile.currentState.promotabilityQuotient}
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black rounded-full transition-all duration-500"
                      style={{ width: profile.currentState.promotabilityQuotient }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Future You Card */}
            <div
              className="relative mt-16 right-[5%] bg-white rounded-[20px] border-2 border-[#E9E9E9] w-[300px] xl:w-[340px] shadow-2xl overflow-hidden z-10"
              style={{
                transform: "rotate(10deg) perspective(1000px) rotateY(0deg)",
              }}
            >
              <div className="bg-[#0B64F4] pt-5 px-4 relative min-h-[120px]">
                <h4 className="text-xs font-montserrat uppercase text-white mb-5 tracking-widest font-semibold text-center">
                  Future You
                </h4>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 top-[45px]">
                <div className="w-28 h-28 xl:w-32 xl:h-32 rounded-full border-[2.5px] border-[#E8E8E8] bg-[#F1F1F1] flex items-center justify-center shadow-xl">
                  <div className="relative w-full h-full rounded-full flex items-center justify-center scale-[0.95]">
                    <div className="relative w-[100px] h-[100px] xl:w-[115px] xl:h-[115px] rounded-full overflow-hidden">
                      <Image
                        src={profile.futureState.image}
                        alt="Future State"
                        fill
                        className="object-cover rounded-full scale-[1.1]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white px-5 py-5 mt-10 xl:mt-12">
                <div className="flex flex-col items-center mb-3">
                  <h5 className="text-base xl:text-lg font-medium text-[#1C1C1C] font-gotham">{profile.name}</h5>
                  <p className="text-xs xl:text-sm font-normal text-[#1C1C1C] font-gotham mt-1">{profile.futureState.title}</p>
                </div>

                <div className="text-sm space-y-1.5 mb-5 border-y py-3 border-[#E3E3E3]">
                  {[
                    { label: "Status", value: profile.futureState.status },
                    { label: "Visibility Score", value: profile.futureState.visibilityScore },
                    { label: "Influence Rating", value: profile.futureState.influenceRating },
                    { label: "Access Level", value: profile.futureState.accessLevel },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-[#7A7777] font-semibold text-[10px] uppercase tracking-wide font-jakarta w-[110px]">
                        {item.label}
                      </span>
                      <span className="text-[#B3B3B3] font-extrabold text-[10px] w-[8px] text-center ml-3">
                        :
                      </span>
                      <span className="text-black font-semibold text-[10px] font-jakarta flex-1 ml-3">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-left mb-3">
                  <p className="font-montserrat text-[10px] text-[#0B64F4] mb-2 uppercase tracking-wide font-bold">
                    Known For
                  </p>
                  <ul className="text-xs font-normal text-[#323232] space-y-1">
                    {profile.futureState.knownFor.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 h-1 bg-[#000000] w-1 rounded-full mt-[3%]"></div>
                        <span className="font-jakarta">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-4 pb-2">
                  <div className="flex justify-center items-center mb-2">
                    <span className="text-[10px] font-montserrat uppercase tracking-wide font-bold text-[#0B64F4]">
                      Promotability Quotient{" "}
                      <span className="font-bold text-[#0B64F4] ml-1 text-sm font-montserrat">
                        {profile.futureState.promotabilityQuotient}
                      </span>
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0B64F4] rounded-full transition-all duration-500"
                      style={{ width: profile.futureState.promotabilityQuotient }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    {/* ================= MOBILE / SMALL SCREENS ================= */}
    <div className="block lg:hidden bg-white px-4 py-10">

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-[32px] font-jakarta font-bold text-[#0B64F4]">
          #BePromotable.
        </h2>
        <h3 className="text-lg font-jakarta font-bold text-black mt-1 leading-6">
          Stop being the hard worker who gets overlooked.
        </h3>
        <p className="text-sm text-black mt-2 font-jakarta">
          A promotion strategy system for experienced professionals who feel
          stuck despite doing everything &apos;right&apos;.
        </p>
      </div>

      {/* Cards Container - Fixed Height to Prevent Layout Shift */}
      <div className="relative min-h-[580px] mb-6">
        
        {/* CURRENT STATE */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            activeTab === 'current' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="bg-white rounded-[25px] border-2 border-[#D9D9D9] shadow-xl overflow-hidden">
            <div className="bg-black pt-5 pb-16">
              <h4 className="text-xs uppercase text-white tracking-widest font-semibold font-montserrat text-center">
                Current State
              </h4>
            </div>

            {/* Avatar */}
            <div className="-mt-14 flex justify-center">
              <div className="w-28 h-28 rounded-full border-[3px] border-white bg-[#F1F1F1] overflow-hidden shadow-lg">
                <Image
                  src={profile.currentState.image}
                  alt="Current State"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="px-5 pt-4 pb-6">
              <div className="text-center mb-4">
                <h5 className="text-lg font-jakarta font-medium">
                  {profile.name}
                </h5>
                <p className="text-xs mt-1 font-jakarta">{profile.currentState.title}</p>
              </div>

              <div className="border-y py-4 space-y-2 mb-4 font-jakarta">
                {[
                  ["Status", profile.currentState.status],
                  ["Visibility Score", profile.currentState.visibilityScore],
                  ["Influence Rating", profile.currentState.influenceRating],
                  ["Access Level", profile.currentState.accessLevel],
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="uppercase text-[#7A7777] font-semibold font-jakarta">
                      {label}
                    </span>
                    <span className="font-semibold font-jakarta">{value}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs uppercase font-bold font-montserrat mb-2">Known For</p>
              <ul className="text-sm space-y-1 mb-5 font-jakarta">
                {profile.currentState.knownFor.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-1 h-1 bg-black rounded-full mt-2 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs uppercase font-bold text-center mb-2 font-montserrat">
                Promotability Quotient{" "}
                <span className="ml-1 font-montserrat">
                  {profile.currentState.promotabilityQuotient}
                </span>
              </p>
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div
                  className="h-full bg-black rounded-full transition-all duration-500"
                  style={{ width: profile.currentState.promotabilityQuotient }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FUTURE YOU */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            activeTab === 'future' ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="bg-white rounded-[25px] border-2 border-[#E9E9E9] shadow-xl overflow-hidden">
            <div className="bg-[#0B64F4] pt-5 pb-16">
              <h4 className="text-xs uppercase text-white tracking-widest font-semibold font-montserrat text-center">
                Future You
              </h4>
            </div>

            <div className="-mt-14 flex justify-center">
              <div className="w-28 h-28 rounded-full border-[3px] border-white bg-[#F1F1F1] overflow-hidden shadow-lg">
                <Image
                  src={profile.futureState.image}
                  alt="Future You"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="px-5 pt-4 pb-6">
              <div className="text-center mb-4">
                <h5 className="text-lg font-jakarta font-medium">
                  {profile.name}
                </h5>
                <p className="text-xs mt-1 font-jakarta">{profile.futureState.title}</p>
              </div>

              <div className="border-y py-4 space-y-2 mb-4 font-jakarta">
                {[
                  ["Status", profile.futureState.status],
                  ["Visibility Score", profile.futureState.visibilityScore],
                  ["Influence Rating", profile.futureState.influenceRating],
                  ["Access Level", profile.futureState.accessLevel],
                ].map(([label, value], i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="uppercase text-[#7A7777] font-semibold font-jakarta">
                      {label}
                    </span>
                    <span className="font-semibold font-jakarta">{value}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs uppercase font-bold text-[#0B64F4] font-montserrat mb-2">
                Known For
              </p>
              <ul className="text-sm space-y-1 mb-5 font-jakarta">
                {profile.futureState.knownFor.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-1 h-1 bg-black rounded-full mt-2 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs uppercase font-bold text-center text-[#0B64F4] font-montserrat mb-2">
                Promotability Quotient{" "}
                <span className="ml-1 font-montserrat">
                  {profile.futureState.promotabilityQuotient}
                </span>
              </p>
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div
                  className="h-full bg-[#0B64F4] rounded-full transition-all duration-500"
                  style={{ width: profile.futureState.promotabilityQuotient }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-3 mb-6 bg-white rounded-3xl border-2 border-[#A8A8A8] p-0.5">
        <button
          onClick={() => setActiveTab('current')}
          className={`flex-1 py-3 px-6 rounded-full font-semibold font-jakarta text-sm transition-all ${
            activeTab === 'current'
              ? 'bg-gradient-to-r from-[#1a1a1a] to-[#000000] text-white border-2 border-black shadow-lg'
              : 'bg-white text-gray-500 border-2 border-gray-200'
          }`}
        >
          Current State
        </button>
        <button
          onClick={() => setActiveTab('future')}
          className={`flex-1 py-3 px-6 rounded-full font-semibold font-jakarta text-sm transition-all ${
            activeTab === 'future'
              ? 'bg-gradient-to-r from-[#0B64F4] to-[#0952d4] text-white border-2 border-[#0B64F4] shadow-lg'
              : 'bg-white text-gray-500 border-2 border-gray-200'
          }`}
        >
          Future You
        </button>
      </div>

      {/* Get Early Access Button - Mobile */}
      <div className="flex justify-center mt-6">
        <button 
          onClick={scrollToWaitlist}
          className="bg-[#0B64F4] hover:bg-[#0952d4] text-white font-jakarta font-semibold text-base px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          Get Early Access
        </button>
      </div>
    </div>

    </>
  );
}