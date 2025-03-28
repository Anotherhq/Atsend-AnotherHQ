"use client"
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  return (
    <div className='h-full w-full'>
        <div className="w-full flex justify-end px-10">
            <button className=''>
                
            </button>
            <button onClick={()=>{
                redirect('/dashboard/pages/create')
            }} className='w-fit px-3 h-8 rounded-lg cursor-pointer text-zinc-300 text-base tracking-wide antialiased border border-zinc-800 bg-[#1f1f1f] flex items-center justify-center gap-2'>
                <p>+</p> new page
            </button>
        </div>
    </div>
  ) 
}

export default page