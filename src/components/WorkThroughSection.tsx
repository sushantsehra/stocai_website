"use client";

import React from "react";
// import { SiTicktick } from "react-icons/si";

const ITEMS = [
  // "How decision-makers think at your level",
  // "How visibility actually works (without self-promotion)",
  // "How decisions get made when you’re not in the room",
  // "How to communicate impact without sounding uncomfortable",
  "How promotion decisions actually happen behind closed doors",
  "How leaders evaluate “potential” vs “performance”",
  "How to communicate impact without sounding like you are bragging",
  "How to build influence across stakeholders",
  // "How to position yourself for the next role before it opens",
];

const WorkThroughSection = () => {
  return (
    <section style={{ width: "100%" }}>

      {/* Top Blue Banner */}
      <div
        style={{
          background: "#014BAA",
          color: "white",
          textAlign: "center",
          fontWeight: 500,
        }}
        className="px-2 text-[11px] md:text-[20px] lg:text-[28px] font-medium font-inter py-3.5 md:px-8 md:py-10"
      >
        A strategy system to win your next promotion.....and the one after.
      </div>

      {/* Main Content Area */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "20px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* Heading */}
          {/* <h2
            style={{
              fontFamily: "serif",
              //   fontSize: "48px",
              marginBottom: "25px",
              color: "#1D1D1D",
            }}
            className="font-bold font-quattrocento text-[18px] md:text-[30px] lg:text-[48px] mb-9 md:mb-10 lg:mb-24 lg:mt-4"
          >
            What You’ll Work Through
          </h2> */}

                    <h2
            style={{
              // fontFamily: "serif",
              //   fontSize: "48px",
              marginBottom: "1px",
              color: "#1D1D1D",
            }}
            className="font-bold font-quattrocento text-[16px] md:text-[30px] lg:text-[48px] "
          >
            The real mechanics of career growth.
          </h2>

          <p  style={{
              marginBottom: "15px",
            }} className="text-[#1D1D1D] text-[12px] md:text-[24px] lg:text-[38px] font-normal font-inter mb-9 md:mb-10 lg:mb-24 lg:mt-4">
            Inside the program you will learn:
          </p>

          {/* Grid */}
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-2
              gap-2 md:gap-4 px-2
            "
          >
            {ITEMS.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#014BAA",
                  // padding: "28px 26px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  textAlign: "left",
                }}
                className="p-3 md:p-5 lg:min-h-[90px]"
              >
                {/* <SiTicktick size={20} color="#161616" /> */}

                <p
                  style={{
                    // fontSize: "16px",
                    lineHeight: "1.5",
                    margin: 0,
                    color: "#FFFFFF",
                    fontWeight: 300,
                  }}
                  className="font-inter font-normal text-center text-[9px] md:text-[18px]"
                >
                  {item}
                </p>
              </div>
            ))}
          </div>

            <div className="flex items-center justify-center">
                           <div
                style={{
                  background: "#014BAA",
                  padding: "12px",
                  borderRadius: "6px",
                  marginLeft: "9px",
                  marginRight: "9px",
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "flex-center",
                  gap: "8px",
                  textAlign: "left",
                }}
                className="p-3 md:p-5 lg:min-h-[80px] md:items-center md:flex md:justify-center max-w-[180px] md:max-w-[60%]"
              >
                <p
                  style={{
                    // fontSize: "16px",
                    lineHeight: "1.5",
                    margin: 0,
                    color: "#FFFFFF",
                    fontWeight: 300,
                  }}
                  className="font-inter font-normal text-center text-[9px] md:text-[18px]"
                >
                  How to position yourself for the next role before it opens
                </p>
              </div>
            </div>

              <div className="mt-4 md:mt-10">
                <p className="font-inter font-bold text-[15px] sm:text-[18px] md:text-[24px] text-[#1D1D1D]">
                  These are the skills most professionals only discover <span className="text-[#014BAA]">
                    after 15-20 years
                  </span>
                </p>
              </div>
        </div>
      </div>
    </section>
  );
};

export default WorkThroughSection;