# Story 003: Auth Pages (Login / Register)

## Epic
Auth & Onboarding

## Estimation
3 points

## Description
En tant que visiteur, je veux pouvoir créer un compte et me connecter avec email/mot de passe.

## Tâches Techniques

### 1. Page Register
- [ ] Créer route /register
- [ ] Formulaire avec email, password, confirm_password
- [ ] Validation Zod
- [ ] Integration Supabase auth.signUp()
- [ ] Gestion erreurs (email déjà utilisé, password faible)
- [ ] Redirection après succès

### 2. Page Login
- [ ] Créer route /login
- [ ] Formulaire email/password
- [ ] Integration Supabase auth.signInWithPassword()
- [ ] "Remember me" (optionnel V1)
- [ ] Lien "Mot de passe oublié"

### 3. Page Forgot Password
- [ ] Formulaire email
- [ ] Integration auth.resetPasswordForEmail()
- [ ] Page de confirmation envoyée

### 4. Middleware Auth
- [ ] Créer middleware Next.js
- [ ] Protection routes /profile/*, /jams/new, etc.
- [ ] Redirection vers /login si non authentifié

### 5. Logout
- [ ] Fonction logout dans navigation
- [ ] Suppression session
- [ ] Redirection homepage

## Critères d'Acceptation
- [ ] Inscription fonctionne (vérif email optionnel V1)
- [ ] Connexion fonctionne
- [ ] Reset password envoie email
- [ ] Routes protégées redirigent si non logué
- [ ] Logout fonctionne

## Dépendances
Story 001, 002
