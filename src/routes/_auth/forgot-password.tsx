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

const schema = z.object({ email: z.email('Enter a valid email address') })
type Values = z.infer<typeof schema>

export const Route = createFileRoute('/_auth/forgot-password')({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: '' } })
  const isPending = form.formState.isSubmitting

  const submit = async (values: Values) => {
    try {
      await api.post('/auth/forgot-password', values)
      toast.add({ type: 'success', description: 'Reset code sent to your email.' })
      await navigate({ to: '/reset-password', search: { email: values.email } })
    } catch (err) {
      toast.add({ type: 'error', description: apiErrorMessage(err) })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(submit)}>
      <FieldSet>
        <FieldLegend className="text-2xl!">Forgot password?</FieldLegend>
        <FieldDescription>Enter your email and we’ll send a reset code.</FieldDescription>
        <FieldGroup>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email address</FieldLabel>
                <Input type="email" autoComplete="email" placeholder="name@example.com" aria-invalid={fieldState.invalid} {...field} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Button type="submit" size="lg" className="w-full" disabled={isPending}>
            {isPending && <Spinner />}Send reset code
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            <Link to="/login" className="font-medium text-primary hover:underline">Back to sign in</Link>
          </p>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
