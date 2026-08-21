# Deploy Convex Backend on Railway

Reactive database and backend for building realtime apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convex-backend)

## About

Convex is an open-source reactive backend combining a document database, TypeScript server functions, a scheduler and file storage behind one API. Its defining feature is live queries: when a mutation changes a document, every client subscribed to a query that read it is pushed the new result automatically. Teams building collaborative tools, dashboards and AI chat apps use it to skip REST endpoints, cache invalidation and WebSocket plumbing. You can self-host Convex instead of the managed cloud, keeping data and functions on your own hardware.

This template deploys a self-hosted Convex stack on Railway as three services. `convex-backend` stores documents, runs your queries, mutations and actions, and serves the reactive sync protocol on a public URL. `convex-postgres` is a PostgreSQL 17 database holding every document and index, reachable only on the private network. `convex-dashboard` is the official admin UI on its own URL, for browsing data, inspecting schema and running functions.

![Convex backend, dashboard and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787218430/convex-architecture.png)

Convex replaces the database, API layer and realtime layer with one system. You write TypeScript functions that run inside the backend next to the data: queries are read-only and cached, mutations run as serialisable transactions, and actions can call third-party APIs. The backend tracks which documents each query read, so a write re-runs only the subscriptions it invalidated.

Key features:

- Reactive queries that push updates to clients with no polling or cache invalidation
- ACID transactions: a mutation either fully applies or not at all
- TypeScript end to end, with a built-in scheduler, cron jobs and HTTP actions for webhooks
- Full-text and vector search indexes for AI retrieval

The backend keeps durable records in PostgreSQL rather than the container filesystem, the configuration Convex recommends for production; the alternative is a SQLite file tied to one disk. It still mounts a volume at `/convex/data` for uploaded files, search indexes and first-boot credentials. The dashboard holds no state and can be redeployed freely.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| convex-postgres | `postgres:17` | Database |
| convex-dashboard | `ghcr.io/get-convex/convex-dashboard:c0cb7ae17f54e14846c243c5332a8a5e6d0e19d4` | Web service |
| convex-backend | `ghcr.io/get-convex/convex-backend:c0cb7ae17f54e14846c243c5332a8a5e6d0e19d4` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | convex-postgres | convex_self_hosted | Database created on first boot |
| `POSTGRES_USER` | convex-postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | convex-postgres | (secret) | Superuser password |
| `PORT` | convex-dashboard | 6791 | HTTP server listening port |
| `NEXT_PUBLIC_DEPLOYMENT_URL` | convex-dashboard | - | Backend URL prefilled at login |
| `PORT` | convex-backend | 3210 | Port Railway health checks probe |
| `RUST_LOG` | convex-backend | info | Backend log verbosity |
| `POSTGRES_URL` | convex-backend | - | No database name, no query string |
| `INSTANCE_NAME` | convex-backend | convex-self-hosted | Deployment name; sets database name |
| `DISABLE_BEACON` | convex-backend | true | Disable anonymous usage telemetry |
| `INSTANCE_SECRET` | convex-backend | (secret) | Hex key that signs admin keys |
| `CONVEX_SITE_ORIGIN` | convex-backend | - | Public origin for HTTP actions |
| `DO_NOT_REQUIRE_SSL` | convex-backend | 1 | Permit private non-TLS database link |
| `CONVEX_CLOUD_ORIGIN` | convex-backend | - | Public API origin for clients |
| `APPLICATION_MAX_CONCURRENT_V8_ACTIONS` | convex-backend | 16 | Concurrent V8 action limit |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/bash -c 'set -e; source ./read_credentials.sh; K=$(./generate_key "$INSTANCE_NAME" "$INSTANCE_SECRET"); printf "%s\n" "$K" > "$CREDENTIALS_DIR/admin_key"; echo "===== CONVEX ADMIN KEY (copy this, it is your dashboard login) ====="; echo "$K"; echo "===== END CONVEX ADMIN KEY ====="; exec ./run_backend.sh'`
- **Healthcheck:** `/version`
- **Volume:** `/convex/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/convex-backend)
