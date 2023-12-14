"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { SideNavigation } from "@/components/side-navigation";
import { Separator } from "@/components/ui/separator";
import useUser from "@/hooks/use-user";

import type { NavigationItem } from "@/lib/types";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useUser();
  const { replace } = useRouter();

  const handleLogout = useCallback(async () => {
    await logout();
    replace("/logowanie");
  }, [replace, logout]);

  const navigationItems = useMemo<Array<NavigationItem>>(
    () => [
      {
        name: "Moje bilety",
        href: "/konto/bilety",
      },
      {
        name: "Dane logowania",
        href: "/konto/dane-logowania",
      },
      {
        name: "Wyloguj",
        onClick: handleLogout,
      },
    ],
    [handleLogout]
  );

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
          <SideNavigation items={navigationItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
