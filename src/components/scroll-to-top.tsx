"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const scrollOffset = 300;

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > scrollOffset);
    };
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [setIsVisible]);

  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
  };

  return (
    <Button
      className={cn(
        "fixed bottom-20 sm:bottom-4 right-4 rounded-sm p-2 transition-all z-[100]",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      variant="ghost"
      size="icon"
      onClick={scrollToTop}
    >
      <ChevronUp />
    </Button>
  );
}
