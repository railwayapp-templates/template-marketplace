# Deploy Checkmate Production on Railway

Open-source uptime monitoring with incidents and public status pages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/checkmate-production)

## About

Checkmate is an open-source, self-hosted infrastructure monitoring platform for tracking website and API uptime, response times, incidents, and public status pages. This template deploys Checkmate with an authenticated MongoDB 8 database, private networking, persistent storage, generated secrets, health checks, and graceful deployment draining.

Hosting Checkmate requires the application, MongoDB, durable database storage, a public application URL, and secure internal database connectivity. This Railway template exposes Checkmate on port 52345, creates its public domain automatically, connects it privately to MongoDB, persists database files at `/data/db`, generates database and JWT credentials, checks `/api/v1/health`, and allows 60 seconds for graceful shutdown during redeployments. After deployment, open the generated Checkmate domain to create the first account, sign in, add monitors, and publish status pages.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| Checkmate | `ghcr.io/bluewave-labs/checkmate@sha256:43bcd82002f25fec003fcd5b850ec69106eae5624ad806322be9084af16bdb0a` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGO_URL` | MongoDB | - | Private authenticated connection URL used by Checkmate. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Randomly generated password for the MongoDB root user. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Username for the MongoDB root user. |
| `PORT` | Checkmate | 52345 | Port used by Checkmate and Railway public networking. |
| `NODE_ENV` | Checkmate | production | Enable production behavior and rate limits. |
| `JWT_SECRET` | Checkmate | (secret) | Randomly generated secret used to sign authentication tokens. |
| `CLIENT_HOST` | Checkmate | - | Public URL used for CORS, emails, invitations, and status pages. |
| `DB_CONNECTION_STRING` | Checkmate | - | Private authenticated connection to the MongoDB database. |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/checkmate-production)
