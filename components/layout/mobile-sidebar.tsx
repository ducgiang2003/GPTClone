"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "@/components/layout/sidebar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface MobileSideBarProps {
  isPro: boolean;
  apiLimitCounts: number;
}
const MobileSideBar = ({
  isPro = false,
  apiLimitCounts,
}: MobileSideBarProps) => {
  // This is to prevent the hydration error in nextjs
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className={"md:hidden"} size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="p-0 bg-gray-400 text-zinc-900
        dark:bg-[#111827] dark:text-white"
      >P
        <SheetTitle className={"hidden"}></SheetTitle>
        <Sidebar apiLimitCounts={apiLimitCounts} isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};
export default MobileSideBar;
