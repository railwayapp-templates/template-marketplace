# Deploy Coral Talk on Railway

Open Source Commenting Platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/coral-talk)

## About

**Coral Talk** is an open-source community discussion and commenting platform originally built to power large-scale publisher communities. It provides real-time conversations, moderation tools, user authentication, and extensible APIs, making it suitable for media sites, blogs, and content-driven platforms that want high-quality engagement.

Hosting Coral Talk involves running the Coral application alongside its required data services. Coral relies on **MongoDB** for primary data storage and **Redis** for caching, queues, and real-time functionality. On Railway, this setup maps cleanly to a multi-service deployment: one application service plus managed MongoDB and Redis services. Environment variables are used to wire services together, while Railway handles networking, scaling, restarts, and secrets management. No manual infrastructure provisioning or VM management is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Coral Talk | `coralproject/talk` | Web service |
| Redis | `redis:8.2.1` | Database |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SIGNING_SECRET` | Coral Talk | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `MONGOPORT` | MongoDB | 27017 |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Other

[View on Railway →](https://railway.com/template/coral-talk)
