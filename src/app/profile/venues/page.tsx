"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserVenues } from "@/lib/actions/auth";
import { VenueProfileData } from "@/lib/types/profile-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, HomeIcon, Edit, Eye } from "lucide-react";

const VENUE_TYPE_LABELS: Record<string, string> = {
  rehearsal_room: "Salle de répétition",
  bar: "Bar / Café-Concert",
  private_space: "Espace privé",
  studio: "Studio d'enregistrement",
};

export default function UserVenuesPage() {
  const [venues, setVenues] = useState<VenueProfileData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const userVenues = await getUserVenues();
        setVenues(userVenues);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
        console.error("Error fetching user venues:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
        <p>Chargement de vos lieux...</p>
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <HomeIcon className="h-6 w-6" />
            Vos Lieux
          </CardTitle>
          <CardDescription>
            Gérez et présentez vos lieux à la communauté JamConnect.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {venues.length === 0 ? (
            <div className="text-center space-y-4">
              <p className="text-lg text-muted-foreground">Vous n&apos;avez pas encore créé de profil de lieu.</p>
              <Button asChild>
                <Link href="/profile/create-venue">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Créer un lieu
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {venues.map((venue) => (
                <Card key={venue.id} className="flex flex-col md:flex-row items-start md:items-center p-4">
                  {venue.photos && venue.photos.length > 0 && (
                    <div className="flex-shrink-0 w-full md:w-32 h-32 rounded-md overflow-hidden mb-4 md:mb-0 md:mr-4">
                      <img
                        src={venue.photos[0]}
                        alt={venue.venue_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-grow space-y-1">
                    <h3 className="text-xl font-semibold">{
                      venue.venue_name
                    }</h3>
                    <p className="text-sm text-muted-foreground">{VENUE_TYPE_LABELS[venue.venue_type] || venue.venue_type}</p>
                    <p className="text-sm">{venue.city}, {venue.postal_code}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{venue.description}</p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/venues/${venue.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href={`/profile/edit-venue/${venue.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
           {venues.length > 0 && (
            <div className="text-center mt-6">
                 <Button asChild>
                <Link href="/profile/create-venue">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter un nouveau lieu
                </Link>
              </Button>
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}