import { Bell, Megaphone } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full bg-[#111111] text-antiflash-white flex items-center justify-between p-4 font-outfit h-20 flex-row-reverse'>
        <div className="flex items-center gap-2 flex-row-reverse">
            <button className='w-fit px-3 h-8 rounded-lg cursor-pointer bg-antiflash-white text-sm tracking-wide text-[#111111] flex items-center justify-center'>
                Create New Newsletter
            </button>
            <button className='w-fit px-3 h-8 rounded-lg cursor-pointer text-zinc-300 text-sm tracking-wide  antialiased border border-zinc-800 bg-[#111111]  flex items-center justify-center'>
            Send Newsletter
            </button>
        </div>
        <div className="flex items-center gap-10 ">
            <button className="cursor-pointer relative">
                <div className="absolute -top-0.5 right-0 w-1.5 h-1.5 bg-antiflash-white rounded-full"></div>  {/* dot if there are notifications*/}
            <Bell size={15} color="gray" />
            </button>
        </div>
    </div>
  )
}

export default Navbar