import { Brand } from '@/components/Brand';
import { ButtonLink } from '@/components/ui/link';
import { Facebook01Icon, InstagramIcon, Linkedin01Icon, MapPinIcon, NewTwitterIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/_public')({
    component: RouteComponent,
})

const footerLinks = [
    {
        title: "Product",
        links: [
            { label: "Airtime & data", href: "#services" },
            { label: "Electricity", href: "#services" },
            { label: "Cable TV", href: "#services" },
            { label: "Exam pins", href: "#services" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "Why Subs.NG", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Contact us", href: "mailto:support@subs.ng" },
        ],
    },
];

const socials = [
    { label: "X", href: "https://x.com", icon: NewTwitterIcon },
    { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin01Icon },
    { label: "Facebook", href: "https://facebook.com", icon: Facebook01Icon },
];

function RouteComponent() {
    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <div className="flex min-h-dvh flex-col bg-background text-foreground">
            <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
                <nav
                    className="container flex h-16 items-center gap-6"
                    aria-label="Main navigation"
                >
                    <Brand />

                    <div className="hidden items-center gap-1 md:flex">
                        <a
                            href="#services"
                            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                            Services
                        </a>
                        <a
                            href="#features"
                            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                            Why us
                        </a>
                        <a
                            href="#how-it-works"
                            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                            How it works
                        </a>
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                        <ButtonLink size="sm" variant="secondary" to="/login">
                            Login
                        </ButtonLink>
                        <ButtonLink size="sm" to="/register">
                            Get started
                        </ButtonLink>
                    </div>
                </nav>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="border-t bg-muted/50">
                <div className="container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr] lg:py-16">
                    <div className="max-w-sm">
                        <Brand />
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                            One simple platform for airtime, data, electricity, cable TV and
                            more. Built for Nigerians, everywhere.
                        </p>
                        <div className="mt-5 flex items-center gap-2">
                            {socials.map((social) => {
                                const SocialIcon = social.icon;

                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className="grid size-9 place-items-center rounded-lg border text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                                    >
                                        <HugeiconsIcon icon={SocialIcon} size={16} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {footerLinks.map((column) => (
                        <div key={column.title}>
                            <h3 className="text-sm font-semibold">{column.title}</h3>
                            <ul className="mt-4 space-y-2.5">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-muted-foreground transition hover:text-foreground"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t">
                    <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
                        <p>© {year} Subs.NG. All rights reserved.</p>
                        <p className="flex items-center gap-1.5">
                            <HugeiconsIcon icon={MapPinIcon} size={14} />
                            Made for Nigeria, built for everyone.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
