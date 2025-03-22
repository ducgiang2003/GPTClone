import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashBoardLayout = ({children}:{
    children:React.ReactNode,
}) =>{
    return (
        <div className={"h-full relative"}>
            <div className={"hidden h-full md:flex md:flex-col " +
                // Use md:w-72 and w:pl-72 (must same number to divide) to diverse sidebar content and main content
                "md:fixed md:inset-y-0 z-[80] md:w-72 bg-gray-700"}>
                <div>
                    <Sidebar/>
                </div>
            </div>

           <main className={"md:pl-72"}>
               <Navbar/>
               {children}
           </main>

        </div>
    )
}
export default DashBoardLayout