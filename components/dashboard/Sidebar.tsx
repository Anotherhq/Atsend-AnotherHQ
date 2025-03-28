import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { RiExpandUpDownLine } from "react-icons/ri";


const Sidebar = () => {
  const { data: session ,isPending} = authClient.useSession();
  useEffect(() => {
    if (isPending) return;
    if (!session) {
      redirect('/login');
    }
  }, [isPending]);

  return session ? (
    <div className='w-60 bg-zinc-900 text-white p-4 border-r border-zinc-800'>
        {/* user profile */}
        <div className="flex items-center w-full justify-between cursor-pointer hover:bg-zinc-800 px-2 py-3 rounded-lg">
        <div className="flex items-center gap-2">
            {session.user.image ? 
             <Image src={session.user.image} alt="" width={34} height={34} className="rounded-lg" />
            : <div className="w-8 h-8 rounded-lg bg-gray-400 flex items-center justify-center">{session.user.name[0]}</div>}
            <div className="flex flex-col items-start">
                <p className="text-sm font-semibold tracking-wide text-zinc-400 ">{session.user.name}</p>
            </div>
        </div>
        <div className="flex items-center ">
            <RiExpandUpDownLine className="w-4 h-4 text-zinc-400" />
        </div>
        </div>

        {/* sidebar items */}
        <div className="mt-4 flex flex-col gap-2">
            <Link href="/dashboard" className="flex items-center w-full justify-between cursor-pointer hover:bg-zinc-800 px-2 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold tracking-wide text-zinc-400 ">Overview</p>
                </div>
            </Link>
            <Link href="/dashboard" className="flex items-center w-full justify-between cursor-pointer hover:bg-zinc-800 px-2 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold tracking-wide text-zinc-400 ">Jobs</p>
                </div>
            </Link>
        </div>

    </div>
  ) : null;
}

export default Sidebar