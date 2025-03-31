import { Avatar, AvatarImage } from "./ui/avatar";

export const BotAvatar = () => {
    return (
        <Avatar className="h-8 w-8">
            <AvatarImage
                src={"https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2024/09/16/46746754/87f9a8ab1eae5ba70bb954641cae2643_3082171932565334137.png?x-oss-process=image%2Fformat%2Cwebp"}
                alt="Bot Avatar" // Thêm alt text
            />
        </Avatar>
    );
};