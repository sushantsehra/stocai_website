"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import currentImg from "../assets/AarohiMehtaImg.jpg";
import futureImg from "../assets/ArohiMehtaFI.png";

export default function CareerTrajectorySection() {

  // ── Mobile flip state ──
  const [isFlipped, setIsFlipped] = useState(false);

  // Auto-flip every 3 seconds on small devices
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white w-full">

      {/* Top Blue Banner */}
      <div className="bg-[#014BAA] text-white text-center py-3 md:py-2 px-4">
        <h2 className="font-quattrocento font-bold text-[18px] md:text-[32px] lg:text-[48px] lg:py-3">
          Ready to change your career trajectory?
        </h2>
      </div>

      {/* Content */}
      <div className="px-4 py-3.5 md:px-5 md:py-6 max-w-[1100px] mx-auto">

        {/* Sub Text */}
        <div className="text-center mb-4 md:mb-10">
          <p className="font-semibold font-inter text-black text-[10px] md:text-[18px] lg:text-[28px]">
            Join professionals who already have!
          </p>
          <p
            style={{ fontWeight: 300 }}
            className="text-black font-inter text-[10px] md:text-[16px] lg:text-[24px] mt-1 md:mt-1 leading-4 md:leading-relaxed max-w-[280px] md:max-w-none mx-auto"
          >
            From Fortune 500 companies to fast-growing startups –
            real people, real promotions
          </p>
        </div>

        {/* Heading */}
        <h3 className="text-center font-quattrocento font-bold text-[20px] md:text-[36px] lg:text-[48px] text-[#1D1D1D] mb-4 md:mb-12">
          We Aim to{" "}
          <span className="text-[#1554A5]">Change You</span>
        </h3>

        {/* MOBILE: Single Flip Card — hidden on md+                      */}
        <div className="flex justify-center md:hidden mb-6">
          <div
            className="relative cursor-pointer"
            style={{ width: "300px", height: "435px", perspective: "1200px" }}
            onClick={() => setIsFlipped((prev) => !prev)}
          >
            {/* Inner flipping wrapper */}
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transition: "transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >

              {/* ── FRONT: Current State ── */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div className="bg-white rounded-[22px] shadow-xl border border-gray-200 overflow-hidden h-full flex flex-col">

                  <div className="bg-black min-h-[75px] text-white text-center py-3 uppercase text-[10px] tracking-widest font-montserrat font-semibold">
                    Current State
                  </div>

                  <div className="flex justify-center -mt-10 z-10 relative">
                    <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
                      <Image
                        src={currentImg}
                        alt="Current"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full scale-[1.5] object-top translate-y-[10%]"
                      />
                    </div>
                  </div>

                  <div className="px-5 py-2 text-center flex flex-col flex-1">
                    <h4 className="font-bold text-[#1C1C1C] text-[16px]">Aarohi Mehta</h4>
                    <p className="text-[12px] text-[#1C1C1C] font-normal font-jakarta mb-1.5">
                      UI/UX Designer
                    </p>

                    <div className="border-y border-[#E3E3E3] py-2 text-[12px] space-y-0.5 text-left">
                      {[
                        { label: "Status", value: "Invisible Contributor" },
                        { label: "Visibility Score", value: "42/100" },
                        { label: "Influence Rating", value: "Tactical" },
                        { label: "Access Level", value: "Restricted" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between font-jakarta font-medium text-[#7A7777]">
                          <span>{item.label}</span>
                          <span className="font-semibold text-black">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 border-b border-[#E3E3E3] py-2 text-left">
                      <p className="text-[11px] font-bold font-montserrat text-black uppercase mb-1">
                        Known For
                      </p>
                      <ul className="text-[12px] font-normal font-jakarta text-[#323232] space-y-0.5">
                        <li>• Executing defined design tasks</li>
                        <li>• Translating requirements into interfaces</li>
                        <li>• Maintaining design consistency</li>
                        <li>• Supporting product delivery</li>
                      </ul>
                    </div>

                    <div className="mt-0 pb-2 mt-auto">
                      <p className="text-[11px] font-bold font-montserrat uppercase text-center mb-2">
                        Promotability Quotient 40%
                      </p>
                      <div className="h-1.5 bg-gray-200 rounded-full">
                        <div className="h-full bg-black rounded-full w-[34%]" />
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* ── BACK: Future You ── */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="bg-white rounded-[22px] shadow-xl border border-gray-200 overflow-hidden h-full flex flex-col">

                  <div className="bg-[#0B64F4] min-h-[75px] text-white text-center py-3 uppercase text-[10px] tracking-widest font-montserrat font-semibold">
                    Future You
                  </div>

                  <div className="flex justify-center -mt-10 z-10 relative">
                    <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
                      <Image
                        src={futureImg}
                        alt="Future"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full scale-[1.5] object-top translate-y-[10%]"
                      />
                    </div>
                  </div>

                  <div className="px-5 py-2 text-center flex flex-col flex-1">
                    <h4 className="font-bold text-[#1C1C1C] text-[16px]">Aarohi Mehta</h4>
                    <p className="text-[12px] text-[#1C1C1C] font-normal font-jakarta mb-1.5">
                      Product Design Lead
                    </p>

                    <div className="border-y border-[#E3E3E3] py-2 text-[12px] space-y-0.5 text-left">
                      {[
                        { label: "Status", value: "Design Leader" },
                        { label: "Visibility Score", value: "96/100" },
                        { label: "Influence Rating", value: "Vision-Led" },
                        { label: "Access Level", value: "Unrestricted" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between font-jakarta font-medium text-[#7A7777]">
                          <span>{item.label}</span>
                          <span className="font-semibold text-black">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 border-b border-[#E3E3E3] py-2 text-left">
                      <p className="text-[11px] font-bold font-montserrat uppercase text-[#1554A5] mb-1">
                        Known For
                      </p>
                      <ul className="text-[12px] font-normal font-jakarta text-[#323232] space-y-0.5">
                        <li>• Driving product vision through design</li>
                        <li>• Influencing cross-functional decisions</li>
                        <li>• Owning end-to-end user experience</li>
                        <li>• Developing high-impact design teams</li>
                      </ul>
                    </div>

                    <div className="mt-3 pb-2 mt-auto">
                      <p className="text-[11px] font-bold font-montserrat uppercase text-[#0B64F4] text-center mb-2">
                        Promotability Quotient 92%
                      </p>
                      <div className="h-1.5 bg-gray-200 rounded-full">
                        <div className="h-full bg-[#0B64F4] rounded-full w-[94%]" />
                      </div>
                    </div>


                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP: Original side-by-side layout — hidden on mobile      */}
        {/* ============================================================ */}
        <div className="hidden md:flex flex-col items-center justify-center min-h-[630px]">
          <div className="relative w-[500px] h-[610px]">
            {/* CURRENT CARD */}
            <div
              className="absolute bg-white rounded-[24px] overflow-hidden"
              style={{
                width: '320px',
                height: '600px',
                bottom: '10px',
                left: '20px',
                transform: 'rotate(-8.5deg)',
                transformOrigin: 'bottom center',
                boxShadow: '0px 0px 150px 0px #00000033',
                zIndex: 10
              }}
            >
              <div className="bg-black pt-4 pb-14 uppercase text-[13px] tracking-widest font-montserrat font-semibold text-center text-white">
                Current State
              </div>
              <div className="flex justify-center -mt-10 relative z-20">
                <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
                  <Image src={currentImg} alt="Current" width={180} height={180} className="object-cover w-full h-full scale-[1.5] origin-center object-top translate-y-[10%]" />
                </div>
              </div>
              <div className="px-10 py-5 text-center">
                <h4 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '19px', lineHeight: '100%', color: '#1C1C1C' }}>Aarohi Mehta</h4>
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 400, fontSize: '13px', lineHeight: '100%', textTransform: 'uppercase', color: '#1C1C1C', marginTop: '7px', marginBottom: '10px' }}>UI/UX DESIGNER</p>
                <div className="border-y border-[#E3E3E3] py-4 text-left" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: '12px', lineHeight: '145%', letterSpacing: '0.03em', textTransform: 'uppercase', color: '#7A7777' }}>
                  <div className="flex justify-between py-1.5"><span>STATUS</span><span>:</span><span style={{ fontWeight: 600, color: '#000000' }}>Invisible Contributor</span></div>
                  <div className="flex justify-between py-1.5"><span>VISIBILITY SCORE</span><span>:</span><span style={{ fontWeight: 600, color: '#000000' }}>42/100</span></div>
                  <div className="flex justify-between py-1.5"><span>INFLUENCE RATING</span><span>:</span><span style={{ fontWeight: 600, color: '#000000' }}>Tactical</span></div>
                  <div className="flex justify-between py-1.5"><span>ACCESS LEVEL</span><span>:</span><span style={{ fontWeight: 600, color: '#000000' }}>Restricted</span></div>
                </div>
                <div className="mt-3 border-b border-[#E3E3E3] py-3 text-left">
                  <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '14px', lineHeight: '100%', textTransform: 'uppercase', color: '#000000', marginBottom: '8px' }}>Known For</p>
                  <ul style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 400, fontSize: '9.5px', lineHeight: '1.6', color: '#323232', listStyle: 'none', padding: 0 }}>
                    <li className="flex items-start gap-2"><span>•</span> <span>Executing defined design tasks</span></li>
                    <li className="flex items-start gap-2"><span>•</span> <span>Translating requirements into interfaces</span></li>
                    <li className="flex items-start gap-2"><span>•</span> <span>Maintaining design consistency</span></li>
                    <li className="flex items-start gap-2"><span>•</span> <span>Supporting product delivery</span></li>
                  </ul>
                </div>
                <div className="mt-4">
                  <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '14px', lineHeight: '100%', textTransform: 'uppercase', color: '#000000', marginBottom: '10px' }}>PROMOTABLITY QUOTIENT 40%</p>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-black rounded-full w-[40%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* FUTURE CARD */}
            <div
              className="absolute bg-white rounded-[24px] overflow-hidden"
              style={{
                width: '320px',
                height: '600px',
                bottom: '10px',
                left: '230px',
                transform: 'rotate(8.5deg)',
                transformOrigin: 'bottom center',
                boxShadow: '0px 0px 150px 0px #00000033',
                zIndex: 20
              }}
            >
              <div className="bg-[#0B64F4] pt-4 pb-14 uppercase text-[13px] tracking-widest font-montserrat font-semibold text-center text-white">
                Future You
              </div>
              <div className="flex justify-center -mt-10 relative z-20">
                <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
                  <Image src={futureImg} alt="Future" width={180} height={180} className="object-cover w-full h-full scale-[1.5] origin-center object-top translate-y-[10%]" />
                </div>
              </div>
              <div className="px-10 py-5 text-center">
                <h4 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: '19px', lineHeight: '100%', color: '#1C1C1C' }}>Aarohi Mehta</h4>
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 400, fontSize: '13px', lineHeight: '100%', textTransform: 'uppercase', color: '#1C1C1C', marginTop: '7px', marginBottom: '10px' }}>PRODUCT DESIGN LEAD</p>
                <div className="border-y border-[#E3E3E3] py-4 text-left" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 500, fontSize: '12px', lineHeight: '145%', letterSpacing: '0.03em', textTransform: 'uppercase', color: '#7A7777' }}>
                  <div className="flex justify-between py-1.5"><span>STATUS</span><span>:</span><span style={{ fontWeight: 600, color: '#000000' }}>Design Leader</span></div>
                  <div className="flex justify-between py-1.5"><span>VISIBILITY SCORE</span><span>:</span><span style={{ fontWeight: 600, color: '#000000' }}>96/100</span></div>
                  <div className="flex justify-between py-1.5"><span>INFLUENCE RATING</span><span>:</span><span style={{ fontWeight: 600, color: '#000000' }}>Vision-Led</span></div>
                  <div className="flex justify-between py-1.5"><span>ACCESS LEVEL</span><span>:</span><span style={{ fontWeight: 600, color: '#000000' }}>Unrestricted</span></div>
                </div>
                <div className="mt-3 border-b border-[#E3E3E3] py-3 text-left">
                  <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '14px', lineHeight: '100%', textTransform: 'uppercase', color: '#0B64F4', marginBottom: '8px' }}>Known For</p>
                  <ul style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 400, fontSize: '9.5px', lineHeight: '1.6', color: '#323232', listStyle: 'none', padding: 0 }}>
                    <li className="flex items-start gap-2"><span>•</span> <span>Driving product vision through design</span></li>
                    <li className="flex items-start gap-2"><span>•</span> <span>Influencing cross-functional decisions</span></li>
                    <li className="flex items-start gap-2"><span>•</span> <span>Owning end-to-end user experience</span></li>
                    <li className="flex items-start gap-2"><span>•</span> <span>Developing high-impact design teams</span></li>
                  </ul>
                </div>
                <div className="mt-4">
                  <p style={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: '14px', lineHeight: '100%', textTransform: 'uppercase', color: '#0B64F4', marginBottom: '10px' }}>PROMOTABLITY QUOTIENT 92%</p>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-[#0B64F4] rounded-full w-[92%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* ── end desktop cards ── */}

      </div>
    </section>
  );
}

