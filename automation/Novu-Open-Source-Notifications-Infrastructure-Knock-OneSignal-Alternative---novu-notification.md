# Deploy Novu | Open-Source Notifications Infrastructure, Knock & OneSignal Alternative on Railway

Self Host Novu. Email, SMS, push, in-app, Slack, Teams & more channels

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/novu-notification)

## About

Deploy Novu on Railway to get a fully self-hosted notification infrastructure with a unified API for email, SMS, push, in-app, and chat notifications. Self-host Novu on Railway and own your notification data while integrating with providers like SendGrid, Twilio, Firebase Cloud Messaging, Slack, and Microsoft Teams.

This Railway template pre-configures six services — Novu API (`ghcr.io/novuhq/novu/api:3.15.0`), Novu Worker, Novu WebSocket server, Novu Dashboard, MongoDB for data persistence, and Redis for queue management and caching — all wired together with proper cross-service references so you can start building notification workflows immediately.

![Novu Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776660975/Novu_railway_architecture_vgdgbk.png)

Novu is an open-source notification infrastructure platform (MIT license) that provides a unified API and visual dashboard for managing multi-channel notifications. It solves the problem of building and maintaining notification systems from scratch — routing logic, template management, subscriber preferences, delivery tracking, and retry handling.

Key features:
- **Multi-channel delivery** — email, SMS, push, in-app inbox, Slack, Teams, Discord, WhatsApp
- **Visual workflow editor** — drag-and-drop notification flow builder with conditions, delays, and digest
- **In-app notification center** — embeddable React/Angular/Vue inbox component
- **Subscriber preference management** — users control which channels they receive notifications on
- **Content management** — template editor with variable interpolation and i18n support
- **Delivery observability** — track notification status, delivery rates, and failures

