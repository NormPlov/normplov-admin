import React from 'react'
import QuizHeader from './QuizHeader';
import { useParams } from 'next/navigation';
import { useGetAllAssessmentDetailQuery } from '@/app/redux/service/result';
import { RecommendationCard } from './RecommendationCard';
import Image from 'next/image';
import errorLoading from '@/public/assets/errorLoading.png'


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

export const FinalJobRecommendComponent = () => {
    const params = useParams();

    const uuidString = typeof params.uuid === 'string' ? params.uuid : '';


    const { data: response, isLoading, error } = useGetAllAssessmentDetailQuery({
        uuid: uuidString,
    });

    const resultTypeString = typeof params.resultType === 'string' ? params.resultType : '';

    console.log("data from career: ", response?.payload?.[0]?.user_response_data.recommendations)

    if(resultTypeString === 'AllTests'){
        localStorage.setItem('currentTestUuid',uuidString)
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



    // Use the correct career data for pagination
    const recommendedCareer = response?.payload?.[0]?.user_response_data.recommendations ?? [];

    return (

        <div className=' max-w-7xl mx-auto p-4 md:p-10 lg:p-12' >
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
                        recommendedCareer.map((item: RecommendedCareer, index: number) => (
                            <RecommendationCard
                                key={item.career_name || index}
                                jobTitle={item.career_name}
                                majors={item.majors}
                                jobList={item.categories}
                                jobUuid={item.career_uuid}
                            />
                        ))
                       
                    )
                }
            </div>
        </div>

    )
}