import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { activateAccount } from "@/lib/api/auth";

type SearchParams = {
  token?: string;
};

type ActivationPageProps = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: "Aktywacja konta",
};

export default async function ActivationPage({
  searchParams,
}: ActivationPageProps) {
  const { token } = searchParams;
  const activated = await activateAccount({ token: token || "" });
  const message =
    token && activated
      ? "Konto aktywowane pomyślnie. Możesz teraz przejść do strony logowania i zalogować się, używając danych podanych przy rejestracji."
      : "Nie udało się aktywować konta - link aktywacyjny wygasł lub jest niepoprawny.";

  return (
    <>
      <CardHeader className="text-center space-y-2">
        <CardTitle>Aktywacja konta</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link href="/logowanie">Wróć do logowania</Link>
        </Button>
      </CardContent>
    </>
  );
}
