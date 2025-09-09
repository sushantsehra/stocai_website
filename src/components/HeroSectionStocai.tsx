"use client";

import React from "react";
import Button from "./Button";
import background from "@/assets/Stocai_landingpage_bg.png";
// import user1 from "@/assets/user1.jpg";
import user2 from "@/assets/user2.jpg";
import svg_linestroke from "@/assets/svg_linestroke.png";
import Image from "next/image";

const HeroSectionStocai = () => {
  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden relative"
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
      {/* Background gradient elements */}
      {/* <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-[#54B0AF]/20 to-transparent rounded-full blur-3xl"></div> */}
      <div className="absolute top-20 right-5 w-20 h-20 bg-gradient-to-bl from-teal-400 to-transparent rounded-full opacity-100 blur-3xl"></div>
      <div className="absolute top-48 right-20 w-20 h-20 bg-gradient-to-bl from-teal-500 to-transparent rounded-full opacity-100 blur-3xl"></div>
      <div className="absolute top-0 -left-0 w-56 h-80 bg-gradient-to-tr from-teal-400 to-transparent rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-gradient-to-tl from-[#54B0AF]/15 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-gradient-to-r from-[#54B0AF]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center mt-[-150px] sm:mt-0">
        {/* User avatars and sessions completed */}
        <div className="flex justify-center items-center mb-8 sm:mb-12  md:mt-[-20px]">
          <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg border border-[#54B0AF50]  md:mt-[-20px]">
            <div className="flex -space-x-2 mr-3 sm:mr-4">
              <div className=" rounded-full flex items-center justify-center text-white text-xs font-bold">
                <Image src={user2} alt="user" height={20} width={22} className="rounded-full cover" />
              </div>
              <div className=" rounded-full flex items-center justify-center text-white text-xs font-bold">
                <Image src={user2} alt="user" height={20} width={22} className="rounded-full cover" />
              </div>
              <div className=" rounded-full flex items-center justify-center text-white text-xs font-bold">
                <Image src={user2} alt="user" height={20} width={22} className="rounded-full cover" />
              </div>
              <div className=" rounded-full flex items-center justify-center text-white text-xs font-bold">
                <Image src={user2} alt="user" height={20} width={22} className="rounded-full cover" />
              </div>
            </div>
            <span className="text-xs sm:text-sm text-gray-600 font-medium font-gotham">
              1,000+ sessions completed
            </span>
          </div>
        </div>

        {/* Main heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-light text-gray-800 leading-tight">
            <span className="text-[#54B0AF] font-quattrocento font-bold">From Overthinking to </span>
            <span className="relative inline-block">
              <span className="text-[#54B0AF] font-quattrocento font-bold">Clarity.</span>
              <Image src={svg_linestroke} alt="linestroke" width={200} height={250} className="top-5.5 md:top-12 absolute" />
            </span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl mt-2 md:mt-0 text-[#54B0AF] font-quattrocento font-bold">In just </span>
            <span className="relative inline-block">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl text-[#54B0AF] font-quattrocento font-bold">minutes.</span>

               {/* <Image src={svg_linestroke} alt="linestroke" width={200} height={200} className="top-6 md:top-12 absolute" /> */}
              <svg
                className="absolute -left-1 -bottom-6 lg:-bottom-5 w-full h-[80px] md:h-[110px]"
                viewBox="0 0 880 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="440" cy="160" rx="440" ry="120"
                  stroke="black"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <svg
                className="absolute left-0 -bottom-5.5 lg:-bottom-4.5 w-full h-[80px] md:h-[110px]"
                viewBox="0 0 880 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="440" cy="160" rx="445" ry="120"
                  stroke="black"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h1>
        </div>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl font-medium font-gotham lg:text-xl text-[#323232] font-light mb-4 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
          Guided self-coaching that turns mental spirals into clear next steps.
          <br />
          <span className="font-medium text-[#323232] font-gotham">Free during beta.</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
        
          <Button
            onClick={() => window.location.href = "https://clarity.mystocai.com"}
            variant="tertiary"
            className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium rounded-full bg-[#54B0AF] text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-gotham"
          >
            Start Free Session
          </Button>

          {/* <Button
            variant="normal"
                onClick={() => {
                const howStocaiWorksSection = document.getElementById("stocai-faqs");
                if (howStocaiWorksSection) {
                  const headerOffset = 76;
                  const elementPosition = howStocaiWorksSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  });
                }
              }}
            className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium rounded-full border-2 border-[#54B0AF] text-teal transition-all duration-300 transform hover:scale-105 bg-white backdrop-blur-sm font-gotham"
          >
            Know more
          </Button> */}
        </div>

        {/* Bottom disclaimer */}
        <p className="text-sm sm:text-base text-gray-500 font-normal font-gotham">
          Private by default. No card required.
        </p>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/30 to-transparent"></div>
    
    </section>
  );
};

export default HeroSectionStocai;