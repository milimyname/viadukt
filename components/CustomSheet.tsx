"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon } from "@heroicons/react/outline";
import {
  Icon,
  Button,
  DatePicker,
  NumberInput,
  TextInput,
} from "@tremor/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { buildingSchema } from "@/lib/validationSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

export function CustomSheet({ userId }: { userId: string | undefined }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof buildingSchema>>({
    resolver: zodResolver(buildingSchema),
    defaultValues: {
      name: "",
      upgrade_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      upgraded_energy_consumption: 0.0,
      current_energy_consumption: 0.0,
      current_energy_price: 0.0,
    },
  });

  const [sheetForm, setSheetForm] = useState(false);

  const { toast } = useToast();

  // 2. Define a submit handler.
  async function onSubmit(
    values: z.infer<typeof buildingSchema>,
    event: React.FormEvent
  ) {
    event.preventDefault();

    try {
      const validation = buildingSchema.parse(values);

      // const response = await fetch("/api/calc", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     ...values,
      //     user_id: userId,
      //   }),
      // });

      // if (!response.ok) throw new Error("Something went wrong");

      // const calculation = await response.json();

      console.log(values);

      setSheetForm(false);

      form.reset();
      toast({
        title: "Added successful",
        description: "See your new building in the graph.",
      });
    } catch (e) {
      // Set the error state to display the error message to the user.
      const errors = JSON.parse((e as any).message);

      errors.map((error: any) => {
        form.setError(error.path[0], {
          type: "manual",
          message: error.message,
        });
      });

      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <Sheet open={sheetForm} onOpenChange={(open) => setSheetForm(open)}>
      <SheetTrigger asChild>
        <Button variant="light">
          <Icon
            icon={PlusIcon}
            color="blue"
            variant="solid"
            tooltip="Add a new home"
            size="sm"
          />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Add a new building</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={(event) => onSubmit(form.getValues(), event)}
              className="space-y-8 w-80 mx-auto">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <TextInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="current_energy_consumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Monthly Energy Usage (kWh)</FormLabel>
                    <FormControl>
                      <NumberInput
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
                name="current_energy_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Price per kWh (in $/kWh)</FormLabel>
                    <FormControl>
                      <NumberInput
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
                name="upgrade_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scheduled Upgrade Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        minDate={new Date()}
                        onBlur={field.onBlur}
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="upgraded_energy_consumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post-Upgrade Energy Consumption (kWh)</FormLabel>
                    <FormControl>
                      <NumberInput
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

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
