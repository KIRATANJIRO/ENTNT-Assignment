'use client'

import { SharedLayout } from '@/components/shared-layout'
import { BellIcon, LayoutDashboardIcon, CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CommunicationsTable from "./communications-table"
import { Calendar } from "@/components/calendar"
import { Notifications } from "@/components/notifications"

export default function Page() {
  return (
    <SharedLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex gap-4">
          <Button variant="default" className="gap-2">
            <LayoutDashboardIcon className="h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Calendar
          </Button>
          <Button variant="outline" className="gap-2">
            <BellIcon className="h-4 w-4" />
            Notifications
            <span className="ml-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">4</span>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-blue-600">Company Communications</h3>
              <Button>
                <span className="mr-2">+</span>
                Communication Performed
              </Button>
            </div>
            <CommunicationsTable />
          </div>
          <div className="space-y-6">
            <Calendar />
            <Notifications />
          </div>
        </div>
      </div>
    </SharedLayout>
  )
}

