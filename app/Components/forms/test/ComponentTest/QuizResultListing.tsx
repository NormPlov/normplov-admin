'use client'
import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { placeholderProfile } from '@/types/constant'

type props = {
    title: string;
    desc: string;
    image: StaticImageData | string;
}

export const QuizResultListing = ({ title, desc, image }: props) => {



    const [imgSrc, setImgSrc] = useState(image);

    return (
        // <div className="flex w-full items-start">
        //     {/* Image Section */}
        //     <div className="flex items-start">
        //         <Image
        //             src={imgSrc}
        //             alt="Quiz Illustration"
        //             width={30}
        //             height={30}
        //             className="object-contain"
        //             onError={() => setImgSrc(placeholderImage)}
        //         />

        //     </div>

        //     {/* Text and Response Section */}
        //     <div className='pl-2' >
        //         <h2 className=" text-md lg:text-xl font-bold mb-1 text-textprimary">{title}</h2>
        //         <p className="text-base text-textprimary mb-4">
        //             {desc}
        //         </p>
        //     </div>
        // </div>

        <div className="flex w-full items-start">
        {/* Image Section */}
        <div className="flex-shrink-0 w-12 h-12"> {/* Consistent container size */}
          <Image
            src={imgSrc}
            alt="Quiz Illustration"
            width={36} // Set a consistent width
            height={36} // Set a consistent height
            className="object-cover rounded-md" // Ensure consistent aspect ratio
            onError={() => setImgSrc(placeholderProfile)} // Fallback for broken images
          />
        </div>
  
        {/* Text and Response Section */}
        <div className="pl-2">
          <h2 className="text-md lg:text-xl font-bold mb-1 text-textprimary">{title}</h2>
          <p className="text-base text-textprimary mb-4">
            {desc}
          </p>
        </div>
      </div>
    )
}