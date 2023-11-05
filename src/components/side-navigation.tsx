"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/lib/constants";

interface SideNavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<SidebarNavItem>;
}

export function SideNavigation({
  className,
  items,
  ...props
}: SideNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          className="justify-start"
          asChild
        >
          <Link
            href={item.href}
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
