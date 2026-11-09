import type { dataTableFeatures } from "@/components/data-table"
import { formatCurrency } from "@/lib/format"
import type { ColumnDef } from "@tanstack/react-table"

export interface Transaction {
  id: string
  description: string
  reference: string
  date: string
  amount: number
  type: "credit" | "debit"
  status: string
}

export const recentTransactionsColumns: ColumnDef<typeof dataTableFeatures, Transaction>[] = [
  {
    accessorKey: "description",
    header: "Transaction",
  },
  {
    accessorKey: "reference",
    header: "Transaction",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (row) => new Date(row.getValue() as string).toLocaleString()
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (cell) => formatCurrency(cell.getValue() as number)
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
