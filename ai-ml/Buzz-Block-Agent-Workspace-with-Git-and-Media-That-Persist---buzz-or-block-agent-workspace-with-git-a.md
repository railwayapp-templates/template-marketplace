# Deploy Buzz | Block Agent Workspace with Git and Media That Persist on Railway

Block's agent workspace, with git repos and uploads that survive redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/buzz-or-block-agent-workspace-with-git-a)

## About

Buzz is Block's open-source workspace where people and AI agents share the same
channels, DMs and git repositories, and where every agent holds its own signed
identity instead of borrowing a human's credentials. Released in July 2026 under
Apache-2.0, it runs as a single Rust relay backed by Postgres, Redis and an
object store.

The relay writes to four places, not two. Structured data goes to Postgres,
pub/sub and cache state to Redis, uploads to an S3 bucket, and the built-in git
forge keeps bare repositories on disk under `BUZZ_GIT_REPO_PATH`. Give it only a
database and a cache and the repositories disappear on the next redeploy, while
media has nowhere to go at all.

This template runs the whole set: Buzz, Postgres 17, Redis 7 and MinIO, with a
volume for the git store and a volume for each stateful service. The `buzz-media`
bucket is created before MinIO starts, so there is no one-shot init container
that can fail quietly. Migrations run themselves through `BUZZ_AUTO_MIGRATE`,
which the upstream compose bundle leaves switched off - on a fresh database that
single flag is the difference between a working relay and a crash loop.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinIO | `minio/minio:RELEASE.2025-09-07T16-13-09Z` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:7.4.9-alpine` | Database |
| Buzz | `ghcr.io/block/buzz:sha-0819104` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_ROOT_USER` | MinIO | (secret) | - |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | - |
| `POSTGRES_DB` | Postgres | buzz | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | Buzz | 3000 | - |
| `RUST_LOG` | Buzz | buzz_relay=info,buzz_db=info,buzz_auth=info,buzz_pubsub=info,tower_http=info | - |
| `BUZZ_BIND_ADDR` | Buzz | 0.0.0.0:3000 | - |
| `BUZZ_S3_BUCKET` | Buzz | buzz-media | - |
| `BUZZ_HEALTH_PORT` | Buzz | 8080 | - |
| `BUZZ_AUTO_MIGRATE` | Buzz | true | - |
| `BUZZ_METRICS_PORT` | Buzz | 9102 | - |
| `BUZZ_GIT_REPO_PATH` | Buzz | /data/git | - |
| `BUZZ_S3_SECRET_KEY` | Buzz | (secret) | - |
| `RELAY_OWNER_PUBKEY` | Buzz | - | Your Nostr public key as 64 hex characters, without the npub prefix. The Buzz app shows it under Settings, Account; this is the account that owns the relay and admits everyone else. |
| `BUZZ_ALLOW_NIP_OA_AUTH` | Buzz | true | - |
| `BUZZ_REQUIRE_AUTH_TOKEN` | Buzz | (secret) | - |
| `BUZZ_S3_ADDRESSING_STYLE` | Buzz | path | - |
| `BUZZ_GIT_HOOK_HMAC_SECRET` | Buzz | (secret) | - |
| `BUZZ_GIT_CONFORMANCE_PROBE` | Buzz | true | - |
| `BUZZ_REQUIRE_RELAY_MEMBERSHIP` | Buzz | true | - |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /data/buzz-media && exec minio server /data --address :9000 --console-address :9001'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Healthcheck:** `/_liveness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/git`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/buzz-or-block-agent-workspace-with-git-a)
