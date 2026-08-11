# Deploy Mix Space Core on Railway

A modern personal website backend server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mix-space-core)

## About

Mix Space Core is a modern backend server for personal websites built with Node.js. It provides RESTful APIs for personal websites, blogs, and content management workflows. The application includes MongoDB database support, Redis caching, JWT authentication, and content management capabilities for building and powering a personal website backend.

Hosting Mix Space Core on Railway involves deploying the application together with MongoDB and Redis as three services within the same Railway project. The Mix Space Core service runs on port `2333` and communicates with MongoDB and Redis through Railway's private networking. MongoDB requires persistent storage mounted at `/data/db`, while Redis uses a volume mounted at `/data`. The application also uses `/root/.mx-space` for its own persistent data. Railway provides the public HTTP endpoint for the API while keeping the database and Redis services private. JWT authentication requires a secure secret, and CORS origins can be configured through the `ALLOWED_ORIGINS` variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mx-server | `innei/mx-server:latest` | Web service |
| MongoDB | `mongo:8.0` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | mx-server | Asia/Shanghai | - |
| `HOST` | mx-server | 0.0.0.0 | - |
| `PORT` | mx-server | 2333 | - |
| `NODE_ENV` | mx-server | production | - |
| `JWT_SECRET` | mx-server | (secret) | - |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/mix-space-core)
