import Link from "next/link";

import { ResetPasswordRequestForm } from "@/components/forms/auth/reset-password-request-form";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ResetPasswordRequestPage() {
  return (
    <>
      <CardHeader className="text-center space-y-2">
        <CardTitle>Zresetuj hasło</CardTitle>
        <CardDescription>
          Wprowadź swój adres e-mail w formularzu poniżej. Jeśli podany adres
          istnieje w bazie, otrzymasz na niego wiadomość z linkiem do resetu
          hasła.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordRequestForm />
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link href="/logowanie">Wróć do logowania</Link>
        </Button>
      </CardContent>
    </>
  );
}
