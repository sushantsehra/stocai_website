"use client";

import React from "react";
import { SiTicktick } from "react-icons/si";

const ITEMS = [
  "How decision-makers think at your level",
  "How visibility actually works (without self-promotion)",
  "How decisions get made when you’re not in the room",
  "How to communicate impact without sounding uncomfortable",
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
          <h2
            style={{
              fontFamily: "serif",
              //   fontSize: "48px",
              marginBottom: "25px",
              color: "#1D1D1D",
            }}
            className="font-bold font-quattrocento text-[18px] md:text-[30px] lg:text-[48px] mb-9 md:mb-10 lg:mb-24 lg:mt-4"
          >
            What You’ll Work Through
          </h2>

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
                  background: "#E6F1FF",
                  // padding: "28px 26px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  textAlign: "left",
                }}
                className="p-3 md:p-5 lg:min-h-[90px]"
              >
                <SiTicktick size={20} color="#161616" />

                <p
                  style={{
                    // fontSize: "16px",
                    lineHeight: "1.5",
                    margin: 0,
                    color: "#000000",
                    fontWeight: 300,
                  }}
                  className="font-inter text-[9px] md:text-[18px]"
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkThroughSection;