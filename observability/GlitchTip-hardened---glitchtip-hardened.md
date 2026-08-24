# Deploy GlitchTip (hardened) on Railway

Self-hosted error tracking, Sentry SDK compatible. Embedded worker.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/glitchtip-hardened)

## About

GlitchTip is open-source error tracking that speaks the Sentry protocol. Any Sentry SDK points at it by changing a single environment variable, so adopting it — or leaving it — costs one line of configuration. This build
  runs GlitchTip as one service with its background worker embedded, backed by PostgreSQL and Redis on Railway's private network.

  ## About Hosting GlitchTip (hardened)

  GlitchTip is a Django application with two hard dependencies: PostgreSQL for storage and Redis as a task broker. Events arrive over HTTP and are queued; a background worker groups them into issues, applies retention, and
  sends alert mail. Without a worker running somewhere, events arrive and are silently never processed.

  This template embeds that worker in the web process. One service to operate instead of two, and no `SECRET_KEY` to keep synchronised between them. Migrations run automatically on first boot. Both datastores carry persistent
  volumes and are reached over private networking, so a redeploy keeps your event history and internal traffic costs no egress.

  `SECRET_KEY` and both datastore passwords are generated fresh on every deploy, and the Postgres superuser is given a random name rather than `postgres`. User registration is enabled so you can create the first account, and
  should be closed immediately afterwards.

  ## Common Use Cases

  - Self-hosted error tracking for teams that cannot send stack traces, request payloads or user identifiers to a third-party service
  - A drop-in Sentry replacement — identical SDKs, identical DSN format, one variable to switch, and one variable to switch back
  - A single instance collecting errors from several services or environments, separated by tag rather than by deployment

  ## Dependencies for GlitchTip (hardened) Hosting

  - PostgreSQL 14 or newer — included in this template, with a persistent volume
  - Redis, or a Valkey-compatible equivalent — included, acting as the task broker
  - An SMTP server — **not** included, and required for alert mail and account confirmation

  ### Implementation Details

  Two variables must be supplied at deploy time:

  EMAIL_URL=smtp+tls://user:password@smtp.example.com:587
  DEFAULT_FROM_EMAIL=errors@example.com

  Without them the instance runs normally but never sends mail, which means no alerts and no way to confirm the account you just registered.

  Once the first account exists, close signup and redeploy:

  ENABLE_USER_REGISTRATION=false

  Leaving it open lets anyone who finds the URL create an account on a system holding your stack traces.

  Point an application at the instance with its project DSN:

  SENTRY_DSN=https://@/

  Several services can share one DSN. Tag events by service in your SDK's `init()` and filter on that tag in the Issues view, rather than running a project per service.

  Other variables worth knowing:

  - `GLITCHTIP_EVENT_RETENTION_DAYS` — defaults to 90. Lower it to slow database growth.
  - `GLITCHTIP_EMBED_WORKER` — keep `true`. Set it to `false` only if you add a dedicated worker service, which must then share the same `SECRET_KEY` and Redis.
  - `ALLOWED_HOSTS` — the hostnames Django will serve. Defaults to any host if unset.

  ## Why Deploy GlitchTip (hardened) on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying GlitchTip (hardened) on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

  One catch: ALLOWED_HOSTS is named there but isn't in your variable list yet. Add it before publishing:

  ALLOWED_HOSTS = ${{RAILWAY_PUBLIC_DOMAIN}}
  Description: Hostnames Django will serve. Defaults to any host if unset.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| glitchtip-web | `glitchtip/glitchtip:latest` | Web service |
| Redis | `redis:7-alpine` | Database |
| Postgres | `postgres:15` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `EMAIL_URL` | glitchtip-web | - | SMTP connection string, e.g. smtp+tls://user:pass@smtp.example.com:587. Without it no alert or confirmation mail is ever sent. |
| `REDIS_URL` | glitchtip-web | - | Task broker for the background worker. Also accepted as VALKEY_URL. |
| `SECRET_KEY` | glitchtip-web | (secret) | Django signing key. Generated per deploy — never share one across instances. Changing it logs everyone out. |
| `DATABASE_URL` | glitchtip-web | - | PostgreSQL 14+. Private network, no egress cost. Migrations run on first boot. |
| `GLITCHTIP_DOMAIN` | glitchtip-web | - | Public URL of this instance, scheme included. Used in DSNs and email links. |
| `DEFAULT_FROM_EMAIL` | glitchtip-web | - | Sender address on outgoing mail. Must be one your SMTP provider allows. |
| `GLITCHTIP_EMBED_WORKER` | glitchtip-web | true | Runs the background worker inside the web process. Without a worker running somewhere, events arrive but are never processed or emailed. |
| `ENABLE_USER_REGISTRATION` | glitchtip-web | true | Open signup. Set false after you create your account — error payloads carry stack traces and user data. |
| `GLITCHTIP_EVENT_RETENTION_DAYS` | glitchtip-web | 90 | Days before events are deleted. Lower it to cut database growth. |
| `REDISHOST` | Redis | - | Public TCP proxy hostname. For access from outside Railway. |
| `REDISPORT` | Redis | - | Public TCP proxy port. |
| `REDISUSER` | Redis | default | Redis ACL username. default is the built-in user — do not change it. |
| `REDIS_URL` | Redis | - | Public connection string. For redis-cli and external tools. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated per deploy. Never reused across instances. |
| `REDISHOST_PRIVATE` | Redis | - | Private network hostname. Not reachable from the internet. |
| `REDISPORT_PRIVATE` | Redis | 6379 | Private network port. |
| `REDIS_PRIVATE_URL` | Redis | - | Private connection string. This is what GlitchTip uses. |
| `POSTGRES_DB` | Postgres | railway | Database name created on first boot. |
| `DATABASE_URL` | Postgres | - | Public connection string. For psql and external tools. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser role created on first boot. Random by default. |
| `PGHOST_PRIVATE` | Postgres | - | Private network hostname. Not reachable from the internet. |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private network port. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated per deploy. Never reused across instances. |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private connection string. This is what GlitchTip uses. |

## Configuration

- **Start command:** `/bin/sh -c "sleep 10 && ./manage.py migrate && ./bin/start.sh"`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/glitchtip-hardened)
