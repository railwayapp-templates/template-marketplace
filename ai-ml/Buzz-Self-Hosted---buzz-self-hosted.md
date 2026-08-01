# Deploy Buzz (Self-Hosted) on Railway

Self-host Buzz with PostgreSQL, Redis, S3 and secure mobile pairing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/buzz-self-hosted)

## About

Buzz is Block’s open-source workspace where humans and AI agents collaborate in shared channels, threads, workflows, canvases, media, and Git activity. This template deploys a self-hosted Buzz relay with PostgreSQL, Redis, S3-compatible storage and secure mobile pairing.

Hosting Buzz Relay on Railway gives you a private server for one Buzz community without building the infrastructure from scratch. The relay serves the bundled web client, WebSocket protocol, REST endpoints, media, workflows, search, audit history and Git operations.

Railway provides the public HTTPS domain and private service networking. PostgreSQL stores events and searchable state, Redis handles real-time fan-out and presence, and a Railway Bucket stores authoritative media and Git objects. Persistent volumes retain PostgreSQL and Redis data. Buzz uses ephemeral local workspaces for Git operations and recreates them from the bucket when needed. A dedicated ephemeral relay securely coordinates desktop-to-mobile pairing without storing pairing messages.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pairing Relay | `ghcr.io/block/buzz:sha-3e48f1b` | Web service |
| Buzz Relay | `ghcr.io/block/buzz:sha-3e48f1b` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Pairing Relay | 5000 | Port used by Railway to expose the pairing relay. |
| `BUZZ_PAIR_RELAY_BIND_ADDR` | Pairing Relay | 0.0.0.0:5000 | Address the pairing relay listens on inside the container. |
| `PORT` | Buzz Relay | 3000 | Internal HTTP and WebSocket port. |
| `RUST_LOG` | Buzz Relay | buzz_relay=info,buzz_db=info,buzz_auth=info,buzz_pubsub=info,tower_http=info | Rust logging directives for Buzz services. |
| `REDIS_URL` | Buzz Relay | - | Private Redis connection URL. |
| `RELAY_URL` | Buzz Relay | - | Public WebSocket URL for this relay. |
| `DATABASE_URL` | Buzz Relay | - | Private PostgreSQL connection URL. |
| `BUZZ_BIND_ADDR` | Buzz Relay | 0.0.0.0:3000 | Address and port used by the relay listener. |
| `BUZZ_S3_BUCKET` | Buzz Relay | - | Railway bucket name used for media and Git objects. |
| `BUZZ_S3_REGION` | Buzz Relay | - | Railway bucket region. |
| `BUZZ_S3_ENDPOINT` | Buzz Relay | - | S3-compatible endpoint for the Railway bucket. |
| `BUZZ_AUTO_MIGRATE` | Buzz Relay | true | Run database migrations when the relay starts. |
| `BUZZ_CORS_ORIGINS` | Buzz Relay | - | Origins allowed to access the relay from browsers and desktop clients. |
| `BUZZ_S3_ACCESS_KEY` | Buzz Relay | - | Access key for the Railway bucket. |
| `BUZZ_S3_SECRET_KEY` | Buzz Relay | (secret) | Secret key for the Railway bucket. |
| `RELAY_OWNER_PUBKEY` | Buzz Relay | - | 64-character hexadecimal Nostr public key that owns the relay. Never enter an nsec or private key. |
| `BUZZ_MEDIA_BASE_URL` | Buzz Relay | - | Public base URL for media served by the relay. |
| `BUZZ_ALLOW_NIP_OA_AUTH` | Buzz Relay | true | Allow NIP-OA authentication for Buzz clients and agents. |
| `BUZZ_PAIRING_RELAY_URL` | Buzz Relay | - | Public WebSocket URL used for secure mobile device pairing. |
| `BUZZ_RELAY_PRIVATE_KEY` | Buzz Relay | - | Generated private key used by the relay to sign Nostr events. |
| `BUZZ_REQUIRE_AUTH_TOKEN` | Buzz Relay | (secret) | Require authenticated clients to present a valid token. |
| `BUZZ_GIT_HOOK_HMAC_SECRET` | Buzz Relay | (secret) | Generated secret used to authenticate Git hook callbacks. |
| `BUZZ_REQUIRE_RELAY_MEMBERSHIP` | Buzz Relay | true | Restrict relay access to approved community members. |
| `REDISHOST` | Redis | - | Private Redis hostname. |
| `REDISPORT` | Redis | 6379 | Internal Redis port. |
| `REDISUSER` | Redis | default | Redis username. |
| `REDIS_URL` | Redis | - | Private Redis connection URL. |
| `REDISPASSWORD` | Redis | (secret) | Redis password alias used by Railway integrations. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis password. |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL for external clients. |
| `POSTGRES_DB` | Postgres | buzz | Default database created when Postgres starts. |
| `DATABASE_URL` | Postgres | - | Private Postgres connection URL. |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated Postgres password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection URL for external clients. |

## Configuration

- **Start command:** `/usr/local/bin/buzz-pair-relay`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/_readiness`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/buzz-self-hosted)
