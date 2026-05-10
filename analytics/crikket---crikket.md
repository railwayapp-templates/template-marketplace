# Deploy crikket on Railway

Deploy and Host crikket with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crikket)

## About

Hosting crikket requires deploying multiple interconnected services: a frontend web application, backend API server, PostgreSQL database, and object storage for uploads and media assets. The platform is distributed as containerized services, making it well-suited for modern infrastructure platforms like Railway.

On Railway, crikket can be deployed using separate services for the web app and API server while leveraging Railway-managed PostgreSQL and external S3-compatible storage such as Cloudflare R2. Railway simplifies networking, environment variable management, HTTPS provisioning, scaling, and service orchestration so you can focus on running your creator platform instead of managing infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| crikket-web | [saenyakorn/crikket](https://github.com/saenyakorn/crikket) (root: /apps/web) | Web service |
| crikket-migrate | [saenyakorn/crikket](https://github.com/saenyakorn/crikket) (root: /apps/server) | Worker |
| crikket-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| crikket-server | [saenyakorn/crikket](https://github.com/saenyakorn/crikket) (root: /apps/server) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEXT_PUBLIC_APP_URL` | crikket-web | - | Primary web app URL. |
| `NEXT_PUBLIC_SITE_URL` | crikket-web | - | Public site URL for metadata/canonical links. |
| `NEXT_PUBLIC_SERVER_URL` | crikket-web | - | Public API/server base URL used by the web app. |
| `NODE_ENV` | crikket-migrate | production | - |
| `POSTGRES_DB` | crikket-postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | crikket-postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | crikket-postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | crikket-postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | crikket-postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NODE_ENV` | crikket-server | production | Core |
| `RESEND_API_KEY` | crikket-server | (secret) | - |
| `STORAGE_BUCKET` | crikket-server | crikket | - |
| `STORAGE_REGION` | crikket-server | auto | - |
| `ENABLE_PAYMENTS` | crikket-server | false | Storage (MinIO) |
| `RESEND_FROM_EMAIL` | crikket-server | - | Optional security/rate limiting |
| `BETTER_AUTH_SECRET` | crikket-server | (secret) | - |
| `POLAR_ACCESS_TOKEN` | crikket-server | (secret) | - |
| `STORAGE_PUBLIC_URL` | crikket-server | - | Optional OAuth / Email |
| `GOOGLE_CLIENT_SECRET` | crikket-server | (secret) | - |
| `POLAR_WEBHOOK_SECRET` | crikket-server | (secret) | - |
| `TURNSTILE_SECRET_KEY` | crikket-server | (secret) | Optional Polar (only if ENABLE_PAYMENTS=true) |
| `ALLOWED_SIGNUP_DOMAINS` | crikket-server | * | - |
| `STORAGE_ADDRESSING_STYLE` | crikket-server | path | - |
| `UPSTASH_REDIS_REST_TOKEN` | crikket-server | (secret) | - |
| `STORAGE_SECRET_ACCESS_KEY` | crikket-server | (secret) | - |
| `CAPTURE_SUBMIT_TOKEN_SECRET` | crikket-server | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bun run --filter @crikket/db db:migrate`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** TypeScript, MDX, Shell, CSS, Dockerfile, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/crikket)
