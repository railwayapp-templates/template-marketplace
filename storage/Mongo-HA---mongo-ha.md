# Deploy Mongo HA on Railway

High-availability MongoDB replica set with an HAProxy entry point

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongo-ha)

## About

Mongo HA is a high-availability MongoDB deployment: a three-member replica set with automatic failover behind an HAProxy entry point. If the primary goes down, the remaining members elect a new one and HAProxy routes connections to it within seconds, so your application keeps one connection string across failovers.

Hosting Mongo HA gives you a MongoDB replica set whose elections run inside MongoDB itself, with no separate coordinator tier. Three data nodes (MongoDB-1, MongoDB-2, MongoDB-3) each keep a full copy of the data on their own volume; the HAProxy edge (MongoDB HA) probes every node's role and sends writes only to the current primary. Scaling adds replicas in pairs so the voter count stays odd (3, 5 or 7 members). Railway renders the cluster view, health, backups and scaling for the whole set.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB HA | `ghcr.io/railwayapp-templates/mongo-ha/haproxy:3.2` | Database |
| MongoDB-1 | `ghcr.io/railwayapp-templates/mongo-ha/mongo:8.0` | Database |
| MongoDB-2 | `ghcr.io/railwayapp-templates/mongo-ha/mongo:8.0` | Database |
| MongoDB-3 | `ghcr.io/railwayapp-templates/mongo-ha/mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MONGO_PORT` | MongoDB HA | 27017 |
| `MONGOPASSWORD` | MongoDB HA | (secret) |
| `HAPROXY_MAX_CONN` | MongoDB HA | 10000 |
| `HAPROXY_TIMEOUT_CHECK` | MongoDB HA | 3s |
| `HAPROXY_CHECK_INTERVAL` | MongoDB HA | 3s |
| `HAPROXY_TIMEOUT_CLIENT` | MongoDB HA | 1d |
| `HAPROXY_TIMEOUT_SERVER` | MongoDB HA | 1d |
| `HAPROXY_CHECK_DOWNINTER` | MongoDB HA | 500ms |
| `HAPROXY_CHECK_FASTINTER` | MongoDB HA | 500ms |
| `HAPROXY_TIMEOUT_CONNECT` | MongoDB HA | 10s |
| `RS_NAME` | MongoDB-1 | rs0 |
| `MONGO_PORT` | MongoDB-1 | 27017 |
| `RS_ENABLED` | MongoDB-1 | true |
| `HEALTH_PORT` | MongoDB-1 | 8080 |
| `MONGOPASSWORD` | MongoDB-1 | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB-1 | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB-1 | (secret) |
| `MONGOPASSWORD` | MongoDB-2 | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB-2 | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB-2 | (secret) |
| `MONGOPASSWORD` | MongoDB-3 | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB-3 | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB-3 | (secret) |

## Configuration

- **Volume:** `/data/db`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mongo-ha)
