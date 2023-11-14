import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CategoryDropdown } from "@/components/category-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeaderProps = {
  isAuthPage?: boolean;
};

function getHeaderClass(isAuth: boolean) {
  return isAuth
    ? "bg-transparent absolute z-50 w-full"
    : "supports-backdrop-blur:bg-background/60 sticky top-0 z-50 bg-background/95 backdrop-blur border-b shadow-sm";
}

export function Header({ isAuthPage }: HeaderProps) {
  return (
    <header className={getHeaderClass(Boolean(isAuthPage))}>
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width="120"
            height="45"
            className={cn(
              "h-auto w-[120px]",
              isAuthPage
                ? "sm:brightness-0 sm:invert dark:brightness-0 dark:invert"
                : "dark:brightness-0 dark:invert",
            )}
          />
        </Link>
        {!isAuthPage && (
          <div className="hidden sm:block">
            <CategoryDropdown />
          </div>
        )}
        <ThemeToggle className="ms-auto" variant="ghost" />
        {!isAuthPage && (
          <Button variant="ghost" asChild className="hidden sm:block">
            <Link href="/konto/bilety">
              <User />
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
