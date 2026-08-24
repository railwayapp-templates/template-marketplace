# Deploy Inngest on Railway

Durable execution, queues, crons, retries, step functions, webhooks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/inngest)

## About

Inngest is a durable execution engine for background jobs, queues and multi-step workflows. You write ordinary functions in your own codebase, wrap the risky parts in `step.run()`, and Inngest does the rest: every step is checkpointed, failed steps retry with backoff, `step.sleep()` can pause a workflow for a month, and `step.waitForEvent()` blocks until a real user acts. Teams reach for it when cron jobs and a Redis queue stop being enough: AI pipelines calling flaky model APIs, billing flows that must not double-charge, onboarding spanning days. Your functions stay in your app and Inngest calls them over HTTP, so there is no worker fleet to build.

Self-host Inngest on Railway and you own the event history and queue rather than renting them. This template runs four services: the Inngest server, a Caddy gateway that is the only public entry point, PostgreSQL for configuration and run history, and Redis backing the queue, run state and realtime streams. The gateway matters more than it sounds — the self-hosted server ships no authentication for its dashboard, GraphQL API, profiling handlers or metrics endpoint, so this template puts HTTP basic auth in front of all of them while letting SDK traffic reach the key checks Inngest already enforces.

![Inngest, Caddy gateway, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787295948/inngest-architecture.png)

Inngest replaces a queue, a workflow state store and a scheduler with one server that calls your existing HTTP endpoints. Self-hosting makes sense when event payloads carry customer data you would rather not send to a vendor, or when you want run history in a database you control.

Key features:

- **Durable steps** — each `step.run()` result is persisted, so a crash resumes from the last completed step
- **Flow control** — concurrency, throttling, rate limiting, debounce and priority, declared per function
- **Event-driven triggers** — fan-out from one event, plus `waitForEvent` for human-in-the-loop pauses
- **Cron schedules** — recurring functions defined in code, no separate scheduler
- **Full run history** — every step, input, output and retry in the dashboard, with replay

**Inngest** runs the event API, executor and dashboard, and holds no public domain of its own. **Caddy** takes public traffic and decides per path whether a request needs the dashboard password or already carries an Inngest key. **PostgreSQL** stores apps, functions, events and run history, migrating itself on boot. **Redis** carries the queue, in-flight state and realtime subscriptions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| inngest | [gridalpha/inngest-railway](https://github.com/gridalpha/inngest-railway) | Worker |
| gateway | [gridalpha/inngest-railway](https://github.com/gridalpha/inngest-railway) | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | inngest | 8288 | Port Railway health-checks |
| `INNGEST_HOST` | inngest | 0.0.0.0 | Listen address; localhost by default |
| `INNGEST_PORT` | inngest | 8288 | API, dashboard and event listener |
| `INNGEST_EVENT_KEY` | inngest | - | Key in the /e/{key} event URL |
| `INNGEST_LOG_LEVEL` | inngest | info | trace, debug, info, warn or error |
| `INNGEST_REDIS_URI` | inngest | - | Queue, run state and realtime |
| `INNGEST_SIGNING_KEY` | inngest | - | Signs server-to-app traffic, hex only |
| `INNGEST_POSTGRES_URI` | inngest | - | Configuration and run history |
| `INNGEST_UPSTREAM` | gateway | - | Private address of the Inngest server |
| `INNGEST_EVENT_KEY` | gateway | - | Key the dashboard's own sends are rewritten onto |
| `DASHBOARD_PASSWORD` | gateway | (secret) | Dashboard basic-auth password |
| `DASHBOARD_USERNAME` | gateway | (secret) | Dashboard basic-auth username |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/health`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Queues · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/inngest)
