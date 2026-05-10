# Deploy RESTHeart on Railway

Deploy and Host RESTHeart + MongoDB with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/restheart)

## About

RESTHeart is a backend framework for MongoDB that instantly exposes REST, GraphQL, and WebSocket APIs on your database — with built-in authentication and authorization. No code required for standard CRUD operations.

Hosting RESTHeart involves running two services: the RESTHeart API server and a MongoDB database. RESTHeart connects to MongoDB at startup and immediately exposes your collections as HTTP endpoints. The two services communicate over Railway's private network, keeping MongoDB inaccessible from the public internet. RESTHeart handles all authentication, authorization, and API logic, so you can focus on building your application rather than managing backend infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| restheart-railway-mongodb | [SoftInstigate/restheart-railway-mongodb](https://github.com/SoftInstigate/restheart-railway-mongodb) | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGO_URI` | restheart-railway-mongodb | - | MongoDB connection URI |
| `RESTHEART_ADMIN_USER` | restheart-railway-mongodb | (secret) | RESTHeart super user |
| `RESTHEART_ADMIN_PASSWORD` | restheart-railway-mongodb | (secret) | RESTHeart admin password |
| `MONGO_INITDB_ROOT_PASSWORD` | restheart-railway-mongodb | (secret) | MongoDB root user password, auto-generated at deploy time. |
| `MONGO_INITDB_ROOT_USERNAME` | restheart-railway-mongodb | (secret) | MongoDB root username used by RESTHeart to connect to the database. |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Starters · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/restheart)
