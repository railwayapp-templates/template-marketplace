# Deploy NocoDB — Open Source Airtable Alternative on Railway

Turn Postgres into a smart spreadsheet — grid, kanban, forms, API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-airtable-alt-postgres)

## About

NocoDB is a self-hosted, open-source no-code database platform — the leading Airtable alternative. It turns a PostgreSQL database into a smart spreadsheet with grid, gallery, kanban, calendar, and form views, gives non-technical teammates a browser interface to work in, and exposes an auto-generated REST API on top of your data. Unlimited users, unlimited records, no per-seat pricing.

This template deploys NocoDB with a managed PostgreSQL database and a persistent volume, pre-wired and ready to use in minutes.

---

NocoDB gives you the Airtable experience — tables, views, forms, linked records, rollups — while keeping every row in a PostgreSQL database you own. There is no record cap, no per-editor bill, and no vendor holding your data. You can also point NocoDB at an existing external PostgreSQL or MySQL database and instantly get a spreadsheet interface over data you already have.

Running it in production means an application server, a reliable Postgres store, persistent file storage for attachments, and a couple of Railway-specific settings that matter. This template handles all of it. PostgreSQL is provisioned and connected on deploy, a volume persists uploads across redeploys, and the memory limit that prevents NocoDB's most common startup crash on Railway is set for you.

Typical cost: **~$5–10/month** on Railway's Hobby plan for a small-team deployment with Postgres — flat, regardless of how many users or records you add.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NocoDB | `nocodb/nocodb` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | NocoDB | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Volume:** `/usr/app/data/`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/nocodb-airtable-alt-postgres)
