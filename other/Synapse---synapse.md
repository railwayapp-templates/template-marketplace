# Deploy Synapse on Railway

Matrix homeserver for decentralised, end-to-end encrypted chat

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/synapse)

## About

Synapse is the reference Matrix homeserver — the server half of Matrix, the open standard for decentralised, end-to-end encrypted communication. It stores your accounts, rooms and message history and federates with every other Matrix server, so your users reach people on matrix.org or any other deployment without either side giving up control of its data. Self-host Synapse and you own the database while keeping the whole network. Deploy Synapse on Railway and it federates on day one, with no DNS or reverse-proxy work.

This template runs Synapse in the scaled shape the project recommends, not the single-container demo. Five services are pre-configured: `synapse` is the main process, owning registration, the admin API and replication; `synapse-worker` is a `generic_worker` absorbing sync and read traffic, the endpoints that dominate a busy homeserver; `proxy` is the only public service, a Caddy router splitting Matrix paths between those two and serving the `.well-known` files that make federation work on 443; `Postgres` is the database and `Redis` the replication bus. Everything but the proxy stays private.

![Diagram of the Synapse, worker, proxy, Postgres and Redis services](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789552024/synapse-architecture.webp)

Matrix solves a problem most chat tools do not: conversations live on a server you control and still reach everyone else. A team self-hosting Synapse keeps history, media and account data in its own database while its users talk to contractors on matrix.org and communities on their own servers. Synapse is the implementation the Matrix specification is written against, so clients, bridges and moderation tools target it first.

Key features:

- End-to-end encryption by default in private rooms, with cross-signing and key backup
- Full federation: rooms and users addressable across every Matrix server
- VoIP and video call signalling, including group calls via Element Call
- Bridges to Slack, Discord, IRC, Telegram and WhatsApp
- A complete admin API, plus SSO via OIDC, SAML and CAS

The worker split is worth understanding. A single Synapse process handles everything, and the endpoints that saturate first are `/sync` and the federation read paths. Moving those to a `generic_worker` lets the main process concentrate on writes and replication — how Synapse is designed to scale. Both share Postgres and coordinate over Redis, so adding capacity means duplicating the worker and extending the proxy's routes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| synapse | [gridalpha/synapse-railway](https://github.com/gridalpha/synapse-railway) | Database |
| proxy | [gridalpha/synapse-railway](https://github.com/gridalpha/synapse-railway) | Web service |
| synapse-worker | [gridalpha/synapse-railway](https://github.com/gridalpha/synapse-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | synapse | 8008 | HTTP listener probed by the health check |
| `REDISHOST` | synapse | - | Replication bus host |
| `REDISPORT` | synapse | - | Replication bus port |
| `DATABASE_URL` | synapse | - | Admin connection used to create the database |
| `SYNAPSE_ROLE` | synapse | main | Runs the main process |
| `REDISPASSWORD` | synapse | (secret) | Replication bus password |
| `SYNAPSE_DB_NAME` | synapse | synapse | Database created with C collation |
| `SYNAPSE_LOG_LEVEL` | synapse | INFO | Root logger level |
| `SYNAPSE_ADMIN_USER` | synapse | (secret) | First admin account, seeded at boot |
| `SYNAPSE_SECRET_SEED` | synapse | (secret) | Seed for all derived signing keys |
| `SYNAPSE_SERVER_NAME` | synapse | - | Homeserver identity, permanent |
| `SYNAPSE_REPORT_STATS` | synapse | 0 | Send anonymous stats to matrix.org |
| `SYNAPSE_ADMIN_PASSWORD` | synapse | (secret) | First admin password, change after login |
| `SYNAPSE_MAX_UPLOAD_SIZE` | synapse | 50M | Largest accepted media upload |
| `SYNAPSE_PRESENCE_ENABLED` | synapse | 1 | Online/offline presence tracking |
| `SYNAPSE_FEDERATION_ENABLED` | synapse | 1 | Join the wider Matrix network |
| `SYNAPSE_ENABLE_REGISTRATION` | synapse | 0 | Open signup, closed by default |
| `SYNAPSE_URL_PREVIEW_ENABLED` | synapse | 0 | Server-side link previews |
| `SYNAPSE_REGISTRATION_REQUIRES_TOKEN` | synapse | (secret) | Require invite token when signup is open |
| `PORT` | proxy | 8080 | Public HTTP listener |
| `SYNAPSE_UPSTREAM` | proxy | synapse.railway.internal:8008 | Main process upstream |
| `SYNAPSE_SECRET_SEED` | proxy | (secret) | Shared seed, referenced by both Synapse services |
| `SYNAPSE_WORKER_UPSTREAM` | proxy | synapse-worker.railway.internal:8008 | Worker upstream |
| `PORT` | synapse-worker | 8008 | HTTP listener probed by the health check |
| `REDISHOST` | synapse-worker | - | Replication bus host |
| `REDISPORT` | synapse-worker | - | Replication bus port |
| `DATABASE_URL` | synapse-worker | - | Postgres connection string |
| `SYNAPSE_ROLE` | synapse-worker | worker | Runs a generic_worker |
| `REDISPASSWORD` | synapse-worker | (secret) | Replication bus password |
| `SYNAPSE_DB_NAME` | synapse-worker | synapse | Same database as the main process |
| `SYNAPSE_LOG_LEVEL` | synapse-worker | INFO | Root logger level |
| `SYNAPSE_MAIN_HOST` | synapse-worker | - | Main process replication endpoint |
| `SYNAPSE_SECRET_SEED` | synapse-worker | (secret) | Seed for all derived signing keys |
| `SYNAPSE_SERVER_NAME` | synapse-worker | - | Homeserver identity, must match main |
| `SYNAPSE_WORKER_NAME` | synapse-worker | worker1 | Worker identity on the replication stream |
| `SYNAPSE_REPORT_STATS` | synapse-worker | 0 | Send anonymous stats to matrix.org |
| `SYNAPSE_MAX_UPLOAD_SIZE` | synapse-worker | 50M | Must match the main process |
| `SYNAPSE_PRESENCE_ENABLED` | synapse-worker | 1 | Must match the main process |
| `SYNAPSE_FEDERATION_ENABLED` | synapse-worker | 1 | Must match the main process |
| `SYNAPSE_ENABLE_REGISTRATION` | synapse-worker | 0 | Must match the main process |
| `SYNAPSE_URL_PREVIEW_ENABLED` | synapse-worker | 0 | Server-side link previews |
| `SYNAPSE_REGISTRATION_REQUIRES_TOKEN` | synapse-worker | (secret) | Must match the main process |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/synapse)
