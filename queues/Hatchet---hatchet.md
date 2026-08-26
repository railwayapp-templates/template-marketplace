# Deploy Hatchet on Railway

Task queue and workflow engine for background jobs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hatchet)

## About

Hatchet is an open-source task queue and durable workflow engine built on Postgres. It replaces the Celery-plus-Redis or BullMQ layer in a backend with a scheduler that keeps every task, retry, timeout and result in a database you can query, plus a dashboard to watch it happen. Teams reach for it when background jobs stop being fire-and-forget: payment settlement, document processing, multi-step AI agents, fan-out work that must finish exactly once. Workers stay in your codebase in Python, TypeScript or Go, and Hatchet queues, assigns, retries and records what they do.

Deploy Hatchet on Railway and the control plane arrives split into the roles its production documentation describes, rather than one container doing everything. The dashboard serves the React UI and the REST API. The engine exposes the gRPC endpoint your workers dial, published through a Railway TCP proxy because gRPC needs an end-to-end HTTP/2 connection. A controllers service runs tickers, retries and retention sweeps, and a scheduler assigns queued tasks to worker slots. All four share one managed Postgres database holding tenants, run history and the queue itself, so there is no broker to run.

![Diagram of the Hatchet control-plane services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787667813/hatchet-architecture.png)

Hatchet sits between the code that requests work and the code that performs it. Your application calls a task by name; Hatchet queues it in Postgres, picks a worker with a free slot, streams the assignment over gRPC, and records the outcome. Because durability lives in Postgres rather than an in-memory broker, a worker crash or a redeploy costs nothing — the task is reassigned. Self-hosting also keeps task payloads, which often carry customer data, on your own infrastructure.

Features worth knowing about:

- **Durable execution** — tasks survive worker restarts, with retries, timeouts and dashboard replay
- **DAG workflows and child tasks** — chain steps, fan out and in, pass results along
- **Scheduling** — cron jobs, one-off runs and event-triggered tasks
- **Concurrency and rate limits** — global or per-key, so one tenant cannot starve others
- **Observability** — per-run logs, activity timelines, queue metrics, OpenTelemetry
- **Multi-tenancy** — tenants with their own tokens and workers

