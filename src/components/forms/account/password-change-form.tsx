"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password-input";
import { currentPasswordField, passwordField } from "@/lib/zod";

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
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
      currentPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
        <Button type="submit" className="w-full mt-2">
          Zmień hasło
        </Button>
      </form>
    </Form>
  );
}
