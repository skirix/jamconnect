import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CreateProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Bienvenue sur JamConnect !</CardTitle>
          <CardDescription>
            Quel type de profil souhaitez-vous créer ?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/profile/create-musician">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center space-y-2">
              <span className="text-lg font-semibold">🎵 Je suis musicien</span>
              <span className="text-sm text-gray-500">Créer un profil pour trouver des partenaires</span>
            </Button>
          </Link>
          
          <Link href="/profile/create-venue">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center space-y-2">
              <span className="text-lg font-semibold">🏪 J&apos;ai un lieu</span>
              <span className="text-sm text-gray-500">Bar, salle de répétition, studio...</span>
            </Button>
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          <Link href="/profile/create-musician?venue=true">
            <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center space-y-2">
              <span className="text-lg font-semibold">🎵+🏪 Je suis les deux</span>
              <span className="text-sm text-gray-500">Musicien et propriétaire de lieu</span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}