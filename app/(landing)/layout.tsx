// app/(landing)/layout.tsx
import {
  ClerkProvider,
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
  SignUpButton,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/layout/theme-toggle"; // Theme toggle component
import Image from "next/image";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import LandingContent from "@/components/landing-content";
import LandingTestimonial from "@/components/landing-testimonial";

const LayoutLanding = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <header className="flex flex-row justify-between items-center p-8 h-4 gap-3 ">
        <div className="flex flex-row gap-3">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt={"logo"} src={"/logo.webp"} />
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
              <Button className="px-4 py-2 rounded-md ">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button className="px-4 py-2 rounded-md">Sign Up</Button>
            </SignUpButton>
          </SignedOut>

          {/* Sau khi đăng nhập sẽ sẽ hiện avarta và nút chuyển sang dashborad */}
          <SignedIn>
            <Link
              href={"/dashboard"}
              className={
                " bg-blue-500 text-white px-4 py-2 rounded-md " +
                "hover:bg-blue-600 transition duration-200"
              }
            >
              Get started
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      <div>
        <LandingContent />
      </div>
      <LandingTestimonial />
      <main>{children}</main>
    </ClerkProvider>
  );
};

export default LayoutLanding;
