"use client";

import Image from "next/image";
import leftside_img from "@/assets/leftside_img.png";
import rightside_img from "@/assets/rightside_img.png";
import SectionBottom from "@/assets/SectionBottom.png";
import SectionTop from "@/assets/SectionTop.png";
import teal_circle from "@/assets/teal_circle.png";

const ProfessionalHeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Left side image with teal circle */}
      <div className="absolute left-4 lg:left-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="relative w-64 h-80 xl:w-[300px] xl:h-[900px] rounded-2xl overflow-hidden">
          {/* Circle Behind */}
               <div className="absolute bottom-20 z-10 left-20 w-20 h-20 bg-gradient-to-bl from-teal-500 to-transparent rounded-full opacity-100 blur-3xl"></div>
          {/* Foreground Image */}
          <Image
            src={leftside_img}
            alt="Left side feature image"
            fill
            className="object-cover relative z-50 rounded-2xl"
          />
        </div>
      </div>

      {/* Right side image with teal circle */}
      <div className="absolute right-4 lg:right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="relative w-64 h-80 xl:w-[300px] xl:h-[900px] rounded-2xl overflow-hidden">
          {/* Circle Behind */}
          <Image
            src={teal_circle}
            alt="teal-circle"
            width={260}
            height={260}
            className="absolute -bottom-10 -right-10 z-0"
          />
          {/* Foreground Image */}
          <Image
            src={rightside_img}
            alt="Right side feature image"
            fill
            className="object-cover relative z-10 rounded-2xl"
          />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden flex flex-col items-center gap-8 py-12 relative z-10">
        {/* First image - Left side image */}
        <div className="relative w-[360px] h-60 rounded-xl overflow-hidden">
          <Image
            src={teal_circle}
            alt="teal-circle"
            width={180}
            height={180}
            className="absolute -bottom-8 -left-8 z-0"
          />
          <Image
            src={SectionTop}
            alt="Top feature image"
            fill
            className="object-cover relative z-10 rounded-xl"
          />
        </div>

        {/* Central content for mobile */}
        <div className="text-center max-w-2xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-gotham font-semibold text-[#54B0AF] leading-light">
            Thousands of professionals
          </h1>
          <h1 className="text-3xl md:text-4xl font-gotham font-semibold text-[#54B0AF] leading-light">
            have changed their life 
          </h1>
          <h1 className="text-3xl md:text-4xl font-gotham font-semibold text-[#54B0AF] mb-6 leading-light">
            for the better.
          </h1>

          <h2 className="text-2xl md:text-3xl font-gotham font-semibold text-[#54B0AF] mb-8">
            What are you waiting for?
          </h2>

          <p className="text-sm md:text-base font-gotham font-semibold text-[#484848] mb-8 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {"Private, simple, and proven to work for busy professionals.\nDon't keep overthinking when clarity is just a click away."}
          </p>

          {/* CTA Button */}
          <button
            onClick={() => (window.location.href = "https://clarity.mystocai.com")}
            className="bg-[#54B0AF] font-gotham font-bold hover:bg-teal-600 text-white py-3 px-8 md:py-4 md:px-10 rounded-full text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start Free Session
          </button>
        </div>

        {/* Second image - Right side image */}
        <div className="relative  w-[360px] h-60 rounded-xl overflow-hidden">
          <Image
            src={teal_circle}
            alt="teal-circle"
            width={180}
            height={180}
            className="absolute -bottom-8 -right-8 z-0"
          />
          <Image
            src={SectionBottom}
            alt="Bottom feature image"
            fill
            className="object-cover relative z-10 rounded-xl"
          />
        </div>
      </div>

      {/* Central content for large screens only */}
      <div className="relative z-20 hidden lg:flex items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-2xl mx-auto px-">
          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-gotham font-semibold text-[#54B0AF] leading-snug">
            Thousands of professionals
          </h1>
          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-gotham font-semibold text-[#54B0AF] leading-snug">
            have changed their life for
          </h1>
          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-gotham font-semibold text-[#54B0AF] mb-6 leading-snug">
            the better.
          </h1>

          <h2 className="text-2xl md:text-3xl lg:text-[44px] font-gotham font-semibold text-[#54B0AF] mb-8">
            What are you waiting for?
          </h2>

          <p className="text-sm md:text-base lg:text-lg font-gotham font-semibold text-[#484848] mb-8 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {"Private, simple, and proven to work for busy professionals.\nDon't keep overthinking when clarity is just a click away."}
          </p>

          {/* CTA Button */}
          <button
            onClick={() => (window.location.href = "https://clarity.mystocai.com")}
            className="bg-[#54B0AF] font-gotham font-bold hover:bg-teal-600 text-white py-3 px-8 md:py-4 md:px-10 rounded-full text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start Free Session
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalHeroSection;

// "use client";

// import Image from "next/image";
// import leftside_img from "@/assets/leftside_img.png";
// import rightside_img from "@/assets/rightside_img.png";
// import teal_circle from "@/assets/teal_circle.png";

// const ProfessionalHeroSection = () => {
//   return (
//     <section className="relative bg-white overflow-hidden">
//       {/* Left side image with teal circle */}
//       <div className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
//         <div className="relative w-64 h-80 xl:w-[350px] xl:h-[900px] rounded-2xl overflow-hidden">
//           {/* Circle Behind */}
//                <div className="absolute bottom-20 z-10 left-20 w-20 h-20 bg-gradient-to-bl from-teal-500 to-transparent rounded-full opacity-100 blur-3xl"></div>
//           {/* Foreground Image */}
//           <Image
//             src={leftside_img}
//             alt="Left side feature image"
//             fill
//             className="object-cover relative z-50 rounded-2xl"
//           />
//         </div>
//       </div>

//       {/* Right side image with teal circle */}
//       <div className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
//         <div className="relative w-64 h-80 xl:w-[350px] xl:h-[900px] rounded-2xl overflow-hidden">
//           {/* Circle Behind */}
//           <Image
//             src={teal_circle}
//             alt="teal-circle"
//             width={260}
//             height={260}
//             className="absolute -bottom-10 -right-10 z-0"
//           />
//           {/* Foreground Image */}
//           <Image
//             src={rightside_img}
//             alt="Right side feature image"
//             fill
//             className="object-cover relative z-10 rounded-2xl"
//           />
//         </div>
//       </div>

//       {/* Mobile layout */}
//       <div className="lg:hidden flex flex-col items-center gap-8 py-12 relative z-10">
//         {/* Top image */}
//         <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-xl overflow-hidden shadow-lg">
//           <Image
//             src={teal_circle}
//             alt="teal-circle"
//             width={180}
//             height={180}
//             className="absolute -bottom-8 -left-8 z-0"
//           />
//           <Image
//             src={leftside_img}
//             alt="Left side feature image"
//             fill
//             className="object-cover relative z-10 rounded-xl"
//           />
//         </div>

//         {/* Bottom image */}
//         <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-xl overflow-hidden shadow-lg">
//           <Image
//             src={teal_circle}
//             alt="teal-circle"
//             width={180}
//             height={180}
//             className="absolute -bottom-8 -right-8 z-0"
//           />
//           <Image
//             src={rightside_img}
//             alt="Right side feature image"
//             fill
//             className="object-cover relative z-10 rounded-xl"
//           />
//         </div>
//       </div>

//       {/* Central content */}
//       <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
//         <div className="text-center max-w-2xl mx-auto">
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-gotham font-semibold text-[#54B0AF] leading-snug">
//             Thousands of professionals
//           </h1>
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-gotham font-semibold text-[#54B0AF] leading-snug">
//             have changed their life for
//           </h1>
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-gotham font-semibold text-[#54B0AF] mb-6 leading-snug">
//             the better.
//           </h1>

//           <h2 className="text-2xl md:text-3xl lg:text-5xl font-gotham font-semibold text-[#54B0AF] mb-8">
//             What are you waiting for?
//           </h2>

//           <p className="text-sm md:text-base lg:text-lg font-gotham font-semibold text-[#484848] mb-8 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
//             {"Private, simple, and proven to work for busy professionals.\nDon't keep overthinking when clarity is just a click away."}
//           </p>

//           {/* CTA Button */}
//           <button
//             onClick={() => (window.location.href = "https://clarity.mystocai.com")}
//             className="bg-[#54B0AF] font-gotham font-bold hover:bg-teal-600 text-white py-3 px-8 md:py-4 md:px-10 rounded-full text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
//           >
//             Start Free Session
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProfessionalHeroSection;