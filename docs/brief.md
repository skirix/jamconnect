# JamConnect — Brief Projet V1

## 1. Problème et Opportunité

### Le Problème
En France, les musiciens amateurs et semi-professionnels font face à plusieurs freins :
- **Difficulté à trouver des partenaires compatibles** : pas de moyen simple de trouver un batteur amateur de jazz à Lille ou un guitariste rock à Paris
- **Accès limité aux espaces de répétition** : les salles sont dispersées, mal référencées, et les réservations complexes
- **Jam sessions informelles** : difficiles d'organiser spontanément une session entre musiciens
- **Frictions matérielles** : acheter/vendre/louer du matériel reste compliqué et peu sécurisé (Le Bon Coin, Facebook Marketplace)

### L'Opportunité
Une plateforme dédiée combinant **mise en relation**, **gestion de sessions** et **marketplace matériel** pourrait devenir le référent francophone des musiciens actifs. Le marché est fragmenté, pas de leader national établi.

---

## 2. Personas

### Persona 1: Le Musicien Actif (Julien, 32 ans)
- **Profil** : Batteur amateur, niveau intermédiaire, habite à Paris 11ème
- **Besoins** : 
  - Trouver des musiciens pour monter un groupe (base de musiciens compétents et motivés)
  - Participer à des jam sessions régulières
  - Louer parfois un ampli de basse pour des concerts
- **Pain points** : Les annonces Facebook sont inactives, pas de filtre géo sur les forums, pas de confiance dans les transactions matériel
- **Objectifs sur JamConnect** : Constituer un réseau fiable, trouver des sessions proches

### Persona 2: Le Propriétaire de Local (Sophie, 45 ans)
- **Profil** : Gère une salle de répétition à Lille (capacité 20 personnes, équipée batterie + PA)
- **Besoins** :
  - Augmenter sa taux d'occupation en semaine (lenteurs actuelles)
  - Proposer ses locaux pour des jam sessions hosted
  - Voir son local référencé dans un annuaire fiable
- **Pain points** : Sous-réservation en semaine, pas de canal dédié musique
- **Objectifs sur JamConnect** : Booster la fréquentation, gérer les réservations

### Persona 3: L'Hybride (Marc, 28 ans)
- **Profil** : Guitariste amateur ET possède un garage équipé (sono, amplis) où il accueille des jams
- **Besoins** :
  - En tant que musicien : trouver bassiste et batteur
  - En tant qu'hôte : proposer son espace pour des sessions
  - Vendre des pédales d'occasion
- **Pain points** : Gérer deux identités (musicien vs hôte), trouver du monde rapidement
- **Objectifs sur JamConnect** : Centraliser ses deux activités, fluidifier l'organisation

---

## 3. Fonctionnalités V1 (Scope IN)

### 3.1 Authentification & Profils
- [ ] **Création de compte** : Email ou OAuth (Google)
- [ ] **Profil Musicien** :
  - Photo, nom/pseudo
  - Instruments joués (multi-sélection avec niveau par instrument)
  - Styles musicaux (multi-sélection)
  - Niveau global (débutant, intermédiaire, avancé, pro)
  - Localisation (ville + code postal)
  - Bio/description
- [ ] **Profil Propriétaire de Local** :
  - Nom du lieu
  - Type (salle de répétition, bar/event, espace privé...)
  - Capacité
  - Équipements disponibles
  - Adresse complète
  - Photos
- [ ] **Profil Hybride** : Un utilisateur peut avoir les deux types de profil

