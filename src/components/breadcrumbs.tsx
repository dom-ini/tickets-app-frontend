"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { BreadcrumbNavigationItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
  elements: Array<BreadcrumbNavigationItem>;
}

interface BreadcrumbItemProps {
  item: BreadcrumbNavigationItem;
}

function BreadcrumbItem({ item }: BreadcrumbItemProps) {
  const pathname = usePathname();

  return item.href && item.href !== pathname ? (
    <Link
      className="transition-all hover:text-primary dark:hover:text-secondary"
      href={item.href}
      key={item.name}
    >
      {item.name}
    </Link>
  ) : (
    <span className="text-muted-foreground" key={item.name}>
      {item.name}
    </span>
  );
}

const baseBreadcrumbItems: Array<BreadcrumbNavigationItem> = [
  { name: "Strona główna", href: "/" },
];

export function Breadcrumbs({ elements, className }: BreadcrumbsProps) {
  const breadcrumbElements = baseBreadcrumbItems.concat(elements);

  return (
    <nav className={cn("flex flex-wrap items-center gap-2 text-xs", className)}>
      {breadcrumbElements.map((element) => (
        <Fragment key={element.name}>
          <BreadcrumbItem item={element} />
          <ChevronRight
            className="text-muted-foreground last-of-type:hidden mt-px"
            size="0.75rem"
          />
        </Fragment>
      ))}
    </nav>
  );
}
