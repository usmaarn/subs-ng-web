import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/components/ui/toast'
import { api, apiErrorMessage } from '@/lib/api'
import { type SessionData, setSession } from '@/server/session'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
})

const schema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
})

type LoginValues = z.infer<typeof schema>

const loginFn = createServerFn({ method: 'POST' })
  .validator((data: LoginValues) => data)
  .handler(async ({ data }) => {
    const resp = await api.post<SessionData>('/auth/login', data)
    await setSession({ data: resp.data })
    throw redirect({ to: '/app' })
  })

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<LoginValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: { email: '', password: '', rememberMe: false } as LoginValues,
  })
  const isPending = form.formState.isSubmitting

  const submit = async (values: LoginValues) => {
    try {
      await loginFn({ data: values })
    } catch (err: any) {
      if (err?.message === 'redirect' || err?.to) return
      toast.add({ type: 'error', description: apiErrorMessage(err) })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(submit)}>
      <FieldSet>
        <FieldLegend className="text-2xl!">Welcome back</FieldLegend>
        <FieldDescription>Sign in to manage your wallet and pay bills.</FieldDescription>

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

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel>Password</FieldLabel>
                  <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">Forgot password?</Link>
                </div>
                <InputGroup>
                  <InputGroupInput
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">
                    <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      <HugeiconsIcon icon={showPassword ? EyeOff : Eye} size={18} />
                    </button>
                  </InputGroupAddon>
                </InputGroup>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <Field orientation="horizontal">
                <Checkbox id="rememberMe" checked={field.value} onCheckedChange={field.onChange} />
                <Label htmlFor="rememberMe">Remember me</Label>
              </Field>
            )}
          />

          <Button disabled={isPending} type="submit" size="lg" className="w-full">
            {isPending && <Spinner />}
            Sign in
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">Create one</Link>
          </p>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
