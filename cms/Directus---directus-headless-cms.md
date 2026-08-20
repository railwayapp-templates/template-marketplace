# Deploy Directus on Railway

Turns any SQL database into a REST API, GraphQL API and admin app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/directus-headless-cms)

## About

Directus is an open data platform that points at a SQL database and instantly gives you a REST API, a GraphQL API, and a no-code admin app called the Data Studio. Unlike most headless CMS tools it invents no storage format of its own: every collection is a real table, every field a real column, so the data stays queryable by anything else that reaches the database. Teams run it as a headless CMS, as an instant backend over an existing schema, and as an internal admin panel.

Self-host Directus on Railway with this template and you get the production shape upstream documents, not one container with a file beside it. The Directus service is public and terminates TLS at Railway's edge; managed PostgreSQL holds the schema and content; managed Redis backs the cache, the rate limiter, and the message bus behind realtime and collaborative editing; and a managed object-storage bucket holds uploaded files *and* Marketplace extensions. Every piece of shared state lives outside the container, so the app carries no volume and scales to more replicas without a config change.

![Diagram of the Directus, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787150681/directus-architecture.png)

Most teams need two things from one database: an API for developers and an editing interface for everyone else. Building either by hand takes weeks and is redone whenever the schema changes. Directus derives both from the schema, so adding a column adds an API field and a form input in one action. Self-hosting suits sensitive content, a database that cannot move, an API that belongs on your private network, or per-seat pricing that has stopped adding up.

- **Instant REST and GraphQL APIs** with filtering, sorting, aggregation, and relational queries
- **The Data Studio**, a no-code admin app with configurable layouts and content versioning
- **Granular access control** through roles, policies, and per-field permissions
- **File storage with on-the-fly image transformation** by query string
- **Flows** for automation, **realtime** over WebSockets, and Marketplace extensions

The **Directus** service runs the API and serves the Studio. **PostgreSQL** holds the system tables and your collections. **Redis** is what makes a second replica safe: shared cache, rate-limit counters, and the pub/sub bus keeping realtime sessions consistent. The **bucket** keeps uploads and extensions off the container filesystem.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| directus | `directus/directus:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Healthcheck:** `/server/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/directus-headless-cms)
