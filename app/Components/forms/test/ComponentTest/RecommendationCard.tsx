// 'use client'
// import React, { useState } from 'react'
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion"
// import { majorsType } from '@/types/types';

// type props = {
//     jobTitle: string;
//     jobDesc: string;
//     majors: majorsType[];
// }

// export const RecommendationCard = ({ jobTitle, jobDesc, majors }: props) => {

//     const [isExpanded, setIsExpanded] = useState(false);

//     const handleToggle = () => {
//         setIsExpanded(!isExpanded); // Toggle between expanded and collapsed
//     };

//     return (
//         <div className="rounded-xl bg-[#FDFDFB] w-full h-auto mt-10 relative text-textprimary">
//             {/* Instruction Label */}
//             <span className="absolute left-4 -top-4 inline-flex items-center bg-primary px-4 py-1 text-lg md:text-xl font-semibold text-white rounded-xl">
//                 {jobTitle}
//             </span>

//             {/* How it Works Section */}
//             <div className="px-6 pt-8 pb-6 rounded-b-lg">

//                 <p
//                     className={`text-md md:text-lg  overflow-hidden text-textprimary ${!isExpanded ? 'line-clamp-3' : ''}`}
//                     title={isExpanded ? '' : jobDesc} // Tooltip shows full text when truncated
//                 >
//                     {jobDesc}
//                 </p>


//                 {/* Button to toggle between truncated and full text */}
//                 <button
//                     onClick={handleToggle}
//                     className="text-primary"
//                 >
//                     {isExpanded ? 'Show Less' : 'Show More'}
//                 </button>

//                 <Accordion type="single" collapsible>
//                     <AccordionItem className='border-none' value="item-1">
//                         <AccordionTrigger className='text-lg md:text-xl font-semibold pb-2'>Recommended Majors</AccordionTrigger>
//                         <AccordionContent>
//                             {/* {majors.length > 0 ? (
//                                 majors.map((major, index) => (
//                                     <ul key={index} className="space-y-2 text-lg list-disc pl-6">
//                                         <Accordion type="single" collapsible>
//                                             <AccordionItem className='border-none' value={`major-${index}`}>
//                                                 <AccordionTrigger className='text-lg md:text-xl pb-2'>{major}</AccordionTrigger>
//                                                 <AccordionContent>
//                                                     {unis.length > 0 ? (
//                                                         <ul className="space-y-2 text-base md:text-lg list-disc pl-6">
//                                                             {unis.map((uni, uniIndex) => (
//                                                                 <li key={uniIndex}>{uni}</li>
//                                                             ))}
//                                                         </ul>
//                                                     ) : (
//                                                         <p>No universities available for this major.</p>
//                                                     )}
//                                                 </AccordionContent>
//                                             </AccordionItem>
//                                         </Accordion>
//                                     </ul>
//                                 ))
//                             ) : (
//                                 <p>No recommended majors available.</p>
//                             )} */}
//                             {majors.length > 0 ? (
//                                 majors.map((major, index) => (
//                                     <div key={index}>
//                                         <p className="font-semibold">{major.major_name}</p>
//                                         {major.schools.length > 0 ? (
//                                             <ul className="space-y-2 text-base md:text-lg list-disc pl-6">
//                                                 {major.schools.map((school, schoolIndex) => (
//                                                     <li key={schoolIndex}>{school}</li>
//                                                 ))}
//                                             </ul>
//                                         ) : (
//                                             <p className='text-gray-500'>No universities available for this major.</p>
//                                         )}
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p className='text-gray-500'>No recommended majors available.</p>
//                             )}
//                         </AccordionContent>
//                     </AccordionItem>
//                 </Accordion>
//             </div>

//         </div>

//     )
// }


