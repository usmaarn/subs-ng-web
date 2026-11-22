import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "cn"

type StatCardProps = {
  label: string
  value: ReactNode
  icon: ReactNode
  hint?: string
  tone?: "blue" | "green" | "violet" | "amber"
}

const tones = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
} as const

export function StatCard({ label, value, icon, hint, tone = "blue" }: StatCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={cn("grid size-11 shrink-0 place-items-center rounded-xl", tones[tone])}>
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}
