# Deploy GlitchTip on Railway

Simple, open source error tracking with Sentry SDK

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/AMx6AD)

## About

<h1>GlitchTip</h1>

Collect every error from your project in real time, organize them to make them useful, and receive alerts when and where you want...without breaking the budget.


<h1>Have some bugs in your code?</h1>

<div align="center">
<img src="https://glitchtip.com/assets/home/issues-page@2x.webp" align="center">
</div>

<p>
GlitchTip makes monitoring software easy. Track errors, monitor performance, and check site uptime all in one place. Compatible with Sentry client SDKs, but easier to run.

It's also open source, so you can view, modify, and use the code as you see fit.

GlitchTip is the right choice if you value simplicity, affordability, and the freedom provided by open source.
</p>

<h1>Resources</h1>

- [Should I choose GlitchTip? (Reddit)](https://www.reddit.com/r/learnjavascript/comments/10u59gl/is_glitchtip_any_good/)
- [GlitchTip Organization](https://gitlab.com/glitchtip)
- [GlitchTip Website](https://glitchtip.com/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:15` | Database |
| glitchtip-web | `glitchtip/glitchtip:latest` | Web service |
| Redis | `bitnami/redis` | Database |
| glitchtip-worker | `glitchtip/glitchtip:latest` | Worker |

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
| `CELERY_WORKER_CONCURRENCY` | glitchtip-worker | 2 | Choose 2 for recommended value or 1 for reduced memory usage. |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "sleep 10 && ./manage.py migrate && ./bin/start.sh"`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`
- **Start command:** `/bin/sh -c "sleep 10 && ./manage.py migrate && ./bin/run-celery-with-beat.sh"`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/AMx6AD)
