# Story 012: Marketplace - CRUD Annonces

## Epic
Marketplace Matériel

## Estimation
5 points

## Description
Système de création, modification et suppression d'annonces matériel (instruments, amplis, pédales).

## Tâches Techniques

### 1. Table listings
```sql
CREATE TABLE listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid REFERENCES auth.users(id) NOT NULL,
  type text CHECK (type IN ('sale', 'rental')) NOT NULL,
  category text CHECK (category IN ('instruments', 'amps', 'pedals', 'accessories', 'other')) NOT NULL,
  title text NOT NULL,
  description text,
  price_cents int NOT NULL,
  city text NOT NULL,
  photos jsonb DEFAULT '[]',
  status text CHECK (status IN ('active', 'sold', 'reserved', 'cancelled')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 2. Création Annonce
- [ ] Route /marketplace/new
- [ ] Select type (vente/location)
- [ ] Select catégorie
- [ ] Input titre (5-100 chars)
- [ ] Textarea description (20-2000 chars)
- [ ] Input prix EUR
- [ ] Input ville
- [ ] Upload photos (1-5, Supabase Storage)
- [ ] Preview avant publication

### 3. Server Actions
- [ ] createListing(data) - insert avec RLS
- [ ] updateListing(id, data)
- [ ] deleteListing(id) - soft ou hard delete
- [ ] markAsSold(id) - status = sold

### 4. Gestion Mes Annonces
- [ ] Page /profile/listings
- [ ] Liste mes annonces (actives, vendues, toutes)
- [ ] Actions rapides : Modifier, Marquer vendue, Supprimer
- [ ] Alert confirmation avant suppression

### 5. Validation
- [ ] Prix > 0
- [ ] Min 1 photo
- [ ] Ville reconnue
- [ ] Uniquement annonces actives dans listing public

## Critères d'Acceptation
- [ ] Création annonce avec photos OK
- [ ] Édition fonctionne
- [ ] Suppression fonctionne
- [ ] Marquer vendu fonctionne
- [ ] Mes annonces listées correctement

## Dépendances
Story 003 (auth)
