# Deploy Linkwarden — Self-Hosted Bookmark Manager & Archive on Railway

Self-host Linkwarden — save & archive bookmarks as snapshots

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/linkwarden-bookmarks)

## About

Linkwarden is an open-source bookmark manager that doesn't just save links — it archives them. Every bookmark is preserved as a full-page snapshot, screenshot, and PDF, so your saved pages survive even when the original goes offline or changes. Organize with collections and tags, collaborate with your team, search across archived content, and access everything from a browser extension or mobile app. This template deploys Linkwarden with PostgreSQL and Meilisearch pre-wired and the authentication URL set correctly — so your self-hosted archive is live in minutes, without the login gotcha that trips up manual setups.
---

Linkwarden is straightforward to run, and one authentication detail is the difference between a working login and a frustrating one — this template gets it right.

**`NEXTAUTH_URL` must include the `/api/v1/auth` suffix — the #1 setup gotcha.** Linkwarden's authentication URL isn't just your domain — it must be your full domain *with `/api/v1/auth` appended*, or logins and OAuth callbacks silently fail. This is the most common self-hosted Linkwarden problem. This template sets `NEXTAUTH_URL` correctly to your Railway domain with the required suffix, so authentication works on the first try.

**Your data lives in two places — both persist here.** Linkwarden stores structured data (bookmarks, collections, tags, users) in PostgreSQL, and the archived files themselves (full-page snapshots, screenshots, PDFs) on a volume at `/data/data`. Both must persist or you lose either your links or their archived contents. This template wires Postgres and mounts the archive volume, so everything survives redeploys.

**Meilisearch makes archives searchable.** Linkwarden indexes the text of every archived page in Meilisearch, so you can search *inside* saved pages, not just titles and tags. Without it, links still save and organize, but full-text search across archived content isn't available — so this template includes it as a lightweight internal service.

**Set a strong `NEXTAUTH_SECRET`.** This secret signs sessions, JWTs, and preserved-content tokens, so it must be a long random value and stay stable — changing it invalidates existing sessions. This template generates one for you.

**Offload archives to S3 at scale.** By default archived files live on the Railway volume, ideal for most users. For a very large archive, set the `SPACES_*` variables (endpoint, region, key, secret) to store files in S3-compatible object storage — R2, B2, MinIO, or S3 — keeping the volume light. Linkwarden enables S3 only when all four are present. It also supports 50+ OAuth SSO providers and optional AI tag generation (BYOK) via environment variables.

Typical cost: **~$10/month** on Railway for the three services, scaling with how much you archive. Linkwarden is AGPL-licensed and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Meilisearch | `getmeili/meilisearch:v1.12.8` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Linkwarden | `ghcr.io/linkwarden/linkwarden` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MEILI_ENV` | Meilisearch | production | Runtime environment |
| `MEILI_MASTER_KEY` | Meilisearch | - | API authentication key |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | Disable telemetry |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Linkwarden | 3000 | HTTP server port |
| `MEILI_HOST` | Linkwarden | - | Meilisearch internal URL |
| `DATABASE_URL` | Linkwarden | - | PostgreSQL connection string |
| `NEXTAUTH_URL` | Linkwarden | - | Auth callback URL |
| `STORAGE_FOLDER` | Linkwarden | data | Archive storage directory |
| `NEXTAUTH_SECRET` | Linkwarden | (secret) | JWT session signing secret |
| `MEILI_MASTER_KEY` | Linkwarden | - | Meilisearch auth key |
| `NEXT_PUBLIC_CREDENTIALS_ENABLED` | Linkwarden | (secret) | Enable password auth |
| `NEXT_PUBLIC_DISABLE_REGISTRATION` | Linkwarden | false | Allow new signups |

## Configuration

- **Volume:** `/meili_data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/linkwarden-bookmarks)
