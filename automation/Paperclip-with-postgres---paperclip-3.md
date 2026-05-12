# Deploy Paperclip with postgres on Railway

Hire AI employees, automate jobs, and run your business 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-3)

## About

Paperclip is a self-hosted AI agent orchestration platform that lets you run entire AI-powered businesses from a single dashboard. It organizes multiple agents into structured companies with defined roles, goal hierarchies, budgets, and full audit visibility, enabling coordinated and autonomous execution at scale.

Hosting Paperclip on Railway involves deploying a Node.js-based service with a built-in React dashboard, backed by a managed PostgreSQL database and persistent storage. The Railway template simplifies setup by automatically injecting environment variables, mounting a volume for long-term data storage, and handling database migrations on startup. A custom wrapper provides a /setup onboarding page to initialize your instance, create an admin account, and launch the system. This setup eliminates manual infrastructure work while still delivering a production-ready, self-hosted AI orchestration platform.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| paperclip | [codestorm-official/paperclip](https://github.com/codestorm-official/paperclip) | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | paperclip | 0.0.0.0 | - |
| `PORT` | paperclip | 3100 | - |
| `NODE_ENV` | paperclip | production | - |
| `OPENAI_API_KEY` | paperclip | (secret) | - |
| `ANTHROPIC_API_KEY` | paperclip | (secret) | - |
| `BETTER_AUTH_SECRET` | paperclip | (secret) | - |
| `PAPERCLIP_DEPLOYMENT_MODE` | paperclip | authenticated | - |
| `PAPERCLIP_DEPLOYMENT_EXPOSURE` | paperclip | public | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Volume:** `/paperclip`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** HTML, JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/paperclip-3)
