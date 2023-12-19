"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { costBlockSchema } from "@/lib/validationSchema";
import { useCostBlockStore } from "@/store/zustand";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const CostBlockForm = ({ calculationId }: { calculationId: string }) => {
  const [dialogForm, setDialogForm] = useState(false);
  const form = useForm<z.infer<typeof costBlockSchema>>({
    resolver: zodResolver(costBlockSchema),
    defaultValues: {
      name: "",
      value: 0,
      description: "",
      id: "",
    },
  });

  const addItem = useCostBlockStore((state) => state.add);
  const items = useCostBlockStore((state) => state.items);
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof costBlockSchema>) {
    try {
      const response = await fetch("/api/costblock", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          calculationId: calculationId,
        }),
      });

      if (!response.ok) throw new Error("Something went wrong");

      const costBlock = await response.json();

      // Add to store
      values.id = costBlock.id;

      addItem(values);

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

    // Reset form
    setDialogForm(false);
    form.reset();
  }

  return (
    <>
      {items.length < 2 && (
        <Dialog open={dialogForm} onOpenChange={(open) => setDialogForm(open)}>
          <DialogTrigger asChild>
            <Button variant="outline">Add a cost block</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a cost block</DialogTitle>
              <DialogDescription>
                Add a new cost block to define and customize your calculation
                logic.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
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
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          className="resize-none"
                          cols={10}
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CostBlockForm;