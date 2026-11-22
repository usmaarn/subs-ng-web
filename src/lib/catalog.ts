import type { NotificationItem, Transaction } from "@/lib/types";
import { TransactionCategory, TransactionStatus, TransactionType } from "./constants";

export const networks = [
  { id: "mtn", name: "MTN", short: "MTN", background: "bg-yellow-400", foreground: "text-black" },
  { id: "airtel", name: "Airtel", short: "AIR", background: "bg-red-600", foreground: "text-white" },
  { id: "glo", name: "Glo", short: "GLO", background: "bg-green-600", foreground: "text-white" },
  { id: "9mobile", name: "9mobile", short: "9M", background: "bg-emerald-700", foreground: "text-white" },
] as const;

export const dataPlans: Record<string, Array<{ id: string; size: string; validity: string; price: number }>> = {
  mtn: [
    { id: "mtn-500", size: "500MB", validity: "30 days", price: 350 },
    { id: "mtn-1", size: "1GB", validity: "30 days", price: 650 },
    { id: "mtn-2", size: "2GB", validity: "30 days", price: 1250 },
    { id: "mtn-5", size: "5GB", validity: "30 days", price: 3000 },
  ],
  airtel: [
    { id: "airtel-500", size: "500MB", validity: "30 days", price: 350 },
    { id: "airtel-1", size: "1GB", validity: "30 days", price: 700 },
    { id: "airtel-2", size: "2GB", validity: "30 days", price: 1300 },
    { id: "airtel-5", size: "5GB", validity: "30 days", price: 3100 },
  ],
  glo: [
    { id: "glo-1", size: "1.35GB", validity: "14 days", price: 500 },
    { id: "glo-2", size: "2.9GB", validity: "30 days", price: 1000 },
    { id: "glo-5", size: "5.8GB", validity: "30 days", price: 2000 },
  ],
  "9mobile": [
    { id: "9m-500", size: "500MB", validity: "30 days", price: 500 },
    { id: "9m-1", size: "1.5GB", validity: "30 days", price: 1000 },
    { id: "9m-2", size: "2GB", validity: "30 days", price: 1200 },
  ],
};

export const electricityProviders = [
  { id: "ikeja", name: "Ikeja Electric", short: "IKEDC" },
  { id: "eko", name: "Eko Electric", short: "EKEDC" },
  { id: "abuja", name: "Abuja Electric", short: "AEDC" },
  { id: "kano", name: "Kano Electric", short: "KEDCO" },
  { id: "portharcourt", name: "Port Harcourt Electric", short: "PHED" },
  { id: "ibadan", name: "Ibadan Electric", short: "IBEDC" },
];

export const cableProviders = [
  {
    id: "dstv",
    name: "DStv",
    background: "bg-blue-700",
    foreground: "text-white",
    plans: [
      { id: "dstv-padi", name: "Padi", price: 4400 },
      { id: "dstv-yanga", name: "Yanga", price: 6000 },
      { id: "dstv-confam", name: "Confam", price: 11000 },
      { id: "dstv-compact", name: "Compact", price: 19000 },
    ],
  },
  {
    id: "gotv",
    name: "GOtv",
    background: "bg-green-600",
    foreground: "text-white",
    plans: [
      { id: "gotv-smallie", name: "Smallie", price: 1900 },
      { id: "gotv-jinja", name: "Jinja", price: 3900 },
      { id: "gotv-jolli", name: "Jolli", price: 5800 },
      { id: "gotv-max", name: "Max", price: 8500 },
    ],
  },
  {
    id: "startimes",
    name: "StarTimes",
    background: "bg-orange-500",
    foreground: "text-white",
    plans: [
      { id: "st-nova", name: "Nova", price: 2100 },
      { id: "st-basic", name: "Basic", price: 4000 },
      { id: "st-smart", name: "Smart", price: 5100 },
      { id: "st-classic", name: "Classic", price: 6000 },
    ],
  },
];

export const examProviders = [
  { id: "waec", name: "WAEC", description: "Result checker PIN", price: 3800 },
  { id: "neco", name: "NECO", description: "Result checker PIN", price: 1400 },
  { id: "jamb", name: "JAMB", description: "UTME e-PIN", price: 7200 },
  { id: "nabteb", name: "NABTEB", description: "Result checker PIN", price: 950 },
];

export const banks = [
  "Access Bank",
  "GTBank",
  "First Bank",
  "UBA",
  "Zenith Bank",
  "Kuda",
  "OPay",
  "PalmPay",
  "Moniepoint",
];

export const walletAccount = {
  name: "Subs.NG / Usman Muhammad",
  bank: "Moniepoint MFB",
  number: "8123456789",
};

export const transactions: Transaction[] = [
  { id: "t1", description: "MTN Airtime Purchase", reference: "TXN-10021", date: "2026-03-12 10:24", amount: 2000, type: TransactionType.Debit, status: TransactionStatus.Completed, category: TransactionCategory.Airtime },
  { id: "t2", description: "Wallet Funding", reference: "TXN-10020", date: "2026-03-12 09:10", amount: 25000, type: TransactionType.Credit, status: TransactionStatus.Completed, category: TransactionCategory.WalletFunding },
  { id: "t3", description: "Glo Data Bundle", reference: "TXN-10019", date: "2026-03-11 18:02", amount: 1000, type: TransactionType.Debit, status: TransactionStatus.Completed, category: TransactionCategory.Data },
  { id: "t4", description: "DStv Subscription", reference: "TXN-10018", date: "2026-03-11 13:40", amount: 11000, type: TransactionType.Debit, status: TransactionStatus.Pending, category: TransactionCategory.CableTV },
  { id: "t5", description: "Ikeja Electric Payment", reference: "TXN-10017", date: "2026-03-10 16:35", amount: 5000, type: TransactionType.Debit, status: TransactionStatus.Completed, category: TransactionCategory.Electricity },
  { id: "t6", description: "Commission Withdrawal", reference: "TXN-10016", date: "2026-03-10 08:12", amount: 3000, type: TransactionType.Credit, status: TransactionStatus.Completed, category: TransactionCategory.Commission },
];

export type CommissionEntry = {
  id: string;
  source: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending";
};

export const commissionHistory: CommissionEntry[] = [
  { id: "c1", source: "Airtime sales", date: "2026-03-12", amount: 450, status: "Paid" },
  { id: "c2", source: "Data bundle sales", date: "2026-03-11", amount: 1200, status: "Paid" },
  { id: "c3", source: "Cable TV referral", date: "2026-03-10", amount: 800, status: "Pending" },
  { id: "c4", source: "Electricity payment", date: "2026-03-09", amount: 350, status: "Paid" },
];

export const notifications: NotificationItem[] = [
  { id: "n1", title: "Wallet funded", description: "Your wallet was credited with ₦25,000.", time: "2 hours ago", category: "wallet", unread: true },
  { id: "n2", title: "Airtime delivered", description: "MTN airtime purchase of ₦2,000 was successful.", time: "3 hours ago", category: "service", unread: true },
  { id: "n3", title: "Security update", description: "Your password was changed successfully.", time: "Yesterday", category: "system", unread: false },
  { id: "n4", title: "Cable TV pending", description: "Your DStv subscription is being processed.", time: "Yesterday", category: "service", unread: false },
];
