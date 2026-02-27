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
    <section className="relative bg-white py-5 md:py-20 overflow-hidden">
       <div className="relative z-20 max-w-7xl mx-auto text-center mb-2 md:mb-6">
         <h2 className="text-[24px] sm:text-[36px] md:text-[48px] font-bold leading-tight md:mb-2">
           <span className="text-[#000000] font-quattrocento">
             The <span className="text-[#014BAA] font-bold">8-Week</span> Arc
           </span>
         </h2>

         <p className="text-[#000000] font-inter text-[14px] sm:text-xl md:text-[20px] leading-6 max-w-5xl mx-auto md:mb-8">
           (With actionable outcomes every week)
         </p>
       </div>

      <div className="relative flex justify-center items-center min-h-[115px] mt-14 md:mt-20">

        {modules.map((m, i) => {
          const pos = getPos(i);
          if (pos === null) return null;

          let style = "";

          // ✅ MOBILE FIRST (5 CARDS VISIBLE)
          if (pos === 0)
            style = "translate-x-0 scale-100 z-50";
          else if (pos === 1)
            style =
              "translate-x-[60%] sm:translate-x-[65%] rotate-[12deg] md:rotate-[10deg] scale-90 z-40 translate-y-[3%]";
          else if (pos === 2)
            style =
              "translate-x-[110%] sm:translate-x-[120%] rotate-[15deg] md:rotate-[18deg] translate-y-[13%] scale-75 z-30";
          else if (pos === -1)
            style =
              "translate-x-[-60%] sm:translate-x-[-65%] rotate-[-12deg] md:rotate-[-10deg] scale-90 z-40 translate-y-[3%]";
          else
            style =
              "translate-x-[-110%] sm:translate-x-[-120%] rotate-[-15deg] md:rotate-[-18deg] translate-y-[13%] scale-75 z-30";

          return (
            <div
              key={m.id}
              className={`absolute w-[140px] sm:w-[340px] lg:w-[420px] h-[180px] sm:h-[480px] transition-all duration-700 ease-in-out ${style}`}
            >
              {pos === 0 ? (
                <div className="bg-white p-[2px] rounded-[40px] shadow-2xl h-full">
                  <div className="bg-[#FFFFFF] rounded-[11.11px] p-2 sm:p-10 h-full flex flex-col justify-between text-left">
                    <div className="pt-3">
                    <p className="text-[#014BAA] text-[7.22px] font-jakarta font-bold mb-1 md:mb-3">
                        Module {m.id}
                      </p>

                      <h3 className="text-[12px] sm:text-2xl font-bold font-quattrocento mb-4">
                        {m.title}
                      </h3>

                      <div className="bg-[#014BAA] rounded-[5.56px] p-1.5 md:p-4">
                        <p className="text-white text-[7.45px] sm:text-base">
                          {m.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4 md:mt-6 translate-y-[-10px]">
                      <button
                        onClick={handlePrev}
                        className="w-5 h-5 md:w-9 md:h-9 rounded-full bg-gray-400 flex items-center justify-center"
                      >
                        <ChevronLeft className="text-white" />
                      </button>

                      <button
                        onClick={handleNext}
                        className="w-5 h-5 md:w-9 md:h-9 rounded-full bg-gray-400 flex items-center justify-center"
                      >
                        <ChevronRight className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full rounded-[11.11px] p-3 pt-6 bg-[#FFFFFF] text-white shadow-xl text-left">
                  <p className="text-[7.22px] md:text-sm font-bold font-quattrocento text-[#014BAA] mb-2">
                    Module {m.id}
                  </p>
                  <h3 className="text-[12px] md:text-base font-quattrocento text-black font-bold mb-3">
                    {m.title}
                  </h3>
                  <div className="bg-[#014BAA] rounded-[5.56px] p-1.5 md:p-4">
                    <p className="text-white text-[7.45px] sm:text-sm">
                      {m.summary}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}