

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
  CableTV = "cable_tv",
  Electricity = "electricity",
  Commission = "commission",
  Transfer = "transfer",
  WalletFunding = "wallet_funding",
}

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
  Suspended = "suspended",
  Pending = "pending",
}

export enum UserRole {
  User = "user",
  Admin = "admin",
  SuperAdmin = "super_admin",
}

export enum WalletStatus {
  Active = "active",
  Frozen = "frozen",
  Suspended = "suspended",
  Closed = "closed",
}