// "use client";

// import React from "react";
// import Image from "next/image";
// import currentImg from "../assets/AnishaDateCI.jpg";
// import futureImg from "../assets/AnishaDateFI.png";

// export default function CareerTrajectorySection() {
//   return (
//     <section className="bg-white w-full">

//       {/* Top Blue Banner */}
//       <div className="bg-[#014BAA] text-white text-center py-3 md:py-2 px-4">
//         <h2 className="font-quattrocento font-bold text-[18px] md:text-[32px] lg:text-[42px]">
//           Ready to change your career trajectory?
//         </h2>
//       </div>

//       {/* Content */}
//       <div className="px-4 py-3.5 md:px-5 md:py-6 max-w-[1100px] mx-auto">

//         {/* Sub Text */}
//         <div className="text-center mb-4 md:mb-10">
//           <p className="font-semibold font-inter text-black font-inter text-[10px] md:text-[18px]">
//             Join professionals who already have!
//           </p>

//           <p style={{
//             fontWeight: 300,
//           }} className="text-black font-inter text-[10px] md:text-[16px] mt-1 md:mt-2 leading-4 md:leading-relaxed max-w-[280px] md:max-w-none mx-auto">
//             From Fortune 500 companies to fast-growing startups –
//             real people, real promotions
//           </p>
//         </div>

