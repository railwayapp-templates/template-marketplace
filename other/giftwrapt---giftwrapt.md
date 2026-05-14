# Deploy giftwrapt on Railway

Minimal GiftWrapt install with core service, database, and cron jobs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/giftwrapt)

## About

GiftWrapt is a self-hostable wish list app for families and small groups. Make a list, share it with the people who shop for you, and let them quietly claim items so nobody buys the same thing twice. Think Amazon's wish list, except it isn't trying to sell you anything and you actually own your data. 
![GiftWrapt](https://www.giftwrapt.dev/screenshots/hero_all-lists.png)

This template provisions a complete GiftWrapt stack: a TanStack Start web service (Nitro server, React 19), a Postgres database with a persistent volume, and five scheduled cron services that drive automatic gift reveals, daily email digests, intelligence runs, link scraping, and verification cleanup. Database migrations run automatically on first boot. `BETTER_AUTH_SECRET` and `CRON_SECRET` are auto-generated. The first user to sign up is auto-promoted to admin. Outbound email (Resend) and S3-compatible image storage (AWS S3, Cloudflare R2, MinIO, etc.) are optional add-ons you can wire in later by setting a handful of env vars.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cron-intelligence-recommendations | `curlimages/curl:8.20.0` | Worker |
| cron-item-scrape-queue | `curlimages/curl:8.20.0` | Worker |
| cron-birthday-emails | `curlimages/curl:8.20.0` | Worker |
| giftwrapt-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| giftwrapt | `ghcr.io/shawnphoffman/giftwrapt:latest` | Web service |
| cron-cleanup-verification | `curlimages/curl:8.20.0` | Worker |
| cron-auto-archive | `curlimages/curl:8.20.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CRON_SECRET` | cron-intelligence-recommendations | (secret) | Cron secret defined on the core giftwrapt service |
| `BETTER_AUTH_URL` | cron-intelligence-recommendations | - | URL telling the cron service how to reach the main service |
| `CRON_SECRET` | cron-item-scrape-queue | (secret) | Cron secret defined on the core giftwrapt service |
| `BETTER_AUTH_URL` | cron-item-scrape-queue | - | URL telling the cron service how to reach the main service |
| `CRON_SECRET` | cron-birthday-emails | (secret) | Cron secret defined on the core giftwrapt service |
| `BETTER_AUTH_URL` | cron-birthday-emails | - | URL telling the cron service how to reach the main service |
| `POSTGRES_DB` | giftwrapt-postgres | - | Database name. Leave empty to use image default (railway). |
| `DATABASE_URL` | giftwrapt-postgres | - | Full connection string the app reads. Auto-built from the vars above. |
| `POSTGRES_USER` | giftwrapt-postgres | (secret) | Database user. Leave empty to use image default (postgres). |
| `POSTGRES_PASSWORD` | giftwrapt-postgres | (secret) | Auto-generated database password. |
| `DATABASE_PUBLIC_URL` | giftwrapt-postgres | - | Public connection string for external tools like psql. Not used by the app. |
| `HOST` | giftwrapt | :: | Network interface to bind. :: enables IPv6 for Railway's private network. Don't change. |
| `PORT` | giftwrapt | 3000 | Port the app listens on. Must match the port the cron services target. |
| `CRON_SECRET` | giftwrapt | (secret) | Auto-generated bearer token that gates /api/cron/* endpoints. Shared with the cron services. |
| `DATABASE_URL` | giftwrapt | - | Postgres connection string. References the Postgres service. |
| `RESEND_API_KEY` | giftwrapt | (secret) | Resend API key for outbound email. Leave empty to disable email. |
| `STORAGE_BUCKET` | giftwrapt | - | Bucket name for uploaded images. |
| `STORAGE_REGION` | giftwrapt | - | S3 region for the storage backend. |
| `BETTER_AUTH_URL` | giftwrapt | - | Public URL of this app. Used for auth callbacks. Set to https://${{RAILWAY_PUBLIC_DOMAIN}}. |
| `STORAGE_ENDPOINT` | giftwrapt | - | S3-compatible storage endpoint URL. Leave all STORAGE_* empty to disable image uploads. |
| `RESEND_FROM_EMAIL` | giftwrapt | - | Verified Resend sender address, e.g. noreply@yourdomain.com. |
| `BETTER_AUTH_SECRET` | giftwrapt | (secret) | Auto-generated secret used to sign auth sessions. Rotate to invalidate all sessions. |
| `STORAGE_ACCESS_KEY_ID` | giftwrapt | - | Storage access key ID. |
| `STORAGE_FORCE_PATH_STYLE` | giftwrapt | - | Use path-style URLs (endpoint/bucket/key) instead of virtual-hosted (bucket.endpoint/key). Leave empty for AWS S3 / Cloudflare R2. Set to true for MinIO, Garage, RustFS, or other self-hosted S3 backends. |
| `STORAGE_SECRET_ACCESS_KEY` | giftwrapt | (secret) | Storage secret access key. |
| `CRON_SECRET` | cron-cleanup-verification | (secret) | Cron secret defined on the core giftwrapt service |
| `BETTER_AUTH_URL` | cron-cleanup-verification | - | URL telling the cron service how to reach the main service |
| `CRON_SECRET` | cron-auto-archive | (secret) | Cron secret defined on the core giftwrapt service |
| `BETTER_AUTH_URL` | cron-auto-archive | - | URL telling the cron service how to reach the main service |

## Configuration

- **Start command:** `sh -c 'curl -fsSL --retry 3 -H "Authorization: Bearer $CRON_SECRET" "$BETTER_AUTH_URL/api/cron/intelligence-recommendations"'`
- **Start command:** `sh -c 'curl -fsSL --retry 3 -H "Authorization: Bearer $CRON_SECRET" "$BETTER_AUTH_URL/api/cron/item-scrape-queue"'`
- **Start command:** `sh -c 'curl -fsSL --retry 3 -H "Authorization: Bearer $CRON_SECRET" "$BETTER_AUTH_URL/api/cron/birthday-emails"'`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'curl -fsSL --retry 3 -H "Authorization: Bearer $CRON_SECRET" "$BETTER_AUTH_URL/api/cron/cleanup-verification"'`
- **Start command:** `sh -c 'curl -fsSL --retry 3 -H "Authorization: Bearer $CRON_SECRET" "$BETTER_AUTH_URL/api/cron/auto-archive"'`

**Category:** Other

[View on Railway →](https://railway.com/deploy/giftwrapt)
