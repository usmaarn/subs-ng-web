import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TransactionIcon,
  TransactionStatusBadge,
} from "@/components/dashboard/transactions/transaction-display";
import { formatNaira } from "@/lib/format";
import type { Transaction } from "@/lib/types";

type RecentTransactionsProps = {
  data: Transaction[];
  onViewAll?: () => void;
};

export function RecentTransactions({
  data,
  onViewAll,
}: RecentTransactionsProps) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between gap-3 pb-3">
        <div>
          <CardTitle className="text-base">Recent transactions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Your latest wallet activity
          </p>
        </div>

        {onViewAll && (
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0 gap-1 text-xs"
            onClick={onViewAll}
          >
            View all
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y">
          {data.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-3 px-5 py-3"
            >
              <TransactionIcon category={transaction.category} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {transaction.description}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("en-NG", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1">
                <span
                  className={`text-sm font-semibold ${
                    transaction.type === "credit"
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-foreground"
                  }`}
                >
                  {transaction.type === "credit" ? "+" : "−"}
                  {formatNaira(transaction.amount)}
                </span>
                <TransactionStatusBadge status={transaction.status} />
              </div>
            </div>
          ))}

          {data.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">
              No transactions yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
