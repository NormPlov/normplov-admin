'use client'
import React, { useEffect, useState } from 'react'
import { StaticImageData } from 'next/image'
import placeholderImage from '@/public/assets/placeholder.png'
import { Skeleton } from '@/components/ui/skeleton'


type props = {
    title: string;
    desc: string;
    image: StaticImageData | string;
    isLoading?: boolean;
}

export const QuizInterestResultCard = ({ title, desc, image, isLoading }: props) => {

    const [imageSrc, setImageSrc] = useState<string>(placeholderImage.src);

    useEffect(() => {
        let imageUrl: string;

        if (typeof image === 'string') {
            // If image is a string, check if it's a relative path or a full URL
            if (image.startsWith('http')) {
                imageUrl = image; // If it's a full URL, use it directly
            } else {
                // If it's a relative path, modify the path if it contains double 'uploads/uploads'
                let modifiedImage = image;
                if (image.includes('uploads/uploads')) {
                    modifiedImage = image.replace('uploads/uploads', 'uploads'); // Remove redundant part
                }

                // Prepend the API base URL after modification
                imageUrl = `${process.env.NEXT_PUBLIC_NORMPLOV_API}${modifiedImage}`;
                console.log("img ", modifiedImage)
                console.log("img with domain:",imageUrl)
            }
        } else if (image && 'src' in image) {
            // If image is StaticImageData, use its src property (which is a string URL)
            imageUrl = (image as StaticImageData).src;
        } else {
            imageUrl = placeholderImage.src; // Fallback to placeholder if image is invalid or not provided
        }

        setImageSrc(imageUrl);
    }, [image]); // Re-run when the image prop changes

    return (
 
        <div className="max-w-[350px] lg:max-w-[400px] bg-white p-4 md:p-6 gap-4 rounded-xl">
            {/* Text and Response Section */}
            <div>
                {/* Title Skeleton */}
                {isLoading ? (
                    <Skeleton className="h-[30px] w-[200px] mb-2" />
                ) : (
                    <h2 className="text-3xl font-bold mb-2 text-secondary">{title}</h2>
                )}

                {/* Description Skeleton */}
                {isLoading ? (
                    <Skeleton className="h-[20px] w-full mb-4" />
                ) : (
                    <p className="text-base text-textprimary mb-4">{desc}</p>
                )}
            </div>

            {/* Image Section */}
            <div className="flex-none flex justify-center items-center overflow-hidden">
                {isLoading ? (
                    <Skeleton className="h-[350px] w-[350px] rounded-xl" />
                ) : (

                    <img
                        src={imageSrc}
                        alt="Quiz Illustration"
                        width={350}
                        height={350}
                        className="object-fill"
                        onError={() => setImageSrc(placeholderImage.src)}
                    />
                )}
            </div>
        </div>
    )
}