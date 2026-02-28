# JamConnect — Architecture Technique V1

## 1. Stack Complète

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| **Frontend** | Next.js 14+ App Router | SSR/SSG, routing moderne, meilleures perfs |
| **Language** | TypeScript Strict | Type safety, DX, maintenance |
| **Styling** | Tailwind CSS + shadcn/ui | Design system rapide, composants accessibles |
| **Backend** | Next.js API Routes + Server Actions | Une codebase, serverless, pas de backend séparé |
| **Base de données** | Supabase (PostgreSQL) | Gratuit généreux, Auth intégré, Realtime, RLS |
| **Auth** | Supabase Auth | OAuth natif, JWT, email/password, row-level security |
| **State Client** | Zustand | Léger, TypeScript-first, pas de boilerplate |
| **Data Fetching** | React Query (TanStack Query) | Caching, mutations, optimistic updates |
| **Formulaires** | React Hook Form + Zod | Validation typesafe, perfs, DX |
| **Upload** | Supabase Storage | Images profils, photos locaux, photos marketplace |
| **Email** | Resend ou SendGrid (free tier) | Transactionnels (confirmation, contact) |
| **Hébergement** | Vercel Hobby | Gratuit, CI/CD intégré, edge functions |
| **Monitoring** | Vercel Analytics + Uptime Robot | Gratuit, suffisant pour V1 |

---

## 2. Schéma Base de Données (Supabase)

### Tables principales

```sql
-- Users (gérée par Supabase Auth, étendue par profils)

-- Profils musiciens
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
  instruments jsonb NOT NULL DEFAULT '[]', -- [{"name": "Guitar", "level": "advanced"}]
  styles jsonb NOT NULL DEFAULT '[]', -- ["rock", "jazz"]
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Profils propriétaires de locaux
CREATE TABLE venue_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  venue_name text NOT NULL,
  venue_type text CHECK (venue_type IN ('rehearsal_room', 'bar', 'private_space', 'studio')),
  description text,
  capacity int,
  equipments jsonb DEFAULT '[]', -- ["drums", "pa_system", "amps"]
  address text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  latitude float,
  longitude float,
  photos jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Type utilisateur (musician, venue, both)
CREATE TABLE user_types (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_musician boolean DEFAULT false,
  is_venue boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Jam sessions
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
  status text CHECK (status IN ('draft', 'published', 'cancelled', 'completed')) DEFAULT 'draft',
  address text,
  city text NOT NULL,
  latitude float,
  longitude float,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Participants aux sessions
CREATE TABLE jam_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  jam_session_id uuid REFERENCES jam_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text CHECK (status IN ('pending', 'confirmed', 'rejected', 'cancelled')) DEFAULT 'pending',
  message text, -- Message d'accompagnement
  created_at timestamptz DEFAULT now(),
  UNIQUE(jam_session_id, user_id)
);

-- Annonces marketplace
CREATE TABLE listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid REFERENCES auth.users(id) NOT NULL,
  type text CHECK (type IN ('sale', 'rental')) NOT NULL,
  category text CHECK (category IN ('instruments', 'amps', 'pedals', 'accessories', 'other')) NOT NULL,
  title text NOT NULL,
  description text,
  price_cents int NOT NULL,
  city text NOT NULL,
  photos jsonb DEFAULT '[]',
  status text CHECK (status IN ('active', 'sold', 'reserved', 'cancelled')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Messages/contact (enregistrés pour historique)
CREATE TABLE contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users(id) NOT NULL,
  receiver_id uuid REFERENCES auth.users(id) NOT NULL,
  listing_id uuid REFERENCES listings(id), -- Optionnel si lié à une annonce
  subject text NOT NULL,
  message text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  email_sent boolean DEFAULT false
);
```

---

## 3. Row Level Security (RLS) Policies

### musician_profiles
```sql
-- Lecture publique
CREATE POLICY "Profiles are viewable by everyone"
  ON musician_profiles FOR SELECT
  USING (true);

-- Écriture uniquement par le propriétaire
CREATE POLICY "Users can update own profile"
  ON musician_profiles FOR ALL
  USING (auth.uid() = id);
```

### venue_profiles
```sql
CREATE POLICY "Venue profiles are viewable by everyone"
  ON venue_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own venues"
  ON venue_profiles FOR ALL
  USING (auth.uid() = user_id);
```

### jam_sessions
```sql
CREATE POLICY "Sessions are viewable by everyone"
  ON jam_sessions FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own sessions"
  ON jam_sessions FOR ALL
  USING (auth.uid() = creator_id);
```

