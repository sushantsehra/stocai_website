"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import accenture from "@/assets/accenture.png";
import citi from "@/assets/citi.png";
import edelweiss from "@/assets/edelweiss.png";
import iimc from "@/assets/iimc.png";
import kingscollege from "@/assets/kingscollege.png";
import nvidia from "@/assets/nvidia.png";
import texas from "@/assets/Texas.png";
import imtgd from "@/assets/IMTGD.jpeg";

const BuiltBy = () => {
  const logos = [
    { name: "University of Texas", url: texas, alt: "University of Texas logo" },
    { name: "King's College London", url: kingscollege, alt: "King's College London logo" },
    { name: "IIM Calcutta", url: iimc, alt: "IIM Calcutta logo" },
    { name: "IMT Ghaziabad", url: imtgd, alt: "IMT Ghaziabad logo" },
    { name: "NVIDIA", url: nvidia, alt: "NVIDIA logo" },
    { name: "Citi", url: citi, alt: "Citi logo" },
    { name: "Accenture", url: accenture, alt: "Accenture logo" },
    { name: "Edelweiss", url: edelweiss, alt: "Edelweiss logo" },
  ];

  return (
    // <section className="w-full py-6 bg-white overflow-hidden absolute -bottom-6 z-10">
    <section className="w-full py-6 bg-white overflow-hidden z-10">
      {/* <div className="relative w-full overflow-hidden"> */}
      <div className="relative w-full overflow-hidden flex justify-center bottom-4 lg:bottom-12">
        <motion.div
          // className="flex w-max gap-6"
          // animate={{ x: ["-50%", "0%"] }}
          className="flex gap-6"
          style={{ width: "max-content" }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center
                         w-32 sm:w-40 md:w-44 lg:w-48
                         h-16 sm:h-20
                         hover:shadow-md hover:scale-105
                         transition-all duration-300"
            >
              <div className="relative grayscale w-full h-full flex items-center justify-center">
                <Image
                  src={logo.url}
                  alt={logo.alt}
                  width={["Citi", "King's College London"].includes(logo.name) ? 100 : 480}
                  height={["Citi", "King's College London"].includes(logo.name) ? 40 : 50}
                  className={`object-contain group-hover:grayscale-0 transition-all duration-300 p-2
                    ${
                      ["Citi", "King's College London"].includes(logo.name)
                        ? "scale-100 lg:scale-75"
                        : "scale-100 lg:scale-90"
                    }`}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BuiltBy;

// import Image from 'next/image';
// import accenture from "@/assets/accenture.png";
// import citi from "@/assets/citi.png";
// import edelweiss from "@/assets/edelweiss.png";
// import iimc from "@/assets/iimc.png";
// import kingscollege from "@/assets/kingscollege.png";
// import nvidia from "@/assets/nvidia.png";
// import texas from "@/assets/Texas.png";
// import svg_linestroke from "@/assets/svg_linestroke.png";
// import imtgd from "@/assets/IMTGD.jpeg";

// const BuiltBy = () => {
//   const logos = [
//     {
//       name: 'University of Texas',
//       url: texas,
//       alt: 'University of Texas logo'
//     },
//     {
//       name: "King's College London",
//       url: kingscollege,
//       alt: "King's College London logo"
//     },
//     {
//       name: 'IIM Calcutta',
//       url: iimc,
//       alt: 'IIM Calcutta logo'
//     },
//     {
//       name: 'IMT Ghaziabad',
//       url: imtgd,
//       alt: 'IMT Ghaziabad logo'
//     },
//     {
//       name: 'NVIDIA',
//       url: nvidia,
//       alt: 'NVIDIA logo'
//     },
//     {
//       name: 'Citi',
//       url: citi,
//       alt: 'Citi logo'
//     },
//     {
//       name: 'Accenture',
//       url: accenture,
//       alt: 'Accenture logo'
//     },
//     {
//       name: 'Edelweiss',
//       url: edelweiss,
//       alt: 'Edelweiss logo'
//     }
//   ];

//   return (
//     <section className="w-full py-4 bg-white" >
//       <div className="max-w-full">
//         {/* Header */}
//         {/* <div className="text-center mb-12">
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#54B0AF] font-gotham mb-4">
//             Built by Top B-School graduates and{" "}
//              <span className="relative inline-block">
//               <span className="text-[#54B0AF] font-gotham font-medium">Corporate Leaders</span>
//               <Image src={svg_linestroke} alt="linestroke" width={250} height={250} className="top-2 md:top-3 absolute" />
//             </span>
//           </h2>
//         </div> */}

//         {/* Logos Grid */}
//         <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-6 lg:gap-6 items-center justify-items-center">
//           {logos.map((logo, index) => (
//             <div
//               key={index}
//               className="group relative flex items-center justify-center hover:shadow-md transition-all duration-300 hover:scale-105 w-full h-14 sm:h-20 md:h-24 lg:h-16"
//             >
//               <div className="relative grayscale w-full h-full flex items-center justify-center">
//                 <Image
//                   src={logo.url}
//                   alt={logo.alt}
//                   width={["Citi", "King's College London"].includes(logo.name) ? 100 : 480}
//                   height={["Citi", "King's College London"].includes(logo.name) ? 40 : 50}
//                   className={`object-contain filter group-hover:grayscale-0 transition-all duration-300 p-2
//                     ${["Citi", "King's College London"].includes(logo.name)
//                       ? "scale-100 lg:scale-75"
//                       : "scale-100 lg:scale-90"}
//                     sm:w-auto sm:h-auto`}
//                   sizes="(max-width: 640px) 40vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BuiltBy;