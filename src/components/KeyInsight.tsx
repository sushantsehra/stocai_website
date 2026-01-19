import React from "react";
import { LuLightbulb } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa6";

const KeyInsight = () => {
  const comparisons = [
    { old: "Working harder", new: "Being visible in the right ways" },
    { old: "Waiting to be noticed", new: "Executive presence" },
    { old: "Technical excellence", new: "Strategic positioning" },
  ];

  return (
    <section className="p-4 lg:px-1 bg-white">
      <div className="max-w-full mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-10 py-6 max-h-[137px] bg-[#0B64F4]">
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-white mb-4 italic px-4">
            Am I missing something everyone else seems to know?
          </h2>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 bg-[#0B64F4] rounded-[16px] flex items-center justify-center">
              <LuLightbulb className="text-white w-8 h-8" />
            </div>
          </div>

          {/* Subheading */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[48px] font-bold text-center mb-4 lg:mb-3">
            Here's what no one told you.
          </h3>

            <div className="flex flex-col relative">
                {/* Highlighted Blue Quote */}
                <div className="absolute left-[5%] lg:left-[12%] 3xl:left-[20%] bg-[#013C89] border border-[#013C8920] text-white text-center rounded-xl px-6 py-6 lg:py-8 lg:min-w-4xl 2xl:min-w-5xl flex justify-center items-center mx-auto">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-[30px] font-bold leading-9">
                        What worked earlier in your career <br className="hidden sm:block" />
                        now quietly works against you.
                    </p>
                </div>

                {/* Insight Box */}
                <div className="bg-[#F5F5F5] rounded-[31.5px] px-6 py-8 md:px-10 md:py-10 mt-24">
                <div className="flex flex-col text-center mt-6">
                    <p className="text-base sm:text-lg lg:text-[22px] font-normal text-black mb-1">
                    Most capable professionals don't stall because they lack skills.
                </p>
                <p className="text-lg sm:text-xl lg:text-[22px] font-bold text-black mb-8">
                    They stall because they confuse performance with promotability.
                </p>

                </div>
                {/* Comparison List */}
                <div className="space-y-4 md:space-y-6">
                    {comparisons.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
                    >
                        <div className="flex-1 text-center sm:text-right">
                        <span className="text-base sm:text-lg lg:text-[20px] text-black font-normal line-through">
                            {item.old}
                        </span>
                        </div>

                        <div className="flex-shrink-0 rotate-90 sm:rotate-0  bg-[#0B64F41A] w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full">
                        <FaArrowRight className="w-3 h-3 text-[#0B64F4]" />
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                        <span className="text-base sm:text-lg font-bold text-[#0B64F4] lg:text-[20px]">
                            {item.new}
                        </span>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>

      </div>
      </div>
    </section>
  );
};

export default KeyInsight;