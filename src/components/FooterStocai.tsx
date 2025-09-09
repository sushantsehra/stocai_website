"use client";

import React from "react";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const FooterStocai = () => {
  return (
    <footer className="bg-white text-black">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Stocai Branding and Description */}
          <div className="lg:col-span-3">
            <div className="mb-6 bg-[#54B0AF] px-6 py-6 rounded-2xl">
              <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2498018a7aa54e368309040e860d712766630c48?placeholderIfAbsent=true&apiKey=9c47c8fe42574ef895739bbf025ada2f"
                alt="Stocai Logo"
                width={236}
                height={59}
                className="object-contain max-w-full"
              />
              <p className="text-white/90 font-gotham font-medium text-sm lg:text-base mt-4 leading-relaxed">
                Stocai helps professionals turn confusion and overthinking into
                confident decisions in minutes through guided self-coaching. We
                cut through mental noise and surface clear next steps. Private
                by default, built on psychology-backed frameworks, not generic
                AI advice. Trusted by thousands worldwide to make faster,
                calmer, and better choices.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:mt-20">
            <h3 className="text-lg text-[#54B0AF] font-bold font-gotham mb-4">
              Quick Links
            </h3>
            <nav className="space-y-3">
              <Link
                href="/"
                className="block text-[#323232] font-gotham font-normal hover:text-black/80 transition-colors"
              >
                Stocai Home
              </Link>
              <Link
                href="/how-it-works"
                className="block text-[#323232] font-gotham font-normal hover:text-black/80 transition-colors"
              >
                How it works
              </Link>
              <Link
                href="/terms"
                className="block text-[#323232] font-gotham font-normal hover:text-black/80 transition-colors"
              >
                Terms & Conditions
              </Link>
            </nav>
          </div>

            {/* Stay Connected */}
            <div className="lg:mt-20">
              <h3 className="text-lg text-[#54B0AF] font-bold font-gotham mb-4">
                Stay connected
              </h3>
              <div className="space-y-3">
                <Link
                  href="https://www.linkedin.com/company/mystocai/"
                  aria-label="LinkedIn"
                  className="flex items-center space-x-2 hover:opacity-80 transition"
                >
                  <IoLogoLinkedin className="w-5 h-5 text-[#54B0AF]" />
                  <span className="text-[#323232] font-gotham font-normal">
                    mystocai
                  </span>
                </Link>
                <Link
                  href="https://www.instagram.com/my_stocai/"
                  aria-label="Instagram"
                  className="flex items-center space-x-2 hover:opacity-80 transition"
                >
                  <RiInstagramFill className="w-6 h-6 text-[#54B0AF]" />
                  <span className="text-[#323232] font-gotham font-normal">
                    my_stocai
                  </span>
                </Link>
                <Link
                  href="https://x.com/my_stocai"
                  aria-label="Twitter"
                  className="flex items-center space-x-2 hover:opacity-80 transition"
                >
                  <FaXTwitter className="w-5 h-5 text-[#54B0AF]" />
                  <span className="text-[#323232] font-gotham font-normal">
                    my_stocai
                  </span>
                </Link>
              </div>
            </div>

            {/* Contact Us */}
            <div className="lg:mt-20">
              <h3 className="text-lg text-[#54B0AF] font-bold font-gotham mb-4">
                Contact us
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-[#323232] font-gotham font-normal">
                  Pune, MH, India
                </p>
                <p className="text-[#323232] font-gotham font-normal">
                  director@mystocai.com
                </p>
                <p className="text-[#323232] font-gotham font-normal">
                  +91 88604 03799
                </p>
              </div>
            </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-black/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm font-gotham font-normal text-[#323232]">
            <p>Copyright © 2025</p>
            <p className="mt-2 sm:mt-0">Stocai 109 Technology Pvt Ltd</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterStocai;

// import React from 'react';
// import { RiInstagramFill } from "react-icons/ri";
// import { IoLogoLinkedin } from "react-icons/io5";
// import { FaXTwitter } from "react-icons/fa6";
// import Link from 'next/link';
// import Image from "next/image";

// const FooterStocai = () => {
//   return (
//     <footer className="bg-white text-black">
//       {/* Main Footer Content */}
//       <div className="container mx-auto px-4 py-8 lg:py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Stocai Branding and Description */}
//           <div className="lg:col-span-2">
//             <div className="mb-6 bg-[#54B0AF] px-4 py-5 rounded-2xl">
//               {/* <h2 className="text-3xl lg:text-4xl mb-4 font-gotham font-bold text-white">
//                 stocai
//               </h2> */}
//                             <Image
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/2498018a7aa54e368309040e860d712766630c48?placeholderIfAbsent=true&apiKey=9c47c8fe42574ef895739bbf025ada2f"
//                 alt="Stocai Logo"
//                 width={236}
//                 height={59}
//                 className="object-contain max-w-full aspect-[4] w-[236px]"
//               />
//               <p className="text-white font-gotham font-medium leading-light text-sm lg:text-base max-w-lg mt-4">
//                 Stocai helps professionals turn confusion and overthinking into confident 
//                 decisions in minutes through guided self-coaching. We cut through 
//                 mental noise and surface clear next steps. Private by default, built on 
//                 psychology-backed frameworks, not generic AI advice. Trusted by 
//                 thousands worldwide to make faster, calmer, and better choices.
//               </p>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h3 className="text-lg text-[#54B0AF] font-bold font-gotham mb-4">
//               Quick Links
//             </h3>
//             <nav className="space-y-3">
//               <Link 
//                 href="/" 
//                 className="block text-[#323232] font-gotham font-normal hover:text-black/80 transition-colors duration-200"
//               >
//                 Stocai Home
//               </Link>
//               <Link 
//                 href="/how-it-works" 
//                 className="block text-[#323232] font-gotham font-normal hover:text-black/80 transition-colors duration-200"
//               >
//                 How it works
//               </Link>
//               <Link 
//                 href="/terms" 
//                 className="block text-[#323232] font-gotham font-normal hover:text-black/80 transition-colors duration-200"
//               >
//                 Terms & Conditions
//               </Link>
//             </nav>
//           </div>

//           {/* Stay Connected & Contact */}
//           <div className="space-y-6">
//             {/* Stay Connected */}
//             <div>
//               <h3 className="text-lg text-[#54B0AF] font-bold font-gotham mb-4">
//                 Stay connected
//               </h3>
//               <div className="space-y-3">
//                 <Link href="https://www.linkedin.com/company/mystocai/"
//                     aria-label="LinkedIn" className="flex items-center space-x-2">
//                   <IoLogoLinkedin className="w-5 h-5 text-[#54B0AF]" />
//                   <span className="text-[#323232] font-gotham font-normal">mystocai</span>
//                 </Link>
//                 <Link href="https://www.instagram.com/my_stocai/"
//                     aria-label="Social media" className="flex items-center space-x-2">
//                   <RiInstagramFill className="w-6 h-6 text-[#54B0AF]" />
//                   <span className="text-[#323232] font-gotham font-normal">my_stocai</span>
//                 </Link>
//                 <Link href="https://x.com/my_stocai"
//                     aria-label="Twitter" className="flex items-center space-x-2">
//                   <FaXTwitter className="w-5 h-5 text-[#54B0AF]" />
//                   <span className="text-[#323232] font-gotham font-normal">my_stocai</span>
//                 </Link>
//               </div>
//             </div>

//             {/* Contact Us */}
//             <div>
//               <h3 className="text-lg text-[#54B0AF] font-bold font-gotham mb-4">
//                 Contact us
//               </h3>
//               <div className="space-y-2 text-sm">
//                 <p className="text-[#323232] font-gotham font-normal">Pune, MH, India</p>
//                 <p className="text-[#323232] font-gotham font-normal">director@mystocai.com</p>
//                 <p className="text-[#323232] font-gotham font-normal">+91 88604 03799</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Copyright Bar */}
//       <div className="border-t border-black/20">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex flex-col sm:flex-row justify-between items-center text-sm font-gotham font-normal text-[#323232]">
//             <p>Copyright © 2025</p>
//             <p className="mt-2 sm:mt-0">Stocai 109 Technology Pvt Ltd</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default FooterStocai;