# Deploy Trivy on Railway

Open-source vulnerability scanner for container images and filesystems.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/endearing-contentment)

## About

Trivy runs as a single container on Railway. The vulnerability database is cached on a Railway volume at `/var/cache/trivy` so restarts are fast. The server listens on port 4954 and exposes a gRPC API for scanning.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trivy | `aquasec/trivy:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4954 | Server listen port. Railway maps this to the public domain. |
| `TRIVY_LISTEN` | 0.0.0.0:4954 | Bind address for the Trivy server. Must match PORT. |
| `TRIVY_SCANNERS` | vuln,misconfig,secret,license | Enabled scanner types. Comma-separated: vuln, misconfig, secret, license. |
| `TRIVY_CACHE_BACKEND` | fs | Cache backend for the vulnerability database. 'fs' stores locally. Use 'redis://redis:6379' with a Redis companion for shared cache. |
| `TRIVY_DB_REPOSITORY` | mirror.gcr.io/aquasec/trivy-db:2 | OCI repository to pull the vulnerability database from. |
| `TRIVY_SKIP_DB_UPDATE` | false | Skip automatic vulnerability database updates on startup. Not recommended. |

## Configuration

- **Start command:** `trivy server --listen 0.0.0.0:4954`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/cache/trivy`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/endearing-contentment)
