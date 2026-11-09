import { useQuery } from "@tanstack/react-query";

import {
  AppStoreIcon,
  ArrowLeftRightIcon,
  ArrowUpRightIcon,
  CreditCardIcon,
  FileTextIcon,
  PlayIcon,
  SmartphoneIcon,
  WalletIcon,
  WifiIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";

import { WalletActivity } from "@/components/dashboard/wallet-activity";
import { WalletBalance } from "@/components/dashboard/wallet-balance";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

import { apiClient } from "@/api/client";
import { ButtonLink } from "@/components/ui/link";
import type { DashboardStats } from "@/lib/types";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { recentTransactionsColumns } from "@/columns/recent-transactions";

const quickLinks = [
  {
    label: "Airtime",
    to: "/app/services/airtime",
    icon: SmartphoneIcon,
    color: "text-blue-600",
    background: "bg-blue-50",
  },
  {
    label: "Data",
    to: "/app/services/data",
    icon: WifiIcon,
    color: "text-violet-600",
    background: "bg-violet-50",
  },
  {
    label: "Airtime 2 Cash",
    to: "/app/services/airtime-to-cash",
    icon: ArrowLeftRightIcon,
    color: "text-emerald-600",
    background: "bg-emerald-50",
  },
  {
    label: "Recharge Card",
    to: "/app/services/recharge-card",
    icon: CreditCardIcon,
    color: "text-amber-600",
    background: "bg-amber-50",
  },
  {
    label: "Electricity",
    to: "/app/services/electricity",
    icon: ZapIcon,
    color: "text-orange-600",
    background: "bg-orange-50",
  },
  {
    label: "Exam Card",
    to: "/app/services/exam-card",
    icon: FileTextIcon,
    color: "text-pink-600",
    background: "bg-pink-50",
  },
  {
    label: "Cable TV",
    to: "/app/services/cable-tv",
    icon: PlayIcon,
    color: "text-cyan-600",
    background: "bg-cyan-50",
  },
  {
    label: "More",
    to: "/app/services",
    icon: AppStoreIcon,
    color: "text-gray-600",
    background: "bg-gray-100",
  },
] as const

export function DashboardPage() {
  const navigate = useNavigate();

  const { data, refetch, error, isFetching, isPending } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await apiClient.get<DashboardStats>("/dashboard/stats");
      return res.data
    }
  });

  if (isPending) {
    return <h2>Loading...</h2>
  }

  if (error || !data) {
    console.log(error)
    return <h2>An Error occurred!</h2>
  }

  return (
    <DashboardLayout
      title="Dashboard"
      description="View insights into your activities"
    >
      <div className="space-y-6">
        {/* Wallet balance */}
        <section className="space-y-3">
          <WalletBalance
            wallet={data.wallet}
            stats={data.services}
            loading={isFetching}
            onRefresh={() => void refetch()}
          />

          <div className="flex gap-3">
            <ButtonLink
              size="lg"
              to="/app/wallet/fund"
              className="h-11 min-w-0 flex-1 font-medium"
            >
              <HugeiconsIcon icon={WalletIcon} className="size-4" />
              Fund Wallet
            </ButtonLink>

            <Button
              variant="outline"
              size="lg"
              className="h-11 min-w-0 flex-1 font-medium"
              onClick={() => {
                void navigate("/app/commission");
              }}
            >
              <HugeiconsIcon icon={ArrowUpRightIcon} className="size-4" />
              <span className="truncate">Withdraw Commission</span>
            </Button>
          </div>
        </section>

        {/* Quick links */}
        <section className="space-y-3">
          <div>
            <h2 className="text-base font-semibold">Quick links</h2>
            <p className="text-sm text-muted-foreground hidden">
              Your frequently used services
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
            {quickLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="group min-w-0 bg-white hover:bg-primary/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-2"
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-105 ${item.background} ${item.color}`}
                >
                  <HugeiconsIcon icon={item.icon} className="size-6" />
                </div>
                <span className="text-center text-xs font-medium leading-5 sm:text-sm">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Wallet activity and transaction summary */}
        <WalletActivity />

        {/* Recent transactions */}
        <Card>
          <CardHeader >
            <CardTitle >Recent transactions</CardTitle>
            <CardDescription > Your latest wallet activity </CardDescription>
          </CardHeader>

          <CardContent>
            <DataTable
              columns={recentTransactionsColumns}
              data={data.transactions}
              loading={isFetching}
              pageSize={10}
              searchPlaceholder="Search recent transactions"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
