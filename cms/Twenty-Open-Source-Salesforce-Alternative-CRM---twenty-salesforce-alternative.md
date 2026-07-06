# Deploy Twenty — Open-Source Salesforce Alternative CRM on Railway

Self-host Twenty CRM: open-source Salesforce alternative. No per-seat fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twenty-salesforce-alternative)

## About

Twenty is the open-source CRM built to replace Salesforce — **45k+ GitHub stars**, Y Combinator
S23, AGPL-3.0, and free forever when self-hosted. A modern React interface that feels like
Notion, custom objects and fields with no SQL migrations, Airtable-style tables and Kanban
pipelines, workflow automation, full RBAC, and a complete GraphQL + REST API where every object
you create is instantly available. Built by a Paris team for technical teams that want to own
their customer data instead of renting it.

**A 10-person team pays ~$19,800/year for Salesforce Enterprise.** HubSpot Sales Professional
runs ~$100/user/month. Twenty self-hosted on Railway costs ~$10–20/month flat for the whole
team — no per-seat fees, no feature gates, no data lock-in.

---

Twenty is a production-grade CRM — React frontend, NestJS backend, PostgreSQL, and Redis — and
running it means coordinating four moving parts with a shared secret, database migrations on
deploy, and a public HTTPS endpoint. The official path is Docker Compose on a VPS you manage;
this template does the same wiring on Railway with zero server administration.

Railway provisions the server, worker, PostgreSQL, and Redis over private networking, runs
migrations automatically, and serves the app over HTTPS. Your CRM data lives in your own
PostgreSQL instance — export it, migrate it, or fork the whole platform at any time.

Typical cost: **~$10–20/month** on Railway's Hobby plan for the full four-service stack.
Salesforce Sales Cloud Enterprise is $165/user/month; HubSpot Sales Professional is
~$100/user/month plus onboarding fees. Twenty self-hosted has no per-seat license — the cost is
flat compute no matter how many people you add.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Twenty Worker | `twentycrm/twenty:latest` | Worker |
| Twenty | `twentycrm/twenty:latest` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `APP_SECRET` | Twenty Worker | (secret) | - |
| `DISABLE_DB_MIGRATIONS` | Twenty Worker | true | - |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty Worker | (secret) | - |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty Worker | true | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Twenty Worker | true | - |
| `NODE_PORT` | Twenty | 3000 | - |
| `APP_SECRET` | Twenty | (secret) | - |
| `STORAGE_TYPE` | Twenty | s3 | - |
| `STORAGE_LOCAL_PATH` | Twenty | data | - |
| `DISABLE_DB_MIGRATIONS` | Twenty | false | - |
| `STORAGE_S3_SECRET_ACCESS_KEY` | Twenty | (secret) | - |
| `DISABLE_CRON_JOBS_REGISTRATION` | Twenty | false | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Twenty | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/packages/twenty/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/twenty-salesforce-alternative)
