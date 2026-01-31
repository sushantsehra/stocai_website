"use client";

import Image from "next/image";
import React from "react";
import aspero from "../assets/aspero.png";
import waveBg from "../assets/waveBg.jpg";

const CareerStalledSection: React.FC = () => {
  return (
    <section className="bg-white py-10 lg:pt-22 lg:pb-40 text-center relative overflow-hidden">
      {/* Wave background */}
      <div className="absolute inset-x-0 bottom-0 w-full h-[750px] z-0">
        <Image
          src={waveBg}
          alt="Wave Background"
          fill
          className="object-contain object-left opacity-100"
          priority
        />
      </div>

      {/* Background watermark text - hidden on mobile */}
      <div className="hidden sm:block absolute inset-0 opacity-100 pointer-events-none z-10">
        <div className="absolute top-[44%] left-[30.5%] md:top-[35%] md:left-[6.5%] text-4xl sm:text-5xl md:text-6xl lg:text-[48px] font-jakarta font-bold text-gray-300">
          Bell Curve
        </div>
        <div className="absolute top-[50%] right-[55%] md:top-[41%] md:right-[51%] text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-jakarta font-bold text-gray-300">
          360 Degree
          <br />
          Feedback
        </div>
        <div className="absolute bottom-[40%] right-[15%] md:bottom-[65%] md:right-[10%] text-4xl sm:text-5xl md:text-6xl lg:text-[48px] font-jakarta font-bold text-gray-300">
          KPI
        </div>
        <div className="absolute bottom-[30%] right-[5%] md:bottom-[55%] md:right-[5%] text-4xl sm:text-5xl md:text-6xl lg:text-[48px] font-jakarta font-bold text-gray-300">
          KRA
        </div>
      </div>

      <div className="block sm:hidden absolute inset-0 opacity-100 pointer-events-none z-10">
        <div className="absolute top-[25%] left-[2%] text-2xl font-jakarta font-bold text-gray-300">
          Bell Curve
        </div>
        <div className="absolute top-[32%] left-[1%] text-2xl lg:text-[48px] font-jakarta font-bold text-gray-300">
          360 Degree
          <br />
          Feedback
        </div>
        <div className="absolute top-[35%] right-[5%] text-2xl font-jakarta font-bold text-gray-300">
          KPI
        </div>
        <div className="absolute top-[25%] right-[5%] text-2xl font-jakarta font-bold text-gray-300">
          KRA
        </div>
      </div>

      {/* Main container with max-width to prevent stretching */}
      <div className="max-w-[1920px] mx-auto relative z-20">
        {/* Heading */}
        <div className="px-2 sm:px-4">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-[#0B64F4] text-[22px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-jakarta font-bold">
              You show up. You deliver.
            </span>
          </h2>
          <h3 className="text-[22px] sm:text-[32px] md:text-[40px] lg:text-[48px] leading-tight font-bold text-[#0F1729] font-jakarta mb-0 sm:mt-1.5">
            People trust you to get things done.
          </h3>
          <p className="text-[#6B7280] leading-5 md:mb-10 mt-4 md:mt-8 text-base sm:text-lg lg:text-[26px] font-jakarta font-semibold">
            So why does it feel like your career has... stalled?
          </p>
        </div>

        {/* Shredder Visual Section */}
        <div className="relative max-w-full mx-auto px-4 sm:px-8 lg:px-0">
          {/* MOBILE/TABLET LAYOUT (below lg) */}
          <div className="lg:hidden">
            {/* "You hear things like:" text */}
            <div className="relative z-20 mt-4 mb-2">
              <p className="text-[#6B7280] text-[13px] sm:text-lg md:text-xl font-jakarta font-medium text-center translate-y-[105px] translate-x-[15px] rotate-[3deg]">
                You hear things like:
              </p>
            </div>

            {/* Shredder Image - INCREASED SIZE */}
            <div className="relative w-full max-w-[900px] mx-auto mb-0 translate-x-[50px] sm:translate-x-0">
              <Image
                src={aspero}
                alt="Shredder Visual"
                width={1000}
                height={1050}
                className="object-contain w-full h-auto"
                priority
              />
            </div>

            {/* Text Content Below Shredder - REDUCED SPACING */}
            <div className="flex flex-row gap-5 max-w-[600px] mx-auto mb-3">
              {/* Left Text */}
              <div className="text-left space-y-1.5">
                <p className="font-normal leading-6 text-[16px] sm:text-lg font-jakarta text-[#6B7280]">
                  Your manager says you&apos;re &quot;doing great.&quot;
                </p>
                <p className="font-normal leading-6 text-[16px] sm:text-lg font-jakarta text-[#6B7280]">
                  Then someone else gets the promotion.
                </p>
              </div>

              {/* Right Text */}
              <div className="text-left space-y-1.5">
                <p className="font-normal leading-6 text-[16px] sm:text-lg font-jakarta text-[#6B7280]">
                  You&apos;re dependable,{" "}
                  <span className="text-[#0B64F4] font-semibold font-jakarta">
                    but invisible
                  </span>
                  .
                </p>
                <p className="font-normal leading-6 text-[16px] sm:text-lg font-jakarta text-[#6B7280]">
                  Valued,{" "}
                  <span className="text-[#0B64F4] font-semibold font-jakarta">
                    but not chosen
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center max-w-[600px] mx-auto">
              <p className="font-bold text-[#0F1729] leading-6 sm:leading-7 text-lg sm:text-xl font-jakarta">
                But no one tells you what to actually do differently. And you wonder...
              </p>
            </div>
          </div>

          {/* DESKTOP LAYOUT (lg and above) - YOUR ORIGINAL LAYOUT */}
          <div className="hidden lg:block">
            <div className="relative z-20 flex flex-row justify-between items-center gap-4 py-2 max-h-[800px]">
              {/* Text Content */}
              <div className="flex flex-col space-y-4 w-[40%] text-left translate-y-[40%] translate-x-[15%]">
                <p className="font-semibold leading-7 text-[24px] font-jakarta text-[#6B7280]">
                  Your manager says you&apos;re &quot;doing great.&quot;
                  <br />
                  Then someone else gets the promotion.
                </p>

                <p className="font-normal leading-7 font-jakarta text-[30px] text-[#6B7280] mt-[4%]">
                  You&apos;re dependable,{" "}
                  <span className="text-[#0B64F4] font-semibold font-jakarta">
                    but invisible
                  </span>
                  .<br />
                  Valued,{" "}
                  <span className="text-[#0B64F4] font-semibold font-jakarta">
                    but not chosen
                  </span>
                  .
                </p>
              </div>

              {/* Image */}
              <div className="w-[60%] flex justify-end translate-x-[5%]">
                <div className="relative w-full max-w-[900px]">
                  <p className="absolute top-[18%] left-[30%] rotate-4 text-[#6B7280] text-[24px] font-jakarta font-medium">
                    You hear things like:
                  </p>
                  <Image
                    src={aspero}
                    alt="Shredder Visual"
                    width={1000}
                    height={1050}
                    className="object-contain w-full h-[1100px]"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Description Text */}
            <div className="absolute bottom-[-7.5%] left-[23.5%] max-w-5xl mx-auto text-center text-[24px] font-semibold text-[#6B7280] z-20">
              <div className="pt-1 hidden sm:block">
                <p className="font-bold text-[#0F1729] leading-7 font-jakarta text-[32px]">
                  But no one tells you what to actually do differently.
                </p>
                <p className="font-bold text-[#0F1729] font-jakarta text-[32px]">
                  And you wonder...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerStalledSection;

// "use client";

// import Image from "next/image";
// import React from "react";
// import aspero from "../assets/aspero.png";
// import waveBg from "../assets/waveBg.jpg";

// const CareerStalledSection: React.FC = () => {
//   return (
//     <section className="bg-white py-10 lg:pt-22 lg:pb-40 text-center relative overflow-hidden">
//       {/* Wave background */}
//       <div className="absolute inset-x-0 bottom-0 w-full h-[750px] z-0">
//         <Image
//           src={waveBg}
//           alt="Wave Background"
//           fill
//           className="object-contain object-left opacity-100"
//           priority
//         />
//       </div>

//       {/* Background watermark text - hidden on mobile */}
//       <div className="block absolute inset-0 opacity-100 pointer-events-none z-10">
//         <div className="absolute top-[44%] left-[30.5%] md:top-[35%] md:left-[6.5%] text-4xl sm:text-5xl md:text-6xl lg:text-[48px] font-jakarta font-bold text-gray-300">
//           Bell Curve
//         </div>
//         <div className="absolute top-[50%] right-[55%] md:top-[41%] md:right-[51%] text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-jakarta font-bold text-gray-300">
//           360 Degree
//           <br />
//           Feedback
//         </div>
//         <div className="absolute bottom-[40%] right-[5%] md:bottom-[55%] md:right-[5%] text-4xl sm:text-5xl md:text-6xl lg:text-[48px] font-jakarta font-bold text-gray-300">
//           KPI
//         </div>
//       </div>

//       {/* Main container with max-width to prevent stretching */}
//       <div className="max-w-[1920px] mx-auto relative z-20">
//         {/* Heading */}
//         <div className="px-2 sm:px-4">
//           <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
//             <span className="text-[#0B64F4] text-[22px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-jakarta font-bold">
//               You show up. You deliver.
//             </span>
//           </h2>
//           <h3 className="text-[22px] sm:text-[32px] md:text-[40px] lg:text-[48px] leading-tight font-bold text-[#0F1729] font-jakarta mb-0 sm:mt-1.5">
//             People trust you to get things done.
//           </h3>
//           <p className="text-[#6B7280] leading-5 md:mb-10 mt-4 md:mt-8 text-base sm:text-lg lg:text-[26px] font-jakarta font-semibold">
//             So why does it feel like your career has... stalled?
//           </p>
//         </div>

//         {/* Shredder Visual Section */}
//         <div className="relative max-w-full mx-auto px-4 sm:px-8 lg:px-0">
//           {/* MOBILE/TABLET LAYOUT (below lg) */}
//           <div className="lg:hidden">
//             {/* "You hear things like:" text */}
//             <div className="relative z-20 mt-8 mb-4">
//               <p className="text-[#6B7280] text-base sm:text-lg md:text-xl font-jakarta font-medium text-right pr-8 sm:pr-16 md:pr-24">
//                 You hear things like:
//               </p>
//             </div>

//             {/* Shredder Image */}
//             <div className="relative w-full max-w-[700px] mx-auto mb-1">
//               <Image
//                 src={aspero}
//                 alt="Shredder Visual"
//                 width={1000}
//                 height={1050}
//                 className="object-contain w-full h-auto"
//                 priority
//               />
//             </div>

//             {/* Text Content Below Shredder */}
//             <div className="flex flex-row gap-5 max-w-[600px] mx-auto mb-5">
//               {/* Left Text */}
//               <div className="text-left space-y-1.5">
//                 <p className="font-normal leading-6 text-[16px] sm:text-lg font-jakarta text-[#6B7280]">
//                   Your manager says you&apos;re &quot;doing great.&quot;
//                 </p>
//                 <p className="font-normal leading-6 text-[16px] sm:text-lg font-jakarta text-[#6B7280]">
//                   Then someone else gets the promotion.
//                 </p>
//               </div>

//               {/* Right Text */}
//               <div className="text-left space-y-1.5">
//                 <p className="font-normal leading-6 text-[16px] sm:text-lg font-jakarta text-[#6B7280]">
//                   You&apos;re dependable,{" "}
//                   <span className="text-[#0B64F4] font-semibold font-jakarta">
//                     but invisible
//                   </span>
//                   .
//                 </p>
//                 <p className="font-normal leading-6 text-[16px] sm:text-lg font-jakarta text-[#6B7280]">
//                   Valued,{" "}
//                   <span className="text-[#0B64F4] font-semibold font-jakarta">
//                     but not chosen
//                   </span>
//                   .
//                 </p>
//               </div>
//             </div>

//             {/* Bottom Text */}
//             <div className="text-center max-w-[600px] mx-auto">
//               <p className="font-bold text-[#0F1729] leading-6 sm:leading-7 text-lg sm:text-xl font-jakarta">
//                 But no one tells you what to actually do differently. And you wonder...
//               </p>
//             </div>
//           </div>

//           {/* DESKTOP LAYOUT (lg and above) - YOUR ORIGINAL LAYOUT */}
//           <div className="hidden lg:block">
//             <div className="relative z-20 flex flex-row justify-between items-center gap-4 py-2 max-h-[800px]">
//               {/* Text Content */}
//               <div className="flex flex-col space-y-4 w-[40%] text-left translate-y-[40%] translate-x-[15%]">
//                 <p className="font-semibold leading-7 text-[24px] font-jakarta text-[#6B7280]">
//                   Your manager says you&apos;re &quot;doing great.&quot;
//                   <br />
//                   Then someone else gets the promotion.
//                 </p>

//                 <p className="font-normal leading-7 font-jakarta text-[30px] text-[#6B7280] mt-[4%]">
//                   You&apos;re dependable,{" "}
//                   <span className="text-[#0B64F4] font-semibold font-jakarta">
//                     but invisible
//                   </span>
//                   .<br />
//                   Valued,{" "}
//                   <span className="text-[#0B64F4] font-semibold font-jakarta">
//                     but not chosen
//                   </span>
//                   .
//                 </p>
//               </div>

//               {/* Image */}
//               <div className="w-[60%] flex justify-end translate-x-[5%]">
//                 <div className="relative w-full max-w-[900px]">
//                   <p className="absolute top-[18%] left-[30%] rotate-4 text-[#6B7280] text-[24px] font-jakarta font-medium">
//                     You hear things like:
//                   </p>
//                   <Image
//                     src={aspero}
//                     alt="Shredder Visual"
//                     width={1000}
//                     height={1050}
//                     className="object-contain w-full h-[1100px]"
//                     priority
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Description Text */}
//             <div className="absolute bottom-[-7.5%] left-[23.5%] max-w-5xl mx-auto text-center text-[24px] font-semibold text-[#6B7280] z-20">
//               <div className="pt-1 hidden sm:block">
//                 <p className="font-bold text-[#0F1729] leading-7 font-jakarta text-[32px]">
//                   But no one tells you what to actually do differently.
//                 </p>
//                 <p className="font-bold text-[#0F1729] font-jakarta text-[32px]">
//                   And you wonder...
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CareerStalledSection;