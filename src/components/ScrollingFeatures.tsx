"use client";

import React from "react";

const row1 = [
  {
    title: "2-month intensive program",
    subtitle: "(self-paced modules)",
  },
  {
    title: "12 months of ongoing support",
    subtitle: "and community access",
  },
  {
    title: "Monthly group coaching calls",
    subtitle: "for the entire year",
  },
];

const row2 = [
  {
    title: "Private community access",
    subtitle: "with your cohort and alumni",
  },
  {
    title: "2-month intensive program",
    subtitle: "(self-paced modules)",
  },
  {
    title: "2-month intensive program",
    subtitle: "(self-paced modules)",
  },
];

const ScrollingFeatures = () => {
  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "40px 0",
        overflow: "hidden",
      }}
    >
      {/* Row 1 - Right to Left */}
      <div className="marquee">
        <div className="track left py-5">
          {[...row1, ...row1].map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Row 2 - Left to Right */}
      <div className="marquee" style={{ marginTop: "15px" }}>
        <div className="track right py-5">
          {[...row2, ...row2].map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .marquee {
          width: 100%;
          overflow: hidden;
        }

        .track {
          display: flex;
          gap: 30px;
          width: max-content;
        }

        .left {
          animation: scrollLeft 25s linear infinite;
        }

        .right {
          animation: scrollRight 25s linear infinite;
        }

        @keyframes scrollLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .track {
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
};

type CardProps = {
  title: string;
  subtitle: string;
};

const Card: React.FC<CardProps> = ({ title, subtitle }) => {
  return (
    <div
      style={{
        minWidth: "320px",
        background: "#FFFFFF",
        borderRadius: "10px",
        padding: "20px 20px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          color: "#014BAA",
          fontSize: "clamp(20px, 2vw, 26px)",
          fontFamily: "serif",
          marginBottom: "5px",
        }}
        className="font-bold font-quattrocento"
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "clamp(16px, 1.8vw, 20px)",
          color: "#1D1D1D",
        }}
        className="font-medium font-quattrocento"
      >
        {subtitle}
      </p>
    </div>
  );
};

export default ScrollingFeatures;