# Deploy Novu on Railway

Notification service that sends in-app, email, SMS and push

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/novu-server)

## About

Novu is open-source notification infrastructure. Instead of scattering SendGrid calls, Firebase pushes and Twilio SMS through your codebase, you define a workflow once — in-app inbox, email, SMS, push and chat, with delays, digests and preferences — and fire it from your backend with one API call. Product teams use it to stop rebuilding fan-out and retry logic for every new notification, and to get a real in-app notification bell without writing a websocket tier.

Self-host Novu on Railway and you get the whole production topology, not a single container. This template runs the four Novu services separately: the API that receives triggers, a worker that drains the BullMQ queues and delivers messages, a websocket service that pushes notifications into the browser, and the dashboard. Behind them sit MongoDB, Redis for queues and caching, and an object storage bucket for attachments. Deploy Novu once and every piece is wired over private networking before you open the URL.

![Diagram of the Novu api, worker, ws and dashboard services with MongoDB and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788032288/novu-architecture.png)

Novu sits between your application and the delivery providers you already pay for. Your code sends one event; Novu decides which channels to use, in what order and with what content, honouring each subscriber's preferences. Self-hosting matters because notification payloads carry real user data — orders, security alerts, invoices — and provider credentials stay on infrastructure you control.

Key capabilities:

- **Multi-channel workflows** — in-app, email, SMS, push and chat steps in one visual editor
- **Digest and delay steps** — batch a burst of events into one message
- **Embeddable Inbox** — React, Next.js, Vue and JS components for the notification bell
- **Activity feed** — per-run logs showing which step delivered or failed

