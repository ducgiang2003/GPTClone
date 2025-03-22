
"use client"
import Link from "next/link";
import Image from "next/image";
import {Montserrat} from "next/font/google"
//cn will use for customize by wrap css like cn(css)
import {cn} from "@/lib/utils"
import {
    LayoutDashboard,
    Baby,
    Drum,
    BookImage,
    Video,
    MessageCircleMore, Settings
} from "lucide-react";
const montserrat = Montserrat({
    weight : "600",
    subsets:["latin"]
});
const routes = [
    {
        label:"Dasboard",
        href:"/dashboard",
        icon:LayoutDashboard,
        color:"text-sky-500"
    },
    {
        label:"Convertation",
        href:"/conversation",
        icon:Baby,
        color:"text-green-400"

    },
    {
        label:"Image generation",
        href:"/image",
        icon:BookImage,
        color:"text-yellow-300"
    },
    {
      label:'Video generation',
      href:"/video",
      icon:Video,
        color:"text-orange-600"
    },
    {
        label:"Music generation",
        href:"/music",
        icon: Drum,
        color:"text-rose-600"
    },
    {
        label:"Code generation",
        href: "/code",
        icon:MessageCircleMore,
        color:"text-fuchsia-700"
    },
    {
        label:"Settings",
        href:"/settings",
        icon:Settings,
        color:"text-zinc-400",
    }

]
const Sidebar = () => {
    return (
        <div className={"space-y-4 py-4 flex flex-col h-full" +
            " bg-[#111827] text-white"}>
          <div className={"px-3 py-2 flex-1"}>
            <Link href={"/dashboard"} className={"flex items-center pl-3 mb-14"}>
                <div className={"relative w-8 h-8 mr-4"}>
                   <Image
                       fill
                       alt={"logo"}
                       src={"/logo.webp"}
                   />
                </div>
                <h1 className={cn("text-xl font-bold",montserrat.className)}>Super Ultra Genus</h1>
            </Link>
            <div className={"space-y-1"}>
                {routes.map((route)=>(
                    <Link href={route.href} key={route.href}
                           className={"text-sm group flex p-3 w-full justify-start font-medium " +
                               "hover:text-white hover:bg-white/10 transition cursor-pointer"}>
                        <div className={"flex items-center flex-1"}>
                            <route.icon className={cn("h-5 w-5 mr-2",route.color)} />
                            {route.label}
                        </div>
                    </Link>
                ))}
            </div>
          </div>
        </div>
    )
}
export default Sidebar;