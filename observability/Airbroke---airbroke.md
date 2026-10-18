# Deploy Airbroke on Railway

Airbrake/Sentry-compatible error collection and triage with PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/airbroke)

## About

Self-hosted error collection and triage for your team. Receive errors from
Airbrake and Sentry clients, inspect stack traces and request details, track
occurrences, and manage issues in a web dashboard.

This template deploys an Airbroke service and a PostgreSQL 18 service connected
over private networking. PostgreSQL is the only service that needs a persistent
volume. This setup requires Airbroke 1.4.3 or newer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:18` | Database |
| Airbroke | `ghcr.io/icoretech/airbroke:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created for Airbroke on the PostgreSQL persistent volume. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection URL shared with Airbroke. This uses Railway private networking; no public TCP proxy is required. |
| `POSTGRES_USER` | Postgres | (secret) | Database role used by Airbroke and its migration runtime. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Independently generated PostgreSQL password. Preserve it with the database volume and backups. |
| `PORT` | Airbroke | 3000 | HTTP listener port. The public Railway domain targets port 3000. |
| `HOSTNAME` | Airbroke | 0.0.0.0 | Bind to all interfaces so Railway ingress and healthchecks can reach the application. |
| `DIRECT_URL` | Airbroke | - | Private PostgreSQL URL used by Prisma migrations. Keep it aligned with DATABASE_URL; do not set an empty string. |
| `DATABASE_URL` | Airbroke | - | Private connection URL supplied by the Postgres service. |
| `BETTER_AUTH_URL` | Airbroke | - | Public HTTPS origin for OAuth callbacks. Update it together with the provider callback when using a custom domain. |
| `AIRBROKE_GITHUB_ID` | Airbroke | - | Configure after deployment: create a GitHub OAuth app with the generated HTTPS domain and /api/auth/callback/github callback. |
| `BETTER_AUTH_SECRET` | Airbroke | (secret) | Generated authentication secret. Preserve it across redeploys and replicas, and include it in secure backups. |
| `AIRBROKE_GITHUB_ORGS` | Airbroke | - | Required: comma-separated GitHub organization login names, such as example-org. Only their members may sign in. All signed-in users can access every Airbroke project. |
| `AIRBROKE_GITHUB_SECRET` | Airbroke | (secret) | Set the real GitHub OAuth client secret after configuring the callback, then redeploy. Sign-in stays unavailable until both OAuth credentials are set. |
| `AIRBROKE_AUTH_IP_HEADERS` | Airbroke | x-real-ip | Railway public HTTP ingress overwrites this client-IP header. Keep auth traffic behind that ingress; private network traffic does not get the same protection. |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Airbroke | - | Generated base64-encoded 32-byte key for Next.js Server Actions. Preserve the same value across redeploys and replicas. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/api/hc`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/airbroke)
