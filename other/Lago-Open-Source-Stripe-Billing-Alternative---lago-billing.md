# Deploy Lago | Open Source Stripe Billing Alternative on Railway

Self-Host Lago. Billing infrastructure for AI and SaaS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lago-billing)

## About

Deploy Lago on Railway to self-host an open-source metering and usage-based billing platform built for product-led SaaS companies — the same engine PayPal, Mistral AI, and Groq use to invoice usage events, manage subscriptions, and orchestrate payments. Self-host Lago when you outgrow Stripe Billing, Chargebee, or Recurly's rigid subscription primitives and need credits, wallets, hybrid plans, or progressive billing on infrastructure you own.

This Railway template runs the full Lago stack: a custom Postgres image (`getlago/postgres-partman:15.0-alpine`) with the `pg_partman` extension for event partitioning, a Railway-managed Redis for Sidekiq queues and Rails caching, the `getlago/api:v1.45.2` image deployed three ways (API web server, Sidekiq worker, and clockwork scheduler), and the `getlago/front:v1.45.2` Single Page Application with nginx. Encryption keys, JWT signing keys, and the Rails secret are pre-generated and shared across API/Worker/Clock so every deploy works out of the box.

![Lago Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1778606159/6eb4880a-84f4-41d6-bd54-6547c621b792.png)

Lago is the open-source billing layer behind product-led B2B SaaS — its core job is turning streams of usage events into accurate invoices and revenue records, regardless of pricing model. Unlike Stripe Billing or Chargebee, every aggregation rule, plan, and pricing tier lives in your own database, queryable and forkable.

Key features available in the self-hosted edition:
- Usage-based, subscription, hybrid, and credit-based pricing on the same plan
- Wallet, prepaid credits, and progressive billing primitives
- Webhook + GraphQL API for every customer, subscription, and event mutation
- Plug-in payment processors (Stripe, GoCardless, Adyen) and tax engines
- Sidekiq-backed job queue with retry semantics for high-volume usage ingestion

