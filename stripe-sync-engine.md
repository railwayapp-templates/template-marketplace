# Deploy Stripe Sync Engine on Railway

A Fastify-based server for syncing your Stripe account to PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/stripe-sync-engine)

## About

A Fastify-based server for syncing your Stripe account to a PostgreSQL database in real time. Built on top of the Stripe Sync Engine.

https://supabase.github.io/stripe-sync-engine/

### Features
- Exposes a /webhooks endpoint to receive Stripe webhooks and sync data to PostgreSQL
- Supports syncing customers, invoices, products, subscriptions, and more
- Runs as a lightweight Docker container
- Designed for easy deployment to any cloud or self-hosted environment

Sometimes you want to analyze your billing data using SQL. Even more importantly, you want to join your billing data to your product/business data.

This project synchronizes your Stripe account to a PostgreSQL database. It can be a new database, or an existing PostgreSQL database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| supabase/stripe-sync-engine:latest | `supabase/stripe-sync-engine:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | supabase/stripe-sync-engine:latest | 8080 | Port to run the server on (default: 8080) |
| `SCHEMA` | supabase/stripe-sync-engine:latest | stripe | Database schema name (default: stripe) |
| `API_KEY` | supabase/stripe-sync-engine:latest | (secret) | API key for admin endpoints (backfilling, etc.) |
| `PG_SSL_CA` | supabase/stripe-sync-engine:latest | - | Base64-encoded CA certificate for SSL connections |
| `PG_SSL_CERT` | supabase/stripe-sync-engine:latest | - | Certificate chain in PEM format for SSL connections |
| `DATABASE_URL` | supabase/stripe-sync-engine:latest | - | PostgreSQL connection string (include search_path=stripe) |
| `AUTO_EXPAND_LISTS` | supabase/stripe-sync-engine:latest | false | Fetch all list items from Stripe (default: false) |
| `STRIPE_SECRET_KEY` | supabase/stripe-sync-engine:latest | (secret) | Stripe secret key (needed for active sync/backfill) |
| `DISABLE_MIGRATIONS` | supabase/stripe-sync-engine:latest | false | Disable automated DB migrations on startup (default: false) |
| `STRIPE_API_VERSION` | supabase/stripe-sync-engine:latest | 2020-08-27 | Stripe API version (default: 2020-08-27) |
| `PG_SSL_REQUEST_CERT` | supabase/stripe-sync-engine:latest | false | Request a certificate from clients and attempt to verify it |
| `PG_SSL_CONFIG_ENABLED` | supabase/stripe-sync-engine:latest | false | Enables SSL configuration. Set to true to enable |
| `STRIPE_WEBHOOK_SECRET` | supabase/stripe-sync-engine:latest | (secret) | Stripe webhook signing secret |
| `MAX_POSTGRES_CONNECTIONS` | supabase/stripe-sync-engine:latest | 10 | Max PostgreSQL connection pool size (default: 10) |
| `BACKFILL_RELATED_ENTITIES` | supabase/stripe-sync-engine:latest | true | Backfill related entities for foreign key integrity (default: true) |
| `PG_SSL_REJECT_UNAUTHORIZED` | supabase/stripe-sync-engine:latest | false | Reject unauthorized SSL connections. Set to true to enforce |
| `REVALIDATE_OBJECTS_VIA_STRIPE_API` | supabase/stripe-sync-engine:latest | false | Always fetch latest entity from Stripe (default: false) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/stripe-sync-engine)
