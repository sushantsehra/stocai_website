"use client";

import React, { useState, useEffect } from "react";
import { LuLightbulb } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const KeyInsight = () => {
  const comparisons = [
    { old: "Working harder", new: "Being visible in the right ways" },
    { old: "Waiting to be noticed", new: "Executive presence" },
    { old: "Technical excellence", new: "Strategic positioning" },
    { old: "Asking for permission", new: "Creating opportunities" },
    { old: "Being busy", new: "Being impactful" },
    { old: "CC’d on decisions", new: "Making decisions" },
    { old: "Attending the ‘All Hands’", new: "Presenting at the ‘All Hands’" },
    { old: "Hotdesking every day", new: "Corner office with your name" },
    { old: "Flying ‘Economy’", new: "Business class approved" },
  ];

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % comparisons.length);
    }, 2500); // every 2s a new one comes in
    return () => clearInterval(interval);
  }, [comparisons.length]);

  // always keep 3 visible items
  // const visibleItems = [
  //   comparisons[startIndex % comparisons.length],
  //   comparisons[(startIndex + 1) % comparisons.length],
  //   comparisons[(startIndex + 2) % comparisons.length],
  // ];

  const visibleItems = comparisons.slice(
    startIndex,
    startIndex + 3
  ).map((item, i) => ({
    ...item,
    id: `${startIndex + i}`,
  }));

  return (
    <section className="py-0 lg:px-0 bg-white">
      <div className="max-w-full">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-1 py-6 md:py-10 lg:py-12 bg-[#0B64F4]">
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-jakarta font-bold text-white italic px-4">
            Am I missing something everyone else seems to know?
          </h2>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-xl p-6 sm:p-8 md:p-16 relative overflow-hidden mt-1.5">
          {/* Icon */}
          <div className="flex justify-center mb-6 lg:mb-7">
            <div className="w-14 h-14 lg:w-[64px] lg:h-[64px] bg-[#0B64F4] rounded-[16px] flex items-center justify-center">
              <LuLightbulb className="text-white w-9 h-9" />
            </div>
          </div>

          {/* Subheading */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[48px] font-jakarta font-bold text-center">
            Here&apos;s what no one told you.
          </h3>

        <div>
          {/* Highlighted Quote */}
          <div className="bg-[#0B64F4] relative z-50 text-white text-center rounded-[16px] px-6 py-6 lg:py-8 max-w-[896px] mx-auto z-50 translate-y-6">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[30px] font-jakarta font-bold leading-10">
              What worked earlier in your career{" "}
              <br className="hidden sm:block" />
              now quietly works against you.
            </p>
          </div>

          {/* Insight Text */}
          <div className="text-center mb-8 bg-[#F5F5F5] py-10 lg:py-12 lg:mx-20 rounded-[31.5px] px-6 md:px-12 z-20 -translate-y-3">
            <p className="text-base sm:text-lg lg:text-[22px] font-jakarta font-normal text-black mt-6">
              Most capable professionals don’t stall because they lack skills.
            </p>
            <p className="text-lg sm:text-xl lg:text-[22px] font-jakarta font-bold text-black mt-1.5">
              They stall because they confuse performance with promotability.
            </p>

            {/* Animated Comparison Section */}
            <div className="flex justify-center w-full py-2">
              <div className="relative h-[160px] overflow-hidden flex flex-col items-center justify-center bg-white shadow-2xl mt-2 lg:mt-5 rounded-[31.5px] p-4 sm:p-6 w-full max-w-xl">
     
                <AnimatePresence mode="popLayout">
                  {visibleItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-3.5 space-y-2.5 w-full"
                    >
                      <div className="flex-1 text-center sm:text-left ">
                        <span className="text-base sm:text-lg lg:text-[16px] text-black font-jakarta font-normal line-through">
                          {item.old}
                        </span>
                      </div>

                      <div className="flex-shrink-0 lg:mr-[2%] rotate-90 sm:rotate-0 bg-[#0B64F41A] w-6 h-6 flex items-center justify-center rounded-full">
                        <FaArrowRight className="w-3 h-3 text-[#0B64F4]" />
                      </div>

                      <div className="flex-1 text-center sm:text-left lg:mr-[1%]">
                        <span className="text-base lg:text-[16px] font-bold font-jakarta text-[#0B64F4]">
                          {item.new}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

              </div>
            </div>
          </div>
        </div>



        </div>
      </div>
    </section>
  );
};

export default KeyInsight;