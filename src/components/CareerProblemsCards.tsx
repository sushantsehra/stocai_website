import React from "react";
import Image, { StaticImageData } from "next/image";

import TheExhaustionTrap from "../assets/TheExhaustionTrap.png";
import TheInvisibleExpert from "../assets/TheInvisibleExpert.png";
import TheConfidenceGap from "../assets/TheConfidenceGap.png";
import TheNetworkGap from "../assets/TheNetworkGap.png";

export type ProblemCard = {
  id: string | number;
  title: string;
  description: string;
  img?: string;
};

const DEFAULT_CARDS: ProblemCard[] = [
  {
    id: 1,
    title: "The Exhaustion Trap",
    description:
      "You’re burnt out. The scope of work keeps expanding, but your influence keeps shrinking. You feel working more = rising more.",
    img: TheExhaustionTrap.src,
  },
  {
    id: 2,
    title: "The Invisible Expert",
    description:
      "Your work is strong, but leadership doesn’t connect it to business outcomes. Approached for execution, not promotion.",
    img: TheInvisibleExpert.src,
  },
  {
    id: 3,
    title: "The Confidence Gap",
    description:
      "In high-stakes rooms, your voice shrinks. Imposter syndrome makes the presence slip to louder people.",
    img: TheConfidenceGap.src,
  },
  {
    id: 4,
    title: "The Network Gap",
    description:
      "You have peers, not advocates. Few senior leaders can speak to your wins, so your name doesn’t surface when roles open.",
    img: TheNetworkGap.src,
  },
];

const CardImagePlaceholder: React.FC<{ src?: string; alt?: string }> = ({
  src,
  alt = "placeholder",
}) => {
  return (
    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative">
      <Image
        src={src || ""}
        alt={alt}
        fill
        className="object-contain"
        sizes="120px"
      />
    </div>
  );
};

const ProblemCardView: React.FC<{ card: ProblemCard }> = ({ card }) => {
  return (
    <article className="bg-white rounded-xl shadow-lg border border-transparent hover:border-black/5 transition-all duration-200 p-6 sm:p-8 flex flex-col items-center min-h-[340px]">
      <div className="-mt-6 mb-4">
        <div className="bg-white rounded-full p-2 -translate-y-2 flex items-center justify-center">
          <CardImagePlaceholder src={card.img} alt={card.title} />
        </div>
      </div>

      <h3 className="text-lg sm:text-xl md:text-[20px] font-bold font-gotham text-[#014BAA]">
        {card.title}
      </h3>

      <p className="mt-1 text-sm sm:text-[14px] font-gotham font-normal text-[#1D1D1D] leading-relaxed">
        {card.description}
      </p>
    </article>
  );
};

const CareerProblemsCards: React.FC<{ cards?: ProblemCard[] }> = ({
  cards = DEFAULT_CARDS,
}) => {
  return (
    <section className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 lg:mb-14">
          <h2 className="font-gotham font-normal text-2xl sm:text-3xl lg:text-[42px] text-[#1D1D1D]">
            If this sounds like your story,
          </h2>
          <h3 className="font-gotham font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#014BAA] leading-tight">
            you’re at the right place. Let’s fix it.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((c) => (
            <div key={c.id} className="h-auto lg:h-[380px]">
              <ProblemCardView card={c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerProblemsCards;

// import React from "react";
// import TheExhaustionTrap from "../assets/TheExhaustionTrap.png";
// import TheInvisibleExpert from "../assets/TheInvisibleExpert.png";
// import TheConfidenceGap from "../assets/TheConfidenceGap.png";
// import TheNetworkGap from "../assets/TheNetworkGap.png";

// export type ProblemCard = {
//   id: string | number;
//   title: string;
//   description: string;
//   img?: string;
// };

// const DEFAULT_CARDS: ProblemCard[] = [
//   {
//     id: 1,
//     title: "The Exhaustion Trap",
//     description:
//       "You’re burnt out. The scope of work keeps expanding, but your influence keeps shrinking. You feel working more = rising more.",
//     img: TheExhaustionTrap.src,
//   },
//   {
//     id: 2,
//     title: "The Invisible Expert",
//     description:
//       "Your work is strong, but leadership doesn’t connect it to business outcomes. Approached for execution, not promotion.",
//     img: TheInvisibleExpert.src,
//   },
//   {
//     id: 3,
//     title: "The Confidence Gap",
//     description:
//       "In high-stakes rooms, your voice shrinks. Imposter syndrome makes the presence slip to louder people.",
//     img: TheConfidenceGap.src,
//   },
//   {
//     id: 4,
//     title: "The Network Gap",
//     description:
//       "You have peers, not advocates. Few senior leaders can speak to your wins, so your name doesn’t surface when roles open.",
//     img: TheNetworkGap.src,
//   },
// ];

// const CardImagePlaceholder: React.FC<{ src?: string; alt?: string }> = ({ src, alt = "placeholder" }) => {
//   return (
//     <img
//       src={src}
//       alt={alt}
//       className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
//     />
//   );
// };

// const ProblemCardView: React.FC<{ card: ProblemCard }> = ({ card }) => {
//   return (
//     <article className="bg-white rounded-xl shadow-lg border border-transparent hover:border-black/5 transition-all duration-200 p-6 sm:p-8 flex flex-col items-center min-h-[340px]">
//       <div className="-mt-6 mb-4">
//         <div className="bg-white rounded-full p-2 -translate-y-2 flex items-center justify-center">
//           <CardImagePlaceholder src={card.img} alt={card.title} />
//         </div>
//       </div>

//       <h3 className="text-lg sm:text-xl md:text-[20px] font-bold font-gotham text-[#014BAA]">{card.title}</h3>

//       <p className="mt-1 text-sm sm:text-[14px] font-gotham font-normal text-[#1D1D1D] leading-relaxed">{card.description}</p>
//     </article>
//   );
// };

// const CareerProblemsCards: React.FC<{ cards?: ProblemCard[] }> = ({ cards = DEFAULT_CARDS }) => {
//   return (
//     <section className="w-full bg-white py-12 lg:py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-10 lg:mb-14">
//           <h2 className="font-gotham font-normal text-2xl sm:text-3xl lg:text-[42px] text-[#1D1D1D]">
//             If this sounds like your story,
//           </h2>
//           <h3 className="font-gotham font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#014BAA] leading-tight">
//             you’re at the right place. Let’s fix it.
//           </h3>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//           {cards.map((c) => (
//             <div key={c.id} className="h-auto lg:h-[380px]">
//               <ProblemCardView card={c} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CareerProblemsCards;