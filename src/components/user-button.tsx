"use client";

import { User } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import useUser from "@/hooks/use-user";

export function UserButton() {
  const { isAuthenticated } = useUser();
  const buttonHref = isAuthenticated ? "/konto/bilety" : "/logowanie";

  return (
    <Button variant="ghost" asChild className="hidden sm:block">
      <Link href={buttonHref}>
        <User />
      </Link>
    </Button>
  );
}
