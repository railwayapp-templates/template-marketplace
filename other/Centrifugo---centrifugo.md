# Deploy Centrifugo on Railway

Real-time messaging server that pushes messages to connected users

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/centrifugo)

## About

Centrifugo is an open-source real-time messaging server that holds a persistent connection open to every online user and pushes messages the instant your backend has something to say. It sits beside your application: your API stays a plain request/response service and calls Centrifugo over HTTP or gRPC to publish into a channel, while browsers and mobile apps subscribe over WebSocket, Server-Sent Events, HTTP-streaming, WebTransport or gRPC. Teams building chat, live comments, collaborative editors, dashboards, games and streaming AI responses use it to avoid writing a socket tier in every language they ship.

Self-host Centrifugo on Railway and this template gives you the production shape, not a throwaway node. It deploys two services: **centrifugo**, the messaging server, on a Railway domain, and **Redis**, a managed instance acting as Centrifugo's engine. Redis is what makes the node tier horizontal — it carries channel PUB/SUB, the control channel nodes use to find each other, and presence — so once you raise the replica count in the dashboard, a client on one node still receives a message published through another. Every secret is generated at deploy time, so nothing needs filling in.

![Centrifugo and Redis services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788486864/centrifugo-architecture.png)

Long-lived connections need their own scaling model, auth story and fan-out layer, none of which belongs in a request-scoped web framework. Centrifugo lifts that layer out of your codebase: your backend publishes into named channels, Centrifugo owns the sockets. Clients authenticate with a JWT you mint, so the messaging tier never touches your session store.

Key capabilities:

- **Many transports, one API** — WebSocket, SSE, HTTP-streaming, WebTransport and gRPC
- **JWT-based auth** — connection and subscription tokens signed with an HMAC secret, or RSA/ECDSA/JWKS
- **Channel namespaces** — per-prefix rules for who may subscribe, publish or read history
- **History and recovery** — a bounded per-channel buffer so a reconnecting client catches up
- **Presence** — who is subscribed to a channel, plus join and leave events
- **Server API** — publish, broadcast, presence, history, subscribe, disconnect
- **Official SDKs** for JavaScript, Dart/Flutter, Swift, Java, Python, Go and .NET

Architecture here: **centrifugo** is stateless and takes no volume, so all shared state lives in **Redis**. The replica count is the only scaling knob and is safe to raise, and a redeploy loses nothing but the open sockets, which the SDKs reconnect.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| centrifugo | `centrifugo/centrifugo:v6` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | centrifugo | 8000 | Port Railway health-probes |
| `CENTRIFUGO_ENGINE_TYPE` | centrifugo | redis | Broker and presence backend |
| `CENTRIFUGO_SSE_ENABLED` | centrifugo | true | Server-Sent Events fallback transport |
| `CENTRIFUGO_ADMIN_SECRET` | centrifugo | (secret) | Signs admin session tokens |
| `CENTRIFUGO_HTTP_API_KEY` | centrifugo | (secret) | Server API key for /api requests |
| `CENTRIFUGO_ADMIN_ENABLED` | centrifugo | true | Serve the admin web UI |
| `CENTRIFUGO_ADMIN_PASSWORD` | centrifugo | (secret) | Admin web UI sign-in password |
| `CENTRIFUGO_HEALTH_ENABLED` | centrifugo | true | Enables the /health endpoint |
| `CENTRIFUGO_HTTP_SERVER_PORT` | centrifugo | 8000 | HTTP listen port |
| `CENTRIFUGO_HTTP_STREAM_ENABLED` | centrifugo | true | HTTP-streaming fallback transport |
| `CENTRIFUGO_ENGINE_REDIS_ADDRESS` | centrifugo | - | Redis engine connection string |
| `CENTRIFUGO_CLIENT_ALLOWED_ORIGINS` | centrifugo | - | Space-separated allowed browser origins |
| `CENTRIFUGO_CLIENT_TOKEN_HMAC_SECRET_KEY` | centrifugo | (secret) | HS256 key for client JWTs |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/centrifugo)
