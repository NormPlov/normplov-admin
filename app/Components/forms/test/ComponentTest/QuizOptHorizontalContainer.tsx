

'use client'
import React, { useEffect, useState } from 'react'
import { StaticImageData } from 'next/image'
import { QuizButton } from './QuizButton'
import { ArrowRight } from "lucide-react"
import placeholderImage from '@/public/assets/placeholder.png'
import { Skeleton } from '@/components/ui/skeleton'



type props = {
  title: string;
  desc: string;
  image?: StaticImageData | string;
  buttonText?: string;
  type?: 'main' | 'LearningStyle'
  badgeText?: string;
  onClick?: () => void;
  isDraft?: boolean;
  isLoading?: boolean;  // Add a prop to indicate if data is loading
}

export const QuizOptHorizontalContainer = ({
  title,
  desc,
  image,
  type = 'main',
  badgeText,
  onClick,
  isDraft,
  isLoading = false
}: props) => {

  const [currentLocale, setCurrentLocale] = useState<string>("");
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
    <div className={`flex flex-col sm:flex-row w-full shadow-sm bg-white hover:bg-slate-50 p-4 gap-4 rounded-xl ${type === 'LearningStyle' ? 'justify-center items-center " ' : ''} `}>
      {/* Image Section */}
      <div className="flex-none flex justify-center items-center overflow-hidden rounded-xl">
        {/* Display Skeleton if data is loading */}
        {isLoading ? (
          <Skeleton className={` ${type === 'LearningStyle' ? 'h-[100px] w-[100px] rounded-xl' : 'h-[200px] w-[200px] rounded-xl'} `} />
        ) : (

          type === 'LearningStyle' ? (
            <img
              src={imageSrc}
              alt="Technique Illustration"
              width={100}
              height={100}
              className="object-fill"
              onError={() => setImageSrc(placeholderImage.src)}
            />
          ) : (
            < img
              src={imageSrc}
              alt="Technique Illustration"
              width={200}
              height={200}
              className="object-fill"
              onError={() => setImageSrc(placeholderImage.src)}
            />
          )
        )}
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-between flex-1 gap-4 space-y-1">
        <div>
          {/* Title Skeleton */}
          {isLoading ? (
            <Skeleton className="h-[20px] w-[150px] rounded-xl mb-2" />
          ) : (
            <h2 className={`text-xl font-bold ${type === 'main' ? 'text-primary' : 'text-secondary'}`}>{title}</h2>
          )}

          {/* Draft Notification */}
          {isDraft && (
            <div className="max-w-4xl inline-block bg-secondary bg-opacity-10 mb-1 rounded-xl">
              <p className='text-secondary text-sm px-1'>
                ការធ្វើតេស្តមិនទាន់បានបញ្ចប់
              </p>
            </div>
          )}

          {/* Badge Text Skeleton */}
          {isLoading ? (
            <Skeleton className="h-[15px] w-[100px] rounded-xl mb-2" />
          ) : (
            <p className={`rounded-full text-textprimary text-opacity-80 text-sm ${type === 'main' ? 'hidden' : ''}`}>{badgeText}</p>
          )}

          {/* Description Skeleton */}
          {isLoading ? (
            <Skeleton className="h-[50px] w-full rounded-xl mb-2" />
          ) : (
            <p className="text-lg text-textprimary text-wrap">
              {desc}
            </p>
          )}
        </div>

        {/* Button Section */}
        <div className={`flex justify-start md:justify-end ${type === 'main' ? '' : 'hidden'}`}>
          {isLoading ? (
            <Skeleton className="h-[40px] w-[120px] rounded-full" />
          ) : (
            <QuizButton title={isDraft
              ? (currentLocale === "km" ? "បន្តតេស្ត" : "Continue")
              : (currentLocale === "km" ? "ចាប់ផ្តើមតេស្ត" : "Start Test")} rounded='full' icon={<ArrowRight />} type='rightIcon' onClick={onClick}   />

          )}
        </div>
      </div>
    </div>
  )
}