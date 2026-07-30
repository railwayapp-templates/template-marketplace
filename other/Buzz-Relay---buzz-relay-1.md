# Deploy Buzz Relay on Railway

Deploy and Host Buzz Relay on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/buzz-relay-1)

## About

Buzz Relay is the self-hostable server behind Buzz, a Nostr-based workspace where people and AI agents collaborate. A single relay process serves real-time messaging over WebSockets, HTTP APIs, media, and Git workflows while enforcing community membership and preserving user-owned cryptographic identities.

Hosting Buzz Relay gives you control over your community's identity, membership, messages, media, and repositories. This Railway template deploys the relay with PostgreSQL for durable event and membership data, Redis for coordination and real-time fan-out, and S3-compatible object storage for media and Git objects. Railway provides the public domain, TLS termination, service networking, secrets, health checks, and persistent infrastructure. You provide the public key for the relay owner. Keep the generated relay signing key stable, and back up PostgreSQL and object storage before upgrades.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| block/buzz:main | `ghcr.io/block/buzz:sha-788b3c0` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | block/buzz:main | 3000 | Railway service port |
| `RUST_LOG` | block/buzz:main | buzz_relay=info,buzz_db=info,buzz_auth=info,buzz_pubsub=info,tower_http=info | Runtime log filters |
| `REDIS_URL` | block/buzz:main | - | Redis connection URL |
| `RELAY_URL` | block/buzz:main | - | Public relay WebSocket URL |
| `DATABASE_URL` | block/buzz:main | - | PostgreSQL connection URL |
| `BUZZ_BIND_ADDR` | block/buzz:main | 0.0.0.0:3000 | Relay listen address |
| `BUZZ_S3_BUCKET` | block/buzz:main | - | Bucket API name |
| `BUZZ_S3_REGION` | block/buzz:main | - | Bucket region |
| `BUZZ_S3_ENDPOINT` | block/buzz:main | - | Bucket S3 endpoint |
| `BUZZ_AUTO_MIGRATE` | block/buzz:main | true | Run database migrations on startup |
| `BUZZ_CORS_ORIGINS` | block/buzz:main | - | Allowed browser origin |
| `BUZZ_GIT_REPO_PATH` | block/buzz:main | /data/git | Persistent Git repository path |
| `BUZZ_S3_ACCESS_KEY` | block/buzz:main | - | Bucket access key |
| `BUZZ_S3_SECRET_KEY` | block/buzz:main | (secret) | Bucket secret key |
| `RELAY_OWNER_PUBKEY` | block/buzz:main | - | Owner's 64-character hex Nostr public key; not npub |
| `BUZZ_MEDIA_BASE_URL` | block/buzz:main | - | Public media URL prefix |
| `BUZZ_ALLOW_NIP_OA_AUTH` | block/buzz:main | true | Allow NIP-OA authentication |
| `BUZZ_RELAY_PRIVATE_KEY` | block/buzz:main | - | Per-deployment relay identity key |
| `BUZZ_REQUIRE_AUTH_TOKEN` | block/buzz:main | (secret) | Require authenticated relay access |
| `BUZZ_MEDIA_SERVER_DOMAIN` | block/buzz:main | - | Public media server domain |
| `BUZZ_S3_ADDRESSING_STYLE` | block/buzz:main | virtual | Use Railway virtual-hosted S3 URLs |
| `BUZZ_GIT_HOOK_HMAC_SECRET` | block/buzz:main | (secret) | Per-deployment Git hook signing secret |
| `BUZZ_GIT_CONFORMANCE_PROBE` | block/buzz:main | true | Test Git object storage on startup |
| `BUZZ_REQUIRE_RELAY_MEMBERSHIP` | block/buzz:main | true | Restrict access to relay members |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | buzz | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/_readiness`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/buzz-relay-1)
