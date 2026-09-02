# Deploy ElectricSQL on Railway

Streams live rows from Postgres to apps over a simple HTTP API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/electricsql)

## About

ElectricSQL is a Postgres sync engine. It reads your database's logical replication stream and serves any subset of it — a "shape" — over an ordinary, cacheable HTTP API, so browsers, mobile apps and edge workers hold a live local copy of exactly the rows they care about. Instead of writing polling loops, websocket fan-out and cache invalidation by hand, you point a client at a URL carrying a table name and a `where` clause, and Electric keeps it current. It is Apache-2.0 licensed, has over 10,000 GitHub stars, and is the sync layer behind TanStack DB.

Deploy ElectricSQL on Railway and you get three wired-up services: Postgres 18 started with logical replication enabled, the `electricsql/electric` sync service holding its shape logs on a volume, and an nginx caching proxy as the only public entry point. Requests hit the proxy, which caches immutable shape-log pages and collapses concurrent live subscriptions into one upstream request before forwarding to Electric over private networking. Self-hosting ElectricSQL elsewhere means configuring `wal_level` and standing up that cache yourself; here it is already done.

![Diagram of the Electric, Postgres and nginx cache services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788275417/electricsql-architecture.png)

Electric solves the hardest part of real-time and local-first applications: getting a correct, resumable subset of a Postgres database into a client and keeping it there. It replaces neither your database nor your API — it sits beside them as a read path, and teams self-host it to keep that path on their own infrastructure rather than routing customer data through a third party.

- Partial replication through shapes: a table, a `where` clause and a column list
- A plain HTTP API — no custom protocol, no websocket server to operate
- Resumable, append-only logs that survive client restarts and network loss
- Built for CDN and proxy caching, so repeat syncs never touch Postgres
- Reads only: writes go through your own API, so your auth rules stay put

The deployment splits into three roles. **Postgres** owns every durable byte and runs with `wal_level=logical`. **electric** connects over a replication slot, keeps its shape logs on a 5 GB volume, and serves the API privately on port 3000. **cache** is nginx with `proxy_cache` and `proxy_cache_lock`, the only service with a public domain; its request collapsing lets subscribers share one upstream long-poll.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cache | [gridalpha/electricsql-railway](https://github.com/gridalpha/electricsql-railway) | Web service |
| electric | `electricsql/electric:latest` | Database |
| Postgres | [gridalpha/electricsql-railway](https://github.com/gridalpha/electricsql-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | cache | 8080 | Public listening port |
| `ELECTRIC_UPSTREAM` | cache | - | Sync service host and port |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | cache | 1 | Size workers from the cgroup quota |
| `PORT` | electric | 3000 | Port Railway health-checks |
| `ERL_AFLAGS` | electric | +S 8:8 +SDio 8 | Cap BEAM schedulers to the quota |
| `DATABASE_URL` | electric | - | Postgres connection, REPLICATION role |
| `ELECTRIC_PORT` | electric | 3000 | HTTP API listening port |
| `ELECTRIC_SECRET` | electric | (secret) | Required on every shape request |
| `ELECTRIC_LOG_LEVEL` | electric | info | Log verbosity |
| `ELECTRIC_STORAGE_DIR` | electric | /data/electric | Shape logs on the volume |
| `ELECTRIC_DB_POOL_SIZE` | electric | 20 | Connections used for shape queries |
| `ELECTRIC_LISTEN_ON_IPV6` | electric | true | Reachable over private networking |
| `ELECTRIC_DATABASE_USE_IPV6` | electric | true | Prefer the database AAAA record |
| `ELECTRIC_CONSUMER_PARTITIONS` | electric | 8 | Match the container CPU quota |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/v1/health`
- **Volume:** `/data`
- **Start command:** `wrapper.sh postgres -p 5432 -c listen_addresses=* -c wal_level=logical -c max_wal_senders=10 -c max_replication_slots=10`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/electricsql)
