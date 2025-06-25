"use client";

import React from "react";
import Button from "./Button";
import Image from "next/image";
import chatScreen from "@/assets/Stocai - Chat Screen 1.png";

const CallToActionSection = () => {
  return (
    <section
      id="cta"
      className="flex flex-col justify-center items-center  px-4 py-20 md:px-16 md:py-44 mt-0 w-full bg-[#E2FBFB]"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="flex flex-col lg:flex-row gap-10 items-center -mb-9 max-md:mb-2.5 max-md:max-w-full">
        <Image
          src={chatScreen}
          alt="Stocai interface"
          className="object-contain self-stretch my-auto aspect-[1.72] min-w-80 w-[660px] max-md:max-w-full"
          width={660}
          height={384}
        />
        <div className="flex flex-col self-stretch my-auto min-w-60 w-[514px] max-md:max-w-full">
          <div className="w-full max-md:max-w-full">
            <h2 className="text-[24px] md:text-5xl font-bold text-black xs:leading-[20px]  sm:leading-[30px] lg:leading-[62px] max-md:max-w-full max-md:text-4xl md:leading-[55px] font-quattrocento">
              Feeling sad, anxious or figuring things out?
            </h2>
            <p className="mt-2 md:mt-5 lg:mt-8 text-lg md:text-2xl md:-2xl leading-6 lg:leading-10 font-[325] text-neutral-700 max-md:max-w-full font-Gotham">
              That&apos;s the right time to start a session!
            </p>
          </div>
          <Button
            variant="primary"
            className="self-start mt-3 md:mt-5 lg:mt-8"
            onClick={() => window.location.href = "https://mystocai.com/chat"}
          >
            Start Reflecting
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
