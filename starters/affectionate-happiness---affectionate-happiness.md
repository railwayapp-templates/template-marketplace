# Deploy affectionate-happiness on Railway

TanStack Start with MongoDB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/affectionate-happiness)

## About

This template spins up a TanStack Start application connected to a MongoDB backend, pre-populated with some baseball scores. But you can change that to whatever you like.

You'll need to clone the repository and then deploy it to Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:7` | Database |
| railway-start | [jherr/railway-start](https://github.com/jherr/railway-start) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `HOST` | railway-start | :: | - |
| `PORT` | railway-start | 3000 | - |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Start command:** `npm run start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS

[View on Railway →](https://railway.com/deploy/affectionate-happiness)
