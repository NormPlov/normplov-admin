import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Users, MessageCircle, LogOut, Activity } from 'lucide-react'
import { UserTable } from '@/app/Components/table/TableComponent'

const page = () => {
  return (
    <div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-emerald-50 p-3">
            <Users className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total User</p>
            <p className="text-2xl font-bold">5,423</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-emerald-50 p-3">
            <MessageCircle className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Feedback</p>
            <p className="text-2xl font-bold">1,893</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-emerald-50 p-3">
            <LogOut className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Outs</p>
            <p className="text-2xl font-bold">189</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-emerald-50 p-3">
            <Activity className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Now</p>
            <p className="text-2xl font-bold">189</p>
          </div>
        </CardContent>
      </Card>
      <UserTable/>
    </div>
    </div>
  )
}

export default page
