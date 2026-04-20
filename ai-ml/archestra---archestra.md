# Deploy archestra on Railway

MCP-native AI platform with web UI and secure agent orchestration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/archestra)

## About

Run Archestra as a single Railway service from the official upstream Docker image, with web access immediately available after deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `archestra/platform:1.2.15` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `ARCHESTRA_QUICKSTART` | false |
| `ARCHESTRA_AUTH_SECRET` | (secret) |
| `ARCHESTRA_AUTH_ADMIN_EMAIL` | admin@example.com |
| `ARCHESTRA_AUTH_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/archestra)
