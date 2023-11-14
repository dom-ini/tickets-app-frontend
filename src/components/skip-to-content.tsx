import { cn } from "@/lib/utils";

interface SkipToContentProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export function SkipToContent({ className, href }: SkipToContentProps) {
  return (
    <a
      className={cn(
        "fixed left-1/2 -translate-x-1/2 -translate-y-full focus:translate-y-0 top-0 z-[100] p-2 bg-background rounded-sm transition-all",
        className,
      )}
      tabIndex={0}
      href={href}
    >
      Przejdź do zawartości
    </a>
  );
}
