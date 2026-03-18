# Deploy nexgent-trading-engine on Railway

Nexgent AI's open-source trading platform for Solana

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nexgent-trading-engine)

## About

Nexgent AI is an open-source Solana trading automation engine. It lets you deploy AI-powered trading agents with custom strategies, real-time position tracking, stop-loss mechanisms (fixed, exponential, zones), DCA support, and a live dashboard — all backed by Jupiter Aggregator for on-chain swaps and Pyth Network for price feeds.

Deploying Nexgent requires running an Express.js backend server alongside PostgreSQL and Redis. PostgreSQL (via Prisma ORM) stores agents, positions, trades, and user data. Redis powers BullMQ job queues, price caching, and distributed locks. On first boot the backend auto-runs database migrations and seeds an admin account from environment variables. A WebSocket server provides real-time position and price updates to the Next.js frontend dashboard, which can be deployed separately. The backend exposes a health check at `/api/v1/health` and supports graceful shutdown for zero-downtime deploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| @nexgent/backend | [nexgent-ai-org/nexgent-open-source-trading-engine](https://github.com/nexgent-ai-org/nexgent-open-source-trading-engine) | Web service |
| Redis | `redis:8.2.1` | Database |
| @nexgent/frontend | [nexgent-ai-org/nexgent-open-source-trading-engine](https://github.com/nexgent-ai-org/nexgent-open-source-trading-engine) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | @nexgent/backend | 4000 | - |
| `WALLET_1` | @nexgent/backend | - | This is your Solana wallet private key, not to be confused to wallet address. |
| `JWT_SECRET` | @nexgent/backend | (secret) | - |
| `ADMIN_PASSWORD` | @nexgent/backend | (secret) | !!! IMPORTANT !!! Your password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character. The platform will not deploy if this requirement is not met. |
| `REDIS_PASSWORD` | @nexgent/backend | (secret) | - |
| `JUPITER_API_KEY` | @nexgent/backend | (secret) | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | @nexgent/frontend | 3000 | - |
| `NEXTAUTH_SECRET` | @nexgent/frontend | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `pnpm --filter @nexgent/backend start`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `pnpm --filter @nexgent/frontend start`
- **Healthcheck:** `/api/health`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/nexgent-trading-engine)
