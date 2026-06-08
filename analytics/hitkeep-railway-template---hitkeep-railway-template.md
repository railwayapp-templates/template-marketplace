# Deploy hitkeep-railway-template on Railway

Self-hosted HitKeep analytics with DuckDB storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hitkeep-railway-template)

## About

Deploy [HitKeep](https://hitkeep.com), an open-source privacy-first analytics platform you can self-host as one Railway service.

This template uses the official `pascalebeier/hitkeep:2.7.0` Docker image, exposes port `8080`, and attaches a persistent Railway volume at `/var/lib/hitkeep/data` for DuckDB data, tenant databases, archives, and local backup snapshots.

HitKeep is a single-binary web analytics app with embedded DuckDB and embedded NSQ. It tracks pageviews, events, goals, funnels, ecommerce activity, AI crawler visibility, Search Console aggregates, exports, and read-only API/MCP access without requiring PostgreSQL, Redis, ClickHouse, Kafka, or a separate queue.

On Railway, the app runs as one persistent service backed by one attached volume. The template generates a unique `HITKEEP_JWT_SECRET` during deployment and configures HitKeep to use the generated Railway public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hitkeep | `pascalebeier/hitkeep:2.7.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HITKEEP_JWT_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/hitkeep/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/hitkeep-railway-template)
