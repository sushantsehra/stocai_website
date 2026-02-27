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
      mobileHeight: 28,
    },
    {
      name: "Citi",
      url: citi,
      alt: "Citi logo",
      width: 80,
      height: 40,
      mobileWidth: 44,
      mobileHeight: 25,
    },
    {
      name: "Accenture",
      url: accenture,
      alt: "Accenture logo",
      width: 180,
      height: 60,
      mobileWidth: 100,
      mobileHeight: 34,
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
      mobileWidth: 150,
      mobileHeight: 100,
    },
    {
      name: "Edelweiss",
      url: edelweiss,
      alt: "Edelweiss logo",
      width: 240,
      height: 60,
      mobileWidth: 120,
      mobileHeight: 30,
    },
    {
      name: "Mahindra",
      url: mahindra,
      alt: "Mahindra logo",
      width: 120,
      height: 50,
      mobileWidth: 65,
      mobileHeight: 34,
    },
  ];

  return (
    <div className="w-full overflow-hidden py-1 md:py-8 bg-white">
      <p className="text-center text-[#1D1D1D] md:mb-6 text-[18px] font-medium font-inter tracking-widest">
        Trusted by professionals from
      </p>
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-2 md:gap-8 items-center"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            duration: 10,
            repeat: Infinity,
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