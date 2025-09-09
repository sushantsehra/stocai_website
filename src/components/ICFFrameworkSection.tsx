import React from 'react';
import Image from 'next/image';
// import ifc_img from "@/assets/ifc_image.png";
import icf from "@/assets/icf.png";
// import stocai_image from "@/assets/stocai_image.jpeg";
// import ifc1 from "@/assets/ifc1.jpeg";
// import ifc2 from "@/assets/ifc2.jpeg";
import ifc_women from "@/assets/ifc_women.jpeg";

const ICFFrameworkSection = () => {
  return (
    <section className="w-full bg-[#54B0AF] py-12 md:py-16 lg:py-0">
      <div className="max-w-full mx-auto  ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Images */}
          <div className="relative flex items-center justify-center lg:justify-start">
            {/* Main Featured Person */}
            <div className="relative z-10 w-[400px] h-92 sm:h-[700px] md:w-[700px] md:h-full mx-auto lg:mx-0">
              {/* <Image src={ifc_img} alt="ifc" width={700} /> */}
              {/* <Image src={ifc_img} alt="ifc" width={700} /> */}
              <Image src={ifc_women} alt="ifc" width={700} />
              {/* <Image src={ifc1} alt="ifc" width={700} />
              <Image src={ifc2} alt="ifc" width={700} /> */}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-white space-y-6 lg:space-y-8 px-4 sm:px-6 pl-5 sm:pl-0 lg:px-0 lg:pr-8">
            {/* Main Heading */}
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-gotham leading-tight">
                Created on ICF Framework
              </h2>
              <p className="text-lg md:text-xl font-bold font-gotham">
                Used by 50,000+ coaches globally
              </p>
            </div>

            {/* ICF Logo Placeholder */}
            <div className="w-32 h-16 rounded-xl flex items-center justify-center">
              <Image src={icf} alt="icf" width={200} height={100} />
            </div>

            {/* Subheading */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-gotham leading-tight">
                Built with Expert Coaches, Backed by Applied Science
              </h3>
              
              {/* Description */}
              <p className="text-base md:text-lg leading-normal font-gotham opacity-90 max-w-lg">
                Walk away with clarity, list of action items, and peace of mind. 
                Thoughtful questions and prompts take you through mental noise. 
                Better alternative than using a generic AI tool.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ICFFrameworkSection;