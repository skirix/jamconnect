# JamConnect — PRD

## 1. Contexte
Voir BRIEF.md. Focus : MVP web responsive, Lille/Paris, français uniquement.

## 2. Functional Requirements

### FR-01 Auth
- FR-01.1 : Inscription email/password
- FR-01.2 : Connexion
- FR-01.3 : Récupération mot de passe
- FR-01.4 : Déconnexion

### FR-02 Profil Musicien
- FR-02.1 : Pseudo, photo, bio
- FR-02.2 : Instruments (multi) + niveau (débutant→pro)
- FR-02.3 : Styles musicaux (tags)
- FR-02.4 : Localisation (ville + coordonnées GPS)
- FR-02.5 : Rayon de recherche (5-50km)
- FR-02.6 : Disponibilités (jours/heures)

### FR-03 Recherche
- FR-03.1 : Par style musical
- FR-03.2 : Par instrument
- FR-03.3 : Par localisation + rayon
- FR-03.4 : Carte + liste

### FR-04 Jam Sessions (Mode Public)
- FR-04.1 : Créer jam (titre, date, durée, lieu)
- FR-04.2 : Définir style(s) et niveau requis
- FR-04.3 : Nombre max participants
- FR-04.4 : Rejoindre jam (direct, pas d'approbation)
- FR-04.5 : Lister participants
- FR-04.6 : Annuler participation

### FR-05 Contact
- FR-05.1 : Bouton "Contacter" sur profil
- FR-05.2 : Formulaire avec message
- FR-05.3 : Email envoyé (masking)

### FR-06 Notifications Email
- FR-06.1 : Bienvenue
- FR-06.2 : Nouveau contact
- FR-06.3 : Rappel jam (24h avant)

## 3. Non-Functional Requirements

### NFR-01 Performance
- Chargement < 2s
- Recherche géo < 500ms

### NFR-02 Sécurité
- JWT auth
- RLS Supabase
- Validation Zod
- RGPD

### NFR-03 Design
- Responsive (mobile first)
- Dark mode support
- shadcn/ui + Tailwind

## 4. Epics & User Stories

### Epic-01 : Setup & Auth (3 stories)
### Epic-02 : Profil (4 stories)  
### Epic-03 : Recherche (3 stories)
### Epic-04 : Jam Sessions (4 stories)
### Epic-05 : Communication (2 stories)

Total : 16 stories

## 5. Stack
- Next.js 14+ App Router
- TypeScript strict
- Tailwind CSS + shadcn/ui
- Supabase (Auth + DB + Storage)
- Vercel
- Resend (emails)
