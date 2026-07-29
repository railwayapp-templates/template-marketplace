# Deploy Buzz by Block on Railway

A hive mind communication platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/buzz-by-block)

## About

Buzz is a self-hosted communication platform for teams that work alongside AI agents. It runs on Nostr, so channels, threads, DMs, and git repositories are signed events rather than rows in someone else's database. This template deploys the relay, the server every Buzz client connects to.

The relay is a Rust server with four dependencies: Postgres for events and membership, Redis for pub/sub and presence, S3-compatible storage for media and git objects, and a persistent volume for repositories. This template wires all four together. Migrations run automatically on first boot and the relay generates its own signing key at deploy time, so there is no setup script to run afterward. You supply one value, your Nostr public key, which becomes the relay owner. Everything else is either generated or derived from the domain Railway assigns. The relay ships closed: NIP-42 authentication and membership are both enforced by default, so only people you add can connect.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Buzz Relay | `ghcr.io/block/buzz:sha256-aef6dc53ddb2145dfc779e3c43393af02ea0d926e8514a79fa3c24490643b3cb` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | User to connect to Redis. |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password generated for this deployment. |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `WAL_ARCHIVE_KEY` | Postgres | - | Access key ID for the WAL archive bucket. |
| `WAL_ARCHIVE_PATH` | Postgres | /pgbackrest | Path within the archive bucket where WAL segments are stored. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `WAL_ARCHIVE_BUCKET` | Postgres | - | Bucket storing WAL archives for point-in-time recovery. |
| `WAL_ARCHIVE_REGION` | Postgres | - | Region used for signing WAL archive requests. |
| `WAL_ARCHIVE_SECRET` | Postgres | (secret) | Secret access key for the WAL archive bucket. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `WAL_ARCHIVE_ENDPOINT` | Postgres | - | S3-compatible endpoint for the WAL archive bucket. |
| `PORT` | Buzz Relay | 3000 | - |
| `RUST_LOG` | Buzz Relay | buzz_relay=info,buzz_db=info,buzz_auth=info,buzz_pubsub=info,tower_http=info | Log level filter. |
| `REDIS_URL` | Buzz Relay | - | Redis connection string. Backs pub/sub fan-out, presence, and typing indicators. |
| `RELAY_URL` | Buzz Relay | - | Public WebSocket URL. Its host defines this relay's community identity. |
| `DATABASE_URL` | Buzz Relay | - | Postgres connection string, auto-wired from the bundled Postgres service. |
| `BUZZ_BIND_ADDR` | Buzz Relay | - | Address the relay binds for WebSocket and HTTP traffic. |
| `BUZZ_S3_BUCKET` | Buzz Relay | - | Bucket holding media uploads and git objects. |
| `BUZZ_S3_REGION` | Buzz Relay | - | Region used for SigV4 request signing. |
| `BUZZ_HEALTH_PORT` | Buzz Relay | 8080 | Port serving /_liveness and /_readiness, separate from the app port. |
| `BUZZ_S3_ENDPOINT` | Buzz Relay | - | S3-compatible API endpoint for the media bucket. |
| `BUZZ_AUTO_MIGRATE` | Buzz Relay | true | Apply database migrations on startup. Required for a fresh database. |
| `BUZZ_CORS_ORIGINS` | Buzz Relay | - | Comma-separated origins allowed to call the HTTP surface. |
| `BUZZ_METRICS_PORT` | Buzz Relay | 9102 | Port serving Prometheus /metrics. |
| `BUZZ_GIT_REPO_PATH` | Buzz Relay | /data/git | Volume path for hosted git repositories. Must match the mounted volume. |
| `BUZZ_S3_ACCESS_KEY` | Buzz Relay | - | S3 access key ID for the media bucket. |
| `BUZZ_S3_SECRET_KEY` | Buzz Relay | (secret) | S3 secret access key for the media bucket. |
| `RELAY_OWNER_PUBKEY` | Buzz Relay | - | Your Nostr PUBLIC key as 64-character hex. Becomes this relay's owner and only initial member. Never paste a secret key here. |
| `BUZZ_MEDIA_BASE_URL` | Buzz Relay | - | Public base URL media is served from. The relay streams blobs itself; clients never reach S3 directly. |
| `BUZZ_ALLOW_NIP_OA_AUTH` | Buzz Relay | true | Permit NIP-OA owner-attested authentication. |
| `BUZZ_RELAY_PRIVATE_KEY` | Buzz Relay | - | The relay's own Nostr signing key. Signs channel metadata, membership rosters, and git manifests. |
| `BUZZ_SERVE_GIT_WEB_GUI` | Buzz Relay | false | Optional. Set true to serve the browser-based git repository browser. |
| `BUZZ_REQUIRE_AUTH_TOKEN` | Buzz Relay | (secret) | Require NIP-42 authentication. Disable only for a public, unauthenticated relay. |
| `BUZZ_GIT_HOOK_HMAC_SECRET` | Buzz Relay | (secret) | HMAC secret authenticating git hook callbacks. |
| `BUZZ_GIT_CONFORMANCE_PROBE` | Buzz Relay | true | Run the A3 object-store conformance probe at boot before admitting the git backend. |
| `BUZZ_REQUIRE_RELAY_MEMBERSHIP` | Buzz Relay | true | Restrict access to members of the relay membership list. Set false to run an open relay. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/_readiness`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/git`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/buzz-by-block)
