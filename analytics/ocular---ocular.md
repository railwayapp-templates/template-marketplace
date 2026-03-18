# Deploy ocular on Railway

A self-hosted, open-source personal budgeting app with Sankey diagrams. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ocular)

## About

[Ocular](https://github.com/simonwep/ocular) is a self-hosted, open-source personal budgeting app with a beautiful, minimalist interface. It features income/expense tracking, Sankey diagram visualizations, multi-year overviews, multi-user support, PWA installability, dark/light mode, and multi-language support.

Ocular runs as a single Docker container bundling a Vue 3 SPA frontend (served by Caddy) and a Go backend ([Genesis](https://github.com/simonwep/genesis)) for authentication and file-based data persistence. No external database is required — all data is stored on a persistent volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ocular | `ghcr.io/simonwep/ocular:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `GENESIS_PORT` | 8080 |
| `GENESIS_DB_PATH` | /data/genesis |
| `GENESIS_BASE_URL` | / |
| `GENESIS_GIN_MODE` | release |
| `GENESIS_LOG_MODE` | production |
| `GENESIS_JWT_SECRET` | (secret) |
| `GENESIS_KEY_PATTERN` | ^[\w]{0,32}$ |
| `GENESIS_DATA_MAX_SIZE` | 32000000 |
| `GENESIS_KEYS_PER_USER` | (secret) |
| `GENESIS_ADMIN_PASSWORD` | (secret) |
| `GENESIS_ADMIN_USERNAME` | (secret) |
| `GENESIS_USERNAME_PATTERN` | (secret) |
| `GENESIS_LOGIN_MAX_ATTEMPTS` | (secret) |
| `GENESIS_JWT_TOKEN_EXPIRATION` | (secret) |
| `GENESIS_LOGIN_LOCKOUT_DURATIONS` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/genesis`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/ocular)
