import { ArrowUpDown, Check } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { eventSortableFields } from "@/lib/api/events/filters";
import { cn } from "@/lib/utils";

interface SortingDropdownProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function SortingDropdown({ className }: SortingDropdownProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const sortBy = searchParams.get("sortBy") || eventSortableFields[0].apiName;

  function handleSortBy(fieldName: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", fieldName);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(className)}>
        <Button size="icon" variant="ghost" aria-label="Wybierz sortowanie">
          <ArrowUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {eventSortableFields.map((field) => (
          <DropdownMenuItem
            className="cursor-pointer"
            key={field.apiName}
            onClick={() => handleSortBy(field.apiName)}
          >
            {field.apiName === sortBy ? (
              <Check size="1rem" className="me-2" />
            ) : (
              <div className="w-4 me-2"></div>
            )}
            {field.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
