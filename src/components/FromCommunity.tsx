"use client";

import React from 'react';
import Image from 'next/image';
import img1 from '../assets/cp1.png';
import img2 from '../assets/cp2.png';
import img3 from '../assets/cp3.png';
import img4 from '../assets/cp4.png';
import img5 from '../assets/cp5.png';
import img6 from '../assets/cp6.png';
import img7 from '../assets/cp7.png';
import img8 from '../assets/cp8.png';


const FromCommunity = () => {
    const reviews = [
        { name: "Divank Jain", image: img1, width: 280, height: 110 },
        { name: "Pooja Kargatia", image: img2, width: 240, height: 90 },
        { name: "Eleena reginold", image: img3, width: 250, height: 105 },
        { name: "Deep Shah", image: img4, width: 270, height: 110 },
        { name: "Samruddhi Patil", image: img5, width: 220, height: 110 },
        { name: "Samruddhi Patil", image: img6, width: 220, height: 110 },
        { name: "Samruddhi Patil", image: img7, width: 220, height: 110 },
        { name: "Samruddhi Patil", image: img8, width: 220, height: 110 }

    ];

    return (
        <section className="py-8 bg-white overflow-hidden">

            {/* ===== MOBILE VIEW (md:hidden) ===== */}
            <div className="md:hidden max-w-6xl mx-auto px-4 flex flex-col items-center">

                {/* Title */}
                <h2 className="title-from-community mb-28">
                    From the community
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-2 w-full max-w-[860px]">

                    {/* Row 1 */}
                    <div className="flex justify-end transition-transform hover:scale-105 duration-300">
                        <Image
                            src={reviews[0].image}
                            alt={reviews[0].name}
                            width={reviews[0].width}
                            height={reviews[0].height}
                            className="object-contain"
                        />
                    </div>

                    <div className="flex justify-start transition-transform hover:scale-105 duration-300">
                        <Image
                            src={reviews[1].image}
                            alt={reviews[1].name}
                            width={reviews[1].width}
                            height={reviews[1].height}
                            className="object-contain"
                        />
                    </div>

                    {/* Row 2 */}
                    <div className="flex justify-end transition-transform hover:scale-105 duration-300">
                        <Image
                            src={reviews[2].image}
                            alt={reviews[2].name}
                            width={reviews[2].width}
                            height={reviews[2].height}
                            className="object-contain"
                        />
                    </div>

                    <div className="flex justify-start transition-transform hover:scale-105 duration-300">
                        <Image
                            src={reviews[3].image}
                            alt={reviews[3].name}
                            width={reviews[3].width}
                            height={reviews[3].height}
                            className="object-contain"
                        />
                    </div>
                    
                    {/* Row 3 */}
                    <div className="flex justify-end transition-transform hover:scale-105 duration-300">
                        <Image
                            src={reviews[4].image}
                            alt={reviews[4].name}
                            width={reviews[4].width}
                            height={reviews[4].height}
                            className="object-contain"
                        />
                    </div>

                    <div className="flex justify-start transition-transform hover:scale-105 duration-300">
                        <Image
                            src={reviews[5].image}
                            alt={reviews[5].name}
                            width={reviews[5].width}
                            height={reviews[5].height}
                            className="object-contain"
                        />
                    </div>
                                        {/* Row 2 */}
                    <div className="flex justify-end transition-transform hover:scale-105 duration-300">
                        <Image
                            src={reviews[6].image}
                            alt={reviews[6].name}
                            width={reviews[6].width}
                            height={reviews[6].height}
                            className="object-contain"
                        />
                    </div>

                    <div className="flex justify-start transition-transform hover:scale-105 duration-300">
                        <Image
                            src={reviews[7].image}
                            alt={reviews[7].name}
                            width={reviews[7].width}
                            height={reviews[7].height}
                            className="object-contain"
                        />
                    </div>

                </div>

            </div>

            {/* ===== DESKTOP VIEW (hidden md:block) — Moving Image Band ===== */}
            <div className="hidden md:flex flex-col items-center w-full mx-auto">

                {/* Title */}
                <h2 className="font-bold font-quattrocento text-[24px] lg:text-[40px] text-[#1D1D1D] text-center mb-0">
                    From The Community
                </h2>

                {/* Marquee Container */}
                <div className="marquee-community w-full">
                    <div className="track-community">
                        {[...reviews, ...reviews, ...reviews].map((item, index) => (
                            <div key={index} className="flex-shrink-0 transition-transform hover:scale-105 duration-300">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={Math.round(item.width * 1.5)}
                                    height={Math.round(item.height * 1.5)}
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Styles */}
            <style jsx>{`
                /* ---- Mobile Title ---- */
                .title-from-community {
                    font-family: var(--font-quattrocento), Quattrocento, serif;
                    font-weight: 700;
                    font-size: 24px;
                    line-height: 48px;
                    text-align: center;
                    color: #0F1729;
                    margin: 0;
                }

                /* ---- Marquee Styles ---- */
                .marquee-community {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                }

                .track-community {
                    display: flex;
                    gap: 60px;
                    width: max-content;
                    animation: scroll-community 25s linear infinite;
                    align-items: center;
                    padding: 10px 0;
                }

                @keyframes scroll-community {
                    from {
                        transform: translateX(-33.33%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default FromCommunity;
