# Deploy FerrisKey+PostgreSQL on Railway

Unofficial hardened ferriskey docker image from Danny

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ferriskeypostgresql)

## About

FerrisKey is an open-source Identity & Access Management (IAM) server built in Rust with a hexagonal architecture — a fast, self-hosted alternative to Keycloak with OIDC/OAuth2, multi-tenant realms, and built-in MFA. Running natively in Rust instead of on the JVM, FerrisKey uses roughly 10 MB of memory versus ~500 MB for a typical Keycloak instance, with sub-second cold starts — so this template runs comfortably on the smallest Railway plan. This image is built with a minimal base and reduced attack surface (no unnecessary packages, non-root runtime) as general good practice, not as a certified or independently audited security standard. It ships alongside its own PostgreSQL database, ready to issue tokens for your apps out of the box.

Hosting FerrisKey means running the FerrisKey API server connected to a PostgreSQL instance that stores realms, users, clients, and credentials. On first boot, FerrisKey runs its own database migrations and provisions an initial admin account and realm. From there it exposes standard OIDC endpoints (authorization, token, userinfo, JWKS, discovery) that any OAuth2/OIDC-compliant application or gateway can point at, plus an admin console for managing realms, clients, users, and roles. Its low memory footprint means you can run it on a minimal instance size without the resource pressure a JVM-based IAM requires.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FerrisKey_Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| FerrisKey | `ghcr.io/ucndanny/ferriskey-hardened:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | FerrisKey_Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | FerrisKey_Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | FerrisKey_Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | FerrisKey_Postgres | (secret) | Password to connect to DB |
| `FERRISKEY_ENV` | FerrisKey | production | Run FerrisKey with production defaults. |
| `FERRISKEY_LOG_FILTER` | FerrisKey | info | Rust tracing filter; use info for normal production logging. |
| `FERRISKEY_WEBAPP_URL` | FerrisKey | - | Public URL used for the FerrisKey web console and initial client configuration. |
| `FERRISKEY_ADMIN_EMAIL` | FerrisKey | admin@example.com | Email address for the initial administrator account. |
| `FERRISKEY_SERVER_HOST` | FerrisKey | :: | IPv6 bind address for Railway networking. |
| `FERRISKEY_SERVER_PORT` | FerrisKey | 8080 | HTTP port used by the FerrisKey server. |
| `FERRISKEY_DATABASE_URL` | FerrisKey | - | Connection string for the bundled PostgreSQL service. |
| `FERRISKEY_ADMIN_PASSWORD` | FerrisKey | (secret) | Password for the initial administrator account. |
| `FERRISKEY_ADMIN_USERNAME` | FerrisKey | (secret) | Username for the initial administrator account. |
| `FERRISKEY_ALLOWED_ORIGINS` | FerrisKey | - | Public origin permitted by FerrisKey CORS policy. |
| `FERRISKEY_SERVER_PUBLIC_URL` | FerrisKey | - | Canonical public origin used in redirects and signed SAML identifiers. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/usr/local/bin/ferriskey-api`
- **Healthcheck:** `/api/health/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/ferriskeypostgresql)
