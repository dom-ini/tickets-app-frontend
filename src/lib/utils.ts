import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toXWwwFormUrlEncoded(dataToEncode: object): string {
  return Object.entries(dataToEncode)
    .map(
      ([key, value]) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(value)
    )
    .join("&");
}
