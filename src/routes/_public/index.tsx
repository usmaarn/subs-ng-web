import QuickService from '@/components/QuickService';
import { ButtonLink } from '@/components/ui/link';
import { ArrowRight01Icon, ArrowUpRight01Icon, BoltIcon, BulbIcon, Call02Icon, GraduationScrollIcon, HeadsetIcon, MagicWand01Icon, Shield01Icon, Tag01Icon, Tick02Icon, Tv01Icon, Wallet01Icon, Wifi01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/')({
    component: RouteComponent,
})



const stats = [
    { value: "10k+", label: "Happy customers" },
    { value: "99.9%", label: "Service uptime" },
    { value: "24/7", label: "Human support" },
];

const services = [
    {
        icon: Call02Icon,
        title: "Airtime top-up",
        text: "Instant top-ups for MTN, Airtel, Glo and 9mobile at the best rates.",
        tone: "bg-primary/10 text-primary",
    },
    {
        icon: Wifi01Icon,
        title: "Data bundles",
        text: "Affordable daily, weekly and monthly plans for every network.",
        tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    {
        icon: BulbIcon,
        title: "Electricity",
        text: "Pay prepaid and postpaid meters for every disco in Nigeria.",
        tone: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
        icon: Tv01Icon,
        title: "Cable TV",
        text: "Renew DStv, GOtv and StarTimes subscriptions in a few taps.",
        tone: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
    {
        icon: GraduationScrollIcon,
        title: "Exam pins",
        text: "Get WAEC, NECO and JAMB registration pins without the stress.",
        tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
        icon: Wallet01Icon,
        title: "Wallet funding",
        text: "Fund your wallet once, then pay for everything even faster.",
        tone: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
];

const features = [
    {
        icon: BoltIcon,
        title: "Instant delivery",
        text: "Airtime, data and bills are delivered in seconds, not minutes.",
    },
    {
        icon: Shield01Icon,
        title: "Secure by default",
        text: "Bank-grade encryption protects every wallet and transaction.",
    },
    {
        icon: Tag01Icon,
        title: "Best rates",
        text: "Affordable bundles with zero hidden fees or surprise charges.",
    },
    {
        icon: HeadsetIcon,
        title: "Real support",
        text: "A friendly team is available whenever you need a hand.",
    },
];

const steps = [
    {
        title: "Create your account",
        text: "Sign up with your phone number in under a minute.",
    },
    {
        title: "Fund your wallet",
        text: "Top up with a bank transfer or your debit card.",
    },
    {
        title: "Pay in seconds",
        text: "Pick a service, confirm the details and you are done.",
    },
];

const avatars = [
    { initials: "AK", bg: "#2563EB" },
    { initials: "TO", bg: "#0F766E" },
    { initials: "NB", bg: "#7C3AED" },
    { initials: "IJ", bg: "#B45309" },
];

const benefits = ["No paperwork", "No hidden fees", "Cancel anytime"];

function RouteComponent() {
    return (
        <main>
            {/* Hero */}
            <section className="relative isolate overflow-hidden">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="hero-grid absolute inset-0" />
                    <div className="absolute -left-32 -top-40 size-120 rounded-full bg-primary/15 blur-3xl" />
                    <div className="absolute -right-32 top-24 size-104 rounded-full bg-secondary/10 blur-3xl" />
                </div>

                <div className="container grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
                    <div className="max-w-xl">
                        <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            <HugeiconsIcon icon={MagicWand01Icon} size={14} />
                            Nigeria’s all-in-one VTU platform
                        </span>

                        <h1 className="h1 animate-fade-up animate-fade-up-1 mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
                            A simpler way to pay{" "}
                            <span className="text-gradient-brand">every bill.</span>
                        </h1>

                        <p className="animate-fade-up animate-fade-up-2 mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                            Buy airtime, get data, pay electricity and renew your TV
                            subscription — all in one place, at the best rates in Nigeria.
                        </p>

                        <div className="animate-fade-up animate-fade-up-3 mt-8 flex flex-col gap-3 sm:flex-row">
                            <ButtonLink size="lg" to="/register" >
                                Create free account <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
                            </ButtonLink>
                            <ButtonLink size="lg" variant="secondary" to="/login">
                                Sign in
                            </ButtonLink>
                        </div>

                        <div className="animate-fade-up animate-fade-up-3 mt-8 flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {avatars.map((avatar) => (
                                    <span
                                        key={avatar.initials}
                                        className="grid size-8 place-items-center rounded-full border-2 border-background text-[10px] font-semibold text-white"
                                        style={{ backgroundColor: avatar.bg }}
                                    >
                                        {avatar.initials}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <span className="font-semibold text-foreground">10,000+</span>{" "}
                                Nigerians trust Subs.NG
                            </p>
                        </div>
                    </div>

                    <div className="animate-fade-up animate-fade-up-2 w-full">
                        <QuickService />
                    </div>
                </div>
            </section>

            {/* Trust statistics */}
            <section className="border-y bg-muted/40">
                <div className="container grid grid-cols-3 divide-x py-7">
                    {stats.map((stat) => (
                        <div key={stat.label} className="px-3 text-center sm:px-6">
                            <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                                {stat.value}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section id="services" className="container scroll-mt-24 py-20 sm:py-24">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            What you can do
                        </p>
                        <h2 className="h2 mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                            Everything you need. One wallet.
                        </h2>
                        <p className="mt-3 text-muted-foreground">
                            From everyday airtime to monthly bills, Subs.NG keeps every
                            payment in one simple place.
                        </p>
                    </div>
                    <ButtonLink
                        variant="secondary"
                        className="self-start sm:self-auto"
                        to="/register"
                    >
                        Get started <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
                    </ButtonLink>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => {
                        const ServiceIcon = service.icon;

                        return (
                            <Link
                                key={service.title}
                                to="/login"
                                className="group rounded-2xl border bg-card p-6 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                            >
                                <span
                                    className={`grid size-11 place-items-center rounded-xl ${service.tone}`}
                                >
                                    <HugeiconsIcon icon={ServiceIcon} size={20} />
                                </span>
                                <div className="mt-4 flex items-center justify-between gap-2">
                                    <h3 className="font-semibold">{service.title}</h3>
                                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} className="text-primary opacity-0 transition group-hover:opacity-100" />
                                </div>
                                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                    {service.text}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Features */}
            <section id="features" className="container scroll-mt-24 pb-20 sm:pb-24">
                <div className="relative overflow-hidden rounded-3xl border bg-muted/50 p-6 sm:p-10 lg:p-14">
                    <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="relative">
                        <div className="max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                                Why Subs.NG
                            </p>
                            <h2 className="h2 mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                                Built for speed, priced for everyone.
                            </h2>
                            <p className="mt-3 text-muted-foreground">
                                No queues, no paperwork, no hidden charges. Just quick
                                payments that work the first time.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature) => {
                                const FeatureIcon = feature.icon;

                                return (
                                    <div key={feature.title}>
                                        <span className="grid size-10 place-items-center rounded-xl bg-card text-primary shadow-sm">
                                            <HugeiconsIcon icon={FeatureIcon} size={20} />
                                        </span>
                                        <h3 className="mt-4 font-semibold">{feature.title}</h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                            {feature.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section
                id="how-it-works"
                className="container scroll-mt-24 pb-20 sm:pb-24"
            >
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            How it works
                        </p>
                        <h2 className="h2 mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                            Up and running in minutes.
                        </h2>
                        <p className="mt-3 max-w-md text-muted-foreground">
                            Getting started is simple. Create an account, add money to your
                            wallet, and pay for anything you need.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {benefits.map((benefit) => (
                                <span
                                    key={benefit}
                                    className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
                                >
                                    <HugeiconsIcon icon={Tick02Icon} size={14} className="text-emerald-600" />
                                    {benefit}
                                </span>
                            ))}
                        </div>
                    </div>

                    <ol className="space-y-3">
                        {steps.map((step, index) => (
                            <li
                                key={step.title}
                                className="flex gap-4 rounded-2xl border bg-card p-5 transition hover:border-primary/40"
                            >
                                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                                    {index + 1}
                                </span>
                                <div>
                                    <h3 className="font-semibold">{step.title}</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                        {step.text}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Call to action */}
            <section className="container pb-20 sm:pb-28">
                <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12">
                    <div className="cta-grid pointer-events-none absolute inset-0 opacity-60" />
                    <div className="pointer-events-none absolute -left-1/2 -top-24 size-72 -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
                    <div className="relative mx-auto max-w-2xl text-center">
                        <h2 className="h2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                            Ready to make bill payments effortless?
                        </h2>
                        <p className="mx-auto mt-3 max-w-lg text-primary-foreground/80">
                            Join thousands of Nigerians who top up, renew and pay in seconds
                            with Subs.NG.
                        </p>
                        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                            <ButtonLink
                                size="lg"
                                className="bg-background text-foreground hover:bg-background/90"
                                to="/register"
                            >
                                Create free account <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
                            </ButtonLink>
                            <ButtonLink
                                size="lg"
                                variant="outline"
                                className="border-white/25 bg-white/10 text-primary-foreground backdrop-blur hover:bg-white/20 hover:text-primary-foreground"
                                to="/login"
                            >
                                Sign in
                            </ButtonLink>
                        </div>
                        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-primary-foreground/70">
                            <HugeiconsIcon icon={Shield01Icon} size={14} />
                            Safe, secure and always available
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}