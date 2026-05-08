# Deploy Boxcar — Payload CMS + Cloudflare R2 on Railway

Self-hosted Payload + Next.js blog with Cloudflare R2 media.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/boxcar-payload-cms-cloudflare-r2)

## About

Boxcar is a production-ready blog template combining Payload CMS, Next.js 16, and Cloudflare R2 for media storage. Deploy a fully self-hosted, code-owned headless blog with a polished admin, scheduled publishing, draft workflows, and SEO baked in — without wiring up infrastructure yourself.

Hosting Boxcar on Railway provisions three pieces: a Next.js web service running the Payload admin and public blog, a separate cron service that processes scheduled-publish jobs every 30 minutes, and a managed PostgreSQL database for content. Migrations run automatically before each deploy via the `preDeployCommand` hook, and Railway pings `/healthz` to confirm the app is healthy. Cloudflare R2 handles media uploads through Payload's S3-compatible storage plugin — you supply bucket credentials via environment variables. Push to `main` and Railway redeploys both services in lockstep.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Payload-CMS-Cloudflare-Railway-Template | [sungkhum/Boxcar-Payload-CMS-Cloudflare-Railway-Template](https://github.com/sungkhum/Boxcar-Payload-CMS-Cloudflare-Railway-Template) | Web service |
| Cron | [sungkhum/Boxcar-Payload-CMS-Cloudflare-Railway-Template](https://github.com/sungkhum/Boxcar-Payload-CMS-Cloudflare-Railway-Template) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `R2_BUCKET` | Payload-CMS-Cloudflare-Railway-Template | - | Cloudflare R2 bucket name. Create one in Cloudflare dashboard → R2 → Create Bucket. |
| `R2_ENDPOINT` | Payload-CMS-Cloudflare-Railway-Template | - | R2 S3-compatible endpoint, e.g. https://<account_id>.r2.cloudflarestorage.com |
| `DATABASE_URI` | Payload-CMS-Cloudflare-Railway-Template | - | Auto-wired to the Postgres service in this template. Leave as-is. |
| `R2_PUBLIC_URL` | Payload-CMS-Cloudflare-Railway-Template | - | Public URL where uploaded media is served — either your R2 public bucket URL (https://pub-xxx.r2.dev) or a custom domain you've connected. |
| `PAYLOAD_SECRET` | Payload-CMS-Cloudflare-Railway-Template | (secret) | Random secret used to sign session cookies. Auto-generated for you. |
| `R2_ACCESS_KEY_ID` | Payload-CMS-Cloudflare-Railway-Template | - | Access Key ID for an R2 API token. R2 → Manage API Tokens → Object Read & Write scoped to your bucket. |
| `R2_SECRET_ACCESS_KEY` | Payload-CMS-Cloudflare-Railway-Template | (secret) | Secret half of that R2 API token (shown only once at token creation). |
| `NEXT_PUBLIC_SITE_NAME` | Payload-CMS-Cloudflare-Railway-Template | Boxcar | Site name shown in title tags, SEO meta, and the admin header. |
| `NEXT_PUBLIC_SERVER_URL` | Payload-CMS-Cloudflare-Railway-Template | - | Public URL of your deployed site, e.g. https://your-domain.com. Read at build time — redeploy after changing. |
| `DATABASE_URI` | Cron | - | Auto-wired to the Postgres service in this template. Leave as-is. |
| `PAYLOAD_SECRET` | Cron | (secret) | Must match PAYLOAD_SECRET on the app service so both processes share the same signing key. |
| `POSTGRES_DB` | Postgres | railway | Name of the database created on first boot. |
| `DATABASE_URL` | Postgres | - | Internal connection string. Reference this from other services. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated superuser password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | [Optional] Public connection string via Railway's TCP proxy. Only needed for local tools or one-off migrations — exposes the DB to the internet. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `pnpm jobs:run`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS · **Languages:** TypeScript, CSS, Dockerfile, JavaScript, SCSS

[View on Railway →](https://railway.com/deploy/boxcar-payload-cms-cloudflare-r2)
