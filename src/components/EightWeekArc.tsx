"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const modules = [
  { id: 1, title: "Fundamentals of Being Promotable", summary: "Understand what promotion truly means for you." },
  { id: 2, title: "Claim What You Value", summary: "Learn how to effectively communicate and claim your value in the workplace." },
  { id: 3, title: "Gaining Visibility and Influence", summary: "Discover strategies to increase your visibility and influence within your organization." },
  { id: 4, title: "Navigate With Confidence", summary: "Develop confidence in navigating workplace challenges and opportunities." },
  { id: 5, title: "Leverage - Impact Without Burnout", summary: "Learn how to maximize your impact while maintaining work-life balance." },
  { id: 6, title: "Personal Brand-Building Advocates", summary: "Understand how to build a strong personal brand that supports your career growth." },
  { id: 7, title: "Psychology Of Promotion", summary: "Explore the psychological factors that influence promotion decisions." },
  { id: 8, title: "My Action Plan", summary: "Create a personalized action plan to apply everything you've learned." },
];

const EightWeekArc = () => {
  const [current, setCurrent] = useState(2);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handlePrev = () =>
    setCurrent((p) => (p === 0 ? modules.length - 1 : p - 1));

  const handleNext = () =>
    setCurrent((p) => (p === modules.length - 1 ? 0 : p + 1));

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX < rect.width / 2) handlePrev();
    else handleNext();
  };

  // ✅ UPDATED: Show 5 cards on small devices
  const getPos = (i: number) => {
    const d = i - current;
    const l = modules.length;

    if (d === 0) return 0;
    if (d === 1 || d === -(l - 1)) return 1;
    if (d === 2 || d === -(l - 2)) return 2;
    if (d === -1 || d === l - 1) return -1;
    if (d === -2 || d === l - 2) return -2;

    return null;
  };

  return (
    <>
      {/* HEADING */}
      <div className="relative z-20 max-w-7xl mx-auto text-center mb-6">
        <h2 className="text-[24px] sm:text-[36px] md:text-[48px] font-bold leading-tight md:mb-2">
          <span className="text-[#000000] font-quattrocento">
            The <span className="text-[#014BAA] font-bold">8-Week</span> Arc
          </span>
        </h2>

        <p className="text-[#000000] font-inter text-[14px] sm:text-xl md:text-[20px] leading-6 max-w-5xl mx-auto md:mb-8">
          (With actionable outcomes every week)
        </p>
      </div>

      <section className="relative bg-white lg:pt-40 pb-6 overflow-hidden">
        <div className="relative z-20 max-w-7xl mx-auto text-center">
          <div
            className="relative min-h-[390px] sm:min-h-[450px] flex justify-center items-center touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {modules.map((m, i) => {
              const p = getPos(i);
              if (p === null) return null;

              const styles =
                p === 0
                  ? "translate-x-0 rotate-0 scale-100 z-50"
                  : p === 1
                  ? "translate-x-[55%] sm:translate-x-[65%] rotate-[15deg] scale-[0.9] z-40 mt-16 sm:mt-28"
                  : p === 2
                  ? "translate-x-[95%] sm:translate-x-[118%] rotate-[22deg] scale-[0.8] z-30 mt-28 sm:mt-80"
                  : p === -1
                  ? "translate-x-[-55%] sm:translate-x-[-65%] rotate-[-15deg] scale-[0.9] z-40 mt-16 sm:mt-28"
                  : "translate-x-[-95%] sm:translate-x-[-118%] rotate-[-22deg] scale-[0.8] z-30 mt-28 sm:mt-80";

              return (
                <div
                  key={m.id}
                  className={`absolute w-[260px] sm:w-[360px] lg:w-[420px] h-[360px] sm:h-[500px] transition-all duration-700 ${styles}`}
                >
                  {p === 0 ? (
                    <div
                      className="bg-[linear-gradient(135deg,#FFFFFF_0%,#919191_100%)] p-[2px] rounded-[42px] shadow-[0_30px_80px_rgba(0,0,0,0.18)] h-full cursor-pointer md:cursor-default"
                      onClick={handleCardClick}
                    >
                      <div className="bg-[#F5F5F5] rounded-[40px] p-6 sm:p-10 h-full flex flex-col justify-between text-left">
                        <div>
                          <p className="text-[#014BAA] font-bold text-[14px] sm:text-[22px] mb-3">
                            Module {m.id}
                          </p>

                          <h3 className="text-[16px] sm:text-[26px] font-bold mb-4">
                            {m.title}
                          </h3>

                          <div className="bg-[#014BAA] rounded-xl p-4">
                            <p className="text-white text-[12px] sm:text-[16px]">
                              {m.summary}
                            </p>
                          </div>
                        </div>

                        <div className="hidden md:flex justify-center gap-4 mt-6">
                          <button
                            onClick={handlePrev}
                            className="w-9 h-9 rounded-full bg-[#A8A8A8] flex items-center justify-center"
                          >
                            <ChevronLeft className="text-white" />
                          </button>
                          <button
                            onClick={handleNext}
                            className="w-9 h-9 rounded-full bg-[#A8A8A8] flex items-center justify-center"
                          >
                            <ChevronRight className="text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-[40px] p-8 bg-[#5A5A5A] text-white shadow-xl text-left">
                      <p className="font-bold text-[16px] mb-2 text-white/80">
                        Module {m.id}
                      </p>
                      <h3 className="text-[18px] font-bold mb-3">
                        {m.title}
                      </h3>
                      <p className="text-[14px] text-white/90">
                        {m.summary}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default EightWeekArc;