import { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/forms/auth/login-form";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DemoModeBanner } from "@/components/demo-mode-banner";

export const metadata: Metadata = {
  title: "Logowanie",
};

export default function LoginPage() {
  return (
    <>
      <CardHeader className="text-center space-y-2">
        <CardTitle>Zaloguj się</CardTitle>
        <CardDescription>
          Witaj ponownie! Wprowadź swój adres e-mail i&nbsp;hasło, żeby się
          zalogować.
        </CardDescription>
        <DemoModeBanner className="mb-4" />
      </CardHeader>
      <CardContent>
        <LoginForm />
        <CardDescription className="mt-6 text-card-foreground">
          Nie masz jeszcze konta?
        </CardDescription>
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link href="/rejestracja">Zarejestruj się</Link>
        </Button>
      </CardContent>
    </>
  );
}
