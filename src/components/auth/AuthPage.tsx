"use client";

import { Surface } from "@heroui/react";
import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

type AuthPageProps = {
  icon: string;
  badge?: string;
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  children: ReactNode;
};

export function AuthPage({
  icon,
  badge,
  title,
  subtitle,
  footer,
  children,
}: AuthPageProps) {
  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
          <Icon icon={icon} className="size-5" />
        </span>
        {badge && (
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {badge}
          </p>
        )}
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
      </div>

      <Surface className="rounded-3xl p-5 sm:p-6">{children}</Surface>

      {footer && <div className="mt-5">{footer}</div>}
    </div>
  );
}
