# Story 007: Système de Contact Email

## Epic
Découverte Musicale

## Estimation
3 points

## Description
En tant que musicien, je veux contacter un autre musicien par email via la plateforme.

## Tâches Techniques

### 1. Page Contact
- [ ] Route /contact/[userId]
- [ ] Affichage destinataire (photo, nom)
- [ ] Champ sujet
- [ ] Champ message (textarea, max 1000 chars)
- [ ] Protection spam : honeypot champ
- [ ] Rate limiting (max 5 emails/heure par user)

### 2. Server Action sendContact
- [ ] Vérifier rate limit
- [ ] Récupérer email destinataire
- [ ] Envoi via Resend API
- [ ] Template email HTML simple
- [ ] Sauvegarde dans table contact_requests

### 3. Email Template
- [ ] Header avec logo JamConnect
- [ ] Message expéditeur
- [ ] Lien "Répondre" vers son email
- [ ] Footer avec mention "via JamConnect"
- [ ] Aboutissement : pas de réponse ici, l'utilisateur répond directement à l'email

### 4. Notifications Expéditeur
- [ ] Toast confirmation envoi
- [ ] Email de copie à l'expéditeur (optionnel V1)

### 5. Historique (Optionnel V1)
- [ ] Table contact_requests (déjà créée)
- [ ] Page /profile/messages pour voir historique

## Critères d'Acceptation
- [ ] Email envoyé avec succès
- [ ] Rate limit fonctionne
- [ ] Email reçu par destinataire
- [ ] "Répondre" redirige vers email expéditeur
- [ ] Spam protection basique

## Dépendances
Story 003 (auth), Story 006
