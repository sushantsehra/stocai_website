"use client";

import React, { useState, useEffect } from "react";
import { LuLightbulb } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const KeyInsight = () => {
  // ✅ Your comparisons grouped
  const comparisons = [
    [
      { old: "Working harder", new: "Being visible in the right ways" },
      { old: "Waiting to be noticed", new: "Executive presence" },
      { old: "Technical excellence", new: "Strategic positioning" },
    ],
    [
      { old: "Asking for permission", new: "Creating opportunities" },
      { old: "Being busy", new: "Being impactful" },
      { old: "CC’d on decisions", new: "Making decisions" },
    ],
    [
      { old: "Attending the ‘All Hands’", new: "Presenting at the ‘All Hands’" },
      { old: "Hotdesking every day", new: "Corner office with your name" },
      { old: "Flying ‘Economy’", new: "Business class approved" },
    ],
  ];

  // ✅ Track which set of comparisons is active
  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % comparisons.length);
    }, 5000); // ⏱️ every 5 seconds
    return () => clearInterval(interval);
  }, [comparisons.length]);

  return (
    <section className="p-4 lg:px-1 bg-white">
      <div className="max-w-full">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-5 py-6 md:py-10 bg-[#0B64F4]">
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-white italic px-4">
            Am I missing something everyone else seems to know?
          </h2>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-[#0B64F4] rounded-[16px] flex items-center justify-center">
              <LuLightbulb className="text-white w-8 h-8" />
            </div>
          </div>

          {/* Subheading */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[42px] font-gotham font-bold text-center mb-4">
            Here&apos;s what no one told you.
          </h3>

          {/* Highlighted Quote */}
          <div className="bg-[#0B64F4] text-white text-center rounded-[16px] px-6 py-6 lg:py-8 max-w-4xl mx-auto translate-y-14">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-bold leading-9">
              What worked earlier in your career{" "}
              <br className="hidden sm:block" />
              now quietly works against you.
            </p>
          </div>

          {/* Insight Text */}
          <div className="text-center mb-8  bg-[#F5F5F5] py-10 rounded-[31.5px] px-6 md:px-10 ">
            <p className="text-base sm:text-lg lg:text-[20px] text-black mt-10">
              Most capable professionals don’t stall because they lack skills.
            </p>
            <p className="text-lg sm:text-xl lg:text-[22px] font-bold text-black">
              They stall because they confuse performance with promotability.
            </p>

          <div className="flex justify-center w-full py-6">
                  {/* Animated Comparison Section */}
          <div className="relative h-[220px] w-2xl flex items-center justify-center bg-white shadow-2xl rounded-[31.5px] p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSet}
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: -90 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col justify-center space-y-4 md:space-y-6"
              >
                {comparisons[currentSet].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
                  >
                    <div className="flex-1 text-center sm:text-right">
                      <span className="text-base sm:text-lg lg:text-[20px] text-black font-normal line-through">
                        {item.old}
                      </span>
                    </div>

                    <div className="flex-shrink-0 rotate-90 sm:rotate-0 bg-[#0B64F41A] w-6 h-6 flex items-center justify-center rounded-full">
                      <FaArrowRight className="w-3 h-3 text-[#0B64F4]" />
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <span className="text-base sm:text-lg font-bold text-[#0B64F4] lg:text-[20px]">
                        {item.new}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default KeyInsight;

// import React from "react";
// import { LuLightbulb } from "react-icons/lu";
// import { FaArrowRight } from "react-icons/fa6";

// const KeyInsight = () => {
//   const comparisons = {
//     [
//     { old: "Working harder", new: "Being visible in the right ways" },
//     { old: "Waiting to be noticed", new: "Executive presence" },
//     { old: "Technical excellence", new: "Strategic positioning" },
//   ],
//   [
//     { old: "Asking for permission", new: "Creating opportunities" },
//     { old: "Being busy", new: "Being impactful" },
//     { old: "CC’d on decisions", new: "Making decisions" },
//   ],
//   [
//     { old: "Attending the ‘All Hands’", new: "Presenting at the ‘All Hands’" },
//     { old: "Hotdesking every day", new: "Corner office with your name" },
//     { old: "Flying ‘Economy’", new: "Business class approved" },
//   ]
//   };

//   return (
//     <section className="p-4 lg:px-1 bg-white">
//       <div className="max-w-full mx-auto">
//         {/* Heading */}
//         <div className="text-center mb-8 md:mb-5 py-6 max-h-[137px] bg-[#0B64F4]">
//           <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-white mb-4 italic px-4">
//             Am I missing something everyone else seems to know?
//           </h2>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
//           {/* Icon */}
//           <div className="flex justify-center mb-6">
//             <div className="w-14 h-14 bg-[#0B64F4] rounded-[16px] flex items-center justify-center">
//               <LuLightbulb className="text-white w-8 h-8" />
//             </div>
//           </div>

//           {/* Subheading */}
//           <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[48px] font-bold text-center mb-4 lg:mb-3">
//             Here's what no one told you.
//           </h3>

//             <div className="flex flex-col relative">
//                 {/* Highlighted Blue Quote */}
//                 <div className="absolute left-[5%] lg:left-[12%] 3xl:left-[20%] bg-[#013C89] border border-[#013C8920] text-white text-center rounded-xl px-6 py-6 lg:py-8 lg:min-w-4xl 2xl:min-w-5xl flex justify-center items-center mx-auto">
//                     <p className="text-lg sm:text-xl md:text-2xl lg:text-[30px] font-bold leading-9">
//                         What worked earlier in your career <br className="hidden sm:block" />
//                         now quietly works against you.
//                     </p>
//                 </div>

//                 {/* Insight Box */}
//                 <div className="bg-[#F5F5F5] rounded-[31.5px] px-6 py-8 md:px-10 md:py-10 mt-24">
//                 <div className="flex flex-col text-center mt-6">
//                     <p className="text-base sm:text-lg lg:text-[22px] font-normal text-black mb-1">
//                     Most capable professionals don't stall because they lack skills.
//                 </p>
//                 <p className="text-lg sm:text-xl lg:text-[22px] font-bold text-black mb-8">
//                     They stall because they confuse performance with promotability.
//                 </p>

//                 </div>
//                 {/* Comparison List */}
//                 <div className="space-y-4 md:space-y-6">
//                     {comparisons.map((item, index) => (
//                     <div
//                         key={index}
//                         className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
//                     >
//                         <div className="flex-1 text-center sm:text-right">
//                         <span className="text-base sm:text-lg lg:text-[20px] text-black font-normal line-through">
//                             {item.old}
//                         </span>
//                         </div>

//                         <div className="flex-shrink-0 rotate-90 sm:rotate-0  bg-[#0B64F41A] w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full">
//                         <FaArrowRight className="w-3 h-3 text-[#0B64F4]" />
//                         </div>

//                         <div className="flex-1 text-center sm:text-left">
//                         <span className="text-base sm:text-lg font-bold text-[#0B64F4] lg:text-[20px]">
//                             {item.new}
//                         </span>
//                         </div>
//                     </div>
//                     ))}
//                 </div>
//                 </div>
//             </div>

//       </div>
//       </div>
//     </section>
//   );
// };

// export default KeyInsight;