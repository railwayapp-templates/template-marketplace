# Deploy Authentik (SSO + MFA) on Railway

Self-hosted SSO IdP with MFA and a policy engine.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/authentik-sso-mfa)

## About

Authentik is a self-hosted, open-source Identity Provider (IdP) that centralises authentication across your applications. It provides SSO, MFA (TOTP, WebAuthn/passkeys), user lifecycle management and a policy engine, replacing services like Okta or Auth0 with a stack you fully control.

This one-click template deploys the full Authentik stack on Railway: a **server** (web UI, REST API and SSO flows), a **worker** (background tasks such as blueprints, certificates and event processing) and a managed **PostgreSQL** database. Server and worker are pre-wired over Railway's private network and share an auto-generated `AUTHENTIK_SECRET_KEY`, so sessions stay valid across both. Media is persisted on a 1 GB volume mounted at `/data`, and the server is healthchecked on `/-/health/ready/`. First boot runs database migrations automatically — no manual environment variables, no configuration, no Redis (2026.5+ runs the task queue and cache on PostgreSQL).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Authentik Server | `ghcr.io/goauthentik/server:2026.5.6` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Authentik Worker | `ghcr.io/goauthentik/server:2026.5.6` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Authentik Server | 9000 |
| `AUTHENTIK_SECRET_KEY` | Authentik Server | (secret) |
| `AUTHENTIK_WEB__WORKERS` | Authentik Server | 1 |
| `AUTHENTIK_POSTGRESQL__USER` | Authentik Server | (secret) |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | Authentik Server | (secret) |
| `AUTHENTIK_ERROR_REPORTING__ENABLED` | Authentik Server | false |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `AUTHENTIK_SECRET_KEY` | Authentik Worker | (secret) |
| `AUTHENTIK_POSTGRESQL__USER` | Authentik Worker | (secret) |
| `AUTHENTIK_DISABLE_UPDATE_CHECK` | Authentik Worker | true |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | Authentik Worker | (secret) |
| `AUTHENTIK_ERROR_REPORTING__ENABLED` | Authentik Worker | false |

## Configuration

- **Start command:** `/bin/sh -c "exec ak server"`
- **Healthcheck:** `/-/health/ready/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec ak worker"`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/authentik-sso-mfa)
