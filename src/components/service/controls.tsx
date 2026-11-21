import { cn } from "#/lib/utils";
import type { ReactNode } from "react";

export function ChoiceButton({
  selected,
  onSelect,
  children,
  className,
}: {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "rounded-xl border p-3 text-sm font-medium transition",
        selected
          ? "border-accent bg-accent-soft text-accent"
          : "border-border hover:border-accent/40",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function PresetButtons({
  values,
  current,
  onSelect,
  format,
}: {
  values: number[];
  current: number;
  onSelect: (value: number) => void;
  format: (value: number) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onSelect(value)}
          className={cn(
            "rounded-lg border px-2.5 py-1 text-xs font-medium transition",
            current === value
              ? "border-accent bg-accent-soft text-accent"
              : "border-border text-muted hover:border-accent/40",
          )}
        >
          {format(value)}
        </button>
      ))}
    </div>
  );
}

export function Summary({ rows }: { rows: { label: string; value: ReactNode }[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-secondary p-4 text-sm">
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={cn(
            "flex items-center justify-between gap-4",
            index > 0 && "mt-2",
          )}
        >
          <span className="text-muted">{row.label}</span>
          <span className="font-semibold">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
