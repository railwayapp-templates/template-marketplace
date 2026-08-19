# Deploy RevealUI on Railway

Self-host RevealUI Free (OSS): pgvector, migrate, api, admin. Unlicensed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/revealui)

## About

RevealUI Free (OSS) Fleet stack, deployable in one click: a pgvector Postgres database, a one-shot migrate job, the REST api, and the admin dashboard. Deploy this template. After postgres is healthy, migrate runs once (restart policy Never). Then api and admin come up with public domains. This is a try path, not a licensed Enterprise install.

Postgres uses the pgvector/pgvector:pg16 image (not vanilla Postgres). You must generate three secrets for the api (REVEALUI_KEK, REVEALUI_SECRET, REVEALUI_AUDIT_SIGNING_KEY), set the first admin email and password, and set POSTGRES_PASSWORD. Leave REVEALUI_ALLOW_UNLICENSED_SELF_HOST=true on both api and admin, and do not add a license key on this path. RevealUI Studio production hosting is separate (Vercel + Neon + Fly); this listing is a customer self-host sales channel, not Studio production hosting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `pgvector/pgvector:pg16` | Worker |
| admin | [RevealUIStudio/revealui](https://github.com/RevealUIStudio/revealui) | Web service |
| api | [RevealUIStudio/revealui](https://github.com/RevealUIStudio/revealui) | Web service |
| migrate | `ghcr.io/revealuistudio/revealui-migrate:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | revealui | Database name. Default revealui. |
| `POSTGRES_USER` | postgres | (secret) | Database user. Default revealui. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Database password. Generate a strong random value. Do not reuse. |
| `API_URL` | admin | - | Public https URL of the api. Railway reference to api's public domain. |
| `NODE_ENV` | admin | production | Set to production. |
| `POSTGRES_URL` | admin | - | Private Railway Postgres URL (sslmode=disable). Railway reference to api. |
| `REVEALUI_KEK` | admin | - | Same value as api. Railway reference to api. |
| `REVEALUI_SECRET` | admin | (secret) | Same value as api. Railway reference to api. |
| `NEXT_PUBLIC_API_URL` | admin | - | Public https URL of the api. Railway reference to api's public domain. |
| `REVEALUI_ADMIN_EMAIL` | admin | - | Email for the first admin user (seeded on first boot). |
| `REVEALUI_ADMIN_PASSWORD` | admin | (secret) | Password for the first admin user. Change it after first login. |
| `REVEALUI_AUDIT_SIGNING_KEY` | admin | - | Same value as api. Railway reference to api. |
| `REVEALUI_PUBLIC_SERVER_URL` | admin | - | Public https URL of admin. Railway reference to admin's public domain. |
| `REVEALUI_ALLOW_UNLICENSED_SELF_HOST` | admin | true | Set true for the Free (OSS) try path. Must be true on both api and admin. |
| `NODE_ENV` | api | production | Set to production. |
| `CORS_ORIGIN` | api | - | Admin public URL. Usually the Railway reference to admin's public domain. |
| `POSTGRES_URL` | api | - | Private Railway Postgres URL (sslmode=disable). |
| `REVEALUI_KEK` | api | - | 64 hex chars. Generate with: openssl rand -hex 32 |
| `REVEALUI_SECRET` | api | (secret) | 64 hex chars. Generate with: openssl rand -hex 32 |
| `NEXT_PUBLIC_SERVER_URL` | api | - | Public https URL of the api. |
| `REVEALUI_AUDIT_SIGNING_KEY` | api | - | Ed25519 PKCS#8 PEM that signs audit rows. Generate with openssl genpkey. |
| `REVEALUI_PUBLIC_SERVER_URL` | api | - | Public https URL of the api. |
| `REVEALUI_ALLOW_UNLICENSED_SELF_HOST` | api | true | Set true for the Free (OSS) try path. Must be true on both api and admin. |
| `POSTGRES_URL` | migrate | - | Private Railway Postgres URL (sslmode=disable). |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`

**Category:** Starters · **Languages:** TypeScript, MDX, JavaScript, CSS, Shell, Nix, Dockerfile, PLpgSQL, HTML, PowerShell

[View on Railway →](https://railway.com/deploy/revealui)
