'use client'
import React, { useState } from 'react'
import { BadgeCheck, BadgeX, BadgeAlert } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


type props = {
    title: string;
    desc: string;
    label: number;
    isLoading?: boolean;
}

export const QuizLearningStyleResultCard = ({ title, desc, label, isLoading }: props) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded); // Toggle between expanded and collapsed
    };


    return (

        <div className="relative p-4 md:p-6 w-full bg-white rounded-xl">
            {/* Text and Response Section */}
            <div className='absolute top-0 right-0 flex justify-end pr-4'>
                {isLoading ? (
                    <Skeleton className="h-[40px] w-[120px] rounded-b-3xl" />
                ) : (
                    <div className={`text-xs md:text-base w-auto py-2 md:py-3 lg:py-4 px-2 md:px-3 lg:px-4 text-white rounded-b-3xl font-semibold flex items-center gap-1 md:gap-2 
                ${label === 1 ? 'bg-primary' : label === 2 ? 'bg-secondary' : label === 3 ? 'bg-danger' : ''} 
                `} >
                        {label === 1 && <BadgeCheck className='w-[16px] md:w-[20px]' strokeWidth={2} />}
                        {label === 2 && <BadgeAlert className='w-[16px] md:w-[20px]' strokeWidth={2} />}
                        {label === 3 && <BadgeX className='w-[16px] md:w-[20px]' strokeWidth={2} />}

                        {label === 1 && 'កម្រិតល្អ'}
                        {label === 2 && 'កម្រិតមធ្យម'}
                        {label === 3 && 'កម្រិតទាប'}
                    </div>
                )}
            </div>

            <div>
                {/* Title with padding top of 16px */}
                {isLoading ? (
                    <Skeleton className="h-[20px] w-[150px] rounded-xl mb-2" />
                ) : (
                    <h2 className="text-lg md:text-2xl font-bold mb-2 text-secondary ">{title}</h2>
                )}

                <div>
                    {isLoading ? (
                        <Skeleton className="h-[15px] w-[80%] rounded-md mb-2" />
                    ) : (
                        <p className={`text-sm md:text-base text-textprimary mb-1  `} >
                            {desc}
                        </p>
                    )}

                    {isLoading ? (
                        <Skeleton className="h-[20px] w-[100px] rounded-full" />
                    ) : (desc.split(' ').length > 20 && (
                        <button onClick={handleToggle} className="text-primary text-sm md:text-base">
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    ))}
                </div>

            </div>
        </div>


    )
}