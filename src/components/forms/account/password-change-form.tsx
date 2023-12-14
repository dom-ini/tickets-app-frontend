"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
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
import { toast } from "@/components/ui/use-toast";
import { updateUser } from "@/lib/api/users";
import { InvalidCurrentPasswordError } from "@/lib/api/users/errors";
import { currentPasswordField, passwordField } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    password: passwordField,
    repeatPassword: z.string(),
    currentPassword: currentPasswordField,
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Nowe hasła muszą być takie same",
    path: ["repeatPassword"],
  });

export function PasswordChangeForm() {
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
      currentPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormError("");
    setFormLoading(true);
    try {
      await updateUser({
        newPassword: values.password,
        currentPassword: values.currentPassword,
      });
      toast({
        title: "Hasło zmienione",
        description: "Twoje hasło zostało zmienione pomyślnie.",
      });
      form.reset();
    } catch (err) {
      if (err instanceof InvalidCurrentPasswordError) {
        setFormError("Nieprawidłowe aktualne hasło");
      } else {
        setFormError("Wystąpił błąd podczas zmiany hasła. Spróbuj ponownie");
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Nowe hasło"
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
              <FormLabel>Powtórz nowe hasło</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Powtórz hasło"
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
          name="currentPassword"
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
          {formLoading ? <Loader2 className="animate-spin" /> : "Zmień hasło"}
        </Button>
      </form>
    </Form>
  );
}
