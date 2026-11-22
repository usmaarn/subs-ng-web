import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TransactionIcon, TransactionStatusBadge } from "@/components/dashboard/transactions/transaction-display"
import { formatNaira } from "@/lib/format"
import type { Transaction } from "@/lib/types"
import { TransactionType } from "@/lib/constants"

export function RecentTransactions({ data, onViewAll }: { data: Transaction[]; onViewAll?: () => void }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Recent transactions</CardTitle>
        {onViewAll && <Button variant="ghost" size="sm" onClick={onViewAll}>View all</Button>}
      </CardHeader>
      <CardContent className="space-y-1 p-3 pt-0">
        {data.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No transactions yet.</p>
        ) : (
          data.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 rounded-xl px-2 py-3 hover:bg-muted/40">
              <TransactionIcon category={tx.category} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{tx.description}</p>
                <p className="truncate text-xs text-muted-foreground">{tx.date}</p>
              </div>
              <div className="text-right">
                <p className={tx.type === TransactionType.Credit ? "text-sm font-semibold text-emerald-600" : "text-sm font-semibold"}>
                  {tx.type === TransactionType.Credit ? "+" : "-"}{formatNaira(tx.amount)}
                </p>
                <div className="mt-1 flex justify-end"><TransactionStatusBadge status={tx.status} /></div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
