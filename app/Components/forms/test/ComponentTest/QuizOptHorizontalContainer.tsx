
'use client';
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { QuizButton } from './QuizButton';
import { ArrowRight } from 'lucide-react';
import placeholderImage from '@/public/assets/placeholder.png';

type Props = {
  title: string;
  desc: string;
  image?: StaticImageData | string;
  buttonText?: string;
  type?: 'main' | 'LearningStyle';
  badgeText?: string;
  onClick?: () => void;
};

export const QuizOptHorizontalContainer = ({
  title,
  desc,
  image,
  buttonText,
  type = 'main',
  badgeText,
  onClick,
}: Props) => {
  // Validate the image source
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(
    image && typeof image === 'string' && image.startsWith('http')
      ? image
      : placeholderImage
  );

  return (
    <div
      className={`flex flex-col md:flex-row w-full bg-white p-4 gap-4 rounded-xl ${
        type === 'LearningStyle' ? 'justify-center items-center' : ''
      }`}
    >
      {/* Image Section */}
      <div className="flex-none md:w-1/4 flex justify-center items-center">
        <Image
          src={imgSrc}
          alt="Technique Illustration"
          width={200}
          height={200}
          className="object-contain"
          onError={() => setImgSrc(placeholderImage)} // Set placeholder on error
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-between gap-4">
        <div>
          <h2
            className={`text-xl font-bold ${
              type === 'main' ? 'text-primary mb-1' : 'text-secondary'
            }`}
          >
            {title}
          </h2>
          {type === 'LearningStyle' && (
            <p className="rounded-full text-textprimary text-opacity-80 text-sm mb-2">
              {badgeText}
            </p>
          )}
          <p className="text-base text-textprimary">{desc}</p>
        </div>

        {/* Button Section */}
        {type === 'main' && (
          <div className="flex justify-start md:justify-end">
            <QuizButton
              title={buttonText || 'Start Quiz'}
              rounded="full"
              icon={<ArrowRight />}
              type="rightIcon"
              onClick={onClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};
