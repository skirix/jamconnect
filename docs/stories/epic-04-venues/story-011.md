# Story 011: Annuaire et Fiches Lieux

## Epic
Découverte des Lieux

## Estimation
3 points

## Description
Page de découverte des bars et salles de répétition avec leurs équipements et sessions à venir.

## Tâches Techniques

### 1. Page Listing Lieux
- [ ] Route /venues
- [ ] Liste venues par ville (Paris/Lille)
- [ ] Filtre par type (bar/scène, salle répète)
- [ ] Grid cards responsive

### 2. Card Lieu
- [ ] Photo principale
- [ ] Nom du lieu
- [ ] Type + ville
- [ ] Capacité + nbr équipements
- [ ] Badge "Session aujourd'hui" si applicable

### 3. Fiche Détail Lieu
- [ ] Route /venues/[id]
- [ ] Carrousel photos
- [ ] Header : Nom, type, adresse
- [ ] Carte Google/Leaflet (embed avec marker)
- [ ] Section équipements (grille badges)
- [ ] Description

### 4. Sessions dans Lieu
- [ ] Section "Sessions à venir"
- [ ] Liste mini cards (titre, date, places)
- [ ] Lien vers fiche session
- [ ] Empty state si aucune

### 5. CTA
- [ ] "Voir toutes les sessions ici" → filtre jams par venue
- [ ] "Contacter" (si email public) ou "Voir profil propriétaire"

## Critères d'Acceptation
- [ ] Listing lieux filtrable
- [ ] Fiche détail complète
- [ ] Carte affichée
- [ ] Sessions liées visibles
- [ ] Responsive OK

## Dépendances
Story 005, Story 010
