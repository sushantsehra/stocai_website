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
    { name: "University of Texas", url: texas, alt: "University of Texas logo", width: 180, height: 60 },
    { name: "King's College London", url: kingscollege, alt: "King's College London logo", width: 100, height: 60 },
    { name: "IIM Calcutta", url: iimc, alt: "IIM Calcutta logo", width: 300, height: 80 },
    { name: "IMT Ghaziabad", url: imtgd, alt: "IMT Ghaziabad logo", width: 360, height: 120 },
    { name: "NVIDIA", url: nvidia, alt: "NVIDIA logo", width: 240, height: 60 },
    { name: "Citi", url: citi, alt: "Citi logo", width: 80, height: 60 },
    { name: "Accenture", url: accenture, alt: "Accenture logo", width: 180, height: 60 },
    { name: "Morgan Stanley", url: morganstanley, alt: "Morgan Stanley logo", width: 260, height: 60 },
    { name: "Deloitte", url: deloitte, alt: "Deloitte logo", width: 240, height: 60 },
    { name: "Edelweiss", url: edelweiss, alt: "Edelweiss logo", width: 240, height: 60 },
    { name: "Mahindra", url: mahindra, alt: "Mahindra logo", width: 120, height: 60 },
  ];

  return (
    <section className="w-full bg-white overflow-hidden z-10 py-6 sm:py-10">
      <p className="text-center px-6 font-inter font-medium text-[24px] sm:text-[30px] leading-tight tracking-normal text-[#1D1D1D] mb-8 sm:mb-12">
        Trusted by professionals from
      </p>

      <div className="relative w-full overflow-hidden flex justify-center">
        <motion.div
          className="flex gap-4 sm:gap-6 items-top"
          style={{ width: "max-content" }}
          animate={{ x: ["-33.333%", "0%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          }}
        >
          {/* Using 3 sets of logos to ensure perfect loop continuity on all screen sizes */}
          {[...logos, ...logos, ...logos].map((logo, index) => {
            return (
              <div
                key={index}
                className="
                  group flex items-center justify-center
                  w-20 sm:w-32 md:w-40 lg:w-48
                  h-12 sm:h-16 md:h-20
                  shrink-0 transition-all duration-300
                "
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={logo.url}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="object-contain transition-all duration-300 p-1 sm:p-2"
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedByProfessionals;