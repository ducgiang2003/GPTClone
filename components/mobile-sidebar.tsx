"use client"
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {
    Sheet, SheetClose,
    SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import Sidebar from '@/components/sidebar'
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
const MobileSideBar = () =>{
    return(
        <Sheet>
            <SheetTrigger asChild>
        <Button variant={"ghost"} className={'md:hidden'} size={"icon"} >
            <Menu/>
        </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
                <VisuallyHidden>
                  <SheetTitle className={"hidden"}></SheetTitle>
                </VisuallyHidden>
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}
export default MobileSideBar;