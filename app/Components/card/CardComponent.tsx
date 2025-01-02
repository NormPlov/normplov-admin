"use client"
import React from 'react'
import { Users, MessageCircle, Activity } from 'lucide-react'
import { FaRegCircleCheck } from "react-icons/fa6";

type Props = {
  total_users: number | undefined;
  total_feedbacks: number | undefined;
  total_actives: number | undefined;
  total_tests: number | undefined;

}

const CardComponent = ({total_users, total_feedbacks, total_tests, total_actives}:Props) => {
 

  return (
    <div className="m-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4  shadow-sm rounded-xl text-textprimary bg-white">
     
        <div className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-emerald-50 p-3">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total User</p>
            <p className="text-2xl font-bold">{total_users}</p>
          </div>
        </div>
      
        <div className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-emerald-50 p-3">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Feedback</p>
            <p className="text-2xl font-bold">{total_feedbacks}</p>
          </div>
        </div>
      
        <div className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-emerald-50 p-3">
            <FaRegCircleCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total Test</p>
            <p className="text-2xl font-bold">{total_tests}</p>
          </div>
        </div>
      
        <div className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-emerald-50 p-3">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Active Now</p>
            <p className="text-2xl font-bold">{total_actives}</p>
          </div>
        </div>
      
    </div>
  )
}

export default CardComponent
