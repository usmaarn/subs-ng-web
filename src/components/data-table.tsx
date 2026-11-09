"use client"

import {
    useTable,
    type ColumnDef,
    type RowData,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
    columnFilteringFeature,
    columnVisibilityFeature,
    globalFilteringFeature,
    rowPaginationFeature,
    rowSortingFeature,
    createFilteredRowModel,
    createPaginatedRowModel,
    createSortedRowModel,
    tableFeatures,
} from "@tanstack/react-table"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown, ArrowUp, ArrowUpDown } from "@hugeicons/core-free-icons"

export const dataTableFeatures = tableFeatures({
    columnFilteringFeature,
    columnVisibilityFeature,
    globalFilteringFeature,
    rowPaginationFeature,
    rowSortingFeature,

    filteredRowModel: createFilteredRowModel(),
    sortedRowModel: createSortedRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
})

interface DataTableProps<TData extends RowData> {
    columns: ColumnDef<typeof dataTableFeatures, TData>[]
    data: TData[]
    searchPlaceholder?: string
    loading?: boolean
    pageSize?: number
}

export function DataTable<TData extends RowData>({
    columns,
    data,
    searchPlaceholder = "Search...",
    loading = false,
    pageSize = 10,
}: DataTableProps<TData>) {
    const table = useTable({
        features: dataTableFeatures,
        columns,
        data,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize,
            },
        },
    })

    return (
        <div className="space-y-4">
            <Input
                placeholder={searchPlaceholder}
                value={String(table.state.globalFilter ?? "")}
                onChange={(event) =>
                    table.setGlobalFilter(event.target.value)
                }
                className="max-w-sm"
            />

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const sorted = header.column.getIsSorted()

                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className={
                                                        header.column.getCanSort()
                                                            ? "flex cursor-pointer items-center gap-2 select-none"
                                                            : "flex items-center gap-2"
                                                    }
                                                    onClick={
                                                        header.column.getToggleSortingHandler()
                                                    }
                                                >
                                                    <table.FlexRender header={header} />

                                                    {sorted === "asc" ? (
                                                        <HugeiconsIcon icon={ArrowUp} className="size-4" />
                                                    ) : sorted === "desc" ? (
                                                        <HugeiconsIcon icon={ArrowDown} className="size-4" />
                                                    ) : header.column.getCanSort() ? (
                                                        <HugeiconsIcon icon={ArrowUpDown} className="size-4 opacity-50" />
                                                    ) : null}
                                                </div>
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={table.getVisibleLeafColumns().length}
                                    className="h-24 text-center"
                                >
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            <table.FlexRender cell={cell} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={table.getVisibleLeafColumns().length}
                                    className="h-24 text-center"
                                >
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} result(s)
                </p>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        Page {table.state.pagination.pageIndex + 1} of{" "}
                        {Math.max(table.getPageCount(), 1)}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
