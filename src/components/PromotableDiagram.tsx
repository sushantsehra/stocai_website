"use client";

import React from "react";
import tredingGraphIcon from "../assets/tredingGraphIcon.png";
import Image, { StaticImageData } from "next/image";

type Card = {
  id: string | number;
  title: string;
  subtitle?: string;
};

const CARDS: Card[] = [
  {
    id: 1,
    title: "Your identity becomes next-level ready",
    subtitle: "You already act, think, and lead like the role you want",
  },
  {
    id: 2,
    title: "Your network becomes advocacy-capable",
    subtitle: "You know how to build sponsors, not mere spectators",
  },
  {
    id: 3,
    title: "Your presence becomes leadership-coded",
    subtitle: "Visibility + voice that commands attention",
  },
  {
    id: 4,
    title: "Your work becomes stakeholder-relevant",
    subtitle: "‘What’s in it for me’ clarity that resonates",
  },
];

const FloatingCard: React.FC<{ card: Card; className?: string }> = ({ card, className = "" }) => (
  <div
    className={
      "max-w-[420px] min-w-[260px] md:max-w-[500px] md:min-w-[480px] bg-white rounded-xl shadow-[0_10px_30px_rgba(15,23,42,0.12)] p-4 sm:p-5 md:p-6 text-left " +
      className
    }
    role="group"
    aria-label={card.title}
  >
    <h4 className="text-[#014BAA] text-lg sm:text-[20px] font-normal font-gotham leading-snug">{card.title}</h4>
    {card.subtitle && <p className="mt-1 text-sm sm:text-base font-normal font-gotham text-[#000000]">{card.subtitle}</p>}
  </div>
);

const PromotableDiagram: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* keep the radial gradient as a soft backdrop (unchanged) */}
        <div
          className="absolute -right-10 top-0 h-48 w-48 md:h-72 md:w-72 lg:h-96 lg:w-96 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(35,86,179,0.18) 0%, rgba(35,86,179,0) 60%)",
          }}
        />
        <div className="absolute right-4 top-4 md:right-8 md:top-6 lg:right-24 lg:top-[-100px] rotate-90 pointer-events-none select-none">
          <Image
            src={tredingGraphIcon as StaticImageData}
            alt=""
            width={620}
            height={920}
            priority
            style={{ objectFit: "contain", filter: "drop-shadow(0 6px 18px rgba(15,23,42,0.06))" }}
            className="opacity-100"
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Heading */}
          <div className="md:col-span-6 lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl md:text-[40px] lg:text-[42px] leading-12 font-gotham font-bold text-[#0f1724]  absolute md:left-[0%] md:top-10 max-w-lg">
              <span className="text-[#014BAA]">Become promotable for life.</span>{" "}
              <span className="font-normal font-gotham text-[42px] block sm:inline text-[#161616]">
                A system to <span className="text-[#161616] font-bold">win your next promotion.</span>
              </span>
              <span className="block mt-2 text-[18px] md:text-[42px] font-normal text-[#161616] font-gotham">And the one after.</span>
            </h2>
          </div>

          {/* Right: Arrow + Floating cards */}
          <div className="md:col-span-6 lg:col-span-7 relative mt-12">
            {/* Container for arrow and cards */}
            <div className="relative w-full h-[420px] sm:h-[480px] md:h-[520px] lg:h-[560px]">

              {/* Small screens: stacked cards (flow layout) */}
              <div className="flex flex-col gap-4 md:hidden mt-4">
                {CARDS.map((c) => (
                  <FloatingCard key={c.id} card={c} />
                ))}
              </div>

              {/* Medium and up: absolutely positioned cards along arrow */}
              <div className="hidden md:block">
                {/* bottom-most card */}
                <div className="absolute left-0 md:left-[6%] lg:left-[-8%] top-[58%] md:top-[58%] lg:top-[82%] transform -translate-y-1/2">
                  <FloatingCard card={CARDS[0]} />
                </div>

                {/* 2nd card */}
                <div className="absolute left-[24%] md:left-[22%] lg:left-[4%] top-[44%] md:top-[44%] lg:top-[58%] transform -translate-y-1/2">
                  <FloatingCard card={CARDS[1]} />
                </div>

                {/* 3rd card */}
                <div className="absolute left-[40%] md:left-[40%] lg:left-[15%] top-[30%] md:top-[30%] lg:top-[35%] transform -translate-y-1/2">
                  <FloatingCard card={CARDS[2]} />
                </div>

                {/* top-most card, near arrow head */}
                <div className="absolute left-[58%] md:left-[56%] lg:left-[25%] top-[12%] md:top-[12%] lg:top-[12%] transform -translate-y-1/2">
                  <FloatingCard card={CARDS[3]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotableDiagram;