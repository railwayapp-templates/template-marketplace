# Deploy Infisical (Self-Hosted Vault & Doppler Alternative) on Railway

Self-hosted HashiCorp Vault & Doppler alternative [Updated Aug '26]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/infisical-self-hosted-vault-and-doppler-)

## About

Infisical is an open-source secrets-management platform — a self-hosted alternative to HashiCorp Vault, Doppler and AWS Secrets Manager that you fully own. Store, version and inject secrets and configuration across your apps, environments and CI/CD pipelines from one place, with a web dashboard, a CLI, native SDKs, dynamic secrets, secret rotation, point-in-time recovery and full audit logs. This template deploys the complete Infisical self-hosted stack — the Infisical application, a PostgreSQL database and a Redis instance — each pinned to a verified upstream image and wired over Railway's private network, with fresh encryption and auth secrets generated on deploy so it comes up working on the first try.

Infisical ships as a single application container that serves both the API and the web dashboard on port 8080, backed by PostgreSQL for persistent storage and Redis for caching, sessions and background jobs. Only the Infisical app is exposed publicly; PostgreSQL and Redis stay on Railway's private network. Database schema migrations run automatically on boot, so there is no manual migration step. This template generates a fresh 32-character `ENCRYPTION_KEY` and a strong `AUTH_SECRET` on each deploy, builds the `DB_CONNECTION_URI` and `REDIS_URL` from the private service domains, points `SITE_URL` at the app's public domain, and attaches persistent volumes to Postgres and Redis. When it finishes deploying you open the app and create the first super-admin account, then start adding projects, environments and secrets. Note: the `ENCRYPTION_KEY` protects all stored secrets and cannot be recovered if lost — back it up somewhere safe once deployed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:7-alpine` | Database |
| infisical | `infisical/infisical:v0.162.19` | Web service |
| postgres | `postgres:16-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `AUTH_SECRET` | infisical | (secret) |
| `TELEMETRY_ENABLED` | infisical | false |
| `POSTGRES_DB` | postgres | infisical |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/infisical-self-hosted-vault-and-doppler-)
