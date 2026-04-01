# Deploy Waken-Wa on Railway

Here! You Finally Awaken~

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/waken-wa)

## About

✨ 一日一记，一醒一悟。

> 另一种形式的日常生活观察窗~

> 晨光里睁眼是醒，  
> 深夜写下"今天很好"也是醒。

一种生活的调剂品，uwu

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| waken-wa | [MoYoez/waken-wa](https://github.com/MoYoez/waken-wa) | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISPORT` | 6379 | - |
| `REDISUSER` | default | - |
| `REDIS_URL` | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | (secret) | - |
| `REDIS_PASSWORD` | (secret) | - |
| `REDIS_PUBLIC_URL` | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Blogs · **Languages:** TypeScript, CSS, Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/waken-wa)
