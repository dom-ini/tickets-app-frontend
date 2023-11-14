import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  totalItemsCount: number;
  pageSize: number;
}

function getSkipValue(rawSkip: string | null) {
  const skip = Number(rawSkip) || 0;
  return Math.max(skip, 0);
}

export function Pagination({
  className,
  totalItemsCount,
  pageSize,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const skip = getSkipValue(searchParams.get("skip"));
  const pageCount = Math.ceil(totalItemsCount / pageSize);
  const maxSkip = pageCount * pageSize;
  const currentPage = skip / pageSize + 1;

  function handleSetSkip(newSkip: number) {
    const params = new URLSearchParams(searchParams);
    params.set("skip", newSkip.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      className={cn(
        "flex flex-wrap gap-y-4 items-center justify-center sm:justify-end",
        className,
      )}
    >
      <span className="text-muted-foreground basis-full sm:basis-auto text-center order-1 sm:order-none sm:mr-4">
        Strona {currentPage}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleSetSkip(0)}
        disabled={currentPage <= 1}
      >
        <ChevronFirst size="1.25rem" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleSetSkip(skip - pageSize)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft size="1.25rem" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleSetSkip(skip + pageSize)}
        disabled={currentPage >= pageCount}
      >
        <ChevronRight size="1.25rem" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleSetSkip(maxSkip)}
        disabled={currentPage >= pageCount}
      >
        <ChevronLast size="1.25rem" />
      </Button>
    </div>
  );
}
