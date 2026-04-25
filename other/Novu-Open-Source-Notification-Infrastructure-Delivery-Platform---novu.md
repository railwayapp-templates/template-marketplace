# Deploy Novu (Open-Source Notification Infrastructure & Delivery Platform) on Railway

Novu [May ’26] (Multi Notification System for Email, SMS, Push) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/novu)

## About

Novu is an open-source notification infrastructure available on [Novu.co](https://novu.co) and GitHub, built to simplify how developers manage multi-channel notifications like email, SMS, in-app, and push notifications. It’s the open-source alternative to proprietary solutions like OneSignal or Firebase Cloud Messaging, designed for flexibility, scalability, and community-driven innovation.

Self hosting Novu gives you full control over your infrastructure and ensures your customer notification data remains private. You can deploy Novu on your own server or cloud platform using **Novu Docker Compose**, making it easy to scale and manage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ws | `ghcr.io/novuhq/novu/ws:latest` | Web service |
| Web | `ghcr.io/novuhq/novu/web:latest` | Web service |
| API | `ghcr.io/novuhq/novu/api:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| MongoDB | `mongo:8.0` | Database |
| worker | `ghcr.io/novuhq/novu/worker:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ws | 3002 | - |
| `NODE_ENV` | ws | production | - |
| `JWT_SECRET` | ws | (secret) | - |
| `REDIS_DB_INDEX` | ws | 2 | - |
| `REDIS_PASSWORD` | ws | (secret) | - |
| `MONGO_MAX_POOL_SIZE` | ws | 200 | - |
| `MONGO_MIN_POOL_SIZE` | ws | 75 | - |
| `PORT` | Web | 4200 | - |
| `REACT_APP_ENVIRONMENT` | Web | prod | - |
| `REACT_APP_IS_SELF_HOSTED` | Web | true | - |
| `REACT_APP_DOCKER_HOSTED_ENV` | Web | true | - |
| `PORT` | API | 3000 | - |
| `NODE_ENV` | API | production | - |
| `JWT_SECRET` | API | (secret) | - |
| `REDIS_DB_INDEX` | API | 2 | - |
| `REDIS_PASSWORD` | API | (secret) | - |
| `NOVU_SECRET_KEY` | API | (secret) | - |
| `MONGO_MAX_POOL_SIZE` | API | 200 | - |
| `MONGO_MIN_POOL_SIZE` | API | 75 | - |
| `AWS_SECRET_ACCESS_KEY` | API | (secret) | - |
| `DISABLE_USER_REGISTRATION` | API | false | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `PORT` | worker | 3000 | - |
| `NODE_ENV` | worker | production | - |
| `JWT_SECRET` | worker | (secret) | - |
| `REDIS_DB_INDEX` | worker | 2 | - |
| `REDIS_PASSWORD` | worker | (secret) | - |
| `MONGO_MAX_POOL_SIZE` | worker | 200 | - |
| `MONGO_MIN_POOL_SIZE` | worker | 75 | - |
| `AWS_SECRET_ACCESS_KEY` | worker | (secret) | - |
| `DISABLE_USER_REGISTRATION` | worker | false | - |
| `BROADCAST_QUEUE_CHUNK_SIZE` | worker | 100 | - |
| `MULTICAST_QUEUE_CHUNK_SIZE` | worker | 100 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/novu)
