# Story 005: Profil Lieu (Venue) CRUD

## Epic
Auth & Onboarding

## Estimation
5 points

## Description
En tant que propriétaire de local, je veux créer et gérer la fiche de mon lieu (bar, salle de répétition) avec équipements et photos.

## Tâches Techniques

### 1. Formulaire Création Lieu
- [x] Route /profile/create-venue
- [x] Champs: venue_name, venue_type (select), description
- [x] Adresse complète (rue, code postal, ville)
- [x] Capacité (nombre de musiciens)
- [x] Équipements disponibles (multi-checkbox)
- [x] Upload photos (max 6, Supabase Storage)
- [x] Géocodage adresse

### 2. Server Actions
- [x] createVenueProfile(data)
- [x] Gestion upload multiple images
- [x] Set user_types.is_venue = true

### 3. Page Édition Lieu
- [x] Route /profile/edit-venue
- [x] Pré-remplissage données
- [x] Ajout/suppression photos
- [x] updateVenueProfile()

### 4. Affichage Lieu Public
- [x] Route /venues/[id]
- [x] Carrousel photos
- [x] Carte avec localisation
- [x] Liste équipements (badges)
- [ ] Sessions à venir dans ce lieu (dépend des stories Jam Sessions)

### 5. Liste Mes Lieux
- [x] Page /profile/venues
- [x] Liste des lieux de l'utilisateur
- [x] Liens vers édition

## Critères d'Acceptation
- [x] Création lieu fonctionne avec photos
- [x] Édition fonctionne
- [x] Fiche publique s'affiche
- [x] Géocodage fonctionne
- [x] user_types mis à jour
- [x] Carte interactive sur fiche publique

## Commit
`c8c1469` - feat: complete story 005 - venue profile geocoding and map

## Dépendances
Story 004
