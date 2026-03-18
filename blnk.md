# Deploy blnk on Railway

Deploy and Host blnk with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/blnk)

## About

blnk is an open-source double-entry ledger and financial transaction engine for building wallets, payments, and internal accounting systems. It helps you record movements of value with auditability, idempotency, and clear separation between balances, transactions, and metadata—so you can build reliable fintech flows faster.

...

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense | `typesense/typesense` | Worker |
| Redis | `redis:8.2.1` | Database |
| blnk | `jerryenebeli/blnk` | Worker |
| Postgres-Blnk | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| query-agent | `blnkfinance/query-agent:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | typesense | 8080 | - |
| `TYPESENSE_API_KEY` | typesense | (secret) | pass own |
| `TYPESENSE_THREAD_POOL_SIZE` | typesense | 64 | - |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | typesense | 32 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `BLNK_SERVER_SSL` | blnk | false | - |
| `BLNK_SERVER_PORT` | blnk | 8080 | - |
| `BLNK_SERVER_SECURE` | blnk | false | - |
| `POSTGRES_DB` | Postgres-Blnk | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres-Blnk | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres-Blnk | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres-Blnk | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres-Blnk | - | Public URL to connect to Postgres database, used by the Data panel. |
| `CONNECTION_KEY` | query-agent | 1111 | pass own |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/blnk)
