"use client"

import {  Card, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    "name": "Jan",
    "Last Month": 400,
    "This Month": 240,
    "amt": 240
  },
  {
    "name": "Feb",
    "Last Month": 300,
    "This Month": 198,
    "amt": 221
  },
  {
    "name": "Mar",
    "Last Month": 200,
    "This Month": 980,
    "amt": 229
  },
  {
    "name": "Apr",
    "Last Month": 280,
    "This Month": 308,
    "amt": 200
  },
  {
    "name": "May",
    "Last Month": 190,
    "This Month": 800,
    "amt": 218
  },
  {
    "name": "Jun",
    "Last Month": 290,
    "This Month": 300,
    "amt": 250
  },
  {
    "name": "Jul",
    "Last Month": 390,
    "This Month": 440,
    "amt": 210
  }
]

export default function UserSatisfactionChart() {
  return (
    <Card className="w-full mx-auto w-[560px] rounded-xl ">
      <CardHeader>
        <CardTitle className="text-2xl font-normal text-primary">
          User Satisfactions
        </CardTitle>
      </CardHeader>
      <LineChart width={550} height={270} data={data}
        margin={{ top: 6, right: 20, left: 8, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3"  className="text-gray-300"/>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Last Month" stroke="#0BBB8A" />
        <Line type="monotone" dataKey="This Month" stroke="#FFA500" />
      </LineChart>
    </Card>

  )
}
