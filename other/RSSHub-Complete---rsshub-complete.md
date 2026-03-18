# Deploy RSSHub (Complete) on Railway

🚪 The world's largest RSS network, with the most complete setup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rsshub-complete)

## About

> 🧩 **Complete, ready-to-use setup:**  
> ✅ Includes a **Browserless instance** for dynamic content rendering  
> ✅ Preconfigured environment variables for flexibility and security:  
> &nbsp;&nbsp;&nbsp;&nbsp;`ALLOW_USER_HOTLINK_TEMPLATE`, `ALLOW_ORIGIN=*`, `DISALLOW_ROBOT`  

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Browserless | `browserless/chrome` | Worker |
| RSSHub | `ghcr.io/diygod/rsshub` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DEBUG` | Browserless | -* | Suppress excessive logging |
| `NODE_ENV` | RSSHub | production | Production |
| `CACHE_TYPE` | RSSHub | redis | Using Redis as Cache |
| `ALLOW_ORIGIN` | RSSHub | * | Avoid CORS errors |
| `DISALLOW_ROBOT` | RSSHub | true | Prevent indexing by search engine |
| `REQUEST_TIMEOUT` | RSSHub | 6000 | Extend request time to avoid bad HTTP code |
| `ALLOW_USER_HOTLINK_TEMPLATE` | RSSHub | true | Enable Image Hotlink feature |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Healthcheck:** `/pressure`
- **Healthcheck:** `healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/rsshub-complete)
