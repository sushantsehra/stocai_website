"use client";

import React from "react";
import Image from "next/image";
import blueBg from "../assets/Background.png";
import founderPicture from "../assets/SushantPicture.png";

export default function FounderNoteSection() {
  return (
    <section className="relative w-full mt-8 aspect-[1000/660] md:aspect-[1500/600] overflow-hidden">
      
      {/* Background Image */}
      <Image
        src={blueBg}
        alt="Founder Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-2 sm:px-10 lg:px-16 w-full h-full">
          
          {/* Main Row */}
          <div className="flex flex-row items-end justify-between h-full">

            {/* LEFT SIDE IMAGE */}
            <div className="w-full lg:w-1/2 flex items-end justify-center lg:justify-start h-full">
              <Image
                src={founderPicture}
                alt="Sushant Sehra"
                priority
                className="
                  h-[100%]
                  sm:h-[80%]
                  md:h-[80%]
                  lg:h-[85%]
                  2xl:h-[150%]
                  w-auto
                  object-contain
                  translate-y-3.5 2xl:translate-y-60
                "
              />
            </div>

            {/* RIGHT SIDE TEXT */}
            <div className="w-full lg:w-1/2 text-white lg:pl-10 pb-6 lg:pb-12">

              <div className="translate-x-[-15%] lg:mb-[15%] 2xl:mb-[10%]">
                <h2 className="font-quattrocento font-bold text-[24px] sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[66px] 2xl:text-[80px] leading-6 md:leading-tight lg:leading-[70px] 2xl:leading-[80px]">
                A note from <br />
                <span className="font-bold">
                  Sushant Sehra
                </span>
              </h2>

              <p className="2xl:mt-1 text-[8px] font-inter font-medium sm:text-base lg:text-lg xl:text-2xl 2xl:text-3xl opacity-100">
                Founder, Better Corporate Life
              </p>
              </div>

              <div className="mt-3 md:mt-2 2xl:mt-4 space-y-2 md:space-y-4 lg:space-y-4 xl:space-y-6 font-inter font-normal text-[8px] sm:text-base lg:text-lg xl:text-lg 2xl:text-2xl leading-relaxed opacity-100">
                
                <p>
                  <span className="font-bold">Be Promotable</span> is designed
                  for professionals who perform well but want to progress with
                  clarity and intent.
                </p>

                <p>
                  The promotion strategy system focuses on visibility, influence,
                  and executive presence, the real drivers of career movement
                  within corporate systems.
                </p>

                <p>
                  This structured, practical approach reflects how we work at{" "}
                  <span className="font-bold">
                    Better Corporate Life.
                  </span>
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}


// "use client";

// import React from "react";
// import Image from "next/image";
// import blueBg from "../assets/Background.png";
// import founderPicture from "../assets/SushantPicture.png";

// export default function FounderNoteSection() {
//   return (
//     <section className="relative w-full mt-8 aspect-[1500/700] overflow-hidden">
      
//       {/* Background Image */}
//       <Image
//         src={blueBg}
//         alt="Founder Background"
//         fill
//         priority
//         className="object-cover object-center lg:h-auto"
//       />

//       {/* Content */}
//       <div className="relative z-10 h-full flex items-center">
        
//         <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          
//           <div className="max-w-[185px] md:max-w-xl lg:max-w-2xl xl:max-w-2xl ml-auto text-white lg:-translate-y-12 xl:-translate-y-16">

//             <h2 className="font-quattrocento font-bold text-[24px] sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] leading-6 md:leading-tight translate-x-[-25%] lg:translate-x-[-8%]">
//               A note from <br />
//               <span className="font-bold">
//                 Sushant Sehra
//               </span>
//             </h2>

//             <p className="md:mt-1 text-[8px] font-inter font-medium sm:text-base lg:text-lg xl:text-lg opacity-100 translate-x-[-25%] lg:translate-x-[-8%]">
//               Founder, Better Corporate Life
//             </p>

//             <div className="mt-3 md:mt-6 space-y-2 md:space-y-4 lg:space-y-4 xl:space-y-6 font-inter font-normal text-[8px] sm:text-base lg:text-lg xl:text-lg leading-relaxed opacity-100">
              
//               <p>
//                 <span className="font-bold">Be Promotable</span> is designed
//                 for professionals who perform well but want to progress with
//                 clarity and intent.
//               </p>

//               <p>
//                 The promotion strategy system focuses on visibility, influence,
//                 and executive presence, the real drivers of career movement
//                 within corporate systems.
//               </p>

//               <p>
//                 This structured, practical approach reflects how we work at{" "}
//                 <span className="font-bold">
//                   Better Corporate Life.
//                 </span>
//               </p>

//             </div>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }