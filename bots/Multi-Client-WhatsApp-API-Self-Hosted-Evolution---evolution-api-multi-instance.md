# Deploy Multi-Client WhatsApp API — Self-Hosted Evolution on Railway

Run many WhatsApp numbers from one Evolution API — per-instance keys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-multi-instance)

## About

Evolution API turns WhatsApp numbers into REST endpoints, and one deployment runs many of them. Each client, brand or region is its own instance with its own QR login, webhook target and API key — no Meta verification, no per-message billing. This template deploys it with Postgres, Redis and a session volume, configured for the case quickstarts skip: more than one number on one box.

Running one number is straightforward. Running twenty for twenty clients changes which mistakes matter, and the defaults are built for one.

**Instances share a deployment, not an isolation boundary.** `AUTHENTICATION_API_KEY` is global: it authenticates every request to every instance on the box. Hand it to a client so they can integrate and you have given them the ability to read, send from and delete every other client's number. Generate a per-instance key for each, and keep the global key for administration only. That one decision separates a usable multi-tenant deployment from a liability.

**Memory scales with connected numbers, not traffic.** Each instance holds an open socket and its session state inside the same Node process. A deployment sized for one number falls over at ten, and the symptom is instances dropping offline rather than an obvious out-of-memory error. Budget per number.

**One volume means one service, so no horizontal scaling.** Session directories live on a Railway volume, and a volume attaches to one service — replicas cannot share them. Growth is a bigger box, not more boxes; plan the ceiling before you sell past it.

**`DEL_INSTANCE` can delete a client while you are not looking.** Set to a number of minutes, it removes instances disconnected that long. Tidy on a single-user box; on an agency box it destroys a client's session because their phone was off, and reconnecting means a fresh QR scan with them on the line. Set it to `false`.

**Every instance needs its own webhook target.** Inbound messages are useless if twenty clients' events land on one endpoint. Configure the webhook per instance at creation, subscribing only to events you consume.

**One deployment, one reputation.** Numbers are banned individually, so one client's bulk sending does not take the others down directly — but they share your server and egress address, and patterns across numbers are visible. Agree in writing what clients may send, because you cannot enforce it technically from here.

Typical cost: **~$15–30/month** for the API, Postgres and Redis at a handful of numbers, on rates of $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes. Memory dominates, and it rises with each connected number.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Evolution API | `evoapicloud/evolution-api:latest` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Evolution API | 8080 | PORT |
| `SERVER_URL` | Evolution API | - | SERVER URL |
| `CACHE_REDIS_URI` | Evolution API | - | Redis connection URI |
| `DATABASE_PROVIDER` | Evolution API | postgresql | Database provider |
| `CACHE_REDIS_ENABLED` | Evolution API | true | Redis cache enabled |
| `AUTHENTICATION_API_KEY` | Evolution API | (secret) | Required: API key for authentication (use in header: apikey) |
| `DATABASE_CONNECTION_URI` | Evolution API | - | Database connection URI |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/evolution-api-multi-instance)
