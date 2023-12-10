import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import prisma from "@/prisma/client";
import Link from "next/link";

export async function CustomSheet({ userId }: { userId: string | undefined }) {
  // Get all calculations from the database
  const calculations = await prisma.calculation.findMany({
    where: {
      user_id: userId,
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Show calculations</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Kalkulation auswählen</SheetTitle>
          <SheetDescription>
            Find out how much you can save with our calculator.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          {calculations.length > 0
            ? calculations.map((calculation) => (
                <Link
                  className="text-gray-600 hover:text-gray-600"
                  key={calculation.id}
                  href={`/calculation/${calculation.id}`}>
                  {calculation.name}
                </Link>
              ))
            : "No calculations yet"}
        </div>
      </SheetContent>
    </Sheet>
  );
}
