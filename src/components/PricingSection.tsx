"use client";

import React from "react";
import Button from "./Button";
import Image from "next/image";
import feedback from "@/assets/feedback.png";

const PricingSection = () => {
  return (
    <section id="pricing" className="flex justify-center mt-12 items-center md:min-h-screen w-full px-4">
      <div className="relative flex items-center justify-center gap-10 max-w-[1200px] w-full max-md:flex-col">
        <div className="relative z-10 flex justify-center -mt-36 md:mt-0 px-10 md:px-0 translate-y-20 md:translate-y-0">
          <Image
            src={feedback}
            alt="Stocai pricing"
            width={500}
            height={500}
            className="object-contain w-full scale-150 max-md:scale-100 max-md:mt-10 md:ml-20 lg:ml-24"
          />
        </div>
        <div className="relative w-[70%] max-md:w-full ">
          <div className="flex flex-col justify-center items-center md:pl-20 md:pr-16 lg:pl-36 lg:pr-28 lg:py-16 px-12 md:py-10 py-16 w-full text-black bg-white rounded-lg shadow-[0px_15px_40px_rgba(0,0,0,0.1)] max-md:px-5 max-md:max-w-full">
            {/* Text Content */}
            <div className="flex flex-col max-w-full text-start w-[707px]">
              <h2 className="lg:text-5xl  font-bold leading-[35px] max-md:max-w-full text-3xl lg:leading-[52px]">
                Free entry. Price of exit? Your honest opinion.
              </h2>
              <p className="lg:mt-8 mt-6 md:mt-4 text-lg leading-7 max-md:max-w-full">
                We're building something that truly helps people.{" "}
                <span className="font-bold text-[rgba(84,176,175,1)]">
                  Hence, our beta is completely free. No hidden costs, no trial
                  periods - just full access.
                </span>
                <br />
                <br />
                In return, we ask for your feedback. What works? What doesn't?
                What would make Stocai even better for you? Your insights will
                shape the future of coaching.
              </p>

              {/* Button */}
              <Button
                variant="primary"
                className="mt-8 md:mt-5 lg:mt-8 lg:w-[40%] w-[60%]"
                onClick={() => window.location.href = "https://mystocai.com/chat"}
              >
                Start Free Beta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
