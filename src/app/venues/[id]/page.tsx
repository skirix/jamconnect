"use client";

import { useEffect, useState } from "react";
import { getVenueProfilePublic } from "@/lib/actions/auth";
import { VenueProfileData } from "@/lib/types/profile-types";
import VenueMap from "@/components/venue-map";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, MapPin, Users, Guitar, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const VENUE_TYPE_LABELS: Record<string, string> = {
  rehearsal_room: "Salle de répétition",
  bar: "Bar / Café-Concert",
  private_space: "Espace privé",
  studio: "Studio d'enregistrement",
};

interface VenuePageProps {
  params: { id: string };
}

export default function VenuePage({ params }: VenuePageProps) {
  const venueId = params.id;
  const [venue, setVenue] = useState<VenueProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const data = await getVenueProfilePublic(venueId);
        if (data) {
          setVenue(data);
        } else {
          setError("Lieu non trouvé.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement du lieu.");
        console.error("Fetch venue error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVenue();
  }, [venueId]);

  const handlePrevPhoto = () => {
    if (venue?.photos) {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === 0 ? venue.photos!.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextPhoto = () => {
    if (venue?.photos) {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === venue.photos!.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2 text-lg">Chargement du lieu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center text-red-500">
        <p>Erreur: {error}</p>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center text-muted-foreground">
        <p>Lieu introuvable.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <HomeIcon className="h-8 w-8" />
            {venue.venue_name}
          </CardTitle>
          <CardDescription>
            {VENUE_TYPE_LABELS[venue.venue_type] || venue.venue_type}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Photo Carousel */}
          {venue.photos && venue.photos.length > 0 && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src={venue.photos[currentPhotoIndex]}
                alt={`Photo ${currentPhotoIndex + 1} of ${venue.venue_name}`}
                className="w-full h-full object-cover"
              />
              {venue.photos.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={handlePrevPhoto}
                    className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-opacity"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextPhoto}
                    className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-opacity"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              )}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {venue.photos.map((_: string, idx: number) => (
                  <span
                    key={idx}
                    className={`block h-2 w-2 rounded-full ${idx === currentPhotoIndex ? 'bg-white' : 'bg-gray-400'}`}
                  ></span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {venue.description && (
            <div>
              <h3 className="text-xl font-semibold mb-2">À propos du lieu</h3>
              <p className="text-muted-foreground">{venue.description}</p>
            </div>
          )}

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold mb-2">Détails</h3>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                {venue.address}, {venue.postal_code} {venue.city}
              </p>
              {venue.capacity && (
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  Capacité: {venue.capacity} personnes
                </p>
              )}
            </div>

            {/* Equipments */}
            {venue.equipments && venue.equipments.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xl font-semibold mb-2">Équipements disponibles</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  {venue.equipments.map((eq: {name: string}, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <Guitar className="h-4 w-4 inline-block" /> {eq.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Map */}
          {venue.latitude && venue.longitude && (
            <div className="space-y-2">
              <h3 className="text-xl font-semibold mb-2">Localisation</h3>
              <VenueMap
                latitude={venue.latitude}
                longitude={venue.longitude}
                venueName={venue.venue_name}
              />
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
