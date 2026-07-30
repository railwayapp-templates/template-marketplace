# Deploy Authentik — Self-Hosted SSO, OAuth2, SAML & LDAP on Railway

Self-host Authentik — SSO, OAuth2, SAML, LDAP & MFA identity

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/authentik-sso-identity-provider)

## About

Authentik is a full-featured, open-source identity provider — a self-hosted alternative to Okta, Auth0, and Azure AD that unifies OAuth2, OIDC, SAML, LDAP, SCIM, and MFA behind one login. Protect every app you run with single sign-on, enforce hardware-key or TOTP MFA from one policy, and add authentication in front of apps with no native SSO. This template deploys Authentik on its current architecture — server, worker, and PostgreSQL, with no separate Redis to run.

---

Authentik has an architecture that catches people off guard, and its current version simplifies the stack in a way worth knowing.

**It runs as two services from one image — you need both.** Authentik splits into a `server` (API, SSO flows, frontend) and a `worker` (Celery background jobs: certificate rotation, LDAP sync, email, event processing), started from the same `ghcr.io/goauthentik/server` image with different commands. Deploy only the server and logins may work but background tasks silently don't — expiring certs, failing LDAP sync, no emails. This template runs both, wired to a shared PostgreSQL.

**No Redis needed on current versions.** Since Authentik 2025.10, the mandatory Redis dependency is gone — the minimum stack is PostgreSQL plus server and worker, three services instead of four. This template uses a current image, so you run and pay for one fewer service than older four-container setups, and all state lives in PostgreSQL, simplifying backups.

**`AUTHENTIK_SECRET_KEY` signs everything — set it once and keep it.** This key signs tokens and sessions. If it changes or is lost, recovery is painful and sessions break. Generate a long random value (`openssl rand -hex 32`), set it once, and back it up — don't rotate it casually.

**Database config uses nested double-underscore variables.** Authentik reads its Postgres settings as `AUTHENTIK_POSTGRESQL__HOST`, `AUTHENTIK_POSTGRESQL__USER`, and so on — the double underscore is significant. This template wires them from Railway reference variables so the server and worker both reach the database over the private network.

Set your domain and MFA policy after first login, and configure SMTP so users receive enrollment and recovery emails.

Typical cost: **~$10–15/month** on Railway across the three services. Authentik is open source and free; Okta and Auth0 bill per user, which scales steeply.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Authentik Server | `ghcr.io/goauthentik/server` | Database |
| Authentik Worker | `ghcr.io/goauthentik/server` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Authentik Server | 9000 | - |
| `AUTHENTIK_SECRET_KEY` | Authentik Server | (secret) | - |
| `AUTHENTIK_BOOTSTRAP_EMAIL` | Authentik Server | - | Initial admin email for bootstrap |
| `AUTHENTIK_POSTGRESQL__USER` | Authentik Server | (secret) | - |
| `AUTHENTIK_BOOTSTRAP_PASSWORD` | Authentik Server | (secret) | Initial admin password first boot |
| `AUTHENTIK_DEFAULT_TOKEN_LENGTH` | Authentik Server | (secret) | - |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | Authentik Server | (secret) | - |
| `AUTHENTIK_ERROR_REPORTING__ENABLED` | Authentik Server | false | - |
| `AUTHENTIK_SECRET_KEY` | Authentik Worker | (secret) | - |
| `AUTHENTIK_POSTGRESQL__USER` | Authentik Worker | (secret) | - |
| `AUTHENTIK_BOOTSTRAP_PASSWORD` | Authentik Worker | (secret) | - |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | Authentik Worker | (secret) | - |
| `AUTHENTIK_ERROR_REPORTING__ENABLED` | Authentik Worker | false | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Volume:** `/media`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/authentik-sso-identity-provider)
