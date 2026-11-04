import { authClient } from "@/api/auth";
import { getApiErrorMessage } from "@/api/client";
import { FormField, SubmitButton } from "@/components/form/form-field";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { registerSchema, type RegisterValues } from "@/schema/auth";
import { useAuthStore } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtIcon, LockPasswordIcon, UserIcon } from "@hugeicons/core-free-icons";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export default function RegisterPage() {
    const navigate = useNavigate();

    const setAuthSession = useAuthStore((s) => s.setSession);

    const form = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            acceptTerms: false,
        },
    });

    async function handleSubmit(values: RegisterValues) {
        try {
            const response = await authClient.register(values);
            setAuthSession(response.data);
            toast.add({ type: "success", description: response.message });
            await navigate("/verify-email");
        } catch (error) {
            toast.add({ type: "error", description: getApiErrorMessage(error) });
        }
    }

    return (
        <AuthLayout
            title="Create your account"
            description="Start paying for airtime, data and bills in seconds."
            onSubmit={form.handleSubmit(handleSubmit)}
            footer={
                <p className="mt-5 text-center text-sm">
                    <span> Already have an account? </span>
                    <Link to="/login" className="font-medium text-primary">
                        Sign in
                    </Link>
                </p>
            }
        >
            <FieldGroup className="gap-4">
                <FormField
                    icon={UserIcon}
                    control={form.control}
                    name="name"
                    label="Full Name"
                    placeholder="Baba Balogun"
                    inputProps={{ autoComplete: "name" }}
                />
                <FormField
                    icon={AtIcon}
                    control={form.control}
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="name@example.com"
                    inputProps={{ autoComplete: "email" }}
                />
                <FormField
                    control={form.control}
                    icon={LockPasswordIcon}
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Create a password"
                    inputProps={{ autoComplete: "new-password" }}
                />

                <FormField
                    control={form.control}
                    name="acceptTerms"
                    type="checkbox"
                    label="Accept Terms & Conditions"
                />

                <SubmitButton loading={form.formState.isSubmitting} text="Create account" size="lg" />
            </FieldGroup>
        </AuthLayout>
    )
}