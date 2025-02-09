'use client'
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import placeholderImage from '@/public/assets/placeholder.png';
import { HiOutlineCheckBadge } from 'react-icons/hi2';

type Props = {
    title: string;
    desc: string[];
    image: StaticImageData | string;
};

export const QuizResultListingValue = ({ title, desc, image }: Props) => {
    const [imgSrc, setImgSrc] = useState(image);

    return (
        <div className="flex w-full items-start p-3 md:p-7 rounded-xl bg-bgPrimaryLight">
            {/* Image Section */}
            <div className="flex-shrink-0 w-12 h-12">
                <Image
                    src={imgSrc}
                    alt="Quiz Illustration"
                    width={36}
                    height={36}
                    className="object-cover rounded-md"
                    onError={() => setImgSrc(placeholderImage)} // Fallback for broken images
                />
            </div>

            {/* Text and List Section */}
            <div className="pl-1">
                <h2 className="text-xl font-bold mb-2 text-textprimary rounded-[4px]">{title}</h2>
                <ul className="list-none space-y-4">
                {desc.map((point, index) => (
                        <li key={index} className="flex items-start space-x-3">
                            {/* Dynamically set icon color */}
                            <HiOutlineCheckBadge
                                className="mt-[3px] w-5 h-5"
                                style={{ color: index % 2 === 0 ? '#4CAF50' : '#FFC107' }}
                            />
                            <p className="text-lg text-textprimary leading-relaxed">{point.trim()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};