import React from 'react'
import CircularProgress from './CircularProgressBar';
import { Skeleton } from '@/components/ui/skeleton'

type props = {
  title: string;
  desc: string;
  progress: number;
  color?: string;
  isLoading?: boolean;
}

export const QuizCircularProgress = ({ title, desc, progress, color, isLoading }: props) => {
  return (
    <div className='flex items-center gap-4'>
    {/* Circular Progress */}
    {isLoading ? (
      <Skeleton className="h-[60px] w-[60px] rounded-full" />  // Skeleton for the CircularProgress
    ) : (
      <CircularProgress progress={progress} color={color} />
    )}
    
    <div>
      {/* Title Skeleton */}
      {isLoading ? (
        <Skeleton className="h-[20px] w-[150px] mb-2" />
      ) : (
        <p className='text-lg md:text-xl lg:text-2xl text-textprimary'>{title}</p>
      )}

      {/* Description Skeleton */}
      {isLoading ? (
        <Skeleton className="h-[15px] w-[200px]" />
      ) : (
        <p className='text-secondary text-sm md:text-md lg:text-base font-medium'>{desc}</p>
      )}
    </div>
  </div>
  )
}