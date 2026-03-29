# Deploy Mongo Express on Railway

A lightweight web-based admin tool for MongoDB databases.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/P7J0lk)

## About

Mongo Express is an open-source, web-based administrative interface for MongoDB built with Node.js, Express, and Bootstrap. It lets you manage databases, collections, and documents through a clean browser UI — no MongoDB client installation required.

Hosting Mongo Express gives you a persistent, private web UI for managing any MongoDB instance — whether that's a Railway-provisioned MongoDB database or an external connection string. This template deploys the official Mongo Express Docker image alongside a sample MongoDB instance so you can test the interface immediately. The web UI is protected by a username and password configured at deploy time. Allow 1–2 minutes after deployment for both services to initialise before accessing the interface.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo` | Database |
| mongo-express | `mongo-express` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Railway TCP Proxy Domain. |
| `MONGOPORT` | MongoDB | - | Mongodb TCP Proxy port. |
| `MONGOUSER` | MongoDB | - | Mongodb user, used for the Data panel. |
| `MONGO_URL` | MongoDB | - | URL to connect to MongoDB, used for Data panel. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password, used for Data panel. |
| `MONGO_PRIVATE_URL` | MongoDB | - | URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `PORT` | mongo-express | 8081 | mongo-express port |
| `MONGOHOST` | mongo-express | - | mongo host |
| `MONGOPORT` | mongo-express | - | mongo port |
| `MONGOUSER` | mongo-express | - | mongo user |
| `MONGO_URL` | mongo-express | - | mongo url |
| `MONGOPASSWORD` | mongo-express | (secret) | mongo password |
| `ME_CONFIG_MONGODB_URL` | mongo-express | - | MongoDB connection URL |
| `ME_CONFIG_BASICAUTH_PASSWORD` | mongo-express | (secret) | mongo-express web password |
| `ME_CONFIG_BASICAUTH_USERNAME` | mongo-express | (secret) | mongo-express web username |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/P7J0lk)
