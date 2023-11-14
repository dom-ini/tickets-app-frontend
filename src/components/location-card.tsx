import { Building2, ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LocationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  city: string;
  slug: string;
  longitude: number;
  latitude: number;
}

export function LocationCard({
  name,
  city,
  slug,
  className,
}: LocationCardProps) {
  const locationUrl = "/lokalizacja/" + slug;
  return (
    <Link href={locationUrl} className={cn("group w-fit block", className)}>
      <div className="flex items-center gap-6 mb-6 p-4 border w-fit group-hover:text-primary dark:group-hover:text-secondary transition-all">
        <Building2 size="1.75rem" />
        <div>
          <h4 className="font-semibold text-lg">{name}</h4>
          <h5 className="text-muted-foreground">{city}</h5>
        </div>
        <ChevronRight className="group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
