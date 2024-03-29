import "./globals.css";

import { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import React from "react";

import { NavigationMobile } from "@/components/navigation-mobile";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

import Providers from "./providers";

const baseFont = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Tickts",
    template: "%s | Tickts",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_HOST || "http://localhost:3000"
  ),
  description:
    "Rezerwuj bilety na najciekawsze wydarzenia. Wykłady, warsztaty, panele dyskusyjne i dużo więcej! Sprawdź dostępność biletów i dołącz do niezapomnianych wydarzeń",
  keywords: ["bilety", "wydarzenia", "rezerwacja", "warsztaty", "wykłady"],
  authors: [{ name: "Dominik", url: "https://github.com/dom-ini" }],
  themeColor: "#183EE5",
  openGraph: {
    images: ["/images/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={cn(
          `min-h-screen bg-background font-sans antialiased ${baseFont.variable}`
        )}
      >
        <Providers>
          {children}
          <Toaster />
          <NavigationMobile />
        </Providers>
        <ScrollToTop />
      </body>
    </html>
  );
}
