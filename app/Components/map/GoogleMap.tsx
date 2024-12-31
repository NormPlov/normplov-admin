"use client";

import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Required libraries for Google Maps
const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = [
  "places",
];

interface GoogleMapComponentProps {
  center: {
    lat: number;
    lng: number;
  };
}

export default function GoogleMapComponent({
  center,
}: GoogleMapComponentProps) {
  console.log("GoogleMapComponent render", center);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
    // Add these options to help debug API issues
    version: "weekly",
    language: "en",
    region: "US",
  });

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      try {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        map.setZoom(11); // Set a specific zoom level
        setMap(map);
      } catch (error) {
        console.error("Error in map onLoad:", error);
      }
    },
    [center]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map) {
      try {
        map.panTo(center);
      } catch (error) {
        console.error("Error updating map center:", error);
      }
    }
  }, [center, map]);

  if (loadError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Google Maps Error</AlertTitle>
        <AlertDescription>
          {loadError.message ||
            "Failed to load Google Maps. Please check your API key configuration and ensure the Maps JavaScript API is enabled in your Google Cloud Console."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!isLoaded) {
    return <Skeleton className="w-full h-[400px] rounded-lg" />;
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeId: "satellite",
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT,
            mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain"],
          },
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}
