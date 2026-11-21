import axios from "axios";
import type { ZodError } from "zod";

import { toCamelCaseKeys } from "#/lib/camel-case";

export type FieldErrors = Record<string, string>;

function firstMessage(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value;
  if (Array.isArray(value)) return firstMessage(value[0]);
  return undefined;
}

/**
 * Converts a ZodError into the `{ fieldName: message }` shape expected by
 * HeroUI's `<Form validationErrors={...}>`.
 */
export function parseZodErrors(error: ZodError): FieldErrors {
  const errors: FieldErrors = {};

  for (const issue of error.issues) {
    const key = issue.path.length ? issue.path.join(".") : "form";
    errors[key] ??= issue.message;
  }

  return errors;
}

/** Converts an API validation payload into HeroUI form field errors. */
export function parseApiFieldErrors(error: unknown): FieldErrors | undefined {
  if (!axios.isAxiosError(error)) return undefined;

  const data = toCamelCaseKeys(error.response?.data) as
    | {
        errors?: Record<string, unknown>;
        fieldErrors?: Record<string, unknown>;
        validationErrors?: Record<string, unknown>;
      }
    | undefined;

  const source =
    data?.fieldErrors ?? data?.validationErrors ?? data?.errors ?? undefined;
  if (!source || typeof source !== "object") return undefined;

  const errors: FieldErrors = {};
  for (const [key, value] of Object.entries(source)) {
    const message = firstMessage(value);
    if (message) errors[key] = message;
  }

  return Object.keys(errors).length ? errors : undefined;
}

export function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}
