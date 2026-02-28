# Story 001: Setup Next.js + Supabase + Design System

## Epic
Auth & Onboarding

## Estimation
5 points

## Description
En tant que développeur, je veux une base de projet configurée avec Next.js, Supabase, Tailwind et shadcn/ui pour commencer le développement.

## Tâches Techniques

### 1. Initialisation Projet
- [ ] Créer projet Next.js 14+ avec App Router
- [ ] Configurer TypeScript strict
- [ ] Installer et configurer Tailwind CSS

### 2. Design System (shadcn/ui)
- [ ] Initialiser shadcn/ui
- [ ] Installer composants : Button, Input, Card, Select, Dialog, Tabs, Sheet, Badge, Avatar, Toast, Form, Label, Checkbox, Textarea
- [ ] Configurer theme avec palette JamConnect
- [ ] Créer layout principal avec navigation

### 3. Supabase Setup
- [ ] Installer @supabase/supabase-js et @supabase/ssr
- [ ] Créer clients (browser + server)
- [ ] Configurer variables d'environnement
- [ ] Créer .env.example

### 4. Structure Projet
- [ ] Créer dossiers : app/, components/, lib/actions/, lib/hooks/, types/
- [ ] Configurer path aliases (@/components, @/lib, @/types)
- [ ] Setup ESLint + Prettier + Husky

### 5. Tests
- [ ] Build passe sans erreur
- [ ] Page d'accueil s'affiche
- [ ] Supabase client connecté

## Critères d'Acceptation
- [ ] `npm run dev` fonctionne
- [ ] `npm run build` passe
- [ ] Composants shadcn/ui utilisables
- [ ] Variables d'environnement configurées

## Dépendances
Aucune (story initiale)
