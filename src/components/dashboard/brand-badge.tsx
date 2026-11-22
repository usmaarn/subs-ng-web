import { cn } from "cn"

export function BrandBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold", className)}>
      {label}
    </span>
  )
}
