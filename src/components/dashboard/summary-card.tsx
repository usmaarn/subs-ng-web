import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type SummaryRow = { label: string; value: ReactNode }

export function SummaryCard({
  rows,
  total,
  totalLabel = "Total",
  action,
  note,
}: {
  rows: SummaryRow[]
  total: ReactNode
  totalLabel?: string
  action: ReactNode
  note?: string
}) {
  return (
    <Card className="sticky top-24 rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Order summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="text-right font-medium">{row.value}</span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-muted-foreground">{totalLabel}</span>
          <span className="text-lg font-semibold">{total}</span>
        </div>
        {action}
        {note && <p className="text-xs leading-relaxed text-muted-foreground">{note}</p>}
      </CardContent>
    </Card>
  )
}
