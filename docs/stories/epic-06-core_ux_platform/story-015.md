# Story 015: Navigation et Layout Application

## Epic
Core UX & Platform

## Estimation
3 points

## Description
Système de navigation cohérent sur toutes les pages : header, navigation mobile, layout authentifié vs public.

## Tâches Techniques

### 1. Layout Principal (Authenticated)
- [ ] Component layout.tsx avec navigation
- [ ] Header sticky avec logo + nav
- [ ] Navigation responsive :
  - Desktop : links horizontaux
  - Mobile : bottom tabs + hamburger
- [ ] Footer global

### 2. Navigation Items
- [ ] Musiciens (/musicians)
- [ ] Lieux (/venues)
- [ ] Sessions (/jams)
- [ ] Marketplace (/marketplace)
- [ ] Profil (/profile) - dropdown ou direct

### 3. Bottom Navigation (Mobile)
- [ ] 5 items avec icones :
  - 🔍 Recherche
  - 🎸 Musiciens
  - 📅 Sessions
  - 🏪 Marketplace
  - 👤 Profil
- [ ] Active state visuel

### 4. User Menu
- [ ] Dropdown (desktop) ou Sheet (mobile)
- [ ] Items : Mon profil, Mes sessions, Mes annonces, Paramètres, Déconnexion

### 5. Breadcrumbs (Optionnel V1)
- [ ] Sur fiches détaillées : Accueil > Musiciens > Julien
- [ ] Navigation hiérarchique

### 6. Loading States
- [ ] Skeleton pour contenu en chargement
- [ ] Spinner pour actions

## Critères d'Acceptation
- [ ] Navigation présente sur toutes les pages
- [ ] Mobile : bottom nav OK
- [ ] Desktop : top nav OK
- [ ] Menu utilisateur fonctionnel
- [ ] Responsive breakpoints respectés

## Dépendances
Story 001, Story 003, Story 014
