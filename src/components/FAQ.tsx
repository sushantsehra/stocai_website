"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "I'm very senior and experienced, so I don't think this will really help me.",
      answer: "Our program is built for experienced professionals too. We focus on practical, level-specific levers — positioning, stakeholder alignment, and measurable influence — that senior leaders use to accelerate promotion decisions."
    },
    {
      question: "I don't think promotion skills can be taught or learnt.",
      answer: "Promotion-readiness is a set of repeatable behaviours and signals. We teach what to do, how to communicate it, and how to measure it — so behaviours become habits and outcomes become visible to leaders."
    },
    {
      question: "I don't know if anyone can apply it in real day-to-day work.",
      answer: "Every module is designed as a short, actionable practice that you can apply during regular work. Participants get templates, 1:1 coaching prompts and real-time feedback loops to integrate learnings immediately."
    },
    {
      question: "I'm not sure if this course will be worth the fees being charged.",
      answer: "We focus on ROI: better role matches, faster promotions, and clear visibility. Many participants recoup the investment within months through promotions or expanded responsibilities."
    },
    {
      question: "I need something that actually helps with my team, deadlines, and stress.",
      answer: "We prioritise applied frameworks — delegation, leverage, and influence — and concrete experiments you deploy with your team. The program reduces busywork while increasing visible impact."
    },
    {
      question: "I've read positive reviews... I'm not sure it can actually live up to the hype.",
      answer: "We emphasise measurable progress: before/after visibility metrics, sponsor agreements, and concrete promotion-ready deliverables that you can show leaders."
    },
    {
      question: "I won't be able to pay the attention it requires for 7 weeks.",
      answer: "The curriculum is intentionally bite-sized and prioritised. Each week focuses on 1–2 high-leverage practices that you can implement without major time investment."
    }
  ];

  const toggleFAQ = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 bg--white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1D1D1D] mb-2">
            Feeling some hesitation? It&apos;s natural.
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-[42px] font-bold text-[#0B64F4]">
            Your Questions Answered.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq: FAQItem, index: number) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-[#E5E7EB80] overflow-hidden transition-all hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-4"
                aria-expanded={openIndex === index}
              >
                <span className="font-bold text-[16px] text-sm sm:text-base md:text-[16px] pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;