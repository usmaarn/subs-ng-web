import { SubmitButton } from "@/components/form/form-field";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { formatNaira, formatNumberInput, numericAmount } from "@/lib/format";
import { useMutation } from "@tanstack/react-query";
import { cn } from "cn";
import { useState } from "react";

export default function FundWalletPage() {
    const [amount, setAmount] = useState("1000");
    const [step, setStep] = useState<"amount" | "transfer">("amount");

    const { data, mutate, isPending, reset } = useMutation({
        mutationFn: async () => {
            await new Promise(r => setTimeout(r, 2000))
            return {
                amount: numericAmount(amount),
                accountName: "Dev Usman",
                bankName: "Test Bank",
                accountNumber: "00234567"
            }
        }
    })

    return (
        <DashboardLayout
            title="Fund wallet"
            description="Add money to your wallet to pay for airtime, data, bills and more."
        >
            <div className="mx-auto w-full max-w-xl py-6">
                {step == "amount" || !data ? (
                    <div className="card">
                        <div>
                            <CardTitle>Fund Wallet</CardTitle>
                            <CardDescription>Choose how much you want to add to your wallet.</CardDescription>
                        </div>
                        <div className="space-y-4">
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
                        </div>
                        <CardFooter>
                            <SubmitButton onClick={mutate as any} size="lg" loading={isPending}>
                                Fund Wallet
                            </SubmitButton>
                        </CardFooter>
                    </div>
                ) : (
                    <Card className="w-full max-w-xl">
                        <CardContent className="space-y-4 p-5">
                            <CardHeader>
                                <CardTitle>Bank transfer</CardTitle>
                                <CardDescription>Transfer money to the account below to fund your wallet.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="">
                                    <p>Amount</p>
                                    <p>{formatNaira(data.amount)}</p>
                                </div>
                                <div className="">
                                    <p>Account Name</p>
                                    <p>{data.accountName}</p>
                                </div>
                                <div className="">
                                    <p>Account Number</p>
                                    <p>{data.accountNumber}</p>
                                </div>
                                <div className="">
                                    <p>BankName</p>
                                    <p>{data.bankName}</p>
                                </div>
                            </CardContent>

                            <CardFooter>
                                <SubmitButton size="lg" className="w-full">
                                    I have made the payment
                                </SubmitButton>
                                <Button variant="secondary" className="w-full">Cancel</Button>
                            </CardFooter>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
}
