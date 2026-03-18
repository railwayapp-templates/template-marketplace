# Deploy One Time Secret on Railway

Share sensitive information securely with self-destructing links

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/one-time-secret-1)

## About

**One Time Secret** is an open-source service for securely sharing sensitive
information via single-use, expiring links. Secrets are encrypted, stored
temporarily, and destroyed automatically after being viewed once or after a
configured expiration period.

Hosting One Time Secret consists of running a single web application backed by
Redis for ephemeral secret storage. The service handles encryption, expiration,
and one-time retrieval automatically. When deployed on Railway, the application
runs as a single service with a managed Redis instance, and all configuration is
performed through environment variables, keeping setup simple and operational
overhead low.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| One Time Secret | `ghcr.io/onetimesecret/onetimesecret:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `SSL` | One Time Secret | true |
| `PORT` | One Time Secret | 3000 |
| `SECRET` | One Time Secret | (secret) |
| `RACK_ENV` | One Time Secret | production |
| `SERVER_TYPE` | One Time Secret | thin |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/one-time-secret-1)
