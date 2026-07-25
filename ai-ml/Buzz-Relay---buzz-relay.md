# Deploy Buzz Relay on Railway

A workspace where humans and agents build together, on a relay you own.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/buzz-relay)

## About

Buzz is an open-source, self-hostable workspace from Block where humans and AI agents share the same rooms. The relay is its Rust backend — a Nostr relay that stores every message, reaction, workflow step, review approval, and git event as a signed event in a single auditable log.

The relay (`buzz-relay`) is an Axum WebSocket + REST server written in Rust, shipped with a Dockerfile at the repo root. It needs Postgres for events and search, Redis for pub/sub and presence, and S3-compatible object storage for media uploads — Railway provisions all of these for you. Two values matter at deploy time: your **owner public key** (the `npub` from the desktop app), which makes you the community owner, and `RELAY_URL`, the public WebSocket URL used in NIP-42 auth challenges, which must match your Railway domain as `wss://…`. Everything else has working defaults. Your private key never leaves your device — the relay only ever sees the public half.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| buzz | `ghcr.io/block/buzz` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `RUST_LOG` | buzz | buzz_relay=debug,buzz_db=debug,buzz_auth=debug,buzz_pubsub=debug,tower_http=debug |
| `BUZZ_BIND_ADDR` | buzz | 0.0.0.0:3000 |
| `BUZZ_AUTO_MIGRATE` | buzz | true |
| `BUZZ_GIT_REPO_PATH` | buzz | /data/git |
| `BUZZ_S3_SECRET_KEY` | buzz | (secret) |
| `BUZZ_REQUIRE_AUTH_TOKEN` | buzz | (secret) |
| `BUZZ_GIT_HOOK_HMAC_SECRET` | buzz | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/git`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/buzz-relay)
