import React from 'react';
import { PieChart as RePieChart, Pie } from 'recharts';

type PieChartProps ={
  data01: { name: string; value: number }[];
  data02: { name: string; value: number }[];
  width?: number;
  height?: number;
  outerRadius01?: number;
  outerRadius02?: number;
  innerRadius02?: number;
}

const CustomPieChart = ({
  data01,
  data02,
  width,
  height,
  outerRadius01,
  outerRadius02,
  innerRadius02 ,
}:PieChartProps) => {
  return (
    <div>
      <RePieChart width={width} height={height}>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={outerRadius01}
          fill="#8884d8"
        />
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={innerRadius02}
          outerRadius={outerRadius02}
          fill="#82ca9d"
          label
        />
      </RePieChart>
    </div>
  );
};

export default CustomPieChart;
