import { Brand } from '@/components/Brand';
import { SparklesIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
    component: RouteComponent,
})

function RouteComponent() {
    const benefits = [
        "Instant airtime, data and bill payments",
        "Bank-grade security on every transaction",
        "Real support whenever you need a hand",
    ];

    const stats = [
        { value: "10k+", label: "Customers" },
        { value: "99.9%", label: "Uptime" },
        { value: "24/7", label: "Support" },
    ];

    const year = new Date().getFullYear();

    return (
        <div className="md:grid min-h-dvh bg-background text-foreground grid-cols-2">
            <aside className="hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between xl:p-14">
                <div className="relative">
                    <div className="mt-16 max-w-md xl:mt-20">
                        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">
                            <HugeiconsIcon icon={SparklesIcon} size={14} />
                            Simple. Fast. Reliable.
                        </p>
                        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight xl:text-5xl">
                            Every bill. One simple platform.
                        </h1>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/80">
                            Airtime, data, electricity and cable TV — handled in seconds,
                            from wherever you are.
                        </p>
                    </div>
                </div>
            </aside>

            <div className="flex min-h-screen flex-col">
                <main className="flex flex-col flex-1 gap-8 items-center justify-center px-5 pb-8 sm:px-8">
                    <Brand />
                    <div className="max-w-120 w-full">
                        <Outlet />
                    </div>
                </main>

                <footer className="px-5 pb-6 text-center text-xs text-muted-foreground sm:px-8">
                    &copy; {year} Subs.NG. Need help?{" "}
                    <a
                        href="mailto:support@subs.ng"
                        className="font-medium text-foreground transition hover:text-primary"
                    >
                        support@subs.ng
                    </a>
                </footer>
            </div>
        </div>
    )
}
