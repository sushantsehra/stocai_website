"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const modules = [
  { id: 1, title: "Understanding what makes someone promotable"},
  { id: 2, title: "Expanding your scope of influence"},
  { id: 3, title: "Expanding your scope of influence"},
  { id: 4, title: "Communicating impact effectively"},
  { id: 5, title: "Strategic visibility"},
  { id: 6, title: "Executive presence"},
  { id: 7, title: "Promotion psychology"},
  { id: 8, title: "Your personalized promotion roadmap"},
];

export default function EightWeekArc() {
  const [current, setCurrent] = useState(0);

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

            {/* Top Blue Banner */}
      <div className="bg-[#014BAA] text-white text-center py-3 md:py-2 px-4 mb-[5%]">
        <h2 className="font-quattrocento font-bold text-[18px] md:text-[32px] lg:text-[48px] lg:py-3">
          Ready to change your career trajectory?
        </h2>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto text-center mb-2 md:mb-6">
        <h2 className="text-[18px] sm:text-[36px] md:text-[48px] font-bold leading-tight md:mb-2">
          <span className="text-[#000000] font-inter font-medium">
            The <span className="text-[#014BAA] font-bold font-quattrocento">8-Week</span> Arc
          </span>
        </h2>

        <p className="text-[#000000] font-inter text-[14px] font-inter font-medium sm:text-xl md:text-[20px] leading-6 max-w-5xl mx-auto md:mb-8">
          {/* (With actionable outcomes every week) */}
          Each week focuses on one growth lever.
        </p>
      </div>

      <div className="relative flex justify-center items-center min-h-[85px] md:min-h-[300px] mt-14 md:mt-20  md:translate-y-[25%]">

        {modules.map((m, i) => {
          const pos = getPos(i);
          if (pos === null) return null;

          let style = "";

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

          // Gray overlay strength
          let overlay = "";
          if (pos === 1 || pos === -1) overlay = "bg-[#ADADAD]";
          if (pos === 2 || pos === -2) overlay = "bg-[#6d6e70]";

          return (
            <div
              key={m.id}
              className={`absolute w-[140px] sm:w-[340px] lg:w-[420px] h-[160px] sm:h-[420px] transition-all duration-700 ease-in-out ${style}`}
            >

              {pos === 0 ? (
                <div className="bg-white p-[2px] rounded-[11.11px] shadow-2xl h-full">
                  <div className="bg-[#FFFFFF] rounded-[11.11px] p-2 sm:p-10 h-full flex flex-col justify-between text-left">
                    <div className="pt-3">
                      <p className="text-[#014BAA] text-[7.22px] lg:text-2xl font-jakarta font-bold mb-1 md:mb-3 lg:mb-5">
                        Week {m.id}
                      </p>

                      <h3 className="text-[12px] sm:text-2xl lg:text-4xl font-bold font-quattrocento mb-4">
                        {m.title}
                      </h3>

                      {/* <div className="bg-[#014BAA] rounded-[5.56px] md:rounded-[10px] p-1.5 md:p-4 md:mt-6">
                        <p className="text-white text-[7.45px] md:text-xl sm:text-base">
                          {m.summary}
                        </p>
                      </div> */}
                    </div>

                    <div className="flex justify-center gap-4 md:mt-6 translate-y-[-10px] md:translate-y-[-30px]">
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
                <div className="relative w-full h-full rounded-[11.11px] p-3 pt-6 bg-white shadow-xl text-left md:p-6 overflow-hidden">

                  {/* Gray overlay */}
                  <div className={`absolute inset-0 ${overlay} pointer-events-none`} />

                  <p className="relative text-[7.22px] md:text-sm lg:text-2xl font-bold font-quattrocento text-[#014BAA] mb-2 md:mb-4 md:mt-3">
                    Week {m.id}
                  </p>

                  <h3 className="relative text-[12px] md:text-base lg:text-4xl font-quattrocento text-black font-bold mb-3">
                    {m.title}
                  </h3>

                  {/* <div className="relative bg-[#014BAA] rounded-[5.56px] md:rounded-[10px] p-1.5 md:p-4 md:mt-8">
                    <p className="text-white text-[7.45px] sm:text-sm md:text-2xl">
                      {m.summary}
                    </p>
                  </div> */}

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
//   const [current, setCurrent] = useState(0);

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
//     <section className="relative bg-white py-5 md:py-20 overflow-hidden">
//        <div className="relative z-20 max-w-7xl mx-auto text-center mb-2 md:mb-6">
//          <h2 className="text-[18px] sm:text-[36px] md:text-[48px] font-bold leading-tight md:mb-2">
//            <span className="text-[#000000] font-quattrocento">
//              The <span className="text-[#014BAA] font-bold">8-Week</span> Arc
//            </span>
//          </h2>

//          <p className="text-[#000000] font-inter text-[12px] sm:text-xl md:text-[20px] leading-6 max-w-5xl mx-auto md:mb-8">
//            (With actionable outcomes every week)
//          </p>
//        </div>

//       <div className="relative flex justify-center items-center min-h-[115px] md:min-h-[450px] mt-14 md:mt-20">

//         {modules.map((m, i) => {
//           const pos = getPos(i);
//           if (pos === null) return null;

//           let style = "";

//           // ✅ MOBILE FIRST (5 CARDS VISIBLE)
//           if (pos === 0)
//             style = "translate-x-0 scale-100 z-50";
//           else if (pos === 1)
//             style =
//               "translate-x-[60%] sm:translate-x-[65%] rotate-[12deg] md:rotate-[10deg] scale-90 z-40 translate-y-[3%]";
//           else if (pos === 2)
//             style =
//               "translate-x-[110%] sm:translate-x-[120%] rotate-[15deg] md:rotate-[18deg] translate-y-[13%] scale-75 z-30";
//           else if (pos === -1)
//             style =
//               "translate-x-[-60%] sm:translate-x-[-65%] rotate-[-12deg] md:rotate-[-10deg] scale-90 z-40 translate-y-[3%]";
//           else
//             style =
//               "translate-x-[-110%] sm:translate-x-[-120%] rotate-[-15deg] md:rotate-[-18deg] translate-y-[13%] scale-75 z-30";

//           return (
//             <div
//               key={m.id}
//               className={`absolute w-[140px] sm:w-[340px] lg:w-[420px] h-[180px] sm:h-[450px] transition-all duration-700 ease-in-out ${style}`}
//             >
//               {pos === 0 ? (
//                 <div className="bg-white p-[2px] rounded-[11.11px] shadow-2xl h-full">
//                   <div className="bg-[#FFFFFF] rounded-[11.11px] p-2 sm:p-10 h-full flex flex-col justify-between text-left">
//                     <div className="pt-3">
//                     <p className="text-[#014BAA] text-[7.22px] lg:text-2xl font-jakarta font-bold mb-1 md:mb-3 lg:mb-5">
//                         Module {m.id}
//                       </p>

//                       <h3 className="text-[12px] sm:text-2xl lg:text-4xl font-bold font-quattrocento mb-4">
//                         {m.title}
//                       </h3>

//                       <div className="bg-[#014BAA] rounded-[5.56px] md:rounded-[10px] p-1.5 md:p-4 md:mt-6">
//                         <p className="text-white text-[7.45px] md:text-xl sm:text-base">
//                           {m.summary}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex justify-center gap-4 md:mt-6 translate-y-[-10px]">
//                       <button
//                         onClick={handlePrev}
//                         className="w-5 h-5 md:w-9 md:h-9 rounded-full bg-gray-400 flex items-center justify-center"
//                       >
//                         <ChevronLeft className="text-white" />
//                       </button>

//                       <button
//                         onClick={handleNext}
//                         className="w-5 h-5 md:w-9 md:h-9 rounded-full bg-gray-400 flex items-center justify-center"
//                       >
//                         <ChevronRight className="text-white" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="w-full h-full rounded-[11.11px] p-3 pt-6 bg-[#FFFFFF] text-white shadow-xl text-left md:p-6">
//                   <p className="text-[7.22px] md:text-sm lg:text-2xl font-bold font-quattrocento text-[#014BAA] mb-2 md:mb-4 md:mt-3">
//                     Module {m.id}
//                   </p>
//                   <h3 className="text-[12px] md:text-base lg:text-4xl font-quattrocento text-black font-bold mb-3">
//                     {m.title}
//                   </h3>
//                   <div className="bg-[#014BAA] rounded-[5.56px] md:rounded-[10px] p-1.5 md:p-4 md:mt-8">
//                     <p className="text-white text-[7.45px] sm:text-sm md:text-2xl">
//                       {m.summary}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }