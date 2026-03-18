# Deploy Cryptgeon on Railway

Cryptgeon is a secure, open source sharing note or file service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cryptgeon)

## About

Cryptgeon is an open-source, end-to-end encrypted note and file sharing service. Content is encrypted in the browser before being sent to the server, and notes can expire by time or number of views (burn-after-reading style). It is designed for securely sharing secrets without long-term storage.

Hosting Cryptgeon on Railway requires deploying the Cryptgeon application service along with a Redis instance. Redis is used as the backing data store. No additional infrastructure or configuration is required beyond connecting the app to Redis via an environment variable. Railway will provide the public URL and HTTPS automatically once deployed.

The Cryptgeon application runs on **port 8000**.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cryptgeon | `cupcakearmy/cryptgeon:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `REDISPORT` | 6379 |
| `REDISUSER` | default |
| `REDISPASSWORD` | (secret) |
| `REDIS_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cryptgeon)
