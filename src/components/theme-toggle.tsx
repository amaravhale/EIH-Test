"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-white/5 animate-pulse" />
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-9 h-9 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-white/5"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      <Moon className="h-5 w-5 absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
    </button>
  );
}
