# Epic-04 : Jam Sessions

## Story 4.1 — Schema DB Jam Sessions
**Priority**: Must | **Estimate**: M | **Status**: TODO

**SQL**:
```sql
create table jam_sessions (
  id uuid default gen_random_uuid() primary key,
  organizer_id uuid references profiles(id) not null,
  title text not null,
  description text,
  styles text[] default '{}',
  level text check (level in ('debutant', 'intermediaire', 'avance', 'pro', 'tous')),
  date timestamptz not null,
  duration_minutes int default 120,
  venue_type text check (venue_type in ('home', 'venue', 'studio')),
  address text,
  latitude float,
  longitude float,
  max_participants int default 8,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table jam_participants (
  id uuid default gen_random_uuid() primary key,
  jam_id uuid references jam_sessions(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  joined_at timestamptz default now(),
  unique(jam_id, profile_id)
);

-- RLS
alter table jam_sessions enable row level security;
alter table jam_participants enable row level security;

create policy "Jam sessions are viewable by everyone"
  on jam_sessions for select using (true);

create policy "Users can create jam sessions"
  on jam_sessions for insert with check (auth.uid() = organizer_id);

create policy "Organizers can update their jams"
  on jam_sessions for update using (auth.uid() = organizer_id);
```

**AC**:
- [ ] Tables + RLS OK
- [ ] Types générés

---

## Story 4.2 — Créer Jam Session
**Priority**: Must | **Estimate**: M | **Status**: TODO

**Tasks**:
- [ ] Créer `app/jams/create/page.tsx`
- [ ] Formulaire avec validation Zod
- [ ] Champs : titre, description, date, durée, style, niveau, lieu, max participants
- [ ] Géocodage adresse
- [ ] Sauvegarde en base
- [ ] Redirection vers page jam créée

**AC**:
- [ ] Formulaire validé
- [ ] Date/heure picker fonctionnel
- [ ] Redirection OK

---

## Story 4.3 — Liste Jam Sessions
**Priority**: Must | **Estimate**: M | **Status**: TODO

**Tasks**:
- [ ] Créer `app/jams/page.tsx`
- [ ] Liste jams futures triées par date
- [ ] Filtres : date, style, localisation
- [ ] Carte des jams
- [ ] Bouton "Créer une jam"

**AC**:
- [ ] Jams triées chronologiquement
- [ ] Filtres fonctionnels
- [ ] Design responsive

---

## Story 4.4 — Page Détail Jam
**Priority**: Must | **Estimate**: L | **Status**: TODO

**Tasks**:
- [ ] Créer `app/jams/[id]/page.tsx`
- [ ] Afficher infos complètes
- [ ] Liste participants avec avatars
- [ ] Bouton "Rejoindre" (si places dispo)
- [ ] Bouton "Quitter" (si déjà inscrit)
- [ ] Bouton "Annuler" (si organisateur)

**AC**:
- [ ] Participation fonctionne
- [ ] Compteur participants à jour
- [ ] Gestion erreurs (jam pleine, etc.)

---

## Story 4.5 — Email Rappel Jam
**Priority**: Should | **Estimate**: S | **Status**: TODO

**Tasks**:
- [ ] Setup Resend
- [ ] Template email rappel
- [ ] Edge function Supabase (cron daily)
- [ ] Envoi 24h avant la jam

**AC**:
- [ ] Emails envoyés automatiquement
- [ ] Template responsive
