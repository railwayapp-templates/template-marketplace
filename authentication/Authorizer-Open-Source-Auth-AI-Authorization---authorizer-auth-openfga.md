# Deploy Authorizer — Open Source Auth + AI Authorization on Railway

Self-host Authorizer — auth, login UI & permission-aware AI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/authorizer-auth-openfga)

## About

Authorizer is an open-source authentication and authorization solution with a built-in login page and admin panel out of the box. Beyond standard auth — email/password, social login, magic links, JWT sessions — Authorizer v2 ships an **embedded OpenFGA engine** for fine-grained, relationship-based authorization, so the same server that logs users in can also answer "can this user see this?" in-process. That makes it uniquely suited to permission-aware AI and RAG. This template deploys Authorizer with a database, wired correctly for Railway.

---

Authorizer is a single lightweight binary, but v2 has one Railway-specific deployment detail that determines whether it starts at all.

**Authorizer v2 takes CLI arguments, not direct env vars — the ENTRYPOINT must be overridden.** In v2, configuration is passed as command-line flags. When you extend the image and use a shell-form command so Railway's injected variables expand at runtime, you **must override the ENTRYPOINT to `["/bin/sh", "-c"]`** — otherwise the base entrypoint receives `/bin/sh -c` as arguments and the binary fails to start. This is the most common v2-on-Railway failure, and this template wires the ENTRYPOINT and flag mapping correctly so it boots on the first deploy.

**The embedded OpenFGA engine is the standout feature.** Authorizer v2 bundles OpenFGA — the open-source implementation of Google's Zanzibar relationship-based access control — inside the same server that handles login, answering authorization questions ("can this user view this document?") in-process. That's powerful for AI: you can put the permission boundary *inside* the retrieval step of a RAG pipeline, so the model can never surface a document the user was never allowed to see — the record never becomes a candidate. That's authorization vector search alone can't provide.

**It supports the widest range of databases of any auth server** — PostgreSQL, MySQL, SQLite, MongoDB, and DynamoDB. If you already run Mongo or DynamoDB, you don't need a separate Postgres just for auth. This template uses Postgres by default, but `DATABASE_TYPE` and `DATABASE_URL` can point elsewhere.

**Set the secrets and admin credentials.** `ADMIN_SECRET` protects the admin panel, `JWT_SECRET` signs tokens, and `CLIENT_ID`/`CLIENT_SECRET` identify the instance — set strong values and keep them stable. Add `REDIS_URL` only if you run multiple instances, so sessions and rate limits stay consistent.

Typical cost: **~$5–10/month** on Railway for Authorizer and Postgres. Authorizer is open source and free — no per-user auth tax.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Authorizer | [authorizerdev/authorizer-railway](https://github.com/authorizerdev/authorizer-railway) | Worker |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/authorizer-auth-openfga)
