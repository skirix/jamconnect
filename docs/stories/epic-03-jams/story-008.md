# Story 008: Création Jam Sessions

## Epic
Jam Sessions

## Estimation
5 points

## Description
En tant qu'utilisateur, je veux créer une jam session avec titre, date, lieu et mode de gestion des participations.

## Tâches Techniques

### 1. Tables Supabase
```sql
CREATE TABLE jam_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES auth.users(id) NOT NULL,
  host_type text CHECK (host_type IN ('musician', 'venue')),
  host_venue_id uuid REFERENCES venue_profiles(id),
  title text NOT NULL,
  description text,
  scheduled_at timestamptz NOT NULL,
  duration_minutes int DEFAULT 120,
  max_participants int DEFAULT 10,
  mode text CHECK (mode IN ('reservation', 'public')) NOT NULL,
  status text CHECK (status IN ('draft', 'published', 'cancelled', 'completed')) DEFAULT 'published',
  address text,
  city text NOT NULL,
  latitude float,
  longitude float,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 2. Wizard Multi-Étapes
- [ ] Route /jams/new
- [ ] Étape 1 : Informations (titre, description, date, durée)
- [ ] Étape 2 : Lieu (mon adresse ou sélection venue)
- [ ] Étape 3 : Mode (public vs confirmation + max participants)
- [ ] Navigation étapes avec validation
- [ ] Preview avant publication

### 3. Sélection Lieu
- [ ] Option 1 : Adresse personnalisée (input autocomplete)
- [ ] Option 2 : Sélection parmi mes venues (si user a venues)
- [ ] Géocodage automatique

### 4. Server Action createJamSession
- [ ] Validation complète données
- [ ] Insert avec RLS (creator_id = auth.uid())
- [ ] Redirection vers fiche session

### 5. Validation
- [ ] Titre: 5-100 caractères
- [ ] Date: future uniquement
- [ ] Durée: 30-480 minutes
- [ ] Max participants: 2-50

## Critères d'Acceptation
- [ ] Wizard 3 étapes fonctionne
- [ ] Session créée en base
- [ ] Géocodage fonctionne
- [ ] Redirection fiche session OK
- [ ] Erreurs affichées si validation échoue

## Dépendances
Story 005 (venue profiles)
