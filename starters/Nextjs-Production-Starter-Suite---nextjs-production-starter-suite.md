# Deploy Next.js Production Starter Suite on Railway

Vercel-like stack: ISR (Redis), cached Images, Postgres (Prisma) & Auth.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs-production-starter-suite)

## About

**Next.js Production Starter** is a battle-tested Next.js 16 template designed for stability and scale. It features **PostgreSQL (via Prisma 7) as a core requirement**, while keeping Caching (Redis) and Authentication (NextAuth) as auto-enabled optional features.

The repository is **AI-Native**, coming pre-configured with custom rule files for Cursor (`.cursorrules`), Claude Code (`CLAUDE.md`), and GitHub Copilot (`copilot-instructions.md`) to accelerate development.

Deploying this template is frictionless. It uses **Railpack** (Railway's auto-build system) to detect and build the application automatically, utilizing Next.js `standalone` output mode for an ultra-lightweight production deployment.

The build system is engineered to handle "chicken-and-egg" deployment scenarios gracefully. It generates the Prisma Client with a placeholder connection during the build, ensuring deployments never fail due to missing runtime variables. Once live, it connects strictly to your required PostgreSQL database. It includes structured JSON logging (Pino), production security headers, and health checks out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nextjs-production-starter | [Mohamedzh/nextjs-production-starter](https://github.com/Mohamedzh/nextjs-production-starter) | Worker |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEXTAUTH_SECRET` | nextjs-production-starter | (secret) | - |
| `RAILPACK_NODE_INSTALL_PATTERNS` | nextjs-production-starter | prisma | Optimizes the build for Prisma ORM |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/nextjs-production-starter-suite)
