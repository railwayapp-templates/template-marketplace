# Deploy Authentik on Railway

Self-host Authentik, the open source identity provider for SSO and MFA

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/authentik-railway)

## About

authentik is an open-source identity provider that puts single sign-on, multi-factor
authentication and user management in front of everything your team runs. It speaks
OAuth2/OpenID Connect, SAML, LDAP, SCIM, RADIUS and forward-auth, so one directory logs
people into a SaaS dashboard, a Kubernetes console, a VPN and an internal tool with no
login of its own. Teams self-host authentik to get Okta or Auth0 behaviour without
per-seat pricing, and to keep identity data in infrastructure they control.

Deploying authentik on Railway gives you the production shape, not a single-container
demo. The template runs the `ghcr.io/goauthentik/server` image twice — as the **server**,
which takes browser and API traffic on port 9000 and is the only service with a public
domain, and as the **worker**, which runs background tasks, scheduled jobs, blueprint
reconciliation and outpost management. Both connect privately to a managed **PostgreSQL**
database holding users, flows, sessions, the task queue and the cache, and both write
uploaded files to a managed **object storage bucket**, so neither needs a disk. Recent
releases dropped the Redis requirement, so you self-host authentik here with three
services instead of four.

![authentik Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786647079/d143430c-5438-45d6-a15e-01b8747f8a76.png)

authentik replaces a pile of half-configured login systems with one directory and one set
of policies. Every login is a **flow** — an ordered list of stages such as identify,
password, TOTP and consent — so you can require a passkey for admins or offer
self-service password reset without touching any application's code. Applications attach
to providers, and the provider picks the protocol: OAuth2/OIDC and SAML for modern apps,
LDAP for software that can only bind to a directory, RADIUS for network gear, SCIM for
pushing users into external SaaS, and a proxy provider for apps with no login at all.

- OAuth2/OIDC, SAML 2.0, LDAP, SCIM, RADIUS and forward-auth providers
- Flow-based authentication with conditional, per-application policies
- TOTP, WebAuthn/passkeys, SMS, email and Duo second factors
- Role-based access control, a full REST API and a Terraform provider

The **server** handles HTTP and runs the embedded outpost used by proxy providers. The
**worker** consumes the task queue, applies blueprints, refreshes certificates and syncs
directory sources — it must exist exactly once. **PostgreSQL** is the single source of
truth, sessions and shared cache included, which is what lets the server scale
horizontally. **Object storage** holds icons, avatars and reports.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| authentik | `ghcr.io/goauthentik/server:2026.5.6` | Web service |
| authentik-worker | `ghcr.io/goauthentik/server:2026.5.6` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | authentik | 9000 | Health-check target port |
| `AUTHENTIK_LOG_LEVEL` | authentik | info | Application log level |
| `AUTHENTIK_SECRET_KEY` | authentik | (secret) | Cookie and session signing key |
| `AUTHENTIK_WEB__THREADS` | authentik | 4 | Threads per worker process |
| `AUTHENTIK_WEB__WORKERS` | authentik | 2 | Gunicorn worker processes |
| `AUTHENTIK_BOOTSTRAP_EMAIL` | authentik | admin@example.com | First admin account email |
| `AUTHENTIK_POSTGRESQL__HOST` | authentik | - | Private database hostname |
| `AUTHENTIK_POSTGRESQL__NAME` | authentik | - | Database name |
| `AUTHENTIK_POSTGRESQL__PORT` | authentik | - | Database port |
| `AUTHENTIK_POSTGRESQL__USER` | authentik | (secret) | Database user |
| `AUTHENTIK_STORAGE__BACKEND` | authentik | s3 | Store media in object storage |
| `AUTHENTIK_BOOTSTRAP_PASSWORD` | authentik | (secret) | First admin account password |
| `AUTHENTIK_STORAGE__S3__REGION` | authentik | - | Bucket region |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | authentik | (secret) | Database password |
| `AUTHENTIK_STORAGE__S3__ENDPOINT` | authentik | - | Bucket API endpoint URL |
| `AUTHENTIK_STORAGE__S3__ACCESS_KEY` | authentik | - | Bucket access key |
| `AUTHENTIK_STORAGE__S3__SECRET_KEY` | authentik | (secret) | Bucket secret key |
| `AUTHENTIK_ERROR_REPORTING__ENABLED` | authentik | false | Disable Sentry error reporting |
| `AUTHENTIK_STORAGE__S3__BUCKET_NAME` | authentik | - | Bucket name |
| `AUTHENTIK_DISABLE_STARTUP_ANALYTICS` | authentik | true | Disable startup analytics ping |
| `AUTHENTIK_LISTEN__TRUSTED_PROXY_CIDRS` | authentik | 127.0.0.0/8,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,fe80::/10,::1/128,100.64.0.0/10,fd00::/8 | Proxies allowed to set forwarded headers |
| `AUTHENTIK_LOG_LEVEL` | authentik-worker | info | Application log level |
| `AUTHENTIK_SECRET_KEY` | authentik-worker | (secret) | Must match the server key |
| `AUTHENTIK_BOOTSTRAP_EMAIL` | authentik-worker | - | First admin account email |
| `AUTHENTIK_POSTGRESQL__HOST` | authentik-worker | - | Private database hostname |
| `AUTHENTIK_POSTGRESQL__NAME` | authentik-worker | - | Database name |
| `AUTHENTIK_POSTGRESQL__PORT` | authentik-worker | - | Database port |
| `AUTHENTIK_POSTGRESQL__USER` | authentik-worker | (secret) | Database user |
| `AUTHENTIK_STORAGE__BACKEND` | authentik-worker | s3 | Store media in object storage |
| `AUTHENTIK_WORKER__PROCESSES` | authentik-worker | 1 | Worker processes, keep at one |
| `AUTHENTIK_BOOTSTRAP_PASSWORD` | authentik-worker | (secret) | First admin account password |
| `AUTHENTIK_STORAGE__S3__REGION` | authentik-worker | - | Bucket region |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | authentik-worker | (secret) | Database password |
| `AUTHENTIK_STORAGE__S3__ENDPOINT` | authentik-worker | - | Bucket API endpoint URL |
| `AUTHENTIK_STORAGE__S3__ACCESS_KEY` | authentik-worker | - | Bucket access key |
| `AUTHENTIK_STORAGE__S3__SECRET_KEY` | authentik-worker | (secret) | Bucket secret key |
| `AUTHENTIK_ERROR_REPORTING__ENABLED` | authentik-worker | false | Disable Sentry error reporting |
| `AUTHENTIK_STORAGE__S3__BUCKET_NAME` | authentik-worker | - | Bucket name |
| `AUTHENTIK_DISABLE_STARTUP_ANALYTICS` | authentik-worker | true | Disable startup analytics ping |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `dumb-init -- ak server`
- **Healthcheck:** `/api/v3/root/config/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `dumb-init -- ak worker`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/authentik-railway)
