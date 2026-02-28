# Story 009: Gestion Participations Jam Sessions

## Epic
Jam Sessions

## Estimation
5 points

## Description
Gestion des demandes de participation : système de confirmation pour mode "inscription avec validation" et inscription directe pour mode "public".

## Tâches Techniques

### 1. Table jam_participants
```sql
CREATE TABLE jam_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  jam_session_id uuid REFERENCES jam_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text CHECK (status IN ('pending', 'confirmed', 'rejected', 'cancelled')) DEFAULT 'pending',
  message text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(jam_session_id, user_id)
);
```

### 2. Mode Public
- [ ] Inscription immédiate (status = confirmed)
- [ ] Vérifier places disponibles
- [ ] Toast confirmation
- [ ] Email au créateur (optionnel V1)

### 3. Mode Confirmation
- [ ] Formulaire demande avec message optionnel
- [ ] Status = pending
- [ ] Email au créateur "Nouvelle demande"
- [ ] Page créateur : liste demandes avec actions

### 4. Gestion Créateur
- [ ] Page /jams/[id]/participants
- [ ] Onglets : Confirmés / En attente / Refusés
- [ ] Actions : Confirmer / Refuser chaque demande
- [ ] Email au participant (confirmé/refusé)
- [ ] Compteur places disponibles

### 5. Annulation
- [ ] Créateur peut annuler session
- [ ] Status = cancelled
- [ ] Notification participants

### 6. RLS
- [ ] Participants visibles par membres et créateur
- [ ] Seul créateur peut modifier status

## Critères d'Acceptation
- [ ] Mode public : inscription instantanée
- [ ] Mode confirmation : workflow complet
- [ ] Créateur gère demandes
- [ ] Emails partis (si configuré)
- [ ] Un seul mode par session

## Dépendances
Story 008