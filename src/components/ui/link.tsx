import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { cn } from "cn";
import { Link, type LinkProps } from "react-router";

export function ButtonLink({ className, size = "default", variant = "default", ...props }:
    LinkProps & VariantProps<typeof buttonVariants> & { className?: string }
) {
    return <Link {...props} className={cn(buttonVariants({ className, size, variant }))} />
}