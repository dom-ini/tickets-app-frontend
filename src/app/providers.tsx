"use client";

import { ThemeProvider } from "next-themes";

import { UserProvider } from "@/hooks/use-user";
import { DemoModeProvider } from "@/hooks/use-demo-mode";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <DemoModeProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </DemoModeProvider>
    </UserProvider>
  );
}
