# Deploy Novu (Self-Hosted Knock & Courier Alternative) on Railway

Self-hosted Knock & Courier alternative [Updated Aug '26]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/novu-self-hosted-knock-and-courier-alter)

## About

Novu is an open-source notification infrastructure — a self-hosted alternative to notification-as-a-service platforms like Knock, Courier and OneSignal that you fully own. Send transactional and product notifications across email, SMS, push, chat and a drop-in in-app inbox from a single API and a visual workflow editor, with subscriber management, preferences, digests and provider routing built in. This template deploys the complete Novu self-hosted stack — the API server, the background worker, the WebSocket service that powers the real-time in-app inbox, and the management dashboard, backed by MongoDB and Redis — each pinned to a verified upstream image and wired over Railway's private network so it comes up working on the first deploy.

Novu is a multi-service application: a NestJS API, a Bull/Redis-backed worker that executes notification workflows and digests, a WebSocket service that streams real-time updates to the in-app notification center, and a React dashboard for building workflows and managing subscribers, all backed by MongoDB for persistence and Redis for queues and caching. The API, WebSocket service and dashboard are exposed publicly; the worker runs privately, and every service talks to MongoDB and Redis over Railway's private network. This template configures each connection string, generates fresh application secrets on every deploy (JWT signing key, store encryption key and API secret key), shares the encryption key from the API to the worker automatically, and attaches a persistent volume to MongoDB. When it finishes deploying you open the dashboard, create the first admin account, and start building notification workflows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | `ghcr.io/novuhq/novu/api:3.18.0` | Web service |
| redis | `redis:alpine` | Database |
| dashboard | `ghcr.io/novuhq/novu/dashboard:3.18.0` | Web service |
| ws | `ghcr.io/novuhq/novu/ws:3.18.0` | Web service |
| worker | `ghcr.io/novuhq/novu/worker:3.18.0` | Worker |
| mongodb | `mongo:8.0.17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | api | 3000 |
| `NODE_ENV` | api | local |
| `S3_REGION` | api | us-east-1 |
| `JWT_SECRET` | api | (secret) |
| `REDIS_PORT` | api | 6379 |
| `IS_V2_ENABLED` | api | true |
| `IS_SELF_HOSTED` | api | true |
| `S3_BUCKET_NAME` | api | novu |
| `NOVU_SECRET_KEY` | api | (secret) |
| `AWS_ACCESS_KEY_ID` | api | test |
| `NEW_RELIC_ENABLED` | api | false |
| `MONGO_MAX_POOL_SIZE` | api | 10 |
| `MONGO_MIN_POOL_SIZE` | api | 5 |
| `AWS_SECRET_ACCESS_KEY` | api | (secret) |
| `REDIS_CACHE_SERVICE_PORT` | api | 6379 |
| `MONGO_AUTO_CREATE_INDEXES` | api | true |
| `IS_API_IDEMPOTENCY_ENABLED` | api | false |
| `IS_API_RATE_LIMITING_ENABLED` | api | false |
| `IS_NEW_MESSAGES_API_RESPONSE_ENABLED` | api | true |
| `SUBSCRIBER_WIDGET_JWT_EXPIRATION_TIME` | api | 15d |
| `PORT` | dashboard | 4000 |
| `PORT` | ws | 3002 |
| `NODE_ENV` | ws | local |
| `JWT_SECRET` | ws | (secret) |
| `REDIS_PORT` | ws | 6379 |
| `NEW_RELIC_ENABLED` | ws | false |
| `MONGO_MAX_POOL_SIZE` | ws | 10 |
| `MONGO_MIN_POOL_SIZE` | ws | 5 |
| `REDIS_CACHE_SERVICE_PORT` | ws | 6379 |
| `MONGO_AUTO_CREATE_INDEXES` | ws | true |
| `PORT` | worker | 3004 |
| `NODE_ENV` | worker | local |
| `S3_REGION` | worker | us-east-1 |
| `REDIS_PORT` | worker | 6379 |
| `S3_BUCKET_NAME` | worker | novu |
| `AWS_ACCESS_KEY_ID` | worker | test |
| `NEW_RELIC_ENABLED` | worker | false |
| `MONGO_MAX_POOL_SIZE` | worker | 10 |
| `MONGO_MIN_POOL_SIZE` | worker | 5 |
| `AWS_SECRET_ACCESS_KEY` | worker | (secret) |
| `REDIS_CACHE_SERVICE_PORT` | worker | 6379 |
| `MONGO_AUTO_CREATE_INDEXES` | worker | true |
| `BROADCAST_QUEUE_CHUNK_SIZE` | worker | 100 |
| `MULTICAST_QUEUE_CHUNK_SIZE` | worker | 100 |
| `MONGO_INITDB_ROOT_PASSWORD` | mongodb | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | mongodb | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/novu-self-hosted-knock-and-courier-alter)
