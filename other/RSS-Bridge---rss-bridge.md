# Deploy RSS-Bridge on Railway

RSS/Atom feeds for sites without one: YouTube, Telegram, Reddit, 400+ more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rss-bridge)

## About

[RSS-Bridge](https://github.com/RSS-Bridge/rss-bridge) generates RSS and Atom feeds for websites that don't publish one. That includes YouTube channels, Telegram channels, Reddit, Mastodon, Bandcamp, plus generic CSS-selector and XPath bridges for any page. It ships 400+ bridges.

This template runs the official `rssbridge/rss-bridge` image, which is nginx plus PHP-FPM, as a single service. There is no database: feeds are cached on local disk and rebuilt on demand, so the service needs no volume and stays on the smallest instance size.

By default the instance is **private**. A random access token is generated at deploy time, and every request must carry `&amp;token=`. Feed readers handle this because the token is part of the feed URL. To run a public instance, clear `RSSBRIDGE_authentication_token`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RSS-Bridge | `rssbridge/rss-bridge:2026-09-30` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port nginx listens on inside the container. |
| `RSSBRIDGE_cache_type` | file | Cache backend: file, sqlite, memcached or null. |
| `RSSBRIDGE_error_output` | feed | Where bridge errors are shown: feed, http or none. |
| `RSSBRIDGE_system_timezone` | UTC | Timezone for feed timestamps. |
| `RSSBRIDGE_authentication_token` | (secret) | Access token. Append &token=<value> to feed URLs. Clear it to make the instance public. |
| `RSSBRIDGE_system_enabled_bridges` | * | Comma-separated bridge names to enable, or * for all. |

## Configuration

- **Healthcheck:** `/UNLICENSE`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/rss-bridge)
