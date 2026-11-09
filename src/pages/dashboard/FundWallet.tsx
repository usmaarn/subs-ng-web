
import { TransferStep } from "@/components/dashboard/fund-wallet/transfer-step";
import { SubmitButton } from "@/components/form/form-field";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { formatNumberInput, numericAmount } from "@/lib/format";
import { cn } from "cn";
import { useState } from "react";

export default function FundWalletPage() {
    const [amount, setAmount] = useState("1000");
    const [step, setStep] = useState<"amount" | "transfer">("amount");

    return (
        <DashboardLayout
            title="Fund wallet"
            description="Add money to your wallet to pay for airtime, data, bills and more."
        >
            <div className="mx-auto w-full max-w-xl py-6">
                {step === "amount" ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Fund Wallet</CardTitle>
                            <CardDescription>Choose how much you want to add to your wallet.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-4 gap-3">
                                {[500, 1000, 2000, 5000, 10000].map(a => (
                                    <button
                                        key={a}
                                        className={cn("border", numericAmount(amount) == a && "border-primary text-primary")}
                                        onClick={() => setAmount(a.toLocaleString("en-NG"))}
                                    >{a.toLocaleString("en-NG")}</button>
                                ))}
                            </div>
                            <Field>
                                <FieldLabel>Amount (NGN)</FieldLabel>
                                <InputGroup>
                                    <InputGroupAddon> NGN </InputGroupAddon>
                                    <InputGroupInput
                                        value={amount}
                                        onChange={(e) => {
                                            const value = e.target.value
                                                .replace(/[^0-9.]/g, "")
                                                .replace(/(\..*)\./g, "$1");

                                            setAmount(formatNumberInput(value))
                                        }}
                                    />
                                </InputGroup>
                            </Field>
                        </CardContent>
                        <CardFooter>
                            <SubmitButton size="lg">
                                Fund Wallet
                            </SubmitButton>
                        </CardFooter>
                    </Card>
                ) : (
                    <TransferStep
                        amount={Number(amount)}
                        onBack={() => setStep("amount")}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}
