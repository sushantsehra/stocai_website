import React from "react";

type Card = {
  id: string | number;
  crossed: string;
  title: string;
};

const DEFAULT_CARDS: Card[] = [
  { id: 1, crossed: "The hardest worker gets promoted", title: "Effort earns respect, not elevation." },
  { id: 2, crossed: "Promotions are a reward for past work", title: "Promotion is a bet on future impact" },
  { id: 3, crossed: "Being irreplaceable helps", title: "Hoarding tasks limits your growth" },
  { id: 4, crossed: "Longer hours prove worth", title: "It signals inefficiency, not dedication" },
];

const PromotionMyths: React.FC<{ cards?: Card[] }> = ({ cards = DEFAULT_CARDS }) => {
  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="mb-10 lg:mb-14">
          <h2 className="font-gotham font-normal text-2xl sm:text-3xl lg:text-[42px] text-[#1D1D1D]">
            The wrong approach stalls your promotion.
          </h2>
          <h3 className="font-gotham font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#014BAA] leading-tight">
            But don’t worry, you can fix it.
          </h3>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((c) => (
            <article
              key={c.id}
              className="bg-white  rounded-[11px] shadow-xl border border-transparent hover:border-black/5 transition-all duration-200 p-6 sm:p-8 flex flex-col justify-center"
            >
              <div className="text-sm text-black font-gotham font-normal line-through mb-2 break-words">{c.crossed}</div>
              <h4 className="mt-1 text-xl sm:text-2xl font-gotham font-normal text-[#014BAA] leading-snug">{c.title}</h4>
            </article>
          ))}
        </div>

        {/* optional: small footnote or CTA */}
        <div className="mt-10 text-sm text-gray-500">&nbsp;</div>
      </div>
    </section>
  );
};

export default PromotionMyths;
