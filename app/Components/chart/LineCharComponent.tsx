"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useGetStatisticsQuery } from "@/app/redux/service/user";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserRegistrationComparisonChart() {
    const { data, isLoading } = useGetStatisticsQuery();
    const lineChartData = data?.payload?.line_chart_data;

    const thisYear = new Date().getFullYear();
    const lastYear = thisYear - 1;

    return (
        <Card className="w-full max-w-[620px] mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-normal text-[#00A76F]">
                    User Registration Comparison ({lastYear} vs {thisYear})
                </CardTitle>
            </CardHeader>

            <CardContent>
                {isLoading ? (
                    // Skeleton Loading State
                    <div className="flex flex-col items-center justify-center h-[280px]">
                        <Skeleton className="w-full h-[200px] mb-4" />
                        <Skeleton className="w-1/2 h-6" />
                    </div>
                ) : (
                    // Chart Content
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart
                            data={lineChartData}
                            margin={{ top: 20, right: 30, left: 0, bottom: 15 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />

                            {/* Line for Last Year */}
                            <Line
                                type="monotone"
                                dataKey={lastYear}
                                name={`Last Year (${lastYear})`}
                                stroke="#FFA500"
                                strokeWidth={3}
                                dot={false} // Disable dots
                            />

                            {/* Line for This Year */}
                            <Line
                                type="monotone"
                                dataKey={thisYear}
                                name={`This Year (${thisYear})`}
                                stroke="#00A76F"
                                strokeWidth={3}
                                dot={false} // Disable dots
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
