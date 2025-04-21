"use client";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "./theme-toggle";
import { SignedIn } from "@clerk/clerk-react";

const HeadingDashBoard = () => {
  return (
    <div className="flex flex-row gap-3 ">
      <ThemeToggle />
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};
export default HeadingDashBoard;
