"use client";

import { useMemo } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

interface LocationMapProps extends React.HTMLAttributes<HTMLDivElement> {
  latitude: number;
  longitude: number;
}

const mapSize = { width: "100%", maxWidth: "600px", height: "400px" };

export function LocationMap({
  className,
  latitude,
  longitude,
}: LocationMapProps) {
  const mapCenter = useMemo(
    () => ({ lat: latitude, lng: longitude }),
    [latitude, longitude],
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
  });
  const handleMarkerClick = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    );
  };

  return (
    <div className={cn(className)}>
      {isLoaded ? (
        <GoogleMap
          center={mapCenter}
          zoom={13}
          mapContainerStyle={mapSize}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
        >
          <MarkerF onClick={handleMarkerClick} position={mapCenter} />
        </GoogleMap>
      ) : (
        <Skeleton style={mapSize} />
      )}
    </div>
  );
}
