# Deploy Is On Water on Railway

Check if coordinate is on water (seas, lakes, and rivers) with 1m precision

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/MfUYQX)

## About

# `is-on-water`

💧HTTP API using reverse geocoding to check whether a geographic coordinate is on water (seas, lakes, and rivers) with 1m precision

- Single coordinate

`GET /api/is-on-water?lat=${lat}&lon=${lon}`

- Batch coordinates

`POST /api/is-on-water` with body containing array of coordinate objects `[{ lat, lon }, { lat, lon }, ...]`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | [osbytes/is-on-water](https://github.com/osbytes/is-on-water) | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISHOST` | - | Railway Private Domain Name. |
| `REDISPORT` | 6379 | Port to connect to Redis. |
| `REDISUSER` | default | Default user to connect to Redis. |
| `REDIS_URL` | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | - | Public URL to connect to Redis, needed for the Data panel. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** TypeScript, HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/MfUYQX)
