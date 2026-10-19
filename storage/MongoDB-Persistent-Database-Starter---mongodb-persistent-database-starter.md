# Deploy MongoDB Persistent Database Starter on Railway

Private MongoDB with generated admin authentication and durable storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongodb-persistent-database-starter)

## About

Private MongoDB with generated admin authentication and durable storage.

This deployment fork provisions MongoDB. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo@sha256:4a4ab5d4834207389e0d7270fac988e21ffedccecba77991a552f755df229907` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MONGOHOST` | - | Railway Private Domain Name. |
| `MONGOPORT` | 27017 | MongoDB Port. |
| `MONGOUSER` | - | Mongodb user. |
| `MONGO_URL` | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | (secret) | Root password. |
| `MONGO_INITDB_ROOT_PASSWORD` | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | (secret) | User created during initialization, given the root role. |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mongodb-persistent-database-starter)
