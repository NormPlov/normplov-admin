"use client"


import {  Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    day: "Monday",
    "Last Weeks": 35,
    "This Weeks": 25,
  },
  {
    day: "Tuesday",
    "Last Weeks": 32,
    "This Weeks": 22,
  },
  {
    day: "Wednesday",
    "Last Weeks": 12,
    "This Weeks": 45,
  },
  {
    day: "Thursday",
    "Last Weeks": 30,
    "This Weeks": 12,
  },
  {
    day: "Friday",
    "Last Weeks": 22,
    "This Weeks": 22,
  },
  {
    day: "Saturday",
    "Last Weeks": 30,
    "This Weeks": 28,
  },
  {
    day: "Sunday",
    "Last Weeks": 40,
    "This Weeks": 20,
  },
]

export default function QuizTestChart() {
  return (
   <div >
     <Card className="w-full w-[530px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-normal text-[#00A76F]">Quiz Test</CardTitle>
      </CardHeader>

      <BarChart width={500} height={290} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Last Weeks" fill="#FFD300" radius={[10, 10, 10, 10]} />
        <Bar dataKey="This Weeks" fill="#034B72" radius={[10, 10, 10, 10]}/>
      </BarChart>

    </Card>
   </div>
  )
}

