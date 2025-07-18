"use client";

import React from "react";
import Image from "next/image";
import Button from "./Button";
import womenSitting from "@/assets/womenStressed.png";
import arrow1 from "@/assets/Arrow_page.png";
import arrow2 from "@/assets/Arrow_page_feature1.png";
import arrow3 from "@/assets/Arrow_page_feature2.png";
import arrow4 from "@/assets/Arrow_page_feature3.png";

const FeaturesSection = () => {
  return (
    <section className="flex flex-col mt-11" id="features">
      <div className="self-center mt-[7.5rem] max-w-full text-center w-[1050px] md:mt-28 lg:mt-32">
        <div className="flex flex-col w-full font-bold text-black  max-md:max-w-full">
          <h2 className="self-center max-w-full text-[28px] lg:text-5xl leading-[33px]  px-2 md:px-0 w-[950px]  md:text-4xl md:leading-[45px] lg:leading-[60px] font-quattrocento font-bold">
            When you are feeling sad, anxious or looking to figure something,{" "}
            <span className="font-bold font-Gotham text-[#54B0AF]">Stocai</span>{" "}
            is here.
          </h2>
          <p className="mt-2 text-[22px] md:text-4xl leading-none text-[#54B0AF] max-md:max-w-full font-quattrocento">
            sort it out, one session at a time
          </p>
        </div>
        <p className="mt-3 md:mt-2 text-[18px] md:text-2xl leading-none font-[325] text-[#363636] max-md:max-w-full font-Gotham">
          Ever found yourself stuck in situation like
        </p>
      </div>

      <div className="self-center h-[450px] md:mt-8 w-full max-w-[1202px]  max-md:max-w-full ">
        <div className="flex gap-2 max-md:flex-col">
          <div className="w-[33%]  max-md:ml-0 max-md:w-full">
            <div className="flex  flex-col w-full text-[10px] md:text-lg font-medium leading-3 md:leading-6 text-white mt-4 lg:mt-3">
              <div className="flex  md:translate-y-[-12px] items-start justify-start md:items-end gap-2 ml-[5%] md:ml-[6%] md:justify-end ">
                <div className="self-center  px-3 py-2 md:px-6 md:py-4 max-w-full bg-[#54B0AF] font-medium font-Gotham  rounded-lg md:rounded-2xl border border-emerald-400 border-solid md:w-[370px] lg:w-[380px] w-[150px] md:leading-7 ">
                  Frequently losing temper at home after a long day in office
                </div>
                <Image
                  src={arrow4}
                  alt="Decorative element"
                  className="object-contain shrink-0 self-end translate-y-10 translate-x-[-70px] md:mt-2.5 md:translate-y-0 md:translate-x-5 lg:translate-x-0 aspect-square w-[40px] md:w-[75px]  items-end"
                />
              </div>
              <div className="flex items-start justify-start md:items-end gap-5 ml-[5%] md:ml-[6%] md:justify-end w-[210px] md:w-[250px]  lg:w-[380px] mt-48 md:mt-[5.5rem] ">
                <div className="grow shrink-0 px-3 py-2 md:px-7 lg:px-6 md:py-5 lg:py-4  bg-[#54B0AF] font-medium font-Gotham rounded-lg md:rounded-2xl border border-emerald-400 border-solid basis-0 w-[100px] md:w-[60px] lg:w-[250px] translate-y-14 md:translate-y-0 lg:leading-7 lg:translate-y-[-10px] ">
                  Repeatedly postponing taking action, despite it being
                  important
                </div>
                <Image
                  src={arrow2}
                  alt="Decorative element"
                  className="object-contain shrink-0 self-start translate-y-[0px] translate-x-[-100px] md:translate-x-5 lg:translate-x-0 lg:translate-y-[-50px] mt-2.5 aspect-square w-[40px] md:w-[69px]"
                />
              </div>
            </div>
          </div>

          <div className="ml-5 w-[20%] max-md:ml-0 max-md:w-full relative">
            <Image
              src={womenSitting}
              alt="Stocai features illustration"
              className="object-contain absolute grow md:mt-[80%] w-[200px] top-[-280px] left-[25%] md:left-0  md:top-0 lg:mt-3.5 md:w-full aspect-[1.03] max-md:mt-10"
            />
          </div>

          <div className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-[10px] md:text-lg  w-full text-lg font-medium leading-3 md:leading-6 text-white max-md:mt-10">
              <div className="flex items-start justify-start gap-7 w-[240px] md:w-[280px]  ml-[-12%] lg:w-full  translate-y-[-357px] md:translate-y-0 translate-x-[160px] md:translate-x-0">
                <Image
                  src={arrow1}
                  alt="Decorative element"
                  className="object-contain shrink-0 aspect-square w-[50px] md:w-[81px] translate-y-[50px] translate-x-[150px] md:translate-x-0 md:translate-y-20 lg:translate-y-8 transform scale-x-[-1]"
                />
                <div className="z-10 self-center text-[10px] md:text-lg  py-2 md:px-6 md:py-4 max-w-full bg-[#54B0AF] font-medium font-Gotham rounded-lg md:rounded-2xl border border-emerald-400 border-solid w-[270px] max-md:px-5 max-md:pb-2.5 ">
                  Getting promoted, but still figuring out how to handle a new
                  team
                </div>
              </div>
              <div className="flex gap-7 items-start lg:w-full w-[240px] md:w-[280px]  mt-28 max-md:mt-10 md:translate-x-0 md:translate-y-[-10px] lg:translate-y-[-30px] translate-x-[118px] translate-y-[-150px]">
                <Image
                  src={arrow3}
                  alt="Decorative element"
                  className="object-contain shrink-0 aspect-square w-[45px] md:w-[81px] translate-x-[100px]  translate-y-[-45px] md:translate-x-0  md:translate-y-0"
                />
                <div className="z-10 grow text-[10px] md:text-lg shrink-0 px-6  py-2 md:px-6 md:py-4 mt-0 bg-[#54B0AF] font-medium font-Gotham rounded-lg md:rounded-2xl border border-emerald-400 border-solid basis-0 w-fit">
                  Feeling anxious before a big presentation, not able preparing
                  for
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col self-center max-w-full w-[728px] mt-[-3rem] md:mt-20 lg:mt-[-90px]">
        <p className="text-[18px] md:text-2xl lg:px-40 md:px-28 px-0 md:leading-8 text-center font-[325] text-[#363636] max-md:max-w-full font-Gotham">
          {/* here I have to paste */}
          For the moments when your mind feels tangled.{" "}
          <span className="text-[#54B0AF]"> Stocai </span>is here.
        </p>
        <Button
          variant="primary"
          className="self-center mt-3 md:mt-4 lg:mt-4 font-Gotham"
          onClick={() => window.location.href = "https://clarity.mystocai.com"}
        >
          Try Stocai Now
        </Button>
      </div>

      <hr className="shrink-0 mt-16 mr-9 max-w-full h-px border border-solid border-neutral-400 w-[1280px] max-md:mt-10 max-md:mr-2.5" />
    </section>
  );
};

export default FeaturesSection;
