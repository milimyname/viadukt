import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function CustomSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" disabled>
          Calculations soon...
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Kalkulation auswählen</SheetTitle>
          <SheetDescription>
            Find out how much you can save with our calculator.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
