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
  return (
    <section className="w-full bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Logo Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {LOGOS.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
              style={{
                width: "130px",
                height: "50px",
              }}
            >
              <Image
                src={logo}
                alt="company logo"
                className="object-contain"
                width={130}
                height={50}
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustableCompanies;