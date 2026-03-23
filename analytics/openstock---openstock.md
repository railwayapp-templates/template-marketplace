# Deploy openstock on Railway

OpenStock is an open-source stock monitor platform built with Next.js

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openstock)

## About

[OpenStock](https://github.com/Open-Dev-Society/OpenStock) is an open-source stock market web app built with Next.js 15, Better Auth, and MongoDB. It provides watchlists, stock search, news, and chart widgets, plus optional automated email flows through Inngest.

On Railway, the recommended architecture is two services:

- **OpenStock app service** (Next.js runtime)
- **MongoDB service** (managed Mongo database)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openstock | `xiaosong233/openstock:railway-latest` | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | openstock | 3000 |
| `NODE_ENV` | openstock | production |
| `AI_PROVIDER` | openstock | gemini |
| `GEMINI_API_KEY` | openstock | (secret) |
| `FINNHUB_BASE_URL` | openstock | https://finnhub.io/api/v1 |
| `BETTER_AUTH_SECRET` | openstock | (secret) |
| `NODEMAILER_PASSWORD` | openstock | (secret) |
| `NEXT_PUBLIC_FINNHUB_API_KEY` | openstock | (secret) |
| `MONGOPORT` | MongoDB | 27017 |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/openstock)
