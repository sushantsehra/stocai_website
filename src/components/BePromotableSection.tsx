import React from 'react';
import Image from 'next/image';
import bgColor from '../assets/bgCircle.png';
import harshImg from '../assets/harshImg.jpg';
import harshImage from '../assets/harshImage.png';

export default function BePromotableSection() {
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
    <div className="bg-white py-12 lg:py-12 lg:pt-12 px-4 relative overflow-hidden container mx-auto mt-6">
      {/* Background Glow moved below all text */}
      <div className="hidden md:block absolute inset-0 flex justify-center items-center">
        <Image
          src={bgColor}
          alt="Background Glow"
          className="w-[900px] h-[960px] rotate-[135deg] lg:translate-x-[22%] 2xl:translate-x-[35%] opacity-50 pointer-events-none z-0 mt-44"
        />
      </div>

      <div className="max-w-full mx-auto relative z-50">
        {/* Header always on top */}
        <div className="text-center mb-10 relative z-[60]">
          <h2 className="text-[32px] sm:text-5xl lg:text-[70px] font-jakarta font-bold text-[#0B64F4] relative z-[60]">
            #BePromotable.
          </h2>
          <h3 className="text-lg sm:text-2xl lg:text-[40px] font-jakarta font-bold text-black mt-3 lg:mt-5 mb-2 relative z-[60]">
            Stop being the hard worker who gets overlooked.
          </h3>
          <p className="text-black font-normal max-w-5xl font-jakarta mx-auto mb-2 mt-2 lg:mt-3.5 text-sm sm:text-base md:text-lg relative z-[60]">
            A promotion strategy system for experienced professionals who feel
            stuck despite doing everything &apos;right&apos;.
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16 mb-2 z-40 lg:translate-y-[-10px]">
          {/* Current State Card */}
          <div
            className="relative mt-6 lg:mt-32 bg-white rounded-[25px] border-2 border-[#D9D9D9] w-full sm:w-[380px] lg:w-[385px] shadow-2xl overflow-hidden z-40"
            // className="relative mt-32 bg-white rounded-[25px] bg-gradient-to-br from-[#D9D9D9] to-[#707070] p-2 w-full sm:w-[380px] lg:w-[385px] shadow-2xl overflow-hidden z-40"
            style={{
              transform: "rotate(-9deg) perspective(1000px) rotateY(0deg)",
            }}
          >
            <div className="bg-black pt-6 px-5 relative min-h-[150px]">
              <h4 className="text-xs md:text-[14px] font-montserrat uppercase text-white mb-6 tracking-widest font-semibold text-center">
                Current State
              </h4>
            </div>
{/* 
            <div className="w-28 h-28 md:w-32 md:h-32 2xl:w-[164px] 2xl:h-[164px] rounded-full overflow-hidden border-[2.76px] border-[#E8E8E8] shadow-xl mx-auto bg-[#F1F1F1] absolute left-1/2 -translate-x-1/2 top-[65px]">
              <Image
                src={profile.currentState.image}
                alt="Current State"
                width={141}
                height={141}
                className="object-cover w-full h-full"
              />
            </div> */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[57px]">
              {/* Outer Border */}
              <div className="w-32 h-32 md:w-36 md:h-36 lg:w-[155px] 2xl:w-[163.9772931092164px] 
                              lg:h-[155px] 2xl:h-[163.9772931092164px]
                              rounded-full border-[2.76px] border-[#E8E8E8] bg-[#F1F1F1]
                              flex items-center justify-center shadow-xl">

                {/* Inner Border */}
                <div className="relative w-full h-full rounded-full 
                                flex items-center justify-center scale-[0.95]">

                  {/* Image */}
                  <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden">
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


            <div className="bg-white px-5 py-6 mt-8 lg:mt-12 2xl:mt-16">
              <div className="flex flex-col items-center mb-3">
                <h5 className="text-lg md:text-[23px] font-medium font-gotham text-[#1C1C1C]">{profile.name}</h5>
                <p className="text-sm md:text-[14px] font-normal font-gotham text-[#1C1C1C] mt-1">{profile.currentState.title}</p>
              </div>

              <div className="text-sm space-y-1 md:space-y-2 mb-6 border-y py-4 border-[#E3E3E3]">
                {[
                  { label: "Status", value: profile.currentState.status },
                  { label: "Visibility Score", value: profile.currentState.visibilityScore },
                  { label: "Influence Rating", value: profile.currentState.influenceRating },
                  { label: "Access Level", value: profile.currentState.accessLevel },
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-[#7A7777] font-semibold text-xs md:text-[10px] lg:text-[12px] uppercase tracking-wide font-jakarta w-[130px]">
                      {item.label}
                    </span>
                    <span className="text-[#B3B3B3] text-[10px] font-extrabold lg:text-[12px] w-[10px] text-center ml-4">
                      :
                    </span>
                    <span className="text-black font-semibold text-[10px] lg:text-[12px] font-jakarta flex-1 ml-4">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-left mt-2 mb-4">
                <p className="font-montserrat text-xs md:text-[10px] lg:text-[12px] text-black mb-2 uppercase tracking-wide font-bold">
                  Known For
                </p>
                <ul className="text-sm md:text-[12px] lg:text-[14px] font-normal text-[#323232] space-y-1">
                  {profile.currentState.knownFor.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 h-1 bg-[#000000] w-1 rounded-full mt-[3%]"></div>
                      <span className="font-jakarta">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-5 pb-2">
                <div className="flex justify-center items-center mb-3 text-start">
                  <span className="text-xs md:text-[12px] lg:text-[12px] uppercase font-montserrat tracking-wide font-bold text-black">
                    Promotability Quotient{" "}
                    <span className="font-bold ml-1 text-black text-xs md:text-[18px] font-montserrat lg:text-[15px]">
                      {profile.currentState.promotabilityQuotient}
                    </span>
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
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
            className="relative mt-20 right-[5.7%] bg-white rounded-[25px] border-2 border-[#E9E9E9] w-full sm:w-[380px] lg:w-[429px] shadow-2xl overflow-hidden z-40"
            style={{
              transform: "rotate(10deg) perspective(1000px) rotateY(0deg)",
            }}
          >
            <div className="bg-[#0B64F4] pt-6 px-5 relative min-h-[150px]">
              <h4 className="text-xs md:text-[14px] font-montserrat uppercase text-white mb-6 tracking-widest font-semibold text-center">
                Future You
              </h4>
            </div>

            {/* <div className="w-28 h-28 md:w-32 md:h-32 2xl:w-[164px] 2xl:h-[164px] rounded-full overflow-hidden border-[2.76px] border-[#E8E8E8] shadow-xl mx-auto bg-[#F1F1F1] absolute left-1/2 -translate-x-1/2 top-[65px]">
              <Image
                src={profile.futureState.image}
                alt="Future State"
                width={164}
                height={164}
                className="object-cover w-full h-full"
              />
            </div> */}

            <div className="absolute left-1/2 -translate-x-1/2 top-[57px]">
              {/* Outer Border */}
              <div className="w-32 h-32 md:w-36 md:h-36 lg:w-[155px] 2xl:w-[163.9772931092164px] 
                              lg:h-[155px] 2xl:h-[163.9772931092164px]
                              rounded-full border-[2.76px] border-[#E8E8E8] bg-[#F1F1F1]
                              flex items-center justify-center shadow-xl">

                {/* Inner Border */}
                <div className="relative w-full h-full rounded-full 
                                flex items-center justify-center scale-[0.95]">

                  {/* Image */}
                  <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden">
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

            <div className="bg-white px-8 lg:px-10 py-6 mt-8 lg:mt-12 2xl:mt-16">
              <div className="flex flex-col items-center mb-3">
                <h5 className="text-lg md:text-[23px] font-medium text-[#1C1C1C] font-gotham">{profile.name}</h5>
                <p className="text-sm md:text-[14px] font-normal text-[#1C1C1C] font-gotham mt-1">{profile.futureState.title}</p>
              </div>

              <div className="text-sm space-y-1 md:space-y-2 mb-6 border-y py-4 border-[#E3E3E3]">
                {[
                  { label: "Status", value: profile.futureState.status },
                  { label: "Visibility Score", value: profile.futureState.visibilityScore },
                  { label: "Influence Rating", value: profile.futureState.influenceRating },
                  { label: "Access Level", value: profile.futureState.accessLevel },
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-[#7A7777] font-semibold text-xs md:text-[10px] lg:text-[12px] uppercase tracking-wide font-jakarta w-[130px]">
                      {item.label}
                    </span>
                    <span className="text-[#B3B3B3] font-extrabold text-[10px] lg:text-[12px] w-[10px] text-center ml-4">
                      :
                    </span>
                    <span className="text-black font-semibold text-[10px] lg:text-[12px] font-jakarta flex-1 ml-4">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-left mt-2 mb-3">
                <p className="font-montserrat text-xs md:text-[10px] lg:text-[12px] text-[#0B64F4] mb-2 uppercase tracking-wide font-bold">
                  Known For
                </p>
                <ul className="text-sm md:text-[12px] lg:text-[14px] font-normal text-[#323232] space-y-1">
                  {profile.futureState.knownFor.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 h-1 bg-[#000000] w-1 rounded-full mt-[3%]"></div>
                      <span className="font-jakarta">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-5 pb-2 lg:py-8">
                <div className="flex justify-center items-center mb-3">
                  <span className="text-xs md:text-[12px] lg:text-[12px] font-montserrat uppercase tracking-wide font-bold text-[#0B64F4]">
                    Promotability Quotient{" "}
                    <span className="font-bold text-[#0B64F4] ml-1 text-xs md:text-[18px] font-montserrat lg:text-[15px]">
                      {profile.futureState.promotabilityQuotient}
                    </span>
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
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
  );
}