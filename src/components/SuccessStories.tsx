"use client";

import React from "react";
import successStoriesImage1 from "../assets/successStoriesImage1.jpg";
import successStoriesImage2 from "../assets/successStoriesImage2.png";
import successStoriesImage3 from "../assets/successStoriesImage3.jpg";
import Image, { StaticImageData } from "next/image";

type Testimonial = {
  id: string | number;
  name: string;
  role: string;
  before: string;
  after: string;
  image: StaticImageData;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Eleena R.",
    role: "Tech Lead → Project Manager",
    before: "I delivered results, but no one beyond my team noticed.",
    after:
      "Better Corporate Life taught me how to share wins confidently. Now leaders know (and value) my work.",
    image: successStoriesImage1,
  },
  {
    id: 2,
    name: "M. Hussain",
    role: "Marketing Manager → AVP Marketing",
    before: "I said 'yes' to everything to get noticed, but always ended up exhausted.",
    after:
      "I learned to prioritize and delegate. I work less, deliver more, and the impact of my work got noticed.",
    image: successStoriesImage2,
  },
  {
    id: 3,
    name: "Venkatraman A.",
    role: "Jr Data Scientist → Lead Researcher",
    before:
      "I relied only on facts...spoke only of projects, so people found me distant.",
    after:
      "I added empathy to logic. Now, people connect with my ideas + numbers. Coach helped in practicing.",
    image: successStoriesImage3,
  },
];

const StarRow: React.FC = () => (
  <div className="mt-2 flex items-center justify-center gap-1" aria-hidden>
    {Array.from({ length: 4 }).map((_, i) => (
      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#F6B02D]">
        <path
          d="M12 17.25l-5.147 3.403 1.56-6.016L3.5 9.847l6.245-.54L12 3.5l2.255 5.807 6.245.54-4.913 4.791 1.56 6.016L12 17.25z"
          fill="#F6B02D"
        />
      </svg>
    ))}
  </div>
);

const TestimonialCard: React.FC<{ t: Testimonial }> = ({ t }) => {
  return (
    <article
      className="flex flex-col rounded-[10px] bg-white shadow-xl overflow-hidden"
      role="article"
      aria-labelledby={`tn-${t.id}-name`}
    >
      {/* Replaced placeholder with actual next/image */}
      <div className="h-60 sm:h-48 md:h-72 relative">
        <Image
          src={t.image}
          alt={t.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
        />
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col min-h-[320px]">
        <div className="mb-2">
          <h4 id={`tn-${t.id}-name`} className="text-base sm:text-lg md:text-[16px] font-normal font-gotham text-[#161616]">
            {t.name}
          </h4>
          <p className="text-xs sm:text-sm md:text-[13px] font-gotham font-normal text-[#8B8B8B] mt-1">
            {t.role}
          </p>
        </div>

        <div className="mt-1 text-sm sm:text-[14px] text-[#0f1724] flex-1">
          <p className="font-bold font-gotham text-[16px] text-[#014BAA] mb-1">Before</p>
          <p className="text-black font-normal font-gotham text-[16px] mb-4">{t.before}</p>

          <p className="font-bold font-gotham text-[16px] text-[#014BAA] mb-1">After</p>
          <p className="text-black font-normal font-gotham text-[16px]">{t.after}</p>
        </div>
      </div>
    </article>
  );
};

const SuccessStories: React.FC<{ testimonials?: Testimonial[] }> = ({
  testimonials = DEFAULT_TESTIMONIALS,
}) => {
  return (
    <section className="relative w-full bg-[#F0F0F0] py-10 sm:py-14 lg:py-20">
      <div className="mx-4 sm:mx-6 lg:mx-12 rounded-xl bg-[#F0F0F0] p-6 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-gotham font-normal text-[#014BAA]">
              Success <span className="font-bold text-[#014BAA]">Stories</span>
            </h2>

            <StarRow />

            <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="inline-block rounded-[4px] bg-[#014BAA] text-white text-xs sm:text-sm md:text-[19px] px-3 py-1 font-bold font-gotham text-[#F8F3F0]">
                87%
              </span>
              <p className="text-sm sm:text-base md:text-[19px] font-gotham font-normal text-[#4D4D4D]">
                of our beta graduates get promoted within 12 months
              </p>
            </div>
          </header>

          <div className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-14 flex justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-[12px] bg-[#014BAA] text-white px-6 py-3 text-sm sm:text-base md:text-[16px] font-normal shadow-md hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-[#174BAA]/50"
            >
              Get Early Access
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs md:text-[12px] text-[#8B8B8B] font-gotham font-normal max-w-3xl mx-auto">
              The names and photos have been changed to protect privacy. Testimonials represent program outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;