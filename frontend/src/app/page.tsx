import Header from '@/components/header'
import { CalendarTasks } from '@/components/tasks/calendar'
import TopJobs from '@/components/top-jobs'
import React from 'react'

export default function Home() {
  return (
    <div>
      <Header />
      <TopJobs />
    </div>
  )
}
