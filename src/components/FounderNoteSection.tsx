"use client";

import React from "react";
import Image from "next/image";
import blueBg from "../assets/Background.png";
import founderPicture from "../assets/SushantPicture.png";

export default function FounderNoteSection() {
  return (
    <section className="relative w-full mt-8 aspect-[1000/600] md:aspect-[1500/700] overflow-hidden">
      
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
        <div className="max-w-7xl lg:max-w-none mx-auto px-2 sm:px-10 lg:px-[11.5vw] w-full h-full">
          
          {/* Main Row */}
          <div className="flex flex-row items-end justify-between h-full">

            {/* LEFT SIDE IMAGE */}
            <div className="w-full lg:w-1/2 flex items-end justify-center lg:justify-start h-full translate-x-[-10%] md:translate-x-0">
              {/* <Image
                src={founderPicture}
                alt="Sushant Sehra"
                priority
                className="
                  h-[100%]
                  sm:h-[80%]
                  md:h-[80%]
                  lg:h-[105%]
                  xl:h-[88%]
                  2xl:h-[100%]
                  w-auto
                  object-contain
                  lg:object-bottom lg:object-left-bottom
                  translate-y-3.5 lg:translate-y-0
                "
              /> */}
              <Image
                src={founderPicture}
                alt="Sushant Sehra"
                priority
                className="
                  w-auto
                  h-[60vh]
                  sm:h-[70vh]
                  md:h-[80vh]
                  lg:h-[90vh]
                  // xl:h-[93vh]
                  // 2xl:h-[110vh]

                  max-h-[1000px]

                  object-contain
                  lg:object-bottom
                  translate-y-[30%] md:translate-y-[5%] md:translate-x-[-10%]
                "
              />
            </div>

            {/* RIGHT SIDE TEXT */}
            <div className="w-full lg:w-1/2 text-white lg:pl-[3vw] pb-6 lg:pb-[3vw] translate-x-[-10%] md:translate-x-0">

              <div className="translate-x-[-9%] md:translate-x-[-15%] lg:mb-[5.5vw]">
                <h2 className="font-quattrocento font-bold text-[24px] sm:text-4xl md:text-5xl lg:text-[65px] leading-6 md:leading-tight lg:leading-[1.1] xl:leading-[1.1] 2xl:leading-[1.1]">
                A note from <br />
                <span className="font-bold">
                  Sushant Sehra
                </span>
              </h2>

              <p className="mt-1 md:mb-2 2xl:mt-[1vw] text-[8px] font-inter font-medium sm:text-base lg:text-[20px] xl:text-[28px] opacity-100">
                Founder, Better Corporate Life
              </p>
              </div>

              <div className="mt-3 md:mt-3 lg:translate-y-[-12%] lg:mt-0 2xl:mt-0 space-y-2 md:space-y-4 lg:space-y-[1.5vw] xl:space-y-[2vw] font-inter font-normal text-[8px] sm:text-base lg:text-[18px] xl:text-[20px] 2xl:text-[24px] leading-relaxed opacity-100">
                
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