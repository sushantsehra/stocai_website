"use client";

import React from 'react';
import Image from 'next/image';
import image10 from '../assets/image10.png';
import image11 from '../assets/image11.png';
import image12 from '../assets/image12.png';
import image13 from '../assets/image13.png';
import Group15 from '../assets/Group15.png';

const FromCommunity = () => {
    const reviews = [
        { name: "Divank Jain", image: image10, width: 280, height: 110 },
        { name: "Pooja Kargatia", image: image11, width: 240, height: 90 },
        { name: "Eleena reginold", image: image13, width: 250, height: 105 },
        { name: "Deep Shah", image: image12, width: 270, height: 110 },
        { name: "Samruddhi Patil", image: Group15, width: 220, height: 110 }
    ];

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">

                {/* Title */}
                <h2 className="title-from-community mb-14">
                    From the community
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-2 w-full max-w-[860px] ">

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

                </div>

                {/* Last Card */}
                <div className="w-full max-w-[860px]">
                    <div className="transition-transform hover:scale-105 duration-300">
                        <Image
                            src={reviews[4].image}
                            alt={reviews[4].name}
                            width={reviews[4].width}
                            height={reviews[4].height}
                            className="object-contain"
                        />
                    </div>
                </div>

            </div>

            {/* Title Styling */}
            <style jsx>{`
                .title-from-community {
                    font-family: var(--font-quattrocento), Quattrocento, serif;
                    font-weight: 700;
                    font-size: 24px;
                    line-height: 48px;
                    text-align: center;
                    color: #0F1729;
                    margin: 0;
                }
            `}</style>
        </section>
    );
};

export default FromCommunity;
