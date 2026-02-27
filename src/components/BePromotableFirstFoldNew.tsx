"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import harshImg from '../assets/harshImg.jpg';
import harshImage from '../assets/harshImage.png';

export default function BePromotableFirstFold() {

  const [isFlipped, setIsFlipped] = useState(false);

  // Auto-flip every 3 seconds on small devices
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
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
      title: "SOFTWARE DEVELOPER",
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
      <div className="hidden lg:block bg-[#FFFFFF] py-12 px-8 relative overflow-hidden">
        <div className="container mx-auto relative z-10 max-w-7xl">

          {/* Top Heading */}
          <div className="mb-12" style={{
            transform: "translateX(-50px)"
          }}>
            <h2 className="text-5xl xl:text-[64px] font-jakarta font-normal text-black mb-1">
              #BePromotable.
            </h2>
            <h3 className="text-5xl xl:text-[68px] font-jakarta font-semibold text-[#014BAA] leading-tight">
              Stop Being Overlooked.
            </h3>
          </div>

          {/* Main Flex: Cards Left, Text Right */}
          <div className="flex items-center gap-8 xl:gap-12">

            {/* LEFT: Cards — side by side, overlapping, with tilt */}
            <div className="flex-1 relative" style={{ height: '600px', width: '70%' }}>

              {/* Current State Card — behind, tilted slightly left, offset left */}
              <div
                className="absolute"
                style={{
                  transform: "rotate(-8deg)",
                  transformOrigin: "bottom center",
                  left: '0px',
                  top: '30px',
                  zIndex: 10,
                }}
              >
                <div style={{
                  width: "340px"
                }} className="bg-white rounded-[25px] border-2 border-[#D9D9D9] w-[280px] xl:w-[300px] shadow-2xl overflow-hidden">
                  {/* Black Header */}
                  <div className="bg-black pt-5 px-4 relative min-h-[120px]">
                    <h4 className="text-[10px] font-montserrat uppercase text-white tracking-widest font-semibold text-center">
                      Current State
                    </h4>
                  </div>

                  {/* Avatar overlapping header */}
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
                          <span className="text-[#B3B3B3] text-[10px] font-extrabold w-[8px] text-center ml-3">:</span>
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
                            <div className="mr-2 h-1 bg-black w-1 rounded-full mt-[3%] shrink-0"></div>
                            <span className="font-jakarta">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-gray-200 pt-4 pb-2">
                      <div className="flex justify-center items-center mb-2">
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
              </div>

              {/* Future You Card — front, tilted slightly right, offset right */}
              <div
                className="absolute"
                style={{
                  transform: "rotate(8deg)",
                  transformOrigin: "bottom center",
                  left: '230px',
                  top: '0px',
                  zIndex: 20,
                }}
              >
                <div style={{
                  width: "340px",
                }} className="bg-white rounded-[25px] border-2 border-[#E9E9E9] w-[300px] xl:w-[320px] shadow-2xl overflow-hidden">
                  {/* Blue Header */}
                  <div className="bg-[#0B64F4] pt-5 px-4 relative min-h-[140px]">
                    <h4 className="text-[10px] font-montserrat uppercase text-white tracking-widest font-semibold text-center">
                      Future You
                    </h4>
                  </div>

                  {/* Avatar overlapping header */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-[65px]">
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
                          <span className="text-[#B3B3B3] font-extrabold text-[10px] w-[8px] text-center ml-3">:</span>
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
                            <div className="mr-2 h-1 bg-black w-1 rounded-full mt-[3%] shrink-0"></div>
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

            {/* RIGHT: Text */}
            <div className="w-[330px] md:w-[40%] shrink-0 relative z-20">
              <p className="text-[#014BAA] font-jakarta text-[28px]  mb-8 leading-9">
                The exclusive 2-month intensive program that transforms{" "}
                <span className="font-bold">8-18+ year professionals.</span>
              </p>
              <p className="text-[#464646] font-inter font-medium text-sm md:text-[19px] mb-8 leading-relaxed">
                Triple your chances of getting promoted in the next 8 weeks by mastering how promotions actually work.
              </p>
              <button
                onClick={scrollToWaitlist}
                className="bg-[#014BAA] hover:bg-[#0952d4] text-white font-jakarta font-semibold text-lg px-8 py-4 rounded-[12px] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-3"
              >
                Request Access <span>→</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ================= MOBILE VERSION ================= */}
      <div className="block lg:hidden bg-white px-2 py-6">

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-[24px] md:text-[30px] font-quattrocento font-normal text-black leading-tight">
            #BePromotable.
          </h2>
          <h3 className="text-[28px] font-jakarta font-medium text-[#014BAA] mt-0.5 leading-tight">
            Stop Being Overlooked.
          </h3>
        </div>

        {/* Flip Card Container */}
        <div
          className="relative mx-auto mb-4 cursor-pointer"
          style={{ width: '300px', height: '550px', perspective: '1200px' }}
          onClick={() => setIsFlipped((prev) => !prev)}
        >
          {/* Inner wrapper that flips */}
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >

            {/* ── FRONT FACE: Current State ── */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="bg-white rounded-[20px] border-2 border-[#D9D9D9] shadow-2xl overflow-hidden h-full flex flex-col">
                {/* Black Header */}
                <div className="bg-black pt-5 px-4 relative" style={{ minHeight: '100px' }}>
                  <h4 className="text-[10px] font-montserrat uppercase text-white tracking-widest font-semibold text-center">
                    Current State
                  </h4>
                </div>

                {/* Avatar overlapping header */}
                <div className="relative flex justify-center" style={{ marginTop: '-44px' }}>
                  <div className="w-24 h-24 rounded-full border-[2.5px] border-[#E8E8E8] bg-[#F1F1F1] flex items-center justify-center shadow-xl overflow-hidden">
                    <div className="relative w-[86px] h-[86px] rounded-full overflow-hidden">
                      <Image
                        src={profile.currentState.image}
                        alt="Current State"
                        fill
                        className="object-cover rounded-full scale-[1.05]"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white px-5 py-4 flex flex-col flex-1">
                  <div className="flex flex-col items-center mb-3">
                    <h5 className="text-base font-medium font-gotham text-[#1C1C1C]">{profile.name}</h5>
                    <p className="text-[11px] font-normal font-gotham text-[#1C1C1C] mt-1">{profile.currentState.title}</p>
                  </div>

                  <div className="space-y-1.5 mb-4 border-y py-3 border-[#E3E3E3]">
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
                        <span className="text-[#B3B3B3] text-[10px] font-extrabold w-[8px] text-center ml-2">:</span>
                        <span className="text-black font-semibold text-[10px] font-jakarta flex-1 ml-2">
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
                          <div className="mr-2 h-1 bg-black w-1 rounded-full mt-[5px] shrink-0"></div>
                          <span className="font-jakarta">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-gray-200 pt-3 pb-1 mt-auto">
                    <div className="flex justify-center items-center mb-2">
                      <span className="text-[10px] uppercase font-montserrat tracking-wide font-bold text-black">
                        Promotability Quotient{" "}
                        <span className="font-bold ml-1 text-black text-sm font-montserrat">
                          {profile.currentState.promotabilityQuotient}
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black rounded-full"
                        style={{ width: profile.currentState.promotabilityQuotient }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── BACK FACE: Future You ── */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="bg-white rounded-[20px] border-2 border-[#E9E9E9] shadow-2xl overflow-hidden h-full flex flex-col">
                {/* Blue Header */}
                <div className="bg-[#0B64F4] pt-5 px-4 relative" style={{ minHeight: '100px' }}>
                  <h4 className="text-[10px] font-montserrat uppercase text-white tracking-widest font-semibold text-center">
                    Future You
                  </h4>
                </div>

                {/* Avatar overlapping header */}
                <div className="relative flex justify-center" style={{ marginTop: '-44px' }}>
                  <div className="w-24 h-24 rounded-full border-[2.5px] border-[#E8E8E8] bg-[#F1F1F1] flex items-center justify-center shadow-xl overflow-hidden">
                    <div className="relative w-[86px] h-[86px] rounded-full overflow-hidden">
                      <Image
                        src={profile.futureState.image}
                        alt="Future State"
                        fill
                        className="object-cover rounded-full scale-[1.1]"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white px-5 py-4 flex flex-col flex-1">
                  <div className="flex flex-col items-center mb-3">
                    <h5 className="text-base font-medium text-[#1C1C1C] font-gotham">{profile.name}</h5>
                    <p className="text-[11px] font-normal text-[#1C1C1C] font-gotham mt-1">{profile.futureState.title}</p>
                  </div>

                  <div className="space-y-1.5 mb-4 border-y py-3 border-[#E3E3E3]">
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
                        <span className="text-[#B3B3B3] font-extrabold text-[10px] w-[8px] text-center ml-2">:</span>
                        <span className="text-black font-semibold text-[10px] font-jakarta flex-1 ml-2">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="text-left mb-4">
                    <p className="font-montserrat text-[10px] text-[#0B64F4] mb-2 uppercase tracking-wide font-bold">
                      Known For
                    </p>
                    <ul className="text-xs font-normal text-[#323232] space-y-1">
                      {profile.futureState.knownFor.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 h-1 bg-black w-1 rounded-full mt-[5px] shrink-0"></div>
                          <span className="font-jakarta">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-gray-200 pt-3 pb-1 mt-auto">
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
                        className="h-full bg-[#0B64F4] rounded-full"
                        style={{ width: profile.futureState.promotabilityQuotient }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Flip Indicator Dots */}
        {/* <div className="flex justify-center items-center gap-2 mb-6">
        <button
          onClick={() => setIsFlipped(false)}
          className={`h-2 rounded-full transition-all duration-300 ${
            !isFlipped ? 'w-6 bg-black' : 'w-2 bg-gray-300'
          }`}
        />
        <button
          onClick={() => setIsFlipped(true)}
          className={`h-2 rounded-full transition-all duration-300 ${
            isFlipped ? 'w-6 bg-[#0B64F4]' : 'w-2 bg-gray-300'
          }`}
        />
      </div> */}

        {/* Tap hint */}
        {/* <p className="text-center text-[11px] text-gray-400 font-jakarta mb-6">
        Tap card to flip
      </p> */}

        {/* Text Content */}
        <div className="text-center mb-4 px-4 md:px-2">
          <p className="text-[#014BAA] max-w-xs font-inter font-medium text-[18px] md:text-xl leading-6 mb-3">
            The exclusive 2-month intensive program that transforms{" "}
            <span className="font-bold">8-18+ year professionals.</span>
          </p>
          <p className="text-[#464646] font-inter font-medium text-[12px] leading-4">
            Triple your chances of getting promoted in the next 8 weeks by mastering how promotions actually work.
          </p>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-2">
          <button
            onClick={scrollToWaitlist}
            className="bg-[#014BAA] hover:bg-[#0952d4] text-white font-inter font-medium text-[12px] px-5 py-2 rounded-[8px] shadow-lg transition-all duration-300 hover:shadow-xl flex items-center gap-3"
          >
            Request Access <span>→</span>
          </button>
        </div>
      </div>
    </>
  );
}

// "use client"

// import React from 'react';
// // import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import harshImg from '../assets/harshImg.jpg';
// import harshImage from '../assets/harshImage.png';

// export default function BePromotableFirstFold() {
// //   const [activeTab, setActiveTab] = useState('current');

// //   // Auto-switch tabs every 3 seconds on small devices
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setActiveTab((prev) => (prev === 'current' ? 'future' : 'current'));
// //     }, 3000);
// //     return () => clearInterval(interval);
// //   }, []);

//   const scrollToWaitlist = () => {
//     const element = document.getElementById('waitlist');
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   const profile = {
//     name: "Harsh Agarwal",
//     currentState: {
//       image: harshImg,
//       status: "Invisible Contributor",
//       title: "SENIOR PRODUCT MANAGER",
//       visibilityScore: "34/100",
//       influenceRating: "Operational",
//       accessLevel: "Restricted",
//       knownFor: [
//         "Task Management",
//         "Fixing Problems Quietly",
//         "Subject Matter Expertise",
//         "Tactical Execution"
//       ],
//       promotabilityQuotient: "34%"
//     },
//     futureState: {
//       image: harshImage,
//       status: "Business Driver",
//       title: "SENIOR PRODUCT MANAGER",
//       visibilityScore: "92/100",
//       influenceRating: "Strategic",
//       accessLevel: "Unrestricted",
//       knownFor: [
//         "Stakeholder Management",
//         "Executive Communication",
//         "Cross-functional Leadership",
//         "Big-picture Thinking"
//       ],
//       promotabilityQuotient: "94%"
//     }
//   };

//   return (
//     <>
//     {/* ================= DESKTOP VERSION ================= */}
//     <div className="hidden lg:block bg-[#FFFFFF] py-12 px-8 relative overflow-hidden">
//       <div className="container mx-auto relative z-10 max-w-7xl">

//         {/* Top Heading */}
//         <div className="mb-12" style={{
//             transform: "translateX(-50px)"
//         }}>
//           <h2 className="text-5xl xl:text-[64px] font-jakarta font-normal text-black mb-1">
//             #BePromotable.
//           </h2>
//           <h3 className="text-5xl xl:text-[68px] font-jakarta font-semibold text-[#014BAA] leading-tight">
//             Stop Being Overlooked.
//           </h3>
//         </div>

//         {/* Main Flex: Cards Left, Text Right */}
//         <div className="flex items-center gap-8 xl:gap-12">

//           {/* LEFT: Cards — side by side, overlapping, with tilt */}
//           <div className="flex-1 relative" style={{ height: '600px', width: '70%' }}>

//             {/* Current State Card — behind, tilted slightly left, offset left */}
//             <div
//               className="absolute"
//               style={{
//                 transform: "rotate(-8deg)",
//                 transformOrigin: "bottom center",
//                 left: '0px',
//                 top: '30px',
//                 zIndex: 10,
//               }}
//             >
//               <div style={{
//                 width: "340px"
//               }} className="bg-white rounded-[25px] border-2 border-[#D9D9D9] w-[280px] xl:w-[300px] shadow-2xl overflow-hidden">
//                 {/* Black Header */}
//                 <div className="bg-black pt-5 px-4 relative min-h-[120px]">
//                   <h4 className="text-[10px] font-montserrat uppercase text-white tracking-widest font-semibold text-center">
//                     Current State
//                   </h4>
//                 </div>

//                 {/* Avatar overlapping header */}
//                 <div className="absolute left-1/2 -translate-x-1/2 top-[45px]">
//                   <div className="w-28 h-28 xl:w-32 xl:h-32 rounded-full border-[2.5px] border-[#E8E8E8] bg-[#F1F1F1] flex items-center justify-center shadow-xl">
//                     <div className="relative w-full h-full rounded-full flex items-center justify-center scale-[0.95]">
//                       <div className="relative w-[100px] h-[100px] xl:w-[115px] xl:h-[115px] rounded-full overflow-hidden">
//                         <Image
//                           src={profile.currentState.image}
//                           alt="Current State"
//                           fill
//                           className="object-cover rounded-full scale-[1.05]"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white px-4 py-5 mt-10 xl:mt-12">
//                   <div className="flex flex-col items-center mb-3">
//                     <h5 className="text-base xl:text-lg font-medium font-gotham text-[#1C1C1C]">{profile.name}</h5>
//                     <p className="text-xs xl:text-sm font-normal font-gotham text-[#1C1C1C] mt-1">{profile.currentState.title}</p>
//                   </div>

//                   <div className="text-sm space-y-1.5 mb-5 border-y py-3 border-[#E3E3E3]">
//                     {[
//                       { label: "Status", value: profile.currentState.status },
//                       { label: "Visibility Score", value: profile.currentState.visibilityScore },
//                       { label: "Influence Rating", value: profile.currentState.influenceRating },
//                       { label: "Access Level", value: profile.currentState.accessLevel },
//                     ].map((item, index) => (
//                       <div key={index} className="flex items-center">
//                         <span className="text-[#7A7777] font-semibold text-[10px] uppercase tracking-wide font-jakarta w-[110px]">
//                           {item.label}
//                         </span>
//                         <span className="text-[#B3B3B3] text-[10px] font-extrabold w-[8px] text-center ml-3">:</span>
//                         <span className="text-black font-semibold text-[10px] font-jakarta flex-1 ml-3">
//                           {item.value}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="text-left mb-4">
//                     <p className="font-montserrat text-[10px] text-black mb-2 uppercase tracking-wide font-bold">
//                       Known For
//                     </p>
//                     <ul className="text-xs font-normal text-[#323232] space-y-1">
//                       {profile.currentState.knownFor.map((item, index) => (
//                         <li key={index} className="flex items-start">
//                           <div className="mr-2 h-1 bg-black w-1 rounded-full mt-[3%] shrink-0"></div>
//                           <span className="font-jakarta">{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="border-t border-gray-200 pt-4 pb-2">
//                     <div className="flex justify-center items-center mb-2">
//                       <span className="text-[10px] uppercase font-montserrat tracking-wide font-bold text-black">
//                         Promotability Quotient{" "}
//                         <span className="font-bold ml-1 text-black text-sm font-montserrat">
//                           {profile.currentState.promotabilityQuotient}
//                         </span>
//                       </span>
//                     </div>
//                     <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-black rounded-full transition-all duration-500"
//                         style={{ width: profile.currentState.promotabilityQuotient }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Future You Card — front, tilted slightly right, offset right */}
//             <div
//               className="absolute"
//               style={{
//                 transform: "rotate(8deg)",
//                 transformOrigin: "bottom center",
//                 left: '230px',
//                 top: '0px',
//                 zIndex: 20,
//               }}
//             >
//               <div style={{
//                 width: "340px",
//               }} className="bg-white rounded-[25px] border-2 border-[#E9E9E9] w-[300px] xl:w-[320px] shadow-2xl overflow-hidden">
//                 {/* Blue Header */}
//                 <div className="bg-[#0B64F4] pt-5 px-4 relative min-h-[140px]">
//                   <h4 className="text-[10px] font-montserrat uppercase text-white tracking-widest font-semibold text-center">
//                     Future You
//                   </h4>
//                 </div>

//                 {/* Avatar overlapping header */}
//                 <div className="absolute left-1/2 -translate-x-1/2 top-[65px]">
//                   <div className="w-28 h-28 xl:w-32 xl:h-32 rounded-full border-[2.5px] border-[#E8E8E8] bg-[#F1F1F1] flex items-center justify-center shadow-xl">
//                     <div className="relative w-full h-full rounded-full flex items-center justify-center scale-[0.95]">
//                       <div className="relative w-[100px] h-[100px] xl:w-[115px] xl:h-[115px] rounded-full overflow-hidden">
//                         <Image
//                           src={profile.futureState.image}
//                           alt="Future State"
//                           fill
//                           className="object-cover rounded-full scale-[1.1]"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white px-5 py-5 mt-10 xl:mt-12">
//                   <div className="flex flex-col items-center mb-3">
//                     <h5 className="text-base xl:text-lg font-medium text-[#1C1C1C] font-gotham">{profile.name}</h5>
//                     <p className="text-xs xl:text-sm font-normal text-[#1C1C1C] font-gotham mt-1">{profile.futureState.title}</p>
//                   </div>

//                   <div className="text-sm space-y-1.5 mb-5 border-y py-3 border-[#E3E3E3]">
//                     {[
//                       { label: "Status", value: profile.futureState.status },
//                       { label: "Visibility Score", value: profile.futureState.visibilityScore },
//                       { label: "Influence Rating", value: profile.futureState.influenceRating },
//                       { label: "Access Level", value: profile.futureState.accessLevel },
//                     ].map((item, index) => (
//                       <div key={index} className="flex items-center">
//                         <span className="text-[#7A7777] font-semibold text-[10px] uppercase tracking-wide font-jakarta w-[110px]">
//                           {item.label}
//                         </span>
//                         <span className="text-[#B3B3B3] font-extrabold text-[10px] w-[8px] text-center ml-3">:</span>
//                         <span className="text-black font-semibold text-[10px] font-jakarta flex-1 ml-3">
//                           {item.value}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="text-left mb-3">
//                     <p className="font-montserrat text-[10px] text-[#0B64F4] mb-2 uppercase tracking-wide font-bold">
//                       Known For
//                     </p>
//                     <ul className="text-xs font-normal text-[#323232] space-y-1">
//                       {profile.futureState.knownFor.map((item, index) => (
//                         <li key={index} className="flex items-start">
//                           <div className="mr-2 h-1 bg-black w-1 rounded-full mt-[3%] shrink-0"></div>
//                           <span className="font-jakarta">{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="border-t border-gray-200 pt-4 pb-2">
//                     <div className="flex justify-center items-center mb-2">
//                       <span className="text-[10px] font-montserrat uppercase tracking-wide font-bold text-[#0B64F4]">
//                         Promotability Quotient{" "}
//                         <span className="font-bold text-[#0B64F4] ml-1 text-sm font-montserrat">
//                           {profile.futureState.promotabilityQuotient}
//                         </span>
//                       </span>
//                     </div>
//                     <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-[#0B64F4] rounded-full transition-all duration-500"
//                         style={{ width: profile.futureState.promotabilityQuotient }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>

//           {/* RIGHT: Text */}
//           <div className="w-[330px] md:w-[40%] shrink-0 relative z-20">
//             <p className="text-[#014BAA] font-jakarta text-[28px]  mb-8 leading-9">
//               The exclusive 2-month intensive program that transforms{" "}
//               <span className="font-bold">8-18+ year professionals.</span>
//             </p>
//             <p className="text-[#464646] font-jakarta text-sm md:text-[19px] mb-8 leading-relaxed">
//               Triple your chances of getting promoted in the next 8 weeks by mastering how promotions actually work.
//             </p>
//             <button
//               onClick={scrollToWaitlist}
//               className="bg-[#014BAA] hover:bg-[#0952d4] text-white font-jakarta font-semibold text-lg px-8 py-4 rounded-[12px] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-3"
//             >
//               Request Access <span>→</span>
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>

//     {/* ================= MOBILE VERSION ================= */}
//     <div className="block lg:hidden bg-white px-5 py-10">

//       {/* Header */}
//       <div className="text-center mb-8">
//         <h2 className="text-[30px] font-jakarta font-bold text-black leading-tight">
//           #BePromotable.
//         </h2>
//         <h3 className="text-[28px] font-jakarta font-bold text-[#0B64F4] mt-0.5 leading-tight">
//           Stop Being Overlooked.
//         </h3>
//       </div>

//       {/* Cards — side by side, overlapping, tilted — SMALLER for mobile */}
//       <div className="relative mb-10" style={{ height: '380px' }}>

//         {/* Current State Card — behind, tilted left */}
//         <div
//           className="absolute"
//           style={{
//             transform: "rotate(-6deg)",
//             transformOrigin: "bottom center",
//             left: '20px',
//             top: '20px',
//             zIndex: 10,
//           }}
//         >
//           <div
//             className="bg-white rounded-[14px] border-2 border-[#D9D9D9] shadow-2xl overflow-hidden"
//             style={{ width: '185px' }}
//           >
//             {/* Black Header */}
//             <div className="bg-black pt-4 px-3 relative" style={{ minHeight: '88px' }}>
//               <h4 className="font-montserrat uppercase text-white tracking-widest font-semibold text-center" style={{ fontSize: '8px' }}>
//                 Current State
//               </h4>
//             </div>

//             {/* Avatar overlapping header */}
//             <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '45px' }}>
//               <div
//                 className="rounded-full border-2 border-[#E8E8E8] bg-[#F1F1F1] flex items-center justify-center shadow-xl overflow-hidden"
//                 style={{ width: '70px', height: '70px' }}
//               >
//                 <div className="relative rounded-full overflow-hidden" style={{ width: '63px', height: '63px' }}>
//                   <Image
//                     src={profile.currentState.image}
//                     alt="Current State"
//                     fill
//                     className="object-cover rounded-full scale-[1.05]"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white px-3 py-3" style={{ marginTop: '35px' }}>
//               <div className="flex flex-col items-center" style={{ marginBottom: '8px' }}>
//                 <h5 className="font-medium font-gotham text-[#1C1C1C]" style={{ fontSize: '10px' }}>{profile.name}</h5>
//                 <p className="font-normal font-gotham text-[#1C1C1C]" style={{ fontSize: '7px', marginTop: '2px' }}>{profile.currentState.title}</p>
//               </div>

//               <div className="border-y border-[#E3E3E3]" style={{ paddingTop: '6px', paddingBottom: '6px', marginBottom: '7px' }}>
//                 {[
//                   { label: "Status", value: profile.currentState.status },
//                   { label: "Visibility Score", value: profile.currentState.visibilityScore },
//                   { label: "Influence Rating", value: profile.currentState.influenceRating },
//                   { label: "Access Level", value: profile.currentState.accessLevel },
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-center" style={{ marginBottom: index < 3 ? '3px' : 0 }}>
//                     <span
//                       className="text-[#7A7777] font-semibold uppercase tracking-wide font-jakarta"
//                       style={{ fontSize: '7px', width: '72px', flexShrink: 0 }}
//                     >
//                       {item.label}
//                     </span>
//                     <span
//                       className="text-[#B3B3B3] font-extrabold text-center"
//                       style={{ fontSize: '7px', width: '6px', marginLeft: '2px', flexShrink: 0 }}
//                     >:</span>
//                     <span
//                       className="text-black font-semibold font-jakarta"
//                       style={{ fontSize: '7px', marginLeft: '4px' }}
//                     >
//                       {item.value}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="text-left" style={{ marginBottom: '7px' }}>
//                 <p
//                   className="font-montserrat text-black uppercase tracking-wide font-bold"
//                   style={{ fontSize: '7px', marginBottom: '4px' }}
//                 >
//                   Known For
//                 </p>
//                 <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
//                   {profile.currentState.knownFor.map((item, index) => (
//                     <li key={index} className="flex items-start" style={{ marginBottom: '2px' }}>
//                       <div
//                         className="bg-black rounded-full shrink-0"
//                         style={{ width: '3px', height: '3px', marginRight: '4px', marginTop: '3px' }}
//                       ></div>
//                       <span className="font-jakarta text-[#323232]" style={{ fontSize: '7px' }}>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="border-t border-gray-200" style={{ paddingTop: '7px', paddingBottom: '4px' }}>
//                 <div className="flex justify-center items-center" style={{ marginBottom: '4px' }}>
//                   <span
//                     className="uppercase font-montserrat tracking-wide font-bold text-black"
//                     style={{ fontSize: '7px' }}
//                   >
//                     Promotability Quotient{" "}
//                     <span className="font-bold text-black" style={{ fontSize: '9px' }}>
//                       {profile.currentState.promotabilityQuotient}
//                     </span>
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full overflow-hidden" style={{ height: '6px' }}>
//                   <div
//                     className="h-full bg-black rounded-full"
//                     style={{ width: profile.currentState.promotabilityQuotient }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Future You Card — in front, tilted right */}
//         <div
//           className="absolute"
//           style={{
//             transform: "rotate(8deg)",
//             transformOrigin: "bottom center",
//             right: '45px',
//             top: '5px',
//             zIndex: 20,
//           }}
//         >
//           <div
//             className="bg-white rounded-[14px] border-2 border-[#E9E9E9] shadow-2xl overflow-hidden"
//             style={{ width: '185px',
//             height: "385px"
//              }}
//           >
//             {/* Blue Header */}
//             <div className="bg-[#0B64F4] pt-4 px-3 relative" style={{ minHeight: '88px' }}>
//               <h4 className="font-montserrat uppercase text-white tracking-widest font-semibold text-center" style={{ fontSize: '8px' }}>
//                 Future You
//               </h4>
//             </div>

//             {/* Avatar overlapping header */}
//             <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '45px' }}>
//               <div
//                 className="rounded-full border-2 border-[#E8E8E8] bg-[#F1F1F1] flex items-center justify-center shadow-xl overflow-hidden"
//                 style={{ width: '70px', height: '70px' }}
//               >
//                 <div className="relative rounded-full overflow-hidden" style={{ width: '63px', height: '63px' }}>
//                   <Image
//                     src={profile.futureState.image}
//                     alt="Future State"
//                     fill
//                     className="object-cover rounded-full scale-[1.1]"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white px-3 py-3" style={{ marginTop: '35px' }}>
//               <div className="flex flex-col items-center" style={{ marginBottom: '8px' }}>
//                 <h5 className="font-medium font-gotham text-[#1C1C1C]" style={{ fontSize: '10px' }}>{profile.name}</h5>
//                 <p className="font-normal font-gotham text-[#1C1C1C]" style={{ fontSize: '7px', marginTop: '2px' }}>{profile.futureState.title}</p>
//               </div>

//               <div className="border-y border-[#E3E3E3]" style={{ paddingTop: '6px', paddingBottom: '6px', marginBottom: '7px' }}>
//                 {[
//                   { label: "Status", value: profile.futureState.status },
//                   { label: "Visibility Score", value: profile.futureState.visibilityScore },
//                   { label: "Influence Rating", value: profile.futureState.influenceRating },
//                   { label: "Access Level", value: profile.futureState.accessLevel },
//                 ].map((item, index) => (
//                   <div key={index} className="flex items-center" style={{ marginBottom: index < 3 ? '3px' : 0 }}>
//                     <span
//                       className="text-[#7A7777] font-semibold uppercase tracking-wide font-jakarta"
//                       style={{ fontSize: '7px', width: '72px', flexShrink: 0 }}
//                     >
//                       {item.label}
//                     </span>
//                     <span
//                       className="text-[#B3B3B3] font-extrabold text-center"
//                       style={{ fontSize: '7px', width: '6px', marginLeft: '2px', flexShrink: 0 }}
//                     >:</span>
//                     <span
//                       className="text-black font-semibold font-jakarta"
//                       style={{ fontSize: '7px', marginLeft: '4px' }}
//                     >
//                       {item.value}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="text-left" style={{ marginBottom: '7px' }}>
//                 <p
//                   className="font-montserrat text-[#0B64F4] uppercase tracking-wide font-bold"
//                   style={{ fontSize: '7px', marginBottom: '4px' }}
//                 >
//                   Known For
//                 </p>
//                 <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
//                   {profile.futureState.knownFor.map((item, index) => (
//                     <li key={index} className="flex items-start" style={{ marginBottom: '2px' }}>
//                       <div
//                         className="bg-black rounded-full shrink-0"
//                         style={{ width: '3px', height: '3px', marginRight: '4px', marginTop: '3px' }}
//                       ></div>
//                       <span className="font-jakarta text-[#323232]" style={{ fontSize: '7px' }}>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="border-t border-gray-200" style={{ paddingTop: '7px', paddingBottom: '4px' }}>
//                 <div className="flex justify-center items-center" style={{ marginBottom: '4px' }}>
//                   <span
//                     className="uppercase font-montserrat tracking-wide font-bold text-[#0B64F4]"
//                     style={{ fontSize: '7px' }}
//                   >
//                     Promotability Quotient{" "}
//                     <span className="font-bold text-[#0B64F4]" style={{ fontSize: '9px' }}>
//                       {profile.futureState.promotabilityQuotient}
//                     </span>
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full overflow-hidden" style={{ height: '6px' }}>
//                   <div
//                     className="h-full bg-[#0B64F4] rounded-full"
//                     style={{ width: profile.futureState.promotabilityQuotient }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* Text Content */}
//       <div className="text-center mb-6 px-6">
//         <p className="text-[#014BAA] font-jakarta font-medium text-xl leading-6 mb-3">
//           The exclusive 2-month intensive program that transforms{" "}
//           <span className="font-bold">8-18+ year professionals.</span>
//         </p>
//         <p className="text-[#555] font-jakarta text-sm leading-5">
//           Triple your chances of getting promoted in the next 8 weeks by mastering how promotions actually work.
//         </p>
//       </div>

//       {/* Button */}
//       <div className="flex justify-center mt-6">
//         <button
//           onClick={scrollToWaitlist}
//           className="bg-[#014BAA] hover:bg-[#0952d4] text-white font-jakarta font-semibold text-base px-8 py-4 rounded-[8px] shadow-lg transition-all duration-300 hover:shadow-xl flex items-center gap-3"
//         >
//           Request Access <span>→</span>
//         </button>
//       </div>
//     </div>
//     </>
//   );
// }