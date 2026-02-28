# Story 016: SEO, Métadonnées et Performance

## Epic
Core UX & Platform

## Estimation
2 points

## Description
Optimisation SEO et performance pour le référencement et l'expérience utilisateur.

## Tâches Techniques

### 1. Metadonnées Globales
- [ ] title template : "%s | JamConnect"
- [ ] meta description site
- [ ] meta keywords (musiciens, jam session, Paris, Lille)
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags

### 2. Metadonnées Dynamiques (Pages Publiques)
- [ ] /musicians/[id] : "{name} - {instruments} | JamConnect"
- [ ] /venues/[id] : "{venue_name} | Lieu de jam | JamConnect"
- [ ] /jams/[id] : "{title} - {date} | JamConnect"
- [ ] /marketplace/[id] : "{title} - {price}€ | JamConnect"

### 3. Sitemap et Robots
- [ ] Generate sitemap.xml (routes publiques)
- [ ] robots.txt (allow public, disallow admin)
- [ ] Canonical URLs

### 4. Structured Data (JSON-LD)
- [ ] Event schema pour jam sessions
- [ ] LocalBusiness schema pour venues
- [ ] Person schema pour profils musiciens
- [ ] Product schema pour marketplace

### 5. Performance
- [ ] Images optimisées (WebP, lazy loading)
- [ ] Font optimization (next/font)
- [ ] Code splitting automatique (Next.js)

### 6. Analytics (Optionnel V1)
- [ ] Vercel Analytics (gratuit)
- [ ] ou Google Analytics (si configuré)

## Critères d'Acceptation
- [ ] Sitemap généré
- [ ] Meta tags dynamiques OK
- [ ] Open Graph valide (test Facebook)
- [ ] Structured data valid (test Google)
- [ ] Lighthouse score > 80

## Dépendances
Story 001, autres stories avec pages publiques
