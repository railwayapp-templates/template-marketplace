# Deploy Buzz on Railway

Self-host Buzz Relay 0.2.0 with private, persistent Railway services

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/buzz-inloop-studio)

## About

Buzz is a self-hostable workspace where humans and AI agents share channels, threads, media, workflows, and Git activity in one signed event log. This template deploys the stable Buzz Relay 0.2.0 release with private Railway PostgreSQL and Redis services, a Railway Bucket, and persistent Git storage.

The Buzz Relay owns the public HTTPS and WebSocket domain. PostgreSQL stores events, membership, workflows, search, and audit data; Redis provides real-time fan-out and presence; the bucket stores media and Git objects; and the relay volume stores hosted repositories.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Buzz Relay | `ghcr.io/block/buzz@sha256:a0f67203d71d15d237fa7517788799957c30c8acdb81cbcff711e07e951c2710` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway private hostname for Redis. |
| `REDISPORT` | Redis | 6379 | Private Redis port. |
| `REDISUSER` | Redis | default | Redis ACL username. |
| `REDIS_URL` | Redis | - | Private Redis connection string used by Buzz. |
| `REDISPASSWORD` | Redis | (secret) | Password used by Redis clients. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for this Redis deployment. |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection string used by Buzz. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL administrator user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated PostgreSQL password. |
| `PORT` | Buzz Relay | 3000 | Public HTTP and WebSocket port used by Railway. |
| `RUST_LOG` | Buzz Relay | buzz_relay=info,buzz_db=info,buzz_auth=info,buzz_pubsub=info,tower_http=info | Rust tracing filter for normal production diagnostics. |
| `REDIS_URL` | Buzz Relay | - | Private Redis connection from the bundled service. |
| `RELAY_URL` | Buzz Relay | - | Canonical public WebSocket URL and community host. |
| `DATABASE_URL` | Buzz Relay | - | Private PostgreSQL connection from the bundled service. |
| `BUZZ_BIND_ADDR` | Buzz Relay | 0.0.0.0:3000 | Address and port for Buzz HTTP and WebSocket traffic. |
| `BUZZ_S3_BUCKET` | Buzz Relay | - | Railway Bucket name reference. |
| `BUZZ_S3_REGION` | Buzz Relay | - | Railway Bucket signing region. |
| `BUZZ_HEALTH_PORT` | Buzz Relay | 8080 | Internal port for dedicated liveness and readiness probes. |
| `BUZZ_S3_ENDPOINT` | Buzz Relay | - | S3-compatible Railway Bucket endpoint. |
| `BUZZ_AUTO_MIGRATE` | Buzz Relay | true | Apply embedded database migrations during startup. |
| `BUZZ_CORS_ORIGINS` | Buzz Relay | - | Allowed browser origin for the generated Railway domain. |
| `BUZZ_METRICS_PORT` | Buzz Relay | 9102 | Internal Prometheus metrics port. |
| `BUZZ_GIT_REPO_PATH` | Buzz Relay | /data/git | Persistent volume path for hosted Git repositories. |
| `BUZZ_S3_ACCESS_KEY` | Buzz Relay | - | Railway Bucket access key reference. |
| `BUZZ_S3_SECRET_KEY` | Buzz Relay | (secret) | Railway Bucket secret key reference. |
| `RELAY_OWNER_PUBKEY` | Buzz Relay | - | Required 64-character hexadecimal Nostr public key for the initial owner. Never enter a private key. |
| `BUZZ_MEDIA_BASE_URL` | Buzz Relay | - | Public URL used for media served through Buzz. |
| `BUZZ_ALLOW_NIP_OA_AUTH` | Buzz Relay | true | Allow owner-attested NIP-OA authentication. |
| `BUZZ_RELAY_PRIVATE_KEY` | Buzz Relay | - | Generated stable Nostr signing key for relay-authored events. |
| `BUZZ_REQUIRE_AUTH_TOKEN` | Buzz Relay | (secret) | Require NIP-42 authentication for protected relay operations. |
| `BUZZ_MEDIA_SERVER_DOMAIN` | Buzz Relay | - | Public host used in media metadata. |
| `BUZZ_GIT_HOOK_HMAC_SECRET` | Buzz Relay | (secret) | Generated HMAC secret for internal Git hook callbacks. |
| `BUZZ_GIT_CONFORMANCE_PROBE` | Buzz Relay | true | Verify object-storage semantics before enabling the Git backend. |
| `BUZZ_REQUIRE_RELAY_MEMBERSHIP` | Buzz Relay | true | Restrict the relay to the owner and invited members. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/_readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/git`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/buzz-inloop-studio)
