"use client";

import React from "react";

const professionals = [
  {
    name: "Diksha Jain",
    role: "AVP Marketing",
    text: "Understood in 8 weeks what 10 years of performance reviews never told me.",
  },
  {
    name: "Anika Sharma",
    role: "HR Business Partner",
    text: "Went from invisible contributor to leading cross functional strategy in 3 months.",
  },
  {
    name: "Pooja Iyer",
    role: "Operations Manager",
    text: "Built visibility with leadership three levels above me without a single awkward conversation.",
  },
  {
    name: "Tanya Mehrotra",
    role: "Business Development Lead",
    text: "First program that gave me a system, not just motivation.",
  },
];

const ReviewedByProfessionals = () => {
  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "40px 20px",
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
            fontFamily: "serif",
            // fontSize: "clamp(36px, 5vw, 56px)",
            marginBottom: "20px",
            color: "#1D1D1D",
          }}
          className="font-bold font-quattrocento text-[32px] md:text-[30px] lg:text-[40px]"
        >
          Reviewed by{" "}
          <span style={{ color: "#014BAA" }}>professionals</span>
        </h2>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
          }}
        >
          {professionals.map((item, index) => (
            <div key={index} style={cardStyle}>
              {/* Top Section (Avatar + Name) */}
              <div style={topRowStyle}>
                {/* Avatar Placeholder */}
                <div style={avatarStyle} />

                <div>
                  <h3 style={nameStyle} className="font-bold font-quattrocento">{item.name}</h3>
                  <p style={roleStyle} className="font-medium font-quattrocento">{item.role}</p>
                </div>
              </div>

              {/* Testimonial Text */}
              <p style={textStyle} className="font-medium font-quattrocento text-[20px] md:text-[24px]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Styles ---------- */

const cardStyle: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: "22px",
  padding: "40px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const topRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "30px",
};

const avatarStyle: React.CSSProperties = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  background: "#D9D9D9",
  flexShrink: 0,
};

const nameStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: 700,
  marginBottom: "5px",
  color: "#000000",
};

const roleStyle: React.CSSProperties = {
  fontSize: "18px",
  color: "#444",
};

const textStyle: React.CSSProperties = {
//   fontSize: "24px",
  lineHeight: 1.3,
  color: "#000000",
};

export default ReviewedByProfessionals;