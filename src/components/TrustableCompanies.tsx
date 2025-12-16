"use client";

import React from "react";
import Image from "next/image";

// Imported logos
import citi from "../assets/citi.png";
import nvidia from "../assets/nvidia.png";
import accenture from "../assets/accenture.png";
import noaaura from "../assets/noaaura.png";
import deloitte from "../assets/deloitte.png";
import edelweiss from "../assets/edelweisscopy.png";
import mahindra from "../assets/mahindra.png";
import google from "../assets/google.png";
import theWorldBank from "../assets/theWorldBank.png";
import mcKinsey from "../assets/mcKinsey.png";
import amazon from "../assets/amazon.png";
import visa from "../assets/visa.png";
import hsbc from "../assets/hsbc.png";

const LOGOS = [
  citi,
  nvidia,
  accenture,
  noaaura,
  deloitte,
  edelweiss,
  mahindra,
  google,
  theWorldBank,
  mcKinsey,
  amazon,
  visa,
  hsbc,
];

const TrustableCompanies: React.FC = () => {
  const firstRow = LOGOS.slice(0, Math.ceil(LOGOS.length / 2));
  const secondRow = LOGOS.slice(Math.ceil(LOGOS.length / 2));

  return (
    <section className="w-full bg-white py-10 sm:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">

        {/* FIRST ROW – LEFT ➜ RIGHT */}
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee-left gap-x-10">
            {[...firstRow, ...firstRow].map((logo, index) => (
              <div
                key={`row1-${index}`}
                className="flex items-center justify-center"
                style={{ width: "130px", height: "85px" }}
              >
                <Image
                  src={logo}
                  alt="company logo"
                  className="object-contain"
                  width={130}
                  height={70}
                />
              </div>
            ))}
          </div>
        </div>

        {/* SECOND ROW – RIGHT ➜ LEFT */}
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee-right gap-x-10">
            {[...secondRow, ...secondRow].map((logo, index) => (
              <div
                key={`row2-${index}`}
                className="flex items-center justify-center"
                style={{ width: "130px", height: "50px" }}
              >
                <Image
                  src={logo}
                  alt="company logo"
                  className="object-contain"
                  width={130}
                  height={50}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-marquee-left {
          animation: marqueeLeft 30s linear infinite;
        }

        .animate-marquee-right {
          animation: marqueeRight 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TrustableCompanies;