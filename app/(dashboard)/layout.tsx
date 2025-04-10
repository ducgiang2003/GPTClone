import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subsciption";
import { TimezoneSaver } from "@/components/time-zone-saver";
const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCounts = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className={"h-full relative"}>
      <TimezoneSaver />
      <div
        className={
          "hidden h-full md:flex md:flex-col " +
          // Use md:w-72 and w:pl-72 (must same number to divide) to diverse sidebar content and main content
          "md:fixed md:inset-y-0 \ md:w-72 bg-gray-700"
        }
      >
        <div>
          <Sidebar apiLimitCounts={apiLimitCounts} isPro={isPro} />
        </div>
      </div>

      <main className={"md:pl-72"}>
        <Navbar />
        {children}
      </main>
    </div>
  );
};
export default DashBoardLayout;
