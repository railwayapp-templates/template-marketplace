# Deploy Deploy and Host Hi.Events — Event Ticketing on Railway on Railway

Self-host event ticketing with Stripe. No per-ticket fees. Own your data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hi-events-ticketing)

## About

![Hi.Events self-hosted event ticketing platform](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777643801/495786ae-27b2-44a7-81d3-c0d75fbdea18.png)

Hi.Events is an open-source event management and ticketing platform with **3.6k+ GitHub
stars** — Stripe payments, QR code check-in, embeddable ticket widget, custom event pages,
promo codes, waitlists, attendee messaging, and a full REST API, all self-hosted with zero
per-ticket platform fees.

Eventbrite charges **6.5% + $1.79 per ticket**. On a 200-person $50 event that's $1,008 in
platform fees — every single time. Hi.Events on Railway costs ~$10–15/month flat regardless
of how many events you run or tickets you sell. Your revenue. Your attendee data. Your
platform.

---

Running Hi.Events in production requires coordinating a PHP/Laravel application, PostgreSQL
database, Redis queue, and a task scheduler — all behind HTTPS with Stripe webhook endpoints
for payment processing. Without a managed host, you're configuring Docker Compose, inter-
service networking, SSL, queue workers, and cron jobs manually.

Railway provisions all of it — private networking, HTTPS, and a public domain ready to
receive Stripe webhooks and serve ticket buyers immediately after deploy.

Typical cost: **~$10–15/month** on Railway's Hobby plan for the full four-service stack.
Eventbrite charges 6.5% + $1.79 per paid ticket — for a 500-ticket $30 event that's $1,345
in fees per event. Hi.Events on Railway eliminates per-ticket platform fees entirely. You
pay Railway compute and Stripe's standard processing fee (2.9% + $0.30) — nothing more.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Hi-Events | `daveearley/hi.events-all-in-one:v1.9.0-beta` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | Hi-Events | 80 | - |
| `APP_ENV` | Hi-Events | production | - |
| `APP_DEBUG` | Hi-Events | false | - |
| `APP_LOCALE` | Hi-Events | en | - |
| `JWT_SECRET` | Hi-Events | (secret) | - |
| `LOG_CHANNEL` | Hi-Events | stderr | - |
| `MAIL_MAILER` | Hi-Events | log | - |
| `CACHE_DRIVER` | Hi-Events | redis | - |
| `DB_CONNECTION` | Hi-Events | pgsql | - |
| `MAIL_FROM_NAME` | Hi-Events | Hi.Events | - |
| `REDIS_PASSWORD` | Hi-Events | (secret) | - |
| `SESSION_DRIVER` | Hi-Events | redis | - |
| `QUEUE_CONNECTION` | Hi-Events | redis | - |
| `MAIL_FROM_ADDRESS` | Hi-Events | noreply@hi.events | - |
| `VITE_API_URL_SERVER` | Hi-Events | http://localhost:80/api | - |
| `CORS_ALLOWED_ORIGINS` | Hi-Events | * | - |
| `APP_SAAS_MODE_ENABLED` | Hi-Events | false | - |
| `FILESYSTEM_PUBLIC_DISK` | Hi-Events | public | - |
| `FILESYSTEM_PRIVATE_DISK` | Hi-Events | local | - |
| `APP_DISABLE_REGISTRATION` | Hi-Events | false | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Volume:** `/app/backend/storage`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/hi-events-ticketing)
