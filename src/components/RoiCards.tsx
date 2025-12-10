"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

type RoiCardsProps = {
  price?: string;
  originalPrice?: string;
  priceNote?: string;
  leftBadge?: string;
  rightCopy?: string;
  rightBadge?: string;
  headline?: React.ReactNode;
  subcopy?: string;
  leftImage?: StaticImageData | string;
  rightImage?: StaticImageData | string;
};

const CornerBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white text-xs font-medium text-[#11459a] shadow-sm border border-white/70 whitespace-nowrap">
    {children}
  </span>
);

const RoiCards: React.FC<RoiCardsProps> = ({
  price = "₹13,850",
  originalPrice = "₹25,000",
  priceNote = "to become promotion-ready",
  leftBadge = "Promotional Offer",
  rightCopy = "The subsequent compounding impact of the level-up over next 12–24 months",
  rightBadge = "Immeasurable Benefits",
  headline = (
    <>
      <span className="text-[#174BAA] font-extrabold">Your ROI.</span>{" "}
      <span className="text-gray-900">In plain numbers.</span>
    </>
  ),
  subcopy = 'Skip the ₹60k–₹3L "leadership workshops" that don\'t change behavior. This is an operating system, not a lecture.',
  leftImage,
  rightImage,
}) => {
  return (
    <section className="w-full py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* radial glow behind center card */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div
              style={{
                width: "900px",
                height: "520px",
                filter: "blur(80px)",
                background:
                  "radial-gradient(closest-side, rgba(17,75,170,0.18), rgba(17,75,170,0.06) 40%, rgba(255,255,255,0))",
                transform: "translateY(-10px)",
              }}
              className="hidden lg:block rounded-full"
            />
          </div>

          {/* stacking canvas */}
          <div className="relative z-0 min-h-[360px] lg:min-h-[420px]">
            {/* Left blue card - absolutely positioned behind center */}
            <div className="hidden lg:block absolute left-6 top-8 w-[320px]">
              <div className="relative overflow-visible">
                <div className="bg-[#174BAA] text-white rounded-2xl shadow-lg px-8 py-8 w-full min-h-[220px]">
                  {/* top-left original price */}
                  <div className="text-sm opacity-90 line-through">{originalPrice}</div>

                  <div className="mt-6">
                    <div className="text-5xl font-extrabold leading-tight tracking-tight">{
                      // keep comma formatting; split for visual parity if needed
                      price
                    }</div>
                    <div className="mt-3 text-sm opacity-90">{priceNote}</div>
                  </div>

                  {leftImage ? (
                    <div className="mt-4">
                      <Image src={leftImage} alt="" width={96} height={48} className="object-contain" />
                    </div>
                  ) : null}
                </div>

                {/* absolute badge - top-right corner of the left card */}
                <div className="absolute -top-3 -right-3">
                  <CornerBadge>{leftBadge}</CornerBadge>
                </div>
              </div>
            </div>

            {/* Right blue card - absolutely positioned behind center */}
            <div className="hidden lg:block absolute right-6 top-12 w-[360px]">
              <div className="relative overflow-visible">
                <div className="bg-[#174BAA] text-white rounded-2xl shadow-lg px-6 py-8 w-full min-h-[220px]">
                  <div className="mt-2 text-sm sm:text-base leading-relaxed">
                    {rightCopy}
                  </div>

                  {rightImage ? (
                    <div className="mt-4">
                      <Image src={rightImage} alt="" width={96} height={48} className="object-contain" />
                    </div>
                  ) : null}
                </div>

                {/* absolute badge - top-left corner inside this right card */}
                <div className="absolute -top-3 -left-3">
                  <CornerBadge>{rightBadge}</CornerBadge>
                </div>
              </div>
            </div>

            {/* MOBILE / SMALL: stack cards vertically in order: left -> center -> right */}
            <div className="lg:hidden flex flex-col gap-6 items-center">
              {/* small left card for mobile */}
              <div className="bg-[#174BAA] text-white rounded-2xl shadow-lg px-6 py-6 w-[90%]">
                <div className="flex justify-between items-start">
                  <div className="text-sm opacity-90 line-through">{originalPrice}</div>
                  <div className="ml-2">
                    <CornerBadge>{leftBadge}</CornerBadge>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-4xl font-extrabold">{price}</div>
                  <div className="mt-2 text-sm opacity-90">{priceNote}</div>
                </div>
              </div>
            </div>

            {/* Center white card - topmost and centered */}
            <div className="relative z-40 mx-auto mt-0 lg:mt-0 max-w-[760px] w-full">
              <div className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(9,30,66,0.08)] px-6 sm:px-10 md:px-12 py-6 sm:py-8 md:py-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                  {headline}
                </h3>
                <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-3xl">
                  {subcopy}
                </p>
              </div>
            </div>

            {/* Desktop-only small spacer block to ensure center overlaps and sidecards peek */}
            <div className="hidden lg:block">
              {/* This invisible block ensures the container height accommodates absolute side cards */}
              <div className="h-[1px] mt-10" />
            </div>

            {/* Desktop fallback: small right/left cards for mobile are above/below; we already rendered left mobile card above */}
            <div className="lg:hidden flex flex-col gap-6 items-center mt-4">
              <div className="bg-[#174BAA] text-white rounded-2xl shadow-lg px-6 py-6 w-[90%]">
                <div className="flex justify-end">
                  <CornerBadge>{rightBadge}</CornerBadge>
                </div>
                <div className="mt-2 text-sm leading-relaxed">{rightCopy}</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA under */}
        <div className="mt-12 flex justify-center">
          <button
            className="inline-flex items-center gap-3 bg-[#174BAA] text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#cfe0ff] transition"
            onClick={() => {
              /* wire up onClick handler */
            }}
          >
            <span className="font-medium">Join the Waitlist</span>
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

