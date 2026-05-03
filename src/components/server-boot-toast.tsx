"use client";

import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export function ServerBootToast() {
  useEffect(() => {
    toast({
      title: "Uruchamianie instacji...",
      description:
        "To demo działa na darmowym planie, dlatego pierwsze ładowanie może chwilę potrwać.",
      duration: 10000,
    });
  }, []);

  return null;
}
