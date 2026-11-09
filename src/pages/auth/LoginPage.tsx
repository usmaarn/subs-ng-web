import { api } from "@/api";
import { getApiErrorMessage } from "@/api/client";
import { FormField, SubmitButton } from "@/components/form/form-field";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { loginSchema, type LoginDto } from "@/schema/auth";
import { useAuthStore } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  AtIcon,
  LockPasswordIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();

  const setAuthSession = useAuthStore((s) => s.setSession);
  const session = useAuthStore((s) => s.session);

  const form = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(values: LoginDto) {
    try {
      const response = await api.login(values);
      setAuthSession({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        user: response.data.user,
      });
      toast.add({ type: "success", description: "Login Successful." });
      await navigate(
        response.data.user.email_verified_at ? "/app" : "/verify-email",
      );
    } catch (error) {
      toast.add({ type: "error", description: getApiErrorMessage(error) });
    }
  }

  useEffect(() => {
    if (session?.user) {
      navigate(session.user.email_verified_at ? "/app" : "/verify-email");
    }
  }, [session]);

  return (
    <AuthLayout>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="text-2xl!">Welcome back</FieldLegend>
            <FieldDescription>
              Sign in to manage your wallet and subscriptions.
            </FieldDescription>

            <FieldGroup className="gap-4">
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
                placeholder="Enter your password"
                inputProps={{ autoComplete: "current-password" }}
              />

              <div className="flex justify-end text-sm">
                <Link
                  to="/forgot-password"
                  className="whitespace-nowrap font-medium text-primary"
                >
                  Forgot password?
                </Link>
              </div>

              <SubmitButton
                loading={form.formState.isSubmitting}
                text={
                  <>
                    Sign in
                    <HugeiconsIcon icon={ArrowRight} />
                  </>
                }
                size="lg"
              />
            </FieldGroup>
          </FieldSet>

          <p className="mt-5 text-center text-sm">
            <span> New to the platform? </span>
            <Link to="/register" className="font-medium text-primary">
              Create an account
            </Link>
          </p>
        </FieldGroup>
      </form>
    </AuthLayout>
  );
}
