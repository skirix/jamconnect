# Story 010: Découverte Sessions à Venir

## Epic
Jam Sessions

## Estimation
3 points

## Description
Page de découverte des jam sessions à venir avec filtres par ville et date.

## Tâches Techniques

### 1. Page Listing Sessions
- [ ] Route /jams
- [ ] Liste sessions à venir (scheduled_at > now())
- [ ] Tri par date croissante
- [ ] Grid cards responsive

### 2. Filtres
- [ ] Select ville (Paris, Lille)
- [ ] Date range picker (optionnel V1: juste aujourd'hui/cette semaine)
- [ ] Checkbox "Mode public uniquement"
- [ ] Reset filtres

### 3. Card Session
- [ ] Titre session
- [ ] Date/heure formatée (relatif : "Aujourd'hui", "Demain", ou date)
- [ ] Lieu (nom ou adresse courte)
- [ ] Créateur (mini avatar + nom)
- [ ] Nombre participants / max
- [ ] Badge mode (Public / Confirmation)
- [ ] CTA "Voir détails"

### 4. Fiche Détail Session
- [ ] Route /jams/[id]
- [ ] Toutes les infos session
- [ ] Section lieu (lien vers venue si applicable)
- [ ] Section créateur (lien profil)
- [ ] Section participants (avatars confirmés)
- [ ] CTA participation selon statut

### 5. Empty States
- [ ] "Aucune session à venir à [ville]"
- [ ] CTA "Organiser une session"

## Critères d'Acceptation
- [ ] Liste sessions à venir s'affiche
- [ ] Filtres fonctionnent
- [ ] Cards informatives
- [ ] Fiche détail complète
- [ ] Responsive OK

## Dépendances
Story 008, 009
