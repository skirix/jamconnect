# Epic-01 : Auth & Onboarding

## Story 1.1 — Setup Projet ✅ DONE
**Priority**: Must | **Estimate**: M | **Status**: Complete

**Tasks**:
- [x] Créer repo GitHub "jamconnect"
- [x] Init Next.js 14 avec TypeScript strict
- [x] Configurer Tailwind CSS + shadcn/ui
- [x] Installer dépendances (supabase, lucide-react)
- [x] Créer structure dossiers
- [x] Premier commit + push

**AC**:
- [x] Projet démarre en local
- [x] Build passe
- [x] Repo visible sur GitHub

---

## Story 1.2 — Config Supabase Auth
**Priority**: Must | **Estimate**: M | **Status**: TODO

**Context**:
Setup authentification email/password avec Supabase Auth.

**Tasks**:
- [ ] Créer projet Supabase "jamconnect"
- [ ] Configurer Auth (email/password, confirmation email désactivé pour MVP)
- [ ] Générer types TypeScript : `supabase gen types`
- [ ] Créer `lib/supabase/client.ts` (browser client)
- [ ] Créer `lib/supabase/server.ts` (server client)
- [ ] Créer `lib/supabase/middleware.ts` (session refresh)
- [ ] Créer `middleware.ts` à la racine
- [ ] Créer `app/auth/callback/route.ts` (OAuth callback)
- [ ] Créer `app/auth/confirm/route.ts` (email confirmation)
- [ ] Mettre à jour `.env.local` avec les clés

**AC**:
- [ ] Types Supabase générés et à jour
- [ ] Middleware gère les sessions
- [ ] Variables d'environnement configurées

---

## Story 1.3 — AuthProvider Context
**Priority**: Must | **Estimate**: S | **Status**: TODO

**Context**:
Context React pour gérer l'état d'authentification global.

**Tasks**:
- [ ] Créer `app/providers.tsx`
- [ ] Créer `components/auth-provider.tsx`
- [ ] Exposer `user`, `session`, `signIn`, `signUp`, `signOut`
- [ ] Wrap le layout avec le provider

**AC**:
- [ ] Auth state accessible partout
- [ ] Hook `useAuth` fonctionnel
- [ ] Refresh automatique du token

---

## Story 1.4 — Page Login
**Priority**: Must | **Estimate**: S | **Status**: TODO

**Context**:
Page de connexion avec formulaire.

**Tasks**:
- [ ] Créer `app/(auth)/login/page.tsx`
- [ ] Formulaire email/password
- [ ] Validation Zod
- [ ] Gestion erreurs (credentials invalides)
- [ ] Lien vers signup
- [ ] Redirection vers `/search` après login

**AC**:
- [ ] Design cohérent avec shadcn/ui
- [ ] Feedback erreurs visuel
- [ ] Responsive mobile

---

## Story 1.5 — Page Signup
**Priority**: Must | **Estimate**: S | **Status**: TODO

**Context**:
Page d'inscription.

**Tasks**:
- [ ] Créer `app/(auth)/signup/page.tsx`
- [ ] Formulaire email/password/confirm password
- [ ] Validation Zod (password min 8 chars)
- [ ] Gestion erreurs (email existant)
- [ ] Lien vers login
- [ ] Redirection vers `/profile/setup` après signup

**AC**:
- [ ] Validation côté client + serveur
- [ ] Message succès après création
- [ ] Redirection setup profil

---

## Story 1.6 — Layout Auth
**Priority**: Must | **Estimate**: XS | **Status**: TODO

**Context**:
Layout minimaliste sans nav pour les pages auth.

**Tasks**:
- [ ] Créer `app/(auth)/layout.tsx`
- [ ] Design centré, fond neutre
- [ ] Logo JamConnect cliquable (retour home)

**AC**:
- [ ] Pas de navbar sur ces pages
- [ ] Design cohérent
