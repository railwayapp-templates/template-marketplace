# Deploy Keycloak — Self-Hosted Auth0 Alternative with SSO on Railway

Self-host Keycloak: SSO, OIDC, SAML. No per-MAU fees. Apple & Discord login

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keycloak-auth0-alternative)

## About

Keycloak is the enterprise-grade open-source identity and access management platform — backed by
Red Hat and the CNCF, powering authentication at Fortune 500 companies and government agencies.
Single sign-on, OIDC, OAuth 2.0, SAML 2.0, LDAP/Active Directory federation, MFA, identity
brokering, and fine-grained authorization — every protocol Auth0 charges enterprise prices for,
with no per-MAU fees. This template ships Keycloak with a **modern keywind theme** plus
**Apple and Discord identity providers** pre-configured, backed by a private PostgreSQL.

**Auth0 bills $2,000–$5,000/month at 50,000 MAU.** At 100,000 users the gap versus self-hosted
runs past 100x. Keycloak on Railway costs flat compute — no per-user pricing, no feature gates,
and your user store on infrastructure you own.

---

Keycloak is a stateful Java service (Quarkus-based) backed by a database — PostgreSQL is the
standard. Running it means a persistent server, a wired database, secrets, HTTPS, and theming
work. Keycloak is powerful but heavy: it idles around 1–2 GB RAM before the database.

Railway handles the wiring. This template connects Keycloak to a private PostgreSQL instance,
serves admin and login over HTTPS, and ships with a keywind theme plus Apple + Discord social
login already configured — the setup that usually takes hours is done.

Typical cost: **~$10–20/month** on Railway depending on RAM. Auth0 charges per monthly active
user — roughly $2,000–$5,000/month at 50,000 MAU, escalating into six figures annually once
SAML, organizations, and log streaming are bundled. Keycloak self-hosted has no per-MAU ceiling.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Keycloak | [leonardochappuis/keycloak-docker](https://github.com/leonardochappuis/keycloak-docker) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Keycloak | 8080 | - |
| `KC_DB` | Keycloak | postgres | - |
| `KC_PROXY` | Keycloak | edge | - |
| `KC_FEATURES` | Keycloak | token-exchange | - |
| `KC_HTTP_PORT` | Keycloak | 8080 | - |
| `KC_DB_PASSWORD` | Keycloak | (secret) | - |
| `KC_DB_USERNAME` | Keycloak | (secret) | - |
| `KEYCLOAK_ADMIN` | Keycloak | - | Your default admin username |
| `KC_HTTP_ENABLED` | Keycloak | true | - |
| `KC_HEALTH_ENABLED` | Keycloak | true | - |
| `KC_HOSTNAME_STRICT` | Keycloak | true | - |
| `KC_METRICS_ENABLED` | Keycloak | true | - |
| `KC_DB_POOL_MIN_SIZE` | Keycloak | 0 | - |
| `KEYCLOAK_ADMIN_PASSWORD` | Keycloak | (secret) | - |
| `PROXY_ADDRESS_FORWARDING` | Keycloak | true | - |
| `KC_HOSTNAME_STRICT_BACKCHANNEL` | Keycloak | true | - |
| `QUARKUS_TRANSACTION_MANAGER_ENABLE_RECOVERY` | Keycloak | true | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Languages:** FreeMarker, Dockerfile

[View on Railway →](https://railway.com/deploy/keycloak-auth0-alternative)
