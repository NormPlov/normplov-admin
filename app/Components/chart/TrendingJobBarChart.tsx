// "use client";

// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//     Bar,
//     BarChart,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     Cell,
// } from "recharts";

// import { PieChart as RePieChart, Pie } from "recharts";
// import { useGetStatisticsQuery } from "@/app/redux/service/user";
// import { Skeleton } from "@/components/ui/skeleton";


// // Define a mapping of "type" to colors
// const colors: Record<string, string> = {
//     PUBLIC: "#82ca9d",   // Green
//     TVET: "#8884d8",     // Purple
//     PRIVATE: "#ffc658",  // Yellow
  
//   };

// export default function TrendingJobChartComponent() {
//     const { data: statistics, isLoading } = useGetStatisticsQuery();
//     const schoolData = statistics?.payload?.pie_chart_data;

//     // Extract bar chart data with a fallback to an empty array
//     const barChartData = statistics?.payload?.bar_chart_jobs_data || [];

//     // Generate colors dynamically based on unique labels
//     const uniqueLabels = Array.from(
//         new Set(barChartData.map((item) => item.label || "Unlabeled"))
//     );

//     // Assign colors dynamically
//     const colors = uniqueLabels.reduce((acc, label, index) => {
//         acc[label] = `hsl(${(index * 60) % 360}, 70%, 50%)`; // Generate a color
//         return acc;
//     }, {} as Record<string, string>);

//     // Custom legend renderer
//     const renderLegend = () => {
//         return (
//             <ul className="flex flex-wrap space-x-3 ml-5 mt-4">
//                 {Object.keys(colors).map((type) => (
//                     <li key={type} className="flex items-center space-x-2">
//                         <div
//                             className="w-4 h-4 rounded"
//                             style={{ backgroundColor: colors[type] }}
//                         />
//                         <span className="text-sm font-medium">{type}</span>
//                     </li>
//                 ))}
//             </ul>
//         );
//     };

//     return (
//         <div className="">
//             <Card className="w-full max-w-[700px] mx-auto">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-normal text-[#00A76F]">
//                     Trending Jobs
//                 </CardTitle>
//             </CardHeader>
//             {isLoading ? (
//                 // Skeleton Loading State
//                 <div className="flex flex-col items-center justify-center h-[280px]">
//                     <Skeleton className="w-full h-[200px] mb-4" />
//                     <Skeleton className="w-1/2 h-6" />
//                 </div>
//             ) : (
//                 <BarChart
//                     width={650}
//                     height={290}
//                     data={barChartData}
//                     barSize={30}
//                     margin={{ top: 5, right: 10, left: 10, bottom: 20 }}
//                 >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis
//                         dataKey="label"
//                         tick={{ fontSize: 12 }}
//                         label={{ value: "Job Titles", position: "bottom", offset: -5 }}
//                     />
//                     <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
//                     <Tooltip />
//                     <Legend content={renderLegend} />

//                     <Bar dataKey="count" name="Number of Job posting" radius={[5, 5, 0, 0]}>
//                         {barChartData.map((entry, index) => (
//                             <Cell
//                                 key={`cell-${index}`}
//                                 fill={colors[entry.label || "Unlabeled"]}
//                             />
//                         ))}
//                     </Bar>
//                 </BarChart>
//             )}
//         </Card>
//         <Card className="w-full max-w-[450px] mx-auto">
//               <CardHeader>
//                 <CardTitle className="text-2xl font-normal text-[#00A76F]">
//                   Types of Schools
//                 </CardTitle>
//               </CardHeader>
//               {isLoading ? (
//                 // Skeleton Loading State
//                 <div className="flex flex-col items-center justify-center h-[280px]">
//                   <Skeleton className="w-full h-[200px] mb-4" />
//                   <Skeleton className="w-1/2 h-6" />
//                 </div>
//               ) : (
//                 <RePieChart width={480} height={270} className="mb-5">
//                   <Pie
//                     data={schoolData}
//                     dataKey="percentage"
//                     nameKey="type"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={100}
//                     label
//                   >
//                     {/* Map over each slice to set a custom fill color */}
//                     {schoolData?.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={colors[entry.type] || "#ccc"}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </RePieChart>
//               )}
//             </Card>
//         </div>
//     );
// }


"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useGetStatisticsQuery } from "@/app/redux/service/user";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const BarChartComponent = () => {
    const { data } = useGetStatisticsQuery();
    const trendingJob = data?.payload?.bar_chart_jobs_data;

    // Transform data for Recharts
    const transformedData = trendingJob
        ? Object.entries(trendingJob).map(([month, jobs]) => {
              const monthData: { [key: string]: string | number } = { month };
              jobs.forEach((job) => {
                  monthData[job.label] = job.count;
              });
              return monthData;
          })
        : [];

    // Collect job labels dynamically from transformed data
    const uniqueJobLabels = trendingJob
        ? Array.from(
              new Set(
                  Object.values(trendingJob)
                      .flat()
                      .map((job) => job.label)
              )
          )
        : [];

    return (
        <Card style={{ width: "100%", height: "500px", padding: "1px" }}>
            <CardHeader>
                <CardTitle className="text-2xl font-normal text-[#00A76F]">
                    Trending Job
                </CardTitle>
            </CardHeader>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={transformedData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 80 }}
                    barSize={50}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* Dynamically create bars for each unique job label */}
                    {uniqueJobLabels.map((label, index) => (
                        <Bar
                            key={label}
                            dataKey={label}
                            fill={`rgba(${(index * 50) % 255}, ${(index * 200) % 255}, 200, 2)`}
                            radius={[5, 5, 0, 0]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default BarChartComponent;
