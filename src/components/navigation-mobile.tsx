import { Blocks, Home, Menu, Search, User } from "lucide-react";
import Link from "next/link";

import { CategoryDrawer } from "@/components/drawers/category-drawer";
import { MenuDrawer } from "@/components/drawers/menu-drawer";
import { SearchDrawer } from "@/components/drawers/search-drawer";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type NavigationMobileItemProps = {
  name: string;
  className?: string;
  buttonClass?: string;
  icon: React.ReactNode;
  href?: string;
  drawer?: React.ReactNode;
} & (
  | { href: string; drawer?: never }
  | { href?: never; drawer: React.ReactNode }
);

const navigationItems: Array<NavigationMobileItemProps> = [
  {
    icon: <Home />,
    href: "/",
    name: "Strona główna",
  },
  {
    icon: <Blocks />,
    drawer: <CategoryDrawer />,
    name: "Kategorie",
  },
  {
    icon: <Search />,
    drawer: <SearchDrawer />,
    name: "Szukaj",
    buttonClass:
      "w-14 h-14 -translate-y-3 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center",
  },
  {
    icon: <User />,
    href: "/logowanie",
    name: "Moje konto",
  },
  {
    icon: <Menu />,
    drawer: <MenuDrawer />,
    name: "Menu",
  },
];

function NavigationMobileItem({
  icon,
  href,
  drawer,
  className,
  buttonClass,
  name,
}: NavigationMobileItemProps) {
  const buttonClassName =
    buttonClass ||
    "flex flex-col justify-center items-center gap-1 h-full after:w-2 after:opacity-0 after:h-1 after:bg-primary after:rounded hover:after:opacity-100 after:transition-all";

  return (
    <li
      className={cn(
        "h-full hover:-translate-y-1 hover:text-primary dark:hover:text-secondary transition-all group",
        className
      )}
    >
      {href ? (
        <>
          <Link href={href} className={buttonClassName} title={name}>
            {icon}
          </Link>
          <span className="sr-only">{name}</span>
        </>
      ) : (
        <>
          <Sheet>
            <SheetTrigger
              className={cn("w-full", buttonClassName)}
              title={name}
            >
              {icon}
            </SheetTrigger>
            {drawer}
          </Sheet>
          <span className="sr-only">{name}</span>
        </>
      )}
    </li>
  );
}

export function NavigationMobile() {
  return (
    <nav className="sm:hidden h-16 fixed bottom-0 w-full bg-background">
      <ul className="flex justify-between items-center border-t h-full group">
        {navigationItems.map((item, index) => (
          <NavigationMobileItem {...item} key={index} className="flex-1" />
        ))}
      </ul>
    </nav>
  );
}
