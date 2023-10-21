import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CategoryDropdown } from "@/components/category-dropdown";
import { User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8">
          <Image
            src="/logo.svg"
            alt="Logo"
            width="120"
            height="45"
            className="dark:brightness-0 dark:invert"
          />
        </Link>
        <div className="hidden sm:block">
          <CategoryDropdown />
        </div>
        <ThemeToggle className="ms-auto" variant="ghost" />
        <Button variant="ghost" asChild className="hidden sm:block">
          <Link href="/logowanie">
            <User />
          </Link>
        </Button>
      </div>
    </header>
  );
}
