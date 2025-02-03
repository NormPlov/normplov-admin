'use client'
import React, { useEffect, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import placeholderImage from '@/public/assets/placeholder.png'
import { Skeleton } from '@/components/ui/skeleton'


type props = {
  title: string;
  desc: string;
  image: StaticImageData | string;
  isLoading?: boolean;
}

export const QuizResultListing = ({ title, desc, image, isLoading }: props) => {

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
   
    <div className="flex w-full items-start">
      {/* Image Section */}
      <div className="flex-shrink-0 w-12 h-12">
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-md" /> // Skeleton for the image
        ) : (
          <img
            src={imageSrc}
            alt="Quiz Illustration"
            width={36} // Set a consistent width
            height={36} // Set a consistent height
            className="object-cover rounded-md" // Ensure consistent aspect ratio
            onError={() => setImageSrc(placeholderImage.src)}
          />
         
        )}
      </div>

      {/* Text and Response Section */}
      <div className="pl-2">
        {isLoading ? (
          <>
            <Skeleton className="h-[20px] w-[150px] mb-2" /> {/* Skeleton for title */}
            <Skeleton className="h-[15px] w-[250px]" /> {/* Skeleton for description */}
          </>
        ) : (
          <>
            <h2 className="text-md lg:text-xl font-bold mb-1 text-textprimary">{title}</h2>
            <p className="text-base text-textprimary mb-4">
              {desc}
            </p>
          </>
        )}
      </div>
    </div>
  )
}