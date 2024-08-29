import React from 'react'
import { CalendarTasks } from './tasks/calendar'
import Jobs from './jobs'

export default function TopJobs() {
  return (
    <div className='flex justify-between max-w-7xl mx-auto py-6'>
        <Jobs />
        <CalendarTasks />
    </div>
  )
}
