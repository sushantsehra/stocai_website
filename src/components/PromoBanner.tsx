"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const PROMO_HEIGHT = 56; // px — same height used for spacing

const PromoBanner: React.FC = () => {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full bg-[#014BAA] px-4 py-3 mt-20">
        <div className="mx-auto max-w-7xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-6 lg:gap-8">
          <p className="text-center sm:text-left text-white text-sm sm:text-base md:text-[16px] font-normal font-gotham leading-snug">
            Sign up for the program today and get bonus resources worth 25,000 FREE
          </p>

          <div className="flex justify-center sm:justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-[8px] bg-white px-5 py-2.5 text-sm sm:text-base font-normal font-gotham text-[#014BAA] transition hover:bg-gray-100 active:scale-95"
            >
              Register
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>

      <div style={{ height: PROMO_HEIGHT }} />
    </>
  );
};

export default PromoBanner;