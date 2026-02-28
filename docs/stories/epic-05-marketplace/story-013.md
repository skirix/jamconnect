# Story 013: Marketplace - Recherche et Fiches

## Epic
Marketplace Matériel

## Estimation
3 points

## Description
Page de recherche d'annonces avec filtres et affichage détaillé des annonces.

## Tâches Techniques

### 1. Page Recherche Marketplace
- [ ] Route /marketplace
- [ ] Grid cards annonces
- [ ] Pagination (24 annonces/page)

### 2. Filtres
- [ ] Toggle type : Vente / Location / Tous
- [ ] Select catégorie
- [ ] Input prix min/max
- [ ] Select ville (Paris/Lille)
- [ ] Tri : Plus récent / Prix croissant / Prix décroissant

### 3. Card Annonce
- [ ] Photo principale
- [ ] Prix (€) avec badge Vente/Location
- [ ] Titre (tronqué si long)
- [ ] Catégorie
- [ ] Ville
- [ ] Date relative ("Il y a 2 jours")

### 4. Fiche Détail Annonce
- [ ] Route /marketplace/[id]
- [ ] Carrousel photos
- [ ] Titre, prix, type
- [ ] Badges catégorie + ville
- [ ] Description complète
- [ ] Section vendeur (mini profil)
- [ ] Warning sécurité ("Ne payez jamais à l'avance")
- [ ] CTA "Contacter le vendeur"

### 5. Contact Vendeur
- [ ] Même système que contact musicien (Story 007)
- [ ] Sujet auto : "À propos de votre annonce [titre]"
- [ ] Email incluant lien vers annonce

### 6. Empty States
- [ ] "Aucune annonce trouvée" + CTA déposer
- [ ] "Cette annonce n'existe plus" si supprimée

## Critères d'Acceptation
- [ ] Recherche avec filtres fonctionne
- [ ] Pagination OK
- [ ] Fiche détail complète
- [ ] Contact vendeur fonctionne
- [ ] Responsive OK

## Dépendances
Story 012, Story 007
