"use client"
import React from 'react'
import CardComponent from '../card/CardComponent'
import { useGetStatisticsQuery } from '@/app/redux/service/user'
import UserRegistrationComparisonChart from './LineCharComponent'
import PieChart from './PieChart'
import QuizTestChart from './BarChat'
import TrendingJobChartComponent from './TrendingJobBarChart'

const StaticPage = () => {
    const { data, isLoading } = useGetStatisticsQuery()
    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <CardComponent
                total_users={data?.payload?.total_users}
                total_tests={data?.payload?.total_tests}
                total_feedbacks={data?.payload?.total_feedbacks}
                total_actives={data?.payload?.total_active_users} />
            <div className="flex mx-6">
                <UserRegistrationComparisonChart />
                <QuizTestChart />

            </div>
            <div className="flex gap-6 mt-6 mx-6">
                <PieChart />
                <TrendingJobChartComponent />
            </div>

        </div>
    )
}

export default StaticPage
