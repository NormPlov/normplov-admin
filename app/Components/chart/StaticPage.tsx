"use client"
import React from 'react'
import CardComponent from '../card/CardComponent'
import { useGetStatisticsQuery } from '@/app/redux/service/user'
import UserRegistrationComparisonChart from './LineCharComponent'
import PieChart from './PieChart'
import QuizTestChart from './BarChat'
import TrendingJobChartComponent from './TrendingJobBarChart'
import { Skeleton } from '@/components/ui/skeleton'

const StaticPage = () => {
    const { data, isLoading } = useGetStatisticsQuery()
    if (isLoading) {
        (
            <Skeleton className='mx-10 w-full h-24 rounded-xl mt-0'/>
        )
    }

    return (
        <div>
            <CardComponent
                total_users={data?.payload?.total_users}
                total_tests={data?.payload?.total_tests}
                total_feedbacks={data?.payload?.total_feedbacks}
                total_actives={data?.payload?.total_active_users} />
            <div className="flex mx-10 justify-between gap-8">
                <UserRegistrationComparisonChart />
                <QuizTestChart />

            </div>
            <div className="flex mt-8 mx-8 justify-between gap-5">
                <PieChart />
                <TrendingJobChartComponent />
            </div>

        </div>
    )
}

export default StaticPage
