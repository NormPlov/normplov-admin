import React from "react";
import QuizHeader from "../ComponentTest/QuizHeader";
import { QuizInterestResultCard } from "../ComponentTest/QuizInterestResultCard";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useParams } from "next/navigation";
import { useFetchAssessmentDetailsQuery } from "@/app/redux/service/result";
import { RecommendationCard } from "../ComponentTest/RecommendationCard";

// Type Definitions
type ChartDataType = {
  label: string;
  score: number;
};

// type InterestCardItem = {
//   dimension_name: string;
//   description: string;
//   image_url: string;
// };

// type RecommendedCareer = {
//   career_name: string;
//   description: string;
//   majors: Major[];
// };

// type Major = {
//   major_name: string;
//   schools: string[];
// };

// type Category = {
//   category_name: string;
//   responsibilities: string[];
// };

// Matches the InterestsResponse type
// type InterestsResponse = {
//   assessmentType: "Interests";
//   testUUID: string;
//   testName: string;
//   createdAt: string;
//   hollandCode: string;
//   typeName: string;
//   description: string;
//   keyTraits: string[];
//   careerPath: RecommendedCareer[];
//   chartData: ChartDataType[];
//   categories: Category[];
//   dimensionDescriptions: InterestCardItem[];
// };

// // General Assessment Response
// type AssessmentResponse = InterestsResponse; // Extend here for additional types if needed

// export const InterestResultComponent= () => {
//   const params = useParams();

//   const resultTypeString = typeof params.type === "string" ? params.type : "";
//   const uuidString = typeof params.uuid === "string" ? params.uuid : "";

//   const { data: response, isLoading, error } = useFetchAssessmentDetailsQuery({
//     testUUID: uuidString,
//     resultType: resultTypeString,
//   });

//   if (isLoading) {
//     return (
//       <div className="w-full flex justify-center items-center">
//         Loading...
//       </div>
//     );
//   }

//   if (error || !response || response.length === 0) {
//     return <p>Error loading data or data is missing.</p>;
//   }

//   // Filter only Interests type assessments
//   const interestsData = response.filter(
//     (items) => items.user_response_data?.assessmentType === "Interests"
//   ) as InterestsResponse[];

//   if (!interestsData || Object.keys(interestsData).length === 0) {
//     return <p>No assessments of type "Interests" found.</p>;
//   }
//   const parsedData = interestsData[0]; // Use the first "Interests" response

//   const {
//     description,
//     typeName,
//     keyTraits,
//     dimensionDescriptions,
//     chartData,
//     careerPath,
//   } = parsedData;


//   // Transform chart data for visualization
//   const transformedChartData = chartData.map((item) => ({
//     label: item.label,
//     score: item.score * 10, // Example transformation
//   }));

//   return (
//     <div className="space-y-4 lg:space-y-8 max-w-8xl mx-auto p-4 md:p-10 lg:p-12">
//       {/* Header Section */}
//       <div className="w-full grid gap-4 grid-cols-1 lg:grid-cols-2 pb-4 ">
//         <div className="col-span-1 space-y-2 md:space-y-4">
//           <p className="text-md md:text-xl">អ្នកគឺជា</p>
//           <p className="text-3xl md:text-4xl text-primary font-bold">
//             {typeName}
//           </p>
//           <div className="flex flex-wrap gap-2">
//             {keyTraits.map((trait, index) => (
//               <div
//                 key={index}
//                 className="rounded-[8px] text-secondary bg-secondary bg-opacity-10 text-xs lg:text-sm max-w-fit px-1 lg:px-2"
//               >
//                 {trait}
//               </div>
//             ))}
//           </div>
//           <p className="text-textprimary">{description}</p>
//         </div>

//         <div className="col-span-1">
//           <ResponsiveContainer width="100%" height="100%">
//             <RadarChart
//               cx="50%"
//               cy="50%"
//               outerRadius="80%"
//               data={transformedChartData}
//             >
//               <PolarGrid />
//               <PolarAngleAxis dataKey="label" />
//               <PolarRadiusAxis angle={30} domain={[0, 100]} />
//               <Radar
//                 name="Holland"
//                 dataKey="score"
//                 stroke="#FFA500"
//                 fill="#FFA500"
//                 fillOpacity={0.6}
//               />
//             </RadarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Dimensions Section */}
//       <QuizHeader
//         title="បុគ្គលដែលមានចំណាប់អារម្មណ៍លើផ្នែកនេះមានទំនោរទៅខាង"
//         description="Individuals with an interest in this area tend to be"
//         size="sm"
//         type="result"
//       />

//       <div className="flex flex-nowrap gap-4 justify-start overflow-x-auto">
//         {dimensionDescriptions.map((item, index) => {
//           const imageUrl = item.image_url
//             ? `${process.env.NEXT_PUBLIC_NORMPLOV_API}${item.image_url}`
//             : "/assets/placeholder.png";

