import { SideNavigation } from "@/components/side-navigation";
import { Separator } from "@/components/ui/separator";

import type { NavigationItem } from "@/lib/types";

const NavigationItems: Array<NavigationItem> = [
  {
    name: "Moje bilety",
    href: "/konto/bilety",
  },
  {
    name: "Dane logowania",
    href: "/konto/dane-logowania",
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container space-y-6 mt-8 mb-16">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Moje konto</h1>
        <p className="text-muted-foreground">
          Tutaj możesz zobaczyć swoje bilety oraz zmienić swój adres e-mail i
          hasło.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SideNavigation items={NavigationItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
