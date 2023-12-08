"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { formSchema } from "@/lib/validationSchema";
import { useState } from "react";

const numericFields = [
  {
    label: "Home Size",
    name: "home_size",
    description: "The size of your home in square meters",
  },
  {
    label: "Current Energy Consumption",
    name: "current_energy_consumption",
    description: "The amount of energy your home consumes per year",
  },
  {
    label: "Energy Price",
    name: "energy_price",
    description: "The price you pay for energy per kWh",
  },
  {
    label: "Upgrade Costs",
    name: "upgrade_costs",
    description: "The cost to implement the upgrade",
  },
  {
    label: "Energy Savings Percentage",
    name: "energy_savings_percentage",
    description: "The percentage of energy saved by the upgrade",
  },
  {
    label: "Incentives",
    name: "incentives",
    description: "Any incentives that you are eligible for",
  },
];

interface Calculation {
  totalCost: number;
  annualSavings: number;
  netCost: number;
  returnOnInvestment: number;
}

function CalculationForm({ userId }: { userId: string }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selected_upgrade: "",
      home_size: 0,
      current_energy_consumption: 0,
      energy_price: 0,
      upgrade_costs: 0,
      energy_savings_percentage: 0,
      incentives: 0,
    },
  });
  const { toast } = useToast();
  const [calculation, setCalculation] = useState<Calculation>();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const response = await fetch("/api/calculation", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          user_id: userId,
        }),
      });

      if (!response.ok) throw new Error("Something went wrong");

      const jsonLogicData: Calculation = await response.json();

      setCalculation(jsonLogicData);

      toast({
        title: "Calculation successful",
        description: "Your calculation was successful.",
      });
    } catch (e) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-96 mx-auto">
          <FormField
            control={form.control}
            name="selected_upgrade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upgrade</FormLabel>
                <FormDescription>
                  A type of energy efficiency upgrade
                </FormDescription>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="insulation">Insulation</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="solar panels">Solar panels</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {numericFields.map((f) => (
            <FormField
              key={f.name}
              control={form.control}
              name={f.name as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{f.label}</FormLabel>
                  <FormDescription>{f.description}</FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {calculation?.netCost && (
        <div className="max-w-md  w-60 flex flex-col h-fit gap-10  mx-auto shadow-sm rounded-md bg-white border p-5">
          <ul>
            <li>
              <h3 className="font-medium text-xl">Total Cost:</h3>
              <p>${calculation.totalCost.toFixed(2)}</p>
            </li>
            <li>
              <h3 className="font-medium text-xl">Annual Savings:</h3>
              <p>${calculation.annualSavings.toFixed(2)}</p>
            </li>
            <li>
              <h3 className="font-medium text-xl">Net Cost:</h3>
              <p>${calculation.netCost.toFixed(2)}</p>
            </li>
            <li>
              <h3 className="font-medium text-xl">Return on Investment:</h3>
              <p>${calculation.returnOnInvestment.toFixed(2)}</p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
export default CalculationForm;
