"use client";

import React from "react";

const WhoIsThisFor = () => {
  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "20px 20px",
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
            fontSize: "clamp(36px, 5vw, 56px)",
            // fontFamily: "serif",
            marginBottom: "30px",
            color: "#1D1D1D",
          }}
          className="font-bold font-quattrocento text-[26px] md:text-[30px] lg:text-[40px]"
        >
          <span style={{ color: "#014BAA" }}>Who</span> Is This For
        </h2>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px",
            marginBottom: "90px",
          }}
        >
          {/* Card 1 */}
          <div style={cardStyle} className="shadow-2xl font-gotham">
            You have <span style={highlight}>10+ years</span> of experience and
            strong performance reviews, but stagnant growth
          </div>

          {/* Card 2 */}
          <div style={cardStyle} className="shadow-2xl font-gotham">
            You are trusted to deliver, but{" "}
            <span style={highlight}>not chosen to lead</span>
          </div>

          {/* Card 3 */}
          <div style={cardStyle} className="shadow-2xl font-gotham">
            You are tired of vague feedback like{" "}
            <span style={highlight}>“be more visible”</span> or{" "}
            <span style={highlight}>“think bigger”</span>
          </div>

          {/* Card 4 */}
          <div style={cardStyle} className="shadow-2xl font-gotham">
            You don’t want another generic leadership course, you want{" "}
            <span style={highlight}>career leverage</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
          <h3
            style={{
              fontSize: "32px",
              fontWeight: 800,
              marginBottom: "10px",
            }}
            className="font-bold font-gotham"
          >
            But...
          </h3>

          <p
            style={{
            //   fontSize: "22px",
            //   lineHeight: 1.2,
              color: "#000000",
              fontWeight: 300,
            }}
            className="font-gotham leading-6 md:leading-8 text-[18px] md:text-[22px]"
          >
            If you’re looking for quick hacks and you believe promotions are
            purely political and out of your control, then this may not be the
            strategy for you.
          </p>
        </div>
      </div>
    </section>
  );
};

/* Reusable Styles */
const cardStyle: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: "22px",
  padding: "50px 40px",
  fontSize: "26px",
  lineHeight: 1.4,
  color: "#111",
  textAlign: "center",
  boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
};

const highlight: React.CSSProperties = {
  color: "#014BAA",
  fontWeight: 600,
};

export default WhoIsThisFor;