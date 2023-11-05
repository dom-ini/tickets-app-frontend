import { SheetContent, SheetHeader } from "@/components/ui/sheet";
import { EventSearch } from "@/components/event-search";

export function SearchDrawer() {
  return (
    <SheetContent side="top">
      <SheetHeader className="font-bold">Szukaj wydarzeń</SheetHeader>
      <EventSearch className="mt-10" />
    </SheetContent>
  );
}
