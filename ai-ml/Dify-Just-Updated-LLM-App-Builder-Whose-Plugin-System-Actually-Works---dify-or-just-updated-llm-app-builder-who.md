# Deploy Dify | (Just Updated) LLM App Builder Whose Plugin System Actually Works on Railway

Dify 1.16.1, 6 services not 11, plugin marketplace verified working

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify-or-just-updated-llm-app-builder-who)

## About

Dify is an open-source LLM app development platform: a visual builder for
chatbots, agents and RAG workflows, with a plugin marketplace for model
providers and tools, a knowledge base with vector retrieval, a sandbox for
generated code, and an API for every app you publish.

This template runs Dify 1.16.1 as **six services instead of eleven**, with the
plugin daemon verified working end to end — a marketplace plugin was installed
on the live deploy and survived a redeploy.

Dify is not a single container. It needs an API server, a Celery worker, a beat
scheduler, a Next.js frontend, a code sandbox, a plugin daemon, PostgreSQL, a
vector store, Redis, and object storage. Most Railway templates map that
one-to-one and bill you for eleven services, including two one-shot
"provisioning" containers you are told to delete by hand.

This template folds the API, worker and beat into one container (Railway volumes
cannot be shared between services, and all three want the same storage
directory), uses pgvector inside the same PostgreSQL instance instead of a
separate vector database, and stores files on a volume instead of running MinIO
plus an `mc` provisioning job. The frontend container also runs the nginx
gateway, so the API never needs a public domain and nothing runs with
`CONSOLE_CORS_ALLOW_ORIGINS=*`.

Other things handled for you:

- **Migrations run once.** Upstream's compose enables migrations on both the API
  and the worker, which races alembic on first boot. Here they run once, before
  any role starts.
- **Every image is pinned** (api/web 1.16.1, sandbox 0.2.15, plugin daemon 0.6.3,
  PostgreSQL pgvector pg17, Redis 8.2.1). Dify migrates forward on boot and does
  not support downgrade, so a moving tag makes every redeploy an unrequested
  upgrade.
- **The install is closed.** `INIT_PASSWORD` is generated per deploy, so the
  first stranger who finds your URL cannot claim the instance.
- **Volumes are repaired before the privilege drop**, so the API's storage
  directory and the plugin daemon's package directory are actually writable.
- **PostgreSQL is sized from the container's cgroup** rather than left at the
  128 MB default shared buffers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/bon5co/dify-railway-postgres:pg17` | Database |
| api | `ghcr.io/bon5co/dify-railway-api:1.16.1` | Database |
| sandbox | `ghcr.io/bon5co/dify-railway-sandbox:0.2.15` | Worker |
| web | `ghcr.io/bon5co/dify-railway-web:1.16.1` | Web service |
| redis | `redis:8.2.1-alpine` | Database |
| plugin-daemon | `ghcr.io/bon5co/dify-railway-plugin:0.6.3` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `SECRET_KEY` | api | (secret) |
| `DB_PASSWORD` | api | (secret) |
| `INIT_PASSWORD` | api | (secret) |
| `REDIS_PASSWORD` | api | (secret) |
| `PGVECTOR_PASSWORD` | api | (secret) |
| `CODE_EXECUTION_API_KEY` | api | (secret) |
| `INNER_API_KEY_FOR_PLUGIN` | api | (secret) |
| `API_KEY` | sandbox | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `DB_PASSWORD` | plugin-daemon | (secret) |
| `REDIS_PASSWORD` | plugin-daemon | (secret) |
| `DIFY_INNER_API_KEY` | plugin-daemon | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Volume:** `/app/api/storage`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Volume:** `/app/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/dify-or-just-updated-llm-app-builder-who)
