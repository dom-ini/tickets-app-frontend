"use client";

import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { toast } from "@/components/ui/use-toast";
import { resetPassword } from "@/lib/api/auth";
import { InvalidTokenError } from "@/lib/api/auth/errors";
import { passwordField } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    password: passwordField,
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Hasła muszą być takie same",
    path: ["repeatPassword"],
  });

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormError("");
    setFormLoading(true);
    try {
      await resetPassword({ newPassword: values.password, token });
      toast({
        title: "Hasło zmienione pomyślnie",
        description: "Możesz teraz zalogować się przy użyciu nowego hasła",
      });
      router.replace("/logowanie");
    } catch (err) {
      if (err instanceof InvalidTokenError) {
        setFormError("Nieprawidłowy token zmiany hasła");
      } else {
        setFormError("Wystąpił błąd podczas resetu hasła. Spróbuj ponownie");
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
              <FormLabel>Nowe hasło</FormLabel>
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
              <FormLabel>Powtórz hasło</FormLabel>
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
        {formError && <FormErrorMessage>{formError}</FormErrorMessage>}
        <Button type="submit" disabled={formLoading}>
          {formLoading ? <Loader2 className="animate-spin" /> : "Zmień hasło"}
        </Button>
      </form>
    </Form>
  );
}
