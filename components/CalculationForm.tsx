"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { calculationSchema } from "@/lib/validationSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";

function CalculationForm({ userId }: { userId: string }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof calculationSchema>>({
    resolver: zodResolver(calculationSchema),
    defaultValues: {
      name: "",
      result: 2,
      type: "",
      selectedOperator: "",
      schema: JSON.stringify({
        A: [],
        B: [],
      }),
      id: "1",
    },
  });

  const { toast } = useToast();
  const [dialogForm, setDialogForm] = useState(false);
  const router = useRouter(); // Use useRouter here

  // 2. Define a submit handler.
  async function onSubmitCalculation(
    values: z.infer<typeof calculationSchema>,
    event: React.FormEvent
  ) {
    event.preventDefault();

    // ✅ This will be type-safe and validated.
    try {
      const response = await fetch("/api/calc", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          user_id: userId,
        }),
      });

      if (!response.ok) throw new Error("Something went wrong");

      const calculation = await response.json();

      // Reset form
      setDialogForm(false);
      form.reset();

      toast({
        title: "Calculation successful",
        description: "Your calculation was successful.",
      });

      router.push(`/calculation/${calculation.calculationId}`);
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
      <Dialog open={dialogForm} onOpenChange={(open) => setDialogForm(open)}>
        <DialogTrigger asChild>
          <Button variant="outline">Add a calculation</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a cost calculation</DialogTitle>
            <DialogDescription>
              Define and customize your calculation logic.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={(event) => onSubmitCalculation(form.getValues(), event)}
              className="space-y-8 w-96 mx-auto">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A + B">A + B</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default CalculationForm;
