# JamConnect - Roadmap de Développement

## 🎯 Vision
Plateforme communautaire française de mise en relation de musiciens et d'organisation de jam sessions.

## 📅 Planning

### Phase 1 : Fondations (Sprint 1)
**Durée** : 2-3 semaines
**Objectif** : Base technique + Auth + Profils

| Story | Description | Jours estimés |
|-------|-------------|---------------|
| 001 | Setup Next.js + Supabase + Design System | 1-2 |
| 002 | Database Schema + RLS Policies | 1-2 |
| 003 | Auth Pages (Login/Register) | 1 |
| 004 | Profil Musicien CRUD | 2-3 |
| 005 | Profil Lieu (Venue) CRUD | 2 |

**Livrable** : Authentification fonctionnelle, création profils, pas de page publique encore.

---

### Phase 2 : Découverte (Sprint 2)
**Durée** : 2 semaines
**Objectif** : Recherche musiciens + Landing page

| Story | Description | Jours estimés |
|-------|-------------|---------------|
| 014 | Landing Page | 2 |
| 015 | Navigation et Layout | 2 |
| 006 | Recherche Musiciens avec Filtres | 2-3 |
| 007 | Système de Contact Email | 1-2 |

**Livrable** : Site public accessible, recherche musiciens, formulaire contact, premier feedback utilisateur possible.

---

### Phase 3 : Jam Sessions (Sprint 3)
**Durée** : 2-3 semaines
**Objectif** : Cœur du produit - création et gestion des sessions

| Story | Description | Jours estimés |
|-------|-------------|---------------|
| 008 | Création Jam Sessions | 2-3 |
| 009 | Gestion Participations | 2-3 |
| 010 | Découverte Sessions à Venir | 1-2 |
| 011 | Annuaire et Fiches Lieux | 1-2 |

**Livrable** : Jam sessions fonctionnelles (création, participation, gestion), annuaire des lieux. **MVP CORE COMPLET.**

---

### Phase 4 : Marketplace (Sprint 4)
**Durée** : 2 semaines
**Objectif** : Monétisation et valeur ajoutée

| Story | Description | Jours estimés |
|-------|-------------|---------------|
| 012 | Marketplace - CRUD Annonces | 2-3 |
| 013 | Marketplace - Recherche et Fiches | 1-2 |

**Livrable** : Marketplace matériel complet. **V1 COMPLÈTE.**

---

### Phase 5 : Polish & Lancement (Sprint 5)
**Durée** : 1-2 semaines
**Objectif** : Qualité, SEO, emails

| Story | Description | Jours estimés |
|-------|-------------|---------------|
| 016 | SEO et Métadonnées | 1 |
| 017 | Templates Email | 1-2 |
| - | Tests end-to-end | 2 |
| - | Correction bugs | 2 |
| - | Déploiement production | 1 |

**Livrable** : Production-ready, monitoring, analytics.

---

## 📊 Timeline Globale

```
Semaine :  1  2  3  4  5  6  7  8  9  10 11 12
           ├─────┤
           Sprint 1 : Fondations
                  ├────┤
                  Sprint 2 : Découverte
                        ├───────┤
                        Sprint 3 : Jam Sessions
                                  ├────┤
                                  Sprint 4 : Marketplace
                                        ├────┤
                                        Sprint 5 : Polish & Launch
```

**Total** : ~10-12 semaines (2.5-3 mois) à rythme soutenable.

---

## 🚀 Points de Décision

### Go/No-Go après Sprint 2
- Objectif : 50+ profils musiciens créés en beta
- Si OK → Continuer vers jam sessions
- Si KO → Ajuster positionnement ou abandon

### Go/No-Go après Sprint 3 (MVP Core)
- Objectif : 10+ sessions organisées
- Si OK → Ajouter marketplace
- Si KO → Se concentrer sur adoption avant monetisation

---

## 🎯 Métriques de Validation par Phase

| Phase | Métrique | Cible |
|-------|----------|-------|
| Sprint 1 | Build passe + Auth OK | 100% |
| Sprint 2 | Beta testers inscrits | 20+ |
| Sprint 3 | Sessions créées | 10+ |
| Sprint 4 | Annonces marketplace | 20+ |
| Sprint 5 | MAU total | 200+ |

---

## 🔧 Ressources Nécessaires

### Infrastucture (coût mensuel)
- Supabase Free Tier : $0
- Vercel Hobby : $0
- Resend (emails) : $0 (100/jour)
- **Total** : $0/mois

### Domaine (optionnel)
- jamconnect.app ou jamconnect.fr : ~10-15€/an

### Temps de Développement
- 1 développeur fullstack : ~10-12 semaines
- Ou Claude Code / agent : stories 001-017 en parallèle/rafale

---

## 📝 Checklist Pré-Lancement

- [ ] Tests manuels de tous les parcours
- [ ] Responsive testé sur mobile
- [ ] Emails arrivent (pas spam)
- [ ] Supabase RLS audité
- [ ] .env.example à jour (pas de secrets)
- [ ] README.md avec screenshot
- [ ] Analytics configuré
- [ ] Uptime Robot monitoring

---

**Date de création** : 2026-02-28
**Version** : 1.0
**Prochaine mise à jour** : Après validation Sprint 1
