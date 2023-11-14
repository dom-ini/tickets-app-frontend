import { Location } from "@/lib/api/locations/types";

interface LocationApi extends Location {}

export function mapLocationFromApi(location: LocationApi): Location {
  return location;
}
