# JamConnect — Product Requirements Document (PRD) V1

## 1. Vue d'Ensemble

### 1.1 Objectif du Produit
Créer la plateforme de référence française pour la mise en relation de musiciens et l'organisation de jam sessions, complétée par un marketplace de matériel.

### 1.2 Public Cible
- **Primaire** : Musiciens amateurs et semi-pro (18-45 ans)
- **Secondaire** : Propriétaires de bars avec scène, salles de répétition

### 1.3 périmètre V1
Zones : Paris et Lille uniquement.

---

## 2. Functional Requirements (FRs)

### FR-1: Authentification
| ID | Requirement | Priorité |
|----|-------------|----------|
| FR-1.1 | Inscription email + mot de passe | P0 |
| FR-1.2 | Connexion email + mot de passe | P0 |
| FR-1.3 | Connexion OAuth (Google) | P1 |
| FR-1.4 | Réinitialisation mot de passe par email | P1 |
| FR-1.5 | Déconnexion | P0 |

### FR-2: Profils Utilisateurs
| ID | Requirement | Priorité |
|----|-------------|----------|
| FR-2.1 | Création profil muscician (instruments, styles, niveau, ville) | P0 |
| FR-2.2 | Upload photo de profil | P1 |
| FR-2.3 | Création profil lieu (nom, type, adresse, équipements, photos) | P0 |
| FR-2.4 | Un utilisateur peut avoir profil musicien ET lieu | P1 |
| FR-2.5 | Modification du profil | P0 |
| FR-2.6 | Suppression du compte (RGPD) | P1 |

**Détail FR-2.1 Profil Musicien**:
- Instruments : sélection multiple + niveau par instrument (débutant/intermédiaire/avancé/pro)
- Styles musicaux : sélection multiple (rock, jazz, blues, funk, metal, classique, électro, etc.)
- Niveau global : échelle 4 niveaux
- Localisation : ville + code postal (géocodage pour recherche rayon)
- Bio : texte libre, 500 caractères max

**Détail FR-2.3 Profil Lieu**:
- Nom du lieu
- Type : bar/scène, salle de répétition, studio, espace privé
- Adresse complète
- Capacité (nombre de musiciens)
- Équipements disponibles : batterie, sono, amplis, micros, etc.
- Photos (max 6)

