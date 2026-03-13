# Epic-05 : Communication

## Story 5.1 — Schema Contact Requests
**Priority**: Must | **Estimate**: S | **Status**: TODO

**SQL**:
```sql
create table contact_requests (
  id uuid default gen_random_uuid() primary key,
  from_profile_id uuid references profiles(id),
  to_profile_id uuid references profiles(id),
  jam_id uuid references jam_sessions(id),
  message text not null,
  created_at timestamptz default now()
);

alter table contact_requests enable row level security;

create policy "Users can view their own contacts"
  on contact_requests for select 
  using (auth.uid() = from_profile_id or auth.uid() = to_profile_id);

create policy "Users can send contact requests"
  on contact_requests for insert 
  with check (auth.uid() = from_profile_id);
```

**AC**:
- [ ] Table créée
- [ ] RLS OK

---

## Story 5.2 — Envoyer Demande Contact
**Priority**: Must | **Estimate**: M | **Status**: TODO

**Tasks**:
- [ ] Modal "Contacter" sur profil
- [ ] Formulaire message
- [ ] API route `/api/contact`
- [ ] Envoi email via Resend (masking)
- [ ] Sauvegarde en base

**AC**:
- [ ] Email reçu par destinataire
- [ ] Email expéditeur masqué
- [ ] Enregistrement en base

---

## Story 5.3 — Templates Emails
**Priority**: Should | **Estimate**: S | **Status**: TODO

**Templates à créer**:
- [ ] Bienvenue (après signup)
- [ ] Nouveau contact (quand on reçoit une demande)
- [ ] Confirmation participation jam
- [ ] Rappel jam 24h avant

**AC**:
- [ ] Templates MJML ou HTML responsive
- [ ] Branding JamConnect
- [ ] Unsubscribe links

---

## Story 5.4 — Notifications In-App
**Priority**: Could | **Estimate**: M | **Status**: TODO

**Context**:
Badge notification dans l'interface.

**Tasks**:
- [ ] Table `notifications`
- [ ] Composant `notification-bell.tsx`
- [ ] Liste notifications dropdown
- [ ] Marquer comme lu

**AC**:
- [ ] Badge compteur
- [ ] Liste accessible
- [ ] Temps réel (optionnel)
