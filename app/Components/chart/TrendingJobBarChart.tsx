"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useGetStatisticsQuery } from "@/app/redux/service/user";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
        <Card className="w-[750px] h-[440px]">
            <CardHeader>
                <CardTitle className="text-2xl font-normal text-[#00A76F]">
                    Trending Job
                </CardTitle>
            </CardHeader>
            <ResponsiveContainer width="98%" height="98%">
                {transformedData && uniqueJobLabels.length > 0 ? (
                    <BarChart
                        data={transformedData}
                        margin={{ top: 8, right: 10, left: 1, bottom: 90 }}
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
                                fill={`rgba(${(index * 50) % 255}, ${(index * 450) % 255}, 200, 20)`}
                                radius={[5, 5, 0, 0]}
                            />
                        ))}
                    </BarChart>
                ) : (
                    // Skeleton loader when data is not ready
                    <div className="animate-pulse h-full flex flex-col justify-center items-center space-y-3">
                        <Skeleton className="h-64 w-full rounded-md" /> 
                        <Skeleton className="h-5 w-1/2 rounded-md" /> 
                    </div>
                )}
            </ResponsiveContainer>
        </Card>

    );
};

export default BarChartComponent;
