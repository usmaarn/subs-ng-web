import { api } from "@/api";
import { getApiErrorMessage } from "@/api/client";
import { InputField, SubmitButton } from "@/components/form/form-field";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { toast } from "@/components/ui/toast";
import { populateFormErrors } from "@/lib/utils";
import { registerSchema, type RegisterDto } from "@/schema/auth";
import { useAuthStore } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate();

  const setAuthSession = useAuthStore((s) => s.setSession);
  const session = useAuthStore((s) => s.session);

  const form = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      accept_terms: false,
    },
  });

  async function handleSubmit(values: RegisterDto) {
    try {
      const response = await api.register(values);
      setAuthSession({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        user: response.data.user,
      });
      toast.add({ type: "success", description: "registration succesfull." });
      await navigate("/verify-email");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        populateFormErrors(form, error);
      }
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
          <legend className="text-2xl!">Create your account</legend>
          <p className="text-base-content/60"> Start paying for airtime, data and bills in seconds. </p>

          <div className="space-y-4 mt-4">
            <InputField
              icon="andrsrxn:user"
              control={form.control}
              name="name"
              label="Full Name"
              placeholder="Baba Balogun"
            />
            <InputField
              icon="boxicons:at-filled"
              control={form.control}
              name="email"
              type="email"
              label="Email Address"
              placeholder="name@example.com"
            />
            <InputField
              control={form.control}
              icon="andrsrxn:lock"
              name="password"
              type="password"
              label="Password"
              placeholder="Create a password"
            />

            <InputField
              control={form.control}
              name="accept_terms"
              type="checkbox"
              label="Accept Terms & Conditions"
            />

            <SubmitButton loading={form.formState.isSubmitting}>
              Create account
            </SubmitButton>
          </div>
        </fieldset>
      </form>
      <p className="mt-5 text-center text-sm">
        <span> Already have an account? </span>
        <Link to="/login" className="font-medium text-primary">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
