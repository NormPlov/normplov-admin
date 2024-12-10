import React from 'react'
import { UserTable } from '@/app/Components/table/userTable/TableComponent'
import CardComponent from '../Components/card/CardComponent'
import QuizTestChart from '../Components/chart/BarChat'
import UserSatisfactionChart from '../Components/chart/LineCharComponent'

const page = () => {

  return (
    <>
       <CardComponent/>
       <div className="flex mx-10 gap-6 md:flex-wrap">
        <UserSatisfactionChart/>
        <QuizTestChart/>
       </div>
      <UserTable/>
  
    </>
  )
}

export default page
