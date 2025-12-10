"use client";

import React, { useRef, useState, useEffect } from "react";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    question: "I'm very senior and experienced, so I don’t think this will really help me.",
    answer:
      "Our program is built for experienced professionals too. We focus on practical, level-specific levers — positioning, stakeholder alignment, and measurable influence — that senior leaders use to accelerate promotion decisions.",
  },
  {
    id: 2,
    question: "I don’t think promotion skills can be taught or learnt.",
    answer:
      "Promotion-readiness is a set of repeatable behaviours and signals. We teach what to do, how to communicate it, and how to measure it — so behaviours become habits and outcomes become visible to leaders.",
  },
  {
    id: 3,
    question: "I’m sure the program is great, but I don’t know if anyone can apply it in real day-to-day work.",
    answer:
      "Every module is designed as a short, actionable practice that you can apply during regular work. Participants get templates, 1:1 coaching prompts and real-time feedback loops to integrate learnings immediately.",
  },
  {
    id: 4,
    question: "I’m not sure if this course will be worth the fees being charged.",
    answer:
      "We focus on ROI: better role matches, faster promotions, and clear visibility. Many participants recoup the investment within months through promotions or expanded responsibilities.",
  },
  {
    id: 5,
    question: "I know this course is hugely valuable, but I’m going to wait until later this year / next year / the perfect time.",
    answer:
      "There’s never a perfect time — but putting off the systems that make promotability consistent delays outcomes. Small weekly practices compound quickly; starting sooner gives you better positioning when opportunities arise.",
  },
  {
    id: 6,
    question: "I don’t want something theoretical. I need something that actually helps with my team, deadlines, and stress.",
    answer:
      "We prioritise applied frameworks — delegation, leverage, and influence — and concrete experiments you deploy with your team. The program reduces busywork while increasing visible impact.",
  },
  {
    id: 7,
    question: "I’ve read positive reviews… I’m not sure it can actually live up to the hype.",
    answer:
      "We emphasise measurable progress: before/after visibility metrics, sponsor agreements, and concrete promotion-ready deliverables that you can show leaders.",
  },
  {
    id: 8,
    question: "My work situation is very specific. I’m not sure a general program can solve the problems I deal with.",
    answer:
      "The program includes modular coaching and peer-exchange sessions so you can apply ideas to your context. Many participants find custom approaches faster than generic advice because they map the framework to real constraints.",
  },
  {
    id: 9,
    question: "I already have podcasts, books, and videos I barely get time for. Will this just become another thing I buy and forget?",
    answer:
      "This is not just content — it’s a structured practice and accountability system with small weekly experiments and follow-ups. Built-in accountability helps make changes stick.",
  },
  {
    id: 10,
    question: "I won’t be able to pay the attention it requires for 7 weeks.",
    answer:
      "The curriculum is intentionally bite-sized and prioritised. Each week focuses on 1–2 high-leverage practices that you can implement without major time investment.",
  },
];

const IconPlus: React.FC<{ open?: boolean }> = ({ open = false }) => (
  <svg
    className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-45" : "rotate-0"}`}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <path d="M12 5v14" stroke="#0E4AA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 12h14" stroke="#0E4AA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FaqRow: React.FC<{
  item: FaqItem;
  isOpen: boolean;
  onToggle: (id: number) => void;
}> = ({ item, isOpen, onToggle }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<string>("0px");

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="bg-white">
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            id={`faq-btn-${item.id}`}
            aria-controls={`faq-panel-${item.id}`}
            aria-expanded={isOpen}
            onClick={() => onToggle(item.id)}
            className="w-full text-left px-4 sm:px-6 py-6 flex items-start gap-4 focus:outline-none focus:ring-2 focus:ring-[#cfe0ff]"
          >
            <span className="flex-1 text-sm sm:text-[17px] text-[#1D1D1D] font-gotham font-normal">
              {item.question}
            </span>
            <span className="ml-4 flex-shrink-0 flex items-center">
              <IconPlus open={isOpen} />
            </span>
          </button>
        </div>

        <div
          id={`faq-panel-${item.id}`}
          role="region"
          aria-labelledby={`faq-btn-${item.id}`}
          className="px-4 sm:px-6 overflow-hidden transition-all duration-300"
          style={{ maxHeight }}
        >
          <div ref={contentRef} className="py-4">
            <p className="text-sm sm:text-[17px] text-[#1D1D1D] font-gotham font-normal leading-relaxed">{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-gotham font-normal text-[#1D1D1D] leading-tight">
            Feeling some hesitation? It’s natural.
            <span className="block text-[#174BAA] font-bold mt-2 text-3xl sm:text-4xl lg:text-[42px]">Your Questions Answered.</span>
          </h2>
        </header>

        {/* Accordion list */}
        <div className="bg-white rounded-none shadow-none">
          {FAQ_DATA.map((item) => (
            <FaqRow key={item.id} item={item} isOpen={openId === item.id} onToggle={toggle} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <button
            className="inline-flex items-center gap-3 bg-[#014BAA] text-white px-6 py-3 rounded-[12px] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#cfe0ff] transition"
            onClick={() => console.log("Join waitlist clicked")}
          >
            <span className="font-medium text-[16px] font-gotham">Join the Waitlist</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;