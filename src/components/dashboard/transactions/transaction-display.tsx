import {
  ArrowLeftRightIcon,
  CreditCardIcon,
  FileTextIcon,
  GiftIcon,
  SmartPhone01Icon,
  TvIcon,
  Wallet01Icon,
  Wifi01Icon,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { TransactionCategory } from "@/lib/types";

const categoryStyles: Record<
  TransactionCategory,
  { icon: typeof Wallet01Icon; className: string }
> = {
  funding: { icon: Wallet01Icon, className: "bg-emerald-50 text-emerald-600" },
  airtime: { icon: SmartPhone01Icon, className: "bg-blue-50 text-blue-600" },
  data: { icon: Wifi01Icon, className: "bg-violet-50 text-violet-600" },
  exam_card: { icon: FileTextIcon, className: "bg-pink-50 text-pink-600" },
  recharge_card: {
    icon: CreditCardIcon,
    className: "bg-amber-50 text-amber-600",
  },
  "cable-tv": { icon: TvIcon, className: "bg-cyan-50 text-cyan-600" },
  electricity: { icon: ZapIcon, className: "bg-orange-50 text-orange-600" },
  commission: { icon: GiftIcon, className: "bg-lime-50 text-lime-700" },
  transfer: {
    icon: ArrowLeftRightIcon,
    className: "bg-slate-100 text-slate-600",
  },
};

export function TransactionIcon({
  category,
}: {
  category: TransactionCategory;
}) {
  const style = categoryStyles[category] ?? categoryStyles.transfer;

  return (
    <div
      className={`flex size-9 shrink-0 items-center justify-center rounded-full ${style.className}`}
    >
      <HugeiconsIcon icon={style.icon} className="size-4.5" />
    </div>
  );
}

const statusStyles: Record<string, string> = {
  Successful:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  Pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  Failed: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
  Reversed: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

export function TransactionStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        statusStyles[status] ?? statusStyles.Pending
      }`}
    >
      {status}
    </span>
  );
}
