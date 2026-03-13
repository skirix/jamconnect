# JamConnect — Architecture

## Stack
| Couche | Techno |
|--------|--------|
| Frontend | Next.js 14 (App Router) |
| Langage | TypeScript 5.x strict |
| Styling | Tailwind 3.4 + shadcn/ui |
| Backend | Supabase |
| DB | PostgreSQL 15 + PostGIS |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Email | Resend |
| Deploy | Vercel |

## Database Schema

### profiles
```sql
id uuid pk
username text unique
full_name text
avatar_url text
bio text
location text
latitude float
longitude float
search_radius_km int default 10
availability jsonb
created_at timestamptz
```

### musician_profiles
```sql
id uuid pk
profile_id uuid -> profiles
instruments text[]
styles text[]
level text enum
```

### jam_sessions
```sql
id uuid pk
organizer_id uuid -> profiles
title text
description text
styles text[]
level text
date timestamptz
duration_minutes int
venue_type text
address text
latitude float
longitude float
max_participants int
created_at timestamptz
```

### jam_participants
```sql
id uuid pk
jam_id uuid -> jam_sessions
profile_id uuid -> profiles
joined_at timestamptz
```

### contact_requests
```sql
id uuid pk
from_profile_id uuid
to_profile_id uuid
message text
created_at timestamptz
```

## RLS Policies
- `profiles` : SELECT public, UPDATE owner
- `musician_profiles` : SELECT public, ALL owner
- `jam_sessions` : SELECT public, ALL organizer
- `jam_participants` : SELECT participants/organizer, INSERT self

## API Routes
- `/api/auth/*` → Supabase
- `/api/profiles` → GET/PUT
- `/api/search` → GET (geo query)
- `/api/jams` → GET/POST
- `/api/jams/[id]/join` → POST
- `/api/contact` → POST

## Structure
```
app/
├── (auth)/login/page.tsx
├── (auth)/signup/page.tsx
├── (main)/
│   ├── page.tsx (home)
│   ├── search/page.tsx
│   ├── jams/page.tsx
│   ├── jams/[id]/page.tsx
│   ├── profile/[id]/page.tsx
│   └── settings/
components/ui/ → shadcn
lib/
├── supabase/client.ts
├── supabase/server.ts
└── utils/
