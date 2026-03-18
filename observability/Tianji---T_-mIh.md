# Deploy Tianji on Railway

Website Analytics + Uptime Monitor + Server Status

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/T_-mIh)

## About

Tianji is an all-in-one monitoring platform that combines website analytics, uptime monitoring, and server status tracking. This is a free and open source project written in TypeScript. For most users who only have lightweight needs, an All-in-One application will be more convenient and easier to use.

Traditional monitoring setups often require juggling multiple specialized tools: one for server metrics, another for uptime checks, and separate solutions for user analytics. Hosting Tianji involves deploying a unified platform that consolidates these monitoring needs into a single application. Use docker to install Tianji is best way which you dont need consider about enviroment problem. The deployment process is straightforward and requires minimal configuration, making it ideal for developers who want comprehensive monitoring without managing multiple services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tianji | `moonrailgun/tianji` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `JWT_SECRET` | Tianji | (secret) | - |
| `ALLOW_OPENAPI` | Tianji | true | Whether to allow openapi which can fetch or post data just like you with ui |
| `ALLOW_REGISTER` | Tianji | true | Whether to allow account registrations |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Tianji | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database |
| `DATABASE_URL` | Postgres | - | Public URL |
| `POSTGRES_USER` | Postgres | (secret) | Database username |
| `PGHOST_PRIVATE` | Postgres | - | Private host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private Port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private URL |

## Configuration

- **Start command:** `/bin/sh -c "echo 'Waiting for database...'; while ! nc -z ${PGHOST_PRIVATE} ${PGPORT_PRIVATE}; do sleep 1; done; pnpm start:docker:db && pnpm start"`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/T_-mIh)
