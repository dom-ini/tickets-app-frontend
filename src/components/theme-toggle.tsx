"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export function ThemeToggle({ className, variant }: ButtonProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const isThemeDark = resolvedTheme === Theme.DARK;

  const handleClickThemeToggle = () => {
    const themeToSet = isThemeDark ? Theme.LIGHT : Theme.DARK;
    setTheme(themeToSet);
  };

  return (
    <Button
      className={cn(className)}
      variant={variant}
      onClick={handleClickThemeToggle}
    >
      {isThemeDark ? <Moon /> : <Sun />}
    </Button>
  );
}
