
import React, { useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

import { useFetchAssessmentDetailsQuery } from "@/app/redux/service/result";
import { useParams } from "next/navigation";
import { PersonalitiesCircularProgress } from "../ComponentTest/PersonalityCricularProgress";
import StyledContentCard from "../ComponentTest/ValueDescription";
import StyledContentList from "../ComponentTest/ValueList";
import { RecommendationCard } from "../ComponentTest/RecommendationCard";
import QuizHeader from "../ComponentTest/QuizHeader";
import { QuizResultListingValue } from "../ComponentTest/QuizListiingValues";
import upIcon from "@/public/assets/skill-icon/up.png";
import Pagination from "../ComponentTest/Pagination";
import ValueSkeletonLoader from "../ComponentTest/Loading/ValuesSkeletonLoading";
import Image from "next/image";
import errorLoading from '@/public/assets/errorLoading.png'
// import { useGetAllFinalTestUuidsQuery } from "@/redux/feature/assessment/quiz";
// Define ChartData type
type ChartData = {
  label: string;
  score: number;
  color: string;
};
type value = {
  category: string;
  improvements: string[];
};
// Define ValueDetails type
type ValueDetails = {
  name: string;
  definition: string;
  characteristics: string;
  percentage: string;
};
type BarProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: {
    color?: string;
  };
};

type SchoolType = {
  school_uuid: string;
  school_name: string;
}

