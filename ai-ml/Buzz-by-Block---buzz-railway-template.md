# Deploy Buzz by Block on Railway

A workspace where humans and agents build together, on a relay you own.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/buzz-railway-template)

## About

Buzz is a production-ready Nostr relay designed for authenticated communities, private collaboration, media hosting, and Git-backed content. Unlike traditional relays that primarily forward events, Buzz includes integrated authentication, membership management, object storage, and persistent infrastructure components, making it suitable for deploying complete decentralized social applications.

This Railway template deploys Buzz using the official `ghcr.io/block/buzz:latest` container image together with all required infrastructure components. The stack automatically provisions PostgreSQL for persistent data, Redis for caching and pub/sub, and an S3-compatible object storage service for media uploads.

All required environment variables are pre-configured, generated, or linked automatically through Railway. During deployment, the only value you need to provide is your **64-character hexadecimal Nostr public key** (`RELAY_OWNER_PUBKEY`). Once deployed, Buzz automatically performs database migrations and starts with authentication, media hosting, Git storage, and relay membership enabled by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Init | `minio/mc` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| Bucket | [railwayapp-templates/minio](https://github.com/railwayapp-templates/minio) | Database |
| Buzz | `ghcr.io/block/buzz:latest` | Web service |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_BUCKET` | Init | buzz-relay | - |
| `MINIO_ROOT_USER` | Init | (secret) | - |
| `MINIO_ROOT_PASSWORD` | Init | (secret) | - |
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
| `MINIO_ROOT_USER` | Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | - |
| `MINIO_STS_DURATION` | Bucket | 1h | - |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | - |
| `PORT` | Buzz | 3000 | - |
| `RUST_LOG` | Buzz | buzz_relay=info,buzz_db=info,buzz_auth=info,buzz_pubsub=info,tower_http=info | - |
| `BUZZ_BIND_ADDR` | Buzz | 0.0.0.0:3000 | - |
| `BUZZ_S3_REGION` | Buzz | us-east-1 | - |
| `BUZZ_AUTO_MIGRATE` | Buzz | true | - |
| `BUZZ_GIT_REPO_PATH` | Buzz | /data/git | - |
| `BUZZ_S3_SECRET_KEY` | Buzz | (secret) | - |
| `BUZZ_ALLOW_NIP_OA_AUTH` | Buzz | true | - |
| `BUZZ_REQUIRE_AUTH_TOKEN` | Buzz | (secret) | - |
| `BUZZ_S3_ADDRESSING_STYLE` | Buzz | path | - |
| `BUZZ_GIT_HOOK_HMAC_SECRET` | Buzz | (secret) | - |
| `BUZZ_GIT_CONFORMANCE_PROBE` | Buzz | true | - |
| `BUZZ_REQUIRE_RELAY_MEMBERSHIP` | Buzz | false | - |
| `PORT` | Console | 9090 | - |
| `PASSWORD` | Console | (secret) | - |
| `USERNAME` | Console | (secret) | - |

## Configuration

- **Start command:** `sh -c "echo Waiting for MinIO endpoint: $MINIO_ENDPOINT; until mc alias set local $MINIO_ENDPOINT $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD; do echo MinIO alias not ready yet...; sleep 3; done; until mc admin info local >/dev/null 2>&1; do echo MinIO server not ready yet...; sleep 3; done; until mc mb --ignore-existing local/$MINIO_BUCKET; do echo Bucket create failed, retrying...; sleep 3; done; echo Bucket ready: $MINIO_BUCKET; tail -f /dev/null"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/git`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/buzz-railway-template)
