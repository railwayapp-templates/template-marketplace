# Deploy Logto — Open-Source Auth, SSO & Multi-Tenancy on Railway

Self-host Logto — modern auth with SSO, RBAC & multi-tenancy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/logto-auth-sso-rbac)

## About

Logto is a modern, open-source identity and authentication platform — a self-hosted alternative to Auth0 and Clerk with sign-in flows, social and enterprise SSO, multi-factor auth, RBAC, and multi-tenancy built in. It's OIDC-compliant with SDKs for every major framework, so you add production-grade auth to your apps without building it yourself or paying per active user. This template deploys Logto with PostgreSQL and — critically — the two-port core/admin split configured correctly for Railway.

---

Logto has an architecture worth understanding before you deploy, because it's the source of the most common Railway failure.

**Logto runs two ports, and each needs its own domain.** Port `3001` serves the core — the OIDC provider and API your apps authenticate against — and port `3002` serves the Admin Console where you configure everything. On Railway, a service gets one domain bound to one port, so a naive deployment leaves one of them unreachable, showing an error page instead of the Admin Console. This template configures the two-port split so both the core endpoint and the Admin Console resolve to the correct ports. If you add a custom domain later, bind the core to `3001` and the admin domain to `3002`.

**`ENDPOINT` and `ADMIN_ENDPOINT` must be your real HTTPS URLs.** `ENDPOINT` sets the OIDC issuer identifier every integrated app validates against, and `ADMIN_ENDPOINT` sets the Admin Console's redirect URIs. Wrong values cause authentication failures that are hard to diagnose, so set both to your actual Railway domains.

**`TRUST_PROXY_HEADER=1` is required on Railway**, because Railway terminates HTTPS with a proxy in front of Logto. Without it, Logto can misjudge whether requests are secure and break redirect and cookie behavior.

**The database is seeded on first run and holds your identity data.** Logto seeds its schema on initial startup and stores all users, applications, and roles in PostgreSQL. Back up the volume before relying on it — this is production identity data.

Typical cost: **~$10–15/month** on Railway for Logto and Postgres. Logto OSS is free with no per-user pricing; Auth0 and Clerk bill per monthly active user, which scales painfully as you grow.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Logto Auth | `svhd/logto:latest` | Worker |
| Logto Admin Console | `svhd/logto:latest` | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Logto Auth | 3001 | - |
| `TRUST_PROXY_HEADER` | Logto Auth | 1 | - |
| `ADMIN_DISABLE_LOCALHOST` | Logto Auth | 1 | - |
| `CASE_SENSITIVE_USERNAME` | Logto Auth | (secret) | - |
| `ADMIN_PORT` | Logto Admin Console | 3002 | - |
| `TRUST_PROXY_HEADER` | Logto Admin Console | 1 | - |
| `CASE_SENSITIVE_USERNAME` | Logto Admin Console | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/logto-auth-sso-rbac)
