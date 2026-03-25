# Deploy RSSBox on Railway

Auto-translate RSS feeds with DeepL & AI. Bilingual output supported.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rssbox)

## About

RSSBox is an open-source, self-hosted RSS translation tool. It automatically translates RSS feeds into your preferred language using DeepL or OpenAI-compatible models, with support for bilingual display, keyword filtering, AI content curation, and full-text extraction.

RSSBox runs as a Django application with Redis for caching and task queues. Data is stored in SQLite on a persistent volume. After deployment, configure a translation engine (DeepL, OpenAI-compatible APIs) via the admin panel, add your RSS sources, and RSSBox generates translated feed URLs you can subscribe to in any reader like Inoreader or Feedly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:7-alpine` | Database |
| RSSBox | `versun/rssbox` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Redis internal hostname for service discovery |
| `REDISPORT` | Redis | 6379 | Redis server port |
| `REDIS_URL` | Redis | - | Redis connection URL for internal services |
| `PORT` | RSSBox | 8000 | Application port, don't change it |
| `SITE_URL` | RSSBox | https://rss.your-site.com | Full URL of your RSSBox instance |
| `REDIS_URL` | RSSBox | - | Redis connection URL |
| `CSRF_TRUSTED_ORIGINS` | RSSBox | https://rss.your-site.com | Trusted origins for CSRF protection, comma separated |
| `DEFAULT_TARGET_LANGUAGE` | RSSBox | Chinese Simplified | Default translation target language, see https://github.com/versun/RSSBox/blob/main/config/settings.py |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/rssbox)
