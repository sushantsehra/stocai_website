import React from "react";
// import Image from "next/image";
// import bannerImg from "../assets/professionalsBanner.png"; 

const PromoSystemSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP TEXT BLOCK */}
        <div className="max-w-6xl mb-12 md:mb-16 mx-4">
          <p className="text-lg sm:text-xl lg:text-[42px] leading-7 md:leading-12 text-[#1D1D1D] font-normal font-gotham">
            You’ve heard the talks. Read the books. Taken the courses.{" "}
            <span className="font-bold text-[#0E4AA0]">
              And yet, promotions stay unpredictable.
            </span>{" "}
            Because inspiration fades. Systems don’t. This isn’t another motivational workshop –
            it’s{" "}
            <span className="font-bold">
              an operating system that makes promotability measurable, visible, and repeatable.
            </span>{" "}
            You don’t just feel confident. You act promotable.
          </p>
        </div>

        {/* HERO BANNER */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          {/* Image */}
          <div className="relative w-full h-[420px] sm:h-[460px] lg:h-[480px]">
            {/* <Image
              src={bannerImg}
              alt="Professionals transformed banner"
              fill
              className="object-cover"
              priority
            /> */}
          </div>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/30 md:bg-black/40"></div>

          {/* CONTENT OVER IMAGE */}
          <div className="absolute inset-0 flex items-center px-6 sm:px-10 lg:px-14">
            <div className="max-w-xl">
              <h2 className="text-white text-2xl sm:text-3xl lg:text-[49px] font-gotham font-nornaml leading-tight">
                Join professionals<br />
                who’ve transformed<br />
                their{" "}
                <span className="font-bold">
                  career trajectory.
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-[17px] font-gotham font-normal text-white max-w-md">
                From Fortune 500 companies to fast-growing startups – real people, real promotions
              </p>

              <button
                className="mt-6 inline-flex items-center bg-[#174BAA] text-white px-5 py-3 rounded-[12px] text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-[#cfe0ff]"
              >
                Level up in your career
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PromoSystemSection;