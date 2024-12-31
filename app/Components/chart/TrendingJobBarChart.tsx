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
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} interval={0} />
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
