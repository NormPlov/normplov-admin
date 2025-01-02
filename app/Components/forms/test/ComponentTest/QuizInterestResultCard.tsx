'use client'
import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import placeholderImage from '@/public/assets/placeholder.jpg'

type props = {
    title: string;
    desc: string;
    image: StaticImageData | string;
}

export const QuizInterestResultCard = ({ title, desc, image }: props) => {

    const [imgSrc, setImgSrc] = useState(image);

    return (
        <div className=" w-[350px] lg:w-[400px] bg-white p-4 md:p-6 gap-4 rounded-xl">
            {/* Text and Response Section */}
            <div >
                <h2 className="text-3xl font-bold mb-2 text-secondary">{title}</h2>
                <p className="text-base text-textprimary mb-4">
                    {desc}
                </p>


            </div>
            {/* Image Section */}
            <div className="flex-none flex justify-center items-center overflow-hidden">
                <Image
                    src={imgSrc}
                    alt="Quiz Illustration"
                    width={350}
                    height={350}
                    className="object-cover"
                    onError={() => setImgSrc(placeholderImage)}
                />
            </div>


        </div>
    )
}
