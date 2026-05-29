# Deploy go-hauk on Railway

Deploy and Host go-hauk with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/go-hauk)

## About

golang port of the Hauk (https://github.com/bilde2910/Hauk) location sharing backend

spins up the go service and a redis backend with persistence

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| go-hauk | [parkan/go-hauk](https://github.com/parkan/go-hauk) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | redis port |
| `REDISUSER` | Redis | default | redis user |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `HAUK_PUBLIC_URL` | go-hauk | - | public URL |
| `HAUK_AUTH_METHOD` | go-hauk | password | redis auth method |
| `HAUK_LISTEN_ADDR` | go-hauk | :8080 | default listen addr, leave it be |
| `HAUK_PASSWORD_HASH` | go-hauk | (secret) | bcrypt hash - generate with: htpasswd -nbBC 10 "" 'yourpassword' | tr -d ':\n' |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Go, JavaScript, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/go-hauk)
