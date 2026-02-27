"use client";

import React from "react";
import Image from "next/image";
import blueBg from "../assets/FounderNoteSectionBackground.png";

export default function FounderNoteSection() {
  return (
    <section className="relative w-full mt-8 aspect-[1500/700] overflow-hidden">
      
      {/* Background Image */}
      <Image
        src={blueBg}
        alt="Founder Background"
        fill
        priority
        className="object-cover object-center lg:h-auto"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          
          <div className="max-w-[185px] md:max-w-xl lg:max-w-2xl xl:max-w-2xl ml-auto text-white lg:-translate-y-12 xl:-translate-y-16">

            <h2 className="font-quattrocento font-bold text-[24px] sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] leading-6 md:leading-tight translate-x-[-25%] lg:translate-x-[-8%]">
              A note from <br />
              <span className="font-bold">
                Sushant Sehra
              </span>
            </h2>

            <p className="md:mt-1 text-[8px] font-inter font-medium sm:text-base lg:text-lg xl:text-lg opacity-100 translate-x-[-25%] lg:translate-x-[-8%]">
              Founder, Better Corporate Life
            </p>

            <div className="mt-3 md:mt-6 space-y-2 md:space-y-4 lg:space-y-4 xl:space-y-6 font-inter font-normal text-[8px] sm:text-base lg:text-lg xl:text-lg leading-relaxed opacity-100">
              
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
    </section>
  );
}

// "use client";

// import React from "react";
// import Image from "next/image";
// import blueBg from "../assets/FounderNoteSectionBackground.png";

// export default function FounderNoteSection() {
//   return (
//     <section className="relative w-full min-h-[600px] lg:min-h-[700px]">
      
//       {/* Background Image */}
//       <Image
//         src={blueBg}
//         alt="Founder Background"
//         fill
//         priority
//         className="object-cover object-center"
//       />

//       {/* Overlay (optional for readability) */}
//       <div className="absolute inset-0 bg-blue-900/20" />

//       {/* Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        
//         <div className="max-w-2xl text-white">
          
//           {/* Heading */}
//           <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
//             A note from <br />
//             <span className="font-semibold">
//               Sushant Sehra
//             </span>
//           </h2>

//           {/* Subheading */}
//           <p className="mt-4 text-sm sm:text-base md:text-lg opacity-90">
//             Founder, Better Corporate Life
//           </p>

//           {/* Paragraphs */}
//           <div className="mt-8 space-y-6 text-sm sm:text-base md:text-lg leading-relaxed opacity-95">
            
//             <p>
//               <span className="font-semibold">Be Promotable</span> is designed
//               for professionals who perform well but want to progress with
//               clarity and intent.
//             </p>

//             <p>
//               The promotion strategy system focuses on visibility, influence,
//               and executive presence, the real drivers of career movement
//               within corporate systems.
//             </p>

//             <p>
//               This structured, practical approach reflects how we work at{" "}
//               <span className="font-semibold">
//                 Better Corporate Life.
//               </span>
//             </p>

//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }