"use client";

import Image from "next/image";
import { Crown } from "lucide-react";
import accenture from "../assets/founderaccenture.png";
import founder from "../assets/founder.jpg";
import founderKing from "../assets/kcl.png";
import iimcwhitelogo from "../assets/iimcwhitelogo.png";  
import edelweisswhitelogo from "../assets/edelweisswhitelogo.png";  
import imtwhitelogo from "../assets/imtwhitelogo.png";  
import nvidiablacklogo from "../assets/nvidiablacklogo.png";
import citiblacklogo from "../assets/citiblacklogo.png";
import BuiltBy from "./BuiltBy";
import University_of_Texas_at_Austin_logo from "../assets/tx.png";

interface Stat {
  label: string;
  value: number;
}

const TrustSection = () => {
  const stats: Stat[] = [
    { label: "PROMOTION CYCLES OBSERVED", value: 125 },
    { label: "PROMOTIONS INFLUENCED", value: 25 },
    { label: "PITCHES REVIEWED", value: 200 },
    { label: "BOSSES SERVED", value: 61 },
  ];

  // const companies = [
  //   { name: "NVIDIA", logo: nvidiablacklogo },
  //   { name: "Accenture", logo: accenture },
  //   { name: "Citi", logo: citiblacklogo },
  //   { name: "IIMC", logo: iimcwhitelogo },
  //   { name: "Edelweiss", logo: edelweisswhitelogo },
  //   { name: "IMT", logo: imtwhitelogo },
  //   { name: "Texas", logo: University_of_Texas_at_Austin_logo},
  //   { name: "Kings", logo: founderKing},
  // ];

  return (
    <section className="py-8 bg-white font-jakarta">
      <div className="max-w-full relative z-50 pb-8">
        {/* Content with responsive margins */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          {/* REDUCED GAP: gap-6 md:gap-8 instead of gap-10 md:gap-16 */}
          <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-6 md:gap-8 items-start">

            {/* Left Section - Responsive */}
            <div className="pt-10 lg:pt-12">
              <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold leading-tight sm:leading-[48px] text-[#0F1729] mb-4 sm:mb-6">
                Who are we and{" "}
                <br />
                <span className="text-[#0B64F4]">why should you trust us?</span>
              </h2>
              
              <p className="text-[16px] sm:text-[18px] leading-[28px] font-normal text-[#000000] mb-2">
                We&apos;re not motivational speakers or LinkedIn influencers
                peddling platitudes..
                <br />
                And we&apos;re not here to sell you empty confidence.
              </p>
              
              <h3 className="text-[20px] sm:text-[24px] leading-[30px] font-bold text-[#000000] mb-2 mt-10">
                We&apos;ve been overlooked. We&apos;ve figured out why.
              </h3>
              
              <p className="text-[14px] sm:text-[16px] leading-[28px] font-normal text-[#000000] mb-2">
                And we&apos;ve learnt how to unblock career growth, without becoming
                someone we&apos;re
                <br />
                not. Now, we help capable professionals like you stop second-guessing
                themselves
                <br />
                and start moving forward with intent.
              </p>
              
              <p className="text-[14px] sm:text-[16px] leading-[28px] font-normal text-[#000000] mt-2 mb-2">
                Our team brings together expertise in{" "}
                <span className="text-[#0B64F4] font-bold">
                  psychology, neuroscience,
                  <br />
                  marketing, HR, business strategy, coaching, behavioural science, and
                  more.
                </span>
              </p>
              
              <p className="text-[20px] sm:text-[25px] leading-[24px] font-bold text-[#000000] mt-8 sm:mt-10 md:mt-16">
                We&apos;re rooting for you.
              </p>
            </div>

            {/* Right Section (Founder Card) - Responsive */}
            <div className="relative z-50 rounded-[20px] lg:rounded-[25px] my-10 lg:my-0 shadow-2xl border border-[#D5D5D5] overflow-hidden w-full lg:max-w-[400px] mx-auto md:mx-0 md:ml-auto transform rotate-[5.81deg] hover:rotate-0 transition-transform duration-500">

              {/* Top White Section - FIXED HEIGHT */}
              <div className="bg-white text-center relative z-10 h-[120px] sm:h-[146px] flex justify-center">
                <h3 className="font-montserrat mt-6 font-semibold text-[12px] sm:text-[14px] leading-[100%] tracking-[0.09em] text-black uppercase">
                  CORPORATE EXPERTS
                </h3>
              </div>

              {/* Overlapping Profile - ADJUSTED POSITION */}
              <div className="absolute top-[55px] sm:top-[72px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                <div className="relative">
                  <div className="relative w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden bg-gradient-to-b from-[#0B63F2] to-[#0F2479] shadow-lg p-1">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#0B63F2] to-[#0F2479]">
                      <Image
                        src={founder}
                        alt="Sushant Sehra"
                        fill
                        className="object-cover rounded-full p-1"
                        priority
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-2 sm:bottom-3.5 right-0 sm:right-0.5 bg-blue-500 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-3 sm:border-4 border-white shadow-md">
                    <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Bottom Black Section - Responsive */}
              <div className="bg-gradient-to-b from-slate-900 to-black text-white pt-20 sm:pt-24 pb-8 sm:pb-10 px-6 sm:px-10">
                {/* Name and Role */}
                <div className="text-center mb-6">
                  <h3 className="font-montserrat text-[18px] sm:text-[20px] leading-[100%] font-bold tracking-normal text-transparent bg-clip-text bg-[radial-gradient(114.18%_114.18%_at_50%_50%,#FFFFFF_0%,#717171_100%)]">
                    SUSHANT SEHRA
                  </h3>
                  <p className="font-montserrat text-[12px] sm:text-[14px] leading-[100%] font-normal tracking-normal text-white uppercase mt-1">
                    FOUNDER
                  </p>
                </div>

                {/* Stats Section */}
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-jakarta text-[10px] sm:text-[12px] leading-[145%] font-medium text-[#9F9F9F] uppercase">
                        {stat.label}
                      </span>

                      {/* And from values */}
                      <span className="font-jakarta text-[14px] sm:text-[16px] leading-[145%] text-white font-bold">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t-[0.82px] border-[#E3E3E3] mt-4 sm:mt-6 mb-2 sm:mb-6" />

                {/* Tagline */}
                <div className="text-center mb-2 sm:mb-4">
                  <p className="font-montserrat text-[12px] sm:text-[14px] leading-[120%] font-medium text-white uppercase">
                    Built by Top B-School
                    graduates and{" "}
                    <br />
                    <span className="font-montserrat mt-2 text-[12px] sm:text-[14px] leading-[120%] font-bold tracking-normal text-transparent bg-clip-text bg-[radial-gradient(94.28%_94.28%_at_50%_50%,#FFFFFF_0%,#0B64F4_100%)] uppercase">
                      Corporate Leaders
                    </span>
                  </p>
                </div>

                {/* Company Logos - Exact Figma sizes */}
                <div className="space-y-2 sm:space-y-4">
                  {/* Row 1: NVIDIA, Accenture, Citi */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-5 justify-items-center items-center">
                    <div className="flex items-center justify-center">
                      <Image
                        src={nvidiablacklogo}
                        alt="NVIDIA"
                        width={102}
                        height={400}
                        className="object-contain mt-3"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <Image
                        src={accenture}
                        alt="Accenture"
                        width={102}
                        height={26}
                        className="object-contain "
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <Image
                        src={citiblacklogo}
                        alt="Citi"
                        width={60}
                        height={10}
                        className="object-contain mt-1"
                      />
                    </div>
                  </div>

                  {/* Row 2: IIMC, Edelweiss, IMT */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-5 justify-items-center items-center">
                    <div className="flex items-center justify-center">
                      <Image
                        src={iimcwhitelogo}
                        alt="IIMC"
                        width={99}
                        height={28}
                        className="object-contain w-[99px] h-[28px]"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <Image
                        src={edelweisswhitelogo}
                        alt="Edelweiss"
                        width={89}
                        height={24}
                        className="object-contain w-[89px] h-[24px]"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <Image
                        src={imtwhitelogo}
                        alt="IMT"
                        width={102}
                        height={38}
                        className="object-contain w-[102px] h-[38px]"
                      />
                    </div>
                  </div>

                  {/* Row 3: Texas, Kings (CENTERED) */}
                  <div className="flex justify-center gap-5 items-center">
                    <div className="flex items-center justify-center">
                      <Image
                        src={University_of_Texas_at_Austin_logo}
                        alt="Texas"
                        width={97}
                        height={28}
                        className="object-contain -rotate-6"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <Image
                        src={founderKing}
                        alt="Kings"
                        width={50}
                        height={26}
                        className="object-contain -rotate-6"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Logo band - MOVED UP with reduced top spacing */}
        <div className="-mt-8">
          <BuiltBy />
        </div>
      </div>
    </section>
  );
};

export default TrustSection;


// "use client";

// import Image from "next/image";
// import { Crown } from "lucide-react";
// import accenture from "../assets/founderaccenture.png";
// import founder from "../assets/founder.jpg";
// import founderKing from "../assets/kcl.png";
// import iimcwhitelogo from "../assets/iimcwhitelogo.png";  
// import edelweisswhitelogo from "../assets/edelweisswhitelogo.png";  
// import imtwhitelogo from "../assets/imtwhitelogo.png";  
// import nvidiablacklogo from "../assets/nvidiablacklogo.png";
// import citiblacklogo from "../assets/citiblacklogo.png";
// import BuiltBy from "./BuiltBy";
// import University_of_Texas_at_Austin_logo from "../assets/tx.png";

// interface Stat {
//   label: string;
//   value: number;
// }

// const TrustSection = () => {
//   const stats: Stat[] = [
//     { label: "PROMOTION CYCLES OBSERVED", value: 125 },
//     { label: "PROMOTIONS INFLUENCED", value: 25 },
//     { label: "PITCHES REVIEWED", value: 200 },
//     { label: "BOSSES SERVED", value: 61 },
//   ];

//   const companies = [
//     { name: "NVIDIA", logo: nvidiablacklogo },
//     { name: "Accenture", logo: accenture },
//     { name: "Citi", logo: citiblacklogo },
//     { name: "IIMC", logo: iimcwhitelogo },
//     { name: "Edelweiss", logo: edelweisswhitelogo },
//     { name: "IMT", logo: imtwhitelogo },
//     { name: "Texas", logo: University_of_Texas_at_Austin_logo},
//     { name: "Kings", logo: founderKing},
//   ];

//   return (
//     <section className="py-8 bg-white font-jakarta">
//       <div className="max-w-full relative z-50 pb-16">
//         {/* Content with responsive margins */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
//           <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-10 md:gap-16 items-start">

//             {/* Left Section - Responsive */}
//             <div className="pt-10 lg:pt-12">
//               <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold leading-tight sm:leading-[48px] text-[#0F1729] mb-4 sm:mb-6">
//                 Who are we and{" "}
//                 <br />
//                 <span className="text-[#0B64F4]">why should you trust us?</span>
//               </h2>
              
//               <p className="text-[16px] sm:text-[18px] leading-[28px] font-normal text-[#000000] mb-4">
//                 We&apos;re not motivational speakers or LinkedIn influencers
//                 peddling platitudes..
//                 <br />
//                 And we&apos;re not here to sell you empty confidence.
//               </p>
              
//               <h3 className="text-[20px] sm:text-[24px] leading-[30px] font-bold text-[#000000] mb-4 mt-6 sm:mt-10 md:mt-16">
//                 We&apos;ve been overlooked. We&apos;ve figured out why.
//               </h3>
              
//               <p className="text-[14px] sm:text-[16px] leading-[28px] font-normal text-[#000000] mb-2">
//                 And we&apos;ve learnt how to unblock career growth, without becoming
//                 someone we&apos;re
//                 <br />
//                 not. Now, we help capable professionals like you stop second-guessing
//                 themselves
//                 <br />
//                 and start moving forward with intent.
//               </p>
              
//               <p className="text-[14px] sm:text-[16px] leading-[28px] font-normal text-[#000000] mt-2 mb-2">
//                 Our team brings together expertise in{" "}
//                 <span className="text-[#0B64F4] font-bold">
//                   psychology, neuroscience,
//                   <br />
//                   marketing, HR, business strategy, coaching, behavioural science, and
//                   more.
//                 </span>
//               </p>
              
//               <p className="text-[20px] sm:text-[25px] leading-[24px] font-bold text-[#000000] mt-8 sm:mt-10 md:mt-16">
//                 We&apos;re rooting for you.
//               </p>
//             </div>

//             {/* Right Section (Founder Card) - Responsive */}
//             <div className="relative z-50 rounded-[20px] lg:rounded-[25px] my-10 lg:my-0 shadow-2xl border border-[#D5D5D5] overflow-hidden w-full lg:max-w-[400px] mx-auto md:mx-0 md:ml-auto transform rotate-[5.81deg] hover:rotate-0 transition-transform duration-500">

//               {/* Top White Section - FIXED HEIGHT */}
//               <div className="bg-white text-center relative z-10 h-[120px] sm:h-[146px] flex  justify-center">
//                 <h3 className="font-montserrat mt-6 font-semibold text-[12px] sm:text-[14px] leading-[100%] tracking-[0.09em] text-black uppercase">
//                   CORPORATE EXPERTS
//                 </h3>
//               </div>

//               {/* Overlapping Profile - ADJUSTED POSITION */}
//               <div className="absolute top-[55px] sm:top-[72px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
//                 <div className="relative">
//                   <div className="relative w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden bg-gradient-to-b from-[#0B63F2] to-[#0F2479] shadow-lg p-1">
//                     <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#0B63F2] to-[#0F2479]">
//                       <Image
//                         src={founder}
//                         alt="Sushant Sehra"
//                         fill
//                         className="object-cover rounded-full p-1"
//                         priority
//                       />
//                     </div>
//                   </div>
//                   <div className="absolute bottom-2 sm:bottom-3.5 right-0 sm:right-0.5 bg-blue-500 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-3 sm:border-4 border-white shadow-md">
//                     <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
//                   </div>
//                 </div>
//               </div>

//               {/* Bottom Black Section - Responsive */}
//               <div className="bg-gradient-to-b from-slate-900 to-black text-white pt-20 sm:pt-24 pb-8 sm:pb-10 px-6 sm:px-10">
//                 {/* Name and Role */}
//                 <div className="text-center mb-6">
//                   <h3 className="font-montserrat text-[18px] sm:text-[20px] leading-[100%] font-bold tracking-normal text-transparent bg-clip-text bg-[radial-gradient(114.18%_114.18%_at_50%_50%,#FFFFFF_0%,#717171_100%)]">
//                     SUSHANT SEHRA
//                   </h3>
//                   <p className="font-montserrat text-[12px] sm:text-[14px] leading-[100%] font-normal tracking-normal text-white uppercase mt-1">
//                     FOUNDER
//                   </p>
//                 </div>

//                 {/* Stats Section */}
//                 <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
//                   {stats.map((stat, index) => (
//                     <div key={index} className="flex justify-between items-center">
//                       <span className="font-jakarta text-[10px] sm:text-[12px] leading-[145%] font-medium text-[#9F9F9F] uppercase">
//                         {stat.label}
//                       </span>

//                       {/* And from values */}
//                       <span className="font-jakarta text-[14px] sm:text-[16px] leading-[145%] text-white font-bold">
//                         {stat.value}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Divider */}
//                 <div className="border-t-[0.82px] border-[#E3E3E3] mt-4 sm:mt-6 mb-4 sm:mb-6" />

//                 {/* Tagline */}
// <div className="text-center mb-2 sm:mb-4">
//   <p className="font-montserrat text-[12px] sm:text-[14px] leading-[120%] font-medium text-white uppercase">
//     Built by Top B-School
//     graduates and{" "}
//     <br />
//     <span className="font-montserrat mt-2 text-[12px] sm:text-[14px] leading-[120%] font-bold tracking-normal text-transparent bg-clip-text bg-[radial-gradient(94.28%_94.28%_at_50%_50%,#FFFFFF_0%,#0B64F4_100%)] uppercase">
//       Corporate Leaders
//     </span>
//   </p>
// </div>


//                 {/* Company Logos - Exact Figma sizes */}
//                 <div className="space-y-2 sm:space-y-4">
//                   {/* Row 1: NVIDIA, Accenture, Citi */}
//                   <div className="grid grid-cols-3 gap-3 sm:gap-5 justify-items-center items-center">
//                     <div className="flex items-center justify-center">
//                       <Image
//                         src={nvidiablacklogo}
//                         alt="NVIDIA"
//                         width={102}
//                         height={400}
//                         className="object-contain"
//                       />
//                     </div>
//                     <div className="flex items-center justify-center">
//                       <Image
//                         src={accenture}
//                         alt="Accenture"
//                         width={102}
//                         height={26}
//                         className="object-contain"
//                       />
//                     </div>
//                     <div className="flex items-center justify-center">
//                       <Image
//                         src={citiblacklogo}
//                         alt="Citi"
//                         width={60}
//                         height={26}
//                         className="object-contain"
//                       />
//                     </div>
//                   </div>

//                   {/* Row 2: IIMC, Edelweiss, IMT */}
//                   <div className="grid grid-cols-3 gap-3 sm:gap-5 justify-items-center items-center">
//                     <div className="flex items-center justify-center">
//                       <Image
//                         src={iimcwhitelogo}
//                         alt="IIMC"
//                         width={99}
//                         height={28}
//                         className="object-contain w-[99px] h-[28px]"
//                       />
//                     </div>
//                     <div className="flex items-center justify-center">
//                       <Image
//                         src={edelweisswhitelogo}
//                         alt="Edelweiss"
//                         width={89}
//                         height={24}
//                         className="object-contain w-[89px] h-[24px]"
//                       />
//                     </div>
//                     <div className="flex items-center justify-center">
//                       <Image
//                         src={imtwhitelogo}
//                         alt="IMT"
//                         width={102}
//                         height={38}
//                         className="object-contain w-[102px] h-[38px]"
//                       />
//                     </div>
//                   </div>

//                   {/* Row 3: Texas, Kings (CENTERED) */}
//                   <div className="flex justify-center gap-5 items-center">
//                     <div className="flex items-center justify-center">
//                       <Image
//                         src={University_of_Texas_at_Austin_logo}
//                         alt="Texas"
//                         width={97}
//                         height={28}
//                         className="object-contain -rotate-6 "
//                       />
//                     </div>
//                     <div className="flex items-center justify-center">
//                       <Image
//                         src={founderKing}
//                         alt="Kings"
//                         width={50}
//                         height={26}
//                         className="object-contain -rotate-6"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 </div>
//             </div>

//           </div>
//         </div>

//         {/* Logo band - full width */}
//         <BuiltBy />
//       </div>
//     </section>
//   );
// };

// export default TrustSection;


