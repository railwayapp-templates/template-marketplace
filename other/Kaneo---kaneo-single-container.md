# Deploy Kaneo on Railway

Project management and kanban boards. Jira and Trello alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kaneo-single-container)

## About

# Kaneo on Railway

One-click deploy of [Kaneo](https://kaneo.app), the open source project management platform: kanban boards, tasks, workspaces, time tracking, and integrations (GitHub, Slack, Discord, Telegram, webhooks).

This template runs Kaneo's current single-container release (`ghcr.io/usekaneo/kaneo`), which bundles the web app and API in one image, plus Railway's managed PostgreSQL.

## What gets deployed

| Service | What it is |
|---|---|
| Kaneo | The app itself (web + API in one container) with a public domain |
| Postgres | Managed PostgreSQL with a persistent volume and a generated password |

Everything is wired automatically:

- Database connection via reference variables, no manual setup
- `AUTH_SECRET` is generated fresh for your deploy, so sessions survive restarts and your secret is yours alone
- The web server is patched at startup to listen on IPv6, which Railway requires (the stock image is IPv4-only and would return 502s)
- Deploys are health-checked at `/api/health`, so a broken release never replaces a working one

## Getting started

1. Click Deploy. Both services provision in about 2 minutes.
2. Open the Kaneo service's domain (shown on the service card).
3. Create your account. The first signup becomes yours, so do this right away.
4. Create a workspace, add a project, start adding tasks.

## Recommended: lock down your instance

Once your account exists, add these variables to the Kaneo service to keep strangers out:

| Variable | Value | Effect |
|---|---|---|
| `DISABLE_REGISTRATION` | `true` | Blocks new public signups. People you invite can still register. |
| `DISABLE_GUEST_ACCESS` | `true` | Removes the anonymous guest sign-in button. |

Railway redeploys automatically after you save variables.

## Optional features

All of these are additive. Set the variables on the Kaneo service and redeploy.

**File uploads in tasks and comments** (S3-compatible storage, e.g. a Railway bucket):

| Variable | Example |
|---|---|
| `S3_ENDPOINT` | your bucket endpoint |
| `S3_BUCKET` | bucket name |
| `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | bucket credentials |
| `S3_FORCE_PATH_STYLE` | `true` |

**Social sign-in**: set `GITHUB_OAUTH_CLIENT_ID` + `GITHUB_OAUTH_CLIENT_SECRET` (or the Google / Discord equivalents). See [Kaneo's environment variable docs](https://kaneo.app/docs/core/installation/environment-variables) for the full list including custom OAuth/OIDC.

**Email (SMTP)**: set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`. With SMTP configured, sign-in uses email verification codes and workspace invitations are delivered by email.

**GitHub repository sync**: create a GitHub App and set `GITHUB_APP_ID`, `GITHUB_WEBHOOK_SECRET`, `GITHUB_PRIVATE_KEY`, `GITHUB_APP_NAME`.

## Updating Kaneo

The service tracks the `latest` image tag. To update, just redeploy the Kaneo service (right-click the service, Redeploy). Database migrations run automatically on startup.

## Scaling notes

A single instance handles small teams comfortably on default resources. If you ever run multiple replicas, add a Redis service and set `REDIS_URL` so realtime updates are shared between replicas; a single instance works fine without it.

## Troubleshooting

- **App not reachable right after deploy**: the container waits for the database and runs migrations first; give it a minute, then check the deploy logs.
- **Signed out after every restart**: `AUTH_SECRET` is missing. This template sets it for you, so only relevant if you removed it.
- **Where is my data?**: in the Postgres service's volume. Back it up with Railway's backups feature on the volume.

## Links

- [Kaneo website](https://kaneo.app) · [Docs](https://kaneo.app/docs) · [GitHub](https://github.com/usekaneo/kaneo)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Kaneo | `ghcr.io/usekaneo/kaneo:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Kaneo | 5173 |
| `AUTH_SECRET` | Kaneo | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'sed -i "s/listen 5173;/listen 5173; listen [::]:5173;/" /etc/nginx/conf.d/default.conf && exec /usr/local/bin/kaneo-entrypoint.sh'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/kaneo-single-container)
