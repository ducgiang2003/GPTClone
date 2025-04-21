import Sidebar from "@/components/layout/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subsciption";
import { TimezoneSaver } from "@/components/services/time-zone-saver";
import HeadingDashBoard from "@/components/layout/header-dashboard";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/layout/navbar"


const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCounts = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <ClerkProvider>
      <div 
      className="flex flex-row justify-between px-4 py-2  ">
        <Navbar/>
      <HeadingDashBoard />
      </div>
      <div className={"h-full relative"}>
        <TimezoneSaver />
        <div
          className={
            "hidden h-full md:flex md:flex-col " +
            // Use md:w-72 and w:pl-72 (must same number to divide) to diverse sidebar content and main content
            "md:fixed md:inset-y-0 \ md:w-72 bg-gray-400 dark:bg-[#111827]"
          }
        >
          <div>
            <Sidebar apiLimitCounts={apiLimitCounts} isPro={isPro} />
          </div>
        </div>
        <main className={"md:pl-72"}>{children}</main>
      </div>
    </ClerkProvider>
  );
};
export default DashBoardLayout;
