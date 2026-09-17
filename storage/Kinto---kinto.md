# Deploy Kinto on Railway

JSON document store with a REST API, permissions and offline sync

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kinto)

## About

Kinto is a generic JSON document store with a REST API, fine-grained permissions and an offline-first synchronisation protocol. Mozilla built it to ship configuration and blocklists to hundreds of millions of Firefox installations, and it works just as well as the backend for an app you would rather not write a storage tier for: create a bucket, create a collection, POST JSON, and get back versioned records with per-object permissions, ETag conflict detection and a `?_since=` change feed. Self-host Kinto for Firebase-shaped storage without the vendor or the per-read bill.

This template runs Kinto as its documentation describes for production, not the in-memory configuration its published image ships with. Three services are deployed: **kinto**, the API and admin console, and the only one with a public URL; **Postgres**, holding every bucket, collection, record, group, permission and account; and **Redis**, caching verified credentials and pagination tokens. Requests arrive over HTTPS and are authenticated against accounts in Postgres. The container keeps nothing on disk, so it scales out horizontally.

![Diagram of the Kinto, PostgreSQL and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789588301/kinto-architecture.webp)

Kinto sits between a database you have to design and a backend-as-a-service you cannot move off. Data is buckets → collections → records, plain JSON, addressable over HTTP. Teams self-host it when a client needs somewhere to keep user data, when applications share settings, or when a product ships configuration that must work offline.

- **REST API over JSON** with buckets, collections, records and groups
- **Per-object permissions** — read, write and `record:create` for accounts, groups or everyone
- **Optional JSON-schema validation** per collection, enforced server-side
- **Offline-first sync** — `?_since=` change feeds, ETags and conflict detection, via `kinto.js`
- **Full history** of every create, update and delete, with the author recorded
- **Built-in accounts**, a bundled admin console and a batch endpoint

The architecture is deliberately small. The `kinto` service runs the Python application behind Waitress on port 8888. `Postgres` is the system of record; Kinto shares one connection pool between its storage and permission backends, since both point at the same database. `Redis` caches verified credentials and pagination tokens, so losing it costs latency, never data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| kinto | [gridalpha/kinto-railway](https://github.com/gridalpha/kinto-railway) | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | kinto | 8888 | HTTP listening port |
| `KINTO_CACHE_URL` | kinto | - | Cache backend connection string |
| `KINTO_ADMIN_USER` | kinto | (secret) | First administrator account name |
| `KINTO_STORAGE_URL` | kinto | - | Objects, permissions and accounts |
| `KINTO_ADMIN_PASSWORD` | kinto | (secret) | First administrator password |
| `KINTO_USERID_HMAC_SECRET` | kinto | (secret) | Derives user IDs, never change |
| `KINTO_DEFAULT_BUCKET_HMAC_SECRET` | kinto | (secret) | Derives personal bucket IDs |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/v1/__heartbeat__`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/kinto)
