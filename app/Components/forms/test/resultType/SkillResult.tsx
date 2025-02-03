"use client"
import React, { useState } from 'react';
import { QuizCircularProgress } from '../chart/CirularProgress/QuizCirularProgress';
import QuizHeader from '../ComponentTest/QuizHeader';
import { QuizResultListing } from '../ComponentTest/QuizResultListing';
import checkIcon from '@/public/assets/skill-icon/check.png';
import upIcon from '@/public/assets/skill-icon/up.png';
import xIcon from '@/public/assets/skill-icon/x.png';
import { useFetchAssessmentDetailsQuery } from '@/app/redux/service/result';
import { useParams } from 'next/navigation';
import { RecommendationCard } from '../ComponentTest/RecommendationCard';
import Pagination from '../ComponentTest/Pagination';
import Image from 'next/image';
import errorLoading from '@/public/assets/errorLoading.png'
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllAssessmentDetailQuery } from '@/app/redux/service/result';

type Skill = {
  skill: string;
  description: string;
};

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

type RecommendedCareer = {
  career_name: string;
  description: string;
  majors: Major[]; 
  career_uuid: string;
  categories: Job[];
};

export const SkillResultComponent = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const resultTypeString = typeof params.type === 'string' ? params.type : '';
  const uuidString = typeof params.uuid === 'string' ? params.uuid : '';

  const { data: responseUuid } = useGetAllAssessmentDetailQuery({ uuid: uuidString })

  const finalUuid = resultTypeString === "AllTests" ? responseUuid?.payload?.referenced_test_uuids?.Skills?.test_uuid || "" : uuidString;

  const finalResultTypeString = resultTypeString === "AllTests" ? "Skills" : resultTypeString;

  const { data: response, isLoading, error } = useFetchAssessmentDetailsQuery({
    testUUID: finalUuid,
    resultType: finalResultTypeString
  });
  console.log("Skill data:",response)

  if(resultTypeString === 'AllTests'){
    localStorage.setItem('currentTestUuid',finalUuid)
  }

  console.log(`result: ${resultTypeString} id: ${uuidString}`)


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


  const skillCategory = response?.categoryPercentages;

  console.log("skill: ", skillCategory)

  const strongSkill = response?.skillsGrouped["Strong"] ?? [];
  const averageSkill = response?.skillsGrouped["Average"] ?? [];
  const weakSkill = response?.skillsGrouped["Weak"] ?? [];

  const recommendedCareer = response?.strongCareers;

  const topCategory = response?.topCategory

  console.log("category: ", topCategory)

  console.log("data from skill: ", response)

  // Pagination handler
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Calculate total pages for career recommendations
  const totalPages = Math.ceil((recommendedCareer?.length || 0) / itemsPerPage);

  // Get current items for the current page
  const currentItems = (recommendedCareer || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <div>
      {/* skill category  container */}
      <div className="bg-white">
        <div className="space-y-6 lg:space-y-16 max-w-7xl mx-auto p-4 md:p-10 lg:py-12 ">
          {isLoading ? (
            <Skeleton className='w-full h-[150px]' />
          ) : (
            <div className='space-y-4 lg:space-y-8'>
              
              <div>
                <p className='text-md md:text-xl mb-2 text-gray-700'>ជំនាញដែលលេចធ្លោរបស់អ្នក</p>
                <p className='text-3xl md:text-4xl text-primary font-bold '>{topCategory?.name || "Category Name"}</p>
              </div>

              <p className="text-lg md:text-xl  text-textprimary ">
                {topCategory?.description || "Category Description"}
              </p>
            </div>

          )}


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6  ">
            {isLoading ? (
              Array(4).fill(0).map((_, index) => (
                <QuizCircularProgress
                  key={index}
                  title=""
                  desc=""
                  progress={0}
                  isLoading={true}
                />
              ))
            ) : (
              <>

                <QuizCircularProgress
                  title="ជំនាញក្នុងការយល់ដឹង​"
                  desc="Cognitive Skill"
                  progress={skillCategory["Cognitive Skills"] || 0}
                />
                <QuizCircularProgress
                  title="ជំនាញអន្តរបុគ្គល​ "
                  desc="Interpersonal Skill"
                  progress={skillCategory["Interpersonal Skills"] || 0}
                  color="#FFA500"
                />
                <QuizCircularProgress
                  title="ជំនាញគ្រប់គ្រងខ្លួនឯង​"
                  desc="Self-Management Skill"
                  progress={skillCategory["Self-Management Skills"] || 0}
                  color="#F5C449"
                />
                <QuizCircularProgress
                  title="ជំនាញទំនាក់ទំនង​"
                  desc="Communication Skill"
                  progress={skillCategory["Communication Skills"] || 0}
                  color="#F88787"
                />
              </>
            )}

          </div>
        </div>
      </div>


      {/* For Strength */}
      {isLoading ? (
        <div className="bg-bgPrimaryLight">
          <div className="space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
            <div className='mb-4'>
              <Skeleton className='w-[180px] h-8 mb-2' />
              <Skeleton className='w-[120px] h-7' />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {Array(4).fill(0).map((_, index) => (
                <QuizResultListing
                  key={index}
                  title=""
                  desc=""
                  image=""
                  isLoading={true}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Only render this section if there is data
        strongSkill?.length > 0 && (
          <div className="bg-bgPrimaryLight">
            <div className="space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader title="ចំណុចខ្លាំងរបស់អ្នក" description="Your Strength" size="sm" type="result" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {strongSkill.map((skill: Skill, index: number) => (
                  <QuizResultListing
                    key={index}
                    title={skill.skill}
                    desc={skill.description}
                    image={checkIcon}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      )}


      {/* Growth */}
      {isLoading ? (
        <div className="bg-bgPrimaryLight">
          <div className="space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
            <div className='mb-4'>
              <Skeleton className='w-[180px] h-8 mb-2' />
              <Skeleton className='w-[120px] h-7' />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {Array(4).fill(0).map((_, index) => (
                <QuizResultListing
                  key={index}
                  title=""
                  desc=""
                  image=""
                  isLoading={true}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Only render this section if there is data
         averageSkill?.length > 0 && (
          <div className="bg-bgPrimaryLight">
             <div className="space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader titleColor='text-secondary' title="ចំណុចដែលត្រូវអភិវឌ្ឍបន្ថែមរបស់អ្នក" description="Your Growth Focus" size="sm" type="result" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                 {averageSkill.map((skill: Skill, index: number) => (
                  <QuizResultListing
                    key={index}
                    title={skill.skill}
                    desc={skill.description}
                    image={upIcon}
                  />
                ))} 
               </div>
          </div>
           </div>
         )
      )}


      {/* For Weakness */}
      {isLoading ? (
        <div className="bg-bgPrimaryLight">
          <div className="space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
            <div className='mb-4'>
              <Skeleton className='w-[180px] h-8 mb-2' />
              <Skeleton className='w-[120px] h-7' />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {Array(4).fill(0).map((_, index) => (
                <QuizResultListing
                  key={index}
                  title=""
                  desc=""
                  image=""
                  isLoading={true}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Only render this section if there is data
        weakSkill?.length > 0 && (
          <div className="bg-bgPrimaryLight">
            <div className="space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader titleColor='text-danger' title="ចំណុចខ្សោយរបស់អ្នក" description="Your Weakness" size="sm" type="result" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {weakSkill?.map((skill: Skill, index: number) => (
                  <QuizResultListing
                    key={index}
                    title={skill.skill}
                    desc={skill.description}
                    image={xIcon}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      )}



      <div className='max-w-7xl mx-auto p-4 md:p-10 lg:p-12 '>

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
              ))

            ) : (
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

    </div >
  );
};