# Deploy WisemanOS: The operating system for your family's estate on Railway

Your family's estate OS. Finances, docs, taxes, legal, +more. Self-hosted.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wisemanos-the-operating-system-for-your-)

## About

WisemanOS is a self-hosted family operating system that unifies finances, entities, legal records, taxes, documents, passwords, and automation in one private instance. Each deploy is single-tenant: your family's database, storage, and encryption keys — never shared with other users.

Click Deploy to provision a complete stack: Next.js web app, REST API with MCP server, background worker, PostgreSQL, Redis, and S3-compatible document storage. Secrets (JWT, encryption keys, agent tokens) are auto-generated at deploy time — no manual key pasting. After deploy, visit your web URL, create the Owner account, then invite family members with role-based access. See the [self-hosting guide](https://wisemanos.com/self-hosting.html) for first-run steps and optional integrations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| platform-web | [lifeofjer/craneos](https://github.com/lifeofjer/craneos) | Web service |
| platform-api | [lifeofjer/craneos](https://github.com/lifeofjer/craneos) | Web service |
| platform-worker | [lifeofjer/craneos](https://github.com/lifeofjer/craneos) | Worker |
| platform-redis | `redis:8.2.1` | Database |
| platform-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | platform-web | 3000 |
| `NODE_ENV` | platform-web | production |
| `NEXT_PUBLIC_APP_TITLE` | platform-web | WisemanOS |
| `NEXT_PUBLIC_BRAND_ACCENT` | platform-web | suffix |
| `NEXT_PUBLIC_BRAND_PREFIX` | platform-web | WISEMAN |
| `NEXT_PUBLIC_BRAND_SUFFIX` | platform-web | OS |
| `NEXT_PUBLIC_BRAND_TAGLINE` | platform-web | The operating system for your family's estate |
| `NEXT_PUBLIC_BRAND_MCP_SLUG` | platform-web | wisemanos |
| `PORT` | platform-api | 3001 |
| `NODE_ENV` | platform-api | production |
| `JWT_SECRET` | platform-api | (secret) |
| `MOBILE_URL` | platform-api | exp://localhost:8081 |
| `APP_BRAND_NAME` | platform-api | WisemanOS |
| `ENABLE_WORKERS` | platform-api | false |
| `JWT_EXPIRES_IN` | platform-api | 7d |
| `AGENT_SERVICE_TOKEN` | platform-api | (secret) |
| `AWS_FORCE_PATH_STYLE` | platform-api | false |
| `AWS_SECRET_ACCESS_KEY` | platform-api | (secret) |
| `CREDENTIALS_ENCRYPTION_KEY` | platform-api | (secret) |
| `NODE_ENV` | platform-worker | production |
| `JWT_SECRET` | platform-worker | (secret) |
| `ENABLE_WORKERS` | platform-worker | true |
| `AGENT_SERVICE_TOKEN` | platform-worker | (secret) |
| `AWS_FORCE_PATH_STYLE` | platform-worker | false |
| `AWS_SECRET_ACCESS_KEY` | platform-worker | (secret) |
| `CREDENTIALS_ENCRYPTION_KEY` | platform-worker | (secret) |
| `REDISPASSWORD` | platform-redis | (secret) |
| `REDIS_PASSWORD` | platform-redis | (secret) |
| `POSTGRES_DB` | platform-postgres | railway |
| `POSTGRES_USER` | platform-postgres | (secret) |
| `POSTGRES_PASSWORD` | platform-postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, HTML, JavaScript, CSS, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/wisemanos-the-operating-system-for-your-)
