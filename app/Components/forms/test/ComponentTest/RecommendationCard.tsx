'use client'
import React, { useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { majorsType } from '@/types/types';

type props = {
    jobTitle: string;
    jobDesc: string;
    majors: majorsType[];
}

export const RecommendationCard = ({ jobTitle, jobDesc, majors }: props) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded); // Toggle between expanded and collapsed
    };

    return (
        <div className="rounded-xl bg-[#FDFDFB] w-full h-auto mt-10 relative text-textprimary">
            {/* Instruction Label */}
            <span className="absolute left-4 -top-4 inline-flex items-center bg-primary px-4 py-1 text-lg md:text-xl font-semibold text-white rounded-xl">
                {jobTitle}
            </span>

            {/* How it Works Section */}
            <div className="px-6 pt-8 pb-6 rounded-b-lg">

                <p
                    className={`text-md md:text-lg  overflow-hidden text-textprimary ${!isExpanded ? 'line-clamp-3' : ''}`}
                    title={isExpanded ? '' : jobDesc} // Tooltip shows full text when truncated
                >
                    {jobDesc}
                </p>


                {/* Button to toggle between truncated and full text */}
                <button
                    onClick={handleToggle}
                    className="text-primary"
                >
                    {isExpanded ? 'Show Less' : 'Show More'}
                </button>

                <Accordion type="single" collapsible>
                    <AccordionItem className='border-none' value="item-1">
                        <AccordionTrigger className='text-lg md:text-xl font-semibold pb-2'>Recommended Majors</AccordionTrigger>
                        <AccordionContent>
                            {/* {majors.length > 0 ? (
                                majors.map((major, index) => (
                                    <ul key={index} className="space-y-2 text-lg list-disc pl-6">
                                        <Accordion type="single" collapsible>
                                            <AccordionItem className='border-none' value={`major-${index}`}>
                                                <AccordionTrigger className='text-lg md:text-xl pb-2'>{major}</AccordionTrigger>
                                                <AccordionContent>
                                                    {unis.length > 0 ? (
                                                        <ul className="space-y-2 text-base md:text-lg list-disc pl-6">
                                                            {unis.map((uni, uniIndex) => (
                                                                <li key={uniIndex}>{uni}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p>No universities available for this major.</p>
                                                    )}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </ul>
                                ))
                            ) : (
                                <p>No recommended majors available.</p>
                            )} */}
                            {majors.length > 0 ? (
                                majors.map((major, index) => (
                                    <div key={index}>
                                        <p className="font-semibold">{major.major_name}</p>
                                        {major.schools.length > 0 ? (
                                            <ul className="space-y-2 text-base md:text-lg list-disc pl-6">
                                                {major.schools.map((school, schoolIndex) => (
                                                    <li key={schoolIndex}>{school}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className='text-gray-500'>No universities available for this major.</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className='text-gray-500'>No recommended majors available.</p>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

        </div>

    )
}