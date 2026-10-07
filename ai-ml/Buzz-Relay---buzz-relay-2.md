# Deploy Buzz Relay on Railway

Nostr relay with built-in Git hosting. Auto-wired Postgres, Redis, MinIO.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/buzz-relay-2)

## About

Buzz Relay is a Nostr relay with built-in Git hosting over Nostr (NIP-89). It lets you push and pull Git repositories through the Nostr protocol, with media uploads stored on S3-compatible object storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| relay | [INAPP-Mobile/railway-buzz-relay](https://github.com/INAPP-Mobile/railway-buzz-relay) (root: .) | Web service |
| redis | [INAPP-Mobile/railway-buzz-relay](https://github.com/INAPP-Mobile/railway-buzz-relay) (root: redis) | Database |
| minio | [INAPP-Mobile/railway-buzz-relay](https://github.com/INAPP-Mobile/railway-buzz-relay) (root: minio) | Database |
| postgres | [INAPP-Mobile/railway-buzz-relay](https://github.com/INAPP-Mobile/railway-buzz-relay) (root: postgres) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | relay | 3000 | HTTP port for the relay. |
| `RUST_LOG` | relay | buzz_relay=info,buzz_db=info,buzz_auth=info,buzz_pubsub=info,tower_http=info | Rust log level configuration. |
| `REDIS_URL` | relay | - | Redis connection URL. Auto-wired from the sibling 'redis' service over Railway's project-isolated private network (no password needed). |
| `RELAY_URL` | relay | - | WebSocket URL of this relay (bare wss:// origin, NO path). Must match the scheme clients put in NIP-42 auth relay tags — https:// here makes every client AUTH fail with 'relay url mismatch'. |
| `DATABASE_URL` | relay | - | PostgreSQL connection URL. Auto-wired from the sibling 'postgres' service via companion variable references. |
| `BUZZ_BIND_ADDR` | relay | 0.0.0.0:3000 | Address and port the relay listens on. |
| `BUZZ_S3_BUCKET` | relay | buzz-media | S3 bucket name for media storage. |
| `MINIO_ROOT_USER` | relay | (secret) | MinIO/RustFS root username, wired to the relay so docker-entrypoint.sh can auto-create the buzz-media bucket on first boot (required for the A3 conformance gate to pass on fresh installs). |
| `BUZZ_HEALTH_PORT` | relay | 8080 | Port for the health check endpoint. |
| `BUZZ_S3_ENDPOINT` | relay | - | S3 endpoint for media storage. Points to the sibling 'minio' service. |
| `BUZZ_AUTO_MIGRATE` | relay | true | Automatically run database migrations on startup. |
| `BUZZ_CORS_ORIGINS` | relay | - | Allowed CORS origin for web clients. |
| `BUZZ_METRICS_PORT` | relay | 9102 | Port for Prometheus metrics endpoint. |
| `BUZZ_GIT_REPO_PATH` | relay | /data/git | Filesystem path where git repositories are stored. Must match the volume mount path. |
| `BUZZ_S3_ACCESS_KEY` | relay | - | S3 access key. Auto-wired from the sibling 'minio' service. |
| `BUZZ_S3_SECRET_KEY` | relay | (secret) | S3 secret key. Auto-wired from the sibling 'minio' service. |
| `RELAY_OWNER_PUBKEY` | relay | - | Optional: Nostr public key (hex) that owns this relay. If empty, the relay runs in open mode. |
| `BUZZ_MEDIA_BASE_URL` | relay | - | Public base URL for media attachments. |
| `MINIO_ROOT_PASSWORD` | relay | (secret) | MinIO/RustFS root password, wired to the relay so docker-entrypoint.sh can auto-create the buzz-media bucket on first boot (required for the A3 conformance gate to pass on fresh installs). |
| `BUZZ_RELAY_PRIVATE_KEY` | relay | - | Nostr private key (hex) for the relay. Auto-generated if not provided. |
| `BUZZ_MEDIA_SERVER_DOMAIN` | relay | - | Public domain used for media server URLs. |
| `BUZZ_S3_ADDRESSING_STYLE` | relay | path | MinIO sibling uses path-style S3 addressing (required for private-network hostnames). |
| `BUZZ_GIT_HOOK_HMAC_SECRET` | relay | (secret) | HMAC secret for git hook verification. Auto-generated. |
| `REDIS_PASSWORD` | redis | (secret) | Redis password. Default literal 'redis' chosen so marketplace first-time deploys authenticate against the relay's literal REDIS_URL out of the box. Rotate this in the dashboard AND update the relay's REDIS_URL to match before going to production. |
| `MINIO_ROOT_USER` | minio | (secret) | RustFS (S3-compatible object storage, MinIO-compatible) root username. RustFS reads this variable natively. Referenced by the relay as BUZZ_S3_ACCESS_KEY via ${{minio.MINIO_ROOT_USER}}. |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | RustFS (S3-compatible object storage, MinIO-compatible) root password — auto-generated at deploy time. RustFS reads this variable natively. Referenced by the relay as BUZZ_S3_SECRET_KEY via ${{minio.MINIO_ROOT_PASSWORD}}. |
| `POSTGRES_DB` | postgres | buzz | Initial database created on first boot. MUST match the database name in the relay's DATABASE_URL (path component: /buzz). |
| `POSTGRES_USER` | postgres | (secret) | Postgres superuser name. Used both for the running DB and as the credential prefix in the relay's DATABASE_URL. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Postgres password. Default literal 'postgres' chosen so marketplace first-time deploys authenticate against the relay's literal DATABASE_URL out of the box. Rotate this in the dashboard AND update the relay's DATABASE_URL to match before going to production. |

## Configuration

- **Healthcheck:** `/_readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/git`
- **Start command:** `redis-server --appendonly yes`
- **Volume:** `/data`
- **Healthcheck:** `/minio/health/live`
- **Volume:** `/var/lib/postgresql`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/buzz-relay-2)
