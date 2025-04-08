import MobileSideBar from "@/components/mobile-sidebar";
import { checkSubscription } from "@/lib/subsciption";

const Navbar = async () => {
  const isPro = await checkSubscription();
  return (
    <div className={"flex items-center pt-4"}>
      <MobileSideBar isPro={isPro} />
    </div>
  );
};
export default Navbar;
