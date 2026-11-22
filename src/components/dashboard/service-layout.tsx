import type { ReactNode } from "react"
import { cn } from "cn"

export function ServiceLayout({ form, summary, className }: { form: ReactNode; summary: ReactNode; className?: string }) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]", className)}>
      <div className="rounded-2xl border bg-card p-5 sm:p-6">{form}</div>
      <div>{summary}</div>
    </div>
  )
}

export function ServiceFormHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}

export function FormSection({ title, extra, children }: { title: string; extra?: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium">{title}</h3>
        {extra}
      </div>
      {children}
    </section>
  )
}
