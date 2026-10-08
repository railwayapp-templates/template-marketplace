# Deploy WYGIWYH on Railway

Self-hosted multi-currency personal finance tracker with PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wygiwyh)

## About

WYGIWYH ("What You Get Is What You Have") is an open-source, self-hosted personal finance tracker built around a
simple rule: spend what you earn this month, and treat savings as untouchable. It tracks income and expenses across
many accounts and currencies, with monthly and yearly overviews, net worth, rules, a DCA tracker and a REST API.
This template deploys it ready for the internet: your admin account is created from the email you enter and a
generated password, and there is no public sign-up. It is a community-maintained template and is not affiliated
with the WYGIWYH project.

WYGIWYH is a Django app. The official image runs gunicorn and a procrastinate background worker (recurring
transactions, automatic exchange rates, cleanup) in one container, backed by PostgreSQL. This template deploys that
image unmodified as one public `web` service plus a private PostgreSQL 15 with its own volume; transaction
attachments are kept on a volume on `web`.

Running Django behind Railway's HTTPS proxy needs a few settings to line up, and they are all wired for you: the
trusted CSRF origin and allowed hosts follow your Railway domain (including Railway's health-check host), the
session cookie is Secure and the proxy's HTTPS header is trusted, and the secret key is generated. Railway mounts
volumes as root while the image runs as a non-root user, so the start command hands the attachments volume to that
user before starting the image's own process manager; the app never runs as root.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `eitchtee/wygiwyh:0.23.2@sha256:64b02913916b60df21dcb70a7d44d98c20d8d5e46690e0ea5cad2d3e828bbd2b` | Web service |
| db | `postgres:15.19-bookworm@sha256:d4a8e1f88f475ee3e0137fa89d21ebc59f6c6ab16bf369ee92907607cc3455ae` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | web | UTC | Time zone for scheduled background tasks. |
| `URL` | web | - | Public URL(s), space-separated; used as Django's CSRF trusted origins. Add a custom domain here. |
| `PORT` | web | 8000 | Port Railway routes to and health-checks. Keep it equal to INTERNAL_PORT. |
| `DEBUG` | web | false | Django debug mode. Keep false. |
| `SQL_HOST` | web | - | The bundled PostgreSQL on Railway's private network. |
| `SQL_PORT` | web | 5432 | PostgreSQL port. |
| `SQL_USER` | web | (secret) | Database user, from the db service. |
| `SECRET_KEY` | web | (secret) | Django secret key, generated. Changing it signs everyone out. |
| `ADMIN_EMAIL` | web | - | Your email. The admin account is created with it on the first start; you sign in with it. |
| `SQL_DATABASE` | web | - | Database name, from the db service. |
| `SQL_PASSWORD` | web | (secret) | Database password, from the db service. |
| `TASK_WORKERS` | web | 1 | Number of background (procrastinate) worker processes. |
| `HTTPS_ENABLED` | web | true | true: Secure session cookie and trust Railway's X-Forwarded-Proto header. |
| `INTERNAL_PORT` | web | 8000 | Port gunicorn listens on. |
| `ADMIN_PASSWORD` | web | (secret) | The admin's initial password, generated. Copy it to sign in; change it in WYGIWYH later. |
| `OIDC_CLIENT_ID` | web | - | Optional. OIDC client id (with OIDC_CLIENT_SECRET and OIDC_SERVER_URL enables single sign-on). |
| `OIDC_SERVER_URL` | web | - | Optional. OIDC issuer URL. |
| `WEB_CONCURRENCY` | web | 2 | Number of gunicorn worker processes. |
| `OIDC_CLIENT_NAME` | web | - | Optional. Name shown on the OIDC login button. |
| `OIDC_ALLOW_SIGNUP` | web | - | Optional. Upstream default true lets anyone at your OIDC provider get an account; set false to restrict. |
| `ENABLE_SOFT_DELETE` | web | - | Optional. true keeps deleted transactions in the database. |
| `OIDC_CLIENT_SECRET` | web | (secret) | Optional. OIDC client secret. |
| `DJANGO_ALLOWED_HOSTS` | web | - | Host names Django answers, space-separated. Keep healthcheck.railway.app for Railway's health check. |
| `KEEP_DELETED_ENTRIES_FOR` | web | - | Optional. Days to keep soft-deleted transactions (default 365, 0 keeps all). |
| `POSTGRES_DB` | db | wygiwyh | PostgreSQL database. |
| `POSTGRES_USER` | db | (secret) | PostgreSQL user. |
| `POSTGRES_PASSWORD` | db | (secret) | PostgreSQL password, generated. |

## Configuration

- **Start command:** `sh -c 'chown -R app:app /usr/src/app/attachments && exec /start-single'`
- **Healthcheck:** `/login/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/app/attachments`
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wygiwyh)