Architecture note: this template separates `API`, `Worker`, and `Clock` so high-traffic event ingestion does not starve background billing jobs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | `getlago/api:v1.45.2` | Worker |
| Postgres | `getlago/postgres-partman:15.0-alpine` | Database |
| Redis | `redis:8.2.1` | Database |
| API | `getlago/api:v1.45.2` | Web service |
| Front | `getlago/front:v1.45.2` | Web service |
| Clock | `getlago/api:v1.45.2` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RAILS_ENV` | Worker | production | Rails environment |
| `REDIS_URL` | Worker | - | Full Redis URL |
| `REDIS_HOST` | Worker | - | Redis private hostname |
| `REDIS_PORT` | Worker | 6379 | Redis port |
| `POSTGRES_DB` | Worker | - | Postgres db reference |
| `DATABASE_URL` | Worker | - | Full Postgres URL |
| `LAGO_API_URL` | Worker | - | Public API URL |
| `LAGO_PDF_URL` | Worker | http://pdf.railway.internal:3000 | Gotenberg URL (when added) |
| `POSTGRES_HOST` | Worker | - | Postgres private hostname |
| `POSTGRES_PORT` | Worker | 5432 | Postgres port |
| `POSTGRES_USER` | Worker | (secret) | Postgres user reference |
| `LAGO_SMTP_PORT` | Worker | 587 | SMTP port |
| `REDIS_PASSWORD` | Worker | (secret) | Redis password reference |
| `LAGO_FROM_EMAIL` | Worker | noreply@example.com | From address on emails |
| `LAGO_USE_AWS_S3` | Worker | false | Disable S3 |
| `POSTGRES_SCHEMA` | Worker | public | Schema name |
| `SECRET_KEY_BASE` | Worker | (secret) | Shared Rails secret |
| `LAGO_RAILS_STDOUT` | Worker | true | Lago-specific stdout flag |
| `POSTGRES_PASSWORD` | Worker | (secret) | Postgres password reference |
| `RAILS_LOG_TO_STDOUT` | Worker | true | Send logs to stdout |
| `LAGO_DISABLE_SEGMENT` | Worker | true | Disable Segment telemetry |
| `LAGO_RSA_PRIVATE_KEY` | Worker | - | Shared JWT signing key |
| `LAGO_REDIS_CACHE_HOST` | Worker | - | Rails cache Redis host |
| `LAGO_REDIS_CACHE_PORT` | Worker | 6379 | Rails cache Redis port |
| `LAGO_REDIS_CACHE_PASSWORD` | Worker | (secret) | Rails cache Redis password |
| `LAGO_DISABLE_PDF_GENERATION` | Worker | true | Disable PDFs |
| `LAGO_DISABLE_WALLET_REFRESH` | Worker | false | Allow wallet auto-refresh |
| `LAGO_ENCRYPTION_PRIMARY_KEY` | Worker | - | Shared encryption key |
| `LAGO_ENCRYPTION_DETERMINISTIC_KEY` | Worker | - | Shared deterministic key |
| `LAGO_ENCRYPTION_KEY_DERIVATION_SALT` | Worker | - | Shared derivation salt |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_SCHEMA` | Postgres | public | Default schema |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `PORT` | API | 3000 | Rails server port |
| `RAILS_ENV` | API | production | Rails environment |
| `REDIS_URL` | API | - | Full Redis URL |
| `REDIS_HOST` | API | - | Redis private hostname |
| `REDIS_PORT` | API | 6379 | Redis port |
| `POSTGRES_DB` | API | - | Postgres db reference |
| `DATABASE_URL` | API | - | Full Postgres URL |
| `LAGO_API_URL` | API | - | Public API URL |
| `LAGO_PDF_URL` | API | http://pdf.railway.internal:3000 | Gotenberg URL (when added) |
| `LAGO_ORG_NAME` | API | Lago | Seed organization name |
| `POSTGRES_HOST` | API | - | Postgres private hostname |
| `POSTGRES_PORT` | API | 5432 | Postgres port |
| `POSTGRES_USER` | API | (secret) | Postgres user reference |
| `LAGO_FRONT_URL` | API | - | Public Front URL |
| `LAGO_SMTP_PORT` | API | 587 | SMTP port |
| `REDIS_PASSWORD` | API | (secret) | Redis password reference |
| `LAGO_CREATE_ORG` | API | true | Seed organization on first deploy |
| `LAGO_FROM_EMAIL` | API | noreply@example.com | From address on Lago emails |
| `LAGO_USE_AWS_S3` | API | false | Disable S3 (enable later for PDFs) |
| `POSTGRES_SCHEMA` | API | public | Schema name |
| `SECRET_KEY_BASE` | API | (secret) | Rails session signing key |
| `LAGO_ORG_API_KEY` | API | (secret) | Seed API key |
| `LAGO_SIDEKIQ_WEB` | API | false | Disable public Sidekiq UI |
| `LAGO_RAILS_STDOUT` | API | true | Lago-specific stdout flag |
| `POSTGRES_PASSWORD` | API | (secret) | Postgres password reference |
| `LAGO_DISABLE_SIGNUP` | API | false | Allow new user signups |
| `LAGO_ORG_USER_EMAIL` | API | - | Bootstrap admin email |
| `RAILS_LOG_TO_STDOUT` | API | true | Send logs to stdout |
| `LAGO_DISABLE_SEGMENT` | API | true | Disable Segment telemetry |
| `LAGO_RSA_PRIVATE_KEY` | API | LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQ0KTUlJRXBBSUJBQUtDQVFFQXo0bEFQQ2FXbkpoaDg0cVNlZHF5TmExSytBQ3FnU3FQaDdaOG5kV0pQbEpoQXdobA0KNXpRRWFyajA4VUxoSVAvenFsbG5OdTQ2cjRCV2lKNU5PREJsTERZQU1hSWUreGp6c2dBek1kMWxONUZoT0RIdg0Kd0NhYWVwWThmUDJoczEremhid2V3OEhrbVR4ZEM3VnNMOHM1YXk3eUtVSklKelpyS2hwQ1poV2JPVGZWdGIwUw0Ka2dnTlBzSWUrb3FvNnhJd04vWU5mZkZUS0RhSXFhQ1BxYkdmTzREVXpUVFU2ZzRDMDVQVGxmWlJzRnJqVy9qag0KYjFJT3hnb1l1MnBPU1J3dCs4RnJJMXdtRmF0VlVVSkpuZXdpZmtnVm1GbWdMVnl2aThNWDZySVpCdHlFdWtIRQ0KSnhLcC82UFkwUFVLUFBxdHdVWTNnNFh5SjhQQVJjNGZadmJHOXdJREFRQUJBb0lCQVFDOGJOTERTZzNJazVtcg0KTW84V3ozYXB3WEtsaElWSnpNaVA0U0YzYzk2dGxNRzdyUzVJSWpRNGFVRUtvendmYUFObEVOTGpUcHc5cDNucA0KaEVCNzJZU2lCVTFid3VQNStvZVhmeEw4SFJTK3hPSE4wWmpwanFNRzFjeUpkd1lQQTc3TWx5WWZlYlVCWTRyZg0KREpMek9jSWlESGVVK2pia1UwWXM3YmFIVk9xZm9PMHIyNkZEeXBFZDlUaTFTTWNtZjZyYjdRRVFhU3VaZG5QWA0KanZINlQ0T0wxS2ZrK2NzaFZkNDJWK2FjSUV0cEg1ZU9NSytQczBwUW9obWhUNE1SdWxwbWQ3eTFoV010b0Q4OA0KdHR3MWMrcHJObjU0aWhYaE8wbWhoeG5FWWxDQ1VMbDFzYTVPNjZFTHhxMndyU0ZDbCtLTDdRQytFdWFsYllibA0KeTFUUHpIeGhBb0dCQU8rZCtNTWxpdGpWN0NIdTVDa3JOZ1JISUZlM0U2WlBGcVd4SGQza05SaGNsYmhna29OWQ0KamgvKzhrYUZuVnkyRWpudzhPSWFnenRuRkJZaUhhVUdBczMwKzlmRk9lSnd0UFVXSkFVcVN2QnJ3NnVRbXNabw0KdEtCUThmYTV5R1Z0ZXk5VVRaZ2tBYlh3WGRoaUFkQzQwQmxvZTIzck1jMXIxTi9Wd3pTaGlXS1BBb0dCQU4yNQ0Kdzl1a0JsNkNvOXpua3FlVFN1SVdnY3JSWmFvbThocU1mZDZBakI2SVNPNEpwNmxtbS9LMnpFTEx6b2FTbFduTA0KcFBjdlF2K1ZIaFRUZzZrL2g5ZWxiUFYzRDdmTjN6TVlTU2g1N1lVeXI3MlBqVXRJOTN4N0ZTbHZ4MlA4T2U3eQ0Kd2M3c1ZTNDYrRFZhKzhsamtReHZncmhFMzJxN2ZDTzRuVGlZcU9rWkFvR0FTa3RRdGpFTnUrMllLVzFJa1BzMA0KNUY2cFNJa2JMcFdYRUFpNm1mSUlCR1d3aGxwckV3NkNBcW1wdFBQNHRxWTlRSG5VTmtiQ0tjanNFWERDZ0VnOA0KMWw3L053ZVB5d1huRlphbjFISW9paUxmcUhKTml2Y3NDZ2tPL05EZHNaVWdmS3hHNHNWSFFvSWtsdExNZlVyUQ0KT3hDS05LcVg1bmxvcDM0LzZER3R4MEVDZ1lFQXl3TmFCM05wdVlOWVVkMWVkRHp5NVl2Q0QxZ25BK0pnN2xvUQ0KclhkNTFFTG9zN3IzWHEzcXdCTUxkMlZ3bGRzRkh6Y3N0bjc1azFhUGtuWVFLUmxZWWVTL25Ra0V4VUNreXYzRA0Kam1JRlRsNFlkekpISnRXS2RObWxpS2ttSWJCQnd6MVdvd1hWQUYxU0FsaHFEZjB5US9hZDgrWnJ3aWdrQS9qMw0KUzJqTHo1RUNnWUE5M3kzTnEwRmF1VEJvODF4TWJNU09yTllJekk3Q25uY1loQVI2NVZnOXZNcHNiLzVPQVUzNQ0KajVqSkhkcGsybGlaZTQxYXIyL2JiNnkzOFNtV0ZnUmtpVjk3YVg0SkpQNm56Q25TZVMxNk05YUtURTVuRFFOQw0KcXhVWUR6czdodkNnZnIxczMxVDVOMmt2NDZSaERpUDk2UlBhSGx2NFBOd056YlJzUlJxSUFRPT0NCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tDQo= | Base64 RSA private key |
| `LAGO_REDIS_CACHE_HOST` | API | - | Rails cache Redis host |
| `LAGO_REDIS_CACHE_PORT` | API | 6379 | Rails cache Redis port |
| `LAGO_ORG_USER_PASSWORD` | API | (secret) | Bootstrap admin password |
| `LAGO_REDIS_CACHE_PASSWORD` | API | (secret) | Rails cache Redis password |
| `LAGO_DISABLE_PDF_GENERATION` | API | true | Disable PDFs (no shared storage) |
| `LAGO_DISABLE_WALLET_REFRESH` | API | false | Allow wallet auto-refresh |
| `LAGO_ENCRYPTION_PRIMARY_KEY` | API | - | ActiveRecord encryption key |
| `LAGO_ENCRYPTION_DETERMINISTIC_KEY` | API | - | AR deterministic key |
| `LAGO_ENCRYPTION_KEY_DERIVATION_SALT` | API | - | AR derivation salt |
| `PORT` | Front | 80 | Nginx port |
| `API_URL` | Front | - | API URL injected into env-config.js |
| `APP_ENV` | Front | production | Runtime environment label |
| `SENTRY_DSN` | Front | - | Optional Sentry error reporting DSN |
| `LAGO_DOMAIN` | Front | - | Front's own public domain |
| `NANGO_PUBLIC_KEY` | Front | - | Optional Nango integrations key |
| `LAGO_SUPERSET_URL` | Front | - | Optional Superset embed URL |
| `LAGO_DISABLE_SIGNUP` | Front | false | Allow new user signups |
| `LAGO_OAUTH_PROXY_URL` | Front | - | Optional OAuth proxy URL |
| `LAGO_DISABLE_PDF_GENERATION` | Front | true | Hide PDF UI controls |
| `RAILS_ENV` | Clock | production | Rails environment |
| `REDIS_URL` | Clock | - | Full Redis URL |
| `REDIS_HOST` | Clock | - | Redis private hostname |
| `REDIS_PORT` | Clock | 6379 | Redis port |
| `POSTGRES_DB` | Clock | - | Postgres db reference |
| `DATABASE_URL` | Clock | - | Full Postgres URL |
| `LAGO_API_URL` | Clock | - | Public API URL |
| `LAGO_PDF_URL` | Clock | http://pdf.railway.internal:3000 | Gotenberg URL (when added) |
| `POSTGRES_HOST` | Clock | - | Postgres private hostname |
| `POSTGRES_PORT` | Clock | 5432 | Postgres port |
| `POSTGRES_USER` | Clock | (secret) | Postgres user reference |
| `LAGO_SMTP_PORT` | Clock | 587 | SMTP port |
| `REDIS_PASSWORD` | Clock | (secret) | Redis password reference |
| `LAGO_FROM_EMAIL` | Clock | noreply@example.com | From address on emails |
| `LAGO_USE_AWS_S3` | Clock | false | Disable S3 |
| `POSTGRES_SCHEMA` | Clock | public | Schema name |
| `SECRET_KEY_BASE` | Clock | (secret) | Shared Rails secret |
| `LAGO_RAILS_STDOUT` | Clock | true | Lago-specific stdout flag |
| `POSTGRES_PASSWORD` | Clock | (secret) | Postgres password reference |
| `RAILS_LOG_TO_STDOUT` | Clock | true | Send logs to stdout |
| `LAGO_DISABLE_SEGMENT` | Clock | true | Disable Segment telemetry |
| `LAGO_RSA_PRIVATE_KEY` | Clock | - | Shared JWT signing key |
| `LAGO_REDIS_CACHE_HOST` | Clock | - | Rails cache Redis host |
| `LAGO_REDIS_CACHE_PORT` | Clock | 6379 | Rails cache Redis port |
| `LAGO_REDIS_CACHE_PASSWORD` | Clock | (secret) | Rails cache Redis password |
| `LAGO_DISABLE_PDF_GENERATION` | Clock | true | Disable PDFs |
| `LAGO_DISABLE_WALLET_REFRESH` | Clock | false | Allow wallet auto-refresh |
| `LAGO_ENCRYPTION_PRIMARY_KEY` | Clock | - | Shared encryption key |
| `LAGO_ENCRYPTION_DETERMINISTIC_KEY` | Clock | - | Shared deterministic key |
| `LAGO_ENCRYPTION_KEY_DERIVATION_SALT` | Clock | - | Shared derivation salt |

## Configuration

- **Start command:** `./scripts/start.worker.sh`
- **Volume:** `/data/postgres`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `./scripts/start.api.sh`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **Start command:** `./scripts/start.clock.sh`

**Category:** Other

[View on Railway →](https://railway.com/deploy/lago-billing)
