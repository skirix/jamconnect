# Story 002: Database Schema + RLS Policies

## Epic
Auth & Onboarding

## Estimation
5 points

## Description
Créer le schéma de base de données Supabase avec toutes les tables, relations et RLS policies pour sécuriser les données.

## Tâches Techniques

### 1. Tables Auth (Extensions Supabase)
- [ ] Vérifier auth.users fonctionne (natif Supabase)
- [ ] Créer trigger pour création user_types à l'inscription

### 2. Table user_types
```sql
CREATE TABLE user_types (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_musician boolean DEFAULT false,
  is_venue boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

### 3. Table musician_profiles
```sql
CREATE TABLE musician_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  bio text,
  avatar_url text,
  city text NOT NULL,
  postal_code text NOT NULL,
  latitude float,
  longitude float,
  level text CHECK (level IN ('beginner', 'intermediate', 'advanced', 'pro')),
  instruments jsonb NOT NULL DEFAULT '[]',
  styles jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 4. Table venue_profiles
```sql
CREATE TABLE venue_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  venue_name text NOT NULL,
  venue_type text CHECK (venue_type IN ('rehearsal_room', 'bar', 'private_space', 'studio')),
  description text,
  capacity int,
  equipments jsonb DEFAULT '[]',
  address text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  latitude float,
  longitude float,
  photos jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 5. RLS Policies
- [ ] Enable RLS sur toutes les tables
- [ ] Policy SELECT public pour profiles
- [ ] Policy ALL owner-only pour modifications
- [ ] Tester policies avec différents utilisateurs

### 6. Types TypeScript
- [ ] Générer types depuis Supabase
- [ ] Créer types manuels pour inputs/outputs

## Critères d'Acceptation
- [ ] Tables créées dans Supabase
- [ ] RLS activé et testé
- [ ] Types TypeScript générés
- [ ] Seed data pour tests (optionnel)

## Dépendances
Story 001