### jam_participants
```sql
CREATE POLICY "Participants viewable by session members"
  ON jam_participants FOR SELECT
  USING (
    auth.uid() = user_id OR 
    auth.uid() IN (SELECT creator_id FROM jam_sessions WHERE id = jam_session_id)
  );

CREATE POLICY "Users can manage own participations"
  ON jam_participants FOR ALL
  USING (auth.uid() = user_id);
```

### listings
```sql
CREATE POLICY "Listings are viewable by everyone"
  ON listings FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own listings"
  ON listings FOR ALL
  USING (auth.uid() = seller_id);
```

---

## 4. API Design

### Server Actions (Next.js App Router)
Préférer les Server Actions pour les mutations, API routes pour les lectures complexes.

#### Auth (Supabase intégré)
- `signUp(email, password)`
- `signIn(email, password)`
- `signInWithOAuth(provider)`
- `signOut()`

#### Profils
```typescript
// Server Actions
updateMusicianProfile(profile: MusicianProfileInput)
updateVenueProfile(profile: VenueProfileInput)
getMusicianProfile(userId: string)
searchMusicians(filters: SearchFilters)
```

#### Jam Sessions
```typescript
createJamSession(session: JamSessionInput)
updateJamSession(id: string, session: JamSessionInput)
cancelJamSession(id: string)
requestJoinSession(sessionId: string, message?: string)
respondToJoinRequest(participationId: string, status: 'confirmed' | 'rejected')
listSessions(filters: SessionFilters)
getSessionDetails(id: string)
```

#### Marketplace
```typescript
createListing(listing: ListingInput)
updateListing(id: string, listing: ListingInput)
deactivateListing(id: string)
searchListings(filters: ListingFilters)
getListingDetails(id: string)
```

#### Contact
```typescript
sendContactRequest(receiverId: string, subject: string, message: string, listingId?: string)
```

### API Routes (lectures complexes)
```
GET /api/search/musicians?q=&instruments=&styles=&city=&radius=
GET /api/search/sessions?city=&date_from=&date_to=&mode=
GET /api/search/listings?category=&type=&city=&price_min=&price_max=
```

---

## 5. Structure Projet Next.js

```
jamconnect/
├── app/                           # Next.js App Router
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   ├── (main)/
│   │   ├── layout.tsx            # Layout avec navigation
│   │   ├── page.tsx              # Page d'accueil
│   │   ├── musicians/
│   │   │   ├── page.tsx          # Liste musiciens
│   │   │   └── [id]/page.tsx     # Profil musicien
│   │   ├── venues/
│   │   │   ├── page.tsx          # Liste locaux
│   │   │   └── [id]/page.tsx     # Profil local
│   │   ├── jams/
│   │   │   ├── page.tsx          # Liste sessions
│   │   │   ├── new/page.tsx      # Créer session
│   │   │   └── [id]/page.tsx     # Détail session
│   │   ├── marketplace/
│   │   │   ├── page.tsx          # Liste annonces
│   │   │   ├── new/page.tsx      # Créer annonce
│   │   │   └── [id]/page.tsx     # Détail annonce
│   │   └── profile/
│   │       ├── page.tsx          # Mon profil
│   │       └── edit/page.tsx     # Édition profil
│   ├── api/
│   │   └── ...                   # API routes
│   └── layout.tsx
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── forms/                    # Formulaires (React Hook Form)
│   ├── profile/
│   ├── jams/
│   └── marketplace/
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Client Supabase browser
│   │   ├── server.ts             # Client Supabase server
│   │   └── schema.ts             # Types générés
│   ├── actions/                  # Server Actions
│   │   ├── auth.ts
│   │   ├── profile.ts
│   │   ├── jams.ts
│   │   └── marketplace.ts
│   ├── hooks/                    # Custom hooks
│   └── utils.ts
├── types/
│   └── index.ts                  # Types TypeScript
├── public/
│   └── images/
├── docs/                         # Documentation BMAD
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 6. Flows Auth

### Inscription
1. User remplit formulaire (email, password)
2. Supabase Auth crée l'utilisateur
3. Trigger crée entrée dans `user_types`
4. Redirection vers création de profil (musicien et/ou venue)
5. Email de confirmation envoyé

### Connexion
1. Login via Supabase Auth
2. Récupération du profil associé
3. Redirection vers page d'accueil personnalisée

---

## 7. Dépendances NPM

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "@supabase/supabase-js": "^2.x",
    "@supabase/ssr": "^0.x",
    "zustand": "^4.x",
    "@tanstack/react-query": "^5.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "@hookform/resolvers": "^3.x",
    "lucide-react": "^0.x",
    "date-fns": "^3.x",
    "class-variance-authority": "^0.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/node": "^20.x",
    "@types/react": "^18.x",
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x",
    "eslint": "^8.x",
    "eslint-config-next": "^14.x",
    "prettier": "^3.x"
  }
}
```

---

## 8. Variables d'Environnement

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@jamconnect.app
```