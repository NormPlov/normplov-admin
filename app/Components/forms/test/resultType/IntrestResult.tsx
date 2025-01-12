import React from 'react'
import QuizHeader from '../ComponentTest/QuizHeader';
import { QuizInterestResultCard } from '../ComponentTest/QuizInterestResultCard';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// Import json
// import interestJson from '@/app/(user)/json/interestKh.json'
// import { StaticImageData } from 'next/image'
import { useParams } from 'next/navigation';
import { useFetchAssessmentDetailsQuery } from '@/app/redux/service/result';
import { RecommendationCard } from '../ComponentTest/RecommendationCard';
// import Loading from '@/components/General/Loading';

type ChartDataType = {
    label: string;
    score: number;
};

type InterestCardItem = {
    dimension_name: string;
    description: string;
    image_url: string;
};

type RecommendedCareer = {
    career_name: string;
    description: string;
    majors: Major[]; // Array of Major objects
};

type Major = {
    major_name: string; // The name of the major
    schools: string[];  // An array of schools offering the major
};

export const InterestResultComponent = () => {
    const params = useParams();

    const resultTypeString = typeof params.type === 'string' ? params.type : '';
    const uuidString = typeof params.uuid === 'string' ? params.uuid : '';

    const { data: response, isLoading, error } = useFetchAssessmentDetailsQuery({
        testUUID: uuidString,
        resultType: resultTypeString
    });
    console.log("data from interest: ", response)

    if (isLoading) {
        return <div className='w-full flex justify-center items-center'>Loading...</div>;
    }

    if (error || !response) {
        return <p>Error loading data or data is missing.</p>;
    }



    const desc = response[0]?.description

    const typeName = response[0]?.typeName

    const keyTraits = response[0]?.keyTraits

    const interestCard = response[0]?.dimensionDescriptions

    const chartData: ChartDataType[] = response[0]?.chartData.map((item: ChartDataType) => ({
        label: item.label,
        score: item.score * 10,
    })) || [];

    const careerPath =  response[0]?.careerPath

    console.log("image:", interestCard[0].image_url)

    // const { result } = interestJson;

    // const images: { [key: string]: StaticImageData } = {
    //     Artistic: creativityImage,
    //     Enterprising: enterprising,
    // };

    return (

        <div className='space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12' >

            <div className='w-full grid gap-4 grid-cols-1 lg:grid-cols-2 pb-4 '>
                <div className='col-span-1 space-y-2 md:space-y-4'>
                    <p className='text-md md:text-xl'>អ្នកគឺជា</p>
                    <p className='text-3xl md:text-4xl text-primary font-bold'>{typeName}</p>
                    <div className='flex flex-wrap gap-2'>
                        {keyTraits.map((item: string, index: number) => (
                            <div key={index} className="rounded-[8px] text-secondary bg-secondary bg-opacity-10  text-xs lg:text-sm max-w-fit px-1 lg:px-2">{item}</div>
                        ))}

                    </div>
                    <p className='text-textprimary'>{desc}</p>

                </div>


                <div className="col-span-1 ">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="label" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar name="Holland" dataKey="score" stroke="#FFA500" fill="#FFA500" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <QuizHeader title="បុគ្គលដែលមានចំណាប់អារម្មណ៍លើផ្នែកនេះមានទំនោរទៅខាង" description="Individuals with an interest in this area tend to be" size='sm' type='result' />

            <div className='flex flex-wrap gap-4 justify-center'>
                {interestCard.map((item: InterestCardItem, index: number) => (
                    <QuizInterestResultCard
                        key={index}
                        title={item.dimension_name}
                        desc={item.description}
                        image={item.image_url}
                      
                    />
                ))}
            </div>

            <div className='space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12 '>

                <QuizHeader title="ការងារទាំងនេះអាចនឹងសាកសមជាមួយអ្នក" description="These career may suitable for you" size='sm' type='result' />

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    {careerPath?.map((item: RecommendedCareer, index: number) => (
                        <RecommendationCard key={item.career_name || index} jobTitle={item.career_name} jobDesc={item.description} majors={item.majors} />

                    ))}


                </div>

            </div>


        </div>

    )
}
