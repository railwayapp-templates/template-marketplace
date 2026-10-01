# Deploy Appwrite 2 | Open-Source Firebase Alternative on Railway

Appwrite 2.3 with the new Console, PostgreSQL, VectorsDB and S3 storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appwrite-1)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/appwrite-1?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=appwrite)

[Appwrite](https://appwrite.io/) is an open-source backend-as-a-service: authentication (email, OAuth, magic links, teams), databases, file storage with on-the-fly image transforms, realtime subscriptions, and messaging, all behind one API with SDKs for web, mobile, and server. This template runs **Appwrite 2.3**, the current major version, with the new Console.

Appwrite 2 runs on PostgreSQL by default, keeps usage metrics in ClickHouse, and ships a new Console with a built-in terminal and API explorer. This template follows the upstream default ("combined") layout: the API, the Console, realtime, one worker that serves every queue, and the scheduler, maintenance and interval tasks, plus PostgreSQL, ClickHouse and Redis. A small nginx gateway takes Traefik's place and routes one public domain: `/v1` to the API, `/v1/realtime` to realtime, everything else to the Console. Uploaded files go to a **Railway bucket over S3**, so nothing needs a shared volume. Open your gateway domain once the deploy finishes and create the admin account (the first signup owns the instance).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| appwrite | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /appwrite) | Worker |
| console | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /console) | Worker |
| gateway | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /gateway) | Web service |
| task-scheduler | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /appwrite) | Worker |
| task-maintenance | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /appwrite) | Worker |
| worker | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /appwrite) | Worker |
| task-interval | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /appwrite) | Worker |
| redis | `redis:7.4.7-alpine` | Database |
| postgresql | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /postgresql) | Database |
| realtime | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /appwrite) | Worker |
| clickhouse | [nomideusz/appwrite-railway](https://github.com/nomideusz/appwrite-railway) (root: /clickhouse) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | appwrite | 80 | Port the API listens on. Don't change. |
| `_APP_DOMAIN` | appwrite | - | Wired automatically. Don't change. |
| `_APP_DB_HOST` | appwrite | - | Wired automatically. Don't change. |
| `_APP_DB_PASS` | appwrite | - | Wired automatically. Don't change. |
| `_APP_SMTP_HOST` | appwrite | - | Optional: SMTP host for signup verification, password recovery and invites. Railway's Hobby plan blocks ports 25/465/587, so use a provider port like 2525 (Mailgun, SendGrid) or 2587 (Resend). |
| `_APP_SMTP_PORT` | appwrite | 2525 | Optional: SMTP port. |
| `_APP_REDIS_HOST` | appwrite | - | Wired automatically. Don't change. |
| `_APP_SMTP_SECURE` | appwrite | tls | Optional: tls, ssl, or empty for none. |
| `_APP_SMTP_PASSWORD` | appwrite | (secret) | Optional: SMTP password. |
| `_APP_SMTP_USERNAME` | appwrite | (secret) | Optional: SMTP username. |
| `_APP_CONSOLE_DOMAIN` | appwrite | - | Wired automatically. Don't change. |
| `_APP_OPENSSL_KEY_V1` | appwrite | - | Encryption key for secrets and sessions. Auto-generated. Never change it after deploy: encrypted data becomes unreadable. |
| `_APP_CONSOLE_HOSTNAMES` | appwrite | - | Wired automatically. Don't change. |
| `_APP_DB_HOST_VECTORSDB` | appwrite | - | Wired automatically. Don't change. |
| `_APP_STORAGE_S3_BUCKET` | appwrite | - | Railway bucket credentials. Don't change. |
| `_APP_STORAGE_S3_REGION` | appwrite | - | Railway bucket credentials. Don't change. |
| `_APP_STORAGE_S3_SECRET` | appwrite | (secret) | Railway bucket credentials. Don't change. |
| `_APP_DOMAIN_TARGET_CNAME` | appwrite | - | Wired automatically. Don't change. |
| `_APP_STORAGE_S3_ENDPOINT` | appwrite | - | Railway bucket credentials. Don't change. |
| `_APP_CONNECTIONS_DB_USAGE` | appwrite | - | Wired automatically. Don't change. |
| `_APP_SYSTEM_EMAIL_ADDRESS` | appwrite | - | Optional: sender address for Appwrite emails (must be allowed by your SMTP provider). |
| `_APP_STORAGE_S3_ACCESS_KEY` | appwrite | - | Railway bucket credentials. Don't change. |
| `PORT` | console | 3000 | Port the console listens on. Don't change. |
| `PUBLIC_HOST` | gateway | - | Public domain of your Appwrite. Every service reads it. Using a custom domain? Put it here. |
| `CONSOLE_HOST` | gateway | - | Wired automatically. Don't change. |
| `APPWRITE_HOST` | gateway | - | Wired automatically. Don't change. |
| `REALTIME_HOST` | gateway | - | Wired automatically. Don't change. |
| `_APP_DOMAIN` | task-scheduler | - | Wired automatically. Don't change. |
| `_APP_DB_HOST` | task-scheduler | - | Wired automatically. Don't change. |
| `_APP_DB_PASS` | task-scheduler | - | Wired automatically. Don't change. |
| `_APP_REDIS_HOST` | task-scheduler | - | Wired automatically. Don't change. |
| `_APP_CONSOLE_DOMAIN` | task-scheduler | - | Wired automatically. Don't change. |
| `_APP_OPENSSL_KEY_V1` | task-scheduler | - | Shared from the appwrite service. Don't change. |
| `_APP_CONNECTIONS_DB_USAGE` | task-scheduler | - | Wired automatically. Don't change. |
| `_APP_DOMAIN` | task-maintenance | - | Wired automatically. Don't change. |
| `_APP_DB_HOST` | task-maintenance | - | Wired automatically. Don't change. |
| `_APP_DB_PASS` | task-maintenance | - | Wired automatically. Don't change. |
| `_APP_REDIS_HOST` | task-maintenance | - | Wired automatically. Don't change. |
| `_APP_OPENSSL_KEY_V1` | task-maintenance | - | Shared from the appwrite service. Don't change. |
| `_APP_DOMAIN` | worker | - | Wired automatically. Don't change. |
| `_APP_DB_HOST` | worker | - | Wired automatically. Don't change. |
| `_APP_DB_PASS` | worker | - | Wired automatically. Don't change. |
| `_APP_SMTP_HOST` | worker | - | Shared from the appwrite service. Set SMTP there. |
| `_APP_SMTP_PORT` | worker | - | Shared from the appwrite service. Set SMTP there. |
| `_APP_REDIS_HOST` | worker | - | Wired automatically. Don't change. |
| `_APP_SMTP_SECURE` | worker | - | Shared from the appwrite service. Set SMTP there. |
| `_APP_SMTP_PASSWORD` | worker | (secret) | Shared from the appwrite service. Set SMTP there. |
| `_APP_SMTP_USERNAME` | worker | (secret) | Shared from the appwrite service. Set SMTP there. |
| `_APP_CONSOLE_DOMAIN` | worker | - | Wired automatically. Don't change. |
| `_APP_OPENSSL_KEY_V1` | worker | - | Shared from the appwrite service. Don't change. |
| `_APP_DB_HOST_VECTORSDB` | worker | - | Wired automatically. Don't change. |
| `_APP_STORAGE_S3_BUCKET` | worker | - | Railway bucket credentials. Don't change. |
| `_APP_STORAGE_S3_REGION` | worker | - | Railway bucket credentials. Don't change. |
| `_APP_STORAGE_S3_SECRET` | worker | (secret) | Railway bucket credentials. Don't change. |
| `_APP_DOMAIN_TARGET_CNAME` | worker | - | Wired automatically. Don't change. |
| `_APP_STORAGE_S3_ENDPOINT` | worker | - | Railway bucket credentials. Don't change. |
| `_APP_CONNECTIONS_DB_USAGE` | worker | - | Wired automatically. Don't change. |
| `_APP_SYSTEM_EMAIL_ADDRESS` | worker | - | Shared from the appwrite service. Set SMTP there. |
| `_APP_STORAGE_S3_ACCESS_KEY` | worker | - | Railway bucket credentials. Don't change. |
| `_APP_DOMAIN` | task-interval | - | Wired automatically. Don't change. |
| `_APP_DB_HOST` | task-interval | - | Wired automatically. Don't change. |
| `_APP_DB_PASS` | task-interval | - | Wired automatically. Don't change. |
| `_APP_REDIS_HOST` | task-interval | - | Wired automatically. Don't change. |
| `_APP_OPENSSL_KEY_V1` | task-interval | - | Shared from the appwrite service. Don't change. |
| `POSTGRES_PASSWORD` | postgresql | (secret) | Database password. Auto-generated. |
| `PORT` | realtime | 80 | Port realtime listens on. Don't change. |
| `_APP_DOMAIN` | realtime | - | Wired automatically. Don't change. |
| `_APP_DB_HOST` | realtime | - | Wired automatically. Don't change. |
| `_APP_DB_PASS` | realtime | - | Wired automatically. Don't change. |
| `_APP_REDIS_HOST` | realtime | - | Wired automatically. Don't change. |
| `_APP_OPENSSL_KEY_V1` | realtime | - | Shared from the appwrite service. Don't change. |
| `_APP_CONSOLE_HOSTNAMES` | realtime | - | Wired automatically. Don't change. |
| `_APP_DB_HOST_VECTORSDB` | realtime | - | Wired automatically. Don't change. |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Usage-metrics database password. Auto-generated. |

## Configuration

- **Healthcheck:** `/v1/health/version`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `schedule`
- **Start command:** `maintenance`
- **Start command:** `worker`
- **Start command:** `interval`
- **Start command:** `redis-server --maxmemory 512mb --maxmemory-policy allkeys-lru --maxmemory-samples 5`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `realtime`
- **Volume:** `/var/lib/clickhouse`

**Category:** Other · **Languages:** Dockerfile, Shell, JavaScript

[View on Railway →](https://railway.com/deploy/appwrite-1)
