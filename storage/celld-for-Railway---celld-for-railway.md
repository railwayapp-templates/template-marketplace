# Deploy celld for Railway on Railway

A Railway-optimized template for celld, self-hosted Durable Objects.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/celld-for-railway)

## About

celld runs Cloudflare Workers and Durable Objects on infrastructure you control. This template configures celld for Railway with a maintained, tested container image, durable object storage, a persistent local cache, private operator networking, health checks, and a starter Worker. No manual environment variables are required.

Hosting celld requires an S3-compatible bucket for deployments and Durable Object data, plus local disk for SQLite working files and caches. This template creates a Railway Bucket, attaches a persistent volume, configures the required credentials, and exposes only the public Worker listener. The operator and peer listener stays on Railway’s private network. On first boot, celld installs a starter page if the Bucket is empty. Deploying your own Worker replaces that starter after the service is restarted. celld is still alpha software, so back up important data and review release notes before upgrading.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| celld | `ghcr.io/joeychilson/railway-celld:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `CELLD_BOOTSTRAP` | 1 |
| `CELLD_INTERNAL_PORT` | 8081 |
| `AWS_SECRET_ACCESS_KEY` | (secret) |
| `CELLD_ASSET_CACHE_BYTES` | 134217728 |
| `CELLD_LOCAL_CACHE_MAX_BYTES` | 134217728 |
| `CELLD_TRUST_FORWARDED_HEADERS` | 1 |

## Configuration

- **Healthcheck:** `/__celld/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/celld`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/celld-for-railway)
