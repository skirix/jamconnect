# Story 017: Templates Email

## Epic
Core UX & Platform

## Estimation
2 points

## Description
Créer les templates d'emails transactionnels envoyés par la plateforme.

## Tâches Techniques

### 1. Setup Email Service
- [ ] Configurer Resend API (compte gratuit)
- [ ] Créer service lib/email.ts
- [ ] Template de base (header/logo, footer)

### 2. Template - Contact Reçu
- [ ] Sujet : "Nouveau message de {sender_name}"
- [ ] Header avec logo JamConnect
- [ ] Contenu : Nom expéditeur, message
- [ ] CTA : "Répondre à {email}"
- [ ] Footer avec lien vers plateforme

### 3. Template - Demande Participation
- [ ] Sujet : "Nouvelle demande pour votre jam session"
- [ ] Info session (titre, date)
- [ ] Message du participant
- [ ] CTA : Voir les demandes (lien vers /jams/[id]/participants)

### 4. Template - Participation Confirmée
- [ ] Sujet : "Votre participation est confirmée !"
- [ ] Info session complète
- [ ] Adresse du lieu
- [ ] Contact créateur

### 5. Template - Participation Refusée
- [ ] Sujet : "Votre demande de participation"
- [ ] Message poli de refus
- [ ] Autres sessions suggérées (optionnel)

### 6. Template - Session Annulée
- [ ] Sujet : "Annulation d'une session"
- [ ] Info session annulée
- [ ] Raison si fournie

### 7. Template - Contact Marketplace
- [ ] Sujet : "À propos de votre annonce : {title}"
- [ ] Info annonce
- [ ] Message acheteur
- [ ] Conseil sécurité

### 8. Template - Bienvenue (Optionnel V1)
- [ ] Sujet : "Bienvenue sur JamConnect !"
- [ ] Guide rapide
- [ ] CTA compléter profil

## Critères d'Acceptation
- [ ] Emails envoyés avec bon deliverability
- [ ] Templates responsives
- [ ] Pas dans les spams (DKIM/SPF si domaine perso)
- [ ] Texte alternatif pour clients mail texte

## Dépendances
Story 007, Story 009, Story 012 (où les emails sont déclenchés)
