# Deploy GrowthBook (/w proxy) on Railway

GrowthBook is an open-source platform for feature flagging and A/B testing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/growthbook-with-proxy)

## About

[GrowthBook](https://growthbook.io/) is an open-source platform for feature flagging and A/B testing built for data teams, engineers, and product managers. It's great whether you're looking to just analyze experiment results or looking to make it easier to deploy code.

GrowthBook consists of a NextJS front-end, an ExpressJS API, and a Python stats engine. You will have to configure port forwarding, and set the required variables noted below.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GrowthBook | `growthbook/growthbook` | Web service |
| Redis | `redis:7.2.5` | Database |
| GB Proxy | `growthbook/proxy` | Web service |
| MongoDB | `mongo:7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | GrowthBook | 3000 | - |
| `API_HOST` | GrowthBook | - | Port forwarded domain to 3100 (Required, fill in later) |
| `NODE_ENV` | GrowthBook | production | - |
| `APP_ORIGIN` | GrowthBook | - | Port forwarded domain to 3000 (Required, fill in later) |
| `JWT_SECRET` | GrowthBook | (secret) | - |
| `BACKEND_PORT` | GrowthBook | 3100 | - |
| `PROXY_ENABLED` | GrowthBook | 1 | - |
| `SECRET_API_KEY` | GrowthBook | (secret) | - |
| `GB_STATS_ENGINE_MIN_POOL_SIZE` | GrowthBook | 0 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | GB Proxy | 3300 | - |
| `NODE_ENV` | GB Proxy | production | - |
| `CACHE_ENGINE` | GB Proxy | redis | - |
| `SECRET_API_KEY` | GB Proxy | (secret) | - |
| `PUBLISH_PAYLOAD_TO_CHANNEL` | GB Proxy | true | - |
| `MONGOPORT` | MongoDB | 27017 | - |
| `MONGOPASSWORD` | MongoDB | (secret) | - |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | - |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/local/src/app/packages/back-end/uploads`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/healthcheck`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/growthbook-with-proxy)