The architecture is deliberately split. The **API** handles triggers, dashboard traffic and Inbox endpoints, then hands work to Redis. The **worker** runs four BullMQ consumers and does the real delivery, so a burst of triggers never blocks an HTTP request. The **websocket** service reads a queue and pushes unread counts into open tabs. The **dashboard** is a static SPA; the **bucket** holds attachments in flight.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| novu-api | `ghcr.io/novuhq/novu/api:3.19.0` | Web service |
| novu-worker | `ghcr.io/novuhq/novu/worker:3.19.0` | Worker |
| novu-dashboard | `ghcr.io/novuhq/novu/dashboard:3.19.0` | Web service |
| Redis | `redis:8.2` | Database |
| MongoDB | `mongo:8.0` | Database |
| novu-ws | `ghcr.io/novuhq/novu/ws:3.19.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | novu-api | UTC | Container timezone |
| `PORT` | novu-api | 3000 | HTTP listening port |
| `NODE_ENV` | novu-api | production | Node environment |
| `LOG_LEVEL` | novu-api | info | Required, no default in the API |
| `MONGO_URL` | novu-api | - | Mongo connection string |
| `S3_REGION` | novu-api | - | Bucket region |
| `JWT_SECRET` | novu-api | (secret) | Signs dashboard and Inbox tokens |
| `REDIS_HOST` | novu-api | - | Private Redis hostname |
| `REDIS_PORT` | novu-api | - | Redis port |
| `API_ROOT_URL` | novu-api | - | Public API base URL |
| `REDIS_FAMILY` | novu-api | 0 | Allow IPv6 private DNS resolution |
| `DASHBOARD_URL` | novu-api | - | Dashboard origin |
| `IS_V2_ENABLED` | novu-api | true | Enable the v2 dashboard API |
| `FRONT_BASE_URL` | novu-api | - | CORS allow-list, read as regex |
| `IS_SELF_HOSTED` | novu-api | true | Disable cloud-only code paths |
| `REDIS_DB_INDEX` | novu-api | 2 | Queue database index |
| `REDIS_PASSWORD` | novu-api | (secret) | Redis auth password |
| `S3_BUCKET_NAME` | novu-api | - | Attachment bucket name |
| `S3_LOCAL_STACK` | novu-api | - | S3 endpoint override |
| `NOVU_SECRET_KEY` | novu-api | (secret) | Internal signing key |
| `STORAGE_SERVICE` | novu-api | AWS | Select the S3 storage backend |
| `AWS_ACCESS_KEY_ID` | novu-api | - | Bucket access key |
| `NEW_RELIC_ENABLED` | novu-api | false | New Relic telemetry off |
| `REDIS_CACHE_FAMILY` | novu-api | 0 | Allow IPv6 for the cache client |
| `MONGO_MAX_POOL_SIZE` | novu-api | 20 | Maximum Mongo pool size |
| `MONGO_MIN_POOL_SIZE` | novu-api | 5 | Minimum Mongo pool size |
| `REDIS_CACHE_PASSWORD` | novu-api | (secret) | Cache Redis password |
| `STORE_ENCRYPTION_KEY` | novu-api | - | Provider credential key, exactly 32 chars |
| `AWS_SECRET_ACCESS_KEY` | novu-api | (secret) | Bucket secret key |
| `REDIS_CACHE_SERVICE_HOST` | novu-api | - | Cache Redis hostname |
| `REDIS_CACHE_SERVICE_PORT` | novu-api | - | Cache Redis port |
| `DISABLE_USER_REGISTRATION` | novu-api | false | Set true after creating your account |
| `MONGO_AUTO_CREATE_INDEXES` | novu-api | true | Build indexes on boot |
| `IS_API_IDEMPOTENCY_ENABLED` | novu-api | true | Deduplicate retried trigger calls |
| `IS_API_RATE_LIMITING_ENABLED` | novu-api | true | Per-environment API rate limits |
| `IS_NEW_MESSAGES_API_RESPONSE_ENABLED` | novu-api | true | Current messages response shape |
| `SUBSCRIBER_WIDGET_JWT_EXPIRATION_TIME` | novu-api | 15d | Inbox session token lifetime |
| `TZ` | novu-worker | UTC | Container timezone |
| `PORT` | novu-worker | 3004 | Health endpoint port |
| `NODE_ENV` | novu-worker | production | Node environment |
| `LOG_LEVEL` | novu-worker | info | Worker log level |
| `MONGO_URL` | novu-worker | - | Mongo connection string |
| `S3_REGION` | novu-worker | - | Bucket region |
| `JWT_SECRET` | novu-worker | (secret) | Shared token signing key |
| `REDIS_HOST` | novu-worker | - | Private Redis hostname |
| `REDIS_PORT` | novu-worker | - | Redis port |
| `API_ROOT_URL` | novu-worker | - | API base URL for callbacks |
| `REDIS_FAMILY` | novu-worker | 0 | Allow IPv6 private DNS resolution |
| `IS_SELF_HOSTED` | novu-worker | true | Disable cloud-only code paths |
| `REDIS_DB_INDEX` | novu-worker | 2 | Queue database index |
| `REDIS_PASSWORD` | novu-worker | (secret) | Redis auth password |
| `S3_BUCKET_NAME` | novu-worker | - | Attachment bucket name |
| `S3_LOCAL_STACK` | novu-worker | - | S3 endpoint override |
| `NOVU_SECRET_KEY` | novu-worker | (secret) | Shared internal key |
| `STORAGE_SERVICE` | novu-worker | AWS | Select the S3 storage backend |
| `AWS_ACCESS_KEY_ID` | novu-worker | - | Bucket access key |
| `NEW_RELIC_ENABLED` | novu-worker | false | New Relic telemetry off |
| `REDIS_CACHE_FAMILY` | novu-worker | 0 | Allow IPv6 for the cache client |
| `MONGO_MAX_POOL_SIZE` | novu-worker | 20 | Maximum Mongo pool size |
| `MONGO_MIN_POOL_SIZE` | novu-worker | 5 | Minimum Mongo pool size |
| `REDIS_CACHE_PASSWORD` | novu-worker | (secret) | Cache Redis password |
| `STORE_ENCRYPTION_KEY` | novu-worker | - | Shared credential key |
| `AWS_SECRET_ACCESS_KEY` | novu-worker | (secret) | Bucket secret key |
| `REDIS_CACHE_SERVICE_HOST` | novu-worker | - | Cache Redis hostname |
| `REDIS_CACHE_SERVICE_PORT` | novu-worker | - | Cache Redis port |
| `MONGO_AUTO_CREATE_INDEXES` | novu-worker | true | Build indexes on boot |
| `BROADCAST_QUEUE_CHUNK_SIZE` | novu-worker | 100 | Broadcast fan-out batch size |
| `MULTICAST_QUEUE_CHUNK_SIZE` | novu-worker | 100 | Topic fan-out batch size |
| `IS_EMAIL_INLINE_CSS_DISABLED` | novu-worker | false | Inline CSS in email bodies |
| `IS_USE_MERGED_DIGEST_ID_ENABLED` | novu-worker | false | Legacy digest identifier behaviour |
| `SUBSCRIBER_WIDGET_JWT_EXPIRATION_TIME` | novu-worker | 15d | Inbox session token lifetime |
| `PORT` | novu-dashboard | 4000 | Static server listening port |
| `VITE_SELF_HOSTED` | novu-dashboard | true | Use the self-hosted auth flow |
| `VITE_API_HOSTNAME` | novu-dashboard | - | API URL injected at boot |
| `VITE_DASHBOARD_URL` | novu-dashboard | - | Dashboard's own public URL |
| `VITE_WEBSOCKET_HOSTNAME` | novu-dashboard | - | Websocket URL injected at boot |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `MONGOHOST` | MongoDB | - | Data panel alias, not read by the server |
| `MONGOPORT` | MongoDB | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | MongoDB | - | Data panel alias, not read by the server |
| `MONGO_URL` | MongoDB | - | Private connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root password, read by the server |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root user created on first boot |
| `TZ` | novu-ws | UTC | Container timezone |
| `PORT` | novu-ws | 3002 | socket.io listening port |
| `NODE_ENV` | novu-ws | production | Node environment |
| `LOG_LEVEL` | novu-ws | info | Websocket service log level |
| `MONGO_URL` | novu-ws | - | Mongo connection string |
| `JWT_SECRET` | novu-ws | (secret) | Must match the API to verify tokens |
| `REDIS_HOST` | novu-ws | - | Private Redis hostname |
| `REDIS_PORT` | novu-ws | - | Redis port |
| `REDIS_FAMILY` | novu-ws | 0 | Allow IPv6 private DNS resolution |
| `REDIS_DB_INDEX` | novu-ws | 2 | Queue database index |
| `REDIS_PASSWORD` | novu-ws | (secret) | Redis auth password |
| `NEW_RELIC_ENABLED` | novu-ws | false | New Relic telemetry off |
| `MONGO_MAX_POOL_SIZE` | novu-ws | 20 | Maximum Mongo pool size |
| `MONGO_MIN_POOL_SIZE` | novu-ws | 5 | Minimum Mongo pool size |
| `MONGO_AUTO_CREATE_INDEXES` | novu-ws | false | Leave index creation to the API |

## Configuration

- **Healthcheck:** `/openapi`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/novu-server)
