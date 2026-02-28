import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Music, Star, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
  pro: "Professionnel",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MusicianProfilePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('musician_profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (!profile) {
    notFound();
  }

  // Fetch upcoming jams for this musician
  const { data: upcomingJams } = await supabase
    .from('jam_sessions')
    .select('*')
    .eq('creator_id', id)
    .eq('status', 'published')
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })
    .limit(5);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-32 h-32">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="text-4xl">
                {profile.display_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{profile.display_name}</h1>
              
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{profile.city} ({profile.postal_code})</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{LEVEL_LABELS[profile.level]}</span>
              </div>

              {profile.bio && (
                <p className="text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Instruments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              Instruments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.instruments?.map((instrument: { name: string; level: string }) => (
                <Badge key={instrument.name} variant="secondary" className="text-sm">
                  {instrument.name}
                  <span className="ml-1 text-muted-foreground">
                    ({LEVEL_LABELS[instrument.level]})
                  </span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Styles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              Styles musicaux
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.styles?.map((style: string) => (
                <Badge key={style} variant="outline" className="text-sm">
                  {style}
                </Badge>
              ))}
            </div>
            {(!profile.styles || profile.styles.length === 0) && (
              <p className="text-muted-foreground text-sm">Aucun style spécifié</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Jams */}
      {upcomingJams && upcomingJams.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Sessions à venir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingJams.map((jam) => (
                <div 
                  key={jam.id} 
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold">{jam.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(jam.scheduled_at).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <Link href={`/jams/${jam.id}`}>
                    <Button variant="outline" size="sm">
                      Voir
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
