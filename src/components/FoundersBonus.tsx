import React from "react";

interface BonusItem {
  title: string;
  description: string;
}

const bonusItems: BonusItem[] = [
  {
    title: "LinkedIn Profile Optimization",
    description:
      "Complete makeover with professional copywriting",
  },
  {
    title: "Thought Leadership Strategy",
    description:
      "90-day content plan to establish your expertise",
  },
  {
    title: "Executive Presence Audit",
    description:
      "Video analysis and feedback on your communication style",
  },
  {
    title: "Personal Brand Blueprint",
    description:
      "Custom strategy document for your industry and role",
  },
];

const FoundersBonus: React.FC = () => {
  return (
    <section className="w-full bg-[#f3f3f3] py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-start lg:text-left mb-14">
          <h2 className="text-[18px] sm:text-4xl lg:text-5xl font-quattrocento font-normal text-[#1D1D1D] leading-tight">
            Exclusive{" "}
            <span className="text-[#014BAA] font-quattrocento font-bold">
              Founder&apos;s Bonus:
            </span>
            <br className="block" />
            Personal Branding Accelerator
          </h2>

          <p className="mt-1 md:mt-4 mb-2 md:mb-3 text-lg sm:text-xl text-[#1D1D1D] font-quattrocento font-normal leading-relaxed">
            Only available to our{" "}
            <span className="text-[#014BAA] font-quattrocento font-normal">
              first 50
            </span>{" "}
            members
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-6">
            {bonusItems.map((item, index) => (
              <div
                key={index}
                style={{
                    backgroundColor: "#E6F1FF",
                }}
                className="bg-[#E6F1FF] rounded-2xl p-4 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <h3 className="text-[9.5px] sm:text-2xl font-serif font-semibold text-[#1D1D1D] mb-1 md:mb-4 font-quattrocento font-bold">
                  {item.title}
                </h3>
                <p className="text-[#1D1D1D] text-base sm:text-lg leading-5 md:leading-relaxed font-quattrocento font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Pricing Card */}
          <div 
          style={{
            backgroundColor: "#161616",
          }} 
          className="text-white rounded-3xl p-4 sm:p-10 flex flex-col justify-center items-center text-center min-h-[420px]">
            <h4
            style={{
            color: "#0054C0",
          }} 
            className="text-[16px] sm:text-3xl font-quattrocento font-bold text-[#0054C0] mb-1 md:mb-4">
              Value
            </h4>

            <p
            style={{
                color: "#F8F3F0",
            }}
            className="text-[18px] sm:text-5xl font-bold mb-4 md:mb-8">
              ₹25,000
            </p>

            <h4
            style={{
            color: "#0054C0",
          }} 
           className="text-[16px] sm:text-3xl font-quattrocento font-bold text-[#0054C0] mb-2 md:mb-4">
              Your Price
            </h4>

            <p
            style={{
                color: "#F8F3F0",
            }}
            className="text-[18px] sm:text-5xl font-bold leading-tight">
              Included <br /> FREE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersBonus;