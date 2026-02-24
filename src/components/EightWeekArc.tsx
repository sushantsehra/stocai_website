"use client";

import React from "react";

const modules = [
  { id: 1, title: "Fundamentals of Being Promotable" },
  { id: 2, title: "Claim What You Value" },
  { id: 3, title: "Gaining Visibility and Influence" },
  { id: 4, title: "Navigate With Confidence" },
  { id: 5, title: "Leverage - Impact Without Burnout" },
  { id: 6, title: "Personal Brand-Building Advocates" },
  { id: 7, title: "Psychology Of Promotion" },
  { id: 8, title: "My Action Plan" },
];

const EightWeekArc = () => {
  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Heading */}
        <h2
          style={{
            textAlign: "center",
            fontFamily: "serif",
            // fontSize: "clamp(36px, 5vw, 56px)",
            marginBottom: "10px",
          }}
          className="text-[#000000] font-bold font-quattrocento text-[32px] md:text-[30px] lg:text-[40px]"
        >
          The 8-week Arc
        </h2>

        {/* Subtitle */}
        <p
          style={{
            textAlign: "center",
            // fontSize: "clamp(18px, 2.5vw, 26px)",
            marginBottom: "30px",
          }}
          className="text-[#000000] font-medium font-quattrocento text-[20px] md:text-[30px] lg:text-[40px]"

        >
          (With actionable outcomes every week)
        </p>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px",
          }}
        >
          {modules.map((module) => (
            <div
              key={module.id}
              style={{
                ...cardStyle,
              }}
            >
              {/* Module Label */}
              <p style={moduleLabel}>Module {module.id}</p>

              {/* Title */}
              <h3 style={moduleTitle}>{module.title}</h3>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Styles ---------- */

const cardStyle: React.CSSProperties = {
  position: "relative",
  background: "#4D4D4D",
  borderRadius: "25px",
  padding: "20px",
  color: "white",
  minHeight: "120px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const moduleLabel: React.CSSProperties = {
  fontSize: "22px",
  marginBottom: "5px",
  opacity: 0.9,
};

const moduleTitle: React.CSSProperties = {
  fontSize: "clamp(24px, 3vw, 34px)",
  fontFamily: "serif",
  lineHeight: 1.3,
};


export default EightWeekArc;