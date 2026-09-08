# Deploy medusa-v2 on Railway

Medusa v2 commerce backend: server+worker split, Postgres+Redis, one-click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/medusa-v2)

## About

Deploy Medusa v2 on Railway in one click. The template provisions four services — `medusa-server` (API + admin, public domain, port 9000), `medusa-worker` (background jobs, private), `Postgres`, and `Redis` — with all environment variables, service references, generated secrets (`JWT_SECRET`, `COOKIE_SECRET`, `MEDUSA_ADMIN_PASSWORD`), healthchecks (`/health`), and restart policies pre-configured. Both Medusa services build from a public GitHub repo you can fork and customize (`src/api`, `src/modules`, `src/subscribers`, `src/workflows`).

Medusa v2 is a Node.js (TypeScript) headless commerce backend. Production deployments split it into two processes from the same image: a **server** (`MEDUSA_WORKER_MODE=server`) that serves the Store/Admin APIs and the admin dashboard, and a **worker** (`MEDUSA_WORKER_MODE=worker`) that processes background events. The split only works because both share the same **Redis** event bus, workflow engine, cache, and lock modules — all wired for you. **Postgres** holds commerce data. Scale the worker independently (Railway → medusa-worker → Settings → Replicas); each replica joins the same BullMQ queues. Expect roughly **$15–30/month** total for a small store (server ~1 GB, worker 512 MB–1 GB, Postgres ~1 GB, Redis 256 MB). Medusa is MIT-licensed with no per-sale fees.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| medusa-worker | [lNamelessl/medusa-v2-railway](https://github.com/lNamelessl/medusa-v2-railway) | Worker |
| Redis | `redis:8.2` | Database |
| medusa-server | [lNamelessl/medusa-v2-railway](https://github.com/lNamelessl/medusa-v2-railway) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `JWT_SECRET` | medusa-worker | (secret) |
| `COOKIE_SECRET` | medusa-worker | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `JWT_SECRET` | medusa-server | (secret) |
| `COOKIE_SECRET` | medusa-server | (secret) |
| `MEDUSA_ADMIN_PASSWORD` | medusa-server | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/medusa-v2)
