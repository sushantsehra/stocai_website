"use client";
import React, { useState } from "react";
import { Brain, Eye, BarChart3, Network, MessageSquare, Repeat } from "lucide-react";
import cardBgImage from "../assets/cardBgImage.png";
import Image from "next/image";
import crown from "../assets/crown.png";
import crossbox from "../assets/crossbox.png";
import cross from "../assets/cross.png";
import tickbox from "../assets/tickbox.png";
import correctsign from "../assets/correctsign.png";

const Framework = () => {
  const [activeTab, setActiveTab] = useState("framework");

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

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
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 4s linear infinite;
        }
      `}} />
      
      <div id="framework" className="bg-gradient-to-b from-[#0F1729] to-[#0B64F4] py-6 sm:py-12 px-1 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
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
                <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
                <g transform="translate(2,-2)">
                  <path d="M18 5 V8 M16.5 6.5 H19.5" />
                </g>
                <g transform="translate(-2,2)">
                  <path d="M6 16 V18 M5 17 H7" />
                </g>
              </svg>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[48px] text-white/50 font-jakarta font-bold leading-tight md:leading-14">
              Introducing <br />
              <span className="text-white font-jakarta">BMP – Be More Promotable</span>
            </h2>
            <p className="text-white mt-4 lg:mt-1 text-base sm:text-lg md:text-xl font-normal font-jakarta max-w-7xl mx-auto px-4">
              A proven blueprint for changing how you show up, speak, and are
              perceived at work, so you become more promotable.
            </p>
          </div>

          {/* MOBILE VERSION - Show only on mobile */}
          <div className="block lg:hidden">
            {/* Mobile Card */}
            <div className="w-full max-w-[342px] mx-auto mb-8 rotate-[-3deg]">
              <div className="bg-gradient-to-tl from-[#646464] to-[#D5D5D5] rounded-[32px] p-0.5">
                <div className="relative bg-gradient-to-br from-[#0B64F4] to-[#00026E] rounded-[32px] shadow-2xl">
                  {/* Top Section */}
                  <div className="relative bg-gradient-to-r from-[#0B64F4] to-[#00026E] text-center p-6 rounded-t-[32px] min-h-[100px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2F66FF] via-[#0B3FB8] to-[#02045E] rounded-t-[32px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/25" />
                    
                    <div className="relative z-10">
                      <h3 className="text-white text-xs font-montserrat font-semibold tracking-wide mb-3">
                        BE MORE PROMOTABLE
                      </h3>
                    </div>

                    {/* Crown Icon */}
                    <div className="absolute -bottom-[40%] z-50 left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] rounded-full bg-gradient-to-br from-[#4B8DFF] to-[#0A47FF] flex items-center justify-center shadow-xl border-4 border-white">
                      <Image
                        src={crown}
                        alt="Crown"
                        width={160}
                        height={160}
                      />
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="relative rounded-b-[32px] overflow-hidden py-14">
                    <div className="absolute inset-0">
                      <Image
                        src={cardBgImage}
                        alt="Card Background"
                        fill
                        className="object-cover opacity-180 z-0"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/40 z-10"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent"></div>
                    </div>

                    <div className="relative z-10 px-6 py-4">
                      {/* Achievements */}
                      <div className="space-y-2.5 mb-5">
                        {achievements.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <div className="relative w-5 h-5 flex items-center justify-center flex-shrink-0">
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
                                    width={20}
                                    height={20}
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
                                    width={10}
                                    height={10}
                                    className="absolute"
                                  />
                                </>
                              )}
                            </div>
                            <span className="text-white text-sm font-jakarta font-semibold">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Separator */}
                      <div className="border-t border-white/30 my-5"></div>

                      {/* Progress Bars */}
                      <div className="space-y-3">
                        {progressItems.map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-white text-xs font-jakarta font-semibold">
                                {item.label}
                              </span>
                              <span className="text-white/70 text-[10px] font-jakarta font-bold">
                                {item.value}/100
                              </span>
                            </div>
                            <div className="w-full bg-[#0E2E64] rounded-full h-2.5 shadow-inner">
                              <div
                                className="bg-gradient-to-r from-[#D3D3D3] to-[#79ACFF] h-2.5 rounded-full transition-all duration-700"
                                style={{ width: `${item.value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Tabs */}
            {/* <div className="mb-6">
              <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide px-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-xs font-jakarta font-medium transition-all duration-300 whitespace-nowrap rounded-lg flex-shrink-0 ${
                        activeTab === tab.id
                          ? "bg-white text-[#0F1729] shadow-lg"
                          : "bg-white/10 text-white backdrop-blur-sm"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div> */}
            {/* Mobile Tabs */}
            <div className="mb-3 px-0.5">
              <div className="grid grid-cols-3 gap-2">
                {tabs.map((tab) => {
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-3 text-sm font-jakarta font-medium transition-all duration-300 whitespace-nowrap rounded-[7.6px] ${
                        activeTab === tab.id
                          ? "bg-white text-[#0F1729] shadow-lg"
                          : "bg-[#0B64F4]/20 text-white backdrop-blur-sm border border-white/10"
                      }`}
                    >
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Content */}
            <div className="bg-white rounded-2xl p-4.5 shadow-xl mb-2">
              {currentTab && (
                <div key={activeTab} className="animate-fadeIn">
                  <h3 className="text-2xl font-jakarta font-bold text-black mb-2">
                    {currentTab.heading}
                  </h3>
                  <p className="text-sm font-jakarta font-normal text-black/80 mb-6">
                    {currentTab.subtext}
                  </p>

                  <div className="space-y-4">
                    {currentTab.steps.map((step) => (
                      <div
                        key={step.number}
                        className="bg-[#E9F0FB] rounded-lg p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-6 h-5 bg-[#0B64F433] text-xs text-[#0B64F4] rounded flex items-center justify-center font-jakarta font-bold">
                              {step.number}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-jakarta font-semibold text-black mb-1">
                              {step.title}
                            </h4>
                            <p className="text-xs font-jakarta font-semibold text-[#686868]">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dots Indicator */}
                  <div className="flex justify-center items-center gap-1.5 mt-6">
                    {tabs.map((tab, index) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`transition-all duration-300 ${
                          index === activeTabIndex
                            ? "w-2.5 h-2.5 bg-[#0B64F4]"
                            : "w-1.5 h-1.5 bg-black/30"
                        }`}
                        aria-label={`Go to ${tab.label}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Scrolling Text */}
            <div className="relative overflow-hidden sm:my-6 py-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0F1729] to-transparent z-20"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0F1729] to-transparent z-20"></div>

              <div className="flex whitespace-nowrap animate-scroll">
                <div className="flex items-center gap-3 px-3">
                  <span className="text-white text-base font-jakarta font-medium">Rewire Non promotable habits</span>
                  <span className="text-white/50">|</span>
                  <span className="text-white text-base font-jakarta font-medium">Claim what you deserve</span>
                  <span className="text-white/50">|</span>
                  <span className="text-white text-base font-jakarta font-medium">Navigate with confidence</span>
                  <span className="text-white/50">|</span>
                  <span className="text-white text-base font-jakarta font-medium">Signal leadership readiness</span>
                  <span className="text-white/50">|</span>
                  <span className="text-white text-base font-jakarta font-medium">Build advocates</span>
                  <span className="text-white/50">|</span>
                  <span className="text-white text-base font-jakarta font-medium">Build your custom plan</span>
                  <span className="text-white/50">|</span>
                </div>
                <div className="flex items-center gap-3 px-3">
                  <span className="text-white text-base font-jakarta font-medium">Rewire Non promotable habits</span>
                  <span className="text-white/50">|</span>
                  <span className="text-white text-base font-jakarta font-medium">Claim what you deserve</span>
                  <span className="text-white/50">|</span>
                  <span className="text-white text-base font-jakarta font-medium">Navigate with confidence</span>
                  <span className="text-white/50">|</span>
                  <span className="text-white text-base font-jakarta font-medium">Signal leadership readiness</span>
                  <span className="text-white/50">|</span>
                  <span className="text-white text-base font-jakarta font-medium">Build advocates</span>
                  <span className="text-white/50">|</span>
                  <span className="text-white text-base font-jakarta font-medium">Build your custom plan</span>
                  <span className="text-white/50">|</span>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="text-center mt-5">
              <button 
                onClick={scrollToWaitlist} 
                className="w-full max-w-[250px] cursor-pointer bg-[radial-gradient(circle_at_center,_#FFFFFF_0%,_#ADADAD_200%)] text-black font-jakarta font-bold text-lg px-8 py-4 rounded-xl shadow-xl hover:opacity-90 transform transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
              >
                Get Early Access
              </button>
            </div>
          </div>

          {/* DESKTOP VERSION - Show only on large screens */}
          <div className="hidden lg:flex flex-col lg:flex-row gap-6 lg:gap-10 items-start relative">
            {/* Left Side Card - Progress Tracker */}
            <div className="w-[390.14613978924467px] md:ml-[0%] lg:flex-shrink-0 bg-gradient-to-tl from-[#646464] to-[#D5D5D5] rounded-[40px] p-0.5 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 flex justify-center items-center lg:justify-start">
              <div className="relative bg-gradient-to-br from-[#0B64F4] to-[#00026E] rounded-[40px] p-0 shadow-2xl w-[390.14613978924467px]">
                <div className="absolute inset-0 rounded-[32px] pointer-events-none"></div>
                
                <div className="relative rounded-[30px] p-0 rounded-t-[40px]">
                  <div className="relative bg-gradient-to-r from-[#0B64F4] to-[#00026E] text-center p-8 rounded-t-[40px] min-h-[140px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2F66FF] via-[#0B3FB8] to-[#02045E] rounded-t-[40px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/25" />

                    <div className="relative z-10">
                      <h3 className="text-white text-sm md:text-[14px] lg:text-[14px] font-montserrat font-semibold tracking-wide mb-4">
                        BE MORE PROMOTABLE
                      </h3>
                    </div>

                    <div className="absolute -bottom-[72%] z-50 left-[50%] transform -translate-x-1/2 -translate-y-1/2 mx-auto w-[100px] h-[100px] lg:w-[110px] lg:h-[110px] rounded-full bg-gradient-to-br from-[#4B8DFF] to-[#0A47FF] flex items-center justify-center shadow-xl border-4 border-white">
                      <Image
                        src={crown}
                        alt="Crown"
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>

                  <div className="relative rounded-b-[40px] overflow-hidden shadow-xl py-16">
                    <div className="absolute inset-0 opactiy-40">
                      <Image
                        src={cardBgImage}
                        alt="Card Background"
                        fill
                        className="object-cover opacity-180 z-0"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/40 z-10"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent"></div>
                    </div>

                    <div className="relative z-10 p-8 lg:px-10">
                      <div className="space-y-3 mb-6">
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

                      <div className="border-t border-[#FFFFFF] my-4 lg:my-6 lg:mb-8"></div>

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
            <div className="flex-1 flex flex-col md:translate-x-[4.5%] mt-10 md:mt-0">
              <div className="backdrop-blur rounded-[17px] shadow-2xl overflow-hidden max-w-sm md:max-w-2xl md:max-w-xl lg:max-w-[776px] w-full">
                <div className="relative z-20 flex overflow-x-auto gap-2 scrollbar-hide">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 md:px-4 mb-1 py-3 text-sm sm:text-[12px] font-jakarta font-normal transition-all duration-300 ease-in-out whitespace-nowrap ${
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

                <div className="relative z-10 -mt-1 p-8 sm:p-10 bg-white pt-10">
                  {currentTab ? (
                    <div key={activeTab} className="animate-fadeIn">
                      <div className="mb-8">
                        <h3 className="text-3xl sm:text-4xl lg:text-[26px] font-jakarta font-bold text-black mb-1.5">
                          {currentTab.heading}
                        </h3>
                        <p className="text-lg lg:text-[16px] font-jakarta font-normal text-black">{currentTab.subtext}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentTab.steps.map((step) => (
                          <div
                            key={step.number}
                            className="bg-[#E9F0FB] rounded-[8px] p-6 lg:p-4 hover:shadow-lg transition-shadow duration-300"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-[28px] h-[22px] mt-0.5 bg-[#0B64F433] text-[14px] text-[#0B64F4] rounded-[4px] flex items-center font-jakarta justify-center font-bold text-lg">
                                  {step.number}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xl lg:text-[18px] font-jakarta font-semibold text-black mb-1">
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

                      <div className="flex justify-center items-center gap-1.5 mt-6 lg:translate-y-[10px]">
                        {tabs.map((tab, index) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`transition-all duration-300 ${
                              index === activeTabIndex
                                ? "w-2 h-2.5 mb-1 bg-[#0B64F4]"
                                : "w-1.5 h-1.5 bg-black/80 hover:bg-black/50"
                            }`}
                            aria-label={`Go to ${tab.label}`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">No tab data available.</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="relative overflow-hidden my-6 py-4 max-w-sm md:max-w-2xl lg:max-w-[776px]">
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0F1729] to-transparent z-20"></div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0F1729] to-transparent z-20"></div>

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

                <div className="text-start mt-1">
                  <button onClick={scrollToWaitlist} 
                    className="cursor-pointer bg-[radial-gradient(circle_at_center,_#FFFFFF_0%,_#ADADAD_200%)] text-black font-jakarta font-bold text-lg sm:text-xl md:text-[24px] px-8 sm:px-10 py-4 sm:py-5 rounded-xl shadow-xl hover:opacity-100 transform transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
                    Get Early Access
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Framework;