'use client'
import React, { useEffect, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton';
import { List } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type Major = {
    major_name: string;
    schools: string[];
};

type Job = {
    category_name: string;
    responsibilities: string[];
}

type props = {
    jobTitle: string;
    jobDesc?: string;
    majors: Major[];
    jobList?: Job[];
    isLoading?: boolean;
    jobUuid: string
}

export const RecommendationCard = ({ jobTitle, jobDesc, majors, isLoading, jobList, jobUuid }: props) => {

    const [isExpanded] = useState(false);
    const [currentLocale, setCurrentLocale] = useState<string>('km');
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();


    const uuid = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid;
    const resultType = Array.isArray(params.resultType) ? params.resultType[0] : params.resultType;

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        localStorage.setItem('resultTypeString', resultType)
        if (savedLanguage) {
            setCurrentLocale(savedLanguage);
        }

    }, []);


    // const handleToggle = () => {
    //     setIsExpanded(!isExpanded); // Toggle between expanded and collapsed
    // };

    const handleNavigation = () => {

        localStorage.setItem('careerUuid', jobUuid)

        const careerId = localStorage.getItem('careerUuid')

        if (careerId) {
            const newPath = `/${currentLocale}/recommend-job/${uuid}`;

            // Ensure the new path does not contain the duplicate locale part
            if (!pathname.startsWith(`/${currentLocale}`)) {
                // If the pathname doesn't include the current locale, add it
                router.push(newPath);
            } else {
                // If the pathname already includes the locale, navigate to the result directly
                router.push(newPath);
            }
        }else{
            toast.error('Something went wrong! Please try again later.')
        }



    };

    return (

        <div>
            <div className="rounded-t-xl bg-white w-full h-auto  text-textprimary">
                {/* Job Title */}


                {/* Job Description */}
                <div className="p-6 rounded-b-lg">
                    {isLoading ? (
                        <Skeleton className="h-[60px] w-full rounded-md mb-2" />
                    ) : (
                        <div className='space-y-2'>
                            <div className='flex justify-between items-center'>
                                <div >
                                    <p
                                        className={` text-md  text-secondary `}
                                    >
                                        វីស័យការងារ៖
                                    </p>
                                    <p className='text-lg md:text-xl font-bold text-primary'>{jobTitle}</p>
                                </div>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div onClick={() => handleNavigation()} className='bg-slate-100  text-gray-500 p-2 rounded-full hover:cursor-pointer'><List className='w-5 h-5' /></div>
                                        </TooltipTrigger>
                                        <TooltipContent className='bg-primary text-white border border-1 border-gray-300 rounded-[8px]'>
                                            <p>Job Detail</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>


                            </div>
                            <hr />

                            {/* Job */}
                            <div >
                                <p
                                    className={`text-md lg:text-md overflow-hidden text-gray-400 `}
                                >
                                    នៅក្នុងនោះមាន​ការងារដូចជា៖
                                </p>

                                <div
                                    className={`text-md md:text-lg overflow-hidden text-textprimary ${!isExpanded ? 'line-clamp-2' : ''}`}
                                    title={isExpanded ? '' : jobDesc}
                                >
                                    {jobList && jobList.length > 0 ? (
                                        jobList.map((job, index) => (
                                            <div key={index} className='pl-1'>


                                                <ul className="space-y-2 text-base md:text-md list-disc pl-6">

                                                    <li key={index}>{job.category_name}</li>

                                                </ul>


                                                {/* <span onClick={handleToggle} className="text-primary">
                                            {isExpanded ? 'Show Less' : 'Show More'}
                                        </span> */}
                                            </div>

                                        ))
                                    ) : (
                                        <p className='text-gray-500'>No recommended job available.</p>
                                    )}
                                </div>
                            </div>



                            {/* Majors */}
                            <div className='pt-2'>

                                <div
                                    className={` overflow-hidden text-textprimary ${!isExpanded ? 'line-clamp-2' : ''}`}
                                    title={isExpanded ? '' : jobDesc}
                                >

                                    {majors.length > 0 ? (
                                        majors.map((major, index) => (
                                            <div key={index} className='pl-1'>
                                                <p
                                                    className={` text-md  text-secondary `}
                                                >
                                                    ជំនាញ៖​ <span className='text-slate-600'>{major.major_name}</span>
                                                </p>
                                                <div className='ml-2'>
                                                    <p
                                                        className={`text-md lg:text-md overflow-hidden text-gray-400 mt-2`}
                                                    >
                                                        សាកលវិទ្យាល័យដែលអ្នកអាចជ្រើសរើសមានដូចជា៖
                                                    </p>
                                                    {major.schools.length > 0 ? (
                                                        <ul className="space-y-2 text-base md:text-md list-disc pl-6">
                                                            {major.schools.map((school, schoolIndex) => (
                                                                <li key={schoolIndex}>{school}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p className='text-gray-500'>No universities available for this major.</p>
                                                    )}
                                                </div>


                                                {/* <span onClick={handleToggle} className="text-primary">
                                            {isExpanded ? 'Show Less' : 'Show More'}
                                        </span> */}
                                            </div>

                                        ))
                                    ) : (
                                        <p className='text-gray-500'>No recommended majors available.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                    )}

             
                </div>
            </div>

        </div>



    )
}