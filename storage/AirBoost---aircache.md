# Deploy AirBoost on Railway

High-performance SQLite database for Airtable

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/aircache)

## About

**Airboost** is an open-source high-performance cache service that makes your Airtable API 240x faster with zero-downtime updates, reducing latency by 99.4% and eliminating rate limits through intelligent SQLite caching.

Hosting Airboost on Railway provides enterprise-grade performance for your Airtable data with minimal configuration. The service uses a dual-database strategy for seamless cache updates, automatically syncs your Airtable data, handles file attachments with deduplication, and serves cached data through a high-performance REST API. Railway's persistent storage ensures your SQLite databases and attachment files are preserved across deployments, while the platform's auto-scaling capabilities handle traffic spikes efficiently.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AirBoost | [Guischk/AirBoost](https://github.com/Guischk/AirBoost) | Database |

## Configuration

- **Volume:** `/app/data`

**Category:** Storage · **Languages:** TypeScript, Shell, JavaScript

[View on Railway →](https://railway.com/template/aircache)