### 3.2 Recherche de Musiciens
- [ ] **Recherche filtrée** :
  - Par instrument(s)
  - Par style musical
  - Par niveau
  - Par zone géographique (rayon autour d'une ville)
- [ ] **Résultats visuels** : Cartes avec photo, instruments, ville, niveau

### 3.3 Jam Sessions
- [ ] **Création de session** :
  - Titre, description
  - Date et heure
  - Lieu : chez un musicien ou dans un local référencé
  - Nombre max de participants
  - **Mode 1 - Inscription Contrôlée** : créateur valide chaque demande
  - **Mode 2 - Annonce Publique** : open bar, premier arrivé premier servi
- [ ] **Gestion participations** :
  - Liste des inscrits
  - Confirmation/refus par le créateur (mode 1)
  - Statut des participants (en attente, confirmé, refusé)
- [ ] **Liste des sessions** : Découverte des sessions à venir par zone géographique

### 3.4 Messagerie (Light)
- [ ] **Demande de contact** : Formulaire email via la plateforme (pas de chat temps réel V1)
- [ ] **Notification email** : L'utilisateur reçoit un mail avec le message

### 3.5 Marketplace Matériel
- [ ] **Création d'annonce** :
  - Type : Vente ou Location
  - Catégorie : Instruments, Amplis, Pédales, Accessoires
  - Titre, description, photos
  - Prix
  - Localisation
- [ ] **Recherche d'annonces** :
  - Filtres par type, catégorie, prix, localisation
- [ ] **Mise en relation** : Contacter le vendeur via email (même système que messagerie)

### 3.6 Géographie V1
- [ ] **Zones couvertes initialement** : Paris et Lille
- [ ] **Détection automatique** : Saisie ville + géocodage pour la recherche rayon

---

## 4. Scope OUT (V2+)

Les fonctionnalités suivantes sont explicitement exclues de V1 :

- ❌ Paiement intégré (marketplace : pas de transaction inline, juste mise en relation)
- ❌ Chat temps réel (que du contact email V1)
- ❌ Application mobile native (web responsive uniquement)
- ❌ Notifications push (email uniquement)
- ❌ Système de notation/avis (V1 sans réputation)
- ❌ Système d'abonnement premium
- ❌ Intégration calendrier externe (Google/Outlook)
- ❌ Autres villes que Paris/Lille (étendue V2)
- ❌ Streaming/audio (partage de morceaux, démos)
- ❌ Gestion de groupe/band structurée
- ❌ Modération avancée/reports

---

## 5. Hypothèses

| ID | Hypothèse | Validation |
|----|-----------|------------|
| H1 | Les musiciens sont prêts à créer un profil détaillé (instruments, styles) | Test beta avec 20 utilisateurs |
| H2 | La géolocalisation est un critère de recherche prioritaire | Analytics sur les filtres utilisés |
| H3 | Les propriétaires de locaux utiliseront la plateforme sans commission | Entretiens avec 5 propriétaires à Lille/Paris |
| H4 | Le marketplace matériel générera du trafic qualifié | Nombre d'annonces créées dans les 30 premiers jours |
| H5 | Le mode "annonce publique" sera utilisé pour les jams spontanées | % de sessions créées en mode public |

---

## 6. Risques Principaux

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| R1 | Effet réseau faible (pas assez de musiciens pour créer des sessions) | Élevée | Élevée | Lancer avec une stratégie locale concentrée (Paris+Lille), inviter proactivement des groupes existants |
| R2 | Adoption faible des propriétaires de locaux | Moyenne | Moyenne | V1 sans commission pour attirer, créer des fiches locaux nous-mêmes |
| R3 | Abandon des utilisateurs après inscription | Moyenne | Moyenne | Parcours onboarding guidé, relance email si inactivité |
| R4 | Fraude sur marketplace (arnaques) | Moyenne | Haute | Mention "mise en relation uniquement", disclaimer responsabilité, guide anti-arnaques |
| R5 | Concurrence d'un groupe Facebook local actif | Moyenne | Moyenne | Différenciation via marketplace + fiches profils structurées + UX supérieure |

---

## 7. Métriques de Succès (V1)

### Métriques North Star
- **MAU (Monthly Active Users)** > 200 à 3 mois
- **Jam sessions créées** > 30 par mois
- **Profils musiciens complets** > 100

### Métriques Engagement
- Taux de complétion profil > 70%
- Sessions créées / utilisateurs actifs > 15%
- Nombre d'annonces marketplace > 50

### Métriques Qualité
- Taux de match session (demandes confirmées) > 50%
- NPS des utilisateurs beta > 7/10

---

## 8. Questions de Clarification

1. **Démarrage** : As-tu déjà identifié des groupes de musiciens à Paris/Lille pour lancer la beta, ou dois-je prévoir une stratégie d'acquisition ?

2. **Marketplace** : Veux-tu prendre une commission sur les transactions (pas de paiement intégré V1 donc sur l'honneur) ou rester 100% gratuit sur le modèle Le Bon Coin ?

3. **Priorité MVP** : Si on doit faire des sacrifices de scope en cas de retard, qu'est-ce qui est incompressible (ex: marketplace vs jam sessions) ?