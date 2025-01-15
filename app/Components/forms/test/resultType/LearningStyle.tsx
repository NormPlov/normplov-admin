import React from 'react'
import { QuizLearningStyleResultCard } from '../ComponentTest/QuizLearningStyleResult';
import QuizHeader from '../ComponentTest/QuizHeader';
import { QuizOptHorizontalContainer } from '../ComponentTest/QuizOptHorizontalContainer'


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


type ChartData = {
    name: string;
    value: number;
    color: string;
};


type RecommendedTechnique = {
    technique_name: string;
    category: string;
    description: string;
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

type Major = {
    major_name: string; // The name of the major
    schools: string[];  // An array of schools offering the major
};


type RecommendedCareer = {
    career_name: string;
    description: string;
    majors: Major[]; // Array of Major objects
};


export const LearningStyleResultComponent = () => {
    const params = useParams();

    const resultTypeString = typeof params.type === 'string' ? params.type : '';
    const uuidString = typeof params.uuid === 'string' ? params.uuid : '';
    console.log("learning style", resultTypeString)

    const { data: response, isLoading, error } = useFetchAssessmentDetailsQuery({
        testUUID: uuidString,
        resultType: resultTypeString
    });
    console.log("data from learning: ", response)

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error || !response) {
        return <p>Error loading data or data is missing.</p>;
    }

    const recommendedTechniques = response?.[0]?.recommendedTechniques || [];
    console.log("recommd",recommendedTechniques)

    const learningStyles = response?.[0]?.dimensions || [];
    console.log(" learning", learningStyles)

    const recommendedCareer = response?.[0]?.relatedCareers || [];

    // const { Recommendation } = learningStyleJson;

    console.log("career: ", recommendedCareer)
    // Chart
    const colors = ["#82ca9d", "#ffc658", "#d84d8b", "#8884d8"];

    const chartData: ChartData[] = response?.[0]?.chart?.labels.map(
        (label: string, index: number) => ({
            name: label,
            value: response[0].chart.values[index],
            color: colors[index % colors.length],
        })
    ) || [];

    // Custom renderer for each bar
    const CustomBar = (props: BarProps) => {
        const { x, y, width, height } = props;
        return <Rectangle fill={props?.payload?.color} x={x} y={y} width={width} height={height} />;
    };

    const renderCustomLegend = () => (
        <div className="w-full space-y-2 flex flex-wrap justify-between items-center content-end lg:grid lg:grid-cols-2 lg:gap-4 lg:pb-8">
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

                <div className='space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-3  '>
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
                    </div>

                    <div className="col-span-1 flex ">
                        {renderCustomLegend()}
                    </div>
                </div>



                <div className='p-4 md:p-10 lg:p-12 space-y-4 lg:space-y-8'>
                    <QuizHeader title="របៀបនៃការរៀនដែលអ្នកគួរជ្រើសរើសនិងមិនគួរ" description="Learning Style you should choose or avoid" size='sm' type='result' />

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        {learningStyles?.map((style:learningStyle, index:string) => (
                            <QuizLearningStyleResultCard
                                key={index}
                                title={style.dimension_name}
                                desc={style.dimension_description}
                                label={style.level}
                            />
                        ))}

                    </div>
                </div>


                <div className='p-4 md:p-10 lg:p-12 space-y-4 lg:space-y-8'>
                    <QuizHeader title="ពួកយើងណែនាំវិធីសាស្រ្តខាងក្រោមដើម្បីជាជំនួយដល់ការសិក្សារបស់អ្នក" description="We recommend you to use these techniques for your studies" size='sm' type='result' />

                    <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {recommendedTechniques?.map((item: RecommendedTechnique, index: number) => (
                            <QuizOptHorizontalContainer
                                key={index}
                                title={item?.technique_name}
                                desc={item?.description}
                                type='LearningStyle'
                            // image={item?.image_url}
                            />

                        ))}

                    </div>
                </div>

                <div className='space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12 '>

                    <QuizHeader title="ការងារទាំងនេះអាចនឹងសាកសមជាមួយអ្នក" description="These career may suitable for you" size='sm' type='result' />

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        {recommendedCareer?.map((item: RecommendedCareer, index: number) => (
                            <RecommendationCard key={item.career_name || index} jobTitle={item.career_name} jobDesc={item.description} majors={item.majors} />

                        ))}


                    </div>

                </div>




            </div>
        </div>
    )
}
