# Deploy Centrifugo on Railway

Centrifugo 6.9 real-time WebSocket/SSE messaging server with Redis engine.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/centrifugo-1)

## About

Centrifugo is an open-source, scalable real-time messaging server. Browser and mobile clients subscribe to channels over WebSocket, SSE or HTTP streaming, and your backend publishes to them through a simple HTTP API. You can use it for chat, live notifications, dashboards, multiplayer features and streaming AI responses, with any backend language.

This template deploys Centrifugo v6.9.6 with a Railway Redis database as its engine. Because the engine is Redis, channel history survives restarts and you can run several Centrifugo replicas behind Railway's load balancer. Clients connect to the public domain at `/connection/websocket` using a JWT that your backend signs with the generated HMAC secret. Your backend publishes over the private network with the generated API key. The admin web UI is enabled on the public domain and protected by a generated password. Centrifugo is stateless and light, so the Hobby plan is enough. Before going to production, set the allowed origins to your frontend's domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| centrifugo | `centrifugo/centrifugo:v6.9.6` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | centrifugo | 8000 |
| `CENTRIFUGO_ENGINE_TYPE` | centrifugo | redis |
| `CENTRIFUGO_ADMIN_SECRET` | centrifugo | (secret) |
| `CENTRIFUGO_HTTP_API_KEY` | centrifugo | (secret) |
| `CENTRIFUGO_ADMIN_ENABLED` | centrifugo | true |
| `CENTRIFUGO_ADMIN_PASSWORD` | centrifugo | (secret) |
| `CENTRIFUGO_HEALTH_ENABLED` | centrifugo | true |
| `CENTRIFUGO_HTTP_SERVER_PORT` | centrifugo | 8000 |
| `CENTRIFUGO_CLIENT_ALLOWED_ORIGINS` | centrifugo | * |
| `CENTRIFUGO_CLIENT_TOKEN_HMAC_SECRET_KEY` | centrifugo | (secret) |
| `CENTRIFUGO_CHANNEL_WITHOUT_NAMESPACE_HISTORY_TTL` | centrifugo | 300s |
| `CENTRIFUGO_CHANNEL_WITHOUT_NAMESPACE_HISTORY_SIZE` | centrifugo | 100 |
| `CENTRIFUGO_CHANNEL_WITHOUT_NAMESPACE_FORCE_RECOVERY` | centrifugo | true |
| `CENTRIFUGO_CHANNEL_WITHOUT_NAMESPACE_ALLOW_SUBSCRIBE_FOR_CLIENT` | centrifugo | true |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/centrifugo-1)