//           return (
//             <QuizInterestResultCard
//               key={index}
//               title={item.dimension_name}
//               desc={item.description}
//               image={imageUrl || "/assets/placeholder.png"}
//             />
//           );
//         })}
//       </div>


//       {/* Career Recommendations Section */}
//       <div className="space-y-4 lg:space-y-8 max-w-8xl mx-auto ">
//         <QuizHeader
//           title="ការងារទាំងនេះអាចនឹងសាកសមជាមួយអ្នក"
//           description="These careers may be suitable for you"
//           size="sm"
//           type="result"
//         />

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           {careerPath.map((item, index) => (
//             <RecommendationCard
//               key={item.career_name || index}
//               jobTitle={item.career_name}
//               jobDesc={item.description}
//               majors={item.majors}
//               jobUuid={""} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };


export const InterestResultComponent = () => {
  const params = useParams();

  const resultTypeString = typeof params.type === "string" ? params.type : "";
  const uuidString = typeof params.uuid === "string" ? params.uuid : "";

  const { data: response, isLoading, error } = useFetchAssessmentDetailsQuery({
    testUUID: uuidString,
    resultType: resultTypeString,
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error || !response || response.length === 0) {
    return <p>Error loading data or data is missing.</p>;
  }

  // Parse and filter Interests data
  const interestsData = response
    .map((item) => {
      if (typeof item.user_response_data === "string") {
        try {
          return JSON.parse(item.user_response_data); // Parse the string into an object
        } catch (e) {
          console.error("Failed to parse user_response_data:", e);
          return null; // Return null for invalid JSON
        }
      }
      return null; // Return null for non-string data
    })
    .filter((data) => data?.test_name === "Interests Test"); // Filter for Interests Test

  if (!interestsData || interestsData.length === 0) {
    return <p>No assessments of type Interests found.</p>;
  }

  const parsedData = interestsData[0]; // Use the first "Interests" response

  const {
    description,
    typeName,
    keyTraits,
    dimensionDescriptions,
    chartData,
    careerPath,
  } = parsedData;

  // Transform chart data for visualization
  const transformedChartData = chartData.map((item:ChartDataType) => ({
    label: item.label,
    score: item.score * 10, // Example transformation
  }));

  return (
    <div className="space-y-4 lg:space-y-8 max-w-8xl mx-auto p-4 md:p-10 lg:p-12">
      {/* Header Section */}
      <div className="w-full grid gap-4 grid-cols-1 lg:grid-cols-2 pb-4 ">
        <div className="col-span-1 space-y-2 md:space-y-4">
          <p className="text-md md:text-xl">អ្នកគឺជា</p>
          <p className="text-3xl md:text-4xl text-primary font-bold">
            {typeName}
          </p>
          <div className="flex flex-wrap gap-2">
            {keyTraits.map((trait: string[], index: React.Key | null | undefined) => (
              <div
                key={index}
                className="rounded-[8px] text-secondary bg-secondary bg-opacity-10 text-xs lg:text-sm max-w-fit px-1 lg:px-2"
              >
                {trait}
              </div>
            ))}
          </div>
          <p className="text-textprimary">{description}</p>
        </div>

        <div className="col-span-1">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="80%"
              data={transformedChartData}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="label" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Holland"
                dataKey="score"
                stroke="#FFA500"
                fill="#FFA500"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dimensions Section */}
      <QuizHeader
        title="បុគ្គលដែលមានចំណាប់អារម្មណ៍លើផ្នែកនេះមានទំនោរទៅខាង"
        description="Individuals with an interest in this area tend to be"
        size="sm"
        type="result"
      />

      <div className="flex flex-nowrap gap-4 justify-start overflow-x-auto">
        {dimensionDescriptions.map((item: { image_url: string; dimension_name: string; description: string; }, index: React.Key | null | undefined) => {
          const imageUrl = item.image_url
            ? `${process.env.NEXT_PUBLIC_NORMPLOV_API}${item.image_url}`
            : "/assets/placeholder.png";

          return (
            <QuizInterestResultCard
              key={index}
              title={item.dimension_name}
              desc={item.description}
              image={imageUrl || "/assets/placeholder.png"}
            />
          );
        })}
      </div>

      {/* Career Recommendations Section */}
      <div className="space-y-4 lg:space-y-8 max-w-8xl mx-auto ">
        <QuizHeader
          title="ការងារទាំងនេះអាចនឹងសាកសមជាមួយអ្នក"
          description="These careers may be suitable for you"
          size="sm"
          type="result"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {careerPath.map((item: { career_name: string; description: string | undefined; majors: { major_name: string; schools: string[]; }[]; }, index: string) => (
            <RecommendationCard
              key={item.career_name || index}
              jobTitle={item.career_name}
              jobDesc={item.description}
              majors={item.majors}
              // jobUuid={""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
