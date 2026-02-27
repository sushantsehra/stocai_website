"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const modules = [
  { id: 1, title: "Fundamentals of Being Promotable", summary: "Understand what promotion truly means for you." },
  { id: 2, title: "Claim What You Value", summary: "Learn to delegate effectively and multiply your impact." },
  { id: 3, title: "Gaining Visibility and Influence", summary: "Map your key stakeholders and understand what matters to them." },
  { id: 4, title: "Navigate With Confidence", summary: "Identify what weakens your executive presence." },
  { id: 5, title: "Leverage - Impact Without Burnout", summary: "Learn to delegate effectively and multiply your impact." },
  { id: 6, title: "Personal Brand-Building Advocates", summary: "Step into the habits and behaviours of your next level." },
  { id: 7, title: "Psychology Of Promotion", summary: "Communicate your value with clarity, confidence, and conviction." },
  { id: 8, title: "My Action Plan", summary: "Create a personalized action plan to apply everything you've learned." },
];

export default function EightWeekArc() {
  const [current, setCurrent] = useState(2);

  const handlePrev = () =>
    setCurrent((p) => (p === 0 ? modules.length - 1 : p - 1));

  const handleNext = () =>
    setCurrent((p) => (p === modules.length - 1 ? 0 : p + 1));

  const getPos = (i: number) => {
    const diff = i - current;
    const len = modules.length;

    if (diff === 0) return 0;
    if (diff === 1 || diff === -(len - 1)) return 1;
    if (diff === 2 || diff === -(len - 2)) return 2;
    if (diff === -1 || diff === len - 1) return -1;
    if (diff === -2 || diff === len - 2) return -2;

    return null;
  };

  return (
    <section className="relative bg-white py-5 md:py-16 overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto text-center mb-6 md:mb-12">
        <h2 className="text-[24px] sm:text-[36px] md:text-[48px] font-bold leading-tight md:mb-2">
          <span className="text-[#000000] font-quattrocento">
            The <span className="text-[#014BAA] font-bold">8-Week</span> Arc
          </span>
        </h2>

        <p className="text-[#000000] font-inter text-[14px] sm:text-xl md:text-[20px] leading-6 max-w-5xl mx-auto">
          (With actionable outcomes every week)
        </p>
      </div>

      <div className="relative flex justify-center items-center h-[260px] sm:h-[500px] mt-10 md:mt-14">
        {modules.map((m, i) => {
          const pos = getPos(i);
          if (pos === null) return null;

          const getCardStyle = (p: number) => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

            // Base opacity and z-index logic
            const base = {
              0: "z-50 opacity-100",
              1: "z-40 opacity-80",
              2: "z-30 opacity-60",
              "-1": "z-40 opacity-80",
              "-2": "z-30 opacity-60",
            }[p];

            if (p === 0) return { transform: "translate(0, 0) rotate(0) scale(1)", className: base };

            // const factor = p > 0 ? 1 : -1;
            const absP = Math.abs(p);

            // MOBILE VALUES (Reduced to 125px x 165px)
            let tx = absP === 1 ? "60%" : "110%";
            let ty = absP === 1 ? "4%" : "14%";
            let r = absP === 1 ? "12deg" : "15deg";
            let s = absP === 1 ? "0.9" : "0.75";

            // DESKTOP VALUES (Reduced to 380px x 440px)
            if (!isMobile) {
              tx = absP === 1 ? "65%" : "118%";
              ty = absP === 1 ? "5.5rem" : "16rem"; // Vertical offset for arc
              r = absP === 1 ? "15deg" : "22deg";
              s = absP === 1 ? "0.9" : "0.8";

              const rotateStr = `${p > 0 ? '' : '-'}${r}`;
              const transXStr = `${p > 0 ? '' : '-'}${tx}`;
              return {
                transform: `translate(${transXStr}, ${ty}) rotate(${rotateStr}) scale(${s})`,
                className: base
              };
            }

            return {
              transform: `translate(${p > 0 ? '' : '-'}${tx}, ${ty}) rotate(${p > 0 ? '' : '-'}${r}) scale(${s})`,
              className: base
            };
          };

          const { transform, className } = getCardStyle(pos);
          const isActive = pos === 0;

          return (
            <div
              key={m.id}
              className={`absolute w-[125px] sm:w-[300px] lg:w-[380px] h-[165px] sm:h-[420px] lg:h-[440px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${className}`}
              style={{ transform }}
            >
              <div
                className={`w-full h-full rounded-[25px] sm:rounded-[40px] p-[2px] transition-all duration-700
                  ${isActive
                    ? "bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
                    : "bg-[#F5F5F5] shadow-xl"
                  }`}
              >
                <div className={`w-full h-full rounded-[23px] sm:rounded-[38px] p-2 sm:p-8 lg:p-10 flex flex-col justify-between text-left transition-all duration-700
                  ${isActive ? "bg-white border border-gray-100" : "bg-[#F5F5F5] border border-gray-100/50"}
                `}>
                  <div>
                    <p className={`font-jakarta font-bold mb-0.5 sm:mb-3 transition-colors duration-700
                      ${isActive ? "text-[#014BAA] text-[7px] sm:text-[22px]" : "text-[#014BAA]/80 text-[6px] sm:text-[14px]"}
                    `}>
                      Module {m.id}
                    </p>

                    <h3 className={`font-bold font-quattrocento mb-1 sm:mb-4 transition-all duration-700
                      ${isActive ? "text-black text-[11px] sm:text-[26px]" : "text-black/80 text-[9px] sm:text-[16px]"}
                    `}>
                      {m.title}
                    </h3>

                    <div className={`rounded-md sm:rounded-xl p-1 sm:p-4 transition-colors duration-700
                      ${isActive ? "bg-[#014BAA]" : "bg-[#014BAA]/90"}
                    `}>
                      <p className={`text-white transition-all duration-700
                        ${isActive ? "text-[7.5px] sm:text-base leading-tight" : "text-[6.5px] sm:text-[13px] leading-tight"}
                      `}>
                        {m.summary}
                      </p>
                    </div>
                  </div>

                  {/* Navigation - only visible on active card */}
                  <div className={`flex justify-center gap-1.5 sm:gap-4 mt-1 sm:mt-6 transition-all duration-700
                    ${isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                  `}>
                    <button
                      onClick={handlePrev}
                      className="w-4 h-4 sm:w-10 sm:h-10 rounded-full bg-gray-400 hover:bg-[#014BAA] transition-colors flex items-center justify-center group"
                    >
                      <ChevronLeft className="text-white w-2.5 h-2.5 sm:w-6 sm:h-6" />
                    </button>

                    <button
                      onClick={handleNext}
                      className="w-4 h-4 sm:w-10 sm:h-10 rounded-full bg-gray-400 hover:bg-[#014BAA] transition-colors flex items-center justify-center group"
                    >
                      <ChevronRight className="text-white w-2.5 h-2.5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}