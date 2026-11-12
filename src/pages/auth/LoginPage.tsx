import { api } from "@/api";
import { getApiErrorMessage } from "@/api/client";
import { InputField, SubmitButton } from "@/components/form/form-field";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { toast } from "@/components/ui/toast";
import { loginSchema, type LoginDto } from "@/schema/auth";
import { useAuthStore } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
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
      rememberMe: false,
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
        <fieldset>
          <legend className="text-2xl!">Welcome back</legend>
          <p className="text-sm text-base-content/50">Sign in to manage your wallet and subscriptions.</p>

          <div className="space-y-4 mt-4">
            <InputField
              control={form.control}
              icon="boxicons:at"
              name="email"
              label="Email Address"
              placeholder="name@example.com"
            />
            <InputField
              control={form.control}
              icon="andrsrxn:lock"
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
            <div className="flex justify-between items-center">
              <InputField
                control={form.control}
                label="Remember Me"
                name="rememberMe"
                type="checkbox"
              />
              <Link
                to="/forgot-password"
                className="link link-primary"
              >
                Forgot password?
              </Link>
            </div>

            <SubmitButton loading={form.formState.isSubmitting}>
              Sign in
            </SubmitButton>
          </div>
        </fieldset>

        <p className="mt-5 text-center text-sm">
          <span> New to the platform? </span>
          <Link to="/register" className="link link-primary">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
