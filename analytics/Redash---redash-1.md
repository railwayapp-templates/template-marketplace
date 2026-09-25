# Deploy Redash on Railway

Redash 26.9: SQL dashboards and charts, with a worker and scheduler.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redash-1)

## About

Redash is an open-source tool for querying data and sharing dashboards. You write SQL or native queries against Postgres, MySQL, BigQuery, ClickHouse, MongoDB and dozens of other sources, turn results into charts, and combine them into shareable dashboards with refresh schedules, alerts and query parameters for your whole team.

This template runs the official `redash/redash:26.9.0` image as two services with Railway Postgres and Redis. `redash` runs migrations, creates the admin user from `REDASH_ADMIN_EMAIL` and a generated password on first boot, then serves the web app; because an admin exists, the public `/setup` page redirects away. `worker` runs the RQ scheduler and query workers for all queues in one container. Queries, dashboards and users live in Postgres. The web service fits the Hobby plan; the worker's memory grows with query result sizes. Add your databases under Settings → Data Sources.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| worker | `redash/redash:26.9.0` | Worker |
| redash | `redash/redash:26.9.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `QUEUES` | worker | queries,scheduled_queries,schemas,periodic,emails,default |
| `WORKERS_COUNT` | worker | 2 |
| `PYTHONUNBUFFERED` | worker | 0 |
| `REDASH_LOG_LEVEL` | worker | INFO |
| `REDASH_SECRET_KEY` | worker | (secret) |
| `REDASH_COOKIE_SECRET` | worker | (secret) |
| `PORT` | redash | 5000 |
| `PYTHONUNBUFFERED` | redash | 0 |
| `REDASH_LOG_LEVEL` | redash | INFO |
| `REDASH_ADMIN_NAME` | redash | Admin |
| `REDASH_SECRET_KEY` | redash | (secret) |
| `REDASH_ADMIN_EMAIL` | redash | admin@example.com |
| `REDASH_WEB_WORKERS` | redash | 2 |
| `REDASH_COOKIE_SECRET` | redash | (secret) |
| `REDASH_ADMIN_PASSWORD` | redash | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `sh -c '/app/manage.py rq scheduler & sid=$!; /app/bin/docker-entrypoint worker & wid=$!; trap "kill -TERM $sid $wid; wait $sid $wid; exit 0" TERM INT; wait $wid; kill -TERM $sid; wait $sid'`
- **Start command:** `sh -c '/app/manage.py database create_tables && /app/manage.py db upgrade && (/app/manage.py users create_root "$REDASH_ADMIN_EMAIL" "$REDASH_ADMIN_NAME" --password "$REDASH_ADMIN_PASSWORD" || true) && exec /app/bin/docker-entrypoint server'`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/redash-1)
