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
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // This is to prevent the hydration error in nextjs
  // because the sidebar is not mounted on the server side
  if (!isMounted) {
    return null;
  }


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className={"md:hidden"} size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <VisuallyHidden>
          <SheetTitle className={"hidden"}></SheetTitle>
        </VisuallyHidden>
        <Sidebar apiLimitCounts={apiLimitCounts} isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};
export default MobileSideBar;
