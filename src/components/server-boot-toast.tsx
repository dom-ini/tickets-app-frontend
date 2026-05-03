"use client";

import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import useDemoMode from "@/hooks/use-demo-mode";

export function ServerBootToast() {
  const { isDemoMode } = useDemoMode();

  useEffect(() => {
    if (!isDemoMode) return;

    toast({
      title: "Uruchamianie instacji...",
      description:
        "To demo działa na darmowym planie, dlatego pierwsze ładowanie może chwilę potrwać.",
      duration: 10000,
    });
  }, []);

  return null;
}
