# Deploy Authentik on Railway

Open-source identity provider with SSO, OIDC, SAML, MFA, and LDAP support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/authentik-1)

## About

Authentik is an open-source identity provider and SSO platform that supports OAuth2, OIDC, SAML, LDAP, and SCIM. It lets you centralize authentication across all your applications, enforce MFA, and manage users with a built-in admin UI and flow engine.

Hosting Authentik requires running two coordinated services ΓÇö a server (handles HTTP and authentication flows) and a worker (handles background tasks like email and policy execution) ΓÇö plus a PostgreSQL database and a Redis instance for session storage and task queuing. Both the server and worker share the same secret key and database credentials. On Railway, Postgres and Redis are provisioned as managed services, and all inter-service credentials are wired automatically via reference variables. Persistent volumes are not required because Authentik stores all state in PostgreSQL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| authentik-worker | [c-treinta/railway-authentik](https://github.com/c-treinta/railway-authentik) (root: worker/) | Worker |
| authentik-server | [c-treinta/railway-authentik](https://github.com/c-treinta/railway-authentik) | Worker |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AUTHENTIK_SECRET_KEY` | authentik-worker | (secret) | Shared secret key ΓÇö referenced from the server service |
| `AUTHENTIK_REDIS__HOST` | authentik-worker | - | Railway reference to managed Redis host |
| `AUTHENTIK_POSTGRESQL__HOST` | authentik-worker | - | Railway reference to managed PostgreSQL host |
| `AUTHENTIK_POSTGRESQL__NAME` | authentik-worker | - | Railway reference to PostgreSQL database name |
| `AUTHENTIK_POSTGRESQL__PORT` | authentik-worker | - | Railway reference to managed PostgreSQL port |
| `AUTHENTIK_POSTGRESQL__USER` | authentik-worker | (secret) | Railway reference to PostgreSQL username |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | authentik-worker | (secret) | Railway reference to PostgreSQL password |
| `PORT` | authentik-server | 9000 | HTTP port Authentik server listens on |
| `AUTHENTIK_SECRET_KEY` | authentik-server | (secret) | Cryptographic secret key ΓÇö auto-generated, never share or expose |
| `AUTHENTIK_REDIS__HOST` | authentik-server | - | Railway reference to managed Redis host |
| `AUTHENTIK_POSTGRESQL__HOST` | authentik-server | - | Railway reference to managed PostgreSQL host |
| `AUTHENTIK_POSTGRESQL__NAME` | authentik-server | - | Railway reference to PostgreSQL database name |
| `AUTHENTIK_POSTGRESQL__PORT` | authentik-server | - | Railway reference to managed PostgreSQL port |
| `AUTHENTIK_POSTGRESQL__USER` | authentik-server | (secret) | Railway reference to PostgreSQL username |
| `AUTHENTIK_POSTGRESQL__PASSWORD` | authentik-server | (secret) | Railway reference to PostgreSQL password |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/-/health/live`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication · **Languages:** Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/authentik-1)
