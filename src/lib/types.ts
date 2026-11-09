import type { User } from "@/stores/auth";

export enum TransactionType {
  Credit = "credit",
  Debit = "debit",
}

export enum TransactionStatus {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed",
  Reversed = "reversed",
}

export enum TransactionCategory {
  Funding = "funding",
  Airtime = "airtime",
  Data = "data",
  ExamCard = "exam_card",
  RechargeCard = "recharge_card",
  CableTV = "cable-tv",
  Electricity = "electricity",
  Commission = "commission",
  Transfer = "transfer",
}

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  category: "wallet" | "service" | "system";
  unread: boolean;
};


export type DashboardStats = {
  wallet: User["wallet"];
  credits: number;
  debits: number;
  services: {
    airtime: number;
    dataplan: number;
    examCards: number;
    cableTV: number;
  };
  transactions: {
    id: string;
    description: string;
    reference: string;
    date: string;
    amount: number;
    type: TransactionType;
    status: TransactionStatus;
    category: TransactionCategory;
  }[];
};