# Deploy OpenMonetize on Railway

Open-source AI usage metering and billing platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/openmonetize)

## About

OpenMonetize is an open-source, offline-first AI monetization infrastructure. It provides precise token metering, real-time credit management, and usage-based billing for LLM applications. It supports major providers like OpenAI and Anthropic, enabling developers to easily monetize their AI products with a drop-in SDK and comprehensive dashboard.

Hosting OpenMonetize involves deploying a set of microservices and data stores. The architecture consists of an API Gateway for handling requests, a high-throughput Ingestion Service for tracking usage events, and a Rating Engine for calculating costs. These services rely on a PostgreSQL database for persistent storage of customer and ledger data, and Redis for high-speed caching, rate limiting, and event queuing. Deploying on Railway simplifies this by orchestrating these interconnected components, ensuring they can communicate securely and scale independently to handle production traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| API Gateway | [openmonetize/openmonetize](https://github.com/openmonetize/openmonetize) (root: /platform) | Web service |
| Rating Engine | [openmonetize/openmonetize](https://github.com/openmonetize/openmonetize) (root: /platform) | Worker |
| Dashboard | [openmonetize/openmonetize](https://github.com/openmonetize/openmonetize) (root: platform) | Web service |
| Ingestion Service | [openmonetize/openmonetize](https://github.com/openmonetize/openmonetize) (root: /platform) | Worker |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | API Gateway | - | The host the API Gateway binds to |
| `PORT` | API Gateway | - | The port the API Gateway listens on |
| `NODE_ENV` | API Gateway | - | NODE_ENV of the project |
| `REDIS_URL` | API Gateway | - | The connection string for Redis |
| `DATABASE_URL` | API Gateway | - | The connection string for the PostgreSQL database |
| `RATE_LIMIT_MAX` | API Gateway | - | Maximum number of requests per window |
| `PUBLIC_DOCS_URL` | API Gateway | - | URL to public documentation |
| `RATE_LIMIT_WINDOW` | API Gateway | 1 minute | Time window for rate limiting (e.g. '1 minute') |
| `RATING_SERVICE_URL` | API Gateway | - | The internal URL of the Rating Engine |
| `INGESTION_SERVICE_URL` | API Gateway | - | The internal URL of the Ingestion Service |
| `HOST` | Rating Engine | 0.0.0.0 | he host the Rating Engine binds to |
| `PORT` | Rating Engine | 3000 | The port the Dashboard listens on |
| `NODE_ENV` | Rating Engine | - | Node environment |
| `LOG_LEVEL` | Rating Engine | info | Logging level (debug, info, warn, error) |
| `REDIS_URL` | Rating Engine | - | The connection string for Redis |
| `DATABASE_URL` | Rating Engine | - | The connection string for the PostgreSQL database |
| `NEXTAUTH_SECRET` | Dashboard | (secret) | Secret used to encrypt session data |
| `GOOGLE_CLIENT_ID` | Dashboard | - | Google OAuth Client I |
| `NEXT_PUBLIC_API_URL` | Dashboard | - | The public URL of the API Gateway |
| `GOOGLE_CLIENT_SECRET` | Dashboard | (secret) | Google OAuth Client Secret |
| `HOST` | Ingestion Service | 0.0.0.0 | The host the API Gateway binds to |
| `PORT` | Ingestion Service | 3002 | The port the Ingestion Service listens on |
| `NODE_ENV` | Ingestion Service | - | Running environment |
| `REDIS_URL` | Ingestion Service | - | The connection string for Redis |
| `QUEUE_NAME` | Ingestion Service | usage-events | Name of the Redis queue for usage events |
| `DATABASE_URL` | Ingestion Service | - | The connection string for the PostgreSQL database |
| `RATE_LIMIT_MAX` | Ingestion Service | 60 | Maximum number of requests per window |
| `QUEUE_CONCURRENCY` | Ingestion Service | 10 | Number of concurrent queue consumers |
| `RATE_LIMIT_WINDOW_MS` | Ingestion Service | 60000 | Time window for rate limiting in milliseconds |
| `REDISHOST` | Redis | - | The Redis password |
| `REDISPORT` | Redis | 6379 | The port Redis listens on |
| `REDISUSER` | Redis | default | The Redis user |
| `REDIS_URL` | Redis | - | The connection string for Redis |
| `REDIS_PASSWORD` | Redis | (secret) | The Redis password |
| `POSTGRES_DB` | Postgres | railway | The PostgreSQL database name |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `npm run start:api`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `npm run start:rating`
- **Start command:** `npm start --workspace=dashboard`
- **Start command:** `npm run start:ingestion`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Python, TypeScript, Shell, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/openmonetize)
