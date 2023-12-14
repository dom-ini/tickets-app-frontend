"use client";

import { ThemeProvider } from "next-themes";

import { UserProvider } from "@/hooks/use-user";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </UserProvider>
  );
}
