import React from "react";

const KeyInsight = () => {
  const comparisons = [
    { old: "Working harder", new: "Being visible in the right ways" },
    { old: "Waiting to be noticed", new: "Executive presence" },
    { old: "Technical excellence", new: "Strategic positioning" },
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-4 italic px-4">
            Am I missing something everyone else seems to know?
          </h2>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
            </div>
          </div>

          {/* Subheading */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            Here's what no one told you.
          </h3>

          {/* Highlighted Quote */}
          <div className="bg-blue-600 text-white rounded-xl p-6 md:p-8 mb-8">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center leading-relaxed">
              What worked earlier in your career now quietly works against you.
            </p>
          </div>

          {/* Insight Text */}
          <div className="space-y-4 md:space-y-6 mb-8">
            <p className="text-base sm:text-lg text-slate-700 text-center">
              Most capable professionals don't stall because they lack skills.
            </p>
            <p className="text-lg sm:text-xl font-bold text-slate-900 text-center">
              They stall because they confuse performance with promotability.
            </p>
          </div>

          {/* Comparison List */}
          <div className="space-y-3 md:space-y-4">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 rounded-lg bg-slate-50"
              >
                <div className="flex-1 text-center sm:text-right w-full">
                  <span className="text-sm sm:text-base text-slate-600">
                    {item.old}
                  </span>
                </div>
                <div className="flex-shrink-0 rotate-90 sm:rotate-0">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
                <div className="flex-1 text-center sm:text-left w-full">
                  <span className="text-sm sm:text-base font-semibold text-blue-600">
                    {item.new}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyInsight;