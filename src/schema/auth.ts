import z from "zod";

export const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, "Enter your full name")
            .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),
        email: z.email("Enter a valid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(72, "Password must be at most 72 characters"),
        acceptTerms: z.boolean().refine((value) => value, {
            message: "You must accept the Terms & Conditions",
        }),
    })

export const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
})

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;