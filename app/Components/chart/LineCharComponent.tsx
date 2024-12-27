"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function UserRegistrationComparisonChart() {
    const { data } = useGetStatisticsQuery()
    const lineChartData = data?.payload?.line_chart_data

    const thisYear = new Date().getFullYear();
    const lastYear = thisYear - 1;

    return (
        <Card className="w-full max-w-[700px] mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-normal text-[#00A76F]">
                    User Registration Comparison ({lastYear} vs {thisYear})
                </CardTitle>
            </CardHeader>

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
        </Card>
    );
}
