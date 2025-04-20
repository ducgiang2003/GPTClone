import { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import LandingPage from "./(landing)/layout";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Platform",
  description: "Generating image or code",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Use suprpessHydrationWarning to suppress hydration class in html tag */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Use theme provider with next theme to enable dark mode  */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LandingPage>{children}</LandingPage>
        </ThemeProvider>
      </body>
    </html>
  );
}
