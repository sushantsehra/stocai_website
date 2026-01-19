"use client";
import React, { useState } from "react";
import { LuBrain } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { FaNetworkWired } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoRepeat } from "react-icons/io5";

const Framework = () => {
  const [activeTab, setActiveTab] = useState("framework");

  const tabs = [
    {
      id: "framework",
      label: "The Framework",
      icon: LuBrain,
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
      icon: FaRegEye,
      heading: "Master Strategic Visibility",
      subtext:
        "Position yourself where it matters most — in the rooms and conversations that shape careers.",
      steps: [
        {
          number: "1",
          title: "Strategic Presence",
          description: "Position yourself in high-visibility projects and meetings",
        },
        {
          number: "2",
          title: "Stakeholder Mapping",
          description: "Identify and cultivate relationships with decision-makers",
        },
        {
          number: "3",
          title: "Executive Communication",
          description: "Communicate impact in language leaders understand",
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
      icon: GiNetworkBars,
      heading: "Transform Competence into Authority",
      subtext:
        "Move from being 'the expert' to being 'the leader' through credibility amplification.",
      steps: [
        {
          number: "1",
          title: "Expertise Positioning",
          description: "Package your knowledge as strategic business value",
        },
        {
          number: "2",
          title: "Trust Architecture",
          description: "Build systematic trust with key stakeholders",
        },
        {
          number: "3",
          title: "Thought Leadership",
          description: "Share insights that demonstrate strategic thinking",
        },
        {
          number: "4",
          title: "Results Articulation",
          description: "Quantify and communicate your impact effectively",
        },
      ],
    },
    {
      id: "influence",
      label: "Influence",
      icon: FaNetworkWired,
      heading: "Lead Without the Title",
      subtext:
        "Master the art of organizational influence to drive decisions and outcomes.",
      steps: [
        {
          number: "1",
          title: "Coalition Building",
          description: "Create alliances that support your initiatives",
        },
        {
          number: "2",
          title: "Persuasion Techniques",
          description: "Influence outcomes in meetings and decisions",
        },
        {
          number: "3",
          title: "Conflict Navigation",
          description: "Handle organizational politics with grace",
        },
        {
          number: "4",
          title: "Sponsor Cultivation",
          description: "Develop advocates who champion your advancement",
        },
      ],
    },
    {
      id: "communication",
      label: "Communication",
      icon: FaRegCommentAlt,
      heading: "Speak the Language of Leadership",
      subtext:
        "Develop executive presence through strategic communication mastery.",
      steps: [
        {
          number: "1",
          title: "Executive Presence",
          description: "Command attention and respect in any room",
        },
        {
          number: "2",
          title: "Narrative Crafting",
          description: "Tell compelling stories about your work and vision",
        },
        {
          number: "3",
          title: "Difficult Conversations",
          description: "Navigate challenging discussions with confidence",
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
      icon: IoRepeat,
      heading: "Sustainable Behavior Change",
      subtext:
        "Build lasting habits that compound into career momentum over time.",
      steps: [
        {
          number: "1",
          title: "Weekly Rituals",
          description: "Implement consistent practices that drive visibility",
        },
        {
          number: "2",
          title: "Energy Management",
          description: "Protect your capacity for high-impact work",
        },
        {
          number: "3",
          title: "Network Maintenance",
          description: "Systematically nurture professional relationships",
        },
        {
          number: "4",
          title: "Continuous Learning",
          description: "Stay ahead with targeted skill development",
        },
      ],
    },
  ];

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-12 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#0B64F4] text-white rounded-2xl mb-6">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[48px] text-white/50 font-bold leading-12">
            Introducing <br />
            <span className="text-white">BMP – Be More Promotable</span>
          </h2>
          <p className="text-white mt-4 lg:mt-1 text-base sm:text-lg md:text-xl max-w-7xl mx-auto">
            A proven blueprint for changing how you show up, speak, and are
            perceived at work, so you become more promotable.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="flex lg:justify-end">
         <div className="backdrop-blur rounded-[17px] shadow-2xl overflow-hidden max-w-3xl">
          {/* Tabs */}
          <div className="flex overflow-x-auto gap-4 scrollbar-hide">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 mb-1 sm:px-6 py-4 text-sm sm:text-[12px] font-normal transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-white text-[#0F1729] rounded-[8px] border mb-0 border-white"
                      : "bg-[#0B64F4] rounded-[8px] text-[#FFFFFF] hover:bg-white/10 border-transparent"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-8 sm:p-12 bg-white">
            <div className="mb-8">
              <h3 className="text-3xl sm:text-4xl lg:text-[26px] font-bold text-black mb-2">
                {currentTab.heading}
              </h3>
              <p className="text-lg lg:text-[16px] font-normal text-black">{currentTab.subtext}</p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentTab.steps.map((step) => (
                <div
                  key={step.number}
                  className="bg-[#E9F0FB] rounded-[8px] p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[#0B64F433] text-[#0B64F4] rounded-[4px] flex items-center justify-center font-bold text-lg">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl lg:text-[18px] font-semibold text-black mb-2">
                        {step.title}
                      </h4>
                      <p className="text-xs lg:text-[12px] font-semiboltext-[#686868]">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-[#000000] rounded-full"></span>
                <span className="w-1 h-1 bg-[#000000] rounded-full"></span>
                <span className="w-1 h-1 bg-[#000000] rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
         <button className="bg-gradient-to-r from-white to-[#CFCFCF] text-black font-bold text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-xl shadow-xl hover:opacity-90 transition">
            Get Early Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default Framework;