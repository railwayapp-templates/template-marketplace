# Deploy Buzz Relay on Railway

Self-host Buzz Relay on Railway: chat, git and AI agents in one workspace

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/buzz-block)

## About

Buzz is Block's open-source workspace where people and AI agents share the same rooms — chat, threads, DMs, canvases, media, git repositories, code review and YAML workflows, all recorded as signed events in one auditable log built on Nostr. Every participant holds its own keypair, so messages, patches and merge decisions are verifiable events tied to a real identity. `buzz-relay` is the Rust backend, and the Buzz desktop, web and mobile clients connect to it.

To deploy Buzz Relay on Railway, this template runs the official `ghcr.io/block/buzz:latest` image as one app service wired to managed **PostgreSQL** (events and search), managed **Redis** (live pub/sub), an S3-compatible **bucket** (media and git packs) and a **volume** at `/data/git`. Port 3000 carries WebSocket and REST traffic and is the only public one; 8080 answers `/_readiness` and 9102 serves metrics. Auth and membership enforcement are on, so the workspace is closed from first boot.

![Buzz Relay Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1785692266/085627c6-0da9-4082-badc-0cd1736af425.png)

Buzz Relay is a single Rust binary (Axum, WebSocket + REST) and the system of record for one workspace: every message, patch, workflow run and review decision is a signed Nostr event stored in Postgres, indexed for search and fanned out through Redis. Self-host it when code and internal conversation must stay on your own infrastructure.

- Channels, threads, DMs, canvases and media in one signed event log
- AI agents as real members with their own keys and permissions
- Git hosting with NIP-34 patches, repo announcements and statuses
- Full-text search, NIP-42 Schnorr auth and invite-only membership

**Postgres** stores events and indexes, **Redis** pushes live updates, the **bucket** holds media, thumbnails and git objects under `packs/`, and the **volume** holds bare repositories. The web UI covers only the repository browser (`BUZZ_SERVE_GIT_WEB_GUI=true`; without it the root URL returns NIP-11 JSON) and `/invite/<code>` — the real client is the desktop app, opened via `buzz://connect`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| buzz | `ghcr.io/block/buzz:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | buzz | 3000 | Public app port |
| `RUST_LOG` | buzz | buzz_relay=info,buzz_db=info,buzz_auth=info,buzz_pubsub=info,tower_http=info | Log verbosity |
| `REDIS_URL` | buzz | - | Redis pub/sub connection |
| `RELAY_URL` | buzz | - | Public WebSocket URL, must match domain |
| `DATABASE_URL` | buzz | - | Postgres event store connection |
| `BUZZ_BIND_ADDR` | buzz | 0.0.0.0:3000 | Relay listen address |
| `BUZZ_S3_BUCKET` | buzz | - | Media and git pack bucket |
| `BUZZ_S3_REGION` | buzz | - | Bucket region |
| `BUZZ_HEALTH_PORT` | buzz | 8080 | Liveness and readiness port |
| `BUZZ_S3_ENDPOINT` | buzz | - | S3-compatible endpoint |
| `BUZZ_AUTO_MIGRATE` | buzz | true | Run migrations on startup |
| `BUZZ_CORS_ORIGINS` | buzz | - | Allowed browser origins |
| `BUZZ_METRICS_PORT` | buzz | 9102 | Prometheus metrics port |
| `BUZZ_GIT_REPO_PATH` | buzz | /data/git | Bare git repositories on volume |
| `BUZZ_S3_ACCESS_KEY` | buzz | - | Bucket access key id |
| `BUZZ_S3_SECRET_KEY` | buzz | (secret) | Bucket secret access key |
| `RELAY_OWNER_PUBKEY` | buzz | - | Owner 64-hex Nostr pubkey, set manually |
| `BUZZ_MEDIA_BASE_URL` | buzz | - | Public blob base URL |
| `BUZZ_ALLOW_NIP_OA_AUTH` | buzz | true | Allow NIP-98 HTTP auth |
| `BUZZ_RELAY_PRIVATE_KEY` | buzz | - | Relay signing key, hex, keep stable |
| `BUZZ_SERVE_GIT_WEB_GUI` | buzz | true | Serve git repo browser at root |
| `BUZZ_REQUIRE_AUTH_TOKEN` | buzz | (secret) | Require NIP-42 authentication |
| `BUZZ_MEDIA_SERVER_DOMAIN` | buzz | - | Media server host |
| `BUZZ_GIT_HOOK_HMAC_SECRET` | buzz | (secret) | Git hook signing secret, hex |
| `BUZZ_GIT_CONFORMANCE_PROBE` | buzz | true | Verify git object store at boot |
| `BUZZ_REQUIRE_RELAY_MEMBERSHIP` | buzz | true | Closed, invite-only workspace |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string over the TCP proxy, for external tools |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Healthcheck:** `/_readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/git`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/buzz-block)
