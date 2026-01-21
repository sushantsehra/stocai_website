"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import utkarshJha from "../assets/utkarshJha.jpg";

const testimonials = [
  {
    name: "M. Hussain",
    role: "AVP Marketing",
    title: "10+ Years of Experience",
    before: "I delivered results, but no one beyond my team noticed.",
    after:
      "Better Corporate Life taught me how to share wins confidently. Now leaders know (and value) my work.",
    image: utkarshJha,
  },
  {
    name: "Eleena R",
    role: "Project Manager",
    title: "8+ Years of Experience",
    before:
      "I contributed to major projects but struggled to make my impact visible.",
    after:
      "Now, I communicate achievements clearly and get recognized for my contributions.",
    image: utkarshJha,
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
    before:
      "My designs were good, but I struggled to advocate for them in meetings.",
    after:
      "I learned to present my work strategically and gained buy-in from stakeholders.",
    image: utkarshJha,
  },
  {
    name: "Michael Chen",
    role: "Data Analyst",
    title: "10+ Years of Experience",
    before: "I had great insights but couldn't translate them into action.",
    after:
      "Now I communicate data in ways that drive decisions and show business impact.",
    image: utkarshJha,
  },
];

const Testimonial = () => {
  const [current, setCurrent] = useState(2);

  const handlePrev = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  const getCardPosition = (index: number): number | null => {
    const diff = index - current;
    const totalCards = testimonials.length;

    let position;
    if (diff === 0) position = 0;
    else if (diff === 1 || diff === -(totalCards - 1)) position = 1;
    else if (diff === 2 || diff === -(totalCards - 2)) position = 2;
    else if (diff === -1 || diff === totalCards - 1) position = -1;
    else if (diff === -2 || diff === totalCards - 2) position = -2;
    else position = null;

    return position;
  };

  return (
    <section className="relative bg-white py-16 md:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold leading-tight mb-6">
          <span className="text-[#0B64F4]">Promotability is a skill.</span>
          <br />
          <span className="text-[#000000]">
            And like any skill, it can be learnt.
          </span>
        </h2>

        <p className="text-[#6B7280] text-base sm:text-lg md:text-xl lg:text-[20px] max-w-full font-normal mx-auto mb-4">
          Everything you need is already there, buried under deadlines, burnout,
          and unclear leadership.
        </p>

        <div className="max-w-5xl mx-auto mb-12">
          <p className="text-[#000000] lg:text-[24px] text-lg sm:text-xl md:text-2xl font-semibold">
            We don&apos;t add noise.
          </p>
          <p className="text-[#000000] lg:text-[24px] text-lg sm:text-xl md:text-2xl font-semibold">
            We create space, structure, and the right prompts—so you finally
            hear what matters.
          </p>
        </div>

        <div className="relative flex justify-center items-center mt-16 min-h-[500px] md:min-h-[540px]">
          {testimonials.map((testimonial, index) => {
            const position = getCardPosition(index);

            if (position === null) return null;

            let styles = "";
            let zIndex = "";
            let textColor = "";

            if (position === 0) {
              styles = "translate-x-0 rotate-0 scale-100 opacity-100 blur-0";
              zIndex = "z-50";
              textColor = "active";
            } else if (position === 1) {
              styles =
                "translate-x-[45%] sm:translate-x-[50%] md:translate-x-[70%] rotate-[10deg] scale-[0.85] opacity-50 blur-[1px]";
              zIndex = "z-30";
              textColor = "inactive";
            } else if (position === 2) {
              styles =
                "translate-x-[80%] sm:translate-x-[85%] md:translate-x-[125%] rotate-[20deg] scale-[0.7] opacity-30 blur-[1.5px] mt-36";
              zIndex = "z-10";
              textColor = "inactive";
            } else if (position === -1) {
              styles =
                "translate-x-[-45%] sm:translate-x-[-50%] md:translate-x-[-70%] rotate-[-10deg] scale-[0.85] opacity-50 blur-[1px]";
              zIndex = "z-30";
              textColor = "inactive";
            } else if (position === -2) {
              styles =
                "translate-x-[-80%] sm:translate-x-[-85%] md:translate-x-[-125%] rotate-[-20deg] scale-[0.7] opacity-30 blur-[1.5px] mt-36";
              zIndex = "z-10";
              textColor = "inactive";
            }

            return (
              <div
                key={index}
                className={`absolute w-[85%] sm:w-[70%] md:w-[520px] lg:w-[380px] bg-[#F5F5F5] rounded-3xl shadow-2xl p-8 sm:p-10 md:p-9 transition-all duration-700 ease-in-out ${styles} ${zIndex}`}
              >
                <div className="flex items-center gap-4 sm:gap-6 mb-8">
                  {/* ✅ Replaced placeholder with actual image */}
                  <div className="w-16 h-16 sm:w-22 sm:h-22 2xl:w-[114px] 2xl:h-[114px] rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={114}
                      height={114}
                      className="w-full h-full object-co rounded-full"
                    />
                  </div>

                  <div className="text-left">
                    <h3
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-[26px] font-bold mb-1 ${
                        textColor === "active"
                          ? "text-[#0B64F4]"
                          : "text-gray-400"
                      }`}
                    >
                      {testimonial.name}
                    </h3>
                    <p
                      className={`text-sm sm:text-base md:text-[16px] font-bold ${
                        textColor === "active"
                          ? "text-[#00000066]"
                          : "text-gray-400"
                      }`}
                    >
                      {testimonial.role}
                    </p>
                    <p
                      className={`text-base sm:text-lg md:text-[16px] font-bold ${
                        textColor === "active" ? "text-black" : "text-gray-400"
                      }`}
                    >
                      {testimonial.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-6 md:space-y-5 text-left">
                  <div className="p-4">
                    <h4
                      className={`font-bold text-base sm:text-lg md:text-xl lg:text-[22px] font-bold mb-1.5 ${
                        textColor === "active"
                          ? "text-[#00000099]"
                          : "text-gray-400"
                      }`}
                    >
                      Before:
                    </h4>
                    <p
                      className={`text-sm sm:text-base md:text-[16px] font-medium leading-5 ${
                        textColor === "active"
                          ? "text-black"
                          : "text-gray-400"
                      }`}
                    >
                      {testimonial.before}
                    </p>
                  </div>
                  <div className="bg-[#0B64F4] rounded-[20px] p-4">
                    <h4
                      className={`font-bold text-base sm:text-lg md:text-[22px] font-bold mb-1.5 ${
                        textColor === "active"
                          ? "text-white/90"
                          : "text-gray-400"
                      }`}
                    >
                      After:
                    </h4>
                    <p
                      className={`text-sm sm:text-base md:text-[16px] font-medium leading-5 ${
                        textColor === "active"
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                    >
                      {testimonial.after}
                    </p>
                  </div>
                </div>

                {position === 0 && (
                  <div className="flex justify-center gap-4 mt-8 md:mt-10">
                    <button
                      onClick={handlePrev}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;