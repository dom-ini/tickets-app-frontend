import Link from "next/link";

import { ResetPasswordForm } from "@/components/forms/auth/reset-password-form";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ResetPasswordPage() {
  return (
    <>
      <CardHeader className="text-center space-y-2">
        <CardTitle>Zmień hasło</CardTitle>
        <CardDescription>
          Wypełnij poniższy formularz, aby zmienić swoje hasło.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm />
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link href="/logowanie">Wróć do logowania</Link>
        </Button>
      </CardContent>
    </>
  );
}
