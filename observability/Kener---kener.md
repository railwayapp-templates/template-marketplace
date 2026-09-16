# Deploy Kener on Railway

Status page that monitors your services and publishes uptime

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kener)

## About

Kener is an open-source status page and uptime monitor built with SvelteKit and Node.js. It watches the endpoints you depend on — HTTP APIs, TCP ports, DNS records, TLS certificates, SQL databases, gRPC health services and passive heartbeats — and turns the results into a branded public page customers can check when something feels slow. Around that it adds what a status page needs during an outage: incident timelines, maintenance windows, role-based team access, e-mail and webhook alerting, and embeddable badges.

Self-host Kener on Railway and this template gives you the production shape upstream documents, already wired together. The `kener` service runs the app and its background job runners in one container and is the only service with a public URL. `Postgres` holds every monitor definition, check result, incident and uploaded image. `Redis` backs the BullMQ queues that schedule each monitor's cron and fan results out to alerting. Deploy Kener with a username and password and the first admin account is created before the site accepts a request — there is no open signup window on a fresh URL.

![Diagram of the Kener, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789497139/kener-architecture.webp)

A status page must stay up when the thing it reports on does not, so running one inside your own cluster defeats the purpose — and paying per seat for a hosted one is hard to justify for a page most people visit twice a year. Self-hosting Kener away from your production stack is the middle path.

- Monitor types: HTTP/API, TCP port, DNS, SSL expiry, SQL query, gRPC health, Prometheus, GameDig, Docker container, passive heartbeat and manual
- Incidents with per-update states (investigating, identified, monitoring, resolved) and per-service impact levels
- Scheduled maintenance windows that suppress alerts and show on the public page
- Alerting through e-mail, webhooks, Slack and Discord, driven by trigger templates
- Multiple status pages from one instance, each with its own monitors, branding and domain
- Role-based access control with admin, editor and member roles plus custom roles
- Embeddable widgets, SVG status badges, RSS feeds and a full REST API

The Railway topology mirrors the app's own architecture. Kener's job runners are not a separate process — they run inside the same Node server as the web tier — so the app is one service. Postgres is the system of record, uploaded images included, stored as rows rather than files. Redis is not a cache you can drop: the scheduler, the check queue and the alerting fan-out are all BullMQ queues.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| kener | [gridalpha/kener-railway](https://github.com/gridalpha/kener-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `TZ` | kener | UTC | Server timezone, Kener pins UTC internally |
| `PORT` | kener | 3000 | HTTP listening port |
| `ORIGIN` | kener | - | Public base URL, CSRF and cookie origin |
| `REDIS_URL` | kener | - | Redis connection for BullMQ queues |
| `DATABASE_URL` | kener | - | Postgres connection string |
| `BODY_SIZE_LIMIT` | kener | 5M | Max upload size for logos and images |
| `KENER_ADMIN_NAME` | kener | Admin | Owner display name |
| `KENER_SECRET_KEY` | kener | (secret) | Signs session tokens and API keys |
| `KENER_ADMIN_EMAIL` | kener | admin@example.dev | Owner account seeded at first boot |
| `KENER_ADMIN_PASSWORD` | kener | (secret) | Owner password, upper/lower/digit required |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the entrypoint |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/kener)
