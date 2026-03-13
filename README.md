# JamConnect

Plateforme de connexion pour musiciens - Trouvez des musiciens, formez des groupes, organisez des jams.

## Stack Technique

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Langage**: TypeScript (strict mode)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Backend/Auth**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: pnpm

## Getting Started

### Prérequis

- Node.js 18+
- pnpm
- Compte Supabase

### Installation

```bash
# Cloner le repo
git clone https://github.com/skirix/jamconnect.git
cd jamconnect

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Remplir avec vos clés Supabase

# Lancer le serveur de développement
pnpm dev
```

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

## Structure du Projet

```
jamconnect/
├── app/              # Routes Next.js App Router
├── components/       # Composants React
│   └── ui/          # Composants shadcn/ui
├── lib/             # Utilitaires (cn, etc.)
├── types/           # Types TypeScript
├── public/          # Assets statiques
└── ...
```

## Variables d'Environnement

| Variable | Description | Requis |
|----------|-------------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase | Oui |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anonyme Supabase | Oui |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role (server-side) | Non |

## License

MIT