export default RoiCards;


// "use client";

// import React from "react";
// import Image, { StaticImageData } from "next/image";

// type RoiCardsProps = {
//   price?: string; // e.g. "₹13,850"
//   originalPrice?: string; // e.g. "₹25,000"
//   priceNote?: string; // small caption under price
//   leftBadge?: string; // small badge on left card
//   rightCopy?: string;
//   rightBadge?: string;
//   headline?: React.ReactNode;
//   subcopy?: string;
//   // optional small images for cards (not required)
//   leftImage?: StaticImageData | string;
//   rightImage?: StaticImageData | string;
// };

// const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <span className="inline-block px-3 py-1 rounded-md bg-white text-xs font-medium text-[#11459a] border border-white/60 shadow-sm">
//     {children}
//   </span>
// );

// const RoiCards: React.FC<RoiCardsProps> = ({
//   price = "₹13,850",
//   originalPrice = "₹25,000",
//   priceNote = "to become promotion-ready",
//   leftBadge = "Promotional Offer",
//   rightCopy = "The subsequent compounding impact of the level-up over next 12–24 months",
//   rightBadge = "Immeasurable Benefits",
//   headline = (
//     <>
//       <span className="text-[#174BAA] font-extrabold">Your ROI.</span>{" "}
//       <span className="text-gray-900">In plain numbers.</span>
//     </>
//   ),
//   subcopy = "Skip the ₹60k–₹3L \"leadership workshops\" that don't change behavior. This is an operating system, not a lecture.",
//   leftImage,
//   rightImage,
// }) => {
//   return (
//     <section className="w-full py-12 lg:py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Center headline card sits above the glow */}
//         <div className="relative">
//           {/* radial glow */}
//           <div
//             aria-hidden
//             className="pointer-events-none absolute inset-0 flex items-center justify-center"
//           >
//             <div
//               style={{
//                 width: "760px",
//                 height: "520px",
//                 filter: "blur(70px)",
//                 background:
//                   "radial-gradient(closest-side, rgba(17,75,170,0.18), rgba(17,75,170,0.06) 40%, rgba(255,255,255,0))",
//                 transform: "translateY(-20px)",
//               }}
//               className="hidden lg:block rounded-full"
//             />
//           </div>

//           {/* stacking area */}
//           <div className="relative z-10 min-h-[320px] lg:min-h-[360px]">
//             <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
//               {/* Left (price) card - positioned left on lg */}
//               <div className="order-2 lg:order-1 lg:-translate-x-[120px] xl:-translate-x-[160px] z-0">
//                 <div className="bg-[#174BAA] text-white rounded-xl shadow-lg px-8 py-8 w-[300px] sm:w-[340px]">
//                   <div className="flex justify-between items-start">
//                     <div className="text-sm opacity-90 line-through">{originalPrice}</div>
//                     <div className="ml-2 hidden sm:block">
//                       <Badge>{leftBadge}</Badge>
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <div className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
//                       {price}
//                     </div>
//                     <div className="mt-2 text-sm opacity-90">{priceNote}</div>
//                   </div>

//                   {/* optional left image slot - small and subtle */}
//                   {leftImage ? (
//                     <div className="mt-4">
//                       <Image src={leftImage} alt="" width={80} height={40} className="object-contain" />
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               {/* Center (white) card */}
//               <div className="order-1 lg:order-2 z-20 w-full lg:w-[720px]">
//                 <div className="bg-white rounded-xl shadow-2xl px-8 py-8 md:px-12 md:py-10">
//                   <h3 className="text-2xl sm:text-3xl lg:text-3xl font-gotham font-extrabold text-gray-900">
//                     {headline}
//                   </h3>
//                   <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-3xl">
//                     {subcopy}
//                   </p>
//                 </div>
//               </div>

//               {/* Right (benefit) card - positioned right on lg */}
//               <div className="order-3 lg:-translate-x-[-120px] lg:translate-x-[120px] z-0">
//                 <div className="bg-[#174BAA] text-white rounded-xl shadow-lg px-6 py-6 w-[300px] sm:w-[360px]">
//                   <div className="flex justify-end mb-2">
//                     <Badge>{rightBadge}</Badge>
//                   </div>

//                   <div className="mt-4 text-sm sm:text-base leading-relaxed">
//                     {rightCopy}
//                   </div>

//                   {rightImage ? (
//                     <div className="mt-4">
//                       <Image src={rightImage} alt="" width={80} height={40} className="object-contain" />
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CTA under */}
//         <div className="mt-10 flex justify-center">
//           <button
//             className="inline-flex items-center gap-3 bg-[#174BAA] text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#cfe0ff] transition"
//             onClick={() => {
//               /* hook to onClick handler */
//             }}
//           >
//             <span className="font-medium">Join the Waitlist</span>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
//               <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//               <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RoiCards;