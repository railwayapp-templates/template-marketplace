# Deploy ATBlob on Railway

cdn.bsky.app-compatible image proxy server for atproto.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/atblob)

## About

ATBlob is an open-source, cdn.bsky.app-compatible image proxy for atproto. It accepts the same URL paths as Bluesky's image CDN, so any atproto app can switch to it just by swapping the hostname.

ATBlob runs as a single stateless server that resolves DIDs, fetches blobs from the owning PDS, and returns resized images on the fly. This template comes with Redis preconfigured for caching DID resolution results, so there's nothing extra to set up before deploying.

> **Note:** ATBlob resizes images on every request, so it's recommended to enable Railway's [CDN Caching](https://docs.railway.com/networking/cdn) or put a Cloudflare cache in front of it to avoid reprocessing the same image repeatedly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| ATBlob | `ghcr.io/mkizka/atblob:0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `DID_CACHE` | ATBlob | redis | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/atblob)
