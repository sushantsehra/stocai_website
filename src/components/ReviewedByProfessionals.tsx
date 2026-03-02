"use client";

import React from "react";
import AnikaSharma from "../assets/AnikaSharma.jpg";
import KavyaNair from "../assets/KavyaNair.jpg";
import TanayMalhotra from "../assets/TanayMalhotra.png";
import VinayDikshit from "../assets/VinayDikshit.jpg";
import Image from "next/image";

const professionals = [
  {
    name: "Kavya Nair",
    role: "AVP Marketing",
    text: "Understood in 8 weeks what 10 years of performance reviews never told me.",
    image: KavyaNair,
  },
  {
    name: "Anika Sharma",
    role: "HR Business Partner",
    text: "Went from invisible contributor to leading cross functional strategy in 3 months.",
    image: AnikaSharma,
  },
  {
    name: "Vinay Dikshit",
    role: "Operations Manager",
    text: "Built visibility with leadership three levels above me without a single awkward conversation.",
    image: VinayDikshit,
  },
  {
    name: "Tanay Malhotra",
    role: "Business Development Lead",
    text: "First program that gave me a system, not just motivation.",
    image: TanayMalhotra,
  },
];

const ReviewedByProfessionals = () => {
  return (
    <section className="bg-white py-2 px-5 md:py-12">
      <div className="max-w-[1200px] mx-auto">

        {/* Heading */}
        <h2 className="text-center font-quattrocento font-bold 
                       text-[18px] md:text-[36px] lg:text-[48px] 
                       text-[#1D1D1D] mb-2 md:mb-14">
          Reviewed by{" "}
          <span className="text-[#014BAA]">professionals</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-10">

          {professionals.map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-[6px]
                p-3 md:p-10
                shadow-[0_45px_35px_rgba(0,0,0,0.06)]
                flex flex-col
                min-h-[120px] md:min-h-[300px]
              "
            >
              {/* Top Row */}
              <div className="flex items-center gap-3 md:gap-5 mb-5 md:mb-8">

                {/* Avatar */}
                {/* <Image
                  src={item.image.src}
                  alt={item.name}
                  className="
                    w-[38px] h-[38px] 
                    md:w-[90px] md:h-[90px] 
                    rounded-full 
                    object-cover 
                    shrink-0
                  "
                /> */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={90}
                  height={90}
                  className="w-[38px] h-[38px] md:w-[90px] md:h-[90px] rounded-full object-cover shrink-0"
                />

                {/* Name + Role */}
                <div>
                  <h3 className="font-inter font-bold 
                                 text-[10px] md:text-[22px] lg:text-[24px] 
                                 text-black">
                    {item.name}
                  </h3>

                  <p
                    style={{ fontWeight: 300 }}
                    className="font-inter 
                               text-[10px] md:text-[16px] 
                               text-[#444]">
                    {item.role}
                  </p>
                </div>
              </div>

              {/* Testimonial Text */}
              <p
                style={{ fontWeight: 300 }}
                className="font-inter 
                           text-[10px] md:text-[20px] lg:text-[22px] 
                           leading-snug text-black">
                {item.text}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ReviewedByProfessionals;

// "use client";

// import React from "react";
// import AnikaSharma from "../assets/AnikaSharma.jpg"
// import KavyaNair from "../assets/KavyaNair.jpg"
// import TanayMalhotra from "../assets/TanayMalhotra.jpg"
// import VinayDikshit from "../assets/VinayDikshit.jpg"


// const professionals = [
//   {
//     name: "Kavya Nair",
//     role: "AVP Marketing",
//     text: "Understood in 8 weeks what 10 years of performance reviews never told me.",
//   },
//   {
//     name: "Anika Sharma",
//     role: "HR Business Partner",
//     text: "Went from invisible contributor to leading cross functional strategy in 3 months.",
//   },
//   {
//     name: "Vinay Dikshit",
//     role: "Operations Manager",
//     text: "Built visibility with leadership three levels above me without a single awkward conversation.",
//   },
//   {
//     name: "Tanya Mehrotra",
//     role: "Business Development Lead",
//     text: "First program that gave me a system, not just motivation.",
//   },
// ];

// const ReviewedByProfessionals = () => {
//   return (
//     <section className="bg-white py-2 px-5 md:py-16">
//       <div className="max-w-[1200px] mx-auto">

//         {/* Heading */}
//         <h2 className="text-center font-quattrocento font-bold
//                        text-[18px] md:text-[36px] lg:text-[44px]
//                        text-[#1D1D1D] mb-2 md:mb-14">
//           Reviewed by{" "}
//           <span className="text-[#014BAA]">professionals</span>
//         </h2>

//         {/* Grid - Always 2 Columns */}
//         <div className="grid grid-cols-2 gap-3 md:gap-10">

//           {professionals.map((item, index) => (
//             <div
//               key={index}
//               className="
//                 bg-white
//                 rounded-[6px]
//                 p-3 md:p-10
//                 shadow-[0_45px_35px_rgba(0,0,0,0.06)]
//                 flex flex-col
//                 min-h-[120px] md:min-h-[300px]
//               "
//             >
//               {/* Top Row */}
//               <div className="flex items-center gap-3 md:gap-5 mb-5 md:mb-8">

//                 {/* Avatar */}
//                 <div className="
//                   w-[38px] h-[38px]
//                   md:w-[90px] md:h-[90px]
//                   rounded-full bg-[#D9D9D9]
//                   shrink-0
//                 " />

//                 {/* Name + Role */}
//                 <div>
//                   <h3 className="font-inter font-bold
//                                  text-[10px] md:text-[22px] lg:text-[24px]
//                                  text-black">
//                     {item.name}
//                   </h3>

//                   <p
//                   style={{
//                     fontWeight: 300,
//                   }}
//                   className="font-inter
//                                 text-[10px] md:text-[16px]
//                                 text-[#444]">
//                     {item.role}
//                   </p>
//                 </div>
//               </div>

//               {/* Testimonial Text */}
//               <p
//               style={{
//                     fontWeight: 300,
//                   }}
//                    className="font-inter font-medium
//                             text-[10px] md:text-[20px] lg:text-[22px]
//                             leading-snug text-black">
//                 {item.text}
//               </p>

//             </div>
//           ))}

//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewedByProfessionals;