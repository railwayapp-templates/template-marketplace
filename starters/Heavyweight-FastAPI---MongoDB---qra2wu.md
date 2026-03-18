# Deploy Heavyweight (FastAPI) - MongoDB  on Railway

FastAPI template for large projects which uses mongodb

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qra2wu)

## About

**Heavyweight (FastAPI) - MongoDB** is a production-grade backend template using FastAPI and MongoDB, built for developers who want modularity, performance, and simplicity. Designed by GrandGale Technologies, it supports async operations, auto collection/index setup, and optional Logfire observability—all with a clean structure ready for scale.

Hosting this project on Railway means you get plug-and-play cloud deployment without babysitting servers. The template auto-connects to MongoDB and handles schema/index initialization. Add your `MONGODB_URL` as an environment variable, and (optionally) a `LOGFIRE_TOKEN` to enable observability out of the box. Whether you're testing, staging, or pushing to production, deploying to Railway keeps your DevOps footprint minimal while enabling instant scaling and fast iteration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:7` | Database |
| Heavyweight - MongoDB | [GrandGaleTechnologies/heavyweight-mongodb](https://github.com/GrandGaleTechnologies/heavyweight-mongodb) | Web service |

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
| `DEBUG` | Heavyweight - MongoDB | false | Indicator for if the app is in debug mode or not |
| `MONGODB_URL` | Heavyweight - MongoDB | - | The MongoDB url |
| `LOGFIRE_TOKEN` | Heavyweight - MongoDB | (secret) | Optional pydantic logfire write token if you want to connect with it |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/qra2wu)
