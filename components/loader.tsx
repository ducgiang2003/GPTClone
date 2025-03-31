import Image from "next/image";

export const Loader = () =>{
return(
    <div className="h-full flex flex-col items-center justify-center gap-y-4">
        <div className="relative w-10 h-10 animate-spin">
            <Image
            alt="logo"
            fill
            src={"/assets/loading.jpg"}
            />
        </div>
        <div className="text-muted-foreground text-sm text-center">
            Super Ultra Genus AI is thinking
        </div>
    </div>
)
}
