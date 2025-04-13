import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Theme = "light" | "dark";

//Hook to manage theme state

interface themeStore {
  theme: Theme;
  toggleTheme: () => void;
}
/// Hook to manage dark mode or light mode
/// This hook will be used in the app to manage the theme state
export const useTheme = create(
  persist<themeStore>(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => {
          let newTheme = state.theme;
          //if theme is dark, set it to light and vice versa
          if (state.theme === "dark") {
            newTheme = "light";
          } else {
            newTheme = "dark";
          }
          document.documentElement.classList.toggle(
            "dark",
            newTheme === "dark"
          );

          return { theme: newTheme };
        }),
    }),
    {
      name: "theme-storage",
      //   storage: createJSONStorage(() => localStorage),
    }
  )
);
