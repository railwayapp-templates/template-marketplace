# Deploy ashim on Railway

Self-hosted AI image studio with 45+ tools, pipelines, and REST API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ashim)

## About

ashim runs as a single Docker service on Railway using the upstream image, giving you a fast browser-based image studio with built-in API and no external database dependencies.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ashimhq/ashim:1.15.9` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 1349 |
| `DB_PATH` | /data/ashim.db |
| `APP_NAME` | ashim |
| `LOG_LEVEL` | info |
| `MAX_USERS` | 0 |
| `TRUST_PROXY` | true |
| `AUTH_ENABLED` | true |
| `STORAGE_MODE` | local |
| `DEFAULT_THEME` | light |
| `MAX_PDF_PAGES` | 0 |
| `DEFAULT_LOCALE` | en |
| `MAX_BATCH_SIZE` | 0 |
| `MAX_MEGAPIXELS` | 0 |
| `MAX_SPLIT_GRID` | 100 |
| `WORKSPACE_PATH` | /tmp/workspace |
| `CONCURRENT_JOBS` | 0 |
| `MAX_SVG_SIZE_MB` | 0 |
| `DEFAULT_PASSWORD` | (secret) |
| `DEFAULT_USERNAME` | (secret) |
| `MAX_LOGO_SIZE_KB` | 2048 |
| `MAX_CANVAS_PIXELS` | 0 |
| `FILES_STORAGE_PATH` | /data/files |
| `FILE_MAX_AGE_HOURS` | 72 |
| `MAX_PIPELINE_STEPS` | 0 |
| `MAX_UPLOAD_SIZE_MB` | 1024 |
| `MAX_WORKER_THREADS` | 0 |
| `RATE_LIMIT_PER_MIN` | 1000 |
| `LOGIN_ATTEMPT_LIMIT` | (secret) |
| `PROCESSING_TIMEOUT_S` | 0 |
| `SESSION_DURATION_HOURS` | 168 |
| `CLEANUP_INTERVAL_MINUTES` | 60 |
| `SKIP_MUST_CHANGE_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ashim)
