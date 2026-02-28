"use client";

import { useState } from "react";
import Link from "next/link";
import { MusicianProfileData } from "@/lib/types/profile-types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Guitar, User } from "lucide-react";

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
  pro: "Pro",
};

const LEVEL_COLORS: Record<string, string> = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-blue-100 text-blue-800",
  advanced: "bg-orange-100 text-orange-800",
  pro: "bg-purple-100 text-purple-800",
};

interface MusicianCardProps {
  musician: MusicianProfileData & { id: string };
}

export default function MusicianCard({ musician }: MusicianCardProps) {
  const [imageError, setImageError] = useState(false);

  const displayInstruments = musician.instruments.slice(0, 2);
  const remainingInstruments = musician.instruments.length - 2;

  const displayStyles = musician.styles?.slice(0, 2) || [];
  const remainingStyles = (musician.styles?.length || 0) - 2;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        {/* Avatar and Name */}
        <div className="flex items-start gap-3 mb-3">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
            {musician.avatar_url && !imageError ? (
              <img
                src={musician.avatar_url}
                alt={musician.display_name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <User className="h-8 w-8 text-primary/50" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{musician.display_name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{musician.city}</span>
            </div>
            <Badge
              variant="secondary"
              className={`mt-1 text-xs ${LEVEL_COLORS[musician.level]}`}
            >
              {LEVEL_LABELS[musician.level]}
            </Badge>
          </div>
        </div>

        {/* Instruments */}
        <div className="mb-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <Guitar className="h-3 w-3" />
            <span>Instruments</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {displayInstruments.map((inst, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {inst.name}
              </Badge>
            ))}
            {remainingInstruments > 0 && (
              <Badge variant="outline" className="text-xs">
                +{remainingInstruments}
              </Badge>
            )}
          </div>
        </div>

        {/* Styles */}
        {musician.styles && musician.styles.length > 0 && (
          <div className="mb-3">
            <div className="text-xs text-muted-foreground mb-1">Styles</div>
            <div className="flex flex-wrap gap-1">
              {displayStyles.map((style, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {style}
                </Badge>
              ))}
              {remainingStyles > 0 && (
                <Badge variant="secondary" className="text-xs">
                  +{remainingStyles}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <Button asChild className="w-full" size="sm">
          <Link href={`/musicians/${musician.id}`}>Voir le profil</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
