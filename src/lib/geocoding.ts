"use server";

export interface GeocodingResult {
  latitude: number;
  longitude: number;
  displayName: string;
}

export async function geocodeAddress(
  address: string,
  city: string,
  postalCode: string
): Promise<GeocodingResult | null> {
  const fullAddress = `${address}, ${postalCode} ${city}, France`;
  const encodedAddress = encodeURIComponent(fullAddress);
  
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`,
      {
        headers: {
          "User-Agent": "JamConnect/1.0 (contact@jamconnect.app)",
        },
      }
    );

    if (!response.ok) {
      console.error("Geocoding API error:", response.statusText);
      return null;
    }

    const data = await response.json();

    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
        displayName: data[0].display_name,
      };
    }

    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}
