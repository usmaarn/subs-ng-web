import { Link, LinkProps } from "@tanstack/react-router";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";

export function ButtonLink({
    className,
    size = "default",
    variant = "default",
    ...props
}: LinkProps & VariantProps<typeof buttonVariants> & { className?: string; }) {
    return <Link
        {...props}
        className={buttonVariants({ className, size, variant })}
    />
}