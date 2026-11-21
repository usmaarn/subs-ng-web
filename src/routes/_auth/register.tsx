import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { api } from '@/lib/api'
import { SessionData, setSession } from '@/server/session'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { z } from "zod/v4"

export const Route = createFileRoute('/_auth/register')({
    component: RouteComponent,
})

const schema = z.object({
    name: z.string().nonempty(),
    email: z.email().nonempty(),
    password: z.string().min(8).nonempty(),
    acceptTerms: z.literal<boolean>(true),
})

const registerFn = createServerFn()
    .validator((data: z.infer<typeof schema>) => data)
    .handler(async ({ data }) => {
        const resp = await api.post<SessionData>("/auth/register", data);
        await setSession({ data: resp.data })
        throw redirect({ to: "/dashboard" })
    })

function RouteComponent() {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: '',
            password: '',
            acceptTerms: false,
        }
    })

    const submit = async (values: any) => {
        registerFn({ data: values }).catch(err => {
            if (axios.isAxiosError(err)) {
                const errs = err.response?.data?.errors ?? {};
                Object.keys(errs).forEach(err => {
                    form.setError(err as any, { message: errs[err] })
                })
            }
            const message = err?.response?.data?.message ?? err.message ?? "an unknown error occurred."
            toast.add({ type: "error", description: message })
        });
    }

    return (
        <form onSubmit={form.handleSubmit(submit)}>
            <FieldSet>
                <FieldLegend className='text-2xl!'>Create your account</FieldLegend>
                <FieldDescription>Pay bills, buy airtime and top up — all in one place.</FieldDescription>

                <FieldGroup>
                    <Controller
                        control={form.control}
                        name='name'
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Email Address</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder='enter email address' {...field} />
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />

                    <Button type='submit' size="lg" className="w-full">
                        Create account
                    </Button>
                </FieldGroup>
            </FieldSet>
        </form>
    )
}
