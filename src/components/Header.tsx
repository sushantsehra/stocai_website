import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";
import Banner from "./Banner";
import StocaiLogo from "../assets/Stocai_logo_header.png";

export default function Header() {
  return (
    <>
      {/* Placeholder div to prevent content jump when header becomes fixed */}
      <div className="h-[100px]"></div>
      
      <header className="fixed top-0 left-0 right-0 bg-white z-30">
        <Banner message="Stocai is guiding you through beta, and will guide you better in the future" />
        
        <div className="px-4 py-6 bg-white">
          <div className="flex items-center justify-between">
            <Link href="/" className="cursor-pointer z-50">
              <Image 
                src={StocaiLogo} 
                alt="Stocai Logo" 
                priority
                width={168}
                height={64}
                className="w-[168px] h-[64px] object-contain"
              />
            </Link>
            
            <div className="flex-grow flex justify-center relative">
              <Navbar />
            </div>
          </div>
        </div>
      </header>
    </>
  );
} 