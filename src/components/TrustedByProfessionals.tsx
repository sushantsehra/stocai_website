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
    {
      name: "University of Texas",
      url: texas,
      alt: "University of Texas logo",
      width: 180,
      height: 60,
      mobileWidth: 100,
      mobileHeight: 34,
    },
    {
      name: "King's College London",
      url: kingscollege,
      alt: "King's College London logo",
      width: 100,
      height: 60,
      mobileWidth: 55,
      mobileHeight: 34,
    },
    {
      name: "IIM Calcutta",
      url: iimc,
      alt: "IIM Calcutta logo",
      width: 300,
      height: 80,
      mobileWidth: 140,
      mobileHeight: 38,
    },
    {
      name: "IMT Ghaziabad",
      url: imtgd,
      alt: "IMT Ghaziabad logo",
      width: 200,
      height: 100,
      mobileWidth: 120,
      mobileHeight: 44,
    },
    {
      name: "NVIDIA",
      url: nvidia,
      alt: "NVIDIA logo",
      width: 200,
      height: 250,
      mobileWidth: 110,
      mobileHeight: 110,
    },
    {
      name: "Citi",
      url: citi,
      alt: "Citi logo",
      width: 80,
      height: 40,
      mobileWidth: 44,
      mobileHeight: 22,
    },
    {
      name: "Accenture",
      url: accenture,
      alt: "Accenture logo",
      width: 180,
      height: 90,
      mobileWidth: 100,
      mobileHeight: 54,
    },
    {
      name: "Morgan Stanley",
      url: morganstanley,
      alt: "Morgan Stanley logo",
      width: 260,
      height: 50,
      mobileWidth: 130,
      mobileHeight: 30,
    },
    {
      name: "Deloitte",
      url: deloitte,
      alt: "Deloitte logo",
      width: 240,
      height: 60,
      mobileWidth: 130,
      mobileHeight: 80,
    },
    {
      name: "Edelweiss",
      url: edelweiss,
      alt: "Edelweiss logo",
      width: 240,
      height: 80,
      mobileWidth: 120,
      mobileHeight: 50,
    },
    {
      name: "Mahindra",
      url: mahindra,
      alt: "Mahindra logo",
      width: 120,
      height: 50,
      mobileWidth: 65,
      mobileHeight: 28,
    },
  ];

  return (
    <div className="w-full overflow-hidden py-1 md:pt-12 bg-white">
      <p className="text-center text-[#1D1D1D] text-[18px] md:text-[30px] font-medium font-inter">
        Trusted by professionals from
      </p>
      <div className="relative flex overflow-hidden -mt-3 md:-mt-16">
        <motion.div
          className="flex gap-1 md:gap-5 items-center"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            // duration: 60,
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
          style={{ willChange: "transform" }}
        >
          {[...logos, ...logos, ...logos].map((logo, index) => {
            return (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center"
              >
                {/* Mobile size */}
                <div
                  className="block sm:hidden"
                  style={{ width: logo.mobileWidth, height: logo.mobileHeight, position: "relative" }}
                >
                  <Image
                    src={logo.url}
                    alt={logo.alt}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>

                {/* Desktop size (unchanged) */}
                <div
                  className="hidden sm:block"
                  style={{ width: logo.width, height: logo.height, position: "relative" }}
                >
                  <Image
                    src={logo.url}
                    alt={logo.alt}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default TrustedByProfessionals;