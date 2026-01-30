"use client";

import React, { useState } from "react";
import bclLogo from "../assets/bcl.png";
import Image from "next/image";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

    const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

  return (
    <header className="w-full bg-white mt-2">
      <div className="max-w-full flex justify-between items-center pr-4">
        {/* Logo */}
        <Image
          src={bclLogo}
          alt="BCL Logo"
          width={180}
          height={50}
          // className="object-contain lg:ml-[2%]"
            className="object-contain ml-4 w-[110px] h-auto sm:w-[130px] md:w-[150px] lg:w-[180px]" />

        <div className="flex lg:mr-24">
        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-black/80 font-normal text-[14px] items-center mr-6">
            <button onClick={() => scrollToSection("true-section")} className="hover:text-[#0B64F4] font-jakarta">
              About Us
            </button>
            <button onClick={() => scrollToSection("framework")} className="hover:text-[#0B64F4] font-jakarta">
              Program
            </button>
            <button onClick={() => scrollToSection("faq")} className="hover:text-[#0B64F4] font-jakarta">
              FAQ
            </button>
          </nav>

        {/* Buttons */}
        {/* <div className="flex items-center space-x-3 lg:space-x-4">
          <button  onClick={scrollToWaitlist} className="bg-[#0B64F4] hover:bg-blue-700 text-white text-[14px] px-4 py-2 rounded-[12px] font-bold transition-all">
            Get Early Access
          </button>
          <button className="bg-gradient-to-l from-[#C5C5C5] to-[#FFFFFF] hover:bg-gray-200 text-[#3F3F3F] text-[14px] px-4 py-2 rounded-[12px] font-bold transition-all">
            Sign In / Login
          </button>
        </div> */}

        <div className="flex items-center space-x-3 lg:space-x-4">
          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <button
              onClick={scrollToWaitlist}
              className="bg-[#0B64F4] hover:bg-blue-700 text-white text-[14px] px-4 py-2 rounded-[12px] font-jakarta font-bold transition-all"
            >
              Get Early Access
            </button>

            <button className="bg-gradient-to-l from-[#C5C5C5] to-[#FFFFFF] hover:bg-gray-200 text-[#3F3F3F] font-jakarta text-[14px] px-4 py-2 rounded-[12px] font-bold transition-all">
              Sign In / Login
            </button>
          </div>

          {/* Mobile Hamburger */}

            <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-[4px] rounded-[4px] shadow-3xl border border-gray-100 p-2"
          >
            <span className="w-5 h-[2.5px] bg-[#7A7777]"></span>
            <span className="w-5 h-[2.5px] bg-[#7A7777]"></span>
            <span className="w-5 h-[2.5px] bg-[#7A7777]"></span>
          </button>
          </div>
    
        </div>

        </div>

      {menuOpen && (
        <div className="md:hidden fixed top-20 right-14 bg-white rounded-[16px] shadow-xl p-2.5 w-[220px] z-[9999]">
          <div className="flex flex-col gap-2.5 text-[14px] font-medium">
            <button onClick={() => {setMenuOpen(false); scrollToSection("framework")}} className="text-black/80 hover:text-[#0B64F4] font-jakarta">
              About Us
            </button>
            <button onClick={() => {setMenuOpen(false); scrollToSection("waitlist")}} className="text-black/80 hover:text-[#0B64F4] font-jakarta">
              Program
            </button>
            <button onClick={() => {setMenuOpen(false); scrollToSection("faq")}} className="text-black/80 hover:text-[#0B64F4] font-jakarta">
              FAQ
            </button>

            <hr />

            <button
              // onClick={scrollToWaitlist}
              onClick={() => {
                scrollToWaitlist();
                setMenuOpen(false);
              }}
              className="bg-[#0B64F4] text-white py-2 rounded-[4px] font-jakarta font-bold"
            >
              Get Early Access
            </button>

            <button onClick={() => setMenuOpen(false)} className="bg-gradient-to-l from-[#C5C5C5] to-[#FFFFFF] text-[#3F3F3F] py-2 rounded-[4px] font-jakarta font-bold">
              Sign In / Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;