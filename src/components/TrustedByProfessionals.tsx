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
import morganstanley from "@/assets/morganstanley.png";
import deloitte from "@/assets/deloitte.png";
import mahindra from "@/assets/mahindra.png";

const TrustedByProfessionals = () => {
  const logos = [
    { name: "University of Texas", url: texas, alt: "University of Texas logo" },
    { name: "King's College London", url: kingscollege, alt: "King's College London logo" },
    { name: "IIM Calcutta", url: iimc, alt: "IIM Calcutta logo" },
    { name: "IMT Ghaziabad", url: imtgd, alt: "IMT Ghaziabad logo" },
    { name: "NVIDIA", url: nvidia, alt: "NVIDIA logo" },
    { name: "Citi", url: citi, alt: "Citi logo" },
    { name: "Accenture", url: accenture, alt: "Accenture logo" },
    { name: "Morgan Stanley", url: morganstanley, alt: "Morgan Stanley logo" },
    { name: "Deloitte", url: deloitte, alt: "Deloitte logo" },
    { name: "Edelweiss", url: edelweiss, alt: "Edelweiss logo" },
    { name: "Mahindra", url: mahindra, alt: "Mahindra logo" },

  ];

  return (
    <section className="w-full py-6 bg-white overflow-hidden z-10 mt-10">
        <p className="text-[#1D1D1D] font-medium font-jakarta text-[20px] md:text-[30px] px-2 md:px-6">Trusted by professionals from</p>

      <div className="relative w-full overflow-hidden flex justify-center bottom-4 lg:top-4 mt-10">
        <motion.div
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
              <div className="relative w-full h-full flex items-center justify-center">
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

export default TrustedByProfessionals;