The architecture consists of an API server handling REST endpoints, a Worker service processing the notification queue asynchronously, a WebSocket server for real-time in-app delivery, and a Dashboard SPA for visual management.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Novu-Dashboard | `ghcr.io/novuhq/novu/dashboard:3.15.0` | Web service |
| MongoDB | `mongo:8.0` | Database |
| Novu-Worker | `ghcr.io/novuhq/novu/worker:3.15.0` | Worker |
| Novu-API | `ghcr.io/novuhq/novu/api:3.15.0` | Web service |
| Redis | `redis:8.2.1` | Database |
| Novu-WS | `ghcr.io/novuhq/novu/ws:3.15.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `VITE_API_HOSTNAME` | Novu-Dashboard | - | API URL for frontend |
| `VITE_WEBSOCKET_HOSTNAME` | Novu-Dashboard | - | WS URL for frontend |
| `MONGOHOST` | MongoDB | - | MongoDB internal hostname |
| `MONGOPORT` | MongoDB | 27017 | MongoDB service port |
| `MONGOUSER` | MongoDB | - | MongoDB username reference |
| `MONGO_URL` | MongoDB | - | Internal MongoDB connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | MongoDB password reference |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public MongoDB connection URL |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password credential |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Default MongoDB root username |
| `PORT` | Novu-Worker | 3004 | Worker health check port |
| `NODE_ENV` | Novu-Worker | production | Runtime environment |
| `MONGO_URL` | Novu-Worker | - | MongoDB connection |
| `S3_REGION` | Novu-Worker | us-east-1 | S3 region |
| `REDIS_HOST` | Novu-Worker | - | Redis hostname |
| `REDIS_PORT` | Novu-Worker | - | Redis port |
| `API_ROOT_URL` | Novu-Worker | - | Internal API URL |
| `IS_SELF_HOSTED` | Novu-Worker | true | Enable self-hosted mode |
| `REDIS_DB_INDEX` | Novu-Worker | 2 | Redis database index |
| `REDIS_PASSWORD` | Novu-Worker | (secret) | Redis auth password |
| `S3_BUCKET_NAME` | Novu-Worker | novu-local | S3 bucket name |
| `NEW_RELIC_ENABLED` | Novu-Worker | false | Disable New Relic APM |
| `MONGO_MAX_POOL_SIZE` | Novu-Worker | 10 | Max MongoDB connections |
| `MONGO_MIN_POOL_SIZE` | Novu-Worker | 5 | Min MongoDB connections |
| `STORE_ENCRYPTION_KEY` | Novu-Worker | - | Shared encryption key |
| `REDIS_CACHE_SERVICE_HOST` | Novu-Worker | - | Cache Redis host |
| `REDIS_CACHE_SERVICE_PORT` | Novu-Worker | - | Cache Redis port |
| `BROADCAST_QUEUE_CHUNK_SIZE` | Novu-Worker | 100 | Broadcast batch size |
| `MULTICAST_QUEUE_CHUNK_SIZE` | Novu-Worker | 100 | Multicast batch size |
| `SUBSCRIBER_WIDGET_JWT_EXPIRATION_TIME` | Novu-Worker | 15d | Widget token TTL |
| `PORT` | Novu-API | 3000 | API server listening port |
| `NODE_ENV` | Novu-API | production | Runtime environment |
| `MONGO_URL` | Novu-API | - | MongoDB connection |
| `S3_REGION` | Novu-API | us-east-1 | S3 region |
| `JWT_SECRET` | Novu-API | (secret) | JWT signing key |
| `REDIS_HOST` | Novu-API | - | Redis hostname |
| `REDIS_PORT` | Novu-API | - | Redis port |
| `API_ROOT_URL` | Novu-API | - | Public API base URL |
| `IS_V2_ENABLED` | Novu-API | true | Enable v2 API features |
| `FRONT_BASE_URL` | Novu-API | - | Dashboard URL for CORS |
| `IS_SELF_HOSTED` | Novu-API | true | Enable self-hosted mode |
| `REDIS_DB_INDEX` | Novu-API | 2 | Redis database index |
| `REDIS_PASSWORD` | Novu-API | (secret) | Redis auth password |
| `S3_BUCKET_NAME` | Novu-API | novu-local | S3 bucket name |
| `NOVU_SECRET_KEY` | Novu-API | (secret) | Internal API secret |
| `NEW_RELIC_ENABLED` | Novu-API | false | Disable New Relic APM |
| `MONGO_MAX_POOL_SIZE` | Novu-API | 10 | Max MongoDB connections |
| `MONGO_MIN_POOL_SIZE` | Novu-API | 5 | Min MongoDB connections |
| `STORE_ENCRYPTION_KEY` | Novu-API | - | Provider credential encryption |
| `REDIS_CACHE_SERVICE_HOST` | Novu-API | - | Cache Redis host |
| `REDIS_CACHE_SERVICE_PORT` | Novu-API | - | Cache Redis port |
| `MONGO_AUTO_CREATE_INDEXES` | Novu-API | true | Auto-create indexes on startup |
| `IS_API_IDEMPOTENCY_ENABLED` | Novu-API | false | API idempotency control |
| `STEP_RESOLVER_DISPATCH_URL` | Novu-API | - | Step resolver URL |
| `IS_API_RATE_LIMITING_ENABLED` | Novu-API | false | API rate limiting |
| `IS_NEW_MESSAGES_API_RESPONSE_ENABLED` | Novu-API | true | New messages API format |
| `SUBSCRIBER_WIDGET_JWT_EXPIRATION_TIME` | Novu-API | 15d | Widget token TTL |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `PORT` | Novu-WS | 3002 | WebSocket server port |
| `NODE_ENV` | Novu-WS | production | Runtime environment |
| `MONGO_URL` | Novu-WS | - | MongoDB connection |
| `JWT_SECRET` | Novu-WS | (secret) | Shared JWT key |
| `REDIS_HOST` | Novu-WS | - | Redis hostname |
| `REDIS_PORT` | Novu-WS | - | Redis port |
| `IS_SELF_HOSTED` | Novu-WS | true | Enable self-hosted mode |
| `REDIS_PASSWORD` | Novu-WS | (secret) | Redis auth password |
| `NEW_RELIC_ENABLED` | Novu-WS | false | Disable New Relic APM |
| `MONGO_MAX_POOL_SIZE` | Novu-WS | 10 | Max MongoDB connections |
| `MONGO_MIN_POOL_SIZE` | Novu-WS | 5 | Min MongoDB connections |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/novu-notification)
