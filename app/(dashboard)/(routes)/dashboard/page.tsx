
"use client"
import {ArrowRight, Baby, BookImage, MessageCircleMore, Video} from "lucide-react";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";


const tools = [
    {
        label:"Conversation",
        icon:Baby,
        color:"text-green-400",
        bgColor:"bg-green-400/10",
        href:"/conversation"
    },
    {
        label:"Image",
        icon:BookImage,
        color:"text-yellow-400",
        bgColor:"bg-yellow-400/10",
        href:"/image"
    },
    {
        label:"Video",
        icon:Video,
        color:"text-orange-400",
        bgColor: "bg-orange-400/10",
        href:"/video"
    },
    {
        label:"Code",
        icon:MessageCircleMore,
        color:"text-fuchsia-400",
        bgColor: "bg-fuchsia-400/10",
        href:"/code"
    }

]

const DashBoard =() => {
    const router = useRouter();
    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xk md:text-4xl font-bold text-center">
                    Explore the power of AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    Experience the smartest AI tools
                </p>
            </div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {tools.map((tool) => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className="w-full p-4 gap-4 border-black/5 
                        flex items-center
                         justify-between hover:shadow-md
                          transition cursor-pointer"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className={cn('p-2 w0fit rounded-md', tool.bgColor)}>
                                <tool.icon className={cn('w-8 h-8', tool.color)} />
                            </div>
                            <div className="font-semibold">{tool.label}</div>
                        </div>
                        <ArrowRight className="w-5 h-5" />
                    </Card>
                ))}
            </div>
        </div>
    );
}
export default DashBoard