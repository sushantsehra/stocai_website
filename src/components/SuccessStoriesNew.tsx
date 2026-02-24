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
        className="py-6 px-6 md:py-[60px] md:px-[40px]"
      >
        {/* Heading */}
        <div style={{ textAlign: "center", color: "#F8F3F0" }}>
          <h2
            style={{
              fontSize: "42px",
              fontFamily: "serif",
              marginBottom: "10px",
            }}
            className="text-[#F8F3F0] text-xl md:text-[42px] font-bold font-quattrocento"
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
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            marginTop: "50px",
          }}
        >
          {CARDS.map((card, index) => (
            <div
              key={index}
              style={{
                background: "#2C2C2C",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image Section */}
              <div
                style={{
                  height: "270px",
                  position: "relative",
                }}
                className="h-[200px] md:h-[270px]"
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
                    top: "12px",
                    right: "12px",
                    background: "#014BAA",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    zIndex: 2,
                  }}
                  className="font-medium font-jakarta"
                >
                  Promoted
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "30px",
                  color: "white",
                  background: "#181818",
                  flexGrow: 1,
                }}
              >
                <div className="hidden md:block" style={{ color: "#1A4EAB", fontSize: "50px" }}>“</div>

                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.5",
                    marginTop: "1px",
                    marginBottom: "30px",
                  }}
                  className="text-[#F8F3F0] font-medium font-jakarta text-[21px]"
                >
                  {card.text}
                </p>

                <h3 
                 className="text-[#F8F3F0] font-medium font-jakarta text-[21px]"
                  style={{ fontSize: "22px", marginBottom: "4px" }}>
                  {card.name}
                </h3>

                <p style={{ color: "#B5B5B5", fontSize: "14px" }} className="text-[#F8F3F0] font-medium font-jakarta text-[21px]">
                  {card.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <button
            style={{
              background: "#014BAA",
              color: "white",
              padding: "14px 40px",
              fontSize: "18px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
              onClick={scrollToWaitlist}
            className="font-semibold font-jakarta"
          >
            Request Access →
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;