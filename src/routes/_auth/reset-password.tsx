import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/components/ui/toast'
import { api, apiErrorMessage } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod/v4'

const schema = z.object({
  email: z.email('Enter a valid email address'),
  code: z.string().length(6, 'Enter the 6-digit code'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Confirm your password'),
}).refine((d) => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] })

type Values = z.infer<typeof schema>

export const Route = createFileRoute('/_auth/reset-password')({
  validateSearch: (search: Record<string, unknown>) => ({ email: typeof search.email === 'string' ? search.email : '' }),
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  const { email } = Route.useSearch()
  const navigate = useNavigate()
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email, code: '', password: '', confirmPassword: '' } })
  const isPending = form.formState.isSubmitting

  const submit = async (values: Values) => {
    try {
      await api.post('/auth/reset-password', { email: values.email, code: values.code, password: values.password })
      toast.add({ type: 'success', description: 'Password reset successfully. Please sign in.' })
      await navigate({ to: '/login' })
    } catch (err) {
      toast.add({ type: 'error', description: apiErrorMessage(err) })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(submit)}>
      <FieldSet>
        <FieldLegend className="text-2xl!">Reset password</FieldLegend>
        <FieldDescription>Enter the code sent to your email and choose a new password.</FieldDescription>
        <FieldGroup>
          {(['email', 'code', 'password', 'confirmPassword'] as const).map((name) => (
            <Controller
              key={name}
              control={form.control}
              name={name}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{name === 'confirmPassword' ? 'Confirm password' : name === 'code' ? 'Reset code' : name === 'email' ? 'Email address' : 'New password'}</FieldLabel>
                  <Input
                    {...field}
                    type={name.includes('password') ? 'password' : name === 'email' ? 'email' : 'text'}
                    placeholder={name === 'code' ? '000000' : name === 'email' ? 'name@example.com' : 'Enter value'}
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          ))}
          <Button type="submit" size="lg" className="w-full" disabled={isPending}>{isPending && <Spinner />}Reset password</Button>
          <p className="text-center text-sm text-muted-foreground">
            <Link to="/forgot-password" className="font-medium text-primary hover:underline">Resend code</Link>
          </p>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
