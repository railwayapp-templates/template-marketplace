# Deploy Directus on Railway

Self-host Directus — instant REST and GraphQL APIs over your SQL database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/directus-sql-api)

## About

Directus turns a SQL database into a REST API, a GraphQL API and an admin app, without generating code or imposing a schema. Point it at Postgres, MySQL or SQL Server and existing tables become endpoints with roles, permissions and a Studio non-technical colleagues can use. This template runs it with managed Postgres, Redis and object storage — and says what connecting a database you already own does to it.

Directus deploys cleanly. What catches people is what it writes into your database, and which features its licence tier actually enforces.

**Connecting an existing database means Directus writes into it.** The pitch is that it wraps a database you already have, and it does — but it also creates roughly twenty `directus_*` system tables inside it for its own users, roles, permissions and schema metadata. The Studio also exposes schema editing, so anyone with admin rights can alter your real tables from a web UI. Never point it at production with an owner-level account: use a dedicated schema and a scoped user, or a replica.

**The licence changed, and most guides describe the old one.** Directus 12 is under the Monospace Sustainable Core License, not the BSL 1.1 terms still quoted with a $5M revenue threshold. Self-hosted instances run the free Core tier with no key required; a `LICENSE_KEY` unlocks the licensed tier, and each release additionally becomes GPL-3.0 four years after shipping. Read the current terms, not last year's blog post.

**Some permission enforcement lives in the licensed tier.** Enforceable RBAC filters are a licensed feature, so you can build a permissions model on Core, see it in the UI, and find filters are not applied as expected. Test access rules against the API with a real token, not in the Studio.

**Railway mounts volumes as root and Directus runs unprivileged.** Use a volume and its ownership must be repaired before Directus starts, or writes fail silently. This template sends files to object storage instead, sidestepping the problem and matching what upstream documents for production.

**`KEY` and `SECRET` must never change after first boot.** They identify the project and sign sessions and tokens; rotate either and every existing session and token is invalid. Both are generated once here.

**A stock Directus deploy prints its admin password to the log.** With no `ADMIN_EMAIL` and `ADMIN_PASSWORD` set, bootstrap generates credentials and logs them, so getting in means scrolling the deploy log — and once it rotates, the password is gone. Set both as variables.

Typical cost: **~$20–35/month** for the four services at $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes, plus storage. Directus Core is free to self-host.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| directus | `directus/directus:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | directus | 8055 | HTTP listening port |
| `REDIS` | directus | - | Redis connection string |
| `SECRET` | directus | (secret) | Signs sessions and tokens |
| `DB_CLIENT` | directus | pg | Selects the PostgreSQL driver |
| `PUBLIC_URL` | directus | - | Public-facing base URL |
| `ADMIN_EMAIL` | directus | admin@example.com | First administrator email |
| `CACHE_STORE` | directus | redis | Keep cache in Redis |
| `HSTS_ENABLED` | directus | true | Send Strict-Transport-Security |
| `NODE_OPTIONS` | directus | --max-old-space-size=2048 | Cap the Node heap |
| `PROJECT_NAME` | directus | Directus | Name shown in the Data Studio |
| `CACHE_ENABLED` | directus | true | Enable the data cache |
| `ADMIN_PASSWORD` | directus | (secret) | First administrator password |
| `IP_TRUST_PROXY` | directus | 0.0.0.0/1,128.0.0.0/1,::/1,8000::/1 | Trust the proxy chain |
| `STORAGE_S3_KEY` | directus | - | Object storage access key |
| `EXTENSIONS_PATH` | directus | extensions | Extension prefix inside the bucket |
| `CACHE_AUTO_PURGE` | directus | true | Purge cache on data writes |
| `STORAGE_LOCATIONS` | directus | s3 | Active storage location key |
| `STORAGE_S3_BUCKET` | directus | - | Object storage bucket name |
| `STORAGE_S3_DRIVER` | directus | s3 | Use the S3 storage driver |
| `STORAGE_S3_REGION` | directus | - | Object storage region |
| `STORAGE_S3_SECRET` | directus | (secret) | Object storage secret key |
| `RATE_LIMITER_STORE` | directus | redis | Count rate limits in Redis |
| `WEBSOCKETS_ENABLED` | directus | true | Realtime and GraphQL subscriptions |
| `EXTENSIONS_LOCATION` | directus | s3 | Load extensions from the bucket |
| `STORAGE_S3_ENDPOINT` | directus | - | Object storage endpoint |
| `DB_CONNECTION_STRING` | directus | - | Postgres connection string |
| `RATE_LIMITER_ENABLED` | directus | true | Per-IP API rate limiting |
| `SESSION_COOKIE_SECURE` | directus | true | Mark session cookie Secure |
| `REFRESH_TOKEN_COOKIE_SECURE` | directus | (secret) | Mark refresh cookie Secure |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS

[View on Railway →](https://railway.com/deploy/directus-sql-api)
