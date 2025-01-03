"use client";

import React from "react";
import { PieChart as RePieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { useGetStatisticsQuery } from "@/app/redux/service/user";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Define a mapping of "type" to colors
const colors: Record<string, string> = {
  PUBLIC: "#82ca9d",   // Green
  TVET: "#8884d8",     // Purple
  PRIVATE: "#ffc658",  // Yellow

};

const PieChart = () => {
  const { data, isLoading } = useGetStatisticsQuery();
  const schoolData = data?.payload?.pie_chart_data;

  return (
    <Card className="w-full max-w-[370px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-normal text-[#00A76F]">
          Types of Schools
        </CardTitle>
      </CardHeader>
      {isLoading ? (
        // Skeleton Loading State
        <div className="flex flex-col items-center justify-center h-[280px]">
          <Skeleton className="w-full h-[200px] mb-4" />
          <Skeleton className="w-1/2 h-6" />
        </div>
      ) : (
        <RePieChart width={360} height={320} className="mb-5 mt-6">
          <Pie
            data={schoolData}
            dataKey="percentage"
            nameKey="type"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            label
          >
            {/* Map over each slice to set a custom fill color */}
            {schoolData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[entry.type] || "#ccc"}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RePieChart>
      )}
    </Card>
  );
};

export default PieChart;
