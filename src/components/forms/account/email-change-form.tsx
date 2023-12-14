"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import useUser from "@/hooks/use-user";
import { updateUser } from "@/lib/api/users";
import { InvalidCurrentPasswordError } from "@/lib/api/users/errors";
import { currentPasswordField, emailField } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: emailField,
  password: currentPasswordField,
});

export function EmailChangeForm() {
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("email", user.email);
    }
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormError("");
    setFormLoading(true);
    try {
      await updateUser({
        email: values.email,
        currentPassword: values.password,
      });
      form.resetField("password");
      toast({
        title: "Adres e-mail zmieniony",
        description: "Twój adres e-mail został zmieniony pomyślnie.",
      });
    } catch (err) {
      if (err instanceof InvalidCurrentPasswordError) {
        setFormError("Nieprawidłowe aktualne hasło");
      } else {
        setFormError(
          "Wystąpił błąd podczas zmiany adresu e-mail. Spróbuj ponownie"
        );
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
              <FormLabel>Aktualne hasło</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Aktualne hasło"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Aby potwierdzić zmianę, wprowadź swoje aktualne hasło.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {formError && <FormErrorMessage>{formError}</FormErrorMessage>}
        <Button type="submit" className="w-full mt-2" disabled={formLoading}>
          {formLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Zmień adres e-mail"
          )}
        </Button>
      </form>
    </Form>
  );
}
