# Deploy InstantDB on Railway

Realtime database that syncs queries straight to the browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/instant)

## About

InstantDB is an open-source realtime database that syncs straight to the browser. Write a query in your React, Vue or vanilla JavaScript app and Instant keeps the result live: every client watching that data updates the moment anyone writes, with optimistic updates, offline reads, presence and cursors handled for you. It bundles what a team would otherwise assemble by hand — a relational store, a permissions language, magic-code and OAuth auth, and file storage — behind one SDK. Instant Cloud shuts down in August 2027, so self-hosting is now the supported way to run it.

Deploy InstantDB on Railway and the whole stack is wired together on the first click. The **server** service runs the Clojure sync engine that owns the API, the websocket and the storage endpoints. The **dashboard** service runs the Next.js admin UI for creating apps, browsing data and editing permissions. The **postgres** service is a PostgreSQL 17 build with `pg_hint_plan` and logical replication enabled, which is how the engine tails changes and pushes them to clients. A bucket named **instant-storage** holds uploads. Both public services get an HTTPS domain and the dashboard is handed the API URL at container start, so self-hosting Instant needs no reverse proxy and no DNS work.

![InstantDB server, dashboard and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788976672/instantdb-architecture.png)

Instant sits in the same slot as Firebase or Supabase, but its data model is triples rather than tables, which is what lets a client subscribe to arbitrary nested queries and have them kept fresh. The SDK holds a local store, applies your write immediately and reconciles over a websocket. Teams self-host it to keep user data in their own infrastructure and to avoid per-seat cloud pricing.

- Realtime queries with optimistic writes, offline reads and reconciliation
- A permissions language evaluated server-side, testable in the Sandbox
- Built-in auth: magic codes, Google OAuth, guest sessions, a `$users` namespace
- File storage with presigned uploads, exposed as a `$files` namespace
- Presence, cursors and typing indicators as first-class primitives
- Admin SDK and REST endpoints for server-side reads, writes and user management

The architecture is deliberately small: `server` is stateless apart from one generated keyset on its volume, `postgres` holds every app, namespace, triple and user, and the bucket holds bytes only. Browsers reach the server over HTTPS and upgrade to a websocket for live queries.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dashboard | `ghcr.io/instantdb/dashboard:latest` | Web service |
| server | `ghcr.io/instantdb/server:latest` | Web service |
| postgres | `ghcr.io/instantdb/postgresql:postgresql-17-pg-hint-plan` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | dashboard | 3000 | Next.js listening port |
| `HOSTNAME` | dashboard | 0.0.0.0 | Bind address for the Next.js server |
| `INSTANT_BACKEND_URL` | dashboard | - | API origin handed to the browser |
| `NEXT_TELEMETRY_DISABLED` | dashboard | 1 | Disable Next.js telemetry |
| `PORT` | server | 8888 | HTTP and websocket listening port |
| `JAVA_OPTS` | server | -XX:ActiveProcessorCount=8 -XX:MaxRAMPercentage=70 | Cap JVM heap and thread pools |
| `S3_BUCKET` | server | - | Bucket holding uploaded files |
| `AWS_REGION` | server | us-east-1 | SigV4 signing region |
| `S3_ENDPOINT` | server | - | S3 endpoint used server-side |
| `DATABASE_URL` | server | - | Private Postgres connection string |
| `RESEND_TOKEN` | server | (secret) | Optional; sends login codes via Resend |
| `POSTMARK_TOKEN` | server | (secret) | Optional; sends login codes via Postmark |
| `SENDGRID_TOKEN` | server | (secret) | Optional; sends login codes via SendGrid |
| `STRIPE_API_KEY` | server | (secret) | Optional; billing integration |
| `AWS_ACCESS_KEY_ID` | server | - | Bucket access key |
| `S3_PUBLIC_ENDPOINT` | server | - | Origin used to presign downloads |
| `INSTANT_BACKEND_URL` | server | - | Public API origin |
| `WAL_HISTORY_STORAGE` | server | pg | Keep WAL history in Postgres |
| `CONNECTION_POOL_SIZE` | server | 20 | JDBC connections per instance |
| `AWS_SECRET_ACCESS_KEY` | server | (secret) | Bucket secret key |
| `INSTANT_DASHBOARD_URL` | server | - | Public dashboard origin |
| `INSTANT_EMAIL_PROVIDER` | server | - | Optional; picks provider when several are set |
| `INSTANT_SUPERUSER_EMAIL` | server | - | Optional; operator account for deployment settings |
| `INSTANT_DASHBOARD_GOOGLE_OAUTH_CLIENT_ID` | server | - | Optional; Google sign-in client id |
| `INSTANT_DASHBOARD_GOOGLE_OAUTH_CLIENT_SECRET` | server | (secret) | Optional; Google sign-in secret |
| `POSTGRES_DB` | postgres | instant | Database created on first boot |
| `DATABASE_URL` | postgres | - | Private connection string, literal host so it resolves on a first deploy |
| `POSTGRES_USER` | postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/dash`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health/system`
- **Volume:** `/app/resources/config`
- **Start command:** `docker-entrypoint.sh postgres -c wal_level=logical -c max_replication_slots=10 -c max_wal_senders=10 -c shared_preload_libraries=pg_hint_plan -c random_page_cost=1.1 -c dynamic_shared_memory_type=mmap -c shared_buffers=1GB -c effective_cache_size=3GB -c max_connections=200`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/instant)
