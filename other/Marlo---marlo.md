# Deploy Marlo on Railway

marlo — intelligent email for busy people.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/marlo)

## About

Marlo is an AI-powered email client that intelligently manages your inbox. It integrates with Gmail to provide automated email organization, smart filtering, and AI-assisted responses powered by Google's generative AI models.

Marlo runs as a containerized microservice architecture with three core services: a web application (Astro frontend), a WebSocket sync engine, and a mail ingester service for Gmail integration. The deployment requires PostgreSQL for persistent data storage and Redis for caching and job queues. Each service is independently scalable and includes health checks for reliability. You'll need Google Cloud credentials for OAuth authentication, Gmail API access, and generative AI features. Additional optional integrations include Stripe for payments, Sentry for error tracking, and AWS S3 for file storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Web | [marlohq/marlo](https://github.com/marlohq/marlo) | Web service |
| Redis | `redis:8.2.1` | Database |
| Mail Ingestion | [marlohq/marlo](https://github.com/marlohq/marlo) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Sync | [astrotechco/marlo](https://github.com/astrotechco/marlo) | Web service |
| PGBouncer | `railwayapp/pgbouncer` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ROARR_LOG` | Web | TRUE | - |
| `REDIS_HOST` | Web | localhost | - |
| `SENTRY_DSN` | Web | - | Sentry DSN (Data Source Name) to use. If omitted, Sentry will be disabled. |
| `AUTH_SECRET` | Web | (secret) | Secret for authentication sessions |
| `BUCKET_NAME` | Web | - | Name of the S3 bucket |
| `DATABASE_URL` | Web | - | Internal database URL |
| `AXIOM_TOKEN_WEB` | Web | (secret) | Axiom token for the web app |
| `GOOGLE_CLIENT_ID` | Web | - | Google OAuth client ID |
| `SYNC_AUTH_SECRET` | Web | (secret) | Shared secret with sync server |
| `AWS_ACCESS_KEY_ID` | Web | - | AWS access key for S3 bucket access |
| `SENTRY_CLIENT_DSN` | Web | - | Sentry DSN (Data Source Name) to use on the client. If omitted, Sentry will be disabled. |
| `STRIPE_SECRET_KEY` | Web | (secret) | Stripe API secret key |
| `GOOGLE_GMAIL_TOPIC` | Web | - | Google Pub/Sub topic for Gmail notifications |
| `PUBLIC_BACKEND_URL` | Web | - | Backend URL, for ex: https://marlo.example.com |
| `GOOGLE_CLIENT_SECRET` | Web | (secret) | Google OAuth client secret |
| `OAUTH_ENCRYPTION_KEY` | Web | - | Encryption key for OAuth tokens |
| `AWS_SECRET_ACCESS_KEY` | Web | (secret) | AWS secret key for S3 bucket access |
| `NPM_TASKFORCESH_TOKEN` | Web | (secret) | - |
| `PUBLIC_LOGIN_BASE_URL` | Web | (secret) | Base login URL, for ex: https://marlo.example.com |
| `STRIPE_SIGNING_SECRET` | Web | (secret) | Stripe webhook signing secret |
| `FEATURE_STRIPE_ENABLED` | Web | - | Enable/disable Stripe |
| `GH_FETCH_RELEASE_TOKEN` | Web | (secret) | Release token for desktop publishing |
| `PUBLIC_SYNC_ENGINE_URL` | Web | - | Sync engine web socket address, for ex: wss://marlo-sync.example.com |
| `STRIPE_DEFAULT_PRICE_ID` | Web | - | Default Stripe price ID for subscriptions |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Web | (secret) | Google Generative AI API key |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `ROARR_LOG` | Mail Ingestion | TRUE | - |
| `REDIS_HOST` | Mail Ingestion | localhost | - |
| `SENTRY_DSN` | Mail Ingestion | - | Sentry DSN (Data Source Name) to use. If omitted, Sentry will be disabled. |
| `DATABASE_URL` | Mail Ingestion | - | Internal database URL |
| `NODE_OPTIONS` | Mail Ingestion | --max-old-space-size=8192 | - |
| `AXIOM_TOKEN_INGEST` | Mail Ingestion | (secret) | Axiom token for ingestion |
| `BULL_BOARD_PASSWORD` | Mail Ingestion | (secret) | If using BullMQ Pro features |
| `BULL_BOARD_USERNAME` | Mail Ingestion | (secret) | If using BullMQ Pro features |
| `GOOGLE_CLIENT_SECRET` | Mail Ingestion | (secret) | - |
| `AWS_SECRET_ACCESS_KEY` | Mail Ingestion | (secret) | - |
| `NPM_TASKFORCESH_TOKEN` | Mail Ingestion | (secret) | - |
| `GOOGLE_SERVICE_ACCOUNT` | Mail Ingestion | - | Google service account |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `ROARR_LOG` | Sync | TRUE | - |
| `SENTRY_DSN` | Sync | - | Sentry DSN (Data Source Name) to use. If omitted, Sentry will be disabled. |
| `DATABASE_URL` | Sync | - | Internal database URL |
| `AXIOM_TOKEN_SYNC` | Sync | (secret) | Axiom token for sync engine |
| `SYNC_AUTH_SECRET` | Sync | (secret) | Random string that serves as a secret in auth key signing. |
| `DIRECT_DATABASE_URL` | Sync | - | Direct database URL |
| `NPM_TASKFORCESH_TOKEN` | Sync | (secret) | - |
| `POSTGRESQL_PORT` | PGBouncer | 5432 | - |
| `PGBOUNCER_POOL_MODE` | PGBouncer | transaction | - |
| `POSTGRESQL_PASSWORD` | PGBouncer | (secret) | - |
| `POSTGRESQL_USERNAME` | PGBouncer | (secret) | - |
| `PGBOUNCER_LISTEN_ADDRESS` | PGBouncer | * | - |
| `PGBOUNCER_MAX_CLIENT_CONN` | PGBouncer | 190 | - |
| `PGBOUNCER_DEFAULT_POOL_SIZE` | PGBouncer | 60 | - |
| `PGBOUNCER_CLIENT_IDLE_TIMEOUT` | PGBouncer | 300 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH" --maxmemory-policy noeviction`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, Astro, PLpgSQL, CSS, Dockerfile, Shell, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/marlo)
