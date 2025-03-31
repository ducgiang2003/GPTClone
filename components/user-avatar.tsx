import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserAvatar = () => {
    const { user } = useUser();
    console.log("User data", user);

    return (
        <Avatar className="h-8 w-8">
            <AvatarImage
                src={user?.imageUrl || "https://preview.redd.it/made-a-transparent-version-of-that-firefly-emoji-from-v0-ttrcb5e9mjhc1.png?auto=webp&s=bc854c7f79d4a12813c5095ed5e0a8cc74040b82"}
                alt="User Avatar" // Thêm alt text
            />
            <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
    );
};