### FR-3: Recherche Musiciens
| ID | Requirement | Priorité |
|----|-------------|----------|
| FR-3.1 | Recherche par instrument(s) | P0 |
| FR-3.2 | Recherche par style musical | P0 |
| FR-3.3 | Recherche par niveau | P1 |
| FR-3.4 | Recherche par zone géographique (rayon autour d'une ville) | P0 |
| FR-3.5 | Affichage résultats en liste avec photo, nom, instruments, ville | P0 |
| FR-3.6 | Pagination (20 résultats/page) | P1 |

### FR-4: Jam Sessions
| ID | Requirement | Priorité |
|----|-------------|----------|
| FR-4.1 | Création session (titre, description, date/heure, durée) | P0 |
| FR-4.2 | Choix du lieu : adresse perso ou lieu référencé | P0 |
| FR-4.3 | Définition nombre max participants | P0 |
| FR-4.4 | Mode "Inscription avec confirmation" : créateur valide chaque demande | P0 |
| FR-4.5 | Mode "Public" : ouvert à tous, pas de validation | P0 |
| FR-4.6 | Liste des participants visibles par le créateur | P0 |
| FR-4.7 | Demande de participation (avec message optionnel) | P0 |
| FR-4.8 | Acceptation/refus participation par le créateur | P0 |
| FR-4.9 | Annulation session par le créateur | P1 |
| FR-4.10 | Liste des sessions à venir, filtrables par ville | P0 |
| FR-4.11 | Détail d'une session (infos, participants) | P0 |

### FR-5: Lieux (Bars/Salles)
| ID | Requirement | Priorité |
|----|-------------|----------|
| FR-5.1 | Liste des lieux référencés, filtrable par ville | P0 |
| FR-5.2 | Fiche détaillée du lieu (infos, équipements, photos) | P0 |
| FR-5.3 | Affichage des sessions à venir dans ce lieu | P1 |

### FR-6: Messagerie (Light)
| ID | Requirement | Priorité |
|----|-------------|----------|
| FR-6.1 | Envoi email de contact à un musicien | P0 |
| FR-6.2 | Envoi email de contact à propos d'une annonce marketplace | P0 |
| FR-6.3 | Notification email au destinataire | P0 |

### FR-7: Marketplace Matériel
| ID | Requirement | Priorité |
|----|-------------|----------|
| FR-7.1 | Création annonce (titre, description, type: vente/location, catégorie, prix, photos) | P0 |
| FR-7.2 | Catégories : instruments, amplis, pédales, accessoires | P0 |
| FR-7.3 | Recherche annonces avec filtres (catégorie, type, prix, ville) | P0 |
| FR-7.4 | Fiche détaillée annonce | P0 |
| FR-7.5 | Contact vendeur par email | P0 |
| FR-7.6 | Marquer annonce comme vendue/louée | P1 |
| FR-7.7 | Supprimer sa propre annonce | P0 |

---

## 3. Non-Functional Requirements (NFRs)

| ID | Requirement | Critère d'Acceptation |
|----|-------------|----------------------|
| NFR-1 | Performance | Pages < 2s (3G) | 
| NFR-2 | Disponibilité | 99% uptime |
| NFR-3 | Responsive | Mobile-first, breakpoins 640/768/1024/1280px |
| NFR-4 | SEO | SSR pour pages publiques, meta tags dynamiques |
| NFR-5 | Sécurité | RLS Supabase, pas de secrets client-side, HTTPS only |
| NFR-6 | Accessibilité | WCAG 2.1 AA minimum |
| NFR-7 | SEO Local | Structured data pour lieux et événements |

---

## 4. User Flows

### Flow 1: Inscription et Création Profil
1. Landing page → CTA "Rejoindre la communauté"
2. Formulaire inscription (email, password)
3. Email de confirmation (si email/password)
4. Choix type profil : Musicien / Lieu / Les deux
5. Formulaire(s) de profil correspondant(s)
6. Redirection vers page découverte

### Flow 2: Recherche Musicien + Contact
1. Page "Trouver des musiciens"
2. Application filtres (instrument: batterie, style: jazz, ville: Paris, rayon: 10km)
3. Liste des résultats
4. Clic sur profil → Fiche détaillée
5. CTA "Contacter" → Formulaire email
6. Envoi + notification

### Flow 3: Création Jam Session
1. Page "Organiser une session"
2. Formulaire : titre, description, date/heure, durée
3. Choix lieu : mon adresse / sélectionner un lieu référencé
4. Nombre max participants
5. Choix mode : Inscription avec confirmation / Public
6. Publication → Redirection fiche session

### Flow 4: Participation Session
1. Découverte session (liste ou profil créateur)
2. Clic session → Fiche détaillée
3. CTA "Participer" (ou "S'inscrire" selon mode)
4. Si mode confirmation : envoi demande avec message optionnel
5. Si mode public : inscription immédiate
6. Notification email au créateur

### Flow 5: Marketplace
1. Page "Matériel" → Liste annonces
2. Filtres (catégorie, type, prix max, ville)
3. Clic annonce → Fiche (titre, description, prix, photos, localisation)
4. CTA "Contacter le vendeur" → Formulaire
5. Envoi email

---

## 5. Epics et User Stories

### Epic 1: Authentification & Onboarding
**Objectif** : Permettre aux utilisateurs de créer un compte et configurer leur profil.

| Story | Description | Points |
|-------|-------------|--------|
| US-1.1 | En tant que visiteur, je veux créer un compte avec email/password pour accéder à la plateforme | 3 |
| US-1.2 | En tant qu'utilisateur, je veux me connecter avec email/password pour accéder à mon compte | 2 |
| US-1.3 | En tant qu'utilisateur, je veux me connecter avec Google pour simplifier l'accès | 3 |
| US-1.4 | En tant qu'utilisateur, je veux réinitialiser mon mot de passe si je l'oublie | 2 |
| US-1.5 | En tant qu'utilisateur, je veux créer mon profil musicien avec mes instruments, styles et niveau | 5 |
| US-1.6 | En tant qu'utilisateur, je veux créer un profil lieu si je possède un espace | 5 |
| US-1.7 | En tant qu'utilisateur, je veux avoir les deux types de profil si je suis musicien et propriétaire | 3 |
| US-1.8 | En tant qu'utilisateur, je veux modifier mon profil à tout moment | 3 |
| US-1.9 | En tant qu'utilisateur, je veux supprimer mon compte et mes données | 2 |

### Epic 2: Découverte Musicale
**Objectif** : Permettre aux musiciens de trouver des partenaires compatibles.

| Story | Description | Points |
|-------|-------------|--------|
| US-2.1 | En tant que musicien, je veux rechercher d'autres musiciens par instrument | 3 |
| US-2.2 | En tant que musicien, je veux filtrer par style musical | 2 |
| US-2.3 | En tant que musicien, je veux filtrer par niveau | 2 |
| US-