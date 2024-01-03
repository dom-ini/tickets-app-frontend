import { Metadata } from "next";
import Link from "next/link";

import { RegistrationForm } from "@/components/forms/auth/registration-form";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Rejestracja",
};

export default function RegisterPage() {
  return (
    <>
      <CardHeader className="text-center space-y-2">
        <CardTitle>Załóż konto</CardTitle>
        <CardDescription>
          Wypełnij poniższy formularz, aby utworzyć konto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegistrationForm />
        <CardDescription className="mt-6 text-card-foreground">
          Masz już konto?
        </CardDescription>
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link href="/logowanie">Zaloguj się</Link>
        </Button>
      </CardContent>
    </>
  );
}
