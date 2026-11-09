"use client";

import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  EyeIcon,
  EyeOffIcon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router";
import { useState } from "react";

import { formatNaira } from "@/lib/format";
import { Button } from "@/components/ui/button";
import type { User } from "@/stores/auth";
import type { DashboardStats } from "@/lib/types";

type WalletBalanceProps = {
  loading?: boolean;
  onRefresh: () => void;
  wallet: User["wallet"];
  stats: DashboardStats["services"]
};

export function WalletBalance({
  wallet,
  stats,
  loading = false,
  onRefresh,
}: WalletBalanceProps) {
  const [hideBalance, setHideBalance] = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const fmt = (amount = 0) => {
    if (loading) return "Loading...";
    return hideBalance ? "*****" : formatNaira(amount);
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-primary/20">
      <div className="rounded-2xl bg-primary px-4 py-4 text-accent-foreground md:px-5 md:py-5">
        <div className="flex items-center gap-1">
          <span className="text-sm text-primary-foreground">
            Account balance
          </span>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={hideBalance ? "Show balance" : "Hide balance"}
            onClick={() => setHideBalance((value) => !value)}
            className="text-primary-foreground hover:bg-background/10 hover:text-primary-foreground"
          >
            <HugeiconsIcon
              icon={hideBalance ? EyeOffIcon : EyeIcon}
              className="size-4"
            />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Refresh balance"
            onClick={onRefresh}
            disabled={loading}
            className="hidden text-primary-foreground hover:bg-background/10 hover:text-primary-foreground md:inline-flex"
          >
            <HugeiconsIcon
              icon={RefreshIcon}
              className={`size-4 ${loading ? "animate-spin" : ""}`}
            />
          </Button>

          <Link
            to="/app/transactions"
            className="ml-auto flex items-center gap-1 text-sm text-primary-foreground hover:underline"
          >
            History
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </Link>
        </div>

        <h2 className="mt-3 wrap-break-word text-primary-foreground text-3xl leading-tight font-semibold sm:text-4xl">
          {fmt(wallet.balance)}
        </h2>
      </div>

      <div className="px-3">
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${breakdownOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
        >
          <div className="overflow-hidden">
            <div
              className={`space-y-3 py-2 transition-opacity duration-200 ${breakdownOpen ? "opacity-100" : "opacity-0"
                }`}
            >
              <div className="flex items-center gap-2 px-2">
                <span className="w-28 md:w-30">Earnings</span>
                <span className="font-medium">{fmt(wallet.commission)}</span>
              </div>

              <div>
                <p className="px-2 text-xs text-muted-foreground">Statistics</p>

                <div className="mt-1">
                  {Object.keys(stats).map(key => (
                    <Link
                      key={key}
                      to="/app/transactions"
                      className="flex items-center rounded-xl px-2 py-1.5 transition-colors hover:bg-background"
                    >
                      <span className="w-28 md:w-30">{key}</span>

                      <span className="font-medium">{fmt(stats[key as "airtime"])}</span>

                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        className="ml-auto size-4 text-muted-foreground"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          className="h-8 w-full gap-2 text-xs bg-transparent!"
          onClick={() => setBreakdownOpen((open) => !open)}
          aria-expanded={breakdownOpen}
        >
          {breakdownOpen ? "Hide breakdown" : "View breakdown"}

          <HugeiconsIcon
            icon={ArrowDown01Icon}
            className={`size-4 transition-transform duration-300 ${breakdownOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>
    </div>
  );
}
