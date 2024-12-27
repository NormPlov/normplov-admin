import React from 'react'
import CardComponent from '../Components/card/CardComponent'
import QuizTestChart from '../Components/chart/BarChat'
import UserSatisfactionChart from '../Components/chart/LineCharComponent'
import PieChart from '../Components/chart/PieChart'
import TrendingJobChartComponent from '../Components/chart/TrendingJobBarChart'

const page = () => {
  return (
    <>
      <CardComponent />
      <div className="flex mx-10 gap-5 ">
        <UserSatisfactionChart />
        <QuizTestChart />
      </div>
      <div className="flex mx-10 gap-6 mt-7 mb-8">
        <TrendingJobChartComponent/>
        <PieChart />
      </div>
    </>
  );
};

export default page;
