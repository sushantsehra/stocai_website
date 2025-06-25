"use client";

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface BannerProps {
  message: string;
}

const Banner: React.FC<BannerProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Check if banner was previously closed
  // useEffect(() => {
  //   const bannerClosed = localStorage.getItem("bannerClosed");
  //   if (bannerClosed === "true") {
  //     setIsVisible(false);
  //   }
  // }, []);

  const closeBanner = () => {
    setIsVisible(false);
    // localStorage.setItem("bannerClosed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="bg-[#3AA6A6] text-white py-2 text-center relative">
      <p className="font-gotham font-medium text-lg ">{message}</p>
      <button 
        onClick={closeBanner}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors"
        aria-label="Close banner"
      >
        <IoMdClose size={20} />
      </button>
    </div>
  );
};

export default Banner; 