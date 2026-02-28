"use server";

import { createClient } from "@/lib/supabase/server";
import { MusicianProfileData } from "@/lib/types/profile-types";

export interface SearchMusiciansParams {
  instruments?: string[];
  styles?: string[];
  level?: string;
  city?: string;
  page?: number;
  limit?: number;
}

export interface SearchMusiciansResult {
  musicians: (MusicianProfileData & { id: string })[];
  total: number;
  page: number;
  totalPages: number;
}

const ITEMS_PER_PAGE = 20;

const COMMON_INSTRUMENTS = [
  "Guitare", "Basse", "Batterie", "Piano", "Clavier", "Saxophone", "Trompette",
  "Violon", "Violoncelle", "Contrebasse", "Flûte", "Clarinette", "Harmonica",
  "Chant", "Percussions", "DJ", "Producteur"
];

const COMMON_STYLES = [
  "Rock", "Pop", "Jazz", "Blues", "Funk", "Soul", "R&B", "Hip-Hop", "Rap",
  "Électro", "House", "Techno", "Métal", "Punk", "Reggae", "Latino", "Folk",
  "Country", "Classique", "Alternatif", "Indie", "Hard Rock", "Progressif"
];

export async function searchMusicians(
  params: SearchMusiciansParams
): Promise<SearchMusiciansResult> {
  const supabase = await createClient();
  
  const page = params.page || 1;
  const limit = params.limit || ITEMS_PER_PAGE;
  const offset = (page - 1) * limit;

  // Start building the query
  let query = supabase
    .from('musician_profiles')
    .select('*', { count: 'exact' });

  // Apply filters
  if (params.instruments && params.instruments.length > 0) {
    // Filter by instruments - check if any of the selected instruments match
    query = query.or(
      params.instruments.map(inst => `instruments->>name.ilike.${inst}`).join(',')
    );
  }

  if (params.styles && params.styles.length > 0) {
    // Filter by styles - check if styles array contains any of the selected styles
    query = query.contains('styles', params.styles);
  }

  if (params.level) {
    query = query.eq('level', params.level);
  }

  if (params.city) {
    query = query.ilike('city', `%${params.city}%`);
  }

  // Execute query with pagination
  const { data, error, count } = await query
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Search musicians error:', error);
    throw new Error(error.message);
  }

  const total = count || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    musicians: (data || []) as (MusicianProfileData & { id: string })[],
    total,
    page,
    totalPages,
  };
}

export async function getFilterOptions(): Promise<{
  instruments: string[];
  styles: string[];
  levels: { value: string; label: string }[];
}> {
  return {
    instruments: COMMON_INSTRUMENTS,
    styles: COMMON_STYLES,
    levels: [
      { value: 'beginner', label: 'Débutant' },
      { value: 'intermediate', label: 'Intermédiaire' },
      { value: 'advanced', label: 'Avancé' },
      { value: 'pro', label: 'Professionnel' },
    ],
  };
}
