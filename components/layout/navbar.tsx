import MobileSideBar from "@/components/layout/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subsciption";

const Navbar = async () => {
  const isPro = await checkSubscription();
  const apiLimitCounts = await getApiLimitCount();
  return (
    <div className={"flex items-center pt-4"}>
      <MobileSideBar isPro={isPro} apiLimitCounts={apiLimitCounts} />
    </div>
  );
};
export default Navbar;
