import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ViewIcon, ViewOffSlashIcon, RefreshIcon } from "@hugeicons/core-free-icons"
import { formatNaira } from "@/lib/format"

type WalletBalanceProps = {
  data: {
    balance: number
    commission: number
    stats?: Array<{ label: string; amount: number }>
  }
  onRefresh?: () => void
}

export function WalletBalance({ data, onRefresh }: WalletBalanceProps) {
  const [hidden, setHidden] = useState(false)
  return (
    <Card className="overflow-hidden rounded-2xl border-primary/10 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-primary-foreground/80">Available balance</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {hidden ? "₦••••••" : formatNaira(data.balance)}
              </p>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-primary-foreground hover:bg-white/15 hover:text-primary-foreground"
                onClick={() => setHidden((v) => !v)}
                aria-label={hidden ? "Show balance" : "Hide balance"}
              >
                <HugeiconsIcon icon={hidden ? ViewOffSlashIcon : ViewIcon} className="size-4" />
              </Button>
            </div>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Commission: <span className="font-medium text-primary-foreground">{hidden ? "₦••••" : formatNaira(data.commission)}</span>
            </p>
          </div>
          {onRefresh && (
            <Button variant="secondary" size="sm" className="bg-white/15 text-primary-foreground hover:bg-white/25 border-0" onClick={onRefresh}>
              <HugeiconsIcon icon={RefreshIcon} className="size-4" />
              Refresh
            </Button>
          )}
        </div>
        {data.stats && data.stats.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white/10 px-3 py-2">
                <p className="text-[11px] text-primary-foreground/75">{s.label}</p>
                <p className="text-sm font-medium">{hidden ? "••••" : formatNaira(s.amount, 0)}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
