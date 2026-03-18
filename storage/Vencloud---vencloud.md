# Deploy Vencloud on Railway

Official Vencord cloud settings sync API for self-hosting.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vencloud)

## About

Vencloud is the official cloud settings sync API for Vencord, enabling cross-device synchronization of your Vencord/euidcord settings. Self-host your own instance to keep your data private while enjoying seamless settings sync across all your devices.

Hosting Vencloud involves deploying a Go-based API server with Redis for data storage. The service handles Discord OAuth2 authentication, encrypts user settings with secure pepper keys, and provides RESTful endpoints for settings management. Railway automatically handles the infrastructure, scaling, and HTTPS configuration, while you only need to configure Discord OAuth credentials. The deployment includes automatic Redis provisioning and environment variable management for a seamless setup experience.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Vencloud | [Monstroxx/Vencloud](https://github.com/Monstroxx/Vencloud) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `HOST` | Vencloud | 0.0.0.0 | - |
| `PORT` | Vencloud | 8080 | - |
| `PROMETHEUS` | Vencloud | false | - |
| `SIZE_LIMIT` | Vencloud | 1048576 | - |
| `PROXY_HEADER` | Vencloud | X-Forwarded-For | - |
| `ROOT_REDIRECT` | Vencloud | https://vencord.dev | - |
| `PEPPER_SECRETS` | Vencloud | (secret) | - |
| `DISCORD_CLIENT_ID` | Vencloud | - | your discord client id |
| `DISCORD_CLIENT_SECRET` | Vencloud | (secret) | your discord client secret |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/vencloud)
