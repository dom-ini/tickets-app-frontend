import { Speaker } from "@/lib/api/speakers/types";

interface SpeakerApi extends Speaker {}

export function mapSpeakerFromApi(speaker: SpeakerApi): Speaker {
  return speaker;
}