//         {/* Heading */}
//         <h3 className="text-center font-quattrocento font-bold text-[20px] md:text-[36px] text-[#1D1D1D] mb-4 md:mb-12">
//           We Aim to{" "}
//           <span className="text-[#1554A5]">Change You</span>
//         </h3>

//         {/* Cards Container */}
//         <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12">

//           {/* CURRENT CARD */}
//           <div className="relative bg-white rounded-[22px] md:rounded-[24px] shadow-xl md:shadow-2xl border border-gray-200 w-full max-w-[300px] md:max-w-[320px] overflow-hidden rotate-0 md:rotate-0">

//             <div className="bg-black min-h-[75px] nd:min-h-[90px] text-white text-center py-3 md:py-4 uppercase text-[10px] md:text-xs tracking-widest font-montserrat font-semibold">
//               Current State
//             </div>

//             <div className="flex justify-center -mt-10">
//               <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
//                 <Image
//                   src={currentImg}
//                   alt="Current"
//                   width={96}
//                   height={96}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             </div>

//             <div className="px-5 py-2 md:px-6 md:py-6 text-center">
//               <h4 className="font-bold font-jakarra text-[#1C1C1C] text-[16px] md:text-lg">
//                 Anisha Date
//               </h4>
//               <p className="text-[12px] md:text-sm text-[#1C1C1C] font-normal font-jakarta mb-1.5 md:mb-4">
//                 Senior Product Manager
//               </p>

