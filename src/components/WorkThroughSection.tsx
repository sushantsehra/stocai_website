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
        //   padding: "22px 16px",
          fontSize: "20px",
          fontWeight: 500,
        }}
        className="px-2 font-medium font-gotham py-6 md:px-8] md:py-10"
      >
        A strategy system to win your next promotion.....and the one after.
      </div>

      {/* Main Content Area */}
      <div
        style={{
          background: "#FFFFFF",
          padding: "40px 20px",
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
            className="font-bold font-jakarta text-[30px]"
          >
            What You’ll Work Through
          </h2>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(380px, 2fr))",
            //   gap: "30px",
            }}
            className="gap-6 md:gap-10"
          >
            {ITEMS.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#E6F1FF",
                  padding: "28px 26px",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  textAlign: "left",
                }}
              >
                {/* Check Icon */}
                <SiTicktick size={28} color="#161616" />

                {/* Text */}
                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.5",
                    margin: 0,
                    color: "#000000",
                  }}
                  className="font-normal font-jakarta"
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