import { Bolt } from 'lucide-react';
import React from 'react'

const DashboardPage = () => {
  return (
    <div className='p-5 h-full flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-2'>
        {/* Under Construction */}
        <Bolt className='w-10 h-10'/>
        <h1 className='text-2xl font-bold'>Under Construction</h1>
        <p className='text-sm text-gray-500'>This page is under construction. Please check back later.</p>
      </div>
    </div>
  )
}

export default DashboardPage;
