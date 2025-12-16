"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
// import BuiltByLeaders from "./BuiltByLeaders";
import promotableHero1 from "../assets/promotableHero1.png";
import promotableHero2 from "../assets/promotableHero2.png";
import promotableHero3 from "../assets/promotableHero3.png";
import promotableHero4 from "../assets/promotableHero4.png";
import promotableHero5 from "../assets/promotableHero5.png";
import promotableHero6 from "../assets/promotableHero6.png";
import promotableHero7 from "../assets/promotableHero7.png";

interface BePromotableHeroProps {
  images?: (StaticImageData | string)[];
}

const DEFAULT_IMAGES = [
  promotableHero1,
  promotableHero2,
  promotableHero3,
  promotableHero4,
  promotableHero5,
  promotableHero6,
  promotableHero7,
];

// FIXED: removed rounded from props
const ImgTile = ({
  src,
  alt = "",
}: {
  src: StaticImageData | string;
  alt?: string;
}) => {
  return (
    <div
      className="relative overflow-hidden bg-gray-100 rounded-[6px] shadow-inner w-full 
      aspect-square lg:aspect-[auto] lg:h-[113px]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 220px, 33vw"
      />
    </div>
  );
};

const BePromotableHero: React.FC<BePromotableHeroProps> = ({
  images = DEFAULT_IMAGES,
}) => {
  const imgs = [...images];

  while (imgs.length < 7) imgs.push(imgs[imgs.length - 1]);

  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-0 py-6">

        {/* Hero Card */}
        <div className="rounded-2xl overflow-hidden border border-black/5">
          <div
            className="relative text-white"
            style={{
              background:
                "linear-gradient(180deg,#2757a8 0%, #1f4b93 40%, #0e2440 100%)",
            }}
          >
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-black/60" />

            <div className="relative z-10 px-4 sm:px-10 lg:px-12 py-10 lg:py-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center lg:min-h-[460px]">

                {/* Left Content */}
                <div className="lg:col-span-8">
                  <h1 className="font-gotham">
                    <span className="block text-4xl sm:text-5xl lg:text-[72px] leading-tight font-extrabold">
                      #BePromotable.
                    </span>
                    <span className="block text-2xl sm:text-4xl lg:text-[56px] mt-2 tracking-tight text-white/95">
                      Stop Being Overlooked.
                    </span>
                  </h1>

                  <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-lg text-white/90 leading-relaxed">
                    Master the unwritten rules of promotions, build career momentum.
                    <br />
                    A focused 8-week transformation for professionals with 8–18+ years experience.
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <a
                      href="#waitlist"
                      className="inline-flex items-center gap-3 bg-white text-[#11459a] font-medium px-6 py-3 rounded-full shadow-sm hover:shadow-md"
                    >
                      <span>Join the Waitlist</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Right Images */}
                <div className="lg:col-span-4">

                  {/* Desktop image stack */}
                  <div className="hidden lg:flex justify-end">
                    <div className="flex gap-6 items-start">
                      <div className="flex flex-col gap-6 w-[194px] py-16">
                        <ImgTile src={imgs[0]} />
                        <ImgTile src={imgs[1]} />
                        <ImgTile src={imgs[2]} />
                      </div>

                      <div className="grid grid-rows-3 gap-6 w-[194px]">
                        <ImgTile src={imgs[3]} />
                        <ImgTile src={imgs[4]} />
                        <ImgTile src={imgs[5]} />
                        <ImgTile src={imgs[6]} />
                      </div>
                    </div>
                  </div>

                  {/* Mobile / Tablet */}
                  <div className="lg:hidden mt-6">
                    <div className="grid grid-cols-3 gap-3">
                      {imgs.slice(0, 3).map((src, i) => (
                        <ImgTile key={i} src={src} />
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <BuiltByLeaders /> */}
    </header>
  );
};

export default BePromotableHero;