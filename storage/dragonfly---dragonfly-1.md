# Deploy dragonfly on Railway

Redis-compatible in-memory database with 25x better performance

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

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/dragonfly-1)
