# Deploy Tyk Gateway on Railway

Tyk Gateway 5.15: open-source API gateway with keys and rate limits.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tyk-gateway)

## About

Tyk Gateway is an open-source API gateway written in Go. It sits in front of your services and handles API keys, JWT and OAuth validation, rate limits, quotas, caching and request transforms. APIs and keys are managed through the Gateway's own REST API, so it fits GitOps and CI pipelines without a dashboard.

This template runs the official `tykio/tyk-gateway:v5.15.0` image with a Railway Redis database, which holds keys, quotas and rate-limit counters. API definitions and policies are JSON files on a Railway volume, so they survive redeploys. The management API under `/tyk/` shares the public HTTPS domain and requires the generated `TYK_GW_SECRET` in the `x-tyk-authorization` header. Keys are stored hashed, and analytics are off. The image is distroless and cannot fix the volume's ownership, so it runs as root. Tyk's dashboard and developer portal are commercial and not included; this is the open-source gateway on its own.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| tyk | `tykio/tyk-gateway:v5.15.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | tyk | 8080 |
| `TYK_GW_SECRET` | tyk | (secret) |
| `TYK_GW_APPPATH` | tyk | /opt/tyk-gateway/apps |
| `TYK_GW_HASHKEYS` | tyk | true |
| `TYK_GW_LOGLEVEL` | tyk | info |
| `TYK_GW_LISTENPORT` | tyk | 8080 |
| `TYK_GW_STORAGE_TYPE` | tyk | redis |
| `TYK_GW_ENABLEANALYTICS` | tyk | false |
| `TYK_GW_STORAGE_PASSWORD` | tyk | (secret) |
| `TYK_GW_POLICIES_POLICYPATH` | tyk | /opt/tyk-gateway/apps |
| `TYK_GW_POLICIES_POLICYSOURCE` | tyk | file |
| `TYK_GW_ENABLEHASHEDKEYSLISTING` | tyk | true |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/hello`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/tyk-gateway/apps`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tyk-gateway)
