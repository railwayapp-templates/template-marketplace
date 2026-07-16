# Deploy omniroute on Railway

Route LLM with intelligent provider management and compression

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omniroute-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/omniroute)

![OmniRoute OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-omniroute/main/og-image.svg)

OmniRoute is a unified AI proxy that routes any LLM through a single OpenAI-compatible endpoint. Deploy it on Railway to manage multiple AI providers, enable compression pipelines, and optimize your LLM usage with intelligent routing and fallback strategies.

OmniRoute runs as a single Docker container on port 20128. Railway provides compute, TLS at the edge, and a public URL. Data is stored in `/app/data` — add a Railway Volume there for persistence of your SQLite database, provider configurations, and usage logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| omniroute | [INAPP-Mobile/railway-omniroute](https://github.com/INAPP-Mobile/railway-omniroute) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 20128 | Port for Dashboard UI and API (single-port mode) |
| `DATA_DIR` | /app/data | Data directory for SQLite database and storage (must match volume mount) |
| `JWT_SECRET` | (secret) | JWT signing key for dashboard session tokens. Generate with: openssl rand -base64 48 |
| `API_KEY_SECRET` | (secret) | Encryption key for API keys stored in the database. Generate with: openssl rand -hex 32 |
| `INITIAL_PASSWORD` | (secret) | Initial admin login password. Change this after first login via Dashboard → Settings → Security |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/omniroute-1)
