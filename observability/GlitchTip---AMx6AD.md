# Deploy GlitchTip on Railway

Sentry-compatible open source error tracking with PostgreSQL and Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/AMx6AD)

## About

GlitchTip is open source error tracking that speaks the Sentry protocol: point any Sentry SDK at its DSN and you get grouped issues, stack traces, releases, performance data and uptime checks, without per-event pricing. This template deploys GlitchTip with PostgreSQL and Redis, generates the secret key, sets the domain, and closes public signup after the first account is created.

![GlitchTip issues page listing grouped errors with counts and last seen times](https://glitchtip.com/assets/home/issues-page@2x.webp)

GlitchTip is a Django application. It needs PostgreSQL 14 or newer for issues, events and users, and it can use Redis (or Valkey) for caching and its task queue. The template provides both on Railway volumes and connects them over the private network.

The **glitchtip-web** service runs the official `glitchtip/glitchtip` image, applies database migrations on start, serves the dashboard and the event ingestion endpoints on a public domain, and has a health check on `/login` so traffic only reaches a deploy that is up. `SECRET_KEY` is generated at deploy time, `GLITCHTIP_DOMAIN` is set to the service's public URL so DSNs and email links are correct, and `ENABLE_USER_REGISTRATION=false` means the first person to open the site registers and every later signup is refused. Email is optional: leave `EMAIL_URL` empty and GlitchTip skips email verification; fill it with an SMTP URL later to get alert emails.

Recent GlitchTip releases run the task worker inside the web process, so the template is those three services and nothing else.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:15` | Database |
| glitchtip-web | `glitchtip/glitchtip:latest` | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `PGHOST_PRIVATE` | Postgres | - | Private host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private database URL |
| `EMAIL_URL` | glitchtip-web | - | Leaving the SMTP URI field blank is possible but not recommended, as it may cause unexpected errors. For example, when registering a user, an error may be thrown, but the user is still created in the system. |
| `SECRET_KEY` | glitchtip-web | (secret) | Random secret |
| `GLITCHTIP_DOMAIN` | glitchtip-web | - | The domain you'll be using to access the application |
| `DEFAULT_FROM_EMAIL` | glitchtip-web | - | Email which will be used to send emails. Follows the same issues as SMTP_URI's description |
| `ENABLE_USER_REGISTRATION` | glitchtip-web | false | Allow public signup after first signup |
| `REDISHOST` | Redis | - | Railway Public Domain Name |
| `REDISPORT` | Redis | - | Port to connect to Redis |
| `REDISUSER` | Redis | default | Default user to connect to Redis |
| `REDIS_URL` | Redis | - | URL to connect to Redis |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis |
| `REDISHOST_PRIVATE` | Redis | - | Private domain |
| `REDISPORT_PRIVATE` | Redis | 6379 | Private port |
| `REDIS_PRIVATE_URL` | Redis | - | Private URL |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "sleep 10 && ./manage.py migrate && ./bin/start.sh"`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/AMx6AD)
