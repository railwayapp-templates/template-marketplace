# Deploy LunaTV on Railway

LunaTV Enhanced Edition 是基于 MoonTV 深度二次开发的全功能影视聚合播放平台。在原版基础上提升在线观影体验。

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lunatv)

## About

LunaTV Enhanced Edition 是基于 MoonTV 深度二次开发的全功能影视聚合播放平台。在原版基础上新增了 YouTube 集成、网盘搜索、AI 推荐、短剧功能、IPTV 直播、Bangumi 动漫、播放统计、弹幕系统等 50+ 重大功能增强，打造极致的在线观影体验。

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lunatv | `ghcr.io/szemeng76/lunatv:latest` | Web service |
| Redis | `redis:8.4.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PASSWORD` | lunatv | (secret) |
| `USERNAME` | lunatv | (secret) |
| `ANNOUNCEMENT` | lunatv | 欢迎使用 LunaTV Enhanced Edition |
| `NEXT_PUBLIC_SITE_NAME` | lunatv | LunaTV Enhanced |
| `NEXT_PUBLIC_STORAGE_TYPE` | lunatv | redis |
| `NEXT_PUBLIC_DOUBAN_PROXY_TYPE` | lunatv | cmliussss-cdn-tencent |
| `NEXT_PUBLIC_DOUBAN_IMAGE_PROXY_TYPE` | lunatv | cmliussss-cdn-tencent |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/lunatv)
