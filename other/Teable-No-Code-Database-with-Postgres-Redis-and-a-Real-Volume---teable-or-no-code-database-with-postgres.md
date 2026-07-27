# Deploy Teable | No-Code Database with Postgres, Redis and a Real Volume on Railway

Self-host Teable on Railway: pinned release, Redis cache, data that stays

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teable-or-no-code-database-with-postgres)

## About

Teable is a no-code database: spreadsheet-style tables, views and forms on top of real Postgres, with an API over every table.

This template pins the Teable release, and it deploys the Redis that current Teable requires.

That second part is the whole story of why the existing template fails. It runs `ghcr.io/teableio/teable` with **no tag at all**, and with patch auto-updates switched on, so the running version drifts on its own. Current Teable refuses to start without a cache:

```
Error: Config validation error: "BACKEND_CACHE_REDIS_URI" is required
```

There is no Redis in that template. So it worked until the floating tag rolled forward into a release where the cache became mandatory, and from that moment every new deployment crashed on boot. Pinning the image is exactly what prevents this, and it is what this template does.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8-alpine` | Database |
| Teable | `ghcr.io/teableio/teable:release.2026-07-26T01-04-56Z.2377` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | teable |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | Teable | 3000 |
| `SECRET_KEY` | Teable | (secret) |
| `BACKEND_CACHE_PROVIDER` | Teable | redis |
| `BACKEND_STORAGE_PUBLIC_DIR` | Teable | /data/.assets |
| `BACKEND_STORAGE_PRIVATE_DIR` | Teable | /data/.assets-private |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Teable | true |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec redis-server --requirepass \"$REDIS_PASSWORD\" --appendonly yes --dir /data --bind :: 0.0.0.0"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/teable-or-no-code-database-with-postgres)
