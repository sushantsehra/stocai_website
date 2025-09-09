import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarStocai from "./NavbarStocai";
import Banner from "./Banner";
import StocaiLogo from "../assets/stocai_logo_header.svg";

export default function Header() {
  return (
    <>
      {/* Placeholder div to prevent content jump when header becomes fixed */}
      <div className="h-[100px]"></div>
      
      <header className="fixed top-0 left-0 right-0 bg-white z-30">
        <Banner message="Stocai is guiding you through beta, and will guide you better in the future" />
        
        <div className="px-4 py-6 bg-white">
          <div className="flex items-center justify-between">
            <Link href="/" className="cursor-pointer z-50 flex items-center">
              <Image 
                src={StocaiLogo} 
                alt="Stocai Logo" 
                priority
                width={145}
                height={55}
                className="w-[145px] h-[55px] ml-3 mt-0.5 object-contain cursor-pointer"
              />
            </Link>
            
            <div className="flex-grow flex justify-center items-center relative">
              <NavbarStocai />
            </div>
          </div>
        </div>
      </header>
    </>
  );
} 