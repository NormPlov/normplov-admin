"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Bar,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Cell,
} from "recharts";
import { useGetStatisticsQuery } from "@/app/redux/service/user";

export default function TrendingJobChartComponent() {
    const { data: statistics } = useGetStatisticsQuery();

    // Extract bar chart data with a fallback to an empty array
    const barChartData = statistics?.payload?.bar_chart_jobs_data || [];

    // Generate colors dynamically based on unique labels
    const uniqueLabels = Array.from(
        new Set(barChartData.map((item) => item.label || "Unlabeled"))
    );

    // Assign colors dynamically
    const colors = uniqueLabels.reduce((acc, label, index) => {
        acc[label] = `hsl(${(index * 60) % 360}, 70%, 50%)`; // Generate a color
        return acc;
    }, {} as Record<string, string>);

    // Custom legend renderer
    const renderLegend = () => {
        return (
            <ul className="flex flex-wrap space-x-3 ml-5 mt-4">
                {Object.keys(colors).map((type) => (
                    <li key={type} className="flex items-center space-x-2">
                        <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: colors[type] }}
                        />
                        <span className="text-sm font-medium">{type}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Card className="w-full max-w-[700px] mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-normal text-[#00A76F]">
                    Trending Jobs
                </CardTitle>
            </CardHeader>

            <BarChart
                width={650}
                height={290}
                data={barChartData}
                barSize={30}
                margin={{ top: 5, right: 10, left: 10, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="label" 
                    tick={{ fontSize: 12 }}
                    label={{ value: "Job Titles", position: "bottom", offset: -5 }}
                />
                <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend content={renderLegend} />

                <Bar dataKey="count" name="Number of Job posting" radius={[5, 5, 0, 0]}>
                    {barChartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[entry.label || "Unlabeled"]}
                        />
                    ))}
                </Bar>
            </BarChart>
        </Card>
    );
}
