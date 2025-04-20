"use client";
import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "../layout/theme-toggle";
import { SignedIn } from "@clerk/clerk-react";

const Header = () => {
  return (
      
        <div className="flex flex-row justify-end gap-3 px-4 py-2">
          <SignedIn>
            <ThemeToggle />
            <UserButton />
          </SignedIn>
        </div>
      
  );
};
export default Header;
