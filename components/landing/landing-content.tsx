"use client";
import Link from "next/link";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";
import { Button } from "../ui/button";
const LandingContent = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className=" font-bold py-36 text-center space-y-5">
      <div className="text-4xl md:text-6xl sm:text-5xl lg:text-7xl font-extrabold  space-y-5 ">
        <h1>This AI tool can </h1>
        <div
          className="text-transparent bg-clip-text bg-gradient-to-r
                   from bg-purple-400 to-bg-blue-500"
        >
          <TypewriterComponent
            options={{
              strings: [
                "answer your questions",
                "generate images",
                "generate musics",
                "generate videos",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-lg font-light text-zinc-400">
        Make you do faster 10x times than normal
      </div>
      <div>
        {isSignedIn ? (
          <Link href={"/dashboard"}>
            <Button
              variant={"premium"}
              className="md:text-lg p-4 md:p-6
                      rounded-full font-semibold"
            >
              Start generating for free
            </Button>
          </Link>
        ) : (
          <SignUpButton>
            <Button
              variant={"premium"}
              className="md:text-lg p-4 md:p-6
                      rounded-full font-semibold 
                       hover:text-black transition cursor-pointer"
            >
              Start generating for free
            </Button>
          </SignUpButton>
        )}
        <div className="text-xs md:text-sm font-normal text-zinc-400">
          No credit card required
        </div>
      </div>
    </div>
  );
};
export default LandingContent;
