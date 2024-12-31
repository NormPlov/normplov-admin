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
import { Skeleton } from "@/components/ui/skeleton";

export default function QuizTestChart() {
    const { data: statistics, isLoading } = useGetStatisticsQuery();
    

    // Ensure data exists and is in the correct format
    const barChartData = statistics?.payload?.bar_chart_assessments_data;

    // Define colors for each assessment_type
    const colors: Record<string, string> = {
        Interests: "#FFD300",
        "Learning Style": "#00A76F",
        Skills: "#034B72",
        Personality: "#FF5733",
        Values: "#8E44AD",
    };

    // Custom legend renderer
    const renderLegend = () => {
        return (
            <div className="flex space-x-3 ml-4 mt-4">
                {Object.keys(colors).map((type) => (
                    <li key={type} className="flex items-center space-x-2">
                        <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: colors[type] }}
                        />
                        <span className="text-sm font-medium">{type}</span>
                    </li>
                ))}
            </div>
        );
    };

    return (
        <Card className="w-full max-w-[510px] mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-normal text-[#00A76F]">
                    Assessments Types
                </CardTitle>
            </CardHeader>
            {isLoading ? (
                    // Skeleton Loading State
                    <div className="flex flex-col items-center justify-center h-[280px]">
                        <Skeleton className="w-full h-[200px] mb-4" />
                        <Skeleton className="w-1/2 h-6" />
                    </div>
                ) : (
            <BarChart
                width={500}
                height={290}
                data={barChartData}
                barSize={30}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="assessment_type" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend content={renderLegend} /> 

                <Bar dataKey="count" name="Number of Tests" radius={[5, 5, 0, 0]}>
                    {barChartData?.map((entry, index) => (
                        <Cell 
                            key={`cell-${index}`}
                            fill={colors[entry.assessment_type as keyof typeof colors] || "#999999"}
                        />
                    ))}
                </Bar>
            </BarChart>
                )}
        </Card>
    );
}
