"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import utkarshJha from "../assets/utkarshJha.jpg";
import venkatraman from "../assets/venkatraman.png";
import eleena from "../assets/eleena.png";
import manav from "../assets/manav.png";
import bgColor from "../assets/bgCircle.png";

const testimonials = [
  {
    name: "M. Hussain",
    role: "AVP Marketing",
    title: "10+ Years of Experience",
    before: "I delivered results, but no one beyond my team noticed.",
    after:
      "Better Corporate Life taught me how to share wins confidently. Now leaders know (and value) my work.",
    image: manav,
  },
  {
    name: "Eleena R",
    role: "Project Manager",
    title: "8+ Years of Experience",
    before:
      "I contributed to major projects but struggled to make my impact visible.",
    after:
      "Now, I communicate achievements clearly and get recognized for my contributions.",
    image: eleena,
  },
  {
    name: "Utkarsh Jha",
    role: "AVP Marketing",
    title: "10+ Years of Experience",
    before:
      "I said 'yes' to everything to get noticed, but always ended up exhausted.",
    after:
      "I learned to prioritize and delegate. I work less, deliver more, and the impact of my work got noticed.",
    image: utkarshJha,
  },
  {
    name: "Venkatraman A.",
    role: "Lead Researcher",
    title: "8+ Years of Experience",
    before: "I spoke only in facts, so people found me distant.",
    after:
      "I learned to balance empathy with logic. Now people trust my ideas.",
    image: venkatraman,
  },
  {
    name: "Michael Chen",
    role: "Data Analyst",
    title: "10+ Years of Experience",
    before: "I had insights, but no influence.",
    after: "Now my data drives decisions.",
    image: manav,
  },
];

const Testimonial = () => {
  const [current, setCurrent] = useState(2);

  const handlePrev = () =>
    setCurrent((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const handleNext = () =>
    setCurrent((p) => (p === testimonials.length - 1 ? 0 : p + 1));

  const getPos = (i: number) => {
    const d = i - current;
    const l = testimonials.length;
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
      <div className="relative z-20 max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-[36px] md:text-[48px] font-bold leading-tight mb-3">
          <span className="text-[#0B64F4] font-jakarta">Promotability is a skill.</span>
          <br />
          <span className="text-black font-jakarta">
            And like any skill, it can be learnt.
          </span>
        </h2>

        <p className="text-[#6B7280] font-jakarta text-xl md:text-[20px] max-w-5xl mx-auto mb-8">
          Everything you need is already there, buried under deadlines, burnout,
          and unclear leadership.
        </p>
      </div>

      <section className="relative bg-white pt-40 pb-6 overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
          <Image
            src={bgColor}
            width={600}
            height={600}
            alt="bg"
            className="opacity-40 rotate-[135deg] -translate-y-9"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto text-center">
          {/* CARD STACK */}
          <div className="relative min-h-[450px] flex justify-center items-center">
            {testimonials.map((t, i) => {
              const p = getPos(i);
              if (p === null) return null;

              const styles =
                p === 0
                  ? "translate-x-0 rotate-0 scale-100 z-50"
                  : p === 1
                  ? "translate-x-[65%] rotate-[19deg] scale-[0.9] z-30 mt-28"
                  : p === 2
                  ? "translate-x-[118%] rotate-[23deg] scale-[0.78] z-10 mt-80"
                  : p === -1
                  ? "translate-x-[-65%] rotate-[-19deg] scale-[0.9] z-30 mt-28"
                  : "translate-x-[-118%] rotate-[-25deg] scale-[0.78] z-10 mt-80";

              const normalBg =
                p === 1 || p === -1
                  ? "bg-[#8E8E8E] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                  : "bg-[#5A5A5A] shadow-[0_15px_40px_rgba(0,0,0,0.45)]";

              return (
                <div
                  key={i}
                  className={`absolute w-[420px] h-[560px] transition-all duration-700 ${styles}`}
                >
                  {p === 0 ? (
                    <div className="bg-[linear-gradient(135deg,#FFFFFF_0%,#919191_100%)] p-[2px] rounded-[42px] shadow-[0_30px_80px_rgba(0,0,0,0.18)] h-full">
                      <div className="bg-[#F5F5F5] rounded-[40px] p-8 h-full">
                        {/* CONTENT */}
                        <div className="flex items-center gap-5 mb-8">
                          <div className="w-16 h-16 md:w-[114px] md:h-[114px] rounded-full overflow-hidden">
                            <Image
                              src={t.image}
                              alt={t.name}
                              width={114}
                              height={114}
                            />
                          </div>

                          <div className="text-left">
                            <h3 className="text-xl lg:text-[26px] font-bold font-jakarta text-[#0B64F4]">
                              {t.name}
                            </h3>
                            <p className="text-sm md:text-[14px] font-bold text-[#A8A8A8] font-jakarta">
                              {t.role}
                            </p>
                            <p className="font-bold text-black text-[16px] font-jakarta">
                              {t.title}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-5 text-left">
                          <div className="p-2">
                            <h4 className="font-bold text-[22px] font-jakarta text-black/60">
                              Before:
                            </h4>
                            <p className="font-jakarta font-medium text-[16px] leading-5 mt-1.5">{t.before}</p>
                          </div>

                          <div className="bg-[#2F66F3] rounded-2xl p-4 md:p-6">
                            <h4 className="font-bold mb-1 font-jakarta text-white/90 text-[22px]">After:</h4>
                            <p className="text-[16px] font-medium font-jakarta text-white leading-5">{t.after}</p>
                          </div>
                        </div>

                        <div className="flex justify-center gap-4 mt-8 md:mt-10">
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
                    <div
                      className={`w-[420px] h-[560px] rounded-[40px] p-8 ${normalBg}`}
                    >
                      <div className="flex items-center gap-5 mb-8">
                        <div className="w-16 h-16 md:w-[114px] md:h-[114px] rounded-full overflow-hidden">
                          <Image
                            src={t.image}
                            alt={t.name}
                            width={114}
                            height={114}
                          />
                        </div>

                        <div className="text-left">
                          <h3 className="text-xl lg:text-[26px] font-jakarta font-bold text-[#1E3A8A]">
                            {t.name}
                          </h3>
                          <p className="text-sm font-bold text-[#A8A8A8]">
                            {t.role}
                          </p>
                          <p className="font-bold text-gray-800">
                            {t.title}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-5 text-left">
                        <div>
                          <h4 className="font-bold text-black/60">
                            Before:
                          </h4>
                          <p>{t.before}</p>
                        </div>

                        <div className="bg-[#2F66F3] rounded-2xl p-4 text-white">
                          <h4 className="font-bold mb-1">After:</h4>
                          <p>{t.after}</p>
                        </div>
                      </div>
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

export default Testimonial;