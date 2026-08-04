# Deploy Outline — Self-Hosted Wiki & Team Knowledge Base on Railway

Self-host Outline — a fast Notion alternative wiki for teams

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outline-team-wiki)

## About

Outline is the open-source alternative to Notion and Confluence — a fast, beautiful team wiki and knowledge base with real-time collaborative editing, Markdown, nested collections, slash commands, and lightning-fast full-text search. This template deploys it with PostgreSQL and Redis pre-wired, using local file storage so there's no separate S3 bucket to configure — and it's upfront about the one thing that catches every Outline self-hoster: Outline has no password login, so you connect an auth provider to sign in.

---

Outline is a polished wiki, but one design decision surprises nearly everyone self-hosting it — knowing it upfront saves real frustration.

**Outline has no username/password login — you must connect an auth provider.** This is deliberate: Outline treats SSO as the correct way to manage company knowledge and doesn't run a password store. In practice, after deploying you *cannot log in* until you've configured at least one OAuth provider — Google, Slack, Microsoft, Discord, GitHub, or generic OIDC (which works with Authentik, Keycloak, or Pocket ID). Set up one provider's OAuth app, add its client ID and secret, point its redirect URI at `https://your-domain/auth/.callback`, and you're in. This is the number-one "I deployed it but can't sign in" moment — plan for it.

**Local storage means no S3 to configure.** Older Outline setups required a MinIO/S3 bucket for uploads. As of 2026, Outline supports local file storage, and this template uses it — uploads live on a volume, dropping the stack from four services to three. Switch `FILE_STORAGE` to `s3` later if you want object storage.

**`SECRET_KEY` and `UTILS_SECRET` are required and must be stable.** Both are 32-byte random hex values (`openssl rand -hex 32`). `SECRET_KEY` encrypts sensitive data; changing it after data exists causes problems, so set both once at deploy and keep them stable. This template generates them for you.

**`URL` must match your Railway domain.** Outline builds OAuth callbacks and links from `URL`, so it must be your exact Railway public domain, or sign-in redirects break. `PGSSLMODE=disable` is set for Railway's internal Postgres connection.

Typical cost: **~$10–15/month** on Railway for Outline, Postgres, and Redis. Outline is free and open source (BSL); Outline Cloud is $19/user/month, which climbs fast for a team.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Outline | `outlinewiki/outline` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Outline | 3000 | - |
| `NODE_ENV` | Outline | production | - |
| `PGSSLMODE` | Outline | disable | - |
| `SECRET_KEY` | Outline | (secret) | - |
| `FORCE_HTTPS` | Outline | true | - |
| `FILE_STORAGE` | Outline | local | - |
| `UTILS_SECRET` | Outline | (secret) | - |
| `ENABLE_UPDATES` | Outline | true | - |
| `WEB_CONCURRENCY` | Outline | 1 | - |
| `DEFAULT_LANGUAGE` | Outline | en_US | - |
| `RATE_LIMITER_ENABLED` | Outline | true | - |
| `RATE_LIMITER_REQUESTS` | Outline | 1000 | - |
| `FILE_STORAGE_LOCAL_ROOT_DIR` | Outline | C:/Program Files/Git/var/lib/outline/data | - |
| `FILE_STORAGE_IMPORT_MAX_SIZE` | Outline | 5120000 | - |
| `FILE_STORAGE_UPLOAD_MAX_SIZE` | Outline | 26214400 | - |
| `RATE_LIMITER_DURATION_WINDOW` | Outline | 60 | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Outline | true | - |
| `AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE` | Outline | 1 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Volume:** `/var/lib/outline/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/outline-team-wiki)
