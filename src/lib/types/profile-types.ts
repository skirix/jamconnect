import { z } from "zod";

// -----------------------------
// Musician Profile Types (existing)
// -----------------------------
export const InstrumentSchema = z.object({
  name: z.string().min(1, "Nom d'instrument requis"),
  level: z.enum(["beginner", "intermediate", "advanced", "pro"]),
});

export const MusicianProfileSchema = z.object({
  display_name: z.string().min(2, "Nom d'affichage requis").max(50, "Maximum 50 caractères"),
  bio: z.string().max(500, "Maximum 500 caractères").optional(),
  city: z.string().min(1, "Ville requise"),
  postal_code: z.string().min(1, "Code postal requis"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  level: z.enum(["beginner", "intermediate", "advanced", "pro"], { message: "Niveau requis" }),
  instruments: z.array(InstrumentSchema).min(1, "Au moins un instrument est requis"),
  styles: z.array(z.string()).optional(),
  avatar_url: z.string().url().optional(),
});

export type MusicianProfileData = z.infer<typeof MusicianProfileSchema>;

// -----------------------------
// Venue Profile Types (new)
// -----------------------------

export const VenueTypeEnum = z.enum(['rehearsal_room', 'bar', 'private_space', 'studio'], {
  message: "Sélectionne un type de lieu valide",
});

export type VenueType = z.infer<typeof VenueTypeEnum>;

export const EquipmentSchema = z.object({
  name: z.string().min(1, "Nom d'équipement requis"),
  quantity: z.number().int().min(1, "Quantité minimum: 1").optional(),
});

export const VenueProfileSchema = z.object({
  venue_name: z.string().min(2, "Nom du lieu requis").max(100, "Maximum 100 caractères"),
  venue_type: VenueTypeEnum,
  description: z.string().max(1000, "Maximum 1000 caractères").optional(),
  address: z.string().min(5, "Adresse requise"),
  city: z.string().min(1, "Ville requise"),
  postal_code: z.string().min(1, "Code postal requis"),
  capacity: z.number().int().min(1, "Capacité minimum: 1").optional(),
  equipments: z.array(EquipmentSchema).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  photos: z.array(z.string().url()).max(6, "Maximum 6 photos").optional(),
});

export type VenueProfileData = z.infer<typeof VenueProfileSchema> & { id?: string };
