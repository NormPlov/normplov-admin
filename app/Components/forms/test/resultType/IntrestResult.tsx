import React, { useState } from 'react'
import QuizHeader from '../ComponentTest/QuizHeader';
import { QuizInterestResultCard } from '../ComponentTest/QuizInterestResultCard';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useParams } from 'next/navigation';
import { useFetchAssessmentDetailsQuery } from '@/app/redux/service/result';
import { RecommendationCard } from '../ComponentTest/RecommendationCard';
import Pagination from '../ComponentTest/Pagination';
import Image from 'next/image';
import errorLoading from '@/public/assets/errorLoading.png'
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllAssessmentDetailQuery } from '@/app/redux/service/result';

type ChartDataType = {
    label: string;
    score: number;
};

type InterestCardItem = {
    dimension_name: string;
    description: string;
    image_url: string;
};

type Job = {
    category_name: string;
    responsibilities: string[];
}

type RecommendedCareer = {
    career_name: string;
    description: string;
    majors: Major[];
    career_uuid: string;
    categories: Job[];
};

type SchoolType = {
    school_uuid: string;
    school_name: string;
}

type Major = {
    major_name: string; // The name of the major
    schools: SchoolType[];  // An array of schools offering the major
};

export const InterestResultComponent = () => {
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const resultTypeString = typeof params.type === 'string' ? params.type : '';
    const uuidString = typeof params.uuid === 'string' ? params.uuid : '';

    const { data: responseUuid } = useGetAllAssessmentDetailQuery({ uuid: uuidString })

    const finalUuid = resultTypeString === "AllTests" ? responseUuid?.payload?.referenced_test_uuids?.Interests?.test_uuid || "" : uuidString;

    const finalResultTypeString = resultTypeString === "AllTests" ? "Interests" : resultTypeString;

    const { data: response, isLoading, error } = useFetchAssessmentDetailsQuery({
        testUUID: finalUuid,
        resultType: finalResultTypeString
    });
    console.log("data from interest: ", response)
    
    if(resultTypeString === 'AllTests'){
        localStorage.setItem('currentTestUuid', finalUuid)
    }


    if (error) {
        return (
            <div className='bg-white w-full flex flex-col justify-center items-center py-6'>
                < Image
                    src={errorLoading}
                    alt="Error Loading Data"
                    width={500}
                    height={500}
                    className="object-fill"
                />
                <p className='text-danger text-md lg:text-xl font-semibold text-center'>Sorry, we couldn&#39;t load your data right now.</p>
                <p className='text-gray-500 text-sm lg:text-lg text-center'>Try refreshing the page or come back later.</p>
            </div>
        );
    }


    // Handle the response data
    const desc = response?.description ?? '';
    console.log("des: ", desc)
    const typeName = response?.typeName ?? '';
    const keyTraits = response?.keyTraits ?? [];
    const interestCard = response?.dimensionDescriptions ?? [];

    const chartData: ChartDataType[] = response?.chartData?.map((item: ChartDataType) => ({
        label: item.label,
        score: item.score * 10,
    })) || [];

    // Use the correct career data for pagination
    const recommendedCareer = response?.careerPath ?? [];



    // Pagination handler
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Calculate total pages for career recommendations
    const totalPages = Math.ceil(recommendedCareer?.length / itemsPerPage);

    // Get current items for the current page
    const currentItems = recommendedCareer.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    console.log("image: ", interestCard?.[0]?.image_url)
    return (

        <div className='space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12' >

            <div className='w-full grid gap-4 grid-cols-1 lg:grid-cols-2 pb-4 '>
                <div className='col-span-1 space-y-2 md:space-y-4'>

                    {/* Skeleton for the title */}
                    {isLoading ? (
                        <Skeleton className="h-6 w-32 rounded-xl" />
                    ) : (
                        <p className='text-2xl'>អ្នកគឺជា</p>
                    )}

                    {/* Skeleton for the typeName */}
                    {isLoading ? (
                        <Skeleton className="h-10 w-48 md:w-64 rounded-xl" />
                    ) : (
                        <p className='text-3xl md:text-4xl text-primary font-bold'>{typeName}</p>
                    )}

                    {/* Skeleton for keyTraits */}
                    {isLoading ? (
                        <div className='flex flex-wrap gap-2'>
                            {Array(3).fill(0).map((_, index) => (
                                <Skeleton key={index} className="h-8 w-24 rounded-[8px]" />
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-wrap gap-2'>
                            {keyTraits.map((item: string, index: number) => (
                                <div key={index} className="rounded-[8px] text-secondary bg-secondary bg-opacity-10 text-sm lg:text-md max-w-fit px-1 lg:px-2">{item}</div>
                            ))}
                        </div>
                    )}

                    {/* Skeleton for the description */}
                    {isLoading ? (
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                    ) : (
                        <p className='text-textprimary text-lg'>{desc}</p>
                    )}

                </div>


                <div className="col-span-1 w-full md:h-[450px] h-[300px]">
                    {isLoading ? (
                        <Skeleton className="h-[250px] w-[300px] rounded-xl " />
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart
                                cx="50%"
                                cy="50%"
                                outerRadius="70%" // Increased outerRadius for more space
                                data={chartData}
                                margin={{ top: 10, right: 0, bottom: 20, left: 20 }} // Added margin for more padding
                            >
                                <PolarGrid />
                                <PolarAngleAxis dataKey="label" axisLine={false} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                <Radar name="Holland" dataKey="score" stroke="#FFA500" fill="#FFA500" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            <QuizHeader title="បុគ្គលដែលមានចំណាប់អារម្មណ៍លើផ្នែកនេះមានទំនោរទៅខាង" description="Individuals with an interest in this area tend to be" size='sm' type='result' />

            <div className='flex flex-wrap gap-4 justify-center'>
                {
                    isLoading ? (

                        Array(2).fill(0).map((_, index) => (
                            <QuizInterestResultCard
                                key={index}
                                title=""
                                desc=""
                                image=""
                                isLoading={true}

                            />
                        ))

                    ) : (
                         interestCard.map((item: InterestCardItem, index: number) => (
                            <QuizInterestResultCard
                                key={index}
                                title={item.dimension_name}
                                desc={item.description}
                                image={item.image_url}
                                isLoading={false}

                            />
                         ))
                    )
                }

            </div>

            <div className=' max-w-7xl mx-auto '>

                <QuizHeader title="ការងារទាំងនេះអាចនឹងសាកសមជាមួយអ្នក" description="These career may suitable for you" size='sm' type='result' />

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

                    {
                        isLoading ? (
                            Array(6).fill(0).map((_, index) => (

                                <RecommendationCard
                                    key={index}
                                    jobTitle=""
                                    jobDesc=""
                                    majors={[]}
                                    isLoading={true}
                                    jobUuid=''
                                />

                            ))) : (
                                currentItems.map((item: RecommendedCareer, index: number) => (
                                <RecommendationCard
                                    key={item.career_name || index}
                                    jobTitle={item.career_name}
                                    jobDesc={item.description}
                                    majors={item.majors}
                                    jobList={item.categories}
                                    jobUuid={item.career_uuid}
                                />
                            ))
                        )
                    }
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={handlePageChange}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                />



            </div>


        </div>

    )
}