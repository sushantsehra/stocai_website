"use client";

import React from "react";
import Link from "next/link";
import bclLogo from "../assets/bclLogo.png";
import Image from "next/image";

const Header = () => {
    const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          className="object-contain lg:ml-[2%]"
        />

        <div className="flex lg:mr-24">
        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-black/80 font-normal text-[14px] items-center mr-6">
          <Link href="#about" className="hover:text-[#0B64F4] transition-colors">
            About Us
          </Link>
          <Link href="#program" className="hover:text-[#0B64F4] transition-colors">
            Program
          </Link>
          <Link href="#faq" className="hover:text-[#0B64F4] transition-colors">
            FAQ
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex items-center space-x-3 lg:space-x-4">
          {/* <Link href="#waitlist" scroll={true}> */}
          <button  onClick={scrollToWaitlist} className="bg-[#0B64F4] hover:bg-blue-700 text-white text-[14px] px-4 py-2 rounded-[12px] font-bold transition-all">
            Get Early Access
          </button>
          {/* </Link> */}
          <button className="bg-gradient-to-l from-[#C5C5C5] to-[#FFFFFF] hover:bg-gray-200 text-[#3F3F3F] text-[14px] px-4 py-2 rounded-[12px] font-bold transition-all">
            Sign In / Login
          </button>
        </div>

        </div>
      </div>
    </header>
  );
};

export default Header;