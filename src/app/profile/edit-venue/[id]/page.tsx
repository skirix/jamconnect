"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateVenueProfile, uploadVenuePhoto, getVenueProfileById, deleteVenuePhoto } from "@/lib/actions/auth";
import { VenueProfileData, VenueType } from "@/lib/types/profile-types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Upload, HomeIcon, PlusCircle, Loader2 } from "lucide-react";

const VENUE_TYPES = [
  { value: "rehearsal_room", label: "Salle de répétition" },
  { value: "bar", label: "Bar / Café-Concert" },
  { value: "private_space", label: "Espace privé (pour événements)" },
  { value: "studio", label: "Studio d'enregistrement" },
];

const EQUIPMENTS_LIST = [
  "Sonorisation (sono)", "Micros", "Batterie", "Amplis Guitare", "Amplis Basse",
  "Clavier / Piano", "Table de Mixage", "Éclairage", "Scène", "Vidéo-projecteur",
  "Instruments additionnels"
];

interface EditVenueProfilePageProps {
  params: { id: string };
}

export default function EditVenueProfilePage({ params }: EditVenueProfilePageProps) {
  const venueId = params.id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [venueName, setVenueName] = useState("");
  const [venueType, setVenueType] = useState<VenueType>("rehearsal_room");
  const [description, setDescription] = useState<string | undefined>("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [capacity, setCapacity] = useState<number | undefined>(undefined);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);
  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [newPhotoPreviews, setNewPhotoPreviews] = useState<string[]>([]);
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);
  const [equipmentInput, setEquipmentInput] = useState("");

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const data = await getVenueProfileById(venueId);
        if (data) {
          setVenueName(data.venue_name);
          setVenueType(data.venue_type);
          setDescription(data.description || "");
          setAddress(data.address);
          setCity(data.city);
          setPostalCode(data.postal_code);
          setCapacity(data.capacity || undefined);
          setExistingPhotos(data.photos || []);
          setSelectedEquipments(data.equipments?.map((eq: any) => eq.name) || []);
        } else {
          setError("Lieu non trouvé ou vous n\'êtes pas autorisé à le modifier.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement du lieu.");
        console.error("Fetch venue error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVenueData();
  }, [venueId, router]);

  const handleNewPhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalPhotos = existingPhotos.length + newPhotos.length + files.length;

    if (totalPhotos > 6) {
      setError("Vous ne pouvez télécharger que 6 photos maximum (anciennes + nouvelles).");
      return;
    }

    setNewPhotos((prev) => [...prev, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhotoPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = ''; 
  }, [existingPhotos.length, newPhotos.length]);

  const removeExistingPhoto = useCallback(async (index: number) => {
    const photoUrlToRemove = existingPhotos[index];
    if (photoUrlToRemove) {
      try {
        await deleteVenuePhoto(photoUrlToRemove);
        setExistingPhotos((prev) => prev.filter((_, i) => i !== index));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors de la suppression de la photo.");
        console.error("Delete photo error:", err);
      }
    }
  }, [existingPhotos]);

  const removeNewPhoto = useCallback((index: number) => {
    setNewPhotos((prev) => prev.filter((_, i) => i !== index));
    setNewPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
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
    setIsSubmitting(true);
    setError(null);

    try {
      const allPhotoUrls: string[] = [...existingPhotos];
      for (const photoFile of newPhotos) {
        const url = await uploadVenuePhoto(photoFile);
        allPhotoUrls.push(url);
      }

      if (allPhotoUrls.length === 0) {
        throw new Error("Veuillez ajouter au moins une photo pour votre lieu.");
      }

      const updatedData: Partial<VenueProfileData> = {
        venue_name: formData.get("venue_name") as string,
        venue_type: formData.get("venue_type") as VenueType,
        description: formData.get("description") as string || undefined,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        postal_code: formData.get("postal_code") as string,
        capacity: parseInt(formData.get("capacity") as string) || undefined,
        equipments: selectedEquipments.map(eq => ({ name: eq })), 
        photos: allPhotoUrls,
      };

      await updateVenueProfile(venueId, updatedData);
      router.push(`/venues/${venueId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la mise à jour du profil du lieu.");
      console.error("Update venue error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <HomeIcon className="h-6 w-6" />
            Modifier profil de {venueName}
          </CardTitle>
          <CardDescription>
            Mettez à jour les informations de votre lieu
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
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
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
                value={venueType}
                onChange={(e) => setVenueType(e.target.value as VenueType)}
              >
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
                placeholder="Décrivez votre lieu, son ambiance, ses spécificités..."
                maxLength={1000}
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Max 1000 caractères</p>
            </div>

            {/* Address */}
            <div className="space-y-2">
                <Label htmlFor="address">Adresse complète *</Label>
                <Input 
                  id="address" 
                  name="address" 
                  placeholder="123 Rue de la Musique" 
                  required 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            {/* Location Details (City, Postal Code, Capacity) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville *</Label>
                <Input 
                  id="city" 
                  name="city" 
                  placeholder="Paris" 
                  required 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal_code">Code postal *</Label>
                <Input 
                  id="postal_code" 
                  name="postal_code" 
                  placeholder="75001" 
                  required 
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacité (personnes) (optionnel)</Label>
                <Input 
                  id="capacity" 
                  name="capacity" 
                  type="number" 
                  placeholder="100" 
                  min={1} 
                  value={capacity !== undefined ? capacity : ''}
                  onChange={(e) => setCapacity(e.target.value ? parseInt(e.target.value) : undefined)}
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
              <p className="text-sm text-muted-foreground">Téléchargez des photos de votre lieu. La première photo sera l'image principale.</p>
              <div className="grid grid-cols-3 gap-4">
                {existingPhotos.map((src, index) => (
                  <div key={`existing-${index}`} className="relative w-full h-24 rounded-md overflow-hidden group">
                    <img src={src} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeExistingPhoto(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {newPhotoPreviews.map((src, index) => (
                  <div key={`new-${index}`} className="relative w-full h-24 rounded-md overflow-hidden group">
                    <img src={src} alt={`Nouvelle photo ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewPhoto(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {(existingPhotos.length + newPhotos.length) < 6 && (
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer bg-muted hover:bg-muted/50">
                    <Input
                      id="photos"
                      name="photos"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleNewPhotoUpload}
                      className="hidden"
                    />
                    <PlusCircle className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Ajouter</span>
                  </label>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />"Mise à jour du lieu..."</>
              ) : (
                "Mettre à jour le lieu"
              )}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
