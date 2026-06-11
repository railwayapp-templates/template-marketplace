# Deploy Hogsend - Lifecycle Email Automation on Railway

Code-first lifecycle email for scrappy product engineers, self-hosted.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hogsend-posthog-audience-stack)

## About

Hogsend is code-first lifecycle email automation for teams on PostHog + Resend. You define journeys as TypeScript — welcome series, trial nudges, churn recovery — triggered by your PostHog events and sent via Resend, with link/open tracking and one-click unsubscribe built in. This template self-hosts the whole stack on your own Railway project.

The template provisions six pre-wired services: an HTTP api (ingestion, auth, the data plane), a worker that runs your durable journeys and sends email, Postgres (TimescaleDB) for the event store and contacts, Redis for the PostHog property cache, and a self-hosted hatchet-lite workflow engine with its own Postgres. Database, Redis, the auth secret, and public URLs are wired automatically. You provide a RESEND_API_KEY, and — once hatchet-lite boots — a HATCHET_CLIENT_TOKEN minted from its dashboard. The worker inherits both from the api, so you set them once, then redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hogsend-api | [dougwithseismic/hogsend](https://github.com/dougwithseismic/hogsend) | Web service |
| hatchet-lite | `ghcr.io/hatchet-dev/hatchet/hatchet-lite:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| hogsend-worker | [dougwithseismic/hogsend](https://github.com/dougwithseismic/hogsend) | Worker |
| Postgres-J_tJ | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | hogsend-api | 3002 | - |
| `NODE_ENV` | hogsend-api | production | - |
| `LOG_LEVEL` | hogsend-api | info | - |
| `RESEND_API_KEY` | hogsend-api | (secret) | - |
| `RESEND_FROM_EMAIL` | hogsend-api | noreply@hogsend.com | - |
| `BETTER_AUTH_SECRET` | hogsend-api | (secret) | - |
| `STUDIO_ADMIN_EMAIL` | hogsend-api | - | Email for the first Studio admin - created automatically on first boot. Public sign-up is disabled; this is how you get in. The password is STUDIO_ADMIN_PASSWORD, auto-generated and visible in this service's Variables tab. |
| `HATCHET_CLIENT_TOKEN` | hogsend-api | (secret) | - |
| `STUDIO_ADMIN_PASSWORD` | hogsend-api | (secret) | Password for the first Studio admin - auto-generated at deploy. Read it here in the Variables tab, then change it from inside Studio once you're in. |
| `HATCHET_CLIENT_HOST_PORT` | hogsend-api | hatchet-lite.railway.internal:7077 | - |
| `HATCHET_CLIENT_TLS_STRATEGY` | hogsend-api | none | - |
| `PORT` | hatchet-lite | 8888 | - |
| `POSTGRES_USER` | hatchet-lite | (secret) | - |
| `ADMIN_PASSWORD` | hatchet-lite | (secret) | - |
| `SERVER_GRPC_PORT` | hatchet-lite | 7077 | - |
| `POSTGRES_PASSWORD` | hatchet-lite | (secret) | - |
| `SERVER_ALLOW_SIGNUP` | hatchet-lite | false | Disable open registration — the dashboard is public; admins are seeded via ADMIN_EMAIL/ADMIN_PASSWORD. |
| `SERVER_GRPC_INSECURE` | hatchet-lite | true | - |
| `SERVER_MSGQUEUE_KIND` | hatchet-lite | postgres | - |
| `SERVER_GRPC_BIND_ADDRESS` | hatchet-lite | 0.0.0.0 | - |
| `SERVER_AUTH_COOKIE_INSECURE` | hatchet-lite | true | - |
| `SERVER_DEFAULT_ENGINE_VERSION` | hatchet-lite | V1 | - |
| `SERVER_AUTH_SET_EMAIL_VERIFIED` | hatchet-lite | true | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `NODE_ENV` | hogsend-worker | production | - |
| `RESEND_API_KEY` | hogsend-worker | (secret) | - |
| `RESEND_FROM_EMAIL` | hogsend-worker | noreply@hogsend.com | - |
| `BETTER_AUTH_SECRET` | hogsend-worker | (secret) | - |
| `HATCHET_CLIENT_TOKEN` | hogsend-worker | (secret) | - |
| `HATCHET_CLIENT_HOST_PORT` | hogsend-worker | hatchet-lite.railway.internal:7077 | - |
| `HATCHET_CLIENT_TLS_STRATEGY` | hogsend-worker | none | - |
| `POSTGRES_DB` | Postgres-J_tJ | railway | - |
| `POSTGRES_USER` | Postgres-J_tJ | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres-J_tJ | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `pnpm --filter @hogsend/api worker`

**Category:** Other · **Languages:** TypeScript, MDX, Go, Shell, JavaScript, CSS, Dockerfile, HTML, Makefile

[View on Railway →](https://railway.com/deploy/hogsend-posthog-audience-stack)
