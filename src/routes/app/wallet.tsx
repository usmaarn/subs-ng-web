
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Copy01Icon,
  PlusSignIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "@/components/ui/toast";

import { AppLayout } from "@/components/layouts/DashboardLayout";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { StatCard } from "@/components/dashboard/stat-card";
import { WalletBalance } from "@/components/dashboard/wallet-balance";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { transactions, walletAccount } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/app/wallet")({
  component: WalletPage,
});

const balance = 125500;
const commission = 7350;

const stats = [
  { label: "Airtime", amount: 12500 },
  { label: "Data bundles", amount: 45000 },
  { label: "Exam cards", amount: 8000 },
  { label: "Cable TV", amount: 15000 },
];

function WalletPage() {
  const navigate = useNavigate();

  const totalReceived = transactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalSpent = transactions
    .filter(
      (transaction) =>
        transaction.type === "debit" && transaction.status === "completed",
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  async function copyAccountNumber() {
    try {
      await navigator.clipboard.writeText(walletAccount.number);
      toast.add({
        title: "Account number copied",
      });
    } catch {
      toast.add({
        title: "Unable to copy account number",
        type: "error",
      });
    }
  }

  return (
    <AppLayout
      title="Wallet"
      description="Manage your balance, funding and wallet activity."
    >
      <div className="space-y-5">
        <section className="space-y-3">
          <WalletBalance
            data={{ balance, commission, stats }}
            onRefresh={() =>
              toast.add({
                title: "Wallet balance is up to date",
              })
            }
          />

          <div className="flex gap-3">
            <Button
              size="lg"
              className="h-11 min-w-0 flex-1 font-medium"
              onClick={() => toast.add({ type: "info", description: "Fund wallet flow coming soon." })}
            >
              <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
              Fund wallet
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-11 min-w-0 flex-1 font-medium"
              render={<Link to="/app/commission" />}
            >
              <HugeiconsIcon icon={ArrowUp01Icon} className="size-4" />
              Withdraw commission
            </Button>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Money in"
            value={formatNaira(totalReceived)}
            icon={<HugeiconsIcon icon={ArrowDown01Icon} />}
            hint="Wallet credits"
            tone="green"
          />

          <StatCard
            label="Money out"
            value={formatNaira(totalSpent)}
            icon={<HugeiconsIcon icon={ArrowUp01Icon} />}
            hint="Successful payments"
            tone="blue"
          />

          <StatCard
            label="Commission"
            value={formatNaira(commission)}
            icon={<HugeiconsIcon icon={Wallet01Icon} />}
            hint="Available to withdraw"
            tone="violet"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <RecentTransactions
            data={transactions.slice(0, 6)}
            onViewAll={() => navigate({ to: "/app/transactions" })}
          />

          <Card className="rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Wallet account</CardTitle>
              <p className="text-sm text-muted-foreground">
                Transfer to this account to fund your wallet.
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Account name</span>
                  <span className="text-right font-medium">
                    {walletAccount.name}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Bank</span>
                  <span className="text-right font-medium">
                    {walletAccount.bank}
                  </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Account number</span>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold tabular-nums">
                      {walletAccount.number}
                    </span>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={copyAccountNumber}
                      aria-label="Copy account number"
                    >
                      <HugeiconsIcon
                        icon={Copy01Icon}
                        className="size-4"
                      />
                    </Button>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Your wallet is credited automatically once the transfer is
                confirmed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
