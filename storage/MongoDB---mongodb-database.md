# Deploy MongoDB on Railway

Self-hosted NoSQL database for apps, APIs, and backend services.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongodb-database)

## About

MongoDB is a flexible NoSQL document database designed for modern applications, APIs, backend services, event-driven systems, and workloads that benefit from JSON-like document storage. It provides indexing, aggregation, transactions, replication capabilities, and a flexible schema model for rapidly evolving applications.

Hosting MongoDB on Railway gives you a persistent document database without manually managing a virtual machine, operating system, package installation, or database server lifecycle.

This template runs the official `mongo:latest` Docker image and stores database files on a persistent Railway volume.

Applications inside the same Railway project can connect through Railway private networking on port `27017`, while external database clients can connect through Railway TCP Proxy.

Authentication is enabled using a generated administrator username and password, providing a protected baseline for both internal and external database connections.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongo | `mongo:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MONGOHOST` | - | Public TCP proxy hostname for external MongoDB connections |
| `MONGOPORT` | - | Public TCP proxy port |
| `MONGOUSER` | - | MongoDB username used by clients |
| `MONGO_URL` | - | Public MongoDB connection URL |
| `MONGODATABASE` | - | Default application database name |
| `MONGOPASSWORD` | (secret) | MongoDB password used by clients |
| `MONGOHOST_PRIVATE` | - | Private Railway hostname for internal MongoDB connections |
| `MONGOPORT_PRIVATE` | 27017 | Internal MongoDB TCP port |
| `MONGO_URL_PRIVATE` | - | Private MongoDB connection URL |
| `MONGO_INITDB_DATABASE` | app | Default database used by initialization scripts |
| `MONGO_INITDB_ROOT_PASSWORD` | (secret) | Root administrator password created on first startup |
| `MONGO_INITDB_ROOT_USERNAME` | (secret) | Root administrator username created on first startup |

## Configuration

- **Start command:** `mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mongodb-database)
