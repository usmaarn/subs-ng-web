import { TransactionCategory, TransactionStatus, TransactionType, UserRole, UserStatus, WalletStatus } from "./constants";

export type User = {
  id: string;
  name: string;
  email: string;
  email_verified: boolean;
  status: UserStatus;
  role: UserRole;
  created_at: string;
  wallet: Wallet;
};

export type Wallet = {
  id: string;
  user_id: string;
  balance: number;
  commission: number;
  status: WalletStatus;
}

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  category: "wallet" | "service" | "system";
  unread: boolean;
};

export type Transaction = {
  id: string;
  description: string;
  reference: string;
  date: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  category: TransactionCategory;
};

export type DashboardStats = {
  wallet: Wallet;
  credits: number;
  debits: number;
  services: {
    airtime: number;
    dataplan: number;
    examCards: number;
    cableTV: number;
  };
  transactions: Transaction[];
};