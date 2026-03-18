# Deploy pushflow on Railway

A plug-and-play web push notification management subsystem for any app!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pushflow)

## About

We utilize the following:

* PostgreSQL for persistent data, *e.g.* API keys, dashboard users
* Redis for session storage behind the web dashboard
* A Rust backend responsible for OAuth-authenticated access from the web dashboard and key-based access from API keys,
  built with `actix-web`.
    * Google OAuth is used to provide identity.
* A Next.js frontend for the web dashboard, interfacing with the backend via SSR.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| backend | [laggycomputer/pushflow](https://github.com/laggycomputer/pushflow) (root: /backend) | Worker |
| frontend | [laggycomputer/pushflow](https://github.com/laggycomputer/pushflow) (root: frontend) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | backend | 1451 | - |
| `JWT_SECRET` | backend | (secret) | This passphrase protects the login flow from CSRF; set it to something complex. |
| `FREEZE_SESSION_KEY` | backend | - | If set, session keys persist over restart (not recommended unless testing) |
| `GOOGLE_OAUTH_CLIENT_ID` | backend | - | A Google OAuth application client ID: https://developers.google.com/identity/protocols/oauth2/web-server#prerequisites |
| `GOOGLE_OAUTH_CLIENT_SECRET` | backend | (secret) | A Google OAuth application client secret: https://developers.google.com/identity/protocols/oauth2/web-server#prerequisites |
| `NEXT_TELEMETRY_DISABLED` | frontend | 1 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | - |
| `REDIS_AOF_ENABLED` | Redis | no | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`

**Category:** Automation · **Languages:** Rust, TypeScript, SCSS, JavaScript

[View on Railway →](https://railway.com/template/pushflow)