The four services map to that design directly: the dashboard hosts the UI and REST API, the engine owns the gRPC dispatcher and is the only one reachable from outside the private network, controllers handle retries, ticking and retention, and the scheduler assigns tasks to workers. Postgres is the source of truth for all four.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hatchet-dashboard | [gridalpha/hatchet-railway](https://github.com/gridalpha/hatchet-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| hatchet-scheduler | [gridalpha/hatchet-railway](https://github.com/gridalpha/hatchet-railway) | Worker |
| hatchet-engine | [gridalpha/hatchet-railway](https://github.com/gridalpha/hatchet-railway) | TCP service |
| hatchet-controllers | [gridalpha/hatchet-railway](https://github.com/gridalpha/hatchet-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | hatchet-dashboard | 8080 | Port Railway health-checks, the API process |
| `ADMIN_NAME` | hatchet-dashboard | Admin | Display name for that user |
| `SERVER_URL` | hatchet-dashboard | - | Public dashboard and API URL |
| `ADMIN_EMAIL` | hatchet-dashboard | admin@example.com | First admin user, change before deploying |
| `SERVER_PORT` | hatchet-dashboard | 8080 | hatchet-api listening port behind nginx |
| `DATABASE_URL` | hatchet-dashboard | - | Postgres connection string |
| `ADMIN_PASSWORD` | hatchet-dashboard | (secret) | First admin password, 8-64 chars mixed case and digit |
| `DATABASE_MAX_CONNS` | hatchet-dashboard | 12 | Postgres pool size for this service |
| `DATABASE_MIN_CONNS` | hatchet-dashboard | 1 | Idle Postgres connections kept open |
| `DEFAULT_TENANT_NAME` | hatchet-dashboard | Default | Name of the tenant created at boot |
| `DEFAULT_TENANT_SLUG` | hatchet-dashboard | default | Slug of that tenant |
| `SERVER_ALLOW_SIGNUP` | hatchet-dashboard | false | Disable public registration |
| `SERVER_LOGGER_LEVEL` | hatchet-dashboard | warn | Application log level |
| `SERVER_GRPC_INSECURE` | hatchet-dashboard | t | Plaintext gRPC behind the TCP proxy |
| `SERVER_LOGGER_FORMAT` | hatchet-dashboard | console | Human-readable log format |
| `SERVER_MSGQUEUE_KIND` | hatchet-dashboard | postgres | Use Postgres as queue and pub/sub |
| `DATABASE_LOGGER_LEVEL` | hatchet-dashboard | warn | Database log level |
| `DATABASE_LOGGER_FORMAT` | hatchet-dashboard | console | Human-readable database logs |
| `SERVER_ALLOWED_ORIGINS` | hatchet-dashboard | - | CORS origin allow-list |
| `SERVER_AUTH_COOKIE_DOMAIN` | hatchet-dashboard | - | Session cookie domain |
| `SERVER_API_TRUSTED_PROXIES` | hatchet-dashboard | 0.0.0.0/0,::/0 | Trust edge headers for client IP |
| `SERVER_AUTH_COOKIE_INSECURE` | hatchet-dashboard | f | Require HTTPS-only cookies |
| `SERVER_GRPC_BROADCAST_ADDRESS` | hatchet-dashboard | - | Worker-facing gRPC address in tokens |
| `SERVER_AUTH_SET_EMAIL_VERIFIED` | hatchet-dashboard | t | Skip email verification step |
| `SERVER_INTERNAL_CLIENT_BASE_STRATEGY` | hatchet-dashboard | none | No TLS on internal gRPC client |
| `SERVER_MSGQUEUE_PUBSUB_POSTGRES_MAX_CONNS` | hatchet-dashboard | 4 | Pub/sub pool size |
| `SERVER_INTERNAL_CLIENT_INTERNAL_GRPC_BROADCAST_ADDRESS` | hatchet-dashboard | - | Private engine address |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `PORT` | hatchet-scheduler | 8733 | Health-check port Railway probes |
| `SERVER_URL` | hatchet-scheduler | - | Public dashboard and API URL |
| `DATABASE_URL` | hatchet-scheduler | - | Postgres connection string |
| `SERVER_SERVICES` | hatchet-scheduler | scheduler | Run queue-to-worker assignment |
| `DATABASE_MAX_CONNS` | hatchet-scheduler | 12 | Postgres pool size for this service |
| `DATABASE_MIN_CONNS` | hatchet-scheduler | 1 | Idle Postgres connections kept open |
| `SERVER_LOGGER_LEVEL` | hatchet-scheduler | warn | Application log level |
| `SERVER_GRPC_INSECURE` | hatchet-scheduler | t | Plaintext gRPC behind the TCP proxy |
| `SERVER_LOGGER_FORMAT` | hatchet-scheduler | console | Human-readable log format |
| `SERVER_MSGQUEUE_KIND` | hatchet-scheduler | postgres | Use Postgres as queue and pub/sub |
| `DATABASE_LOGGER_LEVEL` | hatchet-scheduler | warn | Database log level |
| `DATABASE_LOGGER_FORMAT` | hatchet-scheduler | console | Human-readable database logs |
| `SERVER_AUTH_COOKIE_DOMAIN` | hatchet-scheduler | - | Session cookie domain |
| `SERVER_AUTH_COOKIE_INSECURE` | hatchet-scheduler | f | Require HTTPS-only cookies |
| `SERVER_GRPC_BROADCAST_ADDRESS` | hatchet-scheduler | - | Worker-facing gRPC address |
| `SERVER_INTERNAL_CLIENT_BASE_STRATEGY` | hatchet-scheduler | none | No TLS on internal gRPC client |
| `SERVER_MSGQUEUE_PUBSUB_POSTGRES_MAX_CONNS` | hatchet-scheduler | 4 | Pub/sub pool size |
| `SERVER_INTERNAL_CLIENT_INTERNAL_GRPC_BROADCAST_ADDRESS` | hatchet-scheduler | - | Private engine address |
| `PORT` | hatchet-engine | 8733 | Health-check port Railway probes |
| `SERVER_URL` | hatchet-engine | - | Public dashboard and API URL |
| `DATABASE_URL` | hatchet-engine | - | Postgres connection string |
| `SERVER_SERVICES` | hatchet-engine | grpc-api | Run only the gRPC dispatcher role |
| `SERVER_GRPC_PORT` | hatchet-engine | 7070 | gRPC listening port |
| `DATABASE_MAX_CONNS` | hatchet-engine | 12 | Postgres pool size for this service |
| `DATABASE_MIN_CONNS` | hatchet-engine | 1 | Idle Postgres connections kept open |
| `SERVER_LOGGER_LEVEL` | hatchet-engine | warn | Application log level |
| `SERVER_GRPC_INSECURE` | hatchet-engine | t | Plaintext gRPC behind the TCP proxy |
| `SERVER_LOGGER_FORMAT` | hatchet-engine | console | Human-readable log format |
| `SERVER_MSGQUEUE_KIND` | hatchet-engine | postgres | Use Postgres as queue and pub/sub |
| `DATABASE_LOGGER_LEVEL` | hatchet-engine | warn | Database log level |
| `DATABASE_LOGGER_FORMAT` | hatchet-engine | console | Human-readable database logs |
| `SERVER_GRPC_BIND_ADDRESS` | hatchet-engine | [::] | Dual-stack bind, reachable privately |
| `SERVER_AUTH_COOKIE_DOMAIN` | hatchet-engine | - | Session cookie domain |
| `SERVER_AUTH_COOKIE_INSECURE` | hatchet-engine | f | Require HTTPS-only cookies |
| `SERVER_INTERNAL_CLIENT_BASE_STRATEGY` | hatchet-engine | none | No TLS on internal gRPC client |
| `SERVER_MSGQUEUE_PUBSUB_POSTGRES_MAX_CONNS` | hatchet-engine | 4 | Pub/sub pool size |
| `SERVER_INTERNAL_CLIENT_INTERNAL_GRPC_BROADCAST_ADDRESS` | hatchet-engine | - | Private engine address |
| `PORT` | hatchet-controllers | 8733 | Health-check port Railway probes |
| `SERVER_URL` | hatchet-controllers | - | Public dashboard and API URL |
| `DATABASE_URL` | hatchet-controllers | - | Postgres connection string |
| `SERVER_SERVICES` | hatchet-controllers | controllers | Run tickers, retries and retention |
| `DATABASE_MAX_CONNS` | hatchet-controllers | 12 | Postgres pool size for this service |
| `DATABASE_MIN_CONNS` | hatchet-controllers | 1 | Idle Postgres connections kept open |
| `SERVER_LOGGER_LEVEL` | hatchet-controllers | warn | Application log level |
| `SERVER_GRPC_INSECURE` | hatchet-controllers | t | Plaintext gRPC behind the TCP proxy |
| `SERVER_LOGGER_FORMAT` | hatchet-controllers | console | Human-readable log format |
| `SERVER_MSGQUEUE_KIND` | hatchet-controllers | postgres | Use Postgres as queue and pub/sub |
| `DATABASE_LOGGER_LEVEL` | hatchet-controllers | warn | Database log level |
| `DATABASE_LOGGER_FORMAT` | hatchet-controllers | console | Human-readable database logs |
| `SERVER_AUTH_COOKIE_DOMAIN` | hatchet-controllers | - | Session cookie domain |
| `SERVER_AUTH_COOKIE_INSECURE` | hatchet-controllers | f | Require HTTPS-only cookies |
| `SERVER_GRPC_BROADCAST_ADDRESS` | hatchet-controllers | - | Worker-facing gRPC address |
| `SERVER_INTERNAL_CLIENT_BASE_STRATEGY` | hatchet-controllers | none | No TLS on internal gRPC client |
| `SERVER_MSGQUEUE_PUBSUB_POSTGRES_MAX_CONNS` | hatchet-controllers | 4 | Pub/sub pool size |
| `SERVER_INTERNAL_CLIENT_INTERNAL_GRPC_BROADCAST_ADDRESS` | hatchet-controllers | - | Private engine address |

## Configuration

- **Healthcheck:** `/api/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/live`
- **TCP Proxies:** 7070

**Category:** Queues · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hatchet)