//               <div className="border-y border-[#E3E3E3] py-2 md:py-4 text-[12px] md:text-sm space-y-0.5 md:space-y-2 text-left">
//                 <div className="flex justify-between font-jakarta font-medium text-[#7A7777]">
//                   <span>Status</span>
//                   <span className="font-semibold font-jakarta text-black">Invisible Contributor</span>
//                 </div>
//                 <div className="flex justify-between font-jakarta font-medium text-[#7A7777]">
//                   <span>Visibility Score</span>
//                   <span className="font-semibold font-jakarta text-black">34/100</span>
//                 </div>
//                 <div className="flex justify-between font-jakarta font-medium text-[#7A7777]">
//                   <span>Influence Rating</span>
//                   <span className="font-semibold font-jakarta text-black">Operational</span>
//                 </div>
//                 <div className="flex justify-between font-jakarta font-medium text-[#7A7777]">
//                   <span>Access Level</span>
//                   <span className="font-semibold font-jakarta text-black">Restricted</span>
//                 </div>
//               </div>

//               <div className="mt-2 md:mt-4 border-b border-[#E3E3E3] py-2 text-left">
//                 <p className="text-[11px] font-bold font-montserrat text-black uppercase mb-1 md:mb-2">
//                   Known For
//                 </p>
//                 <ul className="text-[12px] font-normal font-jakarta text-[#323232] md:text-sm space-y-0.5 md:space-y-1">
//                   <li>• Task Management</li>
//                   <li>• Fixing Problems Quietly</li>
//                   <li>• Subject Matter Expertise</li>
//                   <li>• Tactical Execution</li>
//                 </ul>
//               </div>

