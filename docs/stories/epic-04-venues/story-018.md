# Story 018: Dashboard Propriétaire de Lieu

## Epic
Découverte des Lieux

## Estimation
3 points

## Description
En tant que propriétaire de bar/salle, je veux un espace dédié pour voir et gérer les sessions programmées dans mon lieu.

## Tâches Techniques

### 1. Dashboard Vue d'Ensemble
- [ ] Route /profile/venue-dashboard
- [ ] Accessible uniquement si user a venue_profiles
- [ ] Cards statistiques :
  - Nombre de lieux gérés
  - Sessions à venir ce mois
  - Sessions passées (total)
  - Nombre total de participants (cumulative)

### 2. Gestion des Sessions dans Mes Lieux
- [ ] Liste des sessions à venir (tous mes lieux)
  - Trier par date
  - Filtre par lieu (si plusieurs)
- [ ] Pour chaque session : titre, date, nombre confirmés, créateur
- [ ] Lien vers détail session
- [ ] Contact créateur (email rapide)

### 3. Calendrier/Simple Vue (Optionnel V1)
- [ ] Vue liste chronologique
- [ ] Ou mini calendrier avec dots sur les dates

### 4. Paramètres du Lieu
- [ ] Accès rapide à l'édition des fiches lieu
- [ ] Gestion des photos

### 5. Notifications (Optionnel V1)
- [ ] Badge "Nouvelle session dans votre lieu"
- [ ] Email récap quotidien/hebdo des sessions à venir

## Critères d'Acceptation
- [ ] Dashboard accessible aux propriétaires uniquement
- [ ] Liste sessions à venir complète
- [ ] Stats affichées correctement
- [ ] Navigation vers édition lieu fonctionne
- [ ] Responsive OK

## Dépendances
Story 005, Story 009, Story 010
