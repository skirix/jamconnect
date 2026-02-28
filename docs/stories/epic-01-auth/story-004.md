# Story 004: Profil Musicien CRUD

## Epic
Auth & Onboarding

## Estimation
5 points

## Description
En tant qu'utilisateur connecté, je veux créer et modifier mon profil musicien avec mes instruments, styles et localisation.

## Tâches Techniques

### 1. Formulaire Création Profil
- [ ] Route /profile/create-musician
- [ ] Champs: display_name, bio, city, postal_code
- [ ] Sélection instruments (multi + niveau par instrument)
- [ ] Sélection styles musicaux (multi)
- [ ] Niveau global
- [ ] Upload photo de profil (Storage Supabase)
- [ ] Validation géocodage ville (coordonnées GPS)

### 2. Server Actions
- [ ] createMusicianProfile(data)
- [ ] Utiliser user authentifié (auth.uid())
- [ ] Upload image vers Supabase Storage
- [ ] Insert en base avec RLS

### 3. Page Édition Profil
- [ ] Route /profile/edit
- [ ] Pré-remplissage données existantes
- [ ] Server Action updateMusicianProfile()
- [ ] Gestion suppression photo

### 4. Affichage Profil Public
- [ ] Route /musicians/[id]
- [ ] Récupération données publiques
- [ ] Layout responsive
- [ ] Section bio, instruments, styles
- [ ] Section sessions à venir (lien vers jams)

### 5. Validation
- [ ] display_name: 2-50 caractères
- [ ] city/postal_code: obligatoires
- [ ] instruments: min 1
- [ ] bio: max 500 caractères

## Critères d'Acceptation
- [ ] Création profil fonctionne
- [ ] Upload photo fonctionne
- [ ] Édition fonctionne
- [ ] Profil public s'affiche
- [ ] Données géo stockées pour recherche rayon

## Dépendances
Story 002, 003