//               <div className="mt-3 md:mt-6 pb-4">
//                 <p className="text-[11px] font-bold font-montserrat uppercase text-center mb-2">
//                   Promotability Quotient 34%
//                 </p>
//                 <div className="h-1.5 bg-gray-200 rounded-full">
//                   <div className="h-full bg-black rounded-full w-[34%]" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* FUTURE CARD */}
//           <div className="relative bg-white rounded-[22px] md:rounded-[24px] shadow-xl md:shadow-2xl border border-gray-200 w-full max-w-[310px] md:max-w-[340px] overflow-hidden rotate-0 md:rotate-0">

//             <div className="bg-[#0B64F4] min-h-[75px] nd:min-h-[90px] text-white text-center py-3 md:py-4 uppercase text-[10px] font-montserrat md:text-xs tracking-widest font-semibold">
//               Future You
//             </div>

//             <div className="flex justify-center -mt-10">
//               <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
//                 <Image
//                   src={futureImg}
//                   alt="Future"
//                   width={96}
//                   height={96}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             </div>

//             <div className="px-5 py-2 md:px-6 md:py-6 text-center">
//               <h4 className="font-bold font-jakarra text-[#1C1C1C] text-[16px] md:text-lg">
//                 Anisha Date
//               </h4>
//               <p className="text-[12px] md:text-sm text-[#1C1C1C] font-normal font-jakarta mb-1.5 md:mb-4">
//                 Senior Product Manager
//               </p>

//               <div className="border-y border-[#E3E3E3] py-2 md:py-4 text-[12px] md:text-sm space-y-0.5 md:space-y-2 text-left">
//                 <div className="flex justify-between font-jakarta font-medium text-[#7A7777]">
//                   <span>Status</span>
//                   <span className="font-semibold">Business Driver</span>
//                 </div>
//                 <div className="flex justify-between font-jakarta font-medium text-[#7A7777]">
//                   <span>Visibility Score</span>
//                   <span className="font-semibold">92/100</span>
//                 </div>
//                 <div className="flex justify-between font-jakarta font-medium text-[#7A7777]">
//                   <span>Influence Rating</span>
//                   <span className="font-semibold">Strategic</span>
//                 </div>
//                 <div className="flex justify-between font-jakarta font-medium text-[#7A7777]">
//                   <span>Access Level</span>
//                   <span className="font-semibold">Unrestricted</span>
//                 </div>
//               </div>

//               <div className="mt-2 md:mt-4 border-b border-[#E3E3E3] py-2 text-left">
//                 <p className="text-[11px] font-bold uppercase text-[#1554A5] mb-1 md:mb-2">
//                   Known For
//                 </p>
//                 <ul className="text-[12px] md:text-sm font-jakarta font-normal text-[#323232] space-y-0.5 md:space-y-1">
//                   <li>• Stakeholder Management</li>
//                   <li>• Executive Communication</li>
//                   <li>• Cross-functional Leadership</li>
//                   <li>• Big-picture Thinking</li>
//                 </ul>
//               </div>

//               <div className="mt-3 md:mt-6 pb-4">
//                 <p className="text-[11px] font-bold font-montserrat uppercase text-[#0B64F4] text-center mb-2">
//                   Promotability Quotient 94%
//                 </p>
//                 <div className="h-1.5 bg-gray-200 rounded-full">
//                   <div className="h-full bg-[#0B64F4] rounded-full w-[94%]" />
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }