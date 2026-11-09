import { api } from "@/api";
import { getApiErrorMessage } from "@/api/client";
import { FormField, SubmitButton } from "@/components/form/form-field";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { verifyEmailSchema, type VerifyEmailDto } from "@/schema/auth";
import { useAuthStore } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckmarkCircle02Icon,
  Key01Icon,
  MailSend01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useEffectEvent, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export default function VerifyEmailPage() {
  const session = useAuthStore((store) => store.session);
  const setUser = useAuthStore((store) => store.setUser);
  const [isPending, startTransition] = useTransition();

  const navigate = useNavigate();

  const form = useForm<VerifyEmailDto>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: "" },
  });

  function handleResend() {
    startTransition(async () => {
      try {
        await api.sendEmailVerificationOtp();
        toast.add({
          type: "success",
          description: "Email otp sent to your email address",
        });
      } catch (error) {
        toast.add({ type: "error", description: getApiErrorMessage(error) });
      }
    });
  }

  async function handleSubmit(values: VerifyEmailDto) {
    startTransition(async () => {
      try {
        const response = await api.verifyEmail(values);
        setUser(response.data);
        toast.add({
          type: "success",
          description: "email verification successful",
        });
        await navigate("/app");
      } catch (error) {
        toast.add({ type: "error", description: getApiErrorMessage(error) });
      }
    });
  }

  useEffect(() => {
    if (session?.user.email_verified_at) {
      navigate("/app");
    }
  }, [session]);

  if (!session) {
    return (
      <AuthLayout>
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="text-2xl!">Verify your email</FieldLegend>
            <FieldDescription>
              Sign in to verify the email on your account.
            </FieldDescription>
            <Link to="/login" className="font-medium text-primary">
              Back to sign in
            </Link>
          </FieldSet>
        </FieldGroup>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="text-2xl!">Verify your email</FieldLegend>
            <FieldDescription>
              We sent a 6-digit code to{" "}
              <span className="font-medium text-foreground">
                {session.user.email}
              </span>
              . Enter it below to confirm your account.
            </FieldDescription>

            <FieldGroup className="gap-4">
              <FormField
                icon={Key01Icon}
                control={form.control}
                name="code"
                label="Verification Code"
                placeholder="000000"
                inputProps={{
                  inputMode: "numeric",
                  maxLength: 6,
                  autoComplete: "one-time-code",
                  autoFocus: true,
                }}
              />

              <SubmitButton
                loading={form.formState.isSubmitting}
                text="Verify email"
                size="lg"
              />

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
                disabled={isPending}
                onClick={handleResend}
              >
                {isPending ? (
                  <Spinner />
                ) : (
                  <HugeiconsIcon icon={MailSend01Icon} />
                )}
                Resend code
              </Button>
            </FieldGroup>
          </FieldSet>

          <p className="mt-5 text-center text-sm">
            <Link to="/app" className="font-medium text-primary">
              Skip for now
            </Link>
          </p>
        </FieldGroup>
      </form>
    </AuthLayout>
  );
}