type Major = {
  major_name: string; // The name of the major
  schools: SchoolType[]; // An array of schools offering the major
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
export const ValueResultComponent = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const resultTypeString =
    typeof params.type === "string" ? params.type : "";
  const uuidString = typeof params.uuid === "string" ? params.uuid : "";

  // const { data: responseUuid } = useGetAllFinalTestUuidsQuery({ testUuid: uuidString })

  // const finalUuid = resultTypeString === "all" ? responseUuid?.payload?.referenced_test_uuids?.Values?.test_uuid || "" : uuidString;

  const finalResultTypeString = resultTypeString === "AllTests" ? "Values" : resultTypeString;

  const {
    data: response,
    isLoading,
    error
  } = useFetchAssessmentDetailsQuery({
    testUUID: uuidString,
    resultType: finalResultTypeString,
  });

  if(resultTypeString === 'all'){
    localStorage.setItem('currentTestUuid',uuidString)
  }

  // if (!resultTypeString || !uuidString) {
  //   return <div className=' w-full flex justify-center items-center'><Loading /></div>;
  // }

  if (isLoading) {
    return(
      <ValueSkeletonLoader/>
    )
    // return <div className='bg-white w-full flex justify-center items-center'><Loading /></div>;
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

  console.log("Response:", response);
  //  // Extract value details
  const valueDetails: ValueDetails[] = response?.valueDetails || [];
  console.log("Value Details:", valueDetails);
  // Define fixed colors for backgrounds and progress bars
  const backgroundColors = ["#FFFFFF", "#FFFFFF", "#FFFFFF"]; // Green-100, Orange-100, Red-100
  const progressBarColors = ["#4CAF50", "#FFA500", "#F44336"]; // Green, Orange, Red

  // Extract the chart data
  const chartData: ChartData[] =
    response?.chartData?.map(
      (item: { label: string; score: number }, index: number) => ({
        label: item.label,
        score: item.score,
        color: [
          "#F88787",
          "#FFA500",
          "#4CAF50",
          "#2196F3",
          "#9C27B0",
          "#FFC107",
          "#009688",
          "#00BCD4",
          "#03A9F4",
          "#3F51B5",
          "#E91E63",
        ][index % 11], // Cycle through colors
      })
    ) || [];

  console.log("Chart Data:", chartData);

  // Custom bar shape for dynamic coloring
  const CustomBar = (props: BarProps) => {
    const { x, y, width, height } = props;
    return (
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={props.payload?.color}
        radius={[4, 4, 0, 0]} // Rounded corners on top
      />
    );
  };


  const recommendedCareer = response?.careerRecommendations ?? [];
  console.log("Recommended Career: ", recommendedCareer);
  const focusGrowth = response?.key_improvements ?? [];

  console.log("Focus Growth: ", focusGrowth);

  // Render custom legend
  const renderCustomLegend = () => (
    <div className="w-full   space-y-2  flex flex-wrap justify-start items-start   lg:grid lg:grid-cols-2 lg:gap-3">
      {chartData.map((entry, index) => (
        <div key={index} className="flex items-center  space-x-2">
          <div
            className="w-4 h-4 rounded-[4px]"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-xs font-medium  text-gray-700">
            {entry.label}
          </span>
        </div>
      ))}
    </div>
  );
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

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 lg:p-12 bg-white rounded-lg space-y-12">
    
      <div>
        <h2 className="bg-secondary inline-block text-white text-lg md:text-2xl px-4 py-2 rounded-[8px] mb-6">
          ក្រាហ្វបង្ហាញពីបុគ្គលិកលក្ខណៈ
        </h2>
        {/* Render value details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueDetails.map((item, index) => (
            <PersonalitiesCircularProgress
              key={index}
              title={item.name} // Pass the API title
              progress={parseFloat(item.percentage)} // Convert percentage string to number
              color={progressBarColors[index % progressBarColors.length]} // Assign progress bar color
              bgColor={backgroundColors[index % backgroundColors.length]} // Assign background color
            />
          ))}
        </div>
      </div>

      <div>
        <QuizHeader
          title="ក្រាហ្វនេះបង្ហាញពី value ទាំងអស់របស់អ្នក"
          description=""
          size="sm"
          type="result"
        />
        {/* <h2 className="text-textprimary text-xl md:text-2xl pb-4">
          ក្រាហ្វនេះបង្ហាញពី value ទាំងអស់របស់អ្នក
        </h2> */}
        <div className="border border-slate-50 rounded-[8px]">
          {/* Bar Chart with custom legend */}
          <div className=" lg:space-y-8 mx-auto lg:p-4 items-center lg:mt-3 grid grid-cols-1 lg:grid-cols-3 ">
            {/* Bar Chart */}
            <div className="col-span-2 ">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={false} />
                  <Tooltip />
                  <Bar
                    dataKey="score"
                    shape={(props: BarProps) => <CustomBar {...props} />}
                    name="Score"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="col-span-1 flex items-center flex-col justify-between ">
              {renderCustomLegend()}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <QuizHeader
          title=" ការពិពណ៌នាពី value នីមួយៗរបស់អ្នក"
          description=""
          size="sm"
          type="result"
          titleColor="text-secondary"
        />
        {/* <h2 className="text-textprimary text-xl md:text-2xl pb-4">
          ការពិពណ៌នាពី value
        </h2> */}
        <div className="bg-bgPrimaryLight rounded-[8px] p-2 md:p-4">
          {valueDetails.map((item, index) => (
            <StyledContentCard
              key={index}
              title={item.name} // Use the name from the API response
              description={item.definition} // Use the definition from the API response
              bgColor={index % 2 === 0 ? "#0BBB8A" : "#FFA500"} // Alternate background colors
            />
          ))}
        </div>
      </div>
      <div>
        <QuizHeader
          title="លក្ខណៈសំខាន់ៗ របស់អ្នក"
          description=""
          size="sm"
          type="result"
        />
        {/* <h2 className="text-textprimary text-xl md:text-2xl pb-4">
          លក្ខណៈសំខាន់ៗ របស់អ្នក
        </h2> */}
        <div className="bg-bgPrimaryLight grid grid-cols-1 lg:grid-cols-2 p-2 md:p-4 rounded-[8px] ">
          {/* Dynamically render characteristics for each value */}
          {valueDetails.map((item, index) => {
            // Split characteristics into separate points
            const characteristics = item.characteristics
              ? item.characteristics
                  .split(".")
                  .filter((char: string) => char.trim() !== "")
              : [];

            return (
              <StyledContentList
                key={index}
                title={item.name} // Use the name from the API response
                points={characteristics.map((char: string, idx: number) => ({
                  text: char.trim(), // Trim whitespace around each characteristic
                  iconColor: idx % 2 === 0 ? "#4CAF50" : "#FFC107", // Alternate icon colors
                }))}
                bgColor={index % 2 === 0 ? "#0BBB8A" : "#FFA500"} // Alternate background colors
              />
            );
          })}
        </div>
      </div>
      <div className="">
        {/* Growth */}
        <QuizHeader
          title="ចំណុចដែលអ្នកត្រូវអភិវឌ្ឍបន្ថែម"
          description=""
          size="sm"
          type="result"
          titleColor="text-secondary"
        />
        <div className="">
          {focusGrowth.map((value: value, index: number) => (
            <QuizResultListingValue
              key={index}
              title={value.category}
              desc={
                value.improvements[0]
                  .split(".")
                  .filter((improvement) => improvement.trim() !== "") // Split and filter
              }
              image={upIcon}
            />
          ))}
        </div>
      </div>
      <div className="space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12 ">
        <QuizHeader
          title="ការងារទាំងនេះអាចនឹងសាកសមជាមួយអ្នក"
          description="These career may suitable for you"
          size="sm"
          type="result"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentItems.map((item: RecommendedCareer, index: number) => (
            <RecommendationCard
              key={item.career_name || index}
              jobTitle={item.career_name}
              jobDesc={item.description}
              majors={item.majors}
              jobList={item.categories}
              jobUuid={item.career_uuid}
            />
          ))}
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
  );
};