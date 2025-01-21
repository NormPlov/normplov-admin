import React from "react";
import checkIcon from "@/public/assets/skill-icon/check.png";
import xIcon from "@/public/assets/skill-icon/x.png";
import QuizHeader from "../ComponentTest/QuizHeader";
import { QuizResultListing } from "../ComponentTest/QuizResultListing";
import { useFetchAssessmentDetailsQuery } from "@/app/redux/service/result";
import { useParams } from "next/navigation";
import CardPersonality from "../ComponentTest/CardPersonality";
import { RecommendationCard } from "../ComponentTest/RecommendationCard";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
  TooltipProps
} from "recharts";
// Define types for API response
type PersonalityDimension = {
  dimension_name: string;
  score: number;
};

type ChartData = {
  label: string;
  score: number;
  color: string;
};

type BarProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: { color?: string };
};
type Major = {
  major_name: string; // The name of the major
  schools: string[];  // An array of schools offering the major
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


export const PersonalityResultComponent = () => {
  const params = useParams();
  const dimensionFullNames: { [key: string]: string } = {
    I_Score: "Introvert Score",
    E_Score: "Extrovert Score",
    S_Score: "Sensors Score",
    T_Score: "Thinkers Score",
    J_Score: "Judgers Score",
    N_Score: "Intuitive Score",
    F_Score: "Feeling Score",
    P_Score: "Perceivers Score",
  };

  // Normalize the values from params
  // const resultType = Array.isArray(params.resultType) ? params.resultType[0] : params.resultType;
  // const uuid = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid;

  const resultTypeString =
    typeof params.type === "string" ? params.type : "";
  const uuidString = typeof params.uuid === "string" ? params.uuid : "";

  const { data: response, error } = useFetchAssessmentDetailsQuery({
    testUUID: uuidString,
    resultType: resultTypeString,
  });

  console.log(`result: ${resultTypeString} id: ${uuidString}`);

  if (!resultTypeString || !uuidString) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error loading data</p>;
  }
  //   const skillCategory = response?.[0]?.categoryPercentages;
  const personalities = response?.[0]?.personalityType;
  const personalitiesDimension = response?.[0]?.dimensions;
  const dimensions: PersonalityDimension[] = response?.[0]?.dimensions || [];
  const chartData: ChartData[] = dimensions.map((dim, index) => ({
    label: dimensionFullNames[dim.dimension_name] || dim.dimension_name, // Use full name or fallback to the key
    score: dim.score,
    color: [
      "#fa6a02", // Orange
      "#fa0272", // Pink
      "#fadd02", // Yellow
      "#029bfa", // Teal
      "#02faa7", // green
      "#6502fa", // Orange
      "#11b851", // Purple
      "#f74848", // Orange

    ][index % 8], // Cycle through colors
  }));
 
  
  const CustomBar = (props: BarProps) => {
    const { x, y, width, height } = props;
    return (
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={props.payload?.color}
        radius={[4, 4, 0, 0]} // Rounded top corners
      />
    );
  };
  const renderCustomLegend = () => (
    <div className="w-full flex  flex-wrap gap-8  ">
      {chartData.map((entry, index) => (
        <div key={index} className="flex items-center  gap-4  ">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-md text-textprimary">{entry.label}</span>
        </div>
      ))}
    </div>
  );

  console.log("Personalities dimension", personalitiesDimension);

  const personailitiesTrait = response?.[0]?.traits;
  console.log("PersonailitiesTrait", personailitiesTrait);
  console.log("PersonailitiesTrait Positive", personailitiesTrait?.positive);
  console.log("PersonailitiesTrait Negative", personailitiesTrait?.negative);
  console.log("Personailities Strength", response?.[0]?.strengths);
  console.log("Personailities Weakness", response?.[0]?.weaknesses);

  const recommendedCareer = response?.[0]?.careerRecommendations;
  console.log("Recommended Career: ", recommendedCareer);
  // Example data for the RecommendationCard
  const recommendations = [
    {
      jobTitle: "Software Engineer",
      jobDesc:
        "Design, develop, and maintain software applications. Collaborate with cross-functional teams to deliver high-quality products.",
      majors: [
        {
          major_name: "Computer Science",
          schools: ["MIT", "Stanford University", "Carnegie Mellon University"],
        },
        {
          major_name: "Software Engineering",
          schools: ["Harvard University", "UC Berkeley"],
        },
      ],
    },
    {
      jobTitle: "Data Analyst",
      jobDesc:
        "Analyze data to uncover trends and insights. Prepare data reports to assist in decision-making.",
      majors: [
        {
          major_name: "Data Science",
          schools: ["NYU", "Columbia University"],
        },
        {
          major_name: "Statistics",
          schools: ["Princeton University", "University of Chicago"],
        },
      ],
    },
  ];
  const CustomTooltip = ({
    active,
    payload,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as {
        label: string;
        score: number;
        color: string; // Add color property from chartData
      }; // Ensure payload structure is typed correctly
  
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
      
          <p className="font-semibold text-slate-600">{data.label}</p>
          <p className="text-gray-500">Score: {data.score}</p>
        </div>
      );
    }
  
    return null;
  };
  return (
    <div className="bg-white">
      {/* Personalities Name and Description */}
      <div className=" max-w-7xl mx-auto">
        <div className="">
          <CardPersonality
            titleForCard="បុគ្គលិកលក្ខណៈរបស់អ្នកគឺជា"
            name={personalities?.name}
            title={personalities?.title}
            description={personalities?.description}
          />
        </div>
        <div className="mx-4 md:mx-0 border border-slate-50 mt-5 md:mt-14 p-6 rounded-[8px] ">
          <h2 className="bg-secondary inline-block text-white text-lg md:text-2xl px-4 py-2 rounded-[8px] mb-6">
            ក្រាហ្វបង្ហាញពីបុគ្គលិកលក្ខណៈ
          </h2>
          <div className="bg-white lg:space-y-8 mx-auto lg:p-4 lg:mt-3 grid grid-cols-1 lg:grid-cols-3">
            <div className="col-span-2 ">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<CustomTooltip />} />
                  {/* <XAxis dataKey="label" /> */}
                  {/* <Tooltip /> */}
                  <Bar
                    dataKey="score"
                    shape={(props: BarProps) => <CustomBar {...props} />}
                    name="Score"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className=" col-span-1 flex  flex-col items-center justify-center">
              {renderCustomLegend()}
            </div>
          </div>
          {/* Legend */}
         {/* Legend */}
        
        </div>
        <div className="mx-4 md:mx-0 border border-slate-50 mt-5 md:mt-14 p-6 rounded-[8px]">
          <h2 className="bg-secondary inline-block text-white text-lg md:text-2xl px-4 py-2 rounded-[8px] mb-6">
            លក្ខណៈសំខាន់ៗរបស់ {personalities?.name}
          </h2>
          {/* Positive Traits */}
          <div className="">
            <div className="text-primary space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader
                title="ចំណុចវិជ្ជមានរបស់អ្នក"
                description="Positive Traits"
                size="sm"
                type="result"
                titleColor="text-success"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {personailitiesTrait?.positive.map(
                  (trait: string, index: number) => (
                    <QuizResultListing
                      key={index}
                      title=""
                      desc={trait}
                      image={checkIcon}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Negative Traits */}
          <div className="">
            <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader
                title="ចំណុចអវិជ្ជមានរបស់អ្នក"
                description="Negative Traits"
                size="sm"
                type="result"
                titleColor="text-danger"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {personailitiesTrait?.negative.map(
                  (trait: string, index: number) => (
                    <QuizResultListing
                      key={index}
                      title=""
                      desc={trait}
                      image={xIcon}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4 md:mx-0 border border-slate-50 mt-5 md:mt-14 p-6 rounded-[8px]">
          <h2 className="bg-secondary inline-block text-white text-lg md:text-2xl px-4 py-2 rounded-[8px] mb-6">
            លក្ខណៈសំខាន់ៗរបស់ {personalities?.name}
          </h2>
          {/* Strength */}
          <div className="">
            <div className="space-y-8 text-primary max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader
                title="ចំណុចខ្លាំងរបស់អ្នក"
                description="Strength"
                size="sm"
                type="result"
                titleColor="text-success"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {response?.[0]?.strengths.map(
                  (strength: string, index: number) => (
                    <QuizResultListing
                      key={index}
                      title="" // No title
                      desc={strength} // Display strength description
                      image={checkIcon} // Positive icon
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Weakness */}
          <div className="">
            <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader
                title="ចំណុចខ្សោយរបស់អ្នក"
                description="Weakness"
                size="sm"
                type="result"
                titleColor="text-danger"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {response?.[0]?.weaknesses.map(
                  (weakness: string, index: number) => (
                    <QuizResultListing
                      key={index}
                      title="" // No title
                      desc={weakness} // Display weakness description
                      image={xIcon} // Negative icon
                    />
                  )
                )}
              </div>
            </div>
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
            {recommendations.map((recommendation, index) => (
              <RecommendationCard
                key={index}
                jobTitle={recommendation.jobTitle}
                jobDesc={recommendation.jobDesc}
                majors={recommendation.majors}
                jobUuid=""
                jobList={[]}
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
