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
    <section className="w-full py-4 sm:py-6 bg-white overflow-hidden">
      <div className="relative w-full overflow-hidden flex justify-center">

        <motion.div
          className="flex gap-4 sm:gap-6"
          style={{ width: "max-content" }}
          animate={{ x: ["-33.333%", "0%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 120,
            ease: "linear",
          }}
        >
          {/* Using 3 sets of logos to ensure perfect loop continuity on all screen sizes */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="
                group flex items-center justify-center
                w-20 sm:w-32 md:w-40 lg:w-48
                h-12 sm:h-16 md:h-20
                transition-all duration-300
              "
            >
              <div className="relative grayscale w-full h-full flex items-center justify-center">
                <Image
                  src={logo.url}
                  alt={logo.alt}
                  width={["Citi", "King's College London"].includes(logo.name) ? 80 : 300}
                  height={40}
                  className="object-contain group-hover:grayscale-0 transition-all duration-300 p-1 sm:p-2"
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

// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";

// import accenture from "@/assets/accenture.png";
// import citi from "@/assets/citi.png";
// import edelweiss from "@/assets/edelweiss.png";
// import iimc from "@/assets/iimc.png";
// import kingscollege from "@/assets/kingscollege.png";
// import nvidia from "@/assets/nvidia.png";
// import texas from "@/assets/Texas.png";
// import imtgd from "@/assets/IMTGD.jpeg";

// const BuiltBy = () => {
//   const logos = [
//     { name: "University of Texas", url: texas, alt: "University of Texas logo" },
//     { name: "King's College London", url: kingscollege, alt: "King's College London logo" },
//     { name: "IIM Calcutta", url: iimc, alt: "IIM Calcutta logo" },
//     { name: "IMT Ghaziabad", url: imtgd, alt: "IMT Ghaziabad logo" },
//     { name: "NVIDIA", url: nvidia, alt: "NVIDIA logo" },
//     { name: "Citi", url: citi, alt: "Citi logo" },
//     { name: "Accenture", url: accenture, alt: "Accenture logo" },
//     { name: "Edelweiss", url: edelweiss, alt: "Edelweiss logo" },
//   ];

//   return (
//     // <section className="w-full py-6 bg-white overflow-hidden absolute -bottom-6 z-10">
//     <section className="w-full py-6 bg-white overflow-hidden z-10">
//       {/* <div className="relative w-full overflow-hidden"> */}
//       <div className="relative w-full overflow-hidden flex justify-center bottom-4 lg:bottom-12">
//         <motion.div
//           // className="flex w-max gap-6"
//           // animate={{ x: ["-50%", "0%"] }}
//           className="flex gap-6"
//           style={{ width: "max-content" }}
//           animate={{ x: ["-50%", "0%"] }}
//           transition={{
//             repeat: Infinity,
//             repeatType: "loop",
//             duration: 25,
//             ease: "linear",
//           }}
//         >
//           {[...logos, ...logos].map((logo, index) => (
//             <div
//               key={index}
//               className="group relative flex items-center justify-center
//                          w-32 sm:w-40 md:w-44 lg:w-48
//                          h-16 sm:h-20
//                          hover:shadow-md hover:scale-105
//                          transition-all duration-300"
//             >
//               <div className="relative grayscale w-full h-full flex items-center justify-center">
//                 <Image
//                   src={logo.url}
//                   alt={logo.alt}
//                   width={["Citi", "King's College London"].includes(logo.name) ? 100 : 480}
//                   height={["Citi", "King's College London"].includes(logo.name) ? 40 : 50}
//                   className={`object-contain group-hover:grayscale-0 transition-all duration-300 p-2
//                     ${
//                       ["Citi", "King's College London"].includes(logo.name)
//                         ? "scale-100 lg:scale-75"
//                         : "scale-100 lg:scale-90"
//                     }`}
//                 />
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default BuiltBy;