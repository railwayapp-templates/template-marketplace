# Deploy Tronbyt — Tidbyt Alternative on Railway

Self-hosted Tidbyt alternative for managing smart display apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tronbyt-tidbyt-alternative)

## About

Tronbyt Server is a self-hosted server for managing smart display apps and content. It provides a web interface, application management, device integration, persistent storage, and caching in a compact deployment that works well as a self-hosted alternative for Tidbyt-style display environments.

![Tronbyt Server](https://imgur.com/dwmaLAO.png)

This template deploys **Tronbyt Server with Redis and persistent storage**.

Tronbyt provides the main web application and server runtime, while Redis is used as a persistent cache backend. Application data is stored on a persistent volume so important state survives service restarts and redeployments.

The result is a simple two-service architecture that provides a ready-to-use Tronbyt environment without requiring users to manually configure Redis or storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tronbyt-server | `ghcr.io/tronbyt/server` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | tronbyt-server | 8000 | Railway public service port |
| `DATA_DIR` | tronbyt-server | /app/data | Persistent Tronbyt data directory |
| `LOG_LEVEL` | tronbyt-server | INFO | Application logging level |
| `REDIS_URL` | tronbyt-server | - | Optional Redis connection URL for persistent caching |
| `PRODUCTION` | tronbyt-server | true | Run Tronbyt in production mode |
| `GITHUB_TOKEN` | tronbyt-server | (secret) | Optional GitHub token for higher API limits when accessing app repositories |
| `SINGLE_USER_AUTO_LOGIN` | tronbyt-server | (secret) | Require normal login instead of automatic single-user login |
| `ENABLE_USER_REGISTRATION` | tronbyt-server | true | Allow initial user/admin registration |
| `REDISHOST` | Redis | - | Redis private hostname within the Railway project |
| `REDISPORT` | Redis | 6379 | Redis service port |
| `REDISUSER` | Redis | default | Default Redis username |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Compatibility alias for the generated Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tronbyt-tidbyt-alternative)
