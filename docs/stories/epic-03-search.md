# Epic-03 : Recherche & Découverte

## Story 3.1 — Extension PostGIS + Index
**Priority**: Must | **Estimate**: S | **Status**: TODO

**Context**:
Activer la recherche géographique.

**SQL**:
```sql
-- Activer PostGIS
create extension if not exists postgis;

-- Ajouter colonne géométrique
alter table profiles add column if not exists geo geography(point);

-- Mettre à jour geo depuis lat/long
update profiles set geo = st_makepoint(longitude, latitude)::geography where latitude is not null;

-- Index spatial
create index idx_profiles_geo on profiles using gist(geo);

-- Index pour recherche
create index idx_profiles_styles on profiles using gin(styles);
create index idx_musician_profiles_instruments on musician_profiles using gin((instruments->>'name'));
```

**Tasks**:
- [ ] Activer PostGIS sur Supabase
- [ ] Créer colonne geo + index
- [ ] Mettre à jour types TypeScript

**AC**:
- [ ] Index créés
- [ ] Requête geo < 100ms

---

## Story 3.2 — API Recherche
**Priority**: Must | **Estimate**: M | **Status**: TODO

**Context**:
Endpoint pour chercher des musiciens.

**Tasks**:
- [ ] Créer `app/api/search/route.ts`
- [ ] Query params : `lat`, `lng`, `radius`, `styles[]`, `instruments[]`, `level`
- [ ] Requête PostGIS (ST_DWithin)
- [ ] Pagination (20 résultats/page)
- [ ] Tri par distance

**Exemple requête**:
```sql
select p.*, mp.instruments, mp.styles, mp.level,
  st_distance(p.geo, st_makepoint($1, $2)::geography) as distance
from profiles p
join musician_profiles mp on mp.profile_id = p.id
where st_dwithin(p.geo, st_makepoint($1, $2)::geography, $3)
  and ($4::text[] is null or p.styles && $4)
order by distance
limit 20 offset $5;
```

**AC**:
- [ ] Filtres combinés fonctionnent
- [ ] Pagination OK
- [ ] < 500ms par requête

---

## Story 3.3 — Page Recherche (UI)
**Priority**: Must | **Estimate**: L | **Status**: TODO

**Context**:
Interface de recherche avec carte et liste.

**Tasks**:
- [ ] Créer `app/(main)/search/page.tsx`
- [ ] Layout 2 colonnes : carte (gauche) + liste (droite)
- [ ] Filtres sidebar :
  - Localisation (input + géoloc auto)
  - Rayon (slider 5-50km)
  - Styles (multi-select)
  - Instruments (multi-select)
  - Niveau (select)
- [ ] Carte avec marqueurs (Google Maps ou Mapbox)
- [ ] Cards musiciens dans la liste
- [ ] Infinite scroll ou pagination

**AC**:
- [ ] Responsive (mobile = carte en haut, liste en bas)
- [ ] Filtres fonctionnels
- [ ] Carte synchronisée avec liste

---

## Story 3.4 — Card Musicien
**Priority**: Must | **Estimate**: S | **Status**: TODO

**Context**:
Composant réutilisable pour afficher un musicien.

**Tasks**:
- [ ] Créer `components/musician-card.tsx`
- [ ] Props : profil complet
- [ ] Afficher : avatar, nom, localisation, distance
- [ ] Badges : instruments (max 3), styles (max 3)
- [ ] Niveau (badge couleur)
- [ ] Clic → page profil

**AC**:
- [ ] Design cohérent
- [ ] Hover effects
- [ ] Accessible
