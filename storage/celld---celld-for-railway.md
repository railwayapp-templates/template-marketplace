# Deploy celld on Railway

Self-hosted Cloudflare Workers and Durable Objects with a Railway Bucket.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/celld-for-railway)

## About

celld runs Cloudflare Workers and Durable Objects on infrastructure you
control. This template runs a celld node with a Railway Bucket for durable
storage, a volume for local state, and a starter page, with every variable
configured for you. celld is alpha software, so back up important data and
read the release notes before upgrading.

celld needs S3-compatible object storage for deployments and Durable Object
data, plus local disk for SQLite working files and caches. The template creates
a Railway Bucket, attaches a volume at `/var/lib/celld`, wires the Bucket
credentials into the service, and exposes only the public Worker listener on
port `8080`. The operator and peer listener on port `8081` stays on Railway's
private network. When the Bucket is empty, the node installs a starter page.
Running nodes check the Bucket every 30 seconds and adopt a new deployment
without restarting. Patch releases of the image install automatically during
Railway's nightly update window.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| celld | `ghcr.io/joeychilson/railway-celld:4.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Public port for Worker traffic. The template's domain points here. |
| `AWS_REGION` | - | Region of the Railway Bucket. |
| `S3_ENDPOINT` | - | S3 endpoint of the Railway Bucket. |
| `CELLD_BUCKET` | - | Bucket that holds deployments and Durable Object data. |
| `CELLD_BOOTSTRAP` | 1 | Set to 1 to install the starter page when the Bucket has no deployment. |
| `AWS_ACCESS_KEY_ID` | - | Access key ID for the Railway Bucket. |
| `CELLD_INTERNAL_PORT` | 8081 | Private port for peer and operator traffic. Never expose it publicly. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | Secret access key for the Railway Bucket. |
| `CELLD_ASSET_CACHE_BYTES` | 134217728 | Asset cache limit in bytes. |
| `CELLD_LOCAL_CACHE_MAX_BYTES` | 134217728 | Local state cache limit in bytes. Raise it when you use a larger volume. |
| `CELLD_TRUST_FORWARDED_HEADERS` | 1 | Set to 1 to trust Railway's forwarded HTTPS headers. |

## Configuration

- **Healthcheck:** `/.well-known/celld/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/celld`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/celld-for-railway)
