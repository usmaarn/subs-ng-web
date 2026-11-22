import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  SmartPhone01Icon,
  Wifi01Icon,
  Tv01Icon,
  ZapIcon,
  CreditCardIcon,
  ArrowLeftRightIcon,
  File02Icon,
  ArrowRight01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"
import { AppLayout } from "@/components/layouts/DashboardLayout"
import { WalletBalance } from "@/components/dashboard/wallet-balance"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ButtonLink } from "@/components/ui/link"
import { transactions } from "@/lib/catalog"
import { formatNaira } from "@/lib/format"

export const Route = createFileRoute('/app/')({
  component: DashboardPage,
})

const quickServices = [
  { label: "Airtime", to: "/app/services/airtime", icon: SmartPhone01Icon, color: "bg-blue-50 text-blue-600" },
  { label: "Data", to: "/app/services/data", icon: Wifi01Icon, color: "bg-violet-50 text-violet-600" },
  { label: "Cable TV", to: "/app/services/cable-tv", icon: Tv01Icon, color: "bg-cyan-50 text-cyan-600" },
  { label: "Electricity", to: "/app/services/electricity", icon: ZapIcon, color: "bg-amber-50 text-amber-600" },
  { label: "Recharge Card", to: "/app/services/recharge-card", icon: CreditCardIcon, color: "bg-emerald-50 text-emerald-600" },
  { label: "Airtime to Cash", to: "/app/services/airtime-to-cash", icon: ArrowLeftRightIcon, color: "bg-lime-50 text-lime-700" },
  { label: "Exam Cards", to: "/app/services/exam-card", icon: File02Icon, color: "bg-pink-50 text-pink-600" },
] as const

function DashboardPage() {
  const navigate = useNavigate()
  const totalSpent = transactions.filter(t => t.type === "debit" && t.status === "completed").reduce((s, t) => s + t.amount, 0)

  return (
    <AppLayout
      title="Dashboard"
      description="Overview of your wallet and recent activity."
      action={<ButtonLink to="/app/wallet" size="sm"><HugeiconsIcon icon={PlusSignIcon} className="size-4" />Fund wallet</ButtonLink>}
    >
      <div className="space-y-6">
        <WalletBalance
          data={{
            balance: 125500,
            commission: 7350,
            stats: [
              { label: "Airtime", amount: 12500 },
              { label: "Data", amount: 45000 },
              { label: "Cable/Power", amount: 20000 },
              { label: "Spent (month)", amount: totalSpent },
            ],
          }}
        />

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">Quick services</h2>
            <Link to="/app/services" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {quickServices.map((s) => (
              <Link key={s.to} to={s.to} className="group">
                <Card className="rounded-2xl transition hover:border-primary/30 hover:shadow-sm">
                  <CardContent className="flex flex-col items-center gap-3 p-4 text-center">
                    <span className={`grid size-11 place-items-center rounded-xl ${s.color}`}>
                      <HugeiconsIcon icon={s.icon} className="size-5" />
                    </span>
                    <span className="text-xs font-medium leading-tight">{s.label}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <RecentTransactions data={transactions.slice(0, 5)} onViewAll={() => navigate({ to: "/app/transactions" })} />

          <Card className="rounded-2xl">
            <CardContent className="p-5">
              <h3 className="font-semibold">Need help?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Our support team is available to help with transactions, wallet funding, and account issues.</p>
              <div className="mt-4 space-y-2">
                <ButtonLink to="/app/support" variant="outline" className="w-full justify-between">
                  Contact support <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                </ButtonLink>
                <ButtonLink to="/app/pricing" variant="ghost" className="w-full justify-between">
                  View pricing <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                </ButtonLink>
              </div>
              <div className="mt-5 rounded-xl bg-muted/60 p-4">
                <p className="text-xs font-medium text-muted-foreground">Wallet tip</p>
                <p className="mt-1 text-sm">Fund your wallet once for faster checkouts on all VTU services.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
