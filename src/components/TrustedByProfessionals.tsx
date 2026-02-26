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
    <section className="w-full bg-white overflow-hidden z-10">

      {/* ===== MOBILE VIEW (md:hidden) ===== */}
      <div className="md:hidden py-4">
        <p
          style={{ color: "#1D1D1D", fontSize: "18px" }}
          className="text-[#1D1D1D] font-medium text-center font-inter text-[18px] px-2"
        >
          Trusted by professionals from
        </p>

        <div className="relative w-full overflow-hidden flex justify-center mt-4">
          <motion.div
            className="flex gap-4 items-center"
            style={{ width: "max-content" }}
            animate={{ x: ["0%", "-50%"] }}
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
                className="flex items-center justify-center w-28 sm:w-36 h-14 sm:h-16 shrink-0"
              >
                <Image
                  src={logo.url}
                  alt={logo.alt}
                  width={140}
                  height={60}
                  className="object-contain w-auto h-8 sm:h-10 mx-auto"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ===== DESKTOP VIEW (hidden md:block) ===== */}
      <div className="hidden md:block py-6 mt-10">
        <p
          className="text-center px-6 font-inter font-medium text-[30px] leading-[100%] tracking-normal text-[#1D1D1D]"
        >
          Trusted by professionals from
        </p>

        <div className="relative w-full overflow-hidden flex justify-center mt-12">
          <motion.div
            className="flex gap-14 items-center"
            style={{ width: "max-content" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            }}
          >
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center shrink-0 w-[240px] h-[70px]"
              >
                <Image
                  src={logo.url}
                  alt={logo.alt}
                  width={240}
                  height={50}
                  className="object-contain w-auto max-w-[240px] h-[50px]"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default TrustedByProfessionals;