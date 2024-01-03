import { Metadata } from "next";

import { EmailChangeForm } from "@/components/forms/account/email-change-form";
import { PasswordChangeForm } from "@/components/forms/account/password-change-form";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Dane logowania",
};

export default function AccountPage() {
  return (
    <div className="lg:max-w-lg">
      <h2 className="text-xl font-bold">Zmień adres e-mail</h2>
      <p className="text-muted-foreground mb-4 text-sm">
        Na ten adres e-mail będziemy Ci przesyłać zarezerwowane przez Ciebie
        bilety.
        <br />
        Adres ten służy także do logowania na Twoje konto.
      </p>
      <EmailChangeForm />
      <Separator className="my-8" />
      <h2 className="text-xl font-bold mb-4">Zmień swoje hasło</h2>
      <PasswordChangeForm />
    </div>
  );
}
