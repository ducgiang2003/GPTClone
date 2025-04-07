"use client";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
//cn will use for customize by wrap css like cn(css)
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./freecounter";
import { useEffect, useRef } from "react";
import { resetApiLimit, saveTimeZone } from "@/lib/configTimeZone";
import { useRoutesStore } from "@/hooks/use-routes-store";
import { useApiLimit } from "@/hooks/api-limit-counts";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});
interface SidebarProps {
  apiLimitCounts: number;
}
const Sidebar = ({ apiLimitCounts = 0 }: SidebarProps) => {
  const pathname = usePathname();
  const routes = useRoutesStore((state) => state.routes);
  const setApiLimitCounts = useApiLimit((state) => state.setApiLimitCount);
  const isFirstRender = useRef(true);
  useEffect(() => {
    const fetchTimeZone = async () => {
      try {
        await saveTimeZone();
        console.log("Save time Zone success");
        await resetApiLimit();
        console.log("Reset API limit success");
      } catch (error) {
        console.error("Failed to save time zone:", error);
      }
    };
    //Fetch timezone
    fetchTimeZone();

    // Update apiLimit
    setApiLimitCounts(apiLimitCounts);
  }, [apiLimitCounts, setApiLimitCounts]);

  return (
    <div
      className={
        "space-y-4 py-4 flex flex-col h-full" + " bg-[#111827] text-white"
      }
    >
      <div className={"px-3 py-2 flex-1"}>
        <Link href={"/dashboard"} className={"flex items-center pl-3 mb-14"}>
          <div className={"relative w-8 h-8 mr-4"}>
            <Image fill alt={"logo"} src={"/logo.webp"} />
          </div>
          <h1 className={cn("text-xl font-bold", montserrat.className)}>
            Super Ultra Genus
          </h1>
        </Link>
        <div className={"space-y-1"}>
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium " +
                  "hover:text-white hover:bg-white/10 transition cursor-pointer rounded-xl",
                // This will blur item in dashboard if you are not where the path
                pathname === route.href
                  ? "text-white bg-white/10 "
                  : "text-zinc-600"
              )}
            >
              <div className={"flex items-center flex-1"}>
                <route.icon className={cn("h-5 w-5 mr-2", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCounts={apiLimitCounts} />
    </div>
  );
};
export default Sidebar;
