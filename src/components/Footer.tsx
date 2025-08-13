"use client";

import React from "react";
import { RiInstagramFill } from "react-icons/ri";
// import { FaYoutube } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col pt-16 pb-8 bg-[#54B0AF] max-md:max-w-full">
      <div className="flex flex-col container mx-auto items-start px-14 w-full max-md:px-5 max-md:max-w-full">
        <div className="self-stretch justify-around   w-full  grid sm:grid-cols-1 lg:grid-cols-3 md:gap-10 gap-8 ">
          <div className=" max-md:ml-0 max-md:w-full">
            <div className="text-xl leading-6 text-white max-md:mt-10">
              <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2498018a7aa54e368309040e860d712766630c48?placeholderIfAbsent=true&apiKey=9c47c8fe42574ef895739bbf025ada2f"
                alt="Stocai Logo"
                width={236}
                height={59}
                className="object-contain max-w-full aspect-[4] w-[236px]"
              />
              <p className="mt-4 font-gotham md:text-[14px] lg:text-xl text-white lg:pr-10 leading-[24px]">
                Think clear. Feel better. Take control. You already hold the
                answers—let me help you uncover them.
              </p>
              <div>
                <div className="lg:mt-9 mt-6 text-xl tracking-normal font-gotham leading-[18px] text-white">
                  Follow us for growth tips!
                </div>
                <div className="flex gap-4 items-center mt-8 max-md:ml-2">
                  <Link
                    href="https://www.instagram.com/my_stocai/"
                    aria-label="Social media"
                    className="flex shrink-0 self-stretch w-10 h-10 rounded-full  justify-center items-center bg-slate-300"
                  >
                    <RiInstagramFill className="w-6 h-6 text-[#224646]" />
                  </Link>

                  <Link
                    href="https://x.com/my_stocai"
                    aria-label="Twitter"
                    className="bg-slate-300 w-10 h-10 rounded-full flex justify-center items-center"
                  >
                    <FaXTwitter className="w-5 h-5 text-[#224646]" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/mystocai/"
                    aria-label="Instagram"
                    className="bg-slate-300 w-10 h-10 rounded-full flex justify-center items-center"
                  >
                    <IoLogoLinkedin className="w-5 h-5 text-[#224646]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="grow shrink text-white lg:ml-[40%] lg:mt-10 ">
            <h3 className="text-xl font-gotham font-bold tracking-normal leading-none">
              Contact
            </h3>
            <ul className="flex flex-col mt-3 gap-1 lg:gap-2 w-full text-lg font-gotham leading-none">
              <li className="">
                <Link href="tel:+918860403799">+91 88604 03799</Link>
              </li>
              <li className="text-lg font-gotham">
                <Link href="mailto:director@mystocai.com">
                  director@mystocai.com
                </Link>
              </li>
              <li className=" not-italic text-lg font-gotham">
                Pune, MH, India
              </li>
            </ul>
          </div>
          <div className="grow shrink text-white lg:ml-[40%] lg:mt-10">
            <h3 className="text-xl tracking-normal font-gotham font-bold leading-none">
              Quick Links
            </h3>
            <ul className="mt-3 w-full flex flex-col gap-1 lg:gap-2 leading-none text-lg font-gotham">
              <li className="">
                <Link href="#how-it-works">How Stocai Works</Link>
              </li>
              <li className="mt-2">
                <Link href="#faq">FAQ&apos;s</Link>
              </li>
              <li className="mt-2">
                <Link href="#abc">Terms and Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="shrink-0 mt-10 h-px border border-solid border-white border-opacity-40 max-md:max-w-full" />
      <div className="flex items-start justify-start lg:justify-end ml-6 md:ml-10">
        <p className="self-end mt-5 mr-20 text-[12px]  lg:text-lg font-gotham text-white max-md:mr-2.5">
          Copyright © 2025 All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
