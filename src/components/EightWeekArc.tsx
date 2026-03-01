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

      <div className="relative flex justify-center items-center min-h-[115px] md:min-h-[450px] mt-14 md:mt-20">

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
              className={`absolute w-[140px] sm:w-[340px] lg:w-[420px] h-[180px] sm:h-[450px] transition-all duration-700 ease-in-out ${style}`}
            >
              {pos === 0 ? (
                <div className="bg-white p-[2px] rounded-[11.11px] shadow-2xl h-full">
                  <div className="bg-[#FFFFFF] rounded-[11.11px] p-2 sm:p-10 h-full flex flex-col justify-between text-left">
                    <div className="pt-3">
                    <p className="text-[#014BAA] text-[7.22px] lg:text-2xl font-jakarta font-bold mb-1 md:mb-3 lg:mb-5">
                        Module {m.id}
                      </p>

                      <h3 className="text-[12px] sm:text-2xl lg:text-4xl font-bold font-quattrocento mb-4">
                        {m.title}
                      </h3>

                      <div className="bg-[#014BAA] rounded-[5.56px] md:rounded-[10px] p-1.5 md:p-4 md:mt-6">
                        <p className="text-white text-[7.45px] md:text-xl sm:text-base">
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
                <div className="w-full h-full rounded-[11.11px] p-3 pt-6 bg-[#FFFFFF] text-white shadow-xl text-left md:p-6">
                  <p className="text-[7.22px] md:text-sm lg:text-2xl font-bold font-quattrocento text-[#014BAA] mb-2 md:mb-4 md:mt-3">
                    Module {m.id}
                  </p>
                  <h3 className="text-[12px] md:text-base lg:text-4xl font-quattrocento text-black font-bold mb-3">
                    {m.title}
                  </h3>
                  <div className="bg-[#014BAA] rounded-[5.56px] md:rounded-[10px] p-1.5 md:p-4 md:mt-8">
                    <p className="text-white text-[7.45px] sm:text-sm md:text-2xl">
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

// "use client";

// import { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const modules = [
//   { id: 1, title: "Fundamentals of Being Promotable", summary: "Understand what promotion truly means for you." },
//   { id: 2, title: "Claim What You Value", summary: "Learn to delegate effectively and multiply your impact." },
//   { id: 3, title: "Gaining Visibility and Influence", summary: "Map your key stakeholders and understand what matters to them." },
//   { id: 4, title: "Navigate With Confidence", summary: "Identify what weakens your executive presence." },
//   { id: 5, title: "Leverage - Impact Without Burnout", summary: "Learn to delegate effectively and multiply your impact." },
//   { id: 6, title: "Personal Brand-Building Advocates", summary: "Step into the habits and behaviours of your next level." },
//   { id: 7, title: "Psychology Of Promotion", summary: "Communicate your value with clarity, confidence, and conviction." },
//   { id: 8, title: "My Action Plan", summary: "Create a personalized action plan to apply everything you've learned." },
// ];

// export default function EightWeekArc() {
//   const [current, setCurrent] = useState(2);

//   const handlePrev = () =>
//     setCurrent((p) => (p === 0 ? modules.length - 1 : p - 1));

//   const handleNext = () =>
//     setCurrent((p) => (p === modules.length - 1 ? 0 : p + 1));

//   const getPos = (i: number) => {
//     const diff = i - current;
//     const len = modules.length;

//     if (diff === 0) return 0;
//     if (diff === 1 || diff === -(len - 1)) return 1;
//     if (diff === 2 || diff === -(len - 2)) return 2;
//     if (diff === -1 || diff === len - 1) return -1;
//     if (diff === -2 || diff === len - 2) return -2;

//     return null;
//   };

//   return (
//     <section className="relative bg-white py-5 md:py-16 overflow-hidden">
//       <div className="relative z-20 max-w-7xl mx-auto text-center mb-6 md:mb-12">
//         <h2 className="text-[24px] sm:text-[36px] md:text-[48px] font-bold leading-tight md:mb-2">
//           <span className="text-[#000000] font-quattrocento">
//             The <span className="text-[#014BAA] font-bold">8-Week</span> Arc
//           </span>
//         </h2>

//         <p className="text-[#000000] font-inter text-[14px] sm:text-xl md:text-[20px] leading-6 max-w-5xl mx-auto">
//           (With actionable outcomes every week)
//         </p>
//       </div>

//       <div className="relative flex justify-center items-center h-[260px] sm:h-[500px] mt-10 md:mt-14">
//         {modules.map((m, i) => {
//           const pos = getPos(i);
//           if (pos === null) return null;

//           const getCardStyle = (p: number) => {
//             const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

//             // Base opacity and z-index logic
//             const base = {
//               0: "z-50 opacity-100",
//               1: "z-40 opacity-80 lg:opacity-90",
//               2: "z-30 opacity-60 lg:opacity-75",
//               "-1": "z-40 opacity-80 lg:opacity-90",
//               "-2": "z-30 opacity-60 lg:opacity-75",
//             }[p];

//             if (p === 0) return { transform: "translate(0, 0) rotate(0) scale(1)", className: base };

//             // const factor = p > 0 ? 1 : -1;
//             const absP = Math.abs(p);

//             // MOBILE VALUES (Restored completely to original 140x180 layout)
//             let tx = absP === 1 ? "60%" : "110%";
//             let ty = absP === 1 ? "3%" : "13%";
//             let r = absP === 1 ? "12deg" : "15deg";
//             let s = absP === 1 ? "0.9" : "0.75";

//             // DESKTOP VALUES (Reduced to 380px x 440px)
//             if (!isMobile) {
//               tx = absP === 1 ? "65%" : "118%";
//               ty = absP === 1 ? "5.5rem" : "16rem"; // Vertical offset for arc
//               r = absP === 1 ? "15deg" : "22deg";
//               s = absP === 1 ? "0.9" : "0.8";

//               const rotateStr = `${p > 0 ? '' : '-'}${r}`;
//               const transXStr = `${p > 0 ? '' : '-'}${tx}`;
//               return {
//                 transform: `translate(${transXStr}, ${ty}) rotate(${rotateStr}) scale(${s})`,
//                 className: base
//               };
//             }

//             return {
//               transform: `translate(${p > 0 ? '' : '-'}${tx}, ${ty}) rotate(${p > 0 ? '' : '-'}${r}) scale(${s})`,
//               className: base
//             };
//           };

//           const { transform, className } = getCardStyle(pos);
//           const isActive = pos === 0;

//           return (
//             <div
//               key={m.id}
//               className={`absolute w-[140px] sm:w-[360px] lg:w-[380px] h-[180px] sm:h-[480px] lg:h-[440px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${className}`}
//               style={{ transform }}
//             >
//               <div
//                 className={`w-full h-full transition-all duration-700
//                   ${isActive
//                     ? "bg-white p-[2px] rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
//                     : "rounded-[40px] p-4 pt-8 bg-[#F5F5F5] shadow-xl text-left border border-gray-100"
//                   }`}
//               >
//                 <div className={`w-full h-full flex flex-col justify-between text-left transition-all duration-700
//                   ${isActive ? "bg-[#FFFFFF] rounded-[40px] p-4 sm:p-10 border border-gray-100" : ""}
//                 `}>
//                   <div>
//                     <p className={`font-jakarta font-bold transition-colors duration-700
//                       ${isActive ? "text-[#014BAA] text-[10px] sm:text-[22px] mb-1 sm:mb-3" : "text-[#014BAA]/80 text-[10px] md:text-sm mb-2"}
//                     `}>
//                       Module {m.id}
//                     </p>

//                     <h3 className={`font-bold font-quattrocento transition-all duration-700
//                       ${isActive ? "text-[14px] sm:text-[26px] mb-2 sm:mb-4 text-black" : "text-[14px] md:text-base mb-3 text-black"}
//                     `}>
//                       {m.title}
//                     </h3>

//                     <div className={`transition-colors duration-700
//                       ${isActive ? "bg-[#014BAA] rounded-xl p-2 sm:p-4" : "bg-[#014BAA] rounded-lg p-2 md:p-4"}
//                     `}>
//                       <p className={`text-white transition-all duration-700
//                         ${isActive ? "text-[11px] sm:text-base" : "text-[11px] md:text-sm"}
//                       `}>
//                         {m.summary}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Navigation - only visible on active card */}
//                   <div className={`flex justify-center gap-4 transition-all duration-700
//                     ${isActive ? "mt-2 sm:mt-6 opacity-100 pointer-events-auto" : "mt-0 opacity-0 pointer-events-none h-0 overflow-hidden"}
//                   `}>
//                     <button
//                       onClick={handlePrev}
//                       className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gray-400 hover:bg-[#014BAA] transition-colors flex items-center justify-center group"
//                     >
//                       <ChevronLeft className="text-white w-4 h-4 sm:w-6 sm:h-6" />
//                     </button>

//                     <button
//                       onClick={handleNext}
//                       className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gray-400 hover:bg-[#014BAA] transition-colors flex items-center justify-center group"
//                     >
//                       <ChevronRight className="text-white w-4 h-4 sm:w-6 sm:h-6" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }