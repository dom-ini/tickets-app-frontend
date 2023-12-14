"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useUser from "@/hooks/use-user";
import {
  AccountNotActivatedError,
  InvalidCredentialsError,
} from "@/lib/api/auth/errors";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().min(1, { message: "Adres e-mail jest wymagany" }),
  password: z.string().min(1, { message: "Hasło jest wymagane" }),
});

export function LoginForm() {
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();
  const { login } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormError("");
    setFormLoading(true);
    try {
      await login({ username: values.email, password: values.password });
      router.replace("/konto/bilety");
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        setFormError("Nieprawidłowe dane logowania");
      } else if (err instanceof AccountNotActivatedError) {
        setFormError(
          "Konto nie zostało jeszcze aktywowane. Sprawdź swój adres e-mail"
        );
      } else {
        setFormError("Wystąpił błąd podczas logowania. Spróbuj ponownie");
      }
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres e-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="Adres e-mail"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Hasło"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {formError && <FormErrorMessage>{formError}</FormErrorMessage>}
        <Button variant="link" asChild>
          <Link href="/nie-pamietam-hasla">Nie pamiętasz hasła?</Link>
        </Button>
        <Button type="submit" disabled={formLoading}>
          {formLoading ? <Loader2 className="animate-spin" /> : "Zaloguj się"}
        </Button>
      </form>
    </Form>
  );
}
