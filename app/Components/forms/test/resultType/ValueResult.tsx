
import React from "react";

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
// Define ChartData type
type ChartData = {
  label: string;
  score: number;
  color: string;
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
}
export const ValueResultComponent = () => {
  const params = useParams();

  const resultTypeString =
    typeof params.type === "string" ? params.type : "";
  const uuidString = typeof params.uuid === "string" ? params.uuid : "";

  const {
    data: response,
    error,
    isLoading,
  } = useFetchAssessmentDetailsQuery({
    testUUID: uuidString,
    resultType: resultTypeString,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !response) return <p>Error loading data...</p>;

  console.log("Response:", response);
  //  // Extract value details
  const valueDetails:ValueDetails[] = response?.[0]?.valueDetails || [];
  console.log("Value Details:", valueDetails);
  // Define fixed colors for backgrounds and progress bars
  const backgroundColors = ["#FFFFFF", "#FFFFFF", "#FFFFFF"]; // Green-100, Orange-100, Red-100
  const progressBarColors = ["#4CAF50", "#FFA500", "#F44336"]; // Green, Orange, Red

  // Extract the chart data
  const chartData: ChartData[] =
    response?.[0]?.chartData?.map((item: { label: string; score: number }, index: number) => ({
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
    })) || [];

  console.log("Chart Data:", chartData);

  // Custom bar shape for dynamic coloring
  const CustomBar = (props:BarProps) => {
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
  // Render custom legend
  const renderCustomLegend = () => (
    <div className="w-full   space-y-2  flex flex-wrap justify-start items-start   lg:grid lg:grid-cols-2 lg:gap-4">
      {chartData.map((entry, index) => (
        <div key={index} className="flex  items-center px-2 space-x-3">
          <div
            className="w-3 h-3 rounded-[4px]"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-xs font-medium  text-gray-700">
            {entry.label}
          </span>
        </div>
      ))}
    </div>
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
        <h2 className="text-textprimary text-xl md:text-2xl pb-4">
          ក្រាហ្វនេះបង្ហាញពី value ទាំងអស់របស់អ្នក
        </h2>
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
                    shape={(props:BarProps) => <CustomBar {...props} />}
                    name="Score"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="col-span-1 flex items-center flex-col justify-center ">
              {renderCustomLegend()}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="text-textprimary text-xl md:text-2xl pb-4">
          ការពិពណ៌នាពី value
        </h2>
        <div className="bg-bgPrimaryLight rounded-[8px] p-2 md:p-4">
          {valueDetails.map((item,index) => (
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
        <h2 className="text-textprimary text-xl md:text-2xl pb-4">
          លក្ខណៈសំខាន់ៗ របស់អ្នក
        </h2>
        <div className="bg-bgPrimaryLight p-2 md:p-4 rounded-[8px] ">
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
              />
            ))}
          </div>
        </div>
    </div>
  );
};
