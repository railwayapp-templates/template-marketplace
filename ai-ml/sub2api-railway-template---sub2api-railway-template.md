# Deploy sub2api-railway-template on Railway

Subscription to API Conversion Platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sub2api-railway-template)

## About

Sub2API is a high-performance AI API gateway for managing, distributing, and billing usage across subscription-based AI accounts. It helps teams centralize API access, enforce quotas, track token consumption, and route requests intelligently across multiple upstream providers from a single deployable platform.

Hosting Sub2API requires more than just running a container. A production-ready deployment needs a fast application layer, persistent database storage, and an in-memory cache for rate limiting, session handling, and request coordination. This Railway template provisions a complete Sub2API stack, including the official Sub2API application, PostgreSQL for durable data storage, and Redis for caching and quota enforcement. Railway connects these services over its private network for secure, low-latency communication without extra networking setup. Auto-generated secrets such as JWT and TOTP encryption keys are also created during deployment, helping you launch quickly with a secure default configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| weishaw/sub2api:latest | `weishaw/sub2api:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
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
| `TZ` | weishaw/sub2api:latest | Asia/Shanghai | ----------------------------------------------------------------------------- |
| `REDIS_DB` | weishaw/sub2api:latest | 0 | ----------------------------------------------------------------------------- |
| `RUN_MODE` | weishaw/sub2api:latest | standard | - |
| `AUTO_SETUP` | weishaw/sub2api:latest | true | The port Sub2API listens on (Railway will automatically route traffic here) |
| `JWT_SECRET` | weishaw/sub2api:latest | (secret) | Encryption key for 2FA/TOTP |
| `ADMIN_EMAIL` | weishaw/sub2api:latest | - | Auto-generates a secure 16-character password for the admin account |
| `SERVER_HOST` | weishaw/sub2api:latest | 0.0.0.0 | Run mode: standard (full SaaS features) or simple (personal/internal use) |
| `SERVER_MODE` | weishaw/sub2api:latest | release | - |
| `SERVER_PORT` | weishaw/sub2api:latest | 8080 | - |
| `DATABASE_USER` | weishaw/sub2api:latest | (secret) | - |
| `ADMIN_PASSWORD` | weishaw/sub2api:latest | (secret) | ----------------------------------------------------------------------------- |
| `REDIS_PASSWORD` | weishaw/sub2api:latest | (secret) | - |
| `REDIS_POOL_SIZE` | weishaw/sub2api:latest | 1024 | - |
| `DATABASE_SSLMODE` | weishaw/sub2api:latest | disable | ----------------------------------------------------------------------------- |
| `DATABASE_PASSWORD` | weishaw/sub2api:latest | (secret) | Optional: Connection Pool Tuning (Uncomment to adjust) |
| `TOTP_ENCRYPTION_KEY` | weishaw/sub2api:latest | - | # Generate a secure key: openssl rand -hex 32 |
| `REDIS_MIN_IDLE_CONNS` | weishaw/sub2api:latest | 10 | Optional: Security Allowlist (Uncomment to enable) |
| `DATABASE_MAX_IDLE_CONNS` | weishaw/sub2api:latest | 10 | - |
| `DATABASE_MAX_OPEN_CONNS` | weishaw/sub2api:latest | 50 | - |
| `SECURITY_URL_ALLOWLIST_ENABLED` | weishaw/sub2api:latest | false | - |
| `SECURITY_URL_ALLOWLIST_ALLOW_INSECURE_HTTP` | weishaw/sub2api:latest | false | - |
| `SECURITY_URL_ALLOWLIST_ALLOW_PRIVATE_HOSTS` | weishaw/sub2api:latest | false | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sub2api-railway-template)
