"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { requestPasswordReset } from "@/lib/api/auth";
import { emailField } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: emailField,
});

export function ResetPasswordRequestForm() {
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormError("");
    setFormLoading(true);
    try {
      await requestPasswordReset({ email: values.email });
      toast({
        title: "Prośba o reset hasła wysłana",
        description:
          "Jeśli podany adres e-mail istnieje w bazie, otrzymasz na niego wiadomość z linkiem do resetu hasła",
      });
      router.replace("/logowanie");
    } catch (err) {
      setFormError(
        "Wystąpił błąd podczas wysyłania prośby o reset hasła. Spróbuj ponownie"
      );
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
                  data-test="email-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {formError && (
          <FormErrorMessage data-test="request-reset-error">
            {formError}
          </FormErrorMessage>
        )}
        <Button type="submit" disabled={formLoading}>
          {formLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Zresetuj hasło"
          )}
        </Button>
      </form>
    </Form>
  );
}
