"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/profile/create");
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

export interface ProfileData {
  display_name: string;
  bio?: string;
  city: string;
  postal_code: string;
  latitude?: number;
  longitude?: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'pro';
  instruments: Instrument[];
  styles: string[];
  avatar_url?: string;
}

export async function createMusicianProfile(data: ProfileData): Promise<void> {
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

export async function updateMusicianProfile(data: Partial<ProfileData>): Promise<void> {
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