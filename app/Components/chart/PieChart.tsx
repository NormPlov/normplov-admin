"use client";

import React from "react";
import { PieChart as RePieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { useGetStatisticsQuery } from "@/app/redux/service/user";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// Define a mapping of "type" to colors
const colors: Record<string, string> = {
  PUBLIC: "#82ca9d",   // Green
  TVET: "#8884d8",     // Purple
  PRIVATE: "#ffc658",  // Yellow
    
};

const PieChart = () => {
  const { data } = useGetStatisticsQuery();
  const schoolData = data?.payload?.pie_chart_data;

  return (
    <Card className="w-full max-w-[450px] mx-auto">
    <CardHeader>
        <CardTitle className="text-2xl font-normal text-[#00A76F]">
            Types of Schools
        </CardTitle>
    </CardHeader>

      <RePieChart width={480} height={270} className="mb-5">
        <Pie
          data={schoolData}
          dataKey="percentage"
          nameKey="type"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
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
    </Card>
  );
};

export default PieChart;
