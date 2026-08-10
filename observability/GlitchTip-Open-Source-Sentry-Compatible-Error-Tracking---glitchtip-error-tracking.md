# Deploy GlitchTip | Open Source Sentry-Compatible Error Tracking on Railway

Sentry-compatible error tracking. No S3 to set up, private-network ingest

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/glitchtip-error-tracking)

## About

GlitchTip is open-source error tracking that speaks Sentry's protocol. Every Sentry SDK — Python, JavaScript, Go, Ruby, PHP, Java, .NET — points at it by changing one DSN string, and you get the same grouped issues, stack traces, breadcrumbs, releases and alerts, on infrastructure you own.

This template runs the official `glitchtip/glitchtip` image on a fully pinned release, with PostgreSQL 18 for storage, Redis as the task broker, and a Railway volume for uploaded artifacts. Nothing is rebuilt or forked.

Three things here differ from the other GlitchTip deployments on Railway.

**The version is pinned in full.** The official template tracks the `6` tag with patch auto-updates, which means an upstream release lands on a running project on its own schedule. Here the tag is `6.2.6` and it moves when you decide it moves.

**There is no object storage to configure.** Source maps, avatars and event attachments go on a Railway volume instead of an S3 bucket, which removes a service and four AWS credentials from the first-run screen. Everything else about the deployment is identical.

**Your apps can report over the private network.** The web server binds the IPv6 wildcard rather than the IPv4-only default, so an app running in the same Railway project sends its events to `glitchtip.railway.internal:8000` — no public round trip, no egress charge, no TLS handshake per event. Apps outside the project use the public domain exactly as usual.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.10.0-alpine` | Database |
| Postgres | `postgres:18.4-alpine` | Database |
| GlitchTip | `glitchtip/glitchtip:6.2.6` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Redis | 6379 | Port Redis listens on. Reachable only inside this project's private network. |
| `PORT` | Postgres | 5432 | Port Postgres listens on. |
| `POSTGRES_DB` | Postgres | glitchtip | Database created on first boot; GlitchTip runs its migrations here. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser GlitchTip connects as. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated once. The alphabet is alphanumeric on purpose: the default character set can emit / or @, either of which breaks the connection URL it is substituted into. |
| `PORT` | GlitchTip | 8000 | Port the web server listens on. |
| `EMAIL_URL` | GlitchTip | consolemail:// | Where mail goes. The default writes it to the deploy log, so invitations and alerts are visible rather than silently lost. Set an SMTP URL such as smtp://user:pass@host:587 to actually send it. |
| `REDIS_URL` | GlitchTip | - | Same broker under the name older GlitchTip releases read. Keep the two in sync. |
| `SECRET_KEY` | GlitchTip | (secret) | Django signing key: sessions, password-reset links, CSRF. Generated once per deployment. Changing it logs everyone out. |
| `VALKEY_URL` | GlitchTip | - | Celery broker. Tasks here are all re-derivable from Postgres, so nothing is lost if Redis restarts. |
| `DATABASE_URL` | GlitchTip | - | Where issues, events, users and organizations are stored, over the private network. |
| `ENABLE_ADMIN` | GlitchTip | False | Django admin interface. Off by default; it is a second, much broader way into the same data. |
| `GRANIAN_HOST` | GlitchTip | :: | Address the web server binds. The IPv6 wildcard is what makes glitchtip.railway.internal reachable, so apps in this project can report errors over the private network instead of the public domain. Granian's own default, 0.0.0.0, answers only the public domain. |
| `ENABLE_OPENAPI` | GlitchTip | False | Publicly served API schema and docs page. Off by default. |
| `GRANIAN_WORKERS` | GlitchTip | 1 | Web worker processes. Raise it if the UI is slow while events are being ingested; each one costs memory. |
| `GLITCHTIP_DOMAIN` | GlitchTip | - | Public URL of this deployment. It goes into every DSN you copy into an application, so it must include the scheme — without it the DSN your SDK gets is unusable. |
| `DEFAULT_FROM_EMAIL` | GlitchTip | glitchtip@example.com | From address on invitations and alert emails. |
| `GLITCHTIP_EMBED_WORKER` | GlitchTip | true | Runs the background worker inside the web container. Turn it off only if you add a separate worker service, otherwise events are accepted and never processed. |
| `ENABLE_USER_REGISTRATION` | GlitchTip | False | After the first account is created, signup is closed — otherwise anyone who finds the URL can register in your error tracker. Register your own account as soon as the deployment is green. |
| `ENABLE_ORGANIZATION_CREATION` | GlitchTip | False | Stops non-owner users from creating additional organizations. The first owner can still create their own. |
| `GLITCHTIP_MAX_EVENT_LIFE_DAYS` | GlitchTip | 90 | How long events are kept before deletion. This is the main lever on database size — events grow with error volume, not with UI traffic. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/_health/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/code/uploads`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/glitchtip-error-tracking)
