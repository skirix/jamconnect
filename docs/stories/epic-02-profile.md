# Epic-02 : Profil Musicien

## Story 2.1 — Schema DB Profils
**Priority**: Must | **Estimate**: M | **Status**: TODO

**Context**:
Créer les tables pour les profils avec RLS.

**SQL à exécuter sur Supabase**:
```sql
-- Profiles (1:1 avec auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  bio text,
  location text,
  latitude float,
  longitude float,
  search_radius_km int default 10,
  availability jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Musician details
create table musician_profiles (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references profiles(id) on delete cascade,
  instruments jsonb default '[]', -- [{"name": "guitare", "level": "intermediaire"}]
  styles text[] default '{}',
  level text check (level in ('debutant', 'intermediaire', 'avance', 'pro')),
  influences text,
  created_at timestamptz default now()
);

-- RLS
alter table profiles enable row level security;
alter table musician_profiles enable row level security;

-- Policies
create policy "Profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can insert their own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Trigger updated_at
create function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profile_updated
  before update on profiles
  for each row execute procedure handle_updated_at();
```

**Tasks**:
- [ ] Exécuter SQL sur Supabase
- [ ] Générer types TypeScript
- [ ] Vérifier RLS policies

**AC**:
- [ ] Tables créées
- [ ] RLS testé (select public, modif owner only)
- [ ] Types générés dans `types/supabase.ts`

---

## Story 2.2 — Composants UI Profil
**Priority**: Must | **Estimate**: S | **Status**: TODO

**Context**:
Créer les composants réutilisables pour le profil.

**Tasks**:
- [ ] `components/ui/avatar-upload.tsx` (upload image Supabase Storage)
- [ ] `components/ui/instrument-selector.tsx` (multi-select + niveau)
- [ ] `components/ui/style-tags.tsx` (input tags pour styles musicaux)
- [ ] `components/ui/location-picker.tsx` (input + géocodage)
- [ ] `components/profile-card.tsx` (affichage mini profil)

**AC**:
- [ ] Composants réutilisables
- [ ] Validation intégrée
- [ ] Responsive

---

## Story 2.3 — Page Setup Profil (Wizard)
**Priority**: Must | **Estimate**: L | **Status**: TODO

**Context**:
Première connexion : configurer son profil en plusieurs étapes.

**Tasks**:
- [ ] Créer `app/profile/setup/page.tsx`
- [ ] Wizard 4 étapes :
  - Étape 1 : Username + photo + bio
  - Étape 2 : Instruments + niveaux
  - Étape 3 : Styles musicaux
  - Étape 4 : Localisation + rayon de recherche
- [ ] Sauvegarde progressive (draft)
- [ ] Validation par étape
- [ ] Redirection `/search` à la fin

**AC**:
- [ ] Flow complet sans friction
- [ ] Sauvegarde fonctionne
- [ ] Skip possible (mais incite à compléter)

---

## Story 2.4 — Page Profil Public
**Priority**: Must | **Estimate**: M | **Status**: TODO

**Context**:
Afficher le profil d'un musicien (lecture seule).

**Tasks**:
- [ ] Créer `app/profile/[id]/page.tsx`
- [ ] Fetch profil + musician_profile
- [ ] Afficher : avatar, nom, bio, localisation
- [ ] Lister instruments avec badges niveau
- [ ] Lister styles musicaux (tags)
- [ ] Section "Contact" (bouton si connecté)
- [ ] Gérer 404 si profil inexistant

**AC**:
- [ ] Design professionnel
- [ ] Chargement rapide
- [ ] SEO friendly (metadata dynamique)

---

## Story 2.5 — Page Mon Profil (Édition)
**Priority**: Should | **Estimate**: M | **Status**: TODO

**Context**:
Modifier son propre profil.

**Tasks**:
- [ ] Créer `app/settings/profile/page.tsx`
- [ ] Formulaire édition complet
- [ ] Upload avatar (Supabase Storage bucket "avatars")
- [ ] Preview en temps réel
- [ ] Sauvegarde avec feedback

**AC**:
- [ ] Modifications persistées
- [ ] Upload image fonctionne
- [ ] Responsive
