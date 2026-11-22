import type { ZodError } from "zod";

export type FieldErrors = Record<string, string>;

export function parseZodErrors(error: ZodError): FieldErrors {
  const errors: FieldErrors = {};

  for (const issue of error.issues) {
    const key = issue.path.length ? issue.path.join(".") : "form";
    errors[key] ??= issue.message;
  }

  return errors;
}