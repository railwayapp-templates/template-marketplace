# Deploy Buzz Relay - Source on Railway

Deploy and Host Buzz Relay on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/buzz-relay-source)

## About

Buzz Relay is the self-hostable server behind Buzz, a Nostr-based workspace where people and AI agents collaborate. A single relay process serves real-time messaging over WebSockets, HTTP APIs, media, and Git workflows while enforcing community membership and preserving user-owned cryptographic identities.

Hosting Buzz Relay gives you control over your community's identity, membership, messages, media, and repositories. This Railway template deploys the relay with PostgreSQL for durable event and membership data, Redis for coordination and real-time fan-out, and S3-compatible object storage for media and Git objects. Railway provides the public domain, TLS termination, service networking, secrets, health checks, and persistent infrastructure. You provide the public key for the relay owner. Keep the generated relay signing key stable, and back up PostgreSQL and object storage before upgrades.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| buzz | `ghcr.io/block/buzz:sha-97e1f6a` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | buzz | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | Redis hostname on Railway's private network (only reachable from services in the same project) |
| `REDISPORT` | Redis | 6379 | Port Redis listens on inside the private network (Redis default) |
| `REDISUSER` | Redis | default | Redis username; "default" is the built-in user |
| `REDIS_URL` | Redis | - | Private-network connection string for other Railway services (no egress cost, not exposed publicly) |
| `REDISPASSWORD` | Redis | (secret) | Same password as REDIS_PASSWORD, for clients that expect this name |
| `REDIS_PASSWORD` | Redis | (secret) | 32-letter random password (a-z, A-Z), generated once when the service is created |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string through Railway's TCP proxy, for connecting from outside Railway (exposed to the internet, counts as egress) |
| `PORT` | buzz | 3000 | Railway service port |
| `RUST_LOG` | buzz | buzz_relay=info,buzz_db=info,buzz_auth=info,buzz_pubsub=info,tower_http=info | Runtime log filters |
| `REDIS_URL` | buzz | - | Redis connection URL |
| `RELAY_URL` | buzz | - | Public relay WebSocket URL |
| `DATABASE_URL` | buzz | - | PostgreSQL connection URL |
| `BUZZ_BIND_ADDR` | buzz | 0.0.0.0:3000 | Relay listen address |
| `BUZZ_S3_BUCKET` | buzz | - | Bucket API name |
| `BUZZ_S3_REGION` | buzz | - | Bucket region |
| `BUZZ_S3_ENDPOINT` | buzz | - | Bucket S3 endpoint |
| `BUZZ_AUTO_MIGRATE` | buzz | true | Run database migrations on startup |
| `BUZZ_CORS_ORIGINS` | buzz | - | Allowed browser origin |
| `BUZZ_GIT_REPO_PATH` | buzz | /data/git | Persistent Git repository path |
| `BUZZ_S3_ACCESS_KEY` | buzz | - | Bucket access key |
| `BUZZ_S3_SECRET_KEY` | buzz | (secret) | Bucket secret key |
| `RELAY_OWNER_PUBKEY` | buzz | - | Owner's 64-character hex Nostr public key; not npub |
| `BUZZ_MEDIA_BASE_URL` | buzz | - | Public media URL prefix |
| `BUZZ_ALLOW_NIP_OA_AUTH` | buzz | true | Allow NIP-OA authentication |
| `BUZZ_RELAY_PRIVATE_KEY` | buzz | - | Per-deployment relay identity key |
| `BUZZ_REQUIRE_AUTH_TOKEN` | buzz | (secret) | Require authenticated relay access |
| `BUZZ_MEDIA_SERVER_DOMAIN` | buzz | - | Public media server domain |
| `BUZZ_S3_ADDRESSING_STYLE` | buzz | virtual | Use Railway virtual-hosted S3 URLs |
| `BUZZ_GIT_HOOK_HMAC_SECRET` | buzz | (secret) | Per-deployment Git hook signing secret |
| `BUZZ_GIT_CONFORMANCE_PROBE` | buzz | true | Test Git object storage on startup |
| `BUZZ_REQUIRE_RELAY_MEMBERSHIP` | buzz | true | Restrict access to relay members |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/_readiness`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/buzz-relay-source)
