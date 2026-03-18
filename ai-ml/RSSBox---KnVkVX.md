# Deploy RSSBox on Railway

Smarter RSS management, more efficient information access

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/KnVkVX)

## About

[Github](https://github.com/versun/rssbox/) | [English](https://rssbox.app/en/) | [Demo](https://demo.rssbox.app) | [Telegram交流群](https://t.me/rssbox) | [开发进度](https://github.com/users/versun/projects/8)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RSSBox | [versun/RSSBox](https://github.com/versun/RSSBox) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | RSSBox | 8000 | Don't change it |
| `SITE_URL` | RSSBox | https://example.com | - |
| `CSRF_TRUSTED_ORIGINS` | RSSBox | https://*.railway.app | Domain |
| `DEFAULT_TARGET_LANGUAGE` | RSSBox | Chinese Simplified | See https://github.com/versun/RSS-Translator/blob/main/config/settings.py#L199 for optional values |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** AI/ML · **Languages:** Python, HTML, XSLT, Dockerfile, Shell, JavaScript

[View on Railway →](https://railway.com/deploy/KnVkVX)
