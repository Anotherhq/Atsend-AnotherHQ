import { authClient } from "@/lib/auth-client";
import {
  Bolt,
  LayoutTemplate,
  Mails,
  MessageCircleQuestion,
  PanelsTopLeft,
  UsersRound,
  Megaphone,
  ChartSpline,
  SendToBack,
  
} from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";


interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ color?: string; size?: number }>;
  path: string;
}

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  const sidebarItems: SidebarItem[] = [
    {
      label: "Overview",
      href: "/dashboard/overview",
      icon: PanelsTopLeft,
      path: "/dashboard/overview"
    },
    {
      label: "Newsletters",
      href: "/dashboard/newsletters",
      icon: Mails,
      path: "/dashboard/newsletters"
    },
    {
      label: "Subscribers",
      href: "/dashboard/subscribers",
      icon: UsersRound,
      path: "/dashboard/subscribers"
    },{
      label: "Sequence",
      href: "/dashboard/sequence",
      icon: SendToBack,
      path: "/dashboard/sequence"
    },{
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: ChartSpline,
      path: "/dashboard/analytics"
    },{
      label: "Templates",
      href: "/dashboard/templates",
      icon: LayoutTemplate,
      path: "/dashboard/templates"
    },{
      label: "Broadcasts",
      href: "/dashboard/broadcasts",
      icon: Megaphone,
      path: "/dashboard/broadcasts"
    },{
      label: "Pages",
      href: "/dashboard/pages",
      icon: PanelsTopLeft,
      path: "/dashboard/pages"
    }
  ];

  const bottomItems: SidebarItem[] = [
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Bolt,
      path: "/dashboard/settings"
    },
    {
      label: "Help",
      href: "/dashboard/help",
      icon: MessageCircleQuestion,
      path: "/dashboard/help"
    }
  ];

  const renderSidebarButtons = (items: SidebarItem[]) => {
    return items.map(({ label, href, icon: Icon, path }) => (
      <button
        key={href}
        type="button"
        className={`
          flex items-center w-full justify-start gap-2 
          cursor-pointer px-2 py-2 rounded-lg 
          text-sm font-normal tracking-wider
          ${pathname === path 
            ? "bg-zinc-900 text-white" 
            : "text-zinc-400 hover:bg-zinc-900"
          }
        `}
        onClick={() => router.push(href)}
      >
        <Icon 
          color={pathname === path ? "white" : "gray"} 
          size={15} 
        />
        {label}
      </button>
    ));
  };

  if (isPending) return null;

  return session ? (
    <div className="w-60 bg-[#111111] text-antiflash-white p-4">
      {/* User Profile Section */}
      <div className="border-b border-zinc-900 py-2">
        <div className="flex items-center w-full justify-between cursor-pointer hover:bg-zinc-900 px-2 py-3 rounded-lg">
          <div className="flex items-center gap-2">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={`${session.user.name}'s profile`}
                width={34}
                height={34}
                className="rounded-lg"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gray-400 flex items-center justify-center">
                {session.user.name[0]}
              </div>
            )}
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold tracking-wide text-zinc-400">
                {session.user.name}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <RiExpandUpDownLine className="w-4 h-4 text-zinc-400" />
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="mt-4 flex flex-col gap-2 h-[90%] justify-between">
        <div className="flex flex-col gap-2">
          {renderSidebarButtons(sidebarItems)}
        </div>
        <div className="flex flex-col-reverse gap-2">
          {renderSidebarButtons(bottomItems)}
        </div>
      </div>
    </div>
  ) : null;
};

export default Sidebar;