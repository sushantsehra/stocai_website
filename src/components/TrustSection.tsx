"use client";

import Image from "next/image";
import { Crown } from "lucide-react";
// import nvidia from "../assets/foundernvidia.png";
import accenture from "../assets/founderaccenture.png";
// import citi from "../assets/founderCiti.png";
// import iimt from "../assets/iimt.png";
// import edelweiss from "../assets/edelweiss.png";
// import iimc from "../assets/iimc.png";
// import texas from "../assets/texas.png";
// import kings from "../assets/kings.png";
import founder from "../assets/founder.jpg";
// import founderEdelweiss from "../assets/founderEdelweiss.png";
// import founderNVI from "../assets/founderNVI.png";
// import founderIMT from "../assets/founderIMT.png";
// import founderIIMC from "../assets/founderIIMC.png";
import founderKing from "../assets/founderKing.png";
// import founderTex from "../assets/founderTex.png";
import iimcwhitelogo from "../assets/iimcwhitelogo.png";  
import edelweisswhitelogo from "../assets/edelweisswhitelogo.png";  
import imtwhitelogo from "../assets/imtwhitelogo.png";  
// import kingswhitelogo from "../assets/Kclblacklogo.svg";  
import nvidiablacklogo from "../assets/nvidiablacklogo.png";
// import accentureblacklogo from "../assets/accentureblacklogo.svg";
import citiblacklogo from "../assets/citiblacklogo.png";
import BuiltBy from "./BuiltBy";
import University_of_Texas_at_Austin_logo from "../assets/University_of_Texas_at_Austin_logo.png";
// import Kcllogo from "../assets/Kcllogo.png";


interface Stat {
  label: string;
  value: number;
}

const TrustSection = () => {
  const stats: Stat[] = [
    { label: "PROMOTION CYCLES OBSERVED", value: 125 },
    { label: "PROMOTIONS INFLUENCED", value: 25 },
    { label: "PITCHES REVIEWED", value: 200 },
    { label: "BOSSES SERVED", value: 61 },
  ];

  const companies = [
    { name: "NVIDIA", logo: nvidiablacklogo },
    { name: "Accenture", logo: accenture },
    { name: "Citi", logo: citiblacklogo },
    { name: "IIMC", logo: iimcwhitelogo },
    { name: "Edelweiss", logo: edelweisswhitelogo },
    { name: "IMT", logo: imtwhitelogo },
    // { name: "IMT", logo: founderIMT },
    // { name: "Edelweiss", logo: edelweiss },
    // { name: "IIMC", logo: founderIIMC },
    { name: "Texas", logo: University_of_Texas_at_Austin_logo},
    // { name: "Kings", logo: founderKing},
    { name: "Kings", logo: founderKing},
  ];

  return (
    <section className="py-8 px-2 bg-white">
      <div className="max-w-full relative z-50 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold text-[#0F1729] mb-4">
              Who are we and{" "}
              <span className="text-[#0B64F4]">why should you trust us?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-[18px] text-black font-normal mb-4">
              We&apos;re not motivational speakers or LinkedIn influencers peddling
              platitudes. And we&apos;re not here to sell you empty confidence.
            </p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#000000] mb-4 md:mt-20">
              We&apos;ve been overlooked. We&apos;ve figured out why.
            </h3>
            <p className="text-sm sm:text-base text-black font-normal mb-6">
              And we&apos;ve learned how to unblock career growth, without becoming
              someone we&apos;re not. Now, we help capable professionals like you
              stop second-guessing themselves and start moving forward with
              intent.
            </p>
            <p className="text-sm sm:text-base text-black font-normal mb-2">
              Our team brings together expertise in{" "}
              <span className="text-[#0B64F4] font-bold">
                psychology, neuroscience, marketing, HR, business strategy,
                coaching, behavioural science, and more
              </span>
              .
            </p>
            <p className="text-lg sm:text-xl font-bold text-black mt-6 md:mt-16">
              We&apos;re rooting for you.
            </p>
          </div>

          {/* Right Section (Founder Card) */}
          <div className="relative z-50 rounded-3xl my-10 lg:my-0 shadow-2xl border-2 border-[#D5D5D5] overflow-hidden min-w-[400px] max-w-[442.999988143542px] mx-auto transform rotate-[10deg] hover:rotate-0 transition-transform duration-500">
            {/* Top White Section */}
            <div className="bg-white text-center py-6 relative z-10 min-h-[130px]">
              <h3 className="text-lg sm:text-xl lg:text-[14px] font-semibold text-black tracking-wider">
                CORPORATE MAFIAS
              </h3>
            </div>

            {/* Overlapping Profile */}
            <div className="absolute top-[30px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              <div className="relative">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-gradient-to-b from-[#0B63F2] to-[#0F2479] shadow-lg mt-4 lg:mt-8 p-1">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#0B63F2] to-[#0F2479]">
                        <Image
                        src={founder}
                        alt="Sushant Sehra"
                        fill
                        className="object-cover rounded-full p-1"
                        priority
                        />
                    </div>
                </div>
                <div className="absolute bottom-3.5 right-0.5 bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Bottom Black Section */}
            <div className="bg-gradient-to-b from-slate-900 to-black text-white pt-24 pb-10 px-8 sm:px-10 ">
              {/* Name and Role */}
              <div className="text-center mb-6">
                <h3
                className="
                    text-lg sm:text-xl font-bold tracking-wide
                    text-transparent bg-clip-text
                    bg-[radial-gradient(circle_at_top,#FFFFFF_0%,#BDBDBD_40%,#717171_75%)]
                "
                >
                SUSHANT SEHRA
                </h3>

                <p
                className="
                    text-sm sm:text-base font-medium
                    text-transparent bg-clip-text
                    bg-[radial-gradient(circle_at_top,#FFFFFF_0%,#BDBDBD_40%,#717171_75%)]
                "
                >
                FOUNDER
                </p>
              </div>

              {/* Stats Section */}
              <div className="space-y-3 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xs sm:text-sm lg:text-[12px] font-medium text-[#9F9F9F] tracking-wide">
                      {stat.label}
                    </span>
                    <span className="text-white font-bold">:</span>
                    <span className="text-lg sm:text-xl lg:text-[14px] text-white font-semibold">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-[#E3E3E3] mt-6 mb-2" />

              {/* Tagline */}
              <div className="text-center mb-8">
                <p className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#FFFFFF] font-bold uppercase">
                  Built by Top B-School graduates and{" "}
                  <br />
                  <span 
                //   className="font-semibold text-blue-400"
                   className="
                    text-lg sm:text-xl font-bold tracking-wide
                    text-transparent bg-clip-text
                    bg-[radial-gradient(circle_at_top,#FFFFFF_0%,#BDBDBD_40%,#0B64F4_85%)]
                ">
                    Corporate Leaders
                  </span>
                </p>
              </div>

              {/* Company Logos */}
              <div className="grid grid-cols-3 gap-5 justify-items-center">
                {companies.map((company, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center grayscale-0 hover:grayscale-0 transition-all duration-300"
                  >
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={140}
                      height={50}
                      className="object-contain max-h-10"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <BuiltBy />
      </div>
    </section>
  );
};

export default TrustSection;