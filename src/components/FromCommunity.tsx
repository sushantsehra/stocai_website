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
        { name: "Divank Jain", image: image10, width: 200, height: 85 },
        { name: "Pooja Kargatia", image: image11, width: 165, height: 74 },
        { name: "Eleena reginold", image: image13, width: 175, height: 75 },
        { name: "Deep Shah", image: image12, width: 200, height: 84 },
        { name: "Samruddhi Patil", image: Group15, width: 185, height: 81 }
    ];

    return (
        <section className="py-12 bg-white overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
                <h2 className="title-from-community mb-14">
                    From the community
                </h2>

                {/* Row 1 - Forced Row on larger than small mobile */}
                <div className="flex flex-row justify-center gap-4 sm:gap-6 mb-6 w-full max-w-[600px] flex-nowrap">
                    <div className="transition-transform hover:scale-105 duration-300 flex-shrink">
                        <Image
                            src={reviews[0].image}
                            alt={reviews[0].name}
                            width={reviews[0].width}
                            height={reviews[0].height}
                            className="object-contain w-full h-auto"
                        />
                    </div>
                    <div className="transition-transform hover:scale-105 duration-300 flex-shrink">
                        <Image
                            src={reviews[1].image}
                            alt={reviews[1].name}
                            width={reviews[1].width}
                            height={reviews[1].height}
                            className="object-contain w-full h-auto"
                        />
                    </div>
                </div>

                {/* Row 2 - Forced Row on larger than small mobile */}
                <div className="flex flex-row justify-center gap-4 sm:gap-6 mb-6 w-full max-w-[600px] flex-nowrap">
                    <div className="transition-transform hover:scale-105 duration-300 flex-shrink">
                        <Image
                            src={reviews[2].image}
                            alt={reviews[2].name}
                            width={reviews[2].width}
                            height={reviews[2].height}
                            className="object-contain w-full h-auto"
                        />
                    </div>
                    <div className="transition-transform hover:scale-105 duration-300 flex-shrink">
                        <Image
                            src={reviews[3].image}
                            alt={reviews[3].name}
                            width={reviews[3].width}
                            height={reviews[3].height}
                            className="object-contain w-full h-auto"
                        />
                    </div>
                </div>

                {/* Row 3 - Left Aligned in the container */}
                <div className="flex justify-start w-full max-w-[550px] pl-4 sm:pl-10">
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

            <style jsx>{`
        .title-from-community {
          font-family: var(--font-quattrocento), Quattrocento, serif;
          font-weight: 700;
          font-size: 20px;
          line-height: 48px;
          letter-spacing: 0%;
          text-align: center;
          color: #0F1729;
          margin: 0;
        }
      `}</style>
        </section>
    );
};


export default FromCommunity;
