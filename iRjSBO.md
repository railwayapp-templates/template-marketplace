# Deploy rePay on Railway

Remix Frontend + PayloadCMS on MongoDB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/iRjSBO)

## About

This template allows you to quickstart a [Remix](https://remix.run) site with a [PayloadCMS](https://payloadcms.com) backend. No configuration needed.

# Develop Locally

install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and run `docker compose up`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| repay | [linobino1/repay](https://github.com/linobino1/repay) | Web service |
| MongoDB | `mongo` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MEDIA_DIR` | repay | /home/node/media | - |
| `MONGODB_NAME` | repay | repay | - |
| `PAYLOAD_SECRET` | repay | (secret) | - |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Start command:** `yarn start`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/media`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Starters · **Languages:** TypeScript, JavaScript, Dockerfile, CSS

[View on Railway →](https://railway.com/template/iRjSBO)
