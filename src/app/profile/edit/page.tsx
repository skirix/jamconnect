"use client";

import { useState, useEffect, useCallback } from "react";
import { updateMusicianProfile, uploadAvatar } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Music, MapPin, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const INSTRUMENTS_LIST = [
  "Guitare", "Basse", "Batterie", "Piano", "Clavier", "Synthé",
  "Violon", "Alto", "Violoncelle", "Contrebasse", "Flûte", "Saxophone",
  "Trompette", "Trombone", "Clarinette", "Harmonica", "Banjo", "Mandoline",
  "Ukulélé", "Chant", "DJ", "Producteur"
];

const STYLES_LIST = [
  "Rock", "Pop", "Jazz", "Blues", "Classique", "Électro",
  "Hip-Hop", "R&B", "Soul", "Funk", "Reggae", "Métal",
  "Folk", "Country", "Latino", "Musiques du monde", "Expérimental"
];

const LEVELS = [
  { value: "beginner", label: "Débutant" },
  { value: "intermediate", label: "Intermédiaire" },
  { value: "advanced", label: "Avancé" },
  { value: "pro", label: "Professionnel" },
];

interface SelectedInstrument {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'pro';
}

interface Profile {
  display_name: string;
  bio: string | null;
  city: string;
  postal_code: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'pro';
  instruments: SelectedInstrument[];
  styles: string[];
  avatar_url: string | null;
}

export default function EditProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedInstruments, setSelectedInstruments] = useState<SelectedInstrument[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [instrumentInput, setInstrumentInput] = useState("");
  const [styleInput, setStyleInput] = useState("");

  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data } = await supabase
          .from('musician_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setProfile(data);
          setSelectedInstruments(data.instruments || []);
          setSelectedStyles(data.styles || []);
          setAvatarPreview(data.avatar_url);
        }
      }
      setIsLoading(false);
    }
    loadProfile();
  }, []);

  const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const addInstrument = (name: string) => {
    if (!selectedInstruments.find(i => i.name === name)) {
      setSelectedInstruments([...selectedInstruments, { name, level: 'intermediate' }]);
    }
    setInstrumentInput("");
  };

  const removeInstrument = (name: string) => {
    setSelectedInstruments(selectedInstruments.filter(i => i.name !== name));
  };

  const updateInstrumentLevel = (name: string, level: SelectedInstrument['level']) => {
    setSelectedInstruments(selectedInstruments.map(i => 
      i.name === name ? { ...i, level } : i
    ));
  };

  const addStyle = (style: string) => {
    if (!selectedStyles.includes(style)) {
      setSelectedStyles([...selectedStyles, style]);
    }
    setStyleInput("");
  };

  const removeStyle = (style: string) => {
    setSelectedStyles(selectedStyles.filter(s => s !== style));
  };

  const filteredInstruments = INSTRUMENTS_LIST.filter(i => 
    i.toLowerCase().includes(instrumentInput.toLowerCase()) &&
    !selectedInstruments.find(si => si.name === i)
  );

  const filteredStyles = STYLES_LIST.filter(s => 
    s.toLowerCase().includes(styleInput.toLowerCase()) &&
    !selectedStyles.includes(s)
  );

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      if (selectedInstruments.length === 0) {
        throw new Error("Sélectionne au moins un instrument");
      }

      let avatarUrl = profile?.avatar_url;
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
      }

      await updateMusicianProfile({
        display_name: formData.get("display_name") as string,
        bio: formData.get("bio") as string || undefined,
        city: formData.get("city") as string,
        postal_code: formData.get("postal_code") as string,
        level: formData.get("level") as Profile['level'],
        instruments: selectedInstruments,
        styles: selectedStyles,
        avatar_url: avatarUrl || undefined,
      });

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Profil non trouvé</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Music className="h-6 w-6" />
            Modifier mon profil
          </CardTitle>
          <CardDescription>
            Mets à jour tes informations
          </CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">
                Profil mis à jour avec succès !
              </div>
            )}

            {/* Avatar */}
            <div className="space-y-2">
              <Label>Photo de profil</Label>
              <div className="flex items-center gap-4">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Preview" 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="display_name">Nom d&apos;affichage *</Label>
              <Input
                id="display_name"
                name="display_name"
                defaultValue={profile.display_name}
                placeholder="Comment veux-tu être appelé ?"
                required
                minLength={2}
                maxLength={50}
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio (optionnel)</Label>
              <Textarea
                id="bio"
                name="bio"
                defaultValue={profile.bio || ''}
                placeholder="Parle-nous de toi, de ton parcours musical..."
                maxLength={500}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">Max 500 caractères</p>
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Ville *
                </Label>
                <Input id="city" name="city" defaultValue={profile.city} placeholder="Paris" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal_code">Code postal *</Label>
                <Input id="postal_code" name="postal_code" defaultValue={profile.postal_code} placeholder="75001" required />
              </div>
            </div>

            {/* Level */}
            <div className="space-y-2">
              <Label htmlFor="level">Niveau global *</Label>
              <select
                id="level"
                name="level"
                required
                defaultValue={profile.level}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                {LEVELS.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Instruments */}
            <div className="space-y-2">
              <Label>Instruments * (min 1)</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedInstruments.map(instrument => (
                  <Badge key={instrument.name} variant="secondary" className="gap-1">
                    {instrument.name}
                    <select
                      value={instrument.level}
                      onChange={(e) => updateInstrumentLevel(instrument.name, e.target.value as SelectedInstrument['level'])}
                      className="ml-1 text-xs bg-transparent border-none outline-none"
                    >
                      {LEVELS.map(l => (
                        <option key={l.value} value={l.value}>{l.label}</option>
                      ))}
                    </select>
                    <button 
                      type="button"
                      onClick={() => removeInstrument(instrument.name)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Ajoute un instrument..."
                value={instrumentInput}
                onChange={(e) => setInstrumentInput(e.target.value)}
              />
              {instrumentInput && filteredInstruments.length > 0 && (
                <div className="border rounded-md mt-1 max-h-32 overflow-y-auto">
                  {filteredInstruments.map(instrument => (
                    <button
                      key={instrument}
                      type="button"
                      onClick={() => addInstrument(instrument)}
                      className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
                    >
                      {instrument}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Styles */}
            <div className="space-y-2">
              <Label>Styles musicaux</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedStyles.map(style => (
                  <Badge key={style} variant="outline" className="gap-1">
                    {style}
                    <button 
                      type="button"
                      onClick={() => removeStyle(style)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Ajoute un style musical..."
                value={styleInput}
                onChange={(e) => setStyleInput(e.target.value)}
              />
              {styleInput && filteredStyles.length > 0 && (
                <div className="border rounded-md mt-1 max-h-32 overflow-y-auto">
                  {filteredStyles.map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => addStyle(style)}
                      className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
                    >
                      {style}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSaving}>
              {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
