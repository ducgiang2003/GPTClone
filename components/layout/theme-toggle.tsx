"use client";

import { useTheme } from "@/hooks/use-theme-store";
import { Button } from "../ui/button";

//Button to toggle between light and dark mode
// This button will be used in the app to manage the theme state
export default function ThemeToggle() {
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);
  return (
    <Button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-md  transition-all duration-300
                 bg-white dark:bg-gray-700
                 
                 hover:bg-gray-200 dark:hover:bg-gray-600"
    >
      {theme === "light" ? "☀️" : "🌙 "}
    </Button>
  );
}
