// app/(landing)/layout.tsx
"use client";
import {
  ClerkProvider,
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/layout/theme-toggle";
import Link from "next/link";
import LandingContent from "@/components/landing/landing-content";
import LandingTestimonial from "@/components/landing/landing-testimonial";
import Image from "next/image";
const LayoutLanding = () => {
  return (
    <ClerkProvider>
      <header className="flex flex-row justify-between items-center p-8 h-4 gap-3 ">
        <div className="flex flex-row gap-3">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt={"logo"} src={"/logo.png"} />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">Super Ultra Genus</h1>
            <p className="text-sm text-muted-foreground">
              Explore the power of AI
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <ThemeToggle />
          <SignedOut>
            <SignInButton>
              <Button className="px-4 py-2 rounded-md cursor-pointer ">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button className="px-4 py-2 rounded-md cursor-pointer">Sign Up</Button>
            </SignUpButton>
          </SignedOut>

          {/* If user is signed in, show the button to go to dashboard and user button */}
          <SignedIn>
            <Button
              className="px-4 py-2 rounded-md  transition-all duration-300
                 bg-white dark:bg-gray-700 text-black dark:text-white border-2
                 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
            >
              <Link href={"/dashboard"} className={" font-bold"}>
                Get started
              </Link>
            </Button>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/* Show landingContent (which is text center) and landing testimonial  */}
      <div>
        <LandingContent />
      </div>
      <LandingTestimonial />
    </ClerkProvider>
  );
};

export default LayoutLanding;
