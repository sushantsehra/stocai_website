"use client";

import React from "react";
import Image from "next/image";
import EleenaR from "@/assets/EleenaR.jpg";
import MHussain from "@/assets/MHussain.jpg";
import VenkatramanA from "@/assets/VenkatramanA.jpg";

const CARDS = [
  {
    name: "Eleena R.",
    role: "Tech Lead",
    text: "Promoted to Senior Manager after 3 years of being overlooked.",
    image: EleenaR,
  },
  {
    name: "M. Hussain",
    role: "Marketing Manager",
    text: "Finally broke from Mid into Senior level with 40% salary increase.",
    image: MHussain,
  },
  {
    name: "Venkatraman A.",
    role: "Product Manager",
    text: "Gained the confidence to negotiate and bag my target role.",
    image: VenkatramanA,
  },
];

const SuccessStories = () => {

    const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  return (
    <section
      style={{
        background: "#4D4D4D",
        // padding: "40px 20px",
      }}
      className="p-1 md:p-20"
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          borderRadius: "16px",
        //   padding: "60px 40px",
        }}
        className="py-4 px-1 md:py-[60px] md:px-[40px]"
      >
        {/* Heading */}
        <div style={{ textAlign: "center", color: "#F8F3F0" }}>
          <h2
            style={{
              // fontSize: "42px",
              // fontFamily: "serif",
              color: "#F8F3F0",
              // marginBottom: "10px",
            }}
            className="text-[#F8F3F0] text-[20px] md:text-[42px] font-bold font-quattrocento mb-1 md:mb-10"
          >
            Success Stories
          </h2>

          <div className="hidden md:block" style={{ color: "#FFDD00", fontSize: "20px", marginBottom: "10px" }}>
            ★ ★ ★ ★
          </div>

          <p className="font-medium font-jakarta text-[12px] md:text-[19px] text-[#F8F3F0]">
            <span
              style={{
                background: "#014BAA",
                padding: "6px 10px",
                borderRadius: "6px",
                marginRight: "8px",
                fontWeight: 600,
              }}
              className=""
            >
              87%
            </span>
            of our beta graduates get promoted within 12 months
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gap: "5px",
            // marginTop: "50px",
          }}
          className="mt-[20px] md:mt-[50px]"
        >
          {CARDS.map((card, index) => (
            <div
              key={index}
              style={{
                background: "#2C2C2C",
                borderRadius: "10px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
              className="border border-[#4D4D4D]"
            >
              {/* Image Section */}
              <div
                style={{
                  height: "80px",
                  position: "relative",
                }}
                className="h-[100px] md:h-[270px]"
              >
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />

                {/* Promoted Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "6px",
                    background: "#014BAA",
                    color: "white",
                    padding: "2px 4px",
                    borderRadius: "6px",
                    fontSize: "4px",
                    zIndex: 2,
                  }}
                  className="font-medium font-inter"
                >
                  Promoted
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  // padding: "30px",
                  color: "white",
                  background: "#181818",
                  flexGrow: 1,
                }}
                className="p-2"
              >
                <div className="hidden md:block" style={{ color: "#1A4EAB", fontSize: "50px" }}>“</div>

                <p
                  style={{
                    // fontSize: "18px",
                    lineHeight: "1.5",
                    // marginTop: "6px",
                    marginBottom: "10px",
                    color: "#F8F3F0",
                  }}
                  className="text-[#F8F3F0] font-medium font-inter text-[5px] mt-2 md:text-[21px]"
                >
                  {card.text}
                </p>

                <h3 
                 className="text-[#F8F3F0] font-medium font-inter text-[10px] md:text-[21px] mb-1 md:mb-4"
                  style={{ 
                    color: "#F8F3F0",
                   }}>
                  {card.name}
                </h3>

                <p style={{ color: "#8B8B8B", }} className="font-medium font-inter text-[6px] md:text-[21px]">
                  {card.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div style={{ textAlign: "center" }} className="mt-5 md:mt-12">
          <button
            style={{
              background: "#014BAA",
              color: "white",
              // padding: "10px",
              // fontSize: "18px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
              onClick={scrollToWaitlist}
            className="font-medium font-inter p-2 md:p-10 text-[8px] md:text-[18px] rounded-md hover:bg-[#013A7A] transition-colors duration-200"
          >
            Request Access →
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;