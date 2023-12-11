"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { calculationSchema } from "@/lib/validationSchema";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const DeleteCalcDialog = ({ calculationId }: { calculationId: number }) => {
  const [dialogForm, setDialogForm] = useState(false);
  const form = useForm<z.infer<typeof calculationSchema>>({
    resolver: zodResolver(calculationSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(event: React.FormEvent) {
    try {
      await fetch("/api/calc", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ calculationId }),
      });

      toast({
        title: "Deleted",
      });

      router.push("/");
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
      <Dialog open={dialogForm} onOpenChange={(open) => setDialogForm(open)}>
        <DialogTrigger asChild>
          <button className="text-red-600">x</button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete a calculation #{calculationId}</DialogTitle>
          </DialogHeader>
          <Button onClick={(event) => onSubmit(event)} type="submit">
            Delete
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteCalcDialog;
