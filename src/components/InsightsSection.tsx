"use client";

import React from "react";
import Image from "next/image";
import panda from "@/assets/nightmear_panda.png";
import backglow from "@/assets/backglow.png";
import screble1 from "@/assets/insightSection_image2.png";
import screble2 from "@/assets/insightSection_image.png";

const InsightSection = () => {
  return (
    <section id="insight" className="mt-36 max-w-full text-center text-black ">
      <h2 className="sm:text-xl md:text-4xl lg:text-5xl font-bold lg:leading-[60px] max-md:max-w-full max-md:text-4xl md:leading-[48px] leading-[35px] font-quattrocento">
        My inquiry, your introspection -<br />
        worth more than any advice or gyaan.
      </h2>
      <p className="mt-2 text-2xl leading-8 font-[325] max-md:max-w-full font-Gotham">
        Your problem might not be what you think it is.
        <br />
      </p>
      <div className="flex justify-center ">
        <div className="mt-6  ml-5 w-full max-w-[1161px]  my-auto ">
          <div className="flex justify-center gap-5 max-md:flex-col">
            <div className="w-6/12  md:translate-x-[3%] lg:translate-x-0 max-md:w-full">
              <div className="flex flex-col  items-end w-full max-md:mt-8 max-md:max-w-full">
                <div className="flex flex-col max-w-full text-black w-[430px]">
                  <div className="flex  gap-2.5 justify-center items-center self-end py-4 pr-7 pl-7 bg-white rounded-2xl border border-[#54B0AF] border-solid min-h-[100px] translate-x-[-10%] md:translate-x-0 max-md:px-5">
                    <div className="flex text-start flex-col justify-center self-stretch my-auto md:w-[273px] w-[300px]">
                      <h3 className="text-2xl font-bold font-quattrocento">
                        Stated Problem
                      </h3>
                      <p className="mt-2 text-lg font-Gotham">
                        I waste too much time on reels.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 justify-center items-center self-start py-4 pr-7 pl-8 mt-4 rounded-2xl border border-[#54B0AF] border-solid bg-[#EFEFEF] min-h-[100px] max-md:px-5">
                    <div className="flex text-start flex-col justify-center self-stretch my-auto md:w-[273px] w-[300px]">
                      <h3 className="text-2xl font-bold font-quattrocento">
                        Common Advice
                      </h3>
                      <p className="mt-2.5 text-lg leading-none font-Gotham">
                        Just uninstall Instagram.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2.5 justify-center items-center self-start px-8 py-4 mt-4 text-black bg-[#E2FBFB] rounded-2xl border border-[#54B0AF] border-solid min-h-[100px] max-md:px-5">
                  <div className="flex text-start flex-col justify-center self-stretch my-auto md:w-[273px] w-[300px]">
                    <h3 className="text-2xl font-bold font-quattrocento">
                      Deeper Insight
                    </h3>
                    <p className="mt-2 text-lg font-Gotham">
                      I don't know what to do with my free time.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-start   md:px-6  translate-x-[-10%] md:translate-x-0 py-4 mt-6 max-w-full bg-[#54B0AF] rounded-2xl md:w-[386px] w-[340px] max-md:px-5">
                  <h3 className="self-start text-2xl font-bold text-black font-quattrocento">
                    Your Solution
                  </h3>
                  <p className="mt-2.5 text-lg font-medium leading-7 text-white font-Gotham">
                    I'll experiment with doing nothing intentionally and see how
                    it feels.
                  </p>
                </div>
              </div>
            </div>

            <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="grow max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="w-4/5 max-md:ml-0 max-md:w-full">
                    <div className="flex relative flex-col grow items-start  aspect-[0.627] h-[530px] pb-[467px] max-md:pb-24 max-md:mt-4">
                      {/* Background Image (Behind Panda) */}
                      <Image
                        src={backglow}
                        alt="Background Decorative element"
                        className="absolute inset-0 w-full h-full object-contain opacity-100 scale-[2]"
                        fill
                      />

                      {/* Panda Image (Centered) */}
                      <Image
                        src={panda}
                        alt="Stocai insight process"
                        className="object-cover absolute inset-0 md:size-full w-full"
                        fill
                      />

                      {/* Scribble Element (On Top of Panda) */}
                      <Image
                        src={screble1}
                        alt="Decorative element"
                        width={96}
                        height={96}
                        className="object-contain w-24 aspect-square top-2 right-3 relative z-10"
                      />
                    </div>
                  </div>

                  {/* Another Scribble Element on the Right */}
                  <div className="flex items-center ml-5 w-1/5 max-md:ml-0 relative max-md:w-full">
                    <Image
                      src={screble2}
                      alt="Decorative element"
                      width={96}
                      height={96}
                      className="object-contain translate-x-10 shrink-0 self-stretch my-auto w-20 md:w-24 lg:w-24 absolute translate-y-[-300px] right-10 md:translate-y-0 md:top-[45%] lg:top-[40%] lg:right-40 md:right-20 aspect-square md:mt-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex z-10 mt-0 w-full min-h-[211px] max-md:max-w-full" />
    </section>
  );
};

export default InsightSection;
