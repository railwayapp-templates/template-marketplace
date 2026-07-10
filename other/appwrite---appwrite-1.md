# Deploy appwrite on Railway

Open-source Firebase alternative: auth, databases, storage, realtime.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appwrite-1)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/appwrite-1?utm_medium=integration&utm_source=button&utm_campaign=appwrite)

[Appwrite](https://appwrite.io/) is an open-source backend-as-a-service: authentication (email, OAuth, magic links, teams), databases, file storage with on-the-fly image transforms, realtime subscriptions, and messaging — all behind one API with SDKs for web, mobile, and server.

Appwrite 1.9 is a genuinely multi-service stack — API, console, realtime, MongoDB (primary), PostgreSQL (vectors), Redis, and a fleet of background workers. This template decomposes it into 13 Railway services wired over private networking, replacing the stock Traefik ingress with a small nginx gateway that replicates its routing (`/v1/realtime` → realtime, `/console` → console, everything else → API). MongoDB runs as a single-node replica set on a Railway volume (member on loopback so redeploys never lose the primary), and file storage goes to a **Railway bucket over S3** — no shared-volume juggling. First boot initializes the databases in about a minute; then open your gateway domain and create the admin account (first signup owns the instance).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| appwrite | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /appwrite) | Worker |
| console | `appwrite/console:8` | Worker |
| worker-webhooks | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /worker-webhooks) | Worker |
| gateway | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /gateway) | Web service |
| worker-mails | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /worker-mails) | Worker |
| task-maintenance | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /task-maintenance) | Worker |
| worker-audits | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /worker-audits) | Worker |
| mongodb | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /mongodb) | Database |
| worker-databases | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /worker-databases) | Worker |
| redis | `redis:7-alpine` | Database |
| postgresql | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /postgresql) | Database |
| realtime | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /realtime) | Worker |
| worker-deletes | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /worker-deletes) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | appwrite | 80 | Port the service listens on and the healthcheck probes. Don't change. |
| `_APP_DOMAIN` | appwrite | - | Wired to the gateway's public domain. Don't change. |
| `_APP_DB_HOST` | appwrite | - | Wired automatically to the mongodb service. Don't change. |
| `_APP_DB_PASS` | appwrite | - | Wired automatically to the mongodb service. Don't change. |
| `_APP_REDIS_HOST` | appwrite | - | Wired automatically to the redis service. Don't change. |
| `_APP_CONSOLE_DOMAIN` | appwrite | - | Wired to the gateway's public domain. Don't change. |
| `_APP_OPENSSL_KEY_V1` | appwrite | - | Encryption key for stored secrets and sessions. Auto-generated. Never change it after deploy — existing encrypted data becomes unreadable. |
| `_APP_CONSOLE_HOSTNAMES` | appwrite | - | Wired to the gateway's public domain. Don't change. |
| `_APP_DB_HOST_VECTORSDB` | appwrite | - | Wired automatically to the postgresql service. Don't change. |
| `_APP_DB_PASS_VECTORSDB` | appwrite | - | Wired automatically to the postgresql service. Don't change. |
| `_APP_STORAGE_S3_BUCKET` | appwrite | - | S3 credentials from the bundled Railway bucket. Don't change. |
| `_APP_STORAGE_S3_REGION` | appwrite | - | S3 credentials from the bundled Railway bucket. Don't change. |
| `_APP_STORAGE_S3_SECRET` | appwrite | (secret) | S3 credentials from the bundled Railway bucket. Don't change. |
| `_APP_DB_HOST_DOCUMENTSDB` | appwrite | - | Wired automatically to the mongodb service. Don't change. |
| `_APP_DOMAIN_TARGET_CNAME` | appwrite | - | Wired to the gateway's public domain. Don't change. |
| `_APP_STORAGE_S3_ENDPOINT` | appwrite | - | S3 credentials from the bundled Railway bucket. Don't change. |
| `_APP_STORAGE_S3_ACCESS_KEY` | appwrite | - | S3 credentials from the bundled Railway bucket. Don't change. |
| `_APP_DOMAIN` | worker-webhooks | - | Public domain from the gateway service — wired automatically. Don't change. |
| `_APP_DB_HOST` | worker-webhooks | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_DB_PASS` | worker-webhooks | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_REDIS_HOST` | worker-webhooks | - | Redis connection — wired automatically. Don't change. |
| `_APP_OPENSSL_KEY_V1` | worker-webhooks | - | Shared from the appwrite service. Don't change. |
| `_APP_DB_HOST_VECTORSDB` | worker-webhooks | - | PostgreSQL connection — wired automatically. Don't change. |
| `_APP_DB_PASS_VECTORSDB` | worker-webhooks | - | PostgreSQL connection — wired automatically. Don't change. |
| `_APP_DB_HOST_DOCUMENTSDB` | worker-webhooks | - | MongoDB connection — wired automatically. Don't change. |
| `PUBLIC_HOST` | gateway | - | The gateway's own public domain, referenced by other services. Don't change. |
| `CONSOLE_HOST` | gateway | - | Private hostname of the API / console / realtime service. Don't change. |
| `APPWRITE_HOST` | gateway | - | Private hostname of the API / console / realtime service. Don't change. |
| `REALTIME_HOST` | gateway | - | Private hostname of the API / console / realtime service. Don't change. |
| `_APP_DOMAIN` | worker-mails | - | Public domain from the gateway service — wired automatically. Don't change. |
| `_APP_DB_HOST` | worker-mails | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_DB_PASS` | worker-mails | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_REDIS_HOST` | worker-mails | - | Redis connection — wired automatically. Don't change. |
| `_APP_OPENSSL_KEY_V1` | worker-mails | - | Shared from the appwrite service. Don't change. |
| `_APP_DB_HOST_VECTORSDB` | worker-mails | - | PostgreSQL connection — wired automatically. Don't change. |
| `_APP_DB_PASS_VECTORSDB` | worker-mails | - | PostgreSQL connection — wired automatically. Don't change. |
| `_APP_DB_HOST_DOCUMENTSDB` | worker-mails | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_DB_HOST` | task-maintenance | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_DB_PASS` | task-maintenance | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_REDIS_HOST` | task-maintenance | - | Redis connection — wired automatically. Don't change. |
| `_APP_OPENSSL_KEY_V1` | task-maintenance | - | Shared from the appwrite service. Don't change. |
| `_APP_DB_HOST_VECTORSDB` | task-maintenance | - | PostgreSQL connection — wired automatically. Don't change. |
| `_APP_DB_PASS_VECTORSDB` | task-maintenance | - | PostgreSQL connection — wired automatically. Don't change. |
| `_APP_DOMAIN` | worker-audits | - | Public domain from the gateway service — wired automatically. Don't change. |
| `_APP_DB_HOST` | worker-audits | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_DB_PASS` | worker-audits | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_REDIS_HOST` | worker-audits | - | Redis connection — wired automatically. Don't change. |
| `_APP_OPENSSL_KEY_V1` | worker-audits | - | Shared from the appwrite service. Don't change. |
| `_APP_DB_HOST_VECTORSDB` | worker-audits | - | PostgreSQL connection — wired automatically. Don't change. |
| `_APP_DB_PASS_VECTORSDB` | worker-audits | - | PostgreSQL connection — wired automatically. Don't change. |
| `_APP_DB_HOST_DOCUMENTSDB` | worker-audits | - | MongoDB connection — wired automatically. Don't change. |
| `MONGO_INITDB_PASSWORD` | mongodb | (secret) | Password for the Appwrite database user. Auto-generated — no need to change. |
| `MONGO_INITDB_ROOT_PASSWORD` | mongodb | (secret) | MongoDB root password. Auto-generated — no need to change. |
| `_APP_DOMAIN` | worker-databases | - | Public domain from the gateway service — wired automatically. Don't change. |
| `_APP_DB_HOST` | worker-databases | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_DB_PASS` | worker-databases | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_REDIS_HOST` | worker-databases | - | Redis connection — wired automatically. Don't change. |
| `_APP_OPENSSL_KEY_V1` | worker-databases | - | Shared from the appwrite service. Don't change. |
| `_APP_DB_HOST_VECTORSDB` | worker-databases | - | PostgreSQL connection — wired automatically. Don't change. |
| `_APP_DB_PASS_VECTORSDB` | worker-databases | - | PostgreSQL connection — wired automatically. Don't change. |
| `_APP_DB_HOST_DOCUMENTSDB` | worker-databases | - | MongoDB connection — wired automatically. Don't change. |
| `POSTGRES_PASSWORD` | postgresql | (secret) | PostgreSQL password (vectors database). Auto-generated — no need to change. |
| `PORT` | realtime | 80 | Port the service listens on and the healthcheck probes. Don't change. |
| `_APP_DOMAIN` | realtime | - | Public domain from the gateway service — wired automatically. Don't change. |
| `_APP_DB_HOST` | realtime | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_DB_PASS` | realtime | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_REDIS_HOST` | realtime | - | Redis connection — wired automatically. Don't change. |
| `_APP_OPENSSL_KEY_V1` | realtime | - | Shared from the appwrite service. Don't change. |
| `_APP_DB_HOST_VECTORSDB` | realtime | - |  PostgreSQL connection — wired automatically. Don't change. |
| `_APP_DB_PASS_VECTORSDB` | realtime | - |  PostgreSQL connection — wired automatically. Don't change. |
| `_APP_DB_HOST_DOCUMENTSDB` | realtime | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_DOMAIN` | worker-deletes | - | Public domain from the gateway service — wired automatically. Don't change. |
| `_APP_DB_HOST` | worker-deletes | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_DB_PASS` | worker-deletes | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_REDIS_HOST` | worker-deletes | - | Redis connection — wired automatically. Don't change. |
| `_APP_OPENSSL_KEY_V1` | worker-deletes | - | Shared from the appwrite service. Don't change. |
| `_APP_DB_HOST_VECTORSDB` | worker-deletes | - | PostgreSQL connection — wired automatically. Don't change. |
| `_APP_DB_PASS_VECTORSDB` | worker-deletes | - | PostgreSQL connection — wired automatically. Don't change. |
| `_APP_STORAGE_S3_BUCKET` | worker-deletes | - | S3 credentials from the bundled Railway bucket. Don't change. |
| `_APP_STORAGE_S3_REGION` | worker-deletes | - | S3 credentials from the bundled Railway bucket. Don't change. |
| `_APP_STORAGE_S3_SECRET` | worker-deletes | (secret) | S3 credentials from the bundled Railway bucket. Don't change. |
| `_APP_DB_HOST_DOCUMENTSDB` | worker-deletes | - | MongoDB connection — wired automatically. Don't change. |
| `_APP_STORAGE_S3_ENDPOINT` | worker-deletes | - | S3 credentials from the bundled Railway bucket. Don't change. |
| `_APP_STORAGE_S3_ACCESS_KEY` | worker-deletes | - | S3 credentials from the bundled Railway bucket. Don't change. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `redis-server --maxmemory 512mb --maxmemory-policy allkeys-lru --maxmemory-samples 5`
- **Volume:** `/var/lib/postgresql/18/data`

**Category:** Other · **Languages:** Dockerfile, Shell, JavaScript

[View on Railway →](https://railway.com/deploy/appwrite-1)
