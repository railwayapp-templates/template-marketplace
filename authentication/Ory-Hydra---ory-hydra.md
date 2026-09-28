# Deploy Ory Hydra on Railway

Ory Hydra 26.2: OAuth 2.0 and OpenID Connect server on Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ory-hydra)

## About

Ory Hydra is a certified OAuth 2.0 and OpenID Connect server. It issues access, refresh and ID tokens to your clients and handles the protocol details, while your own app decides who the user is through a small login and consent interface. It is headless and works with any user database.

This template runs the official `oryd/hydra:v26.2.0` image with a Railway Postgres database. A pre-deploy step runs the SQL migrations and retries until the database is reachable. The public endpoints are on an HTTPS domain, and the issuer URL is set to it. The admin API, used to create clients and accept login and consent requests, has no authentication, so it stays on the private network. Machine-to-machine clients work right away with the client credentials grant. For user logins, point `URLS_LOGIN`, `URLS_CONSENT` and `URLS_LOGOUT` at your app; until then, Hydra shows its fallback pages.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| hydra | `oryd/hydra:v26.2.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | hydra | 4444 |
| `LOG_LEVEL` | hydra | info |
| `URLS_LOGIN` | hydra | (secret) |
| `SQA_OPT_OUT` | hydra | true |
| `SECRETS_SYSTEM` | hydra | (secret) |
| `SERVE_ADMIN_HOST` | hydra | [::] |
| `SERVE_PUBLIC_HOST` | hydra | [::] |
| `SERVE_COOKIES_SAME_SITE_MODE` | hydra | Lax |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/ory-hydra)
