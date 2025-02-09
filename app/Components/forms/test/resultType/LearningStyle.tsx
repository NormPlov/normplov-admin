import React, { useState } from 'react'
import { QuizLearningStyleResultCard } from '../ComponentTest/QuizLearningStyleResult';
import QuizHeader from '../ComponentTest/QuizHeader';
import { QuizOptHorizontalContainer } from '../ComponentTest/QuizOptHorizontalContainer';
// import learningStyleJson from '@/app/(user)/json/learningStyleKh.json'


import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Rectangle,
} from "recharts";
import { useFetchAssessmentDetailsQuery } from '@/app/redux/service/result';
import { RecommendationCard } from '../ComponentTest/RecommendationCard';
import { useParams } from 'next/navigation'
import Pagination from '../ComponentTest/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import errorLoading from '@/public/assets/errorLoading.png'
import { useGetAllAssessmentDetailQuery } from '@/app/redux/service/result';


type ChartData = {
    name: string;
    value: number;
    color: string;
};


type RecommendedTechnique = {
    technique_name: string;
    category: string;
    description: string;
    image_url: string;

};

type learningStyle = {
    dimension_name: string;
    dimension_description: string;
    level: number;
}

type BarProps = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    payload?: {
        color?: string;
    };
}

type SchoolType = {
    school_uuid: string;
    school_name: string;
}

