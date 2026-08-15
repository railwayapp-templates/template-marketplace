# Deploy GlitchTip on Railway

Sentry alternative. Error tracking and uptime monitoring

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/glitchtip-railway)

## About

GlitchTip is open-source error tracking and uptime monitoring that speaks the same protocol as Sentry. It collects unhandled exceptions, stack traces, log records and performance spans, groups them into issues, and alerts you when something new breaks. Because it implements the Sentry ingest API, every official Sentry SDK (Python, JavaScript, Ruby, PHP, Go, Java, .NET and the rest) works against it unchanged: swap the DSN and keep your instrumentation. Teams self-host GlitchTip to keep crash reports on infrastructure they control, to escape per-seat pricing, or to satisfy data-residency rules.

Deploy GlitchTip on Railway and this template wires up the shape upstream documents for production, not the single-container demo. A web service runs the Granian ASGI server that serves the dashboard and accepts ingest. A separate worker service runs the task queue and scheduler, so grouping events, symbolicating traces, evaluating alerts and dispatching uptime checks never compete with HTTP requests. PostgreSQL stores projects, issues and events; Redis is the Valkey-compatible broker, cache and session store; a Railway object storage bucket holds source maps, debug files and archives, which is why no service here needs a volume.

![GlitchTip Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786744160/a4212d60-235c-4cf2-bb9f-49f68eb1c20e.png)

GlitchTip exists because self-hosting Sentry became heavy, a sprawl of services wanting 8 GB or more of RAM. GlitchTip re-implements the parts most teams actually use in one Django application that runs in a fraction of that. Self-host it when you would rather not send production stack traces, which routinely contain customer data, to a third party.

Key features:

- Sentry-SDK-compatible ingest, so instrumentation migrates by changing one DSN
- Issue grouping, search, assignment, resolution and regression detection
- Source map and debug-file uploads for readable JavaScript and native traces
- Uptime monitoring with GET, POST, ping, heartbeat and TCP port checks
- Structured log ingestion, including a native OTLP/HTTP endpoint at `/v1/logs`
- Alerts to email, Discord, Slack-compatible webhooks, Teams, ntfy and Zulip
- Per-organization SSO via OpenID Connect, plus TOTP, WebAuthn and passkey MFA

The service split matters. The web tier answers dashboard traffic and enqueues events; the worker drains that queue and runs the scheduler behind alert evaluation, retention sweeps and uptime checks. PostgreSQL is the system of record, partitioned by time and organization. Redis carries the queue, cache and sessions, which is why signing in survives a redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| GlitchTip | `glitchtip/glitchtip:latest` | Web service |
| glitchtip-worker | `glitchtip/glitchtip:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `PORT` | GlitchTip | 8000 | HTTP listening port |
| `LOG_LEVEL` | GlitchTip | INFO | Application log verbosity |
| `SECRET_KEY` | GlitchTip | (secret) | Django session and token signing key |
| `VALKEY_URL` | GlitchTip | - | Queue, cache and session store |
| `SERVER_ROLE` | GlitchTip | web | Run the web tier |
| `DATABASE_URL` | GlitchTip | - | PostgreSQL connection string |
| `ALLOWED_HOSTS` | GlitchTip | - | Accepted Host headers |
| `GLITCHTIP_DOMAIN` | GlitchTip | - | Public URL used in DSNs |
| `AWS_ACCESS_KEY_ID` | GlitchTip | - | Bucket access key |
| `AWS_S3_ENDPOINT_URL` | GlitchTip | - | Object storage endpoint |
| `CSRF_TRUSTED_ORIGINS` | GlitchTip | - | Required behind Railway TLS |
| `AWS_SECRET_ACCESS_KEY` | GlitchTip | (secret) | Bucket secret key |
| `GLITCHTIP_EMBED_WORKER` | GlitchTip | false | Worker runs as its own service |
| `AWS_STORAGE_BUCKET_NAME` | GlitchTip | - | Bucket for uploads |
| `GLITCHTIP_ENABLE_DUCKDB` | GlitchTip | true | Archive old data to object storage |
| `GLITCHTIP_INSTANCE_NAME` | GlitchTip | GlitchTip on Railway | Name shown in the interface |
| `ENABLE_USER_REGISTRATION` | GlitchTip | true | Set false after creating your account |
| `ENABLE_OPEN_USER_REGISTRATION` | GlitchTip | false | Keep organization creation closed |
| `LOG_LEVEL` | glitchtip-worker | WARNING | Quieter than web; uptime dispatch runs every second |
| `SECRET_KEY` | glitchtip-worker | (secret) | Must match the web service |
| `VALKEY_URL` | glitchtip-worker | - | Queue, cache and session store |
| `SERVER_ROLE` | glitchtip-worker | worker | Run the queue and scheduler |
| `DATABASE_URL` | glitchtip-worker | - | PostgreSQL connection string |
| `GLITCHTIP_DOMAIN` | glitchtip-worker | - | Public URL used in emails |
| `AWS_ACCESS_KEY_ID` | glitchtip-worker | - | Bucket access key |
| `AWS_S3_ENDPOINT_URL` | glitchtip-worker | - | Object storage endpoint |
| `AWS_SECRET_ACCESS_KEY` | glitchtip-worker | (secret) | Bucket secret key |
| `AWS_STORAGE_BUCKET_NAME` | glitchtip-worker | - | Bucket for uploads |
| `GLITCHTIP_ENABLE_DUCKDB` | glitchtip-worker | true | Archive old data to object storage |

## Configuration

- **Start command:** `wrapper.sh postgres -p 5432 -c listen_addresses=* -c max_locks_per_transaction=512`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/api/settings/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/glitchtip-railway)
