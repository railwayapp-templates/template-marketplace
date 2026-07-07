# Deploy dragonfly on Railway

Dragonfly — Redis-compatible in-memory cache with advanced features.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dragonfly-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/dragonfly)

![OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-dragonfly/main/og-image.svg)

Dragonfly is a Redis-compatible, high-performance in-memory database. It's a modern alternative to Redis with 30K+ GitHub stars, typically 25% less memory usage, and up to 70% better performance.

Dragonfly runs as a single container on Railway with:
- Port: 6379 (Redis-compatible, automatically managed by Railway)
- No external dependencies - it IS the database
- ~48MB Docker image fits any tier

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dragonfly | `dragonflydb/dragonfly:v1.27.1` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DRAGONFLY_PORT` | 6379 | Port Dragonfly listens on (default: 6379). Railway injects PORT for routing. |
| `DRAGONFLY_LOG_LEVEL` | warning | Log level: debug, info, warning, error, fatal. |
| `DRAGONFLY_MAXMEMORY` | - | Maximum memory limit (e.g., 1gb, 500mb). Leave empty for unlimited. |
| `DRAGONFLY_REQUIREPASS` | - | Require authentication on connection. Auto-generated — set to secure your cache. |
| `DRAGONFLY_MAXMEMORY_POLICY` | - | Eviction policy when maxmemory reached (e.g., allkeys-lfu, volatile-lru). |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/dragonfly-1)
