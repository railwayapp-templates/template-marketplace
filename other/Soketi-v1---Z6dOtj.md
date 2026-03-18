# Deploy Soketi v1 on Railway

Deploy an open-source Pusher-compatible server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Z6dOtj)

## About

Check the [Soketi documentation](https://docs.soketi.app/) to find out more about how to configure the instance.

**Soketi** 
- https://docs.soketi.app/

**Javascript** (client)
- https://github.com/pusher/pusher-js
https://laravel.com/docs/9.x/broadcasting

**Node.js** (server)
- https://github.com/pusher/pusher-http-node

**PHP** (server)
- https://github.com/pusher/pusher-http-php

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| soketi | [soketi/soketi-railway-deploy-example](https://github.com/soketi/soketi-railway-deploy-example) (root: /) | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | soketi | - | Used for Railway: The port on which Soketi runs on. |
| `SOKETI_PUBLIC_PORT` | soketi | 443 | The port on which the application runs for the public. Defaults to 443 (SSL) |
| `SOKETI_DB_REDIS_HOST` | soketi | - | The Redis host to connect to. |
| `SOKETI_DB_REDIS_PORT` | soketi | - | The Redis instance port. |
| `SOKETI_INTERNAL_HOST` | soketi | - | Railway specific: host name to use to identify the instance in the private network. |
| `SOKETI_INTERNAL_PORT` | soketi | 6001 | The port on which Soketi runs on in the private network. |
| `SOKETI_ADAPTER_DRIVER` | soketi | redis | Set the Horizontal Scaling adapter. Recommended: redis |
| `SOKETI_DEFAULT_APP_ID` | soketi | - | The default app ID. |
| `SOKETI_DEFAULT_APP_KEY` | soketi | - | The default app key to connect to. |
| `SOKETI_DB_REDIS_PASSWORD` | soketi | (secret) | The Redis instance password. |
| `SOKETI_DB_REDIS_USERNAME` | soketi | (secret) | The Redis instance username. |
| `SOKETI_DEFAULT_APP_SECRET` | soketi | (secret) | The default app secret to connect to. |
| `SOKETI_DEFAULT_APP_ENABLE_CLIENT_MESSAGES` | soketi | 1 | Enable client messages |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/Z6dOtj)