type Major = {
    major_name: string; // The name of the major
    schools: SchoolType[];  // An array of schools offering the major
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


export const LearningStyleResultComponent = () => {
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const resultTypeString = typeof params.type === 'string' ? params.type : '';
    const uuidString = typeof params.uuid === 'string' ? params.uuid : '';

    const { data: responseUuid } = useGetAllAssessmentDetailQuery({ uuid: uuidString })

    const finalUuid = resultTypeString === "AllTests" ? responseUuid?.payload?.referenced_test_uuids?.LearningStyle?.test_uuid || "" : uuidString;

    const finalResultTypeString = resultTypeString === "AllTests" ? "LearningStyle" : resultTypeString;

    const { data: response, isLoading, error } = useFetchAssessmentDetailsQuery({
        testUUID: finalUuid,
        resultType: finalResultTypeString
    });

    if (resultTypeString === 'AllTests') {
        localStorage.setItem('currentTestUuid', finalUuid)
    }

    console.log("data from learning: ", response)


    // if fetching data error
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

    const recommendedTechniques = response?.recommendedTechniques ?? [];
    const learningStyles = response?.dimensions ?? [];
    const recommendedCareer = response?.relatedCareers ?? [];



    // const { Recommendation } = learningStyleJson;

    // console.log("image: ", recommendedTechniques[1].image_url)
    // Chart
    const colors = ["#82ca9d", "#ffc658", "#d84d8b", "#8884d8"];

    const chartData: ChartData[] = response?.chart?.labels.map(
        (label: string, index: number) => ({
            name: label,
            value: response.chart.values[index],
            color: colors[index % colors.length],
        })
    ) || [];

    // Custom renderer for each bar
    const CustomBar = (props: BarProps) => {
        const { x, y, width, height } = props;
        return <Rectangle fill={props?.payload?.color} x={x} y={y} width={width} height={height} />;
    };


    // Pagination handler
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Calculate total pages for career recommendations
    const totalPages = Math.ceil(recommendedCareer.length / itemsPerPage);

    // Get current items for the current page
    const currentItems = recommendedCareer.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const renderCustomLegend = () => (
        <div className="lg:ml-7 w-full space-y-2 flex flex-wrap justify-between items-center content-end lg:grid lg:grid-cols-2 lg:gap-4 lg:pb-8">
            {chartData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <div
                        className="w-6 h-6"
                        style={{
                            backgroundColor: entry.color,
                        }}
                    ></div>
                    <span className="text-normal">{entry.name}</span>
                </div>
            ))}
        </div>
    );


    return (
        <div>
            <div className='max-w-7xl mx-auto '>

                <div className='space-y-4 max-w-7xl mx-auto p-4 md:px-12   '>
                    <QuizHeader title="ក្រាហ្វបង្ហាញពីការរបៀបនៃការសិក្សារបស់អ្នក" description="Your Learning Style&#39;s Chart" size='sm' type='result' />
                    <div className='grid grid-cols-1 lg:grid-cols-3'>

                        <div className='col-span-2'>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                    width={200}
                                    height={300}
                                    data={chartData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={false} />
                                    <Tooltip />
                                    <Bar dataKey="value" shape={<CustomBar />} name="Percentage" />
                                </BarChart>
                            </ResponsiveContainer>
                            {isLoading ? (
                                <div className='flex gap-4 border border-dashed border-gray-300 p-4'>
                                    {Array(4).fill(0).map((_, index) => (
                                        <Skeleton key={index} className="h-[300px] w-[200px] " />
                                    ))}
                                </div>

                            ) : (
                                <></>
                                
                            )}
                        </div>

                        <div className="col-span-1 flex ">
                            {/* {renderCustomLegend()} */}
                            {isLoading ? (
                                <div className="mt-4 lg:mt-0 lg:ml-7 w-full space-y-2 flex flex-wrap justify-between items-center content-end lg:grid lg:grid-cols-2 lg:gap-4 ">
                                    {Array(4).fill(0).map((_, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Skeleton className="w-8 h-8 rounded-md" /> {/* Skeleton for colored square */}
                                            <Skeleton className="h-8 w-32 rounded" /> {/* Skeleton for text */}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                renderCustomLegend()
                            )}
                        </div>
                    </div>

                </div>



                <div className='p-4 md:p-10 lg:p-12 space-y-4 lg:space-y-8'>
                    <QuizHeader title="របៀបនៃការរៀនដែលអ្នកគួរជ្រើសរើសនិងមិនគួរ" description="Learning Style you should choose or avoid" size='sm' type='result' />

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        {isLoading ? (

                            Array(4).fill(0).map((_, index) => (
                                <QuizLearningStyleResultCard
                                    key={index}
                                    title=""
                                    desc=""
                                    label={0}
                                    isLoading={true}
                                />
                            ))
                        ) : (

                            learningStyles?.map((style: learningStyle, index: number) => (
                                <QuizLearningStyleResultCard
                                    key={index}
                                    title={style.dimension_name}
                                    desc={style.dimension_description}
                                    label={style.level}
                                    isLoading={false}
                                />
                            ))
                        )}
                    </div>
                </div>




                <div className='p-4 md:p-10 lg:p-12 space-y-4 lg:space-y-8'>
                    <QuizHeader title="ពួកយើងណែនាំវិធីសាស្រ្តខាងក្រោមដើម្បីជាជំនួយដល់ការសិក្សារបស់អ្នក" description="We recommend you to use these techniques for your studies" size='sm' type='result' />

                    <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {
                            isLoading ? (
                                Array(4).fill(0).map((_, index) => (
                                    <QuizOptHorizontalContainer
                                        key={index}
                                        title=""
                                        desc=""
                                        type='LearningStyle'
                                        image=""
                                        isLoading={true}
                                    />
                                ))
                            ) : (
                                recommendedTechniques?.map((item: RecommendedTechnique, index: number) => (
                                    <QuizOptHorizontalContainer
                                        key={index}
                                        title={item?.technique_name}
                                        desc={item?.description}
                                        type='LearningStyle'
                                        image={item.image_url}
                                        isLoading={false}
                                    />  
                                    

                                ))
                            )
                        }


                    </div>
                </div>

                <div className='space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12 '>

                    <QuizHeader title="ការងារទាំងនេះអាចនឹងសាកសមជាមួយអ្នក" description="These career may suitable for you" size='sm' type='result' />

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        {isLoading ? (
                            Array(6).fill(0).map((_, index) => (
                                <RecommendationCard
                                    key={index}
                                    jobTitle=""
                                    jobDesc=""
                                    majors={[]}
                                    isLoading={true}
                                    jobUuid=''
                                />
                            ))
                        ) : (
                            currentItems.map((item: RecommendedCareer) => (
                                <RecommendationCard
                                    key={item.career_uuid}
                                    jobTitle={item.career_name}
                                    jobDesc={item.description}
                                    majors={item.majors}
                                    jobList={item.categories}
                                    jobUuid={item.career_uuid}

                                />
                            ))
                        )}

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
        </div>
    )
}