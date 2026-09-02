# Deploy GrowthBook on Railway

Feature flags, experimentation, product analytics, SDK edge proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/growthbook-analytics)

## About

GrowthBook is an open-source feature flagging and A/B testing platform. Product and engineering teams use it to ship code behind flags, roll changes out to a percentage of users, and measure the result against metrics defined in their own data warehouse — instead of paying per seat for a tool that keeps the numbers elsewhere. It ships 24 SDKs, a stats engine with CUPED, sequential testing and Bayesian analysis, and a product-analytics suite. Every query runs against your warehouse, so it never needs a copy of your event data.

This template runs the whole platform, not just the app container. Deploy GrowthBook on Railway and you get the web app and API, a jobs server owning scheduled work and the Python stats engine, a GrowthBook Proxy with a Redis cache serving SDK payloads, MongoDB for application state, and object storage for uploads. A Caddy gateway sits in front so the front-end and API share one origin, which is what keeps authentication working on a Railway domain. The only thing left to bring is a warehouse connection.

![Railway diagram of six GrowthBook services and datastores](https://res.cloudinary.com/rroe4rtk/image/upload/v1788285344/growthbook-architecture.png)

Feature flagging and experimentation are usually sold as two products, both charging by seat or tracked user. GrowthBook merges them and inverts the data model: flags are evaluated in your application by an SDK, and experiment results come from SQL run against the warehouse you already own. Self-hosting suits teams with data-residency rules or user counts that make per-MTU pricing painful.

Key features:

- Targeting attributes, saved groups, prerequisites and percentage rollouts per environment
- Bayesian and frequentist analysis, CUPED, sequential testing, bandits and SRM checks
- Warehouse-native metrics as SQL or fact tables, with caching and scheduled refreshes
- Product analytics: funnels, dashboards, saved SQL reports and correlations
- A REST API, webhooks, an MCP server and importers for LaunchDarkly and Statsig

The architecture splits cleanly. `growthbook` answers browser and SDK requests. `growthbook-jobs` runs the background job queue, scheduled refreshes and the Python stats engine, so a heavy analysis never slows the dashboard. `growthbook-proxy` caches payloads in Redis and pushes updates over Server-Sent Events, so flag changes reach clients in real time. MongoDB holds all application state and the bucket holds uploaded images, which keeps every app container stateless.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| growthbook-proxy | `growthbook/proxy:latest` | Web service |
| MongoDB | `mongo:8.0` | Database |
| Redis | `redis:8.2` | Database |
| gateway | [gridalpha/growthbook-railway](https://github.com/gridalpha/growthbook-railway) | Web service |
| growthbook | `growthbook/growthbook:5.0.1` | Worker |
| growthbook-jobs | `growthbook/growthbook:5.0.1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | growthbook-proxy | 3300 | Proxy listening port |
| `NODE_ENV` | growthbook-proxy | production | Hides debug logging |
| `PRIVATE_URL` | growthbook-proxy | http://growthbook-proxy.railway.internal:3300 | Private address for peers |
| `CACHE_ENGINE` | growthbook-proxy | redis | Shared cache backend |
| `SECRET_API_KEY` | growthbook-proxy | (secret) | Read-only key used to fetch payloads |
| `GROWTHBOOK_API_HOST` | growthbook-proxy | - | Private GrowthBook API address |
| `CACHE_CONNECTION_URL` | growthbook-proxy | - | Redis connection string |
| `MONGOHOST` | MongoDB | - | Data panel alias, not read by the server |
| `MONGOPORT` | MongoDB | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | MongoDB | - | Data panel alias, not read by the server |
| `MONGO_URL` | MongoDB | - | Private connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root password, read by the server |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root user created on first boot |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | gateway | 8080 | Caddy listening port |
| `GROWTHBOOK_API_UPSTREAM` | gateway | - | Express API upstream |
| `GROWTHBOOK_APP_UPSTREAM` | gateway | - | Next.js front-end upstream |
| `PORT` | growthbook | 3000 | Next.js front-end port |
| `API_HOST` | growthbook | - | Public API base path |
| `NODE_ENV` | growthbook | production | Enables production checks and logging |
| `S3_BUCKET` | growthbook | - | Uploads bucket name |
| `S3_DOMAIN` | growthbook | - | Base URL for stored files |
| `S3_REGION` | growthbook | - | Bucket region |
| `APP_ORIGIN` | growthbook | - | Public front-end origin |
| `JWT_SECRET` | growthbook | (secret) | Session signing key |
| `MONGODB_URI` | growthbook | - | Application database |
| `S3_ENDPOINT` | growthbook | - | S3-compatible endpoint, forces path style |
| `BACKEND_PORT` | growthbook | 3100 | Express API port, must differ from PORT |
| `NODE_OPTIONS` | growthbook | --max-old-space-size=2048 | Cap the Node heap |
| `CRON_DISABLED` | growthbook | true | Scheduled jobs run on growthbook-jobs |
| `PROXY_ENABLED` | growthbook | 1 | Enable GrowthBook Proxy integration |
| `UPLOAD_METHOD` | growthbook | s3 | Store uploads in object storage |
| `ENCRYPTION_KEY` | growthbook | - | Data-source credential encryption |
| `SECRET_API_KEY` | growthbook | (secret) | Read-only REST API key |
| `PM2_AUTORESTART` | growthbook | true | Restart a crashed app process |
| `PRIVATE_API_URL` | growthbook | http://growthbook.railway.internal:3100 | Private API address for peers |
| `PRIVATE_APP_URL` | growthbook | http://growthbook.railway.internal:3000 | Private front-end address for peers |
| `AWS_ACCESS_KEY_ID` | growthbook | - | Bucket access key |
| `PROXY_HOST_PUBLIC` | growthbook | - | Proxy URL shown to SDKs |
| `PROXY_HOST_INTERNAL` | growthbook | - | Private cache-invalidation URL |
| `AWS_SECRET_ACCESS_KEY` | growthbook | (secret) | Bucket secret key |
| `EXPRESS_TRUST_PROXY_OPTS` | growthbook | true | Trust proxy headers for client IPs |
| `PYTHON_SERVER_AUTH_TOKEN` | growthbook | (secret) | Bearer token for the stats endpoint |
| `EXTERNAL_PYTHON_SERVER_URL` | growthbook | - | Remote stats engine |
| `GB_STATS_ENGINE_MIN_POOL_SIZE` | growthbook | 0 | No local Python workers |
| `PORT` | growthbook-jobs | 3000 | Next.js front-end port |
| `API_HOST` | growthbook-jobs | - | Public API base path |
| `NODE_ENV` | growthbook-jobs | production | Enables production checks and logging |
| `S3_BUCKET` | growthbook-jobs | - | Uploads bucket name |
| `S3_DOMAIN` | growthbook-jobs | - | Base URL for stored files |
| `S3_REGION` | growthbook-jobs | - | Bucket region |
| `APP_ORIGIN` | growthbook-jobs | - | Public front-end origin |
| `JWT_SECRET` | growthbook-jobs | (secret) | Must match the app service |
| `MONGODB_URI` | growthbook-jobs | - | Application database |
| `S3_ENDPOINT` | growthbook-jobs | - | S3-compatible endpoint, forces path style |
| `BACKEND_PORT` | growthbook-jobs | 3100 | Express API port, must differ from PORT |
| `NODE_OPTIONS` | growthbook-jobs | --max-old-space-size=2048 | Cap the Node heap |
| `PROXY_ENABLED` | growthbook-jobs | 1 | Enable GrowthBook Proxy integration |
| `UPLOAD_METHOD` | growthbook-jobs | s3 | Store uploads in object storage |
| `ENCRYPTION_KEY` | growthbook-jobs | - | Must match the app service |
| `SECRET_API_KEY` | growthbook-jobs | (secret) | Must match the app service |
| `PM2_AUTORESTART` | growthbook-jobs | true | Restart a crashed app process |
| `PRIVATE_API_URL` | growthbook-jobs | http://growthbook-jobs.railway.internal:3100 | Private stats address for peers |
| `AWS_ACCESS_KEY_ID` | growthbook-jobs | - | Bucket access key |
| `PROXY_HOST_PUBLIC` | growthbook-jobs | - | Proxy URL shown to SDKs |
| `PYTHON_SERVER_MODE` | growthbook-jobs | true | Exposes the /stats endpoint |
| `PROXY_HOST_INTERNAL` | growthbook-jobs | - | Private cache-invalidation URL |
| `AWS_SECRET_ACCESS_KEY` | growthbook-jobs | (secret) | Bucket secret key |
| `EXPRESS_TRUST_PROXY_OPTS` | growthbook-jobs | true | Trust proxy headers for client IPs |
| `PYTHON_SERVER_AUTH_TOKEN` | growthbook-jobs | (secret) | Must match the app service |
| `GB_STATS_ENGINE_POOL_SIZE` | growthbook-jobs | 8 | Python worker pool size |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Healthcheck:** `/api/init`

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/growthbook-analytics)
