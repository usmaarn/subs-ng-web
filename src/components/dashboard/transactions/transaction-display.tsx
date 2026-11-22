import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  SmartPhone01Icon,
  Wifi01Icon,
  Tv01Icon,
  ZapIcon,
  File02Icon,
  GiftIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"
import { TransactionCategory, TransactionStatus, type TransactionStatus as TxStatus } from "@/lib/constants"
import { cn } from "cn"

const categoryIcon: Record<string, typeof Wallet01Icon> = {
  [TransactionCategory.Airtime]: SmartPhone01Icon,
  [TransactionCategory.Data]: Wifi01Icon,
  [TransactionCategory.CableTV]: Tv01Icon,
  [TransactionCategory.Electricity]: ZapIcon,
  [TransactionCategory.ExamCard]: File02Icon,
  [TransactionCategory.Commission]: GiftIcon,
  [TransactionCategory.WalletFunding]: Wallet01Icon,
  [TransactionCategory.Funding]: Wallet01Icon,
}

export function TransactionIcon({ category }: { category?: string }) {
  const Icon = (category && categoryIcon[category]) || Wallet01Icon
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
      <HugeiconsIcon icon={Icon} className="size-4" />
    </span>
  )
}

export function TransactionStatusBadge({ status }: { status: TxStatus | string }) {
  const s = String(status).toLowerCase()
  const cls =
    s === TransactionStatus.Completed || s === "successful"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
      : s === TransactionStatus.Pending
        ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
        : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
  const label = s === "completed" ? "Successful" : s.charAt(0).toUpperCase() + s.slice(1)
  return <Badge variant="secondary" className={cn("rounded-full border-0 px-2.5 py-1 font-medium", cls)}>{label}</Badge>
}
