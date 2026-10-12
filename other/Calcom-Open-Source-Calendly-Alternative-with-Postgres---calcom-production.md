# Deploy Cal.com | Open-Source Calendly Alternative with Postgres on Railway

Self-hosted scheduling: booking pages, calendar sync and event types

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calcom-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/calcom-production?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=calcom-production)

[Cal.com](https://cal.com/) is the open-source Calendly alternative: public booking pages, event types with custom durations and questions, availability schedules, buffer times, Google Calendar and Meet sync, video links, webhooks and embeddable booking widgets. This template runs the official Cal.com image with Postgres, generates every secret for you, and points the app at your Railway domain without rebuilding the image.

The stack is two services: Cal.com and Postgres.

- **Upstream's own image, pinned.** Cal.com runs from the official `calcom/cal.com` image at a fixed tag (`v6.2.0`), not `latest`, so a redeploy never surprises you with an untested version.
- **Your URL, no rebuild.** Cal.com bakes its public URL into the Next.js build. The start command rewrites the built URL to `NEXT_PUBLIC_WEBAPP_URL` on every boot (upstream's own replace script), so booking links, emails and OAuth callbacks use your Railway domain or custom domain.
- **Migrations on every boot.** The start command waits for Postgres, applies Cal.com's Prisma migrations and seeds the app store before the server starts. Railway's health check (`/api/auth/session`) only switches traffic once that is done; first boot applies about 590 migrations and takes a minute or two.
- **Lean start.** The server is started with `next start` directly instead of upstream's `yarn` + `turbo` wrapper, which cuts about 350 MB of idle memory and keeps every environment variable visible to the app.
- **Secrets generated.** `NEXTAUTH_SECRET` and the 32-character `CALENDSO_ENCRYPTION_KEY` (which encrypts stored calendar credentials) are generated per deployment.
- **No Redis, no volume on the app.** The web app keeps everything, including avatars, in Postgres, which has its own volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17.11-alpine` | Database |
| Cal.com | `calcom/cal.com:v6.2.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | calcom | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `PORT` | Cal.com | 3000 | Port Cal.com listens on - leave as is |
| `HOSTNAME` | Cal.com | :: | Listen on IPv6 and IPv4 so Railway's private network can reach it |
| `EMAIL_FROM` | Cal.com | - | Optional sender address for booking confirmations and reminders, e.g. cal@example.com (Railway allows outbound SMTP on Pro only) |
| `DATABASE_URL` | Cal.com | - | Postgres on the private network |
| `NEXTAUTH_URL` | Cal.com | - | Sign-in base URL - keep it equal to NEXT_PUBLIC_WEBAPP_URL |
| `DATABASE_HOST` | Cal.com | - | host:port the start command waits for before migrating |
| `EMAIL_FROM_NAME` | Cal.com | Cal.com | Sender name for emails |
| `NEXTAUTH_SECRET` | Cal.com | (secret) | Signs login sessions - changing it logs everyone out |
| `EMAIL_SERVER_HOST` | Cal.com | - | SMTP server |
| `EMAIL_SERVER_PORT` | Cal.com | 465 | SMTP port (465 implicit TLS, 587 STARTTLS) |
| `EMAIL_SERVER_USER` | Cal.com | (secret) | SMTP username |
| `CALCOM_LICENSE_KEY` | Cal.com | - | Optional Cal.com commercial license key for enterprise features (teams, workflows, insights). Leave empty for the AGPL edition |
| `DATABASE_DIRECT_URL` | Cal.com | - | Postgres for migrations (same database) |
| `GOOGLE_LOGIN_ENABLED` | Cal.com | (secret) | Set to true to show Sign in with Google (needs GOOGLE_API_CREDENTIALS) |
| `EMAIL_SERVER_PASSWORD` | Cal.com | (secret) | SMTP password |
| `GOOGLE_API_CREDENTIALS` | Cal.com | (secret) | Optional Google OAuth client JSON for Google Calendar and Meet, e.g. {"web":{"client_id":"...","client_secret":"...","redirect_uris":["https://YOUR-DOMAIN/api/integrations/googlecalendar/callback","https://YOUR-DOMAIN/api/auth/callback/google"]}} |
| `NEXT_PUBLIC_WEBAPP_URL` | Cal.com | - | Public URL of Cal.com (booking links, emails, OAuth callbacks). Rewritten into the built app on every boot - set it to your custom domain after adding one |
| `CALENDSO_ENCRYPTION_KEY` | Cal.com | - | Encrypts stored calendar and app credentials (exactly 32 characters). BACK IT UP - changing it breaks every connected calendar |
| `CALCOM_TELEMETRY_DISABLED` | Cal.com | 1 | Turn off Cal.com's anonymous usage telemetry |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "scripts/replace-placeholder.sh $BUILT_NEXT_PUBLIC_WEBAPP_URL $NEXT_PUBLIC_WEBAPP_URL && scripts/wait-for-it.sh $DATABASE_HOST -t 120 -- true && npx prisma migrate deploy --schema packages/prisma/schema.prisma && npx ts-node --transpile-only scripts/seed-app-store.ts && cd apps/web && exec /calcom/node_modules/.bin/next start"`
- **Healthcheck:** `/api/auth/session`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/calcom-production)
