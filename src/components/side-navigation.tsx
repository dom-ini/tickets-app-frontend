"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { NavigationItem } from "@/lib/types";

interface SideNavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<NavigationItem>;
}

export function SideNavigation({
  className,
  items,
  ...props
}: SideNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex gap-2 flex-col sm:flex-row lg:flex-col", className)}
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          className="justify-start"
          asChild
          onClick={item.onClick}
        >
          <Link
            href={item.href || "#"}
            className={cn(
              pathname === item.href
                ? "bg-accent"
                : "hover:bg-transparent hover:underline",
              "font-semibold"
            )}
          >
            {item.name}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
