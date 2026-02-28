"use client";

import { useState, useCallback } from "react";
import { createVenueProfile, uploadVenuePhoto } from "@/lib/actions/auth";
import { VenueProfileData, VenueType } from "@/lib/types/profile-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, HomeIcon, PlusCircle } from "lucide-react";

const VENUE_TYPES = [
  { value: "rehearsal_room", label: "Salle de répétition" },
  { value: "bar", label: "Bar / Café-Concert" },
  { value: "private_space", label: "Espace privé (pour événements)" },
  { value: "studio", label: "Studio d'enregistrement" },
];

const EQUIPMENTS_LIST = [
  "Sonorisation ( sono )", "Micros", "Batterie", "Amplis Guitare", "Amplis Basse",
  "Clavier / Piano", "Table de Mixage", "Éclairage", "Scène", "Vidéo-projecteur",
  "Instruments additionnels" 
];

export default function CreateVenueProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);
  const [equipmentInput, setEquipmentInput] = useState("");

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      if (photos.length + files.length > 6) {
        setError("Vous ne pouvez télécharger que 6 photos maximum.");
        return;
      }
      setPhotos((prev) => [...prev, ...files]);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
      // Clear the input after adding files
      e.target.value = ''; 
    }
  }, [photos.length]);

  const removePhoto = useCallback((index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const addEquipment = (name: string) => {
    if (!selectedEquipments.includes(name)) {
      setSelectedEquipments([...selectedEquipments, name]);
    }
    setEquipmentInput("");
  };

  const removeEquipment = (name: string) => {
    setSelectedEquipments(selectedEquipments.filter(e => e !== name));
  };
  
  const filteredEquipments = EQUIPMENTS_LIST.filter(eq => 
    eq.toLowerCase().includes(equipmentInput.toLowerCase()) &&
    !selectedEquipments.includes(eq)
  );

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    try {
      if (photos.length === 0) {
        throw new Error("Veuillez télécharger au moins une photo pour votre lieu.");
      }

      const uploadedPhotoUrls: string[] = [];
      for (const photoFile of photos) {
        const url = await uploadVenuePhoto(photoFile);
        uploadedPhotoUrls.push(url);
      }

      const venueData: VenueProfileData = {
        venue_name: formData.get("venue_name") as string,
        venue_type: formData.get("venue_type") as VenueType,
        description: formData.get("description") as string || undefined,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        postal_code: formData.get("postal_code") as string,
        capacity: parseInt(formData.get("capacity") as string) || undefined,
        equipments: selectedEquipments.map(eq => ({ name: eq })), // Assuming quantity is not collected here for simplicity for now
        photos: uploadedPhotoUrls,
      };

      await createVenueProfile(venueData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la création du profil du lieu.");
      console.error("Create Venue Profile Error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <HomeIcon className="h-6 w-6" />
            Crée ton profil de lieu
          </CardTitle>
          <CardDescription>
            Présente ton espace à la communauté JamConnect
          </CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            {/* Venue Name */}
            <div className="space-y-2">
              <Label htmlFor="venue_name">Nom du lieu *</Label>
              <Input
                id="venue_name"
                name="venue_name"
                placeholder="Nom de votre salle de répétition, bar, etc."
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            {/* Venue Type */}
            <div className="space-y-2">
              <Label htmlFor="venue_type">Type de lieu *</Label>
              <select
                id="venue_type"
                name="venue_type"
                required
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                <option value="">Sélectionne un type</option>
                {VENUE_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (optionnel)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Décris votre lieu, son ambiance, ses spécificités..."
                maxLength={1000}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">Max 1000 caractères</p>
            </div>

            {/* Address */}
            <div className="space-y-2">
                <Label htmlFor="address">Adresse complète *</Label>
                <Input id="address" name="address" placeholder="123 Rue de la Musique" required />
            </div>

            {/* Location Details (City, Postal Code, Capacity) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville *</Label>
                <Input id="city" name="city" placeholder="Paris" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal_code">Code postal *</Label>
                <Input id="postal_code" name="postal_code" placeholder="75001" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacité (personnes) (optionnel)</Label>
                <Input 
                  id="capacity" 
                  name="capacity" 
                  type="number" 
                  placeholder="100" 
                  min={1} 
                />
              </div>
            </div>

            {/* Equipments */}
            <div className="space-y-2">
              <Label>Équipements (optionnel)</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedEquipments.map(equipment => (
                  <Badge key={equipment} variant="secondary" className="gap-1">
                    {equipment}
                    <button 
                      type="button"
                      onClick={() => removeEquipment(equipment)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Ajoute un équipement (ex: Micros, Sono)"
                value={equipmentInput}
                onChange={(e) => setEquipmentInput(e.target.value)}
              />
              {equipmentInput && filteredEquipments.length > 0 && (
                <div className="border rounded-md mt-1 max-h-32 overflow-y-auto">
                  {filteredEquipments.map(equipment => (
                    <button
                      key={equipment}
                      type="button"
                      onClick={() => addEquipment(equipment)}
                      className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
                    >
                      {equipment}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Photos Upload */}
            <div className="space-y-2">
              <Label htmlFor="photos">Photos du lieu (max 6) *</Label>
              <p className="text-sm text-muted-foreground">Téléchargez des photos de votre lieu. La première photo sera l&apos;image principale.</p>
              <div className="grid grid-cols-3 gap-4">
                {photoPreviews.map((src, index) => (
                  <div key={index} className="relative w-full h-24 rounded-md overflow-hidden group">
                    <img src={src} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {photos.length < 6 && (
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer bg-muted hover:bg-muted/50">
                    <Input
                      id="photos"
                      name="photos"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <PlusCircle className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Ajouter</span>
                  </label>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Création du profil du lieu..." : "Créer mon profil de lieu"}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
} 