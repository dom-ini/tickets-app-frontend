"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useDemoMode from "@/hooks/use-demo-mode";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";

interface DemoModeBannerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DemoModeBanner({ className }: DemoModeBannerProps) {
  const { isDemoMode, testUsername, testPassword } = useDemoMode();

  return (
    isDemoMode && (
      <Alert variant="info" className={cn("", className)}>
        <InfoIcon />
        <AlertTitle>Tryb demo jest aktywny</AlertTitle>
        <AlertDescription>
          <p>Wszystkie funkcje są dostępne, ale dane nie będą zapisane.</p>
          <p className="mt-2 font-semibold">Dane logowania:</p>
          <p>email: {testUsername}</p>
          <p>hasło: {testPassword}</p>
        </AlertDescription>
      </Alert>
    )
  );
}
