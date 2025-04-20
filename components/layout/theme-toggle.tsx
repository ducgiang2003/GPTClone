import { useTheme } from "next-themes";
import { Button } from "../ui/button";
/// This component is used to toggle between light and dark themes
/// It uses the `useTheme` hook from `next-themes` to manage the theme state
const ThemeToggle = () => {
  // Get the current theme and the function to set the theme from the `useTheme` hook
  const { theme, setTheme } = useTheme();

  return (
    <div>
      {theme === "dark" ? (
        <Button variant={"ghost"} onClick={() => setTheme("light")}>
          🌙
        </Button>
      ) : (
        <Button variant={"ghost"} onClick={() => setTheme("dark")}>
          ☀️
        </Button>
      )}
    </div>
  );
};

export default ThemeToggle;
