

'use client'
import React, { useEffect, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton';
import { List } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useParams, usePathname, useRouter } from 'next/navigation';


type SchoolType = {
    school_uuid: string;
    school_name: string;
}

type Major = {
    major_name: string;
    schools: SchoolType[];
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

export const RecommendationCard = ({ jobTitle, majors, isLoading, jobList, jobUuid }: props) => {

    const [currentLocale, setCurrentLocale] = useState<string>('km');
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();


    const uuid = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid;
    const resultType = Array.isArray(params.resultType) ? params.resultType[0] : params.resultType;
    const finalUuid = resultType === 'all' ? localStorage.getItem('currentTestUuid') : uuid;

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        localStorage.setItem('resultTypeString', resultType)
        if (savedLanguage) {
            setCurrentLocale(savedLanguage);
        }

    }, []);


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
                                            <div className='bg-slate-100  text-gray-500 p-2 rounded-full hover:cursor-pointer'><List className='w-5 h-5' /></div>
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
                                    className={`text-md md:text-lg overflow-hidden text-textprimary line-clamp-2`}
                                >
                                    {jobList && jobList.length > 0 ? (
                                        jobList.map((job, index) => (
                                            <div key={index} className='pl-1'>
                                                <ul className="space-y-2 text-base md:text-md list-disc pl-6">

                                                    <li key={index}>{job.category_name}</li>

                                                </ul>

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
                                    className={` overflow-hidden text-textprimary line-clamp-3`}
                                
                                >

                                    {majors ? (
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
                                                                <li key={schoolIndex}>{school.school_name}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p className='text-gray-500'>No universities available for this major.</p>
                                                    )}
                                                </div>

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