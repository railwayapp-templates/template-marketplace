# Deploy 🚀 MongoDB 8.2.3 Replica on Railway

🚀 Deploy and Host MongoDB 8.2.3 Replica [PRIMARY, SECONDARY, ARBITER]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongodb-823-replica)

## About

MongoDB 8.2.3 Replica Set is a robust high-availability NoSQL database architecture. This template deploys a production-ready PSA (Primary-Secondary-Arbiter) configuration, ensuring data redundancy, automatic failover, and read scalability. It comes pre-configured with secure keyfile authentication and internal networking support, making it ready for mission-critical applications.

Hosting this replica set involves deploying three interconnected service nodes within Railway's private network: a **Primary** node for write operations, a **Secondary** node for data redundancy and read scaling, and a lightweight **Arbiter** node to participate in elections without storage overhead.

The template includes an ephemeral initialization service that automatically configures the replica set members once they are online. This eliminates the complexity of manual CLI configuration. Persistence is handled via Railway volumes attached to the data-bearing nodes, ensuring data safety across deployments. Security is enforced using strict keyfile-based internal authentication.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongo-primary | [icueth/railway-mongodb-3node](https://github.com/icueth/railway-mongodb-3node) (root: /nodes/primary) | Database |
| mongo-arbiter | [icueth/railway-mongodb-3node](https://github.com/icueth/railway-mongodb-3node) (root: /nodes/arbiter) | Worker |
| init | [icueth/railway-mongodb-3node](https://github.com/icueth/railway-mongodb-3node) (root: /initServicePSA) | Worker |
| mongo-secondary | [icueth/railway-mongodb-3node](https://github.com/icueth/railway-mongodb-3node) (root: /nodes/secondary) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `KEYFILE` | mongo-primary | openssl rand -base64 756 | generate key with openssl rand -base64 756 |
| `REPLICA_SET_NAME` | mongo-primary | rs0 | - |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo-primary | (secret) | - |
| `MONGO_INITDB_ROOT_USERNAME` | mongo-primary | (secret) | - |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo-arbiter | (secret) | - |
| `MONGO_INITDB_ROOT_USERNAME` | mongo-arbiter | (secret) | - |
| `MONGO_PORT` | init | 27017 | - |
| `MONGOPASSWORD` | init | (secret) | - |
| `MONGOUSERNAME` | init | (secret) | - |
| `MONGO_ARBITER_HOST` | init | mongo-arbiter.railway.internal | - |
| `MONGO_PRIMARY_HOST` | init | mongo-primary.railway.internal | - |
| `MONGO_SECONDARY_HOST` | init | mongo-secondary.railway.internal | - |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo-secondary | (secret) | - |
| `MONGO_INITDB_ROOT_USERNAME` | mongo-secondary | (secret) | - |

## Configuration

- **TCP Proxies:** 27017
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mongodb-823-replica)
