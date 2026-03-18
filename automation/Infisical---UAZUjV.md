# Deploy Infisical on Railway

Sync secrets across your team/infrastructure and prevent secret leaks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/UAZUjV)

## About

Infisical is the open source secret management platform that teams use to centralize their secrets like API keys, database credentials, and configurations.

this template deploys everything necessary to run a infisical instance (mongodb and redis) and connects everything.
After it's deployed, you'll need to create an account using the e-mail method at the Infisical UI available at the default deploy URL.

If you need to configure integrations and everything else, here is the .env.example
https://github.com/Infisical/infisical/blob/main/.env.example

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| infisical-backend | `infisical/infisical:latest` | Web service |
| MongoDB | `mongo` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Linking variables |
| `REDISPORT` | Redis | - | linking port |
| `REDISUSER` | Redis | default | default redis user |
| `REDIS_URL` | Redis | - | Redis connection url |
| `REDISPASSWORD` | Redis | (secret) | linking variables |
| `REDIS_PASSWORD` | Redis | (secret) | Default redis password |
| `REDIS_PRIVATE_URL` | Redis | - | Private connection URL |
| `PORT` | infisical-backend | 8080 | default listen port of infisical |
| `NODE_ENV` | infisical-backend | production | set it to production to deploy |
| `SITE_URL` | infisical-backend | - | your url. defaults to railway public domain |
| `MONGO_URL` | infisical-backend | - | MongoDB connection URL |
| `REDIS_URL` | infisical-backend | - | Redis connection url |
| `AUTH_SECRET` | infisical-backend | (secret) | default auth secret used by infisical |
| `ENCRYPTION_KEY` | infisical-backend | - | default encryption key |
| `MONGO_PASSWORD` | infisical-backend | (secret) | MongoDB password |
| `MONGO_USERNAME` | infisical-backend | (secret) | mongodb username |
| `MONGOHOST` | MongoDB | - | TCP DOMAIN |
| `MONGOPORT` | MongoDB | - | TPC PROXY PORT |
| `MONGOUSER` | MongoDB | - | Linking username |
| `MONGO_URL` | MongoDB | - | mongo connection url |
| `MONGOPASSWORD` | MongoDB | (secret) | Linking password variable |
| `MONGO_PRIVATE_URL` | MongoDB | - | mongo private connection url |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | mongodb root password |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | default mongo user |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/UAZUjV)
