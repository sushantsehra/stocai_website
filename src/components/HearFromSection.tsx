"use client";

import React from "react";
import Image from "next/image";
import KavitaG from "@/assets/KavitaG.jpg";
import NikhilS from "@/assets/NikhilS.jpg";
import ReetaD from "@/assets/ReetaD.jpg";
import AmitS from "@/assets/AmitS.jpg";

const TESTIMONIALS = [
  {
    text: "The session on how decisions get made when you are not in the room. That changed how I show up completely",
    name: "Kavita G.",
    role: "Director of Operations",
    image: KavitaG,
  },
  {
    text: "Finally understood how to communicate impact without it feeling like self promotion. That was my biggest block",
    name: "Nikhil S.",
    role: "Senior Product Manager",
    image: NikhilS,
  },
  {
    text: "The stakeholder management framework alone was worth the entire program",
    name: "Reeta D.",
    role: "Finance Lead",
    image: ReetaD,
  },
  {
    text: "Practicing my promotion pitch with the AI coach before the actual conversation. That is what made the difference",
    name: "Amit S.",
    role: "Engineering Lead",
    image: AmitS,
  },
];

const HearFromSection = () => {
  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "80px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Heading */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(32px, 5vw, 48px)",
            // fontFamily: "serif",
            marginBottom: "70px",
            lineHeight: 1.2,
            color: "##1D1D1D",
          }}
          className="font-bold font-quattrocento text-[18px] md:text-[30px] lg:text-[40px]"
        >
          Hear from those who experienced it{" "}
          <span style={{ color: "#1A4EAB" }}>first hand</span>
        </h2>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 2fr))",
            gap: "90px 40px",
          }}
        >
          {TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                background: "#4D4D4D",
                borderRadius: "22px",
                padding: "70px 30px 40px 30px",
                textAlign: "center",
                color: "white",
                height: "300px",
                maxWidth: "550px",
              }}
              className="h-[250px]"
            >
              {/* Circular Image */}
              <div
                style={{
                  position: "absolute",
                  top: "-65px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "6px solid #FFFFFF",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="100px"
                />
              </div>

              {/* Text */}
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.4",
                  marginBottom: "30px",
                  marginTop: "10px",
                }}
                className="font-medium font-jakarta text-white"
              >
                {item.text}
              </p>

              {/* Name */}
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "3px",
                  color: "#FFFFFF",
                }}
              >
                {item.name}
              </h3>

              {/* Role */}
              <p
                style={{
                  fontSize: "16px",
                  color: "#FFFFFF",
                  fontWeight: 700,
                }}
              >
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HearFromSection;