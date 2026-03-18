# Deploy open-mercato on Railway

Deploy and Host open-mercato with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/open-mercato)

## About

Open Mercato is a new‑era, AI‑supportive platform for shipping enterprise‑grade CRMs, ERPs, and commerce backends. It’s modular, extensible, and designed so teams can mix their own modules, entities, and workflows while keeping the guardrails of a production-ready stack.

This template deploys open-mercato service, along with the neccessary dependencies: postgres, redis and meilisearch.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch | `getmeili/meilisearch:v1.11` | Worker |
| open-mercato | [open-mercato/open-mercato](https://github.com/open-mercato/open-mercato) | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `pgvector/pgvector:pg17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MEILI_ENV` | meilisearch | development | - |
| `MEILI_NO_ANALYTICS` | meilisearch | true | - |
| `PORT` | open-mercato | 3000 | - |
| `APP_URL` | open-mercato | http://0.0.0.0:3000 | - |
| `DEMO_MODE` | open-mercato | true | - |
| `DEPLOY_ENV` | open-mercato | local | - |
| `JWT_SECRET` | open-mercato | (secret) | - |
| `ADMIN_EMAIL` | open-mercato | admin@example.com | - |
| `CACHE_STRATEGY` | open-mercato | redis | - |
| `MEILISEARCH_API_KEY` | open-mercato | (secret) | - |
| `ENABLE_CRUD_API_CACHE` | open-mercato | true | - |
| `TENANT_DATA_ENCRYPTION` | open-mercato | true | - |
| `UPGRADE_ACTIONS_ENABLED` | open-mercato | true | - |
| `OM_INIT_SUPERADMIN_PASSWORD` | open-mercato | (secret) | - |
| `TENANT_DATA_ENCRYPTION_DEBUG` | open-mercato | false | - |
| `SELF_SERVICE_ONBOARDING_ENABLED` | open-mercato | true | - |
| `NEXT_PUBLIC_UPGRADE_ACTIONS_ENABLED` | open-mercato | true | - |
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

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/apps/mercato/storage`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, MDX, JavaScript, Python, CSS, Shell, Dockerfile

[View on Railway →](https://railway.com/template/open-mercato)
