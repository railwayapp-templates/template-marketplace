# Deploy hitkeep-bucket-template on Railway

Self-hosted HitKeep analytics with Railway Bucket backups.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hitkeep-bucket-template)

## About

Deploy [HitKeep](https://hitkeep.com), an open-source privacy-first analytics platform you can self-host as one Railway service.

This template uses the official `pascalebeier/hitkeep:2.7.0` Docker image, exposes port `8080`, attaches a persistent Railway volume at `/var/lib/hitkeep/data` for active DuckDB data, and provisions a Railway Bucket for backup/archive Parquet snapshots.

HitKeep is a single-binary web analytics app with embedded DuckDB and embedded NSQ. It tracks pageviews, events, goals, funnels, ecommerce activity, AI crawler visibility, Search Console aggregates, exports, and read-only API/MCP access without requiring PostgreSQL, Redis, ClickHouse, Kafka, or a separate queue.

On Railway, the app runs as one persistent service backed by one attached volume and one private S3-compatible Railway Bucket. The template generates a unique `HITKEEP_JWT_SECRET` during deployment and configures HitKeep to use the generated Railway public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hitkeep | `pascalebeier/hitkeep:2.7.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `HITKEEP_DB_PATH` | /var/lib/hitkeep/data/hitkeep.db |
| `HITKEEP_DATA_PATH` | /var/lib/hitkeep/data |
| `HITKEEP_HTTP_ADDR` | :8080 |
| `HITKEEP_JWT_SECRET` | (secret) |
| `HITKEEP_S3_USE_SSL` | true |
| `HITKEEP_S3_ENDPOINT` | t3.storageapi.dev |
| `HITKEEP_S3_URL_STYLE` | vhost |
| `HITKEEP_BACKUP_INTERVAL` | 60 |
| `HITKEEP_BACKUP_RETENTION` | 24 |
| `HITKEEP_SPAM_FILTER_PATH` | /var/lib/hitkeep/data/spam-filter.json |
| `HITKEEP_S3_SECRET_ACCESS_KEY` | (secret) |
| `HITKEEP_SPAM_FILTER_AUTO_UPDATE` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/hitkeep/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/hitkeep-bucket-template)
