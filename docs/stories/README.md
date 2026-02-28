# JamConnect - User Stories

Ce dossier contient toutes les User Stories découpées pour le développement de JamConnect V1.

## 📊 Tableau Récapitulatif

| # | Epic | Story | Description | Points | Priorité | Dépendances |
|---|------|-------|-------------|--------|----------|-------------|
| 001 | Auth | Setup Next.js + Supabase + Design System | Initialisation projet, shadcn/ui, Supabase clients | 5 | P0 | - |
| 002 | Auth | Database Schema + RLS Policies | Tables et sécurité Supabase | 5 | P0 | 001 |
| 003 | Auth | Auth Pages (Login/Register) | Pages auth, middleware, logout | 3 | P0 | 001, 002 |
| 004 | Auth | Profil Musicien CRUD | Création, édition, affichage profil musicien | 5 | P0 | 002, 003 |
| 005 | Auth | Profil Lieu (Venue) CRUD | Création, édition, affichage profil lieu | 5 | P0 | 004 |
| 006 | Search | Recherche Musiciens avec Filtres | Page recherche, filtres, géo | 5 | P0 | 004 |
| 007 | Search | Système de Contact Email | Formulaire contact, envoi email | 3 | P1 | 003, 006 |
| 008 | Jams | Création Jam Sessions | Wizard 3 étapes, tables sessions | 5 | P0 | 005 |
| 009 | Jams | Gestion Participations | Mode public vs confirmation | 5 | P0 | 008 |
| 010 | Jams | Découverte Sessions à Venir | Listing, filtres, fiches | 3 | P0 | 008, 009 |
| 011 | Venues | Annuaire et Fiches Lieux | Listing lieux, fiches détaillées | 3 | P0 | 005, 010 |
| 012 | Marketplace | CRUD Annonces | Création, édition, suppression annonces | 5 | P1 | 003 |
| 013 | Marketplace | Recherche et Fiches | Recherche, filtres, fiches annonces | 3 | P1 | 012, 007 |
| 014 | Core UX | Landing Page | Page d'accueil, hero, features | 3 | P0 | 001, 003 |
| 015 | Core UX | Navigation et Layout | Header, nav mobile, layout app | 3 | P0 | 001, 003, 014 |
| 016 | Core UX | SEO et Métadonnées | Sitemap, meta tags, structured data | 2 | P1 | 001 |
| 017 | Core UX | Templates Email | Emails transactionnels | 2 | P1 | 007, 009, 012 |

## 📈 Estimations

| Epic | Stories | Points Total |
|------|---------|--------------|
| epic-01-auth | 5 | 23 |
| epic-02-search | 2 | 8 |
| epic-03-jams | 3 | 13 |
| epic-04-venues | 1 | 3 |
| epic-05-marketplace | 2 | 8 |
| epic-06-core_ux_platform | 4 | 10 |
| **TOTAL** | **17** | **65** |

## 🎯 Priorisation

### P0 - Essentiel (MVP Core)
Stories obligatoires pour avoir un produit fonctionnel :
- **001-005** : Setup + Auth + Profils
- **006** : Recherche musiciens
- **008-011** : Jam sessions + Lieux
- **014-015** : Landing + Navigation

**Total P0 : 12 stories = 45 points**

### P1 - Important (V1 complète)
Fonctionnalités attendues mais non bloquantes :
- **007** : Contact email
- **012-013** : Marketplace complet
- **016-017** : SEO + Emails

**Total P1 : 5 stories = 15 points**

### P2 - Nice to have (V1.5)
Améliorations post-lancement :
- Analytics avancés
- Notifications push
- Chat temps réel
- Système notation

## 🔗 Dépendances Clés

```
001 (Setup)
  └── 002 (DB Schema)
        └── 003 (Auth Pages)
              ├── 004 (Profil Musicien)
              │     ├── 005 (Profil Lieu)
              │     │     └── 008 (Create Jam)
              │     │           ├── 009 (Participations)
              │     │           └── 011 (Venues)
              │     └── 006 (Search)
              │           └── 007 (Contact)
              │                 └── 017 (Email Templates)
              ├── 012 (Marketplace CRUD)
              │     └── 013 (Marketplace Search)
              └── 014 (Landing)
                    └── 015 (Navigation)
                          └── 016 (SEO)
```

## 📁 Structure

```
docs/stories/
├── epic-01-auth/
│   ├── story-001.md
│   ├── story-002.md
│   ├── story-003.md
│   ├── story-004.md
│   └── story-005.md
├── epic-02-search/
│   ├── story-006.md
│   └── story-007.md
├── epic-03-jams/
│   ├── story-008.md
│   ├── story-009.md
│   └── story-010.md
├── epic-04-venues/
│   └── story-011.md
├── epic-05-marketplace/
│   ├── story-012.md
│   └── story-013.md
├── epic-06-core_ux_platform/
│   ├── story-014.md
│   ├── story-015.md
│   ├── story-016.md
│   └── story-017.md
└── README.md (ce fichier)
```

---

**Date** : 2026-02-28
**Version** : V1.0
