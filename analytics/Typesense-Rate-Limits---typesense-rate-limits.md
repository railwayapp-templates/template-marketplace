# Deploy Typesense Rate Limits on Railway

protect search endpoints under load

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-rate-limits)

## About

Picture launch day: a newsletter goes out, three thousand people open your store, and every keystroke in the search box becomes a request. A shopper sends a dozen queries; a scraper sends ten thousand. This template gives you a Typesense node you control, so you decide who gets throttled, who gets blocked, and what a 429 means.

Typesense is GPL-3.0 open-source instant search, and the server ships a rate-limit rules API at `/limits`. A rule picks an action (`throttle`, `block`, or `allow`), targets `ip_addresses` or `api_keys` (`.*` is the wildcard), and sets `max_requests_1m` and `max_requests_1h`. Optional `auto_ban_1m_threshold` and `auto_ban_1m_duration_hours` turn repeat offenders into temporary bans. Anything over the line gets HTTP 429 "Rate limit exceeded or blocked" before the query touches the index.

This template runs the official `typesense/typesense:30.2` image on port 8108 with a Railway volume at `/data`. Rules live in Typesense's own metadata store on that volume, so they survive redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense-railway | [Shinyduo/typesense-railway](https://github.com/Shinyduo/typesense-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | PORT |
| `TYPESENSE_URL` | - | TYPESENSE_URL |
| `TYPESENSE_API_KEY` | (secret) | TYPESENSE_API_KEY |
| `TYPESENSE_DATA_DIR` | - | TYPESENSE_DATA_DIR |
| `TYPESENSE_PUBLIC_URL` | - | TYPESENSE_PUBLIC_URL |
| `TYPESENSE_THREAD_POOL_SIZE` | 64 | TYPESENSE_THREAD_POOL_SIZE |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | 32 | TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/typesense-rate-limits)
