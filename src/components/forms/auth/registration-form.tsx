"use client";

import { Loader2 } from "lucide-react";
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
import { toast } from "@/components/ui/use-toast";
import { register } from "@/lib/api/users";
import { EmailAlreadyTakenError } from "@/lib/api/users/errors";
import { emailField, passwordField } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    email: emailField,
    password: passwordField,
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Hasła muszą być takie same",
    path: ["repeatPassword"],
  });

export function RegistrationForm() {
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormError("");
    setFormLoading(true);
    try {
      await register({ email: values.email, password: values.password });
      toast({
        title: "Rejestracja pomyślna",
        description:
          "Na podany adres e-mail wysłaliśmy link do aktywacji konta. Aktywuj konto, aby móc się zalogować",
      });
      router.replace("/logowanie");
    } catch (err) {
      if (err instanceof EmailAlreadyTakenError) {
        setFormError("Podany adres e-mail jest już zajęty");
      } else {
        setFormError("Wystąpił błąd podczas rejestracji. Spróbuj ponownie");
      }
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        data-test="registration-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Adres e-mail</FormLabel>
              <FormControl>
                <Input
                  data-test="email-input"
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
                  data-test="password-input"
                  placeholder="Hasło"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Powtórz hasło</FormLabel>
              <FormControl>
                <PasswordInput
                  data-test="repeat-password-input"
                  placeholder="Powtórz hasło"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {formError && (
          <FormErrorMessage data-test="registration-error">
            {formError}
          </FormErrorMessage>
        )}
        <Button type="submit" disabled={formLoading}>
          {formLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Zarejestruj się"
          )}
        </Button>
      </form>
    </Form>
  );
}
