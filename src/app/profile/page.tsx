import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Music, Star, Calendar, Edit, Settings } from "lucide-react";
import Link from "next/link";

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
  pro: "Professionnel",
};

export default async function MyProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from('musician_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    redirect("/profile/create");
  }

  // Fetch upcoming jams
  const { data: upcomingJams } = await supabase
    .from('jam_sessions')
    .select('*')
    .eq('creator_id', user.id)
    .eq('status', 'published')
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })
    .limit(5);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Actions */}
      <div className="flex justify-end gap-2 mb-6">
        <Link href="/profile/edit">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        </Link>
        <Link href="/settings">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
        </Link>
      </div>

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
              Mes instruments
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
              Mes styles
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
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Mes sessions à venir
          </CardTitle>
          <Link href="/jams/new">
            <Button size="sm">Créer une session</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {upcomingJams && upcomingJams.length > 0 ? (
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
                      Gérer
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Tu n&apos;as pas de session prévue</p>
              <Link href="/jams/new">
                <Button>Créer ma première session</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Public Profile Link */}
      <div className="mt-6 text-center">
        <Link href={`/musicians/${user.id}`}>
          <Button variant="outline">
            Voir mon profil public
          </Button>
        </Link>
      </div>
    </div>
  );
}
