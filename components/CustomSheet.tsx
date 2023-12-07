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
        <Button variant="outline">Alle Berechnungen</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Kalkulation auswählen</SheetTitle>
          <SheetDescription>
            Wähle eine Kalkulation aus, um sie zu bearbeiten.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
