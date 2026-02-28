# Story 005: Profil Lieu (Venue) CRUD

## Epic
Auth & Onboarding

## Estimation
5 points

## Description
En tant que propriétaire de local, je veux créer et gérer la fiche de mon lieu (bar, salle de répétition) avec équipements et photos.

## Tâches Techniques

### 1. Formulaire Création Lieu
- [ ] Route /profile/create-venue
- [ ] Champs: venue_name, venue_type (select), description
- [ ] Adresse complète (rue, code postal, ville)
- [ ] Capacité (nombre de musiciens)
- [ ] Équipements disponibles (multi-checkbox)
- [ ] Upload photos (max 6, Supabase Storage)
- [ ] Géocodage adresse

### 2. Server Actions
- [ ] createVenueProfile(data)
- [ ] Gestion upload multiple images
- [ ] Set user_types.is_venue = true

### 3. Page Édition Lieu
- [ ] Route /profile/edit-venue
- [ ] Pré-remplissage données
- [ ] Ajout/suppression photos
- [ ] updateVenueProfile()

### 4. Affichage Lieu Public
- [ ] Route /venues/[id]
- [ ] Carrousel photos
- [ ] Carte avec localisation
- [ ] Liste équipements (badges)
- [ ] Sessions à venir dans ce lieu

### 5. Liste Mes Lieux
- [ ] Page /profile/venues
- [ ] Liste des lieux de l'utilisateur
- [ ] Liens vers édition

## Critères d'Acceptation
- [ ] Création lieu fonctionne avec photos
- [ ] Édition fonctionne
- [ ] Fiche publique s'affiche
- [ ] Géocodage fonctionne
- [ ] user_types mis à jour

## Dépendances
Story 004
