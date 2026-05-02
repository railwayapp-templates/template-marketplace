# Deploy Pretix | Open Source Ticket Management, Eventbrite Alternative on Railway

Self Host Pretix. Ticketing platform with seating plans, payments, check-in

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pretix)

## About

Deploy Pretix on Railway to run your own fully featured event ticketing platform. Self-host Pretix and take full control of ticket sales, check-ins, seating plans, and attendee data — without per-ticket fees eating into your margins.

This Railway template pre-configures Pretix with PostgreSQL for persistent storage, Redis for caching, sessions, and Celery task processing, plus an admin account ready to go. The standalone Docker image bundles nginx, gunicorn, Celery workers, and cron into a single container managed by supervisord.

![Pretix Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777647671/7b530482-29f7-4391-93f6-404c74b12444.png)

Pretix is an open-source event ticketing platform built with Python and Django, developed since 2014 by a team of 28. It handles the full ticketing lifecycle — from online shops and box office sales to on-site check-in with mobile scanning apps.

Key features of self-hosted Pretix:

- **Interactive seating plans** with a graphical editor for venues of any size
- **30+ payment gateways** including Stripe, PayPal, Mollie, and bank transfer
- **Multi-language and multi-currency** support for international events
- **Plugin architecture** for extending functionality with custom Python/Django plugins
- **REST API and webhooks** for programmatic integration and automation
- **Embeddable ticket widget** to sell directly from your own website
- **Waiting lists** with automated re-allocation when tickets free up
- **Flexible products** — add-ons, bundles, vouchers, quotas, memberships

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pretix | `pretix/standalone:stable` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Pretix | 80 | Railway routing port |
| `AUTOMIGRATE` | Pretix | skip | Skip auto-migration (handled in startCommand) |
| `NUM_WORKERS` | Pretix | 2 | Gunicorn worker count |
| `PRETIX_MAIL_FROM` | Pretix | tickets@example.com | Sender email for notifications |
| `PRETIX_PRETIX_URL` | Pretix | - | Public-facing URL with HTTPS |
| `PRETIX_ADMIN_EMAIL` | Pretix | - | Initial admin account email |
| `PRETIX_CELERY_BROKER` | Pretix | - | Celery task broker URL |
| `PRETIX_DATABASE_HOST` | Pretix | - | PostgreSQL internal host |
| `PRETIX_DATABASE_NAME` | Pretix | - | PostgreSQL database name |
| `PRETIX_DATABASE_PORT` | Pretix | - | PostgreSQL port |
| `PRETIX_DATABASE_USER` | Pretix | (secret) | PostgreSQL username |
| `PRETIX_DJANGO_SECRET` | Pretix | (secret) | Django session signing and CSRF key |
| `PRETIX_ADMIN_PASSWORD` | Pretix | (secret) | Initial admin password (bootstrap-only) |
| `PRETIX_CELERY_BACKEND` | Pretix | - | Celery result backend URL |
| `PRETIX_LOCALE_DEFAULT` | Pretix | en | Default locale |
| `PRETIX_PRETIX_DATADIR` | Pretix | /data | Persistent data directory |
| `PRETIX_REDIS_LOCATION` | Pretix | - | Redis cache and sessions URL |
| `PRETIX_REDIS_SESSIONS` | Pretix | true | Store sessions in Redis |
| `PRETIX_LOCALE_TIMEZONE` | Pretix | UTC | Default timezone |
| `PRETIX_PRETIX_CURRENCY` | Pretix | USD | Default currency code |
| `PRETIX_DATABASE_BACKEND` | Pretix | postgresql | Database backend type |
| `PRETIX_DATABASE_PASSWORD` | Pretix | (secret) | PostgreSQL password |
| `PRETIX_PRETIX_REGISTRATION` | Pretix | off | Disable public organizer registration |
| `PRETIX_PRETIX_INSTANCE_NAME` | Pretix | Pretix | Display name for the instance |
| `PRETIX_PRETIX_TRUST_X_FORWARDED_FOR` | Pretix | on | Trust proxy X-Forwarded-For header |
| `PRETIX_PRETIX_TRUST_X_FORWARDED_PROTO` | Pretix | on | Trust proxy X-Forwarded-Proto header |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /data/logs /data/media && chmod -R 777 /data && pretix migrate --noinput && pretix collectstatic --noinput && chmod -R o+rX /pretix/ && DJANGO_SUPERUSER_EMAIL=$PRETIX_ADMIN_EMAIL DJANGO_SUPERUSER_PASSWORD=$PRETIX_ADMIN_PASSWORD python3 -m pretix createsuperuser --noinput 2>/dev/null; exec pretix all'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pretix)
