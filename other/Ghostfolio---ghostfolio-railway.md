# Deploy Ghostfolio on Railway

Portfolio tracker for your stocks, ETFs and cryptocurrencies

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghostfolio-railway)

## About

Ghostfolio is open source wealth management software for people holding stocks, ETFs and cryptocurrencies across more than one broker or exchange. You record what you bought, when and at what price; Ghostfolio fetches quotes and history, converts everything into one base currency, and shows a net-worth figure, a performance curve and a breakdown of where your money sits. It suits buy-and-hold investors who have outgrown a spreadsheet but will not give a commercial aggregator access to their brokerage accounts. Self-host Ghostfolio and your holdings never leave infrastructure you control.

This template runs the shape the project documents for production. Deploy Ghostfolio on Railway and you get three services: **ghostfolio**, the Angular front end and NestJS API in one container on port 3333; **Postgres**, holding every account, activity, symbol profile and cached price, and the only durable state; and **Redis**, backing the response cache, the BullMQ queues that gather market data and recompute snapshots, and the sign-in rate limiter. Only ghostfolio gets a public domain. Migrations run in the entrypoint, so the first deployment arrives with a complete schema.

![Diagram of the Ghostfolio, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788380680/ghostfolio-architecture.png)

Self-hosting Ghostfolio makes sense when holdings sit across several brokers and you want one honest view of them without handing over broker credentials. Everything is manual by design — you enter or import transactions and Ghostfolio only fetches public market data — so the deployment holds your portfolio and nothing that moves money.

Key features:

- Multi-account, multi-currency tracking for stocks, ETFs, funds and cryptocurrencies
- Return on Average Investment across Today, WTD, MTD, YTD, 1Y, 5Y and Max
- Allocation charts by platform, currency, asset class and holding
- X-ray analysis flagging concentration, liquidity and currency cluster risks
- CSV and JSON import and export, plus a full REST API
- Dark mode, Zen mode and an installable progressive web app

One container serves the compiled Angular client and the NestJS API, so there is no separate front end to sync. Postgres holds accounts, activities, symbol profiles and the price history Ghostfolio builds over time. Redis is not optional: the health endpoint checks it, and the asset-profile, market-data and snapshot jobs run through BullMQ queues stored there.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ghostfolio | `ghostfolio/ghostfolio:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | ghostfolio | 0.0.0.0 | Listen address |
| `PORT` | ghostfolio | 3333 | HTTP listening port |
| `REDIS_DB` | ghostfolio | 0 | Redis database index |
| `ROOT_URL` | ghostfolio | - | Absolute public URL |
| `REDIS_HOST` | ghostfolio | - | Redis private hostname |
| `REDIS_PORT` | ghostfolio | - | Redis port |
| `TRUST_PROXY` | ghostfolio | true | Trust the edge for client IPs |
| `DATABASE_URL` | ghostfolio | - | Postgres connection string |
| `NODE_OPTIONS` | ghostfolio | --max-old-space-size=2048 | Cap the Node heap |
| `JWT_SECRET_KEY` | ghostfolio | (secret) | Session token signing key |
| `REDIS_PASSWORD` | ghostfolio | (secret) | Redis auth password |
| `ACCESS_TOKEN_SALT` | ghostfolio | (secret) | Salt for hashing security tokens |
| `ENABLE_FEATURE_RATE_LIMITING` | ghostfolio | true | Throttle sign-in and signup routes |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ghostfolio-railway)
