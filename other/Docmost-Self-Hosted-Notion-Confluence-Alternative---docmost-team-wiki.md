# Deploy Docmost — Self-Hosted Notion & Confluence Alternative on Railway

Self-host Docmost — team wiki with real-time collaborative editing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docmost-team-wiki)

## About

Docmost is an open-source collaborative wiki and documentation platform — a self-hosted alternative to Notion and Confluence for team knowledge bases, internal docs, and technical documentation. It offers real-time collaborative editing, nested pages, spaces, granular permissions, and diagrams, so your whole team writes together in one private workspace. This template deploys Docmost with PostgreSQL and Redis pre-wired and the app secret generated — so your team wiki is live, with the required services connected and the setup traps avoided, in minutes.

---

Docmost is a capable multi-service wiki, and a few specifics make it deploy cleanly — all handled here.

**`APP_SECRET` is mandatory — or the app won't start.** Docmost requires a secure `APP_SECRET` of at least 32 characters to run; with a blank or placeholder value, the service fails to start. This template generates a strong secret automatically, so Docmost boots on the first deploy instead of erroring out — one of the most common self-hosted Docmost mistakes, handled for you.

**Three services, wired together.** Docmost needs PostgreSQL for data and Redis for real-time collaboration and background jobs — Redis isn't optional, because it's what powers the live collaborative editing that makes Docmost feel like Notion. This template wires all three via Railway references (`DATABASE_URL`, `REDIS_URL`), so you skip the connection setup and get working real-time editing immediately.

**`APP_URL` must be your domain.** Docmost uses `APP_URL` for links, invitations, and asset URLs, so it must be your Railway (or custom) public domain, or shared links and team invites resolve to the wrong host. This template sets it to your Railway domain, with automatic HTTPS.

**Attachments: volume or S3 — plan for persistence.** File uploads go to `/app/data/storage`, which is ephemeral on Railway without a volume — so this template mounts one. For larger workspaces, set `STORAGE_DRIVER=s3` with the `AWS_S3_*` variables to offload attachments to S3-compatible object storage (Cloudflare R2, Backblaze B2, MinIO, or S3), keeping the volume light and backups simple. Your pages and permissions always live in PostgreSQL regardless.

**Add SMTP to invite your team.** Docmost sends invitations and notifications by email, so configure the `SMTP_*` (or Postmark) variables to invite team members and enable password resets. The workspace works without it, but email unlocks team onboarding. Pages, spaces, users, and permissions live in PostgreSQL — the single source of truth and primary backup target — while attachments live on the volume or in your S3 bucket, both surviving redeploys.

Typical cost: **~$5–15/month** on Railway for the three services, scaling with team size and storage. Docmost is AGPL-3.0 and free — no per-seat pricing, versus Notion's and Confluence's per-user fees.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| docmost | `docmost/docmost:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | REDISHOST |
| `REDISPORT` | Redis | 6379 | REDISPORT |
| `REDISUSER` | Redis | default | REDISUSER |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | REDISPASSWORD |
| `REDIS_PASSWORD` | Redis | (secret) | REDIS_PASSWORD |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `APP_URL` | docmost | - | APP URL |
| `REDIS_URL` | docmost | - | REDIS URL |
| `APP_SECRET` | docmost | (secret) | APP SECRET |
| `DATABASE_URL` | docmost | - | DATABASE URL |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/data/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/docmost-team-wiki)
