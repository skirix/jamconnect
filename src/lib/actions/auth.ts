"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MusicianProfileData, VenueProfileData } from "@/lib/types/profile-types";
import { geocodeAddress } from "@/lib/geocoding";

export async function login(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData): Promise<void> {
  try {
    const supabase = await createClient();

    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    console.log("Signup attempt for:", data.email);
    
    const { data: authData, error } = await supabase.auth.signUp(data);

    if (error) {
      console.error("Supabase signup error:", error.message);
      throw new Error(error.message);
    }

    console.log("Signup success:", authData.user?.id);
    revalidatePath("/", "layout");
    redirect("/profile/create");
  } catch (err) {
    console.error("Signup catch error:", err);
    throw err;
  }
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function resetPassword(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }
}

// Profile types
export interface Instrument {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'pro';
}


export async function createMusicianProfile(data: MusicianProfileData): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from('musician_profiles')
    .insert({
      id: (await supabase.auth.getUser()).data.user?.id,
      ...data,
    });

  if (error) {
    throw new Error(error.message);
  }

  // Update user_types to mark as musician
  const { error: typeError } = await supabase
    .from('user_types')
    .upsert({
      user_id: (await supabase.auth.getUser()).data.user?.id,
      is_musician: true,
    });

  if (typeError) {
    throw new Error(typeError.message);
  }

  revalidatePath("/", "layout");
  redirect("/profile");
}

export async function updateMusicianProfile(data: Partial<MusicianProfileData>): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from('musician_profiles')
    .update(data)
    .eq('id', (await supabase.auth.getUser()).data.user?.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
}

export async function uploadAvatar(file: File): Promise<string> {
  const supabase = await createClient();
  
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Non authentifié");

  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}-${Date.now()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('profiles')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage.from('profiles').getPublicUrl(filePath);
  return data.publicUrl;
}

export async function getUserVenues(): Promise<VenueProfileData[]> {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    throw new Error("Utilisateur non authentifié.");
  }

  const { data, error } = await supabase
    .from('venue_profiles')
    .select('*, id')
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }
  return data as VenueProfileData[];
}

export async function getVenueProfilePublic(venueId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('venue_profiles')
    .select('*')
    .eq('id', venueId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getVenueProfileById(venueId: string) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    throw new Error("Utilisateur non authentifié.");
  }

  const { data, error } = await supabase
    .from('venue_profiles')
    .select('*')
    .eq('id', venueId)
    .eq('user_id', user.id) // Ensure user can only read their own venue here for editing purposes
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteVenuePhoto(photoUrl: string): Promise<void> {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    throw new Error("Non authentifié");
  }

  // Extract the file path from the full URL
  const filePath = photoUrl.split("venue_photos/")[1];

  const { error } = await supabase.storage
    .from('venue_photos')
    .remove([filePath]);

  if (error) {
    throw new Error(error.message);
  }
}

// NEW: Venue Profile Actions

export async function createVenueProfile(data: VenueProfileData): Promise<void> {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    throw new Error("Utilisateur non authentifié.");
  }

  // Geocode address to get lat/long
  const geocodingResult = await geocodeAddress(data.address, data.city, data.postal_code);
  
  const venueData = {
    ...data,
    latitude: geocodingResult?.latitude,
    longitude: geocodingResult?.longitude,
  };

  const { error } = await supabase
    .from('venue_profiles')
    .insert({
      user_id: user.id,
      ...venueData,
    });

  if (error) {
    throw new Error(error.message);
  }

  // Update user_types to mark as venue
  const { error: typeError } = await supabase
    .from('user_types')
    .upsert({
      user_id: user.id,
      is_venue: true,
    });

  if (typeError) {
    throw new Error(typeError.message);
  }

  revalidatePath("/", "layout");
  redirect("/profile");
}

export async function updateVenueProfile(venueId: string, data: Partial<VenueProfileData>): Promise<void> {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    throw new Error("Utilisateur non authentifié.");
  }

  // If address fields changed, re-geocode
  let venueData = { ...data };
  if (data.address || data.city || data.postal_code) {
    // Get current venue data to fill in missing fields
    const { data: currentVenue } = await supabase
      .from('venue_profiles')
      .select('address, city, postal_code')
      .eq('id', venueId)
      .single();
    
    const address = data.address || currentVenue?.address || '';
    const city = data.city || currentVenue?.city || '';
    const postalCode = data.postal_code || currentVenue?.postal_code || '';
    
    const geocodingResult = await geocodeAddress(address, city, postalCode);
    
    venueData = {
      ...venueData,
      latitude: geocodingResult?.latitude,
      longitude: geocodingResult?.longitude,
    };
  }

  const { error } = await supabase
    .from('venue_profiles')
    .update(venueData)
    .eq('id', venueId)
    .eq('user_id', user.id); // Ensure user can only update their own venues

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
}

export async function uploadVenuePhoto(file: File): Promise<string> {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    throw new Error("Non authentifié");
  }

  const fileExt = file.name.split('.').pop();
  // Using user ID and a timestamp to ensure unique file names per user
  const fileName = `${user.id}-${Date.now()}.${fileExt}`;
  const filePath = `venue_photos/${fileName}`; // Folder inside the 'venue_photos' bucket

  const { error: uploadError } = await supabase.storage
    .from('venue_photos') // Use the dedicated venue photos bucket
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicUrlData } = supabase.storage.from('venue_photos').getPublicUrl(filePath);
  
  if (!publicUrlData) {
    throw new Error("Impossible de récupérer l'URL publique de l'image.");
  }

  return publicUrlData.publicUrl;
}

