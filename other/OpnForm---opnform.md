# Deploy OpnForm on Railway

Open-source form builder (Typeform alternative) with PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opnform)

## About

OpnForm is an open-source form builder, an alternative to Typeform, Tally and Google Forms: build forms with a
drag-and-drop editor, share them by link or embed them on your site, and collect and export the responses. This
template deploys a complete self-hosted OpnForm with PostgreSQL and a Redis-compatible cache; your admin account is
created from the email you enter and a generated password, so nobody can claim the instance first. It is a
community-maintained template and is not affiliated with the OpnForm project.

OpnForm is a Laravel API (php-fpm), a Nuxt web app, PostgreSQL and Redis, plus a queue worker and a scheduler.
Here the API, worker, scheduler and an nginx front run in one service (`opnform`, the only public one) so they share
one storage volume for uploads; the Nuxt app, PostgreSQL and Valkey (Redis-compatible) stay on Railway's private
network. Forms and responses live in PostgreSQL on a Railway volume.

Stock self-hosted OpnForm lets the first visitor register and become admin, which is a race on a fresh public URL.
This template creates the first user from your email and a generated password before the app starts listening;
after that OpnForm only accepts new users by invitation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| client | `jhumanj/opnform-client:2.5.0@sha256:8862ee89453fdf10ec1c652b94a2dfb28abd16fe0af1d67e982bcc780dcca68e` | Worker |
| opnform | `ghcr.io/youssefsiam38/opnform-railway:1.0.0@sha256:549cd20a56c8f0f65b137d6363eac37081b0e4fbab6c2aa34af9632c0f035992` | Web service |
| redis | `valkey/valkey:8.1.10-alpine@sha256:081c2f5cb575efc901aa80ff9cdbd1ec6a301682fd35e1ebb4b0990a4a4a8507` | Database |
| db | `postgres:16.15@sha256:65b16a8b326e0cfbdf33fa7e783f2a0cb352a61448616ccccfd616ef42aa0f65` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | client | 3000 | Port the Nuxt client listens on (private). |
| `NUXT_API_SECRET` | client | (secret) | Must equal FRONT_API_SECRET on opnform. |
| `NUXT_PUBLIC_ENV` | client | production | Client environment. |
| `NUXT_PUBLIC_APP_URL` | client | - | Public URL of OpnForm (the opnform service's domain). |
| `NUXT_PUBLIC_API_BASE` | client | - | Public API URL used by browsers (/api on the opnform domain). |
| `NUXT_PRIVATE_API_BASE` | client | - | API URL for server-side rendering, over the private network. |
| `NUXT_PUBLIC_H_CAPTCHA_SITE_KEY` | client | - | Optional. hCaptcha site key for forms with captcha. |
| `PORT` | opnform | 8080 | Port nginx listens on (dual-stack); the public domain targets it. Keep 8080. |
| `APP_KEY` | opnform | - | Laravel encryption key, generated (32 characters). Do not change after first start. |
| `APP_URL` | opnform | - | Public URL of OpnForm. Change it (and FRONT_URL, and the client's NUXT_PUBLIC_*) for a custom domain. |
| `DB_HOST` | opnform | - | The bundled PostgreSQL on Railway's private network. |
| `DB_PORT` | opnform | 5432 | PostgreSQL port. |
| `FRONT_URL` | opnform | - | Public URL of the web app (same origin as APP_URL). |
| `MAIL_HOST` | opnform | - | Optional. SMTP host (with MAIL_MAILER=smtp). |
| `MAIL_PORT` | opnform | - | Optional. SMTP port. |
| `ADMIN_NAME` | opnform | Admin | Display name of the first user. |
| `JWT_SECRET` | opnform | (secret) | Signs login tokens, generated (at least 32 characters). |
| `REDIS_HOST` | opnform | - | The bundled Valkey (Redis-compatible) on Railway's private network: cache, queue, sessions. |
| `REDIS_PORT` | opnform | 6379 | Valkey port. |
| `ADMIN_EMAIL` | opnform | - | Your email. The first OpnForm user (workspace and instance admin) is created with it on the first start. |
| `DB_DATABASE` | opnform | - | Database name, from the db service. |
| `DB_PASSWORD` | opnform | (secret) | Database password, from the db service. |
| `DB_USERNAME` | opnform | (secret) | Database user, from the db service. |
| `MAIL_MAILER` | opnform | log | log writes emails to the logs. Set smtp plus MAIL_* to send real email. |
| `ADMIN_EMAILS` | opnform | - | Comma-separated instance admins (moderation/admin panel). Defaults to ADMIN_EMAIL. |
| `MAIL_PASSWORD` | opnform | (secret) | Optional. SMTP password. |
| `MAIL_USERNAME` | opnform | (secret) | Optional. SMTP user name. |
| `ADMIN_PASSWORD` | opnform | (secret) | The admin's initial password, generated. Copy it to sign in; change it in OpnForm later. |
| `MAIL_FROM_NAME` | opnform | - | Optional. From name for emails. |
| `CLIENT_UPSTREAM` | opnform | - | host:port of the private Nuxt client that nginx proxies non-API pages to. |
| `MAIL_ENCRYPTION` | opnform | - | Optional. tls or ssl. |
| `OPEN_AI_API_KEY` | opnform | (secret) | Optional. Enables AI form generation. |
| `FRONT_API_SECRET` | opnform | (secret) | Shared secret for the client's server-side API calls, generated. |
| `MAIL_FROM_ADDRESS` | opnform | - | Optional. From address for emails. |
| `H_CAPTCHA_SITE_KEY` | opnform | - | Optional. hCaptcha site key (also set NUXT_PUBLIC_H_CAPTCHA_SITE_KEY on client). |
| `H_CAPTCHA_SECRET_KEY` | opnform | (secret) | Optional. hCaptcha secret key. |
| `JWT_SKIP_IP_UA_VALIDATION` | opnform | false | false keeps login tokens bound to the browser's User-Agent (upstream default). |
| `OPNFORM_ANONYMOUS_TELEMETRY_DISABLED` | opnform | - | Optional. true opts out of upstream's anonymous usage statistics. |
| `POSTGRES_DB` | db | opnform | PostgreSQL database. |
| `POSTGRES_USER` | db | (secret) | PostgreSQL user. |
| `POSTGRES_PASSWORD` | db | (secret) | PostgreSQL password, generated. |

## Configuration

- **Healthcheck:** `/api/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/share/nginx/html/storage`
- **Start command:** `valkey-server --appendonly yes --protected-mode no`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/opnform)
