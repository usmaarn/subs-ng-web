import type { ReactNode } from "react"
import { cn } from "cn"

type Option = {
  value: string
  label: ReactNode
  description?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
}

export function SelectionGrid({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: Option[]
  value: string
  onChange: (value: string) => void
  columns?: 2 | 3 | 4
}) {
  const cols = columns === 4 ? "sm:grid-cols-4" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
  return (
    <div className={cn("grid grid-cols-2 gap-2 sm:gap-3", cols)}>
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-3 text-left transition outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
              active ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-muted-foreground/30 hover:bg-muted/30"
            )}
          >
            {option.leading}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{option.label}</div>
              {option.description && <div className="truncate text-xs text-muted-foreground">{option.description}</div>}
            </div>
            {option.trailing}
          </button>
        )
      })}
    </div>
  )
}
