"use client";
import React, { useState } from "react";
import { Brain, Eye, BarChart3, Network, MessageSquare, Repeat } from "lucide-react";
// import { IoMdCheckboxOutline } from "react-icons/io";
import cardBgImage from "../assets/cardBgImage.png";
import Image from "next/image";
import crown from "../assets/crown.png";
import crossbox from "../assets/crossbox.png";
import cross from "../assets/cross.png";
import tickbox from "../assets/tickbox.png";
import correctsign from "../assets/correctsign.png";



const Framework = () => {
  const [activeTab, setActiveTab] = useState("framework");

  const tabs = [
    {
      id: "framework",
      label: "The Framework",
      icon: Brain,
      heading: "Knowledge → Reflection → Action → Rewiring",
      subtext:
        "Our proven KRAR methodology creates lasting behavioral change, not just awareness.",
      steps: [
        {
          number: "1",
          title: "Knowledge",
          description: "Understand the hidden mechanics of workplace advancement",
        },
        {
          number: "2",
          title: "Reflection",
          description: "Audit your current positioning and identify gaps",
        },
        {
          number: "3",
          title: "Action",
          description: "Apply specific techniques in real workplace scenarios",
        },
        {
          number: "4",
          title: "Rewiring",
          description: "Build habits that make promotability second nature",
        },
      ],
    },
    {
      id: "visibility",
      label: "Visibility",
      icon: Eye,
      heading: "Be seen by the people who matter",
      subtext:
        "Learn techniques that make you impossible to ignore (without self-promotion)",
      steps: [
        {
          number: "1",
          title: "Strategic Presence",
          description: "Get included in high-visibility projects and meetings",
        },
        {
          number: "2",
          title: "Stakeholder Mapping",
          description: "Identify decision-makers and make them your advocates",
        },
        {
          number: "3",
          title: "Executive Communication",
          description: "Learn the best way to convey your impact",
        },
        {
          number: "4",
          title: "Brand Building",
          description: "Build a reputation that precedes you",
        },
      ],
    },
    {
      id: "credibility",
      label: "Credibility",
      icon: BarChart3,
      heading: "Transform 'competence' into 'authority'",
      subtext:
        "Stop being 'an expert' and start being 'a leader' with enhanced credibility",
      steps: [
        {
          number: "1",
          title: "Expertise Positioning",
          description: "Translate your knowledge into strategic business value",
        },
        {
          number: "2",
          title: "Trust Architecture",
          description: "Build relationships of trust with key stakeholders",
        },
        {
          number: "3",
          title: "Thought Leadership",
          description: "Visibly demonstrate your strategic thinking",
        },
        {
          number: "4",
          title: "Results Articulation",
          description: "Quantify and communicate your impact in their language",
        },
      ],
    },
    {
      id: "influence",
      label: "Influence",
      icon: Network,
      heading: "Lead Without the Title",
      subtext:
        "Master the art of organizational influence to drive decisions and outcomes",
      steps: [
        {
          number: "1",
          title: "Coalition Building",
          description: "Create alliances that support your initiatives",
        },
        {
          number: "2",
          title: "Persuasion Techniques",
          description: "Shape decisions and influence outcomes",
        },
        {
          number: "3",
          title: "Conflict Navigation",
          description: "Handle organizational politics with grace",
        },
        {
          number: "4",
          title: "Sponsor Cultivation",
          description: "Develop advocates who champion your cause",
        },
      ],
    },
    {
      id: "communication",
      label: "Communication",
      icon: MessageSquare,
      heading: "Speak the Language of Leadership",
      subtext:
        "Master strategic communication and gain respect",
      steps: [
        {
          number: "1",
          title: "Executive Presence",
          description: "Command attention authentically",
        },
        {
          number: "2",
          title: "Narrative Crafting",
          description: "Share compelling stories, not 'updates'",
        },
        {
          number: "3",
          title: "Difficult Conversations",
          description: "Handle tough discussions with confidence",
        },
        {
          number: "4",
          title: "Feedback Mastery",
          description: "Give and receive feedback like a senior leader",
        },
      ],
    },
    {
      id: "habits",
      label: "Habits",
      icon: Repeat,
      heading: "Sustainable Behavior Change",
      subtext:
        "Build lasting habits that compound into career momentum over time",
      steps: [
        {
          number: "1",
          title: "Weekly Rituals",
          description: "Consolidate learning with consistent practice",
        },
        {
          number: "2",
          title: "Energy Management",
          description: "Protect your capacity for what matters most",
        },
        {
          number: "3",
          title: "Network Maintenance",
          description: "Systematically nurture professional relationships",
        },
        {
          number: "4",
          title: "Continuous Learning",
          description: "Develop skills with intention and without burning out",
        },
      ],
    },
  ];

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  const progressItems = [
    { label: "Skip Level access", value: 89 },
    { label: "Meeting Presence", value: 91 },
    { label: "Seat at decision table", value: 92 },
    { label: "Network Advocacy", value: 88 },
  ];

  const achievements = [
    { label: "Own Cabin", checked: true },
    { label: "43% raise", checked: true },
    { label: "New role post", checked: true },
    { label: "Imposter syndrome", checked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1729] to-[#0B64F4] py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* <div className="inline-flex items-center justify-center w-14 h-14 md:w-[64px] md:h-[64px] bg-[#0B64F4] text-white rounded-[16px] mb-6">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div> */}
          <div className="inline-flex items-center justify-center
            w-14 h-14 md:w-[64px] md:h-[64px]
            bg-[#3B6FF5]
            rounded-[20px]
            mb-6"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* main sparkle */}
              <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />

              {/* top-right small sparkle — moved farther */}
              <g transform="translate(2,-2)">
                <path d="M18 5 V8 M16.5 6.5 H19.5" />
              </g>

              {/* bottom-left small sparkle — moved farther */}
              <g transform="translate(-2,2)">
                <path d="M6 16 V18 M5 17 H7" />
              </g>
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[48px] text-white/50 font-jakarta font-bold leading-11 md:leading-14">
            Introducing <br />
            <span className="text-white  font-jakarta">BMP – Be More Promotable</span>
          </h2>
          <p className="text-white mt-4 lg:mt-1 text-base sm:text-lg md:text-xl font-normal font-jakarta max-w-7xl mx-auto">
            A proven blueprint for changing how you show up, speak, and are
            perceived at work, so you become more promotable.
          </p>
        </div>

        {/* Main Content with Left Card */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start relative">
          {/* Left Side Card - Progress Tracker */}
          <div className="w-[390.14613978924467px] md:ml-[0%] lg:flex-shrink-0 bg-gradient-to-tl from-[#646464] to-[#D5D5D5] rounded-[40px] p-0.5 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 flex justify-center items-center lg:justify-start">
            {/* <div className="relative bg-gradient-to-br from-[#0B64F4] to-[#00026E] border-[2px] border-[#D5D5D5] rounded-[40px] p-0 shadow-2xl w-[420px] lg:w-[400px]"> */}
            <div className="relative bg-gradient-to-br from-[#0B64F4] to-[#00026E] rounded-[40px] p-0 shadow-2xl w-[390.14613978924467px]">
              {/* Subtle border effect */}
              <div className="absolute inset-0 rounded-[32px] pointer-events-none"></div>
              
              {/* <div className="relative bg-gradient-to-br from-[#1e5ddb] to-[#0d3d8f] rounded-[30px] p-6"> */}
              <div className="relative  rounded-[30px] p-0 rounded-t-[40px]">
                {/* Top Section with Title and Icon */}
                <div className="relative bg-gradient-to-r from-[#0B64F4] to-[#00026E] text-center p-8 rounded-t-[40px] min-h-[140px]">
                  {/* <h3 className="text-white text-sm md:text-[14px] lg:text-[14px] font-montserrat font-semibold tracking-wide mb-4">
                    BE MORE PROMOTABLE
                  </h3> */}
                    {/* Base gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2F66FF] via-[#0B3FB8] to-[#02045E] rounded-t-[40px]" />

                  {/* Soft top glow */}
                  {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(120,170,255,0.45)_0%,_rgba(11,100,244,0.25)_35%,_rgba(0,0,0,0)_70%)]" /> */}

                  {/* Subtle dark depth at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/25" />

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-white text-sm md:text-[14px] lg:text-[14px] font-montserrat font-semibold tracking-wide mb-4">
                      BE MORE PROMOTABLE
                    </h3>
                  </div>

                  {/* Crown Icon Circle */}
                  <div className="absolute -bottom-[72%] z-50 left-[50%] transform -translate-x-1/2 -translate-y-1/2 mx-auto w-[100px] h-[100px] lg:w-[110px] lg:h-[110px] rounded-full bg-gradient-to-br from-[#4B8DFF] to-[#0A47FF] flex items-center justify-center shadow-xl border-4 border-white">
                    {/* <Crown className="w-16 h-16 text-white" strokeWidth={2.5} fill="white" /> */}
                    <Image
                      src={crown}
                      alt="Crown"
                      width={200}
                      height={200}
                    />
                  </div>
                </div>

                {/* Black Card with Achievements and Progress */}
                {/* <div className="bg-gradient-to-b from-black/80 via-black/60 to-black/80 rounded-b-[40px] p-8 backdrop-blur-md shadow-xl py-20"> */}
                <div className="relative rounded-b-[40px] overflow-hidden shadow-xl py-16">
                  {/* Background Image */}
                    <div className="absolute inset-0 opactiy-40">
                      <Image
                        src={cardBgImage}
                        alt="Card Background"
                        fill
                        className="object-cover opacity-180 z-0"
                        priority
                      />
                      {/* Subtle dark shadow overlay for that depth effect */}
                      <div className="absolute inset-0 bg-black/40 z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent"></div>
                    </div>
                  {/* <Image
                    src={cardBgImage}
                    alt="Card Background"
                    fill
                    className="object-cover opacity-80 z-0"
                    priority
                  /> */}

                  {/* Foreground content (above image) */}
                  <div className="relative z-10 p-8 lg:px-10">
                    {/* Achievements Checklist */}
                    <div className="space-y-3 mb-6">
                      {/* {achievements.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                              item.checked
                                ? "bg-transparent"
                                : "bg-transparent border-2 border-white"
                            }`}
                          >
                            {item.checked ? (
                              <IoMdCheckboxOutline className="w-8 h-8 text-white" />
                            ) : (
                              <svg
                                className="w-3.5 h-3.5 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <line x1="6" y1="6" x2="18" y2="18" />
                                <line x1="6" y1="18" x2="18" y2="6" />
                              </svg>
                            )}
                          </div>
                          <span className="text-white md:text-[15px] text-sm font-jakarta font-semibold">
                            {item.label}
                          </span>
                        </div>
                      ))} */}
                      {achievements.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="relative w-5 h-5 flex items-center justify-center">
                            {item.checked ? (
                              <>
                                <Image
                                  src={tickbox}
                                  alt="Checked box"
                                  fill
                                  className="object-contain"
                                />
                                <Image
                                  src={correctsign}
                                  alt="Tick"
                                  width={24}
                                  height={24}
                                  className="absolute left-[20%] bottom-[20%]"
                                />
                              </>
                            ) : (
                              <>
                                <Image
                                  src={crossbox}
                                  alt="Unchecked box"
                                  fill
                                  className="object-contain"
                                />
                                <Image
                                  src={cross}
                                  alt="Cross"
                                  width={12}
                                  height={12}
                                  className="absolute"
                                />
                              </>
                            )}
                          </div>

                          <span className="text-white md:text-[15px] ml-1 text-sm font-jakarta font-semibold">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Separator Line */}
                    <div className="border-t border-[#FFFFFF] my-4 lg:my-6 lg:mb-8"></div>

                    {/* Progress Bars Section */}
                    <div className="space-y-4">
                      {progressItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-white text-[15px] font-jakarta font-semibold">
                            {item.label}
                          </span>
                          <div className="flex items-center gap-2 w-[45%]">
                            <div className="w-full bg-[#0E2E64] rounded-[100px] h-4 shadow-inner">
                              <div
                                className="bg-gradient-to-r from-[#D3D3D3] to-[#79ACFF] h-4 rounded-[100px] transition-all duration-700 shadow-lg"
                                style={{ width: `${item.value}%` }}
                              >
                                <p className="ml-[10%] text-[#0E2E64] font-extrabold font-jakarta text-[10px]">
                                  {item.value}/100
                                </p>
                              </div>
                            </div>
                            {/* <p className="text-[#AFCBFF] font-bold text-[11px]">
                              {item.value}/100
                            </p> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Card - Right Side */}
          <div className="flex-1 flex flex-col md:translate-x-[7.5%] mt-10 md:mt-0">
            <div className="backdrop-blur rounded-[17px] shadow-2xl overflow-hidden max-w-sm md:max-w-2xl md:max-w-xl lg:max-w-3xl w-full">
              {/* Tabs */}
              {/* <div className="flex overflow-x-auto gap-2 scrollbar-hide"> */}
              <div className="relative z-20 flex overflow-x-auto gap-2 scrollbar-hide">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 md:px-4 mb-1 py-3 text-sm sm:text-[12px] font-jakarta font-normal transition-all whitespace-nowrap ${
                        activeTab === tab.id
                          ? "bg-white text-[#0F1729] border rounded-t-[8px] border mb-0 border-white"
                          : "bg-[#0B64F4]/30 text-white rounded-[8px] mb-3 text-[#FFFFFF] hover:bg-white/10 border-transparent"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              {/* <div className="p-8 sm:p-10 bg-white"> */}
              <div className="relative z-10 -mt-1 p-8 sm:p-10 bg-white pt-10">
                {currentTab ? (
                  <>
                    <div className="mb-8">
                      <h3 className="text-3xl sm:text-4xl lg:text-[26px] font-jakarta font-bold text-black mb-2">
                        {currentTab.heading}
                      </h3>
                      <p className="text-lg lg:text-[16px] font-jakarta font-normal text-black">{currentTab.subtext}</p>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentTab.steps.map((step) => (
                        <div
                          key={step.number}
                          className="bg-[#E9F0FB] rounded-[8px] p-6 lg:p-4 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-[#0B64F433] text-[#0B64F4] rounded-[4px] flex items-center font-jakarta justify-center font-bold text-lg">
                                {step.number}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl lg:text-[18px] font-jakarta font-semibold text-black mb-2">
                                {step.title}
                              </h4>
                              <p className="text-xs lg:text-[12px] font-jakarta font-semibold text-[#686868]">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-500">No tab data available.</p>
                )}
              </div>

            </div>


        <div className="flex flex-col">
          {/* Rolling Band Animation */}
          {/* <div className="relative overflow-hidden bg-gradient-to-l from-[#0F1729] to-[#0B64F4] my-6 py-4  max-w-3xl lg:left-[0%] lg:top-[-10%]">
            <style>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .animate-scroll {
                animation: scroll 30s linear infinite;
              }
            `}</style>
            <div className="flex whitespace-nowrap animate-scroll">
              <div className="flex items-center gap-3 px-4">
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Rewire Non promotable habits</span>
                <span className="text-white/50">|</span>
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Claim what you deserve</span>
                <span className="text-white/50">|</span>
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Navigate with confidence in corporate structure</span>
                <span className="text-white/50">|</span>
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Signal leadership readiness</span>
                <span className="text-white/50">|</span>
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Build advocates</span>
                <span className="text-white/50">|</span>
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Multiply the impact without compromising work life balance</span>
                <span className="text-white/50">|</span>
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Build your custom plan</span>
                <span className="text-white/50">|</span>
              </div>
            </div>
          </div> */}
          <div className="relative overflow-hidden bg-[#0B64F4] my-6 py-4 max-w-sm md:max-w-2xl lg:max-w-3xl">
            {/* Edge fade gradients */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0F1729] to-transparent z-20"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0F1729] to-transparent z-20"></div>

            {/* Scrolling Text */}
            <style>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .animate-scroll {
                animation: scroll 5s linear infinite;
              }
            `}</style>

            <div className="flex whitespace-nowrap animate-scroll">
              <div className="flex items-center gap-3 px-4">
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Rewire Non promotable habits</span>
                <span className="text-white/50">|</span>
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Claim what you deserve</span>
                <span className="text-white/50">|</span>
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Navigate with confidence in corporate structure</span>
                <span className="text-white/50">|</span>
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Signal leadership readiness</span>
                <span className="text-white/50">|</span>
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Build advocates</span>
                <span className="text-white/50">|</span>
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Multiply the impact without compromising work life balance</span>
                <span className="text-white/50">|</span>
                <span className="text-white text-lg lg:text-[25px] font-jakarta font-medium">Build your custom plan</span>
                <span className="text-white/50">|</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-start mt-1">
            {/* <button className="bg-gradient-to-r from-white to-[#CFCFCF] text-black font-jakarta font-bold text-lg sm:text-xl md:text-[24px] px-8 sm:px-10 py-4 sm:py-5 rounded-xl shadow-xl hover:opacity-100 transition">
              Get Early Access
            </button> */}
            <button className="bg-[radial-gradient(circle_at_center,_#FFFFFF_0%,_#ADADAD_200%)] text-black font-jakarta font-bold text-lg sm:text-xl md:text-[24px] px-8 sm:px-10 py-4 sm:py-5 rounded-xl shadow-xl hover:opacity-100 transition">
              Get Early Access
            </button>
          </div>
        </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Framework;