# Story 006: Recherche Musiciens avec Filtres

## Epic
Découverte Musicale

## Estimation
5 points

## Description
En tant que musicien, je veux rechercher d'autres musiciens par instrument, style, niveau et zone géographique.

## Tâches Techniques

### 1. Page Recherche
- [ ] Route /musicians
- [ ] Layout avec filtres sidebar (desktop) / accordéon (mobile)
- [ ] Zone résultats grid responsive

### 2. Filtres UI
- [ ] Select instruments (multi)
- [ ] Select styles musicaux (multi)
- [ ] Select niveau
- [ ] Input ville + rayon (km)
- [ ] Bouton "Appliquer filtres"
- [ ] Bouton "Réinitialiser"

### 3. API Recherche
- [ ] Server Action ou API Route
- [ ] Query Supabase avec filtres
- [ ] Filtre géographique (postgis ST_DWithin option, ou simple WHERE city)
- [ ] Pagination (20 résultats/page)
- [ ] Compteur résultats

### 4. Card Musicien
- [ ] Photo, nom, ville
- [ ] Badges instruments
- [ ] Badges styles (max 3 puis +n)
- [ ] CTA "Voir profil"

### 5. URL Search Params
- [ ] Synchroniser filtres avec URL (?instruments=guitar&city=paris)
- [ ] Partageable / bookmarkable
- [ ] Hydratation côté serveur possible

## Critères d'Acceptation
- [ ] Filtres fonctionnent individuellement
- [ ] Combinaison filtres fonctionne
- [ ] Pagination fonctionne
- [ ] URL reflète les filtres actifs
- [ ] Responsive mobile OK

## Dépendances
Story 004
