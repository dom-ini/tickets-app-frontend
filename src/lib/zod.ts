import * as z from "zod";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_UPPER = /[A-Z]/;
const PASSWORD_LOWER = /[a-z]/;
const PASSWORD_DIGIT = /\d/;
const PASSWORD_SPECIAL = /[@#$!%^&*()\-_=+{}[\]|\\:;<>,.?/~"`']/;

export const emailField = z
  .string()
  .email({ message: "Niepoprawny adres e-mail" });
export const currentPasswordField = z
  .string()
  .min(1, { message: "Hasło jest wymagane" });
export const passwordField = z
  .string()
  .min(PASSWORD_MIN_LENGTH, {
    message: `Hasło musi mieć co najmniej ${PASSWORD_MIN_LENGTH} znaków`,
  })
  .regex(PASSWORD_UPPER, {
    message: "Hasło musi zawierać co najmniej jedną wielką literę",
  })
  .regex(PASSWORD_LOWER, {
    message: "Hasło musi zawierać co najmniej jedną małą literę",
  })
  .regex(PASSWORD_DIGIT, {
    message: "Hasło musi zawierać co najmniej jedną cyfrę",
  })
  .regex(PASSWORD_SPECIAL, {
    message: "Hasło musi zawierać co najmniej jeden znak specjalny",
  });
