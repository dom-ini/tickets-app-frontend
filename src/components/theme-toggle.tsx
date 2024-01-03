"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export function ThemeToggle({ className, variant }: ButtonProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const isThemeDark = resolvedTheme === Theme.DARK;

  const handleClickThemeToggle = () => {
    const themeToSet = isThemeDark ? Theme.LIGHT : Theme.DARK;
    setTheme(themeToSet);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Button
      className={cn(className)}
      variant={variant}
      onClick={handleClickThemeToggle}
      aria-label={`Zmień motyw na ${isThemeDark ? "jasny" : "ciemny"}`}
    >
      {isMounted && isThemeDark ? <Moon /> : <Sun />}
    </Button>
  );
}
