# Preparation V2 - Donnees Reelles

Cette base V2 est deja en place dans le code:
- API dynamique cours: GET /api/v2/cours
- API dynamique ressources: GET /api/v2/ressources
- API dynamique statistiques: GET /api/v2/statistiques (auth requis)
- Rendu client dynamique sur les pages cours/ressources/statistiques via js/user-pages.js

## Tables Supabase attendues

### 1) courses
Colonnes minimales:
- id (text ou uuid, PK)
- title (text, non null)
- description (text)
- access_level (text: free|premium, default free)
- position (int, default 0)

### 2) resources
Colonnes minimales:
- id (text ou uuid, PK)
- title (text, non null)
- description (text)
- access_level (text: free|premium, default free)
- position (int, default 0)

### 3) user_stats
Colonnes minimales:
- id (uuid, PK)
- user_id (uuid, non null)
- metric_key (text, non null)
- metric_label (text, non null)
- metric_value (text, non null)
- metric_hint (text)
- access_level (text: free|premium, default free)
- position (int, default 0)

## SQL de depart (exemple)

```sql
create table if not exists public.courses (
  id text primary key,
  title text not null,
  description text,
  access_level text not null default 'free',
  position int not null default 0
);

create table if not exists public.resources (
  id text primary key,
  title text not null,
  description text,
  access_level text not null default 'free',
  position int not null default 0
);

create table if not exists public.user_stats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  metric_key text not null,
  metric_label text not null,
  metric_value text not null,
  metric_hint text,
  access_level text not null default 'free',
  position int not null default 0
);

create index if not exists idx_user_stats_user_id on public.user_stats(user_id);
```

## Donnees seed minimales

```sql
insert into public.courses (id, title, description, access_level, position) values
('cours-fondations', 'Module 1 - Fondations', 'Bases de la routine et execution propre des mouvements.', 'free', 1),
('cours-progression', 'Module 2 - Progression', 'Montee en intensite sur des cycles courts et repetables.', 'premium', 2),
('cours-consolidation', 'Module 3 - Consolidation', 'Consolider les habitudes et stabiliser les resultats.', 'premium', 3)
on conflict (id) do nothing;

insert into public.resources (id, title, description, access_level, position) values
('res-guide-pdf', 'Guide PDF', 'Repere rapide pour les objectifs de la semaine.', 'free', 1),
('res-video-courte', 'Videos courtes', 'Formats pedagogiques courts pour progresser pas a pas.', 'premium', 2),
('res-fiche-pratique', 'Fiches pratiques', 'Checklists d execution et de suivi quotidien.', 'premium', 3)
on conflict (id) do nothing;
```

## Comportement actuel

- Si les tables existent et sont remplies, l API renvoie source: supabase.
- Si les tables n existent pas ou sont vides, l API renvoie source: fallback.
- Les badges Free/Premium s appliquent cote front sans logique backend supplementaire.
