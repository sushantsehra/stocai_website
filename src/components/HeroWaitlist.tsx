"use client";

import React, { useState } from "react";
// import Image from "next/image";
import YourCarrerYourPeeks from "../assets/YourCarrerYourPeeks.jpg";

type HeroWaitlistProps = {
  bgImage?: string;
  onSubmit?: (data: { name: string; phone: string; email: string }) => void;
};

const HeroWaitlist: React.FC<HeroWaitlistProps> = ({ bgImage = "", onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder: real handler from parent
    onSubmit?.({ name, phone, email });
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Outer rounded hero container */}
        <div className="relative overflow-hidden rounded-2xl border border-black/5 shadow-sm">
          {/* Background image layer (placeholder if bgImage not provided) */}
          <div
            aria-hidden
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url(${bgImage || YourCarrerYourPeeks.src})`,
            }}
          />

          {/* Dark left gradient overlay to make text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

          {/* Inner content layout */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left column: content & form */}
              <div className="lg:col-span-7 px-6 sm:px-10 lg:px-12 py-12 md:py-16 lg:py-20">
                <div className="max-w-2xl">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[49.1px] font-gotham font-normal tracking-tight text-white leading-tight">
                    <span className="block">Your Career <span className="font-bold">Won&apos;t Wait.</span></span>
                    <span className="block">Your Peers Won&apos;t Either.</span>
                  </h1>

                  <p className="mt-6 text-sm sm:text-base md:text-[18px] text-white leading-relaxed max-w-sm">
                    Secure your spot in Cohort 1 and get the Personal Branding Accelerator FREE.
                  </p>

                  {/* Form */}
                  <form className="mt-8" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <label className="sr-only" htmlFor="name">
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-[12px] bg-white placeholder:text-[#8A8684] px-4 py-3 text-gray-900 shadow-inner border border-[#cfe0ff] focus:outline-none focus:ring-2 focus:ring-[#cfe0ff] transition"
                        required
                      />

                      <label className="sr-only" htmlFor="phone">
                        Phone Number (with country code)
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Phone Number (with country code)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-[12px] bg-white placeholder:text-[#8A8684] px-4 py-3 text-gray-900 shadow-inner border border-[#cfe0ff] focus:outline-none focus:ring-2 focus:ring-[#cfe0ff] transition"
                        required
                      />

                      <label className="sr-only" htmlFor="email">
                        Your email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-[12px] bg-white placeholder:text-[#8A8684] px-4 py-3 text-gray-900 shadow-inner border border-[#cfe0ff] focus:outline-none focus:ring-2 focus:ring-[#cfe0ff] transition"
                        required
                      />
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-3 bg-[#014BAA] text-white px-6 py-3 rounded-[12px] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#cfe0ff] transition"
                      >
                        <span className="font-medium text-[16px] font-gotham">Join the waitlist</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right column: empty on small screens; provides right-side image crop on large */}
              <div className="hidden lg:block lg:col-span-5">
                {/* keep an empty element so background shows on the right — we don't render extra markup */}
                <div className="h-full" />
              </div>

              {/* On mobile, we may want the visual to appear below content for LCP — show a subtle spacer */}
              <div className="lg:hidden px-6 pb-10">
                {/* Optionally show a small preview or leave empty to rely on background image */}
              </div>
            </div>
          </div>

          {/* soft decorative shadow at the bottom */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/8 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroWaitlist;