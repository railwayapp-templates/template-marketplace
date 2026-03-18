# Deploy fnd-initial-template on Railway

Template para alunos da Fábrica de Negócios Digitais

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fnd-initial-template)

## About

FND SaaS QuickLaunch is a production-ready SaaS template built for non-technical entrepreneurs and developers using AI-assisted coding. It includes complete authentication with JWT, Stripe payment integration, multi-tenancy workspaces, background job processing, and admin dashboard—eliminating weeks of foundational work so you can focus on your business logic.

Deploying FND SaaS QuickLaunch involves running a NestJS backend API with background workers, PostgreSQL database for data persistence, and Redis for job queues and caching. The template uses a monorepo architecture with Turborepo, supporting both API and worker processes that can run in hybrid mode or separately. The backend handles authentication, billing, workspace management, audit logs, and webhook processing. Frontend applications (React) are typically deployed to Cloudflare Pages or similar static hosting, while the backend infrastructure runs on Railway with automatic scaling and managed databases.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fnd-quick-launch | [brabos-ai/fnd-quick-launch](https://github.com/brabos-ai/fnd-quick-launch) | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_PORT` | fnd-quick-launch | 3001 | - |
| `LOG_LEVEL` | fnd-quick-launch | info | Log Provider Configuration |
| `NODE_MODE` | fnd-quick-launch | hybrid | =========================================== |
| `REDIS_URL` | fnd-quick-launch | - | =========================================== |
| `JWT_SECRET` | fnd-quick-launch | (secret) | =========================================== |
| `API_BASE_URL` | fnd-quick-launch | http://localhost:3001 | =========================================== |
| `DATABASE_URL` | fnd-quick-launch | - | Railway: Use Railway PostgreSQL connection string |
| `FRONTEND_URL` | fnd-quick-launch | http://localhost:3000 | =========================================== |
| `ENCRYPTION_KEY` | fnd-quick-launch | 14be70f6fb24932b2883c4f30951ede4e7e502d7f048aad7137695864335139e | =========================================== |
| `RESEND_API_KEY` | fnd-quick-launch | (secret) | - |
| `API_CORS_ORIGINS` | fnd-quick-launch | * | - |
| `RESEND_FROM_EMAIL` | fnd-quick-launch | delivered@resend.dev | =========================================== |
| `STRIPE_CANCEL_URL` | fnd-quick-launch | http://localhost:3000/settings/billing?canceled=true | - |
| `STRIPE_SECRET_KEY` | fnd-quick-launch | (secret) | - |
| `SUPER_ADMIN_EMAIL` | fnd-quick-launch | harsh.lemming.guuf@protectsmail.net | =========================================== |
| `STRIPE_SUCCESS_URL` | fnd-quick-launch | http://localhost:3000/settings/billing?success=true | - |
| `STRIPE_WEBHOOK_SECRET` | fnd-quick-launch | (secret) | - |
| `FEATURES_WORKSPACE_ENABLED` | fnd-quick-launch | true | Enable workspace switching |
| `FEATURES_WORKSPACE_SWITCHING_ENABLED` | fnd-quick-launch | true | =========================================== |
| `REDISHOST` | Redis | - | Redis host connection |
| `REDISPORT` | Redis | 6379 | Redir port connection |
| `REDISUSER` | Redis | default | Redis user authentication |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Redis password authentication mapping |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Shell, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/fnd-initial-template)
