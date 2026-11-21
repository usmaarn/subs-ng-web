import {
  ArrowRight01Icon,
  BoltIcon,
  BulbIcon,
  Cards01Icon,
  LockKeyIcon,
  SmartphoneIcon,
  Tv01Icon,
  Wifi01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ServiceId = "airtime" | "data" | "electricity" | "cable";

type Plan = {
  id: string;
  label: string;
  price: number;
};

type Provider = {
  id: string;
  name: string;
  short: string;
  bg: string;
  fg: string;
  plans?: Plan[];
};

type ServiceTab = {
  id: ServiceId;
  label: string;
  icon: typeof PhoneIcon;
};

const PhoneIcon = SmartphoneIcon;

const tabs: ServiceTab[] = [
  { id: "airtime", label: "Airtime", icon: SmartphoneIcon },
  { id: "data", label: "Data", icon: Wifi01Icon },
  { id: "electricity", label: "Power", icon: BulbIcon },
  { id: "cable", label: "Cable TV", icon: Tv01Icon },
];

const networks: Provider[] = [
  { id: "mtn", name: "MTN", short: "MTN", bg: "#FFCC00", fg: "#111111" },
  { id: "airtel", name: "Airtel", short: "AIR", bg: "#E40000", fg: "#FFFFFF" },
  { id: "glo", name: "Glo", short: "GLO", bg: "#00A651", fg: "#FFFFFF" },
  { id: "9mobile", name: "9mobile", short: "9M", bg: "#006F51", fg: "#FFFFFF" },
];

const discos: Provider[] = [
  { id: "ikeja", name: "Ikeja Electric", short: "IK", bg: "#E11D48", fg: "#FFFFFF" },
  { id: "eko", name: "Eko Electric", short: "EK", bg: "#0369A1", fg: "#FFFFFF" },
  { id: "abuja", name: "Abuja Electric", short: "AB", bg: "#7C3AED", fg: "#FFFFFF" },
  { id: "kano", name: "Kano Electric", short: "KN", bg: "#15803D", fg: "#FFFFFF" },
  { id: "enugu", name: "Enugu Electric", short: "EN", bg: "#B45309", fg: "#FFFFFF" },
  { id: "ph", name: "Port Harcourt", short: "PH", bg: "#0F766E", fg: "#FFFFFF" },
];

const cableProviders: Provider[] = [
  {
    id: "dstv",
    name: "DStv",
    short: "DStv",
    bg: "#0B57D0",
    fg: "#FFFFFF",
    plans: [
      { id: "dstv-padi", label: "Padi", price: 4400 },
      { id: "dstv-yanga", label: "Yanga", price: 6000 },
      { id: "dstv-confam", label: "Confam", price: 11000 },
      { id: "dstv-compact", label: "Compact", price: 19000 },
    ],
  },
  {
    id: "gotv",
    name: "GOtv",
    short: "GOtv",
    bg: "#00A651",
    fg: "#FFFFFF",
    plans: [
      { id: "gotv-smallie", label: "Smallie", price: 1900 },
      { id: "gotv-jinja", label: "Jinja", price: 3900 },
      { id: "gotv-jolli", label: "Jolli", price: 5700 },
      { id: "gotv-max", label: "Max", price: 8500 },
    ],
  },
  {
    id: "startimes",
    name: "StarTimes",
    short: "ST",
    bg: "#F58220",
    fg: "#FFFFFF",
    plans: [
      { id: "st-nova", label: "Nova", price: 1900 },
      { id: "st-basic", label: "Basic", price: 3700 },
      { id: "st-smart", label: "Smart", price: 4900 },
      { id: "st-classic", label: "Classic", price: 5500 },
    ],
  },
];

const dataPlans: Plan[] = [
  { id: "data-500mb", label: "500 MB", price: 350 },
  { id: "data-1gb", label: "1 GB", price: 700 },
  { id: "data-2gb", label: "2 GB", price: 1400 },
  { id: "data-5gb", label: "5 GB", price: 3500 },
  { id: "data-10gb", label: "10 GB", price: 6000 },
  { id: "data-20gb", label: "20 GB", price: 11000 },
];

const services: Record<ServiceId, Provider[]> = {
  airtime: networks,
  data: networks,
  electricity: discos,
  cable: cableProviders,
};

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

type DetailConfig = {
  label: string;
  placeholder: string;
  icon: typeof SmartphoneIcon;
  type: "tel" | "text";
};

export function QuickService() {
  const navigate = useNavigate();

  const [service, setService] = useState<ServiceId>("airtime");
  const [providerId, setProviderId] = useState("mtn");
  const [identifier, setIdentifier] = useState("");
  const [amount, setAmount] = useState(1000);
  const [planId, setPlanId] = useState("data-1gb");

  const providers = services[service];
  const provider =
    providers.find((item) => item.id === providerId) ?? providers[0];

  const plans = useMemo(
    () => (service === "data" ? dataPlans : (provider.plans ?? [])),
    [service, provider],
  );

  const selectedPlan =
    plans.find((plan) => plan.id === planId) ?? plans[0];

  const amountToPay = selectedPlan ? selectedPlan.price : amount;

  const providerLabel =
    service === "electricity"
      ? "Distribution company"
      : service === "cable"
        ? "TV provider"
        : "Network";

  const detail: DetailConfig =
    service === "airtime" || service === "data"
      ? {
        label: "Phone number",
        placeholder: "0803 123 4567",
        icon: SmartphoneIcon,
        type: "tel",
      }
      : service === "electricity"
        ? {
          label: "Meter number",
          placeholder: "0123456789",
          icon: BulbIcon,
          type: "text",
        }
        : {
          label: "Smartcard / IUC number",
          placeholder: "1234567890",
          icon: Cards01Icon,
          type: "text",
        };

  const amountPresets =
    service === "electricity"
      ? [1000, 2500, 5000, 10000]
      : [200, 500, 1000, 2000, 5000];

  function selectService(id: ServiceId) {
    setService(id);
    setProviderId(services[id][0].id);
    setIdentifier("");
    setPlanId(
      id === "data"
        ? dataPlans[0].id
        : (services[id][0].plans?.[0]?.id ?? ""),
    );
  }

  function selectProvider(item: Provider) {
    setProviderId(item.id);

    if (service === "cable") {
      setPlanId(item.plans?.[0]?.id ?? "");
    }
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void navigate({ to: "/login" });
  }

  return (
    <section className="relative rounded-3xl border bg-card p-4 shadow-2xl shadow-primary/10 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight">
              Quick service
            </h2>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              Instant
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Top up, renew and pay in seconds.
          </p>
        </div>
        <span className="hidden size-10 place-items-center rounded-xl bg-primary/10 text-primary sm:grid">
          <HugeiconsIcon icon={BoltIcon} size={20} />
        </span>
      </div>

      <Tabs
        value={service}
        onValueChange={(value) => selectService(value as ServiceId)}
        className="mt-5 block"
      >
        <TabsList className="grid grid-cols-4 gap-1 rounded-xl bg-muted p-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center justify-center gap-1 rounded-lg px-1 py-2 text-[10px] font-medium transition data-selected:bg-background data-selected:text-foreground data-selected:shadow-sm sm:gap-1.5 sm:px-2 sm:text-sm"
            >
              <HugeiconsIcon
                icon={tab.icon}
                size={16}
                className="hidden sm:block"
              />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={service} className="pt-4">
          <form className="flex flex-col gap-4" onSubmit={submit}>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                {providerLabel}
              </p>
              <div
                className={`grid gap-1.5 sm:gap-2 ${service === "airtime" || service === "data"
                  ? "grid-cols-4"
                  : "grid-cols-3"
                  }`}
              >
                {providers.map((item) => {
                  const isSelected = provider.id === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectProvider(item)}
                      aria-pressed={isSelected}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-2 transition sm:p-2.5 ${isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "bg-card hover:border-muted-foreground/40"
                        }`}
                    >
                      <span
                        className="grid size-8 place-items-center rounded-lg text-[10px] font-bold sm:size-9 sm:text-[11px]"
                        style={{ backgroundColor: item.bg, color: item.fg }}
                      >
                        {item.short}
                      </span>
                      <span className="w-full truncate text-center text-[11px] font-medium">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="quick-identifier"
                className="text-xs font-medium text-muted-foreground"
              >
                {detail.label}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-muted-foreground">
                  <HugeiconsIcon icon={detail.icon} size={16} />
                </span>
                <Input
                  id="quick-identifier"
                  className="pl-11"
                  type={detail.type}
                  inputMode="numeric"
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder={detail.placeholder}
                  autoComplete={
                    service === "airtime" || service === "data" ? "tel" : "off"
                  }
                />
              </div>
            </div>

            {service === "data" || service === "cable" ? (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  {service === "data" ? "Choose a data plan" : "Choose a package"}
                </p>
                <div className="grid max-h-44 grid-cols-2 gap-2 overflow-y-auto pr-0.5">
                  {plans.map((plan) => {
                    const isSelected = planId === plan.id;

                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setPlanId(plan.id)}
                        aria-pressed={isSelected}
                        className={`rounded-xl border px-3 py-2 text-left transition ${isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "hover:border-muted-foreground/40"
                          }`}
                      >
                        <span className="block text-sm font-semibold">
                          {plan.label}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {naira.format(plan.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label
                  htmlFor="quick-amount"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Amount
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-medium text-muted-foreground">
                    NGN
                  </span>
                  <Input
                    id="quick-amount"
                    className="pl-14 text-base font-semibold"
                    type="number"
                    min={100}
                    max={50000}
                    step={50}
                    value={amount}
                    onChange={(event) =>
                      setAmount(Number(event.target.value))
                    }
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {amountPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition ${amount === preset
                        ? "border-primary bg-primary/10 text-primary"
                        : "text-muted-foreground hover:border-muted-foreground/40"
                        }`}
                    >
                      {naira.format(preset)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between rounded-xl bg-muted px-3.5 py-2.5">
              <span className="text-sm text-muted-foreground">You pay</span>
              <span className="font-semibold tracking-tight">
                {naira.format(amountToPay)}
              </span>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={identifier.trim().length < 7}
            >
              Continue
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                className="ml-2"
              />
            </Button>

            <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <HugeiconsIcon icon={LockKeyIcon} size={12} />
              Secure checkout · Instant delivery
            </p>
          </form>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default QuickService;
