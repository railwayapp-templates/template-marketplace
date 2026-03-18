# Deploy Ghostfolio on Railway

An open source wealth management software built with web technology

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/koSYWQ)

## About

Ghostfolio is an open source wealth management software built with web technology. The application empowers busy people to keep track of stocks, ETFs or cryptocurrencies and make solid, data-driven investment decisions. The software is designed for personal use in continuous operation.

![Ghostfolio - Screenshot](https://github.com/ghostfolio/ghostfolio/raw/main/apps/client/src/assets/images/screenshot.png)

Ghostfolio is for you if you are...

* 💼 trading stocks, ETFs or cryptocurrencies on multiple platforms
* 🏦 pursuing a buy & hold strategy
* 🎯 interested in getting insights of your portfolio composition
* 👻 valuing privacy and data ownership
* 🧘 into minimalism
* 🧺 caring about diversifying your financial resources
* 🆓 interested in financial independence
* 🙅 saying no to spreadsheets
* 😎 still reading this list

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:15` | Database |
| Redis | `railwayapp/redis` | Database |
| Primary | `ghostfolio/ghostfolio` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `PGHOST_PRIVATE` | Postgres | - | Private host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private database URL |
| `REDISHOST` | Redis | - | Railway Public Domain Name |
| `REDISPORT` | Redis | - | Port to connect to Redis |
| `REDISUSER` | Redis | default | Default user to connect to Redis |
| `REDIS_URL` | Redis | - | URL to connect to Redis |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis |
| `REDISHOST_PRIVATE` | Redis | - | Private domain |
| `REDISPORT_PRIVATE` | Redis | 6379 | Private port |
| `REDIS_PRIVATE_URL` | Redis | - | Private URL |
| `PORT` | Primary | 3333 | The port where the Ghostfolio application will run on |
| `REDIS_HOST` | Primary | - | The host where Redis is running |
| `REDIS_PORT` | Primary | - | ${{Redis.REDISPORT}} |
| `POSTGRES_DB` | Primary | - | The name of the PostgreSQL database |
| `DATABASE_URL` | Primary | - | The database connection URL |
| `POSTGRES_USER` | Primary | (secret) | The user of the PostgreSQL database |
| `JWT_SECRET_KEY` | Primary | (secret) | A random string used for JSON Web Tokens (JWT) |
| `REDIS_PASSWORD` | Primary | (secret) | The password of Redis |
| `ACCESS_TOKEN_SALT` | Primary | (secret) | A random string used as salt for access tokens |
| `POSTGRES_PASSWORD` | Primary | (secret) | The password of the PostgreSQL database |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `/bin/sh -c "sleep 3 && yarn start:production"`
- **Healthcheck:** `/api/admin/site`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/template/koSYWQ)
