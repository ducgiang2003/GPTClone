import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subsciption";
import { TimezoneSaver } from "@/components/services/time-zone-saver";
import { UserButton } from "@clerk/nextjs";
import Header from "@/components/auth/header";
import { ClerkProvider } from "@clerk/nextjs";
import { ProModal } from "@/components/modal/pro-modal";

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCounts = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <ClerkProvider>
      <Header />
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
