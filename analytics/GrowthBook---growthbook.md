# Deploy GrowthBook on Railway

GrowthBook is an open-source platform for feature flagging and A/B testing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/growthbook)

## About

[GrowthBook](https://growthbook.io/) is an open-source platform for feature flagging and A/B testing built for data teams, engineers, and product managers. It's great whether you're looking to just analyze experiment results or looking to make it easier to deploy code.

GrowthBook consists of a NextJS front-end, an ExpressJS API, and a Python stats engine. You will have to configure port forwarding, and set the required variables noted below.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:7` | Database |
| GrowthBook | `growthbook/growthbook` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOPORT` | MongoDB | 27017 | - |
| `MONGOPASSWORD` | MongoDB | (secret) | - |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | - |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | - |
| `PORT` | GrowthBook | 3000 | - |
| `API_HOST` | GrowthBook | - | Port forwarded domain to 3100 (Required, fill in later) |
| `NODE_ENV` | GrowthBook | production | - |
| `APP_ORIGIN` | GrowthBook | - | Port forwarded domain to 3000 (Required, fill in later) |
| `JWT_SECRET` | GrowthBook | (secret) | - |
| `BACKEND_PORT` | GrowthBook | 3100 | - |
| `SECRET_API_KEY` | GrowthBook | (secret) | - |
| `GB_STATS_ENGINE_MIN_POOL_SIZE` | GrowthBook | 0 | Setting this variable to `0` ensures the stats engine only starts a Python instance when required, saving memory. |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/local/src/app/packages/back-end/uploads`

**Category:** Analytics

[View on Railway →](https://railway.com/template/growthbook)
