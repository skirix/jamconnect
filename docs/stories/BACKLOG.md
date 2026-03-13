# JamConnect — Backlog MVP

## Résumé Stories

| Epic | Stories | Points | Status |
|------|---------|--------|--------|
| 01 - Auth | 6 | M-M-S-S-XS = 13 | 🟡 1/6 done |
| 02 - Profil | 5 | M-S-L-M-M = 18 | ⚪ 0/5 |
| 03 - Recherche | 4 | S-M-L-S = 12 | ⚪ 0/4 |
| 04 - Jams | 5 | M-M-M-L-S = 17 | ⚪ 0/5 |
| 05 - Contact | 4 | S-M-S-M = 10 | ⚪ 0/4 |
| **Total** | **24** | **~70 points** | **🟡 4%** |

## Définition of Done (DoD)

Pour chaque story :
- [ ] Code écrit et typé
- [ ] Tests manuels passent
- [ ] Pas d'erreurs console
- [ ] Responsive vérifié
- [ ] Commit conventionnel (`feat:`, `fix:`, etc.)
- [ ] Push sur GitHub

## Ordre de développement recommandé

1. **Epic-01** (Auth) → Bloquant pour tout le reste
2. **Epic-02 Story 2.1** (DB Profils) → Bloquant
3. **Epic-02 Story 2.3** (Setup Profil) → Bloquant
4. **Epic-04 Story 4.1** (DB Jams) → Bloquant
5. Le reste peut être parallélisé

## MVP Scope Freeze

**In MVP** :
- Auth email/password
- Profil musicien complet
- Recherche geo + filtres
- Jam sessions mode public
- Contact email simple

**Post-MVP** :
- Profils locaux (bars/salles)
- Mode "inscription obligatoire"
- Chat temps réel
- App mobile
- Marketplace
