import React from "react";
import Image, { StaticImageData } from "next/image";
import manImg1 from "../assets/manImg1.png";
import manImg2 from "../assets/manImg2.png";

export type OverlayTag = {
  text: string;
  // positions are percentages (0 - 100)
  top: number;
  left: number;
};

type BeforeAfterProps = {
  beforeImg?: StaticImageData | string;
  afterImg?: StaticImageData | string;
  beforeTags?: OverlayTag[]; // optional small tag bubbles on image
  afterTags?: OverlayTag[];
  eyebrow?: string;
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  ctaLabel?: string;
  onCta?: () => void;
};

const TagPill: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-block px-3 py-1 rounded-md bg-white/90 border border-gray-200 text-sm text-gray-700 shadow-sm">
    {text}
  </span>
);

const ImageCard: React.FC<{
  src: StaticImageData | string;
  alt?: string;
  tags?: OverlayTag[];
}> = ({ src, alt = "", tags = [] }) => {
  return (
    <div className="relative bg-gray-50 rounded-2xl overflow-hidden shadow-md">
      {/* fixed aspect ratio so images don't stretch */}
      <div className="w-full aspect-[3/4] md:aspect-[4/5] relative">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width:1024px) 44vw, (min-width:640px) 46vw, 90vw"
          className="object-cover"
          priority={false}
        />
        {/* overlay tags */}
        {Array.isArray(tags) &&
          tags.map((t, idx) => (
            <div
              key={idx}
              style={{ top: `${t.top}%`, left: `${t.left}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
            >
              <TagPill text={t.text} />
            </div>
          ))}
      </div>
    </div>
  );
};

const BeforeAfterCompare: React.FC<BeforeAfterProps> = ({
  beforeImg = manImg1,
  afterImg = manImg2,
  beforeTags = [],
  afterTags = [],
  eyebrow = "A transformation that",
  heading = (
    <>
      <span className="font-normal">that </span>
      <span className="font-bold font-gotham text-[#014BAA]">feels natural.</span>
    </>
  ),
  subheading = "Created by experts to help you evolve easily.",
  ctaLabel = "Secure Your Place",
  onCta,
}) => {
  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-gotham leading-tight">
            <span className="font-normal mr-2 text-[#1D1D1D]">{eyebrow}</span>
            {heading}
          </h2>
          {subheading && (
            <p className="mt-1 text-g[#1D1D1D] font-gotham font-normal text-base md:text-[19px] max-w-3xl">
              {subheading}
            </p>
          )}
        </header>

        {/* Before / After grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Before */}
          <div>
            <h3 className="text-xl md:text-[32px] font-bold text-[#014BAA] font-gotham mb-2">Before</h3>
            <p className="text-[#1D1D1D] text-[19px] font-gotham mb-4">
              Struggling to be seen.
              <br />
              Unsure why leaders overlook you.
            </p>
            <ImageCard src={beforeImg} alt="Before" tags={beforeTags} />
          </div>

          {/* After */}
          <div>
            <h3 className="text-xl md:text-[32px] font-bold text-[#014BAA] font-gotham mb-2">After</h3>
            <p className="text-[#1D1D1D] text-[19px] font-gotham mb-4">
              Recognized, aligned, and ready for your <br/> next promotion.
            </p>
            <ImageCard src={afterImg} alt="After" tags={afterTags} />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={onCta}
            className="inline-flex items-center gap-3 bg-[#014BAA] text-white px-6 py-3 rounded-[12px] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#cfe0ff] transition"
            aria-label={ctaLabel}
          >
            <span className="font-normal font-gotham text-[16px]">{ctaLabel}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterCompare;