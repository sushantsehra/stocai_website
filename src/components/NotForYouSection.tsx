"use client";

import React from "react";

const NotForYouSection = () => {
  return (
    <section id="not-for-you" className="relative flex flex-col justify-center items-center px-20 py-20 mt-48 w-full text-center bg-[#E2FBFB] max-md:px-5 max-md:mt-10 max-md:max-w-full overflow-hidden">
      {/* Top fade gradient */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-10" />

      <div className="flex flex-col max-w-full w-[846px] relative z-0">
        <div className="flex flex-col justify-center items-center self-center max-w-full w-[678px]">
          <h2 className="md:text-6xl text-[28px]  font-bold text-black leading-[40px]  md:leading-[65px] max-md:max-w-full max-md:text-4xl">
            Stocai for the Willing, Not the Unconvinced
          </h2>
          <p className="mt-5 md:mt-3.5 text-lg md:text-2xl leading-3 md:leading-10 text-neutral-700">
            <span className="font-medium font-gotham text-[#363636]">
              Stocai is{" "}
            </span>
            <span className="font-medium font-gotham text-[rgba(54,54,54,1)]">
              not for you if…
            </span>
          </p>
        </div>
        <div
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div className="gap-9 self-stretch flex items-center justify-center  px-2 py-2 md:px-9 md:py-7 mt-14 text-[12px] md:text-2xl text-black bg-white border border-solid shadow-md border-[color:var(--Primary-Teal,#54B0AF)] min-h-14 rounded-[124px] max-md:px-5 max-md:max-w-full">
            You don&apos;t believe in the effectiveness of coaching
          </div>
          <div className="gap-9 self-stretch flex items-center justify-center  px-2 py-2 md:px-9 md:py-7 mt-4 text-[12px] md:text-2xl text-black bg-white border border-solid shadow-md border-[color:var(--Primary-Teal,#54B0AF)] min-h-14 rounded-[124px] max-md:px-5 max-md:max-w-full">
            You&apos;re already supported by a human coach
          </div>
          <div className="gap-9 self-stretch flex items-center justify-center  px-2 py-2 md:px-9 md:py-7 mt-4 text-[12px] md:text-2xl text-black bg-white border border-solid shadow-md border-[color:var(--Primary-Teal,#54B0AF)] min-h-14 rounded-[124px] max-md:px-5 max-md:max-w-full">
            You&apos;re looking for therapy, not personal coaching
          </div>
          <div className="gap-9 self-stretch flex items-center justify-center  px-2 py-2 md:px-9 md:py-7 mt-4 text-[12px] md:text-2xl text-black bg-white border border-solid shadow-md border-[color:var(--Primary-Teal,#54B0AF)] min-h-14 rounded-[124px] max-md:px-5 max-md:max-w-full">
            You don&apos;t trust AI for coaching
          </div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
};

export default NotForYouSection;
