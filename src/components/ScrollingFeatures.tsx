"use client";

import React from "react";

const row1 = [
  // {
  //   title: "2-month intensive program",
  //   subtitle: "(self-paced modules)",
  // },
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
  // {
  //   title: "2-month intensive program",
  //   subtitle: "(self-paced modules)",
  // },
];

const ScrollingFeatures = () => {
  return (
    <section className="bg-white py-1 md:py-10 overflow-hidden">

      {/* Row 1 */}
      <div className="marquee p-2">
        <div className="track left">
          {[...row1, ...row1, ...row1, ...row1].map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="marquee mt-2 md:mt-6 p-2">
        <div className="track right">
          {[...row2, ...row2, ...row2, ...row2].map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        .marquee {
          width: 100%;
          overflow: hidden;
        }

        .track {
          display: flex;
          gap: 16px;
          width: max-content;
        }

        .left {
          animation: scrollLeft 25s linear infinite;
        }

        .right {
          animation: scrollRight 25s linear infinite;
        }

        @media (min-width: 768px) {
          .track {
            gap: 30px;
          }
        }

        @keyframes scrollLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-25%);
          }
        }

        @keyframes scrollRight {
          from {
            transform: translateX(-25%);
          }
          to {
            transform: translateX(0);
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
    <div className="
        min-w-[180px] md:min-w-[320px]
        bg-white
        rounded-[5px] md:rounded-[12px]
        px-4 py-3 md:py-4 md:px-6 md:py-5
        shadow-[0_8px_25px_rgba(0,0,0,0.08)]
    ">
      <h3 className="
          text-[#014BAA]
          font-bold font-quattrocento
          text-[10px] md:text-[20px] lg:text-[24px]
          leading-snug
          mb-0.5 md:mb-2
      ">
        {title}
      </h3>

      <p className="
          text-[#1D1D1D]
          font-normal font-inter
          text-[10px] md:text-[16px] lg:text-[18px]
          leading-snug
      ">
        {subtitle}
      </p>
    </div>
  );
};

export default ScrollingFeatures;

// "use client";

// import React from "react";

// const row1 = [
//   {
//     title: "2-month intensive program",
//     subtitle: "(self-paced modules)",
//   },
//   {
//     title: "12 months of ongoing support",
//     subtitle: "and community access",
//   },
//   {
//     title: "Monthly group coaching calls",
//     subtitle: "for the entire year",
//   },
// ];

// const row2 = [
//   {
//     title: "Private community access",
//     subtitle: "with your cohort and alumni",
//   },
//   {
//     title: "2-month intensive program",
//     subtitle: "(self-paced modules)",
//   },
//   {
//     title: "2-month intensive program",
//     subtitle: "(self-paced modules)",
//   },
// ];

// const ScrollingFeatures = () => {
//   return (
//     <section
//       style={{
//         background: "#FFFFFF",
//         padding: "40px 0",
//         overflow: "hidden",
//       }}
//     >
//       {/* Row 1 - Right to Left */}
//       <div className="marquee">
//         <div className="track left py-5">
//           {[...row1, ...row1].map((item, index) => (
//             <Card key={index} {...item} />
//           ))}
//         </div>
//       </div>

//       {/* Row 2 - Left to Right */}
//       <div className="marquee" style={{ marginTop: "15px" }}>
//         <div className="track right py-5">
//           {[...row2, ...row2].map((item, index) => (
//             <Card key={index} {...item} />
//           ))}
//         </div>
//       </div>

//       {/* Styles */}
//       <style jsx>{`
//         .marquee {
//           width: 100%;
//           overflow: hidden;
//         }

//         .track {
//           display: flex;
//           gap: 30px;
//           width: max-content;
//         }

//         .left {
//           animation: scrollLeft 25s linear infinite;
//         }

//         .right {
//           animation: scrollRight 25s linear infinite;
//         }

//         @keyframes scrollLeft {
//           from {
//             transform: translateX(0);
//           }
//           to {
//             transform: translateX(-50%);
//           }
//         }

//         @keyframes scrollRight {
//           from {
//             transform: translateX(-50%);
//           }
//           to {
//             transform: translateX(0);
//           }
//         }

//         @media (max-width: 768px) {
//           .track {
//             gap: 20px;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// type CardProps = {
//   title: string;
//   subtitle: string;
// };

// const Card: React.FC<CardProps> = ({ title, subtitle }) => {
//   return (
//     <div
//       style={{
//         minWidth: "320px",
//         background: "#FFFFFF",
//         borderRadius: "10px",
//         padding: "20px 20px",
//         boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
//       }}
//     >
//       <h3
//         style={{
//           color: "#014BAA",
//           fontSize: "clamp(20px, 2vw, 26px)",
//           fontFamily: "serif",
//           marginBottom: "5px",
//         }}
//         className="font-bold font-quattrocento"
//       >
//         {title}
//       </h3>

//       <p
//         style={{
//           fontSize: "clamp(16px, 1.8vw, 20px)",
//           color: "#1D1D1D",
//         }}
//         className="font-medium font-quattrocento"
//       >
//         {subtitle}
//       </p>
//     </div>
//   );
// };

// export default ScrollingFeatures;