import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface SpeakerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  photo?: string;
  slug: string;
}

export function SpeakerCard({
  name,
  photo,
  slug,
  className,
}: SpeakerCardProps) {
  const speakerPhoto = photo || "/images/placeholder-speaker.webp";
  const speakerUrl = `/prowadzacy/${slug}`;

  return (
    <div className={cn(className)}>
      <Link href={speakerUrl} className="group">
        <div className="rounded-full overflow-hidden">
          <Image
            alt={`${name} - zdjęcie`}
            src={speakerPhoto}
            height={150}
            width={150}
            className="group-hover:scale-125 group-hover:brightness-75 duration-300 transition-all"
          />
        </div>
        <h4 className="text-center mt-2 font-medium group-hover:text-primary dark:group-hover:text-secondary transition-all">
          {name}
        </h4>
      </Link>
    </div>
  );
}
