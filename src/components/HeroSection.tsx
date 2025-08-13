"use client";

import React from "react";
import Button from "./Button";
import Image from "next/image";
import panda from "@/assets/panda_main.png";
import background from "@/assets/Stocai_landingpage_bg.png";
import arrow from "@/assets/Arrow_page.png";

const HeroSection = () => {
  return (
    <section
      className=" flex flex-col overflow-x-hidden overflow-y-hidden"
      id="home"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "87vh",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="flex flex-col  lg:flex-row h-full lg:mt-10">
        <div className="w-full lg:w-[50%] mt-[30px] lg:mt-[4.5rem] xl:mt-[10rem] lg:translate-x-10 text-center lg:text-left">
          <h1 className="text-3xl xs:text-4xl md:text-5xl lg:text-[65px] leading-[30px]  md:leading-[45px] lg:leading-[60px] font-quattrocento">
            Think clear
            <br /> Feel better
            <br /> Take control
          </h1>
          <p className=" mt-1 md:mt-3 lg:mt-6 text-base xs:text-lg sm:text-xl md:text-xl lg:text-[22px] xl:text-2xl font-light md:leading-8 leading-4 font-Gotham Light md:pr-10 px-8 md:px-0">
            You already hold the answers—let me help you uncover them
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2 md:gap-4 items-center mt-2 md:mt-4 lg:mt-8 cursor-pointer">
            <Button
              variant="secondary"
              onClick={() => {
                const howStocaiWorksSection = document.getElementById("how-stocai-works");
                if (howStocaiWorksSection) {
                  // Adjust for fixed header
                  const headerOffset = 76;
                  const elementPosition = howStocaiWorksSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  });
                }
              }}
            >
              Learn More
            </Button>
            <Button
              variant="primary"
              onClick={() => window.location.href = "https://clarity.mystocai.com"}
              className="p-4"
            >
              See Stocai in Action
            </Button>
          </div>
        </div>

        <div className="relative w-full lg:w-1/2 flex justify-center md:translate-x-[15%] lg:translate-x-0 items-end mt-10 lg:mt-8">
          <Image
            src={panda}
            alt="Stocai AI assistant"
            className="object-contain h-[33vh] translate-x-20 md:translate-x-0  lg:translate-x-10 -translate-y-5 md:translate-y-0 lg:translate-y-2  xs:h-[30vh] sm:h-[30vh] md:h-[45vh] lg:h-[65vh] xl:h-[75vh] transform scale-x-[-1] sm:right-0"
          />

          {/* Text */}
          <p className="absolute md:top-[2%] lg:top-[6%] xl:top-[10%] top-[-10px] left-[15%] md:left-[23%]  lg:left-[20%] xl:left-[18%] xs:top-[0%] sm:top-[-10%] sm:translate-x-[1px] md:translate-x-[-100px] xs:left-[10%]  sm:left-[10%] text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-[#54B0AF] font-gotham leading-5">
            Hi, I&apos;m Sto - your <br /> introspection and <br /> clarity partner
          </p>

          {/* Arrow Image */}
          <Image
            src={arrow}
            alt="Arrow pointing to text"
            className="absolute top-[15%] md:top-[14%] lg:top-[18%] left-[45%] md:left-[30%] lg:left-[33%] xs:top-[13%] sm:top-[15%] xs:left-[18%] sm:left-[25%] w-[8%] xs:w-[10%]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
