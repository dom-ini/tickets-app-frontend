import { Blocks, ChevronRight, HelpCircle, Home, User } from "lucide-react";
import Link from "next/link";

import { SheetClose, SheetContent, SheetHeader } from "@/components/ui/sheet";

type MenuItemProps = {
  href: string;
  name: string;
  icon: React.ReactNode;
};

const menuIconSize = "1.5rem";

const menuItems: Array<MenuItemProps> = [
  {
    name: "Strona główna",
    href: "/",
    icon: <Home size={menuIconSize} />,
  },
  {
    name: "Kategorie",
    href: "/kategorie",
    icon: <Blocks size={menuIconSize} />,
  },
  {
    name: "Moje konto",
    href: "/konto/bilety",
    icon: <User size={menuIconSize} />,
  },
  {
    name: "Pomoc",
    href: "/pomoc",
    icon: <HelpCircle size={menuIconSize} />,
  },
];

function MenuItem({ href, name, icon }: MenuItemProps) {
  return (
    <li className="border-b">
      <SheetClose asChild>
        <Link
          href={href}
          className="flex gap-4 py-4 transition-all hover:text-primary dark:hover:text-secondary"
        >
          {icon}
          <span className="font-medium">{name}</span>
          <ChevronRight size={menuIconSize} className="ms-auto" />
        </Link>
      </SheetClose>
    </li>
  );
}

export function MenuDrawer() {
  return (
    <SheetContent side="left" className="overflow-y-auto">
      <SheetHeader className="font-bold">Menu</SheetHeader>
      <nav className="mt-4">
        <ul>
          {menuItems.map((item) => (
            <MenuItem {...item} key={item.name} />
          ))}
        </ul>
      </nav>
    </SheetContent>
  );